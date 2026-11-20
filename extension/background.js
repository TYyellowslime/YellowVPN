const OBFUSCATION_DELTA = 7;
function decodeFromOffsets(arr){
  return arr.map(n => String.fromCharCode(n - OBFUSCATION_DELTA)).join('');
}

const REGIONS = [
  { id: 'nl', name: 'Netherlands', host: [117,115,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,56] },
  { id: 'gm', name: 'Germany',     host: [107,108,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,57] },
  { id: 'am', name: 'Armenia',     host: [104,116,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,58] },
  { id: 'se', name: 'Sweden',      host: [122,108,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,59] },
  { id: 'tr', name: 'Turkey',      host: [123,121,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,60] },
  { id: 'us', name: 'USA',         host: [124,122,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,61] },
  { id: 'ee', name: 'Estonia',     host: [108,108,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,62] },
  { id: 'uk', name: 'Switzerland', host: [106,111,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,63] },
  { id: 'kz', name: 'Kazakhstan',  host: [114,129,53,122,108,121,125,108,121,122,52,104,124,121,118,121,104,52,126,53,121,124], port: [56,55,60,57,64] }
];

const FREE_REGION_IDS = REGIONS.filter(r => r.id !== 'kz' && r.id !== 'us' && r.id !== 'uk' && r.id !== 'tr' && r.id !== 'am' && r.id !== 'se' && r.id !== 'ee').map(r => r.id);

let currentRegion = null;
let connected = false;
let geoInfo = null;
const ALARM_NAME = 'shadowsocks_free_hour';
const API_BASE = 'https://servers-aurora-w.ru/services';
const API_SET_ENDPOINT = 'https://servers-aurora-w.ru/services/api/set.php';
const AURORA_EXT_S_TOKEN = 'aurora-vpn-extension-secret-token';
const API_GET_IP = 'https://servers-aurora-w.ru/services/api/get_ip.php';
const API_SESSIONS_REGISTER = 'https://servers-aurora-w.ru/services/api/sessions_register.php';
const API_SESSIONS_LIST = 'https://servers-aurora-w.ru/services/api/sessions_list.php';
const API_SESSIONS_TERMINATE = 'https://servers-aurora-w.ru/services/api/sessions_terminate.php'; 

const STORAGE_KEYS = {
  remainingMs: 'remainingMs',
  sessionStart: 'sessionStart',
  selectedRegionId: 'selectedRegionId',
  trafficUsed: 'trafficUsed',
  totalActiveMs: 'totalActiveMs',
  autoConnect: 'autoConnect',
  language: 'language',
  loggedInUser: 'loggedInUser',
  subscriptionActive: 'subscriptionActive',
  subscriptionExpires: 'subscriptionExpires',
  isConnected: 'isConnected',
  connectedRegionId: 'connectedRegionId',
  proxyMode: 'proxyMode',
  proxyOnlyDomains: 'proxyOnlyDomains',
  deviceId: 'deviceId',
  uninstallToken: 'uninstallToken',
  paywallPending: 'paywallPending'
};

async function queuePaywall(reason) {
  const payload = {
    reason: reason === 'free_ended' ? 'free_ended' : 'premium_expired',
    at: Date.now()
  };
  await chrome.storage.local.set({ [STORAGE_KEYS.paywallPending]: payload });
  try {
    chrome.runtime.sendMessage({ type: 'SHOW_PAYWALL', reason: payload.reason });
  } catch (e) {}
}

async function clearPaywallPending() {
  await chrome.storage.local.remove(STORAGE_KEYS.paywallPending);
}

const UNINSTALL_PAGE_URL = 'https://links-aurora.pro/pleasewait';

async function getOrCreateDeviceId() {
  const data = await chrome.storage.local.get(STORAGE_KEYS.deviceId);
  let id = data[STORAGE_KEYS.deviceId];
  if (typeof id !== 'string' || id.length < 8) {
    id = crypto.randomUUID ? crypto.randomUUID() : 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2);
    await chrome.storage.local.set({ [STORAGE_KEYS.deviceId]: id });
  }
  return id;
}

async function getOrCreateUninstallToken() {
  const data = await chrome.storage.local.get(STORAGE_KEYS.uninstallToken);
  let token = data[STORAGE_KEYS.uninstallToken];
  if (typeof token !== 'string' || token.length < 16) {
    token = crypto.randomUUID ? crypto.randomUUID() + '-' + Math.random().toString(36).slice(2, 10) : 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 15);
    await chrome.storage.local.set({ [STORAGE_KEYS.uninstallToken]: token });
  }
  return token;
}

function setUninstallUrlForSessionCleanup(uninstallToken) {
  try {
    const url = 'https://servers-aurora-w.ru/services/api/sessions_uninstall.php?token=' + encodeURIComponent(uninstallToken);
    chrome.runtime.setUninstallURL(url);
  } catch (e) {}
}

function setUninstallUrlDefault() {
  try {
    chrome.runtime.setUninstallURL(UNINSTALL_PAGE_URL);
  } catch (e) {}
}

try { chrome.runtime.setUninstallURL(UNINSTALL_PAGE_URL); } catch (e) {}

async function fetchClientIp() {
  try {
    const resp = await fetch(API_GET_IP);
    const data = await resp.json();
    if (data && data.success && typeof data.ip === 'string') {
      return data.ip.trim();
    }
  } catch (e) {}
  return '';
}

