/* Минимальная эмуляция chrome.* API для запуска расширения как обычного приложения. */
(function () {
  if (window.chrome && window.chrome.runtime && window.chrome.runtime.id) return;
  const CTX = window.__CTX || 'ui';            // 'bg' = фоновая часть, 'ui' = окна интерфейса
  const MY_ID = Math.random().toString(36).slice(2);
  const bc = new BroadcastChannel('yellow-vpn-bus');
  const msgListeners = new Set();
  const pending = new Map();
  let seq = 0;
  const isCap = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  const cb = (fn, val) => { if (typeof fn === 'function') { try { fn(val); } catch (e) { console.error(e); } } };

  /* ---------- runtime + сообщения между окном и фоном ---------- */
  bc.onmessage = (e) => {
    const m = e.data;
    if (m.kind === 'ping' && CTX === 'bg') { bc.postMessage({ kind: 'pong' }); return; }
    if (m.kind === 'msg') {
      const sendResponse = (r) => bc.postMessage({ kind: 'res', id: m.id, to: m.from, payload: r });
      msgListeners.forEach((fn) => {
        try { fn(m.payload, { id: 'yellow-vpn-app', url: location.href }, sendResponse); }
        catch (err) { console.error(err); }
      });
    } else if (m.kind === 'res' && m.to === MY_ID) {
      const f = pending.get(m.id);
      if (f) { pending.delete(m.id); f(m.payload); }
    }
  };

  let bgReady = CTX === 'bg';
  const waitBg = () => new Promise((resolve) => {
    if (bgReady) return resolve();
    const t = setInterval(() => bc.postMessage({ kind: 'ping' }), 100);
    const h = (e) => { if (e.data && e.data.kind === 'pong') { bgReady = true; clearInterval(t); bc.removeEventListener('message', h); resolve(); } };
    bc.addEventListener('message', h);
    bc.postMessage({ kind: 'ping' });
  });

  const runtime = {
    id: 'yellow-vpn-app',
    lastError: undefined,
    getURL: (p) => location.origin + '/' + String(p).replace(/^\//, ''),
    getManifest: () => ({ name: 'Yellow VPN', version: '3.0.1' }),
    sendMessage(msg, callback) {
      const p = (async () => {
        await waitBg();
        return new Promise((resolve) => {
          const id = ++seq + ':' + MY_ID;
          pending.set(id, resolve);
          bc.postMessage({ kind: 'msg', id, from: MY_ID, payload: msg });
          setTimeout(() => { if (pending.has(id)) { pending.delete(id); resolve(undefined); } }, 30000);
        });
      })();
      if (typeof callback === 'function') { p.then((r) => cb(callback, r)); return; }
      return p;
    },
    onMessage: { addListener: (fn) => msgListeners.add(fn), removeListener: (fn) => msgListeners.delete(fn), hasListener: (fn) => msgListeners.has(fn) },
    onInstalled: { addListener(fn) { if (CTX !== 'bg') return; setTimeout(() => {
      const first = !localStorage.getItem('yv_installed'); localStorage.setItem('yv_installed', '1');
      if (first) fn({ reason: 'install' }); }, 0); } },
    onStartup: { addListener(fn) { if (CTX === 'bg') setTimeout(() => fn(), 0); } },
    setUninstallURL() {},
    openOptionsPage() { window.open('settings.html', 'yv_settings', 'width=520,height=760'); }
  };

  /* ---------- storage.local (общий для всех окон) ---------- */
  const SKEY = 'yv_storage';
  const readAll = () => { try { return JSON.parse(localStorage.getItem(SKEY) || '{}'); } catch (_) { return {}; } };
  const changeListeners = new Set();
  const emit = (oldV, newV) => {
    const changes = {};
    new Set([...Object.keys(oldV), ...Object.keys(newV)]).forEach((k) => {
      if (JSON.stringify(oldV[k]) !== JSON.stringify(newV[k])) changes[k] = { oldValue: oldV[k], newValue: newV[k] };
    });
    if (Object.keys(changes).length) changeListeners.forEach((fn) => { try { fn(changes, 'local'); } catch (e) { console.error(e); } });
  };
  window.addEventListener('storage', (e) => {
    if (e.key !== SKEY) return;
    let o = {}, n = {};
    try { o = JSON.parse(e.oldValue || '{}'); n = JSON.parse(e.newValue || '{}'); } catch (_) {}
    emit(o, n);
  });
  const writeAll = (obj) => { const old = readAll(); localStorage.setItem(SKEY, JSON.stringify(obj)); emit(old, obj); };
  const wrap = (fn) => function (...args) {
    const last = args[args.length - 1];
    const callback = typeof last === 'function' ? args.pop() : null;
    const res = fn(...args);
    if (callback) { Promise.resolve(res).then((r) => cb(callback, r)); return; }
    return Promise.resolve(res);
  };
  const storageLocal = {
    get: wrap((keys) => {
      const all = readAll();
      if (keys == null) return all;
      if (typeof keys === 'string') keys = [keys];
      const out = {};
      if (Array.isArray(keys)) keys.forEach((k) => { if (k in all) out[k] = all[k]; });
      else Object.keys(keys).forEach((k) => { out[k] = k in all ? all[k] : keys[k]; });
      return out;
    }),
    set: wrap((items) => { writeAll(Object.assign(readAll(), items)); }),
    remove: wrap((keys) => { const a = readAll(); [].concat(keys).forEach((k) => delete a[k]); writeAll(a); }),
    clear: wrap(() => { writeAll({}); })
  };
  const storage = { local: storageLocal, onChanged: { addListener: (fn) => changeListeners.add(fn), removeListener: (fn) => changeListeners.delete(fn) } };

  /* ---------- tabs / i18n / action / alarms ---------- */
  const tabs = { create(opts) { window.open(opts.url, isCap ? '_system' : '_blank'); return Promise.resolve({}); } };
  const i18n = { getUILanguage: () => navigator.language || 'ru', getMessage: () => '' };
  const noop = () => Promise.resolve();
  const action = { setBadgeText: noop, setBadgeBackgroundColor: noop, setIcon: noop, setTitle: noop };

  const timers = new Map(); const alarmListeners = new Set();
  const alarms = {
    create(name, info) {
      alarms.clear(name);
      const fire = () => alarmListeners.forEach((fn) => fn({ name }));
      const delay = info.when ? Math.max(0, info.when - Date.now()) : (info.delayInMinutes || info.periodInMinutes || 0) * 60000;
      const t = setTimeout(() => { fire(); if (info.periodInMinutes) timers.set(name, setInterval(fire, info.periodInMinutes * 60000)); else timers.delete(name); }, delay);
      timers.set(name, t);
    },
    clear(name, callback) { const t = timers.get(name); const had = t != null; if (had) { clearTimeout(t); clearInterval(t); timers.delete(name); } cb(callback, had); return Promise.resolve(had); },
    onAlarm: { addListener: (fn) => alarmListeners.add(fn) }
  };

  /* ---------- proxy: передаётся нативному слою приложения ---------- */
  const native = () => window.__nativeProxy || (window.parent && window.parent.__nativeProxy) || null;
  function androidBanner() {
    if (!isCap || CTX === 'bg') return;
    try {
      const doc = (window.parent || window).document;
      if (doc.getElementById('yv-native-warn')) return;
      const d = doc.createElement('div'); d.id = 'yv-native-warn';
      d.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#7a1f1f;color:#fff;font:12px sans-serif;padding:8px 12px;text-align:center';
      d.textContent = 'Нативный VPN-модуль Android не подключён: трафик устройства пока не маршрутизируется.';
      doc.body.appendChild(d);
    } catch (_) {}
  }
  const proxy = {
    settings: {
      get: wrap(() => ({ levelOfControl: 'controllable_by_this_extension', value: {} })),
      set: wrap(async (details) => {
        const n = native();
        if (n && n.set) await n.set(details.value);
        else { console.warn('Нет нативного прокси-модуля'); window.parent && window.parent.postMessage({ yvWarn: 'native' }, '*'); }
      }),
      clear: wrap(async () => { const n = native(); if (n && n.clear) await n.clear(); })
    },
    onProxyError: { addListener() {} }
  };
  // баннер Android показывается в основном окне, когда фон сообщает об отсутствии нативного модуля
  if (CTX !== 'bg') window.addEventListener('message', (e) => { if (e.data && e.data.yvWarn) androidBanner(); });

  window.chrome = Object.assign(window.chrome || {}, { runtime, storage, tabs, i18n, action, alarms, proxy });
})();