/** PNG флагов в пакете расширения (uk → Швейцария, как в popup.css). */
const REGION_TO_FLAG_PNG = {
  nl: 'icons/nl.png',
  gm: 'icons/gm.png',
  am: 'icons/am.png',
  se: 'icons/se.png',
  tr: 'icons/tr.png',
  us: 'icons/us.png',
  ee: 'icons/ee.png',
  uk: 'icons/ch.png',
  kz: 'icons/kz.png'
};

const LOGO_PATH_BY_BUCKET = {
  16: 'icons/logos/yellow-logo-16.png',
  48: 'icons/logos/yellow-logo-48.png',
  128: 'icons/logos/yellow-logo-128.png'
};

function logoAssetBucketForToolbarSize(size) {
  if (size <= 16) return 16;
  if (size <= 48) return 48;
  return 128;
}

async function fetchExtensionImageBitmap(relativePath) {
  const url = chrome.runtime.getURL(relativePath);
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return createImageBitmap(await res.blob());
}

/**
 * Иконка тулбара с мини-флагом в углу — без regional-indicator emoji
 * (на Windows они часто показываются как «NL», «DE» и т.д.).
 */
async function buildConnectedActionIconImageData(regionId) {
  const flagPath = REGION_TO_FLAG_PNG[regionId];
  if (!flagPath) return null;
  let flagBmp;
  try {
    flagBmp = await fetchExtensionImageBitmap(flagPath);
  } catch (e) {
    return null;
  }
  const logoBmps = {};
  try {
    for (const b of [16, 48, 128]) {
      logoBmps[b] = await fetchExtensionImageBitmap(LOGO_PATH_BY_BUCKET[b]);
    }
  } catch (e) {
    try { flagBmp.close(); } catch (err) {}
    return null;
  }
  const sizes = [16, 32, 48, 128];
  const imageData = {};
  try {
    for (const size of sizes) {
      const bucket = logoAssetBucketForToolbarSize(size);
      const logoBmp = logoBmps[bucket];
      const canvas = new OffscreenCanvas(size, size);
      const ctx = canvas.getContext('2d', { alpha: true });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(logoBmp, 0, 0, size, size);
      const pad = Math.max(1, Math.round(size * 0.07));
      const fh = Math.round(size * 0.34);
      const fw = Math.min(Math.round(fh * 1.5), size - pad * 2);
      const fx = size - fw - pad;
      const fy = size - fh - pad;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(fx + 1, fy + 1, fw, fh);
      ctx.drawImage(flagBmp, fx, fy, fw, fh);
      const lw = Math.max(0.5, size / 48);
      ctx.strokeStyle = 'rgba(255,255,255,0.88)';
      ctx.lineWidth = lw;
      ctx.strokeRect(fx + lw * 0.5, fy + lw * 0.5, fw - lw, fh - lw);
      imageData[String(size)] = ctx.getImageData(0, 0, size, size);
    }
  } finally {
    try { flagBmp.close(); } catch (e) {}
    for (const b of [16, 48, 128]) {
      try { logoBmps[b].close(); } catch (e) {}
    }
  }
  return imageData;
}

const REGION_GEO = {
  nl: { country: 'The Netherlands', countryCode: 'NL', city: 'Amsterdam' },
  gm: { country: 'Germany', countryCode: 'DE', city: 'Frankfurt am Main' },
  am: { country: 'Armenia', countryCode: 'AM', city: 'Yerevan' },
  se: { country: 'Sweden', countryCode: 'SE', city: 'Stockholm' },
  tr: { country: 'Türkiye', countryCode: 'TR', city: 'Ankara' },
  us: { country: 'United States', countryCode: 'US', city: 'Secaucus' },
  ee: { country: 'Estonia', countryCode: 'EE', city: 'Tallinn' },
  uk: { country: 'Switzerland', countryCode: 'CH', city: 'Hünenberg' },
  kz: { country: 'Kazakhstan', countryCode: 'KZ', city: 'Almaty' }
};

function getRegionGeo(regionId) {
  return REGION_GEO[regionId] || null;
}

async function updateIcon(isConnected, region = null) {
  try {
    const basePath = 'icons/logos';
    const defaultPaths = {
      16: `${basePath}/yellow-logo-16.png`,
      32: `${basePath}/yellow-logo-48.png`,
      48: `${basePath}/yellow-logo-48.png`,
      128: `${basePath}/yellow-logo-128.png`
    };
    if (isConnected && region && region.id) {
      const composed = await buildConnectedActionIconImageData(region.id);
      if (composed) {
        await chrome.action.setIcon({ imageData: composed });
        await chrome.action.setBadgeText({ text: '' });
        return;
      }
      await chrome.action.setIcon({ path: defaultPaths });
      const geo = getRegionGeo(region.id);
      const code = geo && geo.countryCode ? String(geo.countryCode).toUpperCase().slice(0, 2) : 'ON';
      await chrome.action.setBadgeText({ text: code });
      await chrome.action.setBadgeBackgroundColor({ color: '#4ee3c2' });
    } else {
      await chrome.action.setIcon({ path: defaultPaths });
      await chrome.action.setBadgeText({ text: '' });
    }
  } catch (e) {}
}

const TRAFFIC_RATE_MB_PER_MINUTE = 0.5;
const TRAFFIC_RATE_MB_PER_MS = TRAFFIC_RATE_MB_PER_MINUTE / 60000;

async function restoreConnectionState() {
  try {
    const data = await chrome.storage.local.get([
      STORAGE_KEYS.isConnected,
      STORAGE_KEYS.connectedRegionId,
      STORAGE_KEYS.selectedRegionId
    ]);
    const isConn = !!data[STORAGE_KEYS.isConnected];
    const regionId = data[STORAGE_KEYS.connectedRegionId];
    const selectedId = data[STORAGE_KEYS.selectedRegionId];
    if (isConn && regionId) {
      const region = REGIONS.find(r => r.id === regionId) || null;
      if (region) {
        currentRegion = region;
        connected = true;
        geoInfo = getRegionGeo(region.id);
      }
    } else {
      connected = false;
      if (selectedId) {
        const region = REGIONS.find(r => r.id === selectedId) || null;
        currentRegion = region;
      } else {
        currentRegion = null;
      }
      geoInfo = null;
    }
    updateIcon(connected, currentRegion);
  } catch (e) {}
}

restoreConnectionState().catch(() => {});

async function getRemainingMs() {
  return null;
}

async function getSessionStart() {
  const data = await chrome.storage.local.get(STORAGE_KEYS.sessionStart);
  return data[STORAGE_KEYS.sessionStart] || null;
}

async function setSessionStart(ts) {
  await chrome.storage.local.set({ [STORAGE_KEYS.sessionStart]: ts });
}

async function clearSessionStart() {
  await chrome.storage.local.remove(STORAGE_KEYS.sessionStart);
}

async function settleSessionUsage() {
  const data = await chrome.storage.local.get([
    STORAGE_KEYS.sessionStart,
    STORAGE_KEYS.totalActiveMs
  ]);
  const start = typeof data[STORAGE_KEYS.sessionStart] === 'number' ? data[STORAGE_KEYS.sessionStart] : null;
  const elapsedMs = start ? Math.max(0, Date.now() - start) : 0;

  if (elapsedMs > 0) {
    try {
      await updateTrafficUsed(elapsedMs);
      const prev = typeof data[STORAGE_KEYS.totalActiveMs] === 'number' ? data[STORAGE_KEYS.totalActiveMs] : 0;
      await chrome.storage.local.set({ [STORAGE_KEYS.totalActiveMs]: prev + elapsedMs });
    } catch (_) {}
  }

  await clearSessionStart();
  return elapsedMs;
}

async function updateTrafficUsed(elapsedMs) {
  const data = await chrome.storage.local.get(STORAGE_KEYS.trafficUsed);
  let used = typeof data[STORAGE_KEYS.trafficUsed] === 'number' ? data[STORAGE_KEYS.trafficUsed] : 0;
  const increment = elapsedMs * TRAFFIC_RATE_MB_PER_MS;
  used += increment;
  used = Math.round(used * 10) / 10;
  await chrome.storage.local.set({ [STORAGE_KEYS.trafficUsed]: used });
}

async function buildState() {
  await restoreConnectionState();
  const [remaining, sessionStart] = await Promise.all([
    getRemainingMs(),
    getSessionStart()
  ]);
  const localData = await chrome.storage.local.get([
    STORAGE_KEYS.trafficUsed,
    STORAGE_KEYS.totalActiveMs,
    STORAGE_KEYS.loggedInUser,
    STORAGE_KEYS.subscriptionActive,
    STORAGE_KEYS.subscriptionExpires,
    STORAGE_KEYS.selectedRegionId
  ]);
  let proxyControl = { levelOfControl: 'unknown', conflict: false };
  try {
    const proxyInfo = await chrome.proxy.settings.get({});
    const level = proxyInfo && proxyInfo.levelOfControl ? proxyInfo.levelOfControl : 'unknown';
    const conflict = level === 'not_controllable' || level === 'controlled_by_other_extensions';
    proxyControl = { levelOfControl: level, conflict };
  } catch (e) {}
  return {
    currentRegion,
    connected,
    geoInfo,
    remainingMs: remaining,
    sessionStart,
    trafficUsed: localData[STORAGE_KEYS.trafficUsed] || 0,
    totalActiveMs: localData[STORAGE_KEYS.totalActiveMs] || 0,
    loggedInUser: localData[STORAGE_KEYS.loggedInUser] || null,
    subscriptionActive: localData[STORAGE_KEYS.subscriptionActive] || false,
    subscriptionExpires: localData[STORAGE_KEYS.subscriptionExpires] || null,
    selectedRegionId: localData[STORAGE_KEYS.selectedRegionId] || null,
    proxyControl
  };
}

async function checkUserExists(username) {
  try {
    const response = await fetch('https://servers-aurora-w.ru/aurora_support_chat/api/security.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    const data = await response.json();
    return data.ok ? data.data.exists : false;
  } catch (e) {
    return true;
  }
}

async function logoutUser() {
  await chrome.storage.local.remove([
    STORAGE_KEYS.loggedInUser,
    STORAGE_KEYS.subscriptionActive,
    STORAGE_KEYS.subscriptionExpires
  ]);
  if (connected) {
    await clearProxy();
  }
}

const WHITELIST_FETCH_MS = 15000;

async function addClientIpToWhitelist(clientIp = '') {
  try {
    if (connected) {
      return {
        success: true,
        skipped: true,
        reason: 'User connected to VPN'
      };
    }
    
    let ip = typeof clientIp === 'string' ? clientIp.trim() : '';
    if (!ip) {
      ip = await fetchClientIp();
    }
    const requestBody = ip ? { ip } : {};
    const startTime = Date.now();
    
    const ac = new AbortController();
    const timeoutId = setTimeout(() => ac.abort(), WHITELIST_FETCH_MS);
    let resp;
    try {
      resp = await fetch(API_SET_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'aurora-ext-s': AURORA_EXT_S_TOKEN
        },
        body: JSON.stringify(requestBody),
        signal: ac.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }
    
    const data = await resp.json();
    const duration = Date.now() - startTime;
    
    if (data.success) {
      return {
        success: true,
        cached: data.cached || false,
        client_ip: data.client_ip,
        subnet: data.subnet,
        duration: duration,
        success_count: data.success_count,
        total_servers: data.total_servers
      };
    } else {
      return {
        success: false,
        error: data.error,
        duration: duration
      };
    }
  } catch (e) {
    const isAbort = e.name === 'AbortError' || (e.message && e.message.includes('abort'));
    return {
      success: false,
      error: isAbort ? 'timeout' : (e.message || 'network_error'),
      duration: 0
    };
  }
}

async function applyProxy(region) {
  const data = await chrome.storage.local.get([STORAGE_KEYS.subscriptionActive, STORAGE_KEYS.proxyMode, STORAGE_KEYS.proxyOnlyDomains]);
  const subActive = data[STORAGE_KEYS.subscriptionActive];
  const proxyMode = data[STORAGE_KEYS.proxyMode] || 'all';
  const proxyOnlyDomains = Array.isArray(data[STORAGE_KEYS.proxyOnlyDomains]) ? data[STORAGE_KEYS.proxyOnlyDomains] : [];
  
  const decryptedHost = decodeFromOffsets(region.host);
  const decryptedPort = parseInt(decodeFromOffsets(region.port));
  
  const proxyStr = 'SOCKS5 ' + decryptedHost + ':' + decryptedPort;
  let config;
  if (proxyMode === 'proxy_only') {
    const domains = proxyOnlyDomains
      .filter(d => typeof d === 'string' && d.trim().length > 0)
      .map(d => d.trim().toLowerCase());
    const uniqueDomains = Array.from(new Set(domains));
    const lines = [];
    lines.push('function FindProxyForURL(url, host) {');
    lines.push('  if (url.toLowerCase().indexOf("servers-aurora-w.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpn.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpl.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vps.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpnl.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpns.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpny.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("links-aurora.pro") !== -1) return "DIRECT";');
    lines.push('  var h = host.toLowerCase(); if (h.length && h.charAt(h.length-1) === ".") h = h.substring(0, h.length-1);');
    lines.push('  if (h === "servers-aurora-w.ru" || dnsDomainIs(h, "servers-aurora-w.ru") || shExpMatch(h, "*.servers-aurora-w.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpn.ru" || dnsDomainIs(h, "aurora-vpn.ru") || shExpMatch(h, "*.aurora-vpn.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpl.ru" || dnsDomainIs(h, "aurora-vpl.ru") || shExpMatch(h, "*.aurora-vpl.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vps.ru" || dnsDomainIs(h, "aurora-vps.ru") || shExpMatch(h, "*.aurora-vps.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpnl.ru" || dnsDomainIs(h, "aurora-vpnl.ru") || shExpMatch(h, "*.aurora-vpnl.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpns.ru" || dnsDomainIs(h, "aurora-vpns.ru") || shExpMatch(h, "*.aurora-vpns.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpny.ru" || dnsDomainIs(h, "aurora-vpny.ru") || shExpMatch(h, "*.aurora-vpny.ru")) return "DIRECT";');
    lines.push('  if (h === "links-aurora.pro" || dnsDomainIs(h, "links-aurora.pro") || shExpMatch(h, "*.links-aurora.pro")) return "DIRECT";');
    if (uniqueDomains.length > 0) {
      lines.push('  var proxy = "' + proxyStr + '";');
      uniqueDomains.forEach(d => {
        const escaped = d.replace(/"/g, '');
        lines.push('  if (dnsDomainIs(h, "' + escaped + '") || shExpMatch(h, "*.' + escaped + '")) return proxy;');
      });
    }
    lines.push('  return "DIRECT";');
    lines.push('}');
    const pacScript = lines.join('\n');
    config = { mode: 'pac_script', pacScript: { data: pacScript } };
  } else {
    const lines = [];
    lines.push('function FindProxyForURL(url, host) {');
    lines.push('  if (url.toLowerCase().indexOf("servers-aurora-w.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpn.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpl.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vps.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpnl.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpns.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("aurora-vpny.ru") !== -1) return "DIRECT";');
    lines.push('  if (url.toLowerCase().indexOf("links-aurora.pro") !== -1) return "DIRECT";');
    lines.push('  var h = host.toLowerCase(); if (h.length && h.charAt(h.length-1) === ".") h = h.substring(0, h.length-1);');
    lines.push('  if (h === "servers-aurora-w.ru" || dnsDomainIs(h, "servers-aurora-w.ru") || shExpMatch(h, "*.servers-aurora-w.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpn.ru" || dnsDomainIs(h, "aurora-vpn.ru") || shExpMatch(h, "*.aurora-vpn.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpl.ru" || dnsDomainIs(h, "aurora-vpl.ru") || shExpMatch(h, "*.aurora-vpl.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vps.ru" || dnsDomainIs(h, "aurora-vps.ru") || shExpMatch(h, "*.aurora-vps.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpnl.ru" || dnsDomainIs(h, "aurora-vpnl.ru") || shExpMatch(h, "*.aurora-vpnl.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpns.ru" || dnsDomainIs(h, "aurora-vpns.ru") || shExpMatch(h, "*.aurora-vpns.ru")) return "DIRECT";');
    lines.push('  if (h === "aurora-vpny.ru" || dnsDomainIs(h, "aurora-vpny.ru") || shExpMatch(h, "*.aurora-vpny.ru")) return "DIRECT";');
    lines.push('  if (h === "links-aurora.pro" || dnsDomainIs(h, "links-aurora.pro") || shExpMatch(h, "*.links-aurora.pro")) return "DIRECT";');
    lines.push('  if (h === "ipwho.is" || dnsDomainIs(h, "ipwho.is")) return "DIRECT";');
    lines.push('  var proxy = "' + proxyStr + '";');
    lines.push('  return proxy;');
    lines.push('}');
    const pacScript = lines.join('\n');
    config = { mode: 'pac_script', pacScript: { data: pacScript } };
  }
  await chrome.proxy.settings.set({ value: config, scope: 'regular' });
  const stored = await chrome.storage.local.get([STORAGE_KEYS.isConnected, STORAGE_KEYS.connectedRegionId]);
  const wasConnected = !!stored[STORAGE_KEYS.isConnected];
  const oldRegionId = stored[STORAGE_KEYS.connectedRegionId];
  const keepSession = wasConnected && !!oldRegionId;
  connected = true;
  currentRegion = region;
  geoInfo = getRegionGeo(region.id);
  await chrome.storage.local.set({
    [STORAGE_KEYS.isConnected]: true,
    [STORAGE_KEYS.connectedRegionId]: region.id,
    [STORAGE_KEYS.selectedRegionId]: region.id
  });
  const now = Date.now();
  if (!keepSession) {
    await setSessionStart(now);
  }
  await chrome.alarms.clear(ALARM_NAME);

  updateIcon(true, region);
}

async function clearProxyDirect() {
  try {
    await settleSessionUsage();
  } catch (e) {}
  await chrome.proxy.settings.clear({});
  connected = false;
  geoInfo = null;
  currentRegion = null;
  chrome.alarms.clear(ALARM_NAME);
  
  try {
    const last = await chrome.storage.local.get([STORAGE_KEYS.connectedRegionId, STORAGE_KEYS.selectedRegionId]);
    const keepSelected = last[STORAGE_KEYS.connectedRegionId] || last[STORAGE_KEYS.selectedRegionId] || null;
    await chrome.storage.local.set({
      [STORAGE_KEYS.isConnected]: false,
      [STORAGE_KEYS.connectedRegionId]: null,
      [STORAGE_KEYS.selectedRegionId]: keepSelected
    });
  } catch (e) {}
  
  updateIcon(false, null);
}

async function clearProxy() {
  try {
    await settleSessionUsage();
  } catch (e) {}
  await chrome.proxy.settings.clear({});
  connected = false;
  geoInfo = null;
  currentRegion = null;
  chrome.alarms.clear(ALARM_NAME);

  try {
    const last = await chrome.storage.local.get([STORAGE_KEYS.connectedRegionId, STORAGE_KEYS.selectedRegionId]);
    const keepSelected = last[STORAGE_KEYS.connectedRegionId] || last[STORAGE_KEYS.selectedRegionId] || null;
    await chrome.storage.local.set({
      [STORAGE_KEYS.isConnected]: false,
      [STORAGE_KEYS.connectedRegionId]: null,
      [STORAGE_KEYS.selectedRegionId]: keepSelected
    });
  } catch (e) {}

  updateIcon(false, null);
}

chrome.runtime.onInstalled.addListener(async (details) => {
  await chrome.proxy.settings.clear({});
  await chrome.alarms.clear(ALARM_NAME);
  const data = await chrome.storage.local.get([STORAGE_KEYS.language, STORAGE_KEYS.paywallPending]);
  if (data[STORAGE_KEYS.paywallPending]?.reason === 'free_ended') {
    await clearPaywallPending();
  }
  await chrome.storage.local.remove(STORAGE_KEYS.remainingMs);
  if (data[STORAGE_KEYS.language] === undefined || data[STORAGE_KEYS.language] === null) {
    const uiLang = (typeof chrome.i18n !== 'undefined' && chrome.i18n.getUILanguage) ? chrome.i18n.getUILanguage() : (navigator.language || navigator.languages?.[0] || 'ru');
    const lang = (typeof uiLang === 'string' && uiLang.toLowerCase().startsWith('en')) ? 'en' : 'ru';
    await chrome.storage.local.set({ [STORAGE_KEYS.language]: lang });
  }
  updateIcon(false, null);
  
  if (details.reason === 'update') {
    try {
      await settleSessionUsage();
    } catch (e) {}
    await chrome.proxy.settings.clear({});
    connected = false;
    currentRegion = null;
    geoInfo = null;
    await chrome.storage.local.set({
      [STORAGE_KEYS.isConnected]: false,
      [STORAGE_KEYS.connectedRegionId]: null
    });
    updateIcon(false, null);
  }
});

chrome.runtime.onStartup.addListener(async () => {
  try {
    const {
      [STORAGE_KEYS.autoConnect]: autoConnectFlag,
      [STORAGE_KEYS.selectedRegionId]: selId,
      [STORAGE_KEYS.subscriptionActive]: subActive,
      [STORAGE_KEYS.loggedInUser]: loggedInUser
    } = await chrome.storage.local.get([
      STORAGE_KEYS.autoConnect,
      STORAGE_KEYS.selectedRegionId,
      STORAGE_KEYS.subscriptionActive,
      STORAGE_KEYS.loggedInUser
    ]);
    if (!autoConnectFlag) {
      try {
        await settleSessionUsage();
      } catch (e) {}
      await chrome.proxy.settings.clear({});
      connected = false;
      currentRegion = null;
      geoInfo = null;
      await chrome.storage.local.set({
        [STORAGE_KEYS.isConnected]: false,
        [STORAGE_KEYS.connectedRegionId]: null
      });
      updateIcon(false, null);
      return;
    }
    
    await restoreConnectionState();
    const sessionStart = await getSessionStart();
    
    if (sessionStart && connected) {
      updateIcon(connected, currentRegion);
      return;
    }
    
    if (!connected && selId) {
      const region = REGIONS.find(r => r.id === selId);
      if (region) {
        const isPremium = region.id === 'kz' || region.id === 'us' || region.id === 'uk' || region.id === 'tr' || region.id === 'am' || region.id === 'se' || region.id === 'ee';
        if (!isPremium || subActive) {
          if (subActive) {
            const whitelistResult = await addClientIpToWhitelist();
            if (whitelistResult && whitelistResult.success && !whitelistResult.skipped) {
              await applyProxy(region);
            }
          } else {
            const whitelistResult = await addClientIpToWhitelist();
            if (whitelistResult && whitelistResult.success && !whitelistResult.skipped) {
              await applyProxy(region);
            }
          }
        }
      }
    }
    updateIcon(connected, currentRegion);
  } catch (e) {}
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg.type === 'GET_STATE') {
      sendResponse({ ok: true, state: await buildState() });
    } else if (msg.type === 'ADD_TO_WHITELIST') {
      const result = await addClientIpToWhitelist(msg.ip);
      sendResponse({ ok: true, result: result });
    } else if (msg.type === 'SELECT_REGION') {
      const region = REGIONS.find(r => r.id === msg.id);
      if (region) {
        const oldRegionId = currentRegion ? currentRegion.id : null;
        currentRegion = region;
        await chrome.storage.local.set({ [STORAGE_KEYS.selectedRegionId]: currentRegion.id });
        
        if (connected && oldRegionId && oldRegionId !== msg.id) {
          const data = await chrome.storage.local.get([STORAGE_KEYS.subscriptionActive]);
          const subActive = !!data[STORAGE_KEYS.subscriptionActive];
          const isPremium = region.id === 'kz' || region.id === 'us' || region.id === 'uk' || region.id === 'tr' || region.id === 'am' || region.id === 'se' || region.id === 'ee';
          
          if (isPremium && !subActive) {
            sendResponse({ ok: true, state: { currentRegion, connected, geoInfo } });
          } else {
            await applyProxy(region);
            sendResponse({ ok: true, state: await buildState() });
          }
        } else {
          sendResponse({ ok: true, state: { currentRegion, connected, geoInfo } });
        }
      } else {
        currentRegion = null;
        await chrome.storage.local.remove(STORAGE_KEYS.selectedRegionId);
        sendResponse({ ok: true, state: { currentRegion, connected, geoInfo } });
      }
    } else if (msg.type === 'CONNECT') {
      if (!currentRegion) {
        sendResponse({ ok: false, error: 'Выберите регион' });
      } else {
        const data = await chrome.storage.local.get([STORAGE_KEYS.subscriptionActive]);
        const subActive = !!data[STORAGE_KEYS.subscriptionActive];
        if ((currentRegion.id === 'kz' || currentRegion.id === 'us' || currentRegion.id === 'uk' || currentRegion.id === 'tr' || currentRegion.id === 'am' || currentRegion.id === 'se' || currentRegion.id === 'ee') && !subActive) {
          sendResponse({ ok: false, error: 'Регион недоступен' });
        } else {
          await applyProxy(currentRegion);
          sendResponse({ ok: true, state: await buildState() });
        }
      }
    } else if (msg.type === 'DISCONNECT') {
      await clearProxy();
      sendResponse({ ok: true, state: await buildState() });
    } else if (msg.type === 'APPLY_PROXY_SETTINGS') {
      try {
        if (connected && currentRegion) {
          await applyProxy(currentRegion);
        }
        sendResponse({ ok: true });
      } catch (e) {
        sendResponse({ ok: false, error: 'Failed to apply settings' });
      }
    } else if (msg.type === 'SET_AUTOCONNECT') {
      const val = !!msg.value;
      await chrome.storage.local.set({ [STORAGE_KEYS.autoConnect]: val });
      sendResponse({ ok: true });
    } else if (msg.type === 'SET_LANGUAGE') {
      await chrome.storage.local.set({ [STORAGE_KEYS.language]: msg.value });
      sendResponse({ ok: true });
    } else if (msg.type === 'REGISTER') {
      const { username, password } = msg;
    if (!username || !password) {
        sendResponse({ ok: false, error: 'Неполные данные' });
        return;
      }
    if (String(username).length < 5 || String(password).length < 5) {
      sendResponse({ ok: false, error: 'Минимальная длина 5 символов' });
      return;
    }
      try {
        const resp = await fetch(`${API_BASE}/register.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await resp.json();
        if (data.success) {
          await chrome.storage.local.set({ [STORAGE_KEYS.loggedInUser]: username });
          sendResponse({ ok: true });
        } else {
          sendResponse({ ok: false, error: data.error || 'Ошибка' });
        }
      } catch (e) {
        sendResponse({ ok: false, error: 'Сервер недоступен' });
      }
    } else if (msg.type === 'LOGIN') {
      const { username, password } = msg;
    if (!username || !password || String(username).length < 5 || String(password).length < 5) {
      sendResponse({ ok: false, error: 'Минимальная длина 5 символов' });
      return;
    }
      try {
        const userExists = await checkUserExists(username);
        if (!userExists) {
          sendResponse({ ok: false, error: 'Пользователь не найден' });
          return;
        }
        
        const resp = await fetch(`${API_BASE}/login.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await resp.json();
        if (data.success) {
          await chrome.storage.local.set({ [STORAGE_KEYS.loggedInUser]: username });
          const subResp = await fetch(`${API_BASE}/subscription.php?username=${encodeURIComponent(username)}`);
          const sub = await subResp.json();
          await chrome.storage.local.set({
            [STORAGE_KEYS.subscriptionActive]: sub.success && sub.active,
            [STORAGE_KEYS.subscriptionExpires]: sub.success ? sub.expires || null : null
          });
          sendResponse({ ok: true });
        } else {
          sendResponse({ ok: false, error: data.error || 'Ошибка' });
        }
      } catch (e) {
        sendResponse({ ok: false, error: 'Сервер недоступен' });
      }
    } else if (msg.type === 'LOGOUT') {
      if (connected) {
        await clearProxy();
      }
      await chrome.storage.local.remove([STORAGE_KEYS.loggedInUser, STORAGE_KEYS.subscriptionActive, STORAGE_KEYS.subscriptionExpires]);
      await chrome.storage.local.set({ [STORAGE_KEYS.autoConnect]: false });
      setUninstallUrlDefault();
      sendResponse({ ok: true });
    } else if (msg.type === 'ACTIVATE_LICENSE') {
      const { key } = msg;
      const userData = await chrome.storage.local.get([STORAGE_KEYS.loggedInUser]);
      const username = userData[STORAGE_KEYS.loggedInUser];
      if (!username || !key) {
        sendResponse({ ok: false, error: 'Нет данных' });
        return;
      }
      try {
        const resp = await fetch(`${API_BASE}/activate_license.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, license_key: key })
        });
        const data = await resp.json();
        if (data.success) {
          await chrome.storage.local.set({ [STORAGE_KEYS.subscriptionActive]: true, [STORAGE_KEYS.subscriptionExpires]: data.expires });
          sendResponse({ ok: true, expires: data.expires });
        } else {
          sendResponse({ ok: false, error: data.error || 'Ошибка' });
        }
      } catch (e) {
        sendResponse({ ok: false, error: 'Сервер недоступен' });
      }
    } else if (msg.type === 'GET_DEVICE_ID') {
      const deviceId = await getOrCreateDeviceId();
      sendResponse({ ok: true, deviceId });
    } else if (msg.type === 'REGISTER_SESSION') {
      const userData = await chrome.storage.local.get([STORAGE_KEYS.loggedInUser]);
      const username = userData[STORAGE_KEYS.loggedInUser];
      if (!username) {
        sendResponse({ ok: false, error: 'Не авторизован' });
        return;
      }
      const deviceId = await getOrCreateDeviceId();
      const uninstallToken = await getOrCreateUninstallToken();
      const user_agent = (msg.user_agent && typeof msg.user_agent === 'string') ? msg.user_agent : '';
      let ip = (msg.ip && typeof msg.ip === 'string') ? msg.ip.trim() : '';
      if (!ip) {
        ip = await fetchClientIp();
      }
      try {
        const resp = await fetch(API_SESSIONS_REGISTER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'aurora-ext-s': AURORA_EXT_S_TOKEN
          },
          body: JSON.stringify({ username, device_id: deviceId, ip: ip || null, user_agent: user_agent || null, uninstall_token: uninstallToken })
        });
        const data = await resp.json();
        if (data && data.success) {
          setUninstallUrlForSessionCleanup(uninstallToken);
          sendResponse({ ok: true });
        } else {
          sendResponse({ ok: false, error: (data && data.error) || 'Ошибка' });
        }
      } catch (e) {
        sendResponse({ ok: false, error: 'Сеть недоступна' });
      }
    } else if (msg.type === 'LIST_SESSIONS') {
      const userData = await chrome.storage.local.get([STORAGE_KEYS.loggedInUser]);
      const username = userData[STORAGE_KEYS.loggedInUser];
      if (!username) {
        sendResponse({ ok: false, error: 'Не авторизован', sessions: [] });
        return;
      }
      const deviceId = await getOrCreateDeviceId();
      try {
        const resp = await fetch(API_SESSIONS_LIST, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'aurora-ext-s': AURORA_EXT_S_TOKEN
          },
          body: JSON.stringify({ username, device_id: deviceId })
        });
        const data = await resp.json();
        if (data && data.success && Array.isArray(data.sessions)) {
          sendResponse({ ok: true, sessions: data.sessions });
        } else {
          sendResponse({ ok: false, sessions: [], error: (data && data.error) || 'Ошибка' });
        }
      } catch (e) {
        sendResponse({ ok: false, sessions: [], error: 'Сеть недоступна' });
      }
    } else if (msg.type === 'TERMINATE_SESSION') {
      const userData = await chrome.storage.local.get([STORAGE_KEYS.loggedInUser]);
      const username = userData[STORAGE_KEYS.loggedInUser];
      if (!username) {
        sendResponse({ ok: false, error: 'Не авторизован' });
        return;
      }
      const deviceId = await getOrCreateDeviceId();
      const session_id = msg.session_id;
      if (typeof session_id !== 'number' || session_id <= 0) {
        sendResponse({ ok: false, error: 'Неверный session_id' });
        return;
      }
      try {
        const resp = await fetch(API_SESSIONS_TERMINATE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'aurora-ext-s': AURORA_EXT_S_TOKEN
          },
          body: JSON.stringify({ username, device_id: deviceId, session_id })
        });
        const data = await resp.json();
        if (data && data.success) {
          sendResponse({ ok: true });
        } else {
          sendResponse({ ok: false, error: (data && data.error) || 'Ошибка' });
        }
      } catch (e) {
        sendResponse({ ok: false, error: 'Сеть недоступна' });
      }
    } else if (msg.type === 'DISMISS_PAYWALL') {
      await clearPaywallPending();
      sendResponse({ ok: true });
    } else if (msg.type === 'REFRESH_SUBSCRIPTION') {
      const userData = await chrome.storage.local.get([STORAGE_KEYS.loggedInUser]);
      const username = userData[STORAGE_KEYS.loggedInUser];
      if (!username) {
        sendResponse({ ok: false, error: 'Не авторизован' });
        return;
      }
      
      const userExists = await checkUserExists(username);
      if (!userExists) {
        await logoutUser();
        sendResponse({ ok: false, error: 'Пользователь не найден', loggedOut: true });
        return;
      }
      
      const deviceId = await getOrCreateDeviceId();
      try {
        const resp = await fetch(`${API_BASE}/subscription.php?username=${encodeURIComponent(username)}&device_id=${encodeURIComponent(deviceId)}`);
        const data = await resp.json();
        if (data && data.session_revoked) {
          await logoutUser();
          sendResponse({ ok: false, error: 'Сессия завершена', loggedOut: true });
          return;
        }
        if (data.success) {
          const wasActive = await chrome.storage.local.get([STORAGE_KEYS.subscriptionActive]);
          const wasActiveValue = !!wasActive[STORAGE_KEYS.subscriptionActive];
          const isActive = !!data.active;
          
          await chrome.storage.local.set({
            [STORAGE_KEYS.subscriptionActive]: isActive,
            [STORAGE_KEYS.subscriptionExpires]: data.expires || null
          });
          
          if (wasActiveValue && !isActive) {
            if (connected && currentRegion) {
              const isPremium = currentRegion.id === 'kz' || currentRegion.id === 'us' || currentRegion.id === 'uk' || currentRegion.id === 'tr' || currentRegion.id === 'am' || currentRegion.id === 'se' || currentRegion.id === 'ee';
              if (isPremium) {
                await clearProxy();
              }
            }
            await queuePaywall('premium_expired');
            sendResponse({
              ok: true,
              active: isActive,
              expires: data.expires || null,
              paywall: true,
              paywallReason: 'premium_expired'
            });
            return;
          }
          
          sendResponse({ ok: true, active: isActive, expires: data.expires || null });
        } else {
          sendResponse({ ok: false, error: data.error || 'Ошибка' });
        }
      } catch (e) {
        sendResponse({ ok: false, error: 'Сервер недоступен' });
      }
    }
  })();
  return true; 
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    await chrome.alarms.clear(ALARM_NAME);
  }
});

try {
  if (chrome.proxy && chrome.proxy.settings && chrome.proxy.settings.onChange) {
    chrome.proxy.settings.onChange.addListener(async () => {
      try {
        const info = await chrome.proxy.settings.get({});
        const level = info && info.levelOfControl ? info.levelOfControl : 'unknown';
        const conflict = level === 'not_controllable' || level === 'controlled_by_other_extensions';
        if (conflict && connected) {
          await clearProxy();
          chrome.runtime.sendMessage({ type: 'PROXY_CONFLICT' });
        }
      } catch (e) {}
    });
  }
} catch (e) {}
