const I18N = {
  ru: {
    settingsTitle: 'Настройки',
    status: 'Статус подключения',
    options: 'Опции',
    account: 'Учётная запись',
    autoconnect: 'Автоподключение при запуске',
    language: 'Язык',
    login: 'Войти',
    register: 'Зарегистрироваться',
    logout: 'Выйти',
    username: 'Логин',
    password: 'Пароль',
    loggedInAs: 'Вы вошли как',
    browser: 'Браузер',
    proxy: 'Прокси',
    internet: 'Интернет',
    back: 'Назад',
    totalActiveTime: 'Время активного использования',
    licenseKey: 'Лицензионный ключ',
    activate: 'Активировать',
    subscription: 'Подписка',
    subscriptionUntil: 'Подписка до',
    subscriptionInactive: 'Подписка не активна',
    minLength5: 'Минимальная длина 5 символов',
    news: 'Новости',
    officialSite: 'Наш официальный сайт',
    mirror: 'Зеркало',
    day: 'день',
    days1: 'дня',
    days2: 'дней',
    hour: 'час',
    hours1: 'часа',
    hours2: 'часов',
    minute: 'минута',
    minutes1: 'минуты',
    minutes2: 'минут',
    proxyModeTitle: 'Режим прокси',
    proxyModeDescription: 'Настройте использование VPN только на выбранных сайтах, чтобы не применять его ко всему трафику',
    proxyModeAll: 'Весь трафик',
    proxyModeOnly: 'Только выбранные сайты',
    accountLink: 'Личный кабинет / Мои покупки',
    accountCabinet: 'Личный кабинет',
    sessions: 'Сессии',
    sessionsDescription: 'Устройства, вошедшие в аккаунт. Завершите сессию на другом устройстве, чтобы выйти из него.',
    sessionsEmpty: 'Нет сохранённых сессий.',
    sessionsLoading: 'Загрузка…',
    sessionsClose: 'Закрыть',
    sessionsTerminate: 'Завершить',
    sessionsCurrentDevice: 'Это устройство',
    sessionsLastSeen: 'Последняя активность',
    sessionsIP: 'IP'
  },
  en: {
    settingsTitle: 'Settings',
    status: 'Connection status',
    options: 'Options',
    account: 'Account',
    autoconnect: 'Auto‑connect on startup',
    language: 'Language',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    loggedInAs: 'Logged in as',
    browser: 'Browser',
    proxy: 'Proxy',
    internet: 'Internet',
    back: 'Back',
    totalActiveTime: 'Active usage time',
    licenseKey: 'License key',
    activate: 'Activate',
    subscription: 'Subscription',
    subscriptionUntil: 'Subscription until',
    subscriptionInactive: 'Subscription inactive',
    minLength5: 'Minimum length is 5 characters',
    news: 'News',
    officialSite: 'Our official site',
    mirror: 'Mirror',
    day: 'day',
    days1: 'days',
    days2: 'days',
    hour: 'hour',
    hours1: 'hours',
    hours2: 'hours',
    minute: 'minute',
    minutes1: 'minutes',
    minutes2: 'minutes',
    proxyModeTitle: 'Proxy mode',
    proxyModeDescription: 'Configure VPN to work only on selected websites, avoiding it for all traffic',
    proxyModeAll: 'All traffic',
    proxyModeOnly: 'Only selected sites',
    accountLink: 'Personal Account / My Purchases',
    accountCabinet: 'Personal account',
    sessions: 'Sessions',
    sessionsDescription: 'Devices signed into your account. Terminate a session on another device to sign it out.',
    sessionsEmpty: 'No saved sessions.',
    sessionsLoading: 'Loading…',
    sessionsClose: 'Close',
    sessionsTerminate: 'Terminate',
    sessionsCurrentDevice: 'This device',
    sessionsLastSeen: 'Last active',
    sessionsIP: 'IP'
  }
};

let currentLanguage = 'ru';

/**
 * Домены для режима «Только выбранные сайты» → Claude.
 * PAC (background.js) матчит каждый домен и все его поддомены (dnsDomainIs / *.domain).
 * Базовые суффиксы claude.ai / claude.com / anthropic.com покрывают API, CDN, console, statsig.*.anthropic.com.
 */
const CLAUDE_PROXY_DOMAINS = [
  'claude.ai',
  'claude.com',
  'anthropic.com',
  'claudeusercontent.com',
  'statsigapi.net',
  'featureassets.org',
  'prodregistryv2.org',
  'clerk.accounts.dev',
  'frontend-api.clerk.services',
  'challenges.cloudflare.com',
  'cdn.growthbook.io',
  'cdn.usefathom.com',
  'stripe.com'
];

const CLAUDE_PROXY_MARKER = 'claude.ai';

function domainsIncludeClaude(domains) {
  return Array.isArray(domains) && domains.some(d => typeof d === 'string' && (
    d === CLAUDE_PROXY_MARKER || CLAUDE_PROXY_DOMAINS.includes(d)
  ));
}

async function loadLanguage() {
  const data = await chrome.storage.local.get('language');
  currentLanguage = data.language || 'ru';
}

function t(key) {
  return (I18N[currentLanguage] || I18N['ru'])[key] || key;
}

function updateStaticTexts() {
  document.getElementById('settingsTitle').textContent = t('settingsTitle');
  document.getElementById('statusHeader').textContent = t('status');
  document.getElementById('optionsHeader').textContent = t('options');
  document.getElementById('authHeader').textContent = t('account');
  document.getElementById('autoconnectLabel').textContent = t('autoconnect');
  const proxyModeTitleEl = document.getElementById('proxyModeTitle');
  const proxyModeDescEl = document.getElementById('proxyModeDescription');
  if (proxyModeTitleEl) proxyModeTitleEl.textContent = t('proxyModeTitle');
  if (proxyModeDescEl) proxyModeDescEl.textContent = t('proxyModeDescription');
  const proxyModeAllLabel = document.getElementById('proxyModeAllLabel');
  const proxyModeOnlyLabel = document.getElementById('proxyModeOnlyLabel');
  if (proxyModeAllLabel) proxyModeAllLabel.textContent = t('proxyModeAll');
  if (proxyModeOnlyLabel) proxyModeOnlyLabel.textContent = t('proxyModeOnly');
  const accountCabinetEl = document.getElementById('linkAccountCabinet');
  if (accountCabinetEl) accountCabinetEl.textContent = t('accountCabinet');
  const btnSessionsEl = document.getElementById('btnSessions');
  if (btnSessionsEl) btnSessionsEl.textContent = t('sessions');
  const sessionsModalTitle = document.getElementById('sessionsModalTitle');
  const sessionsModalDescription = document.getElementById('sessionsModalDescription');
  const sessionsEmptyEl = document.getElementById('sessionsEmpty');
  const sessionsLoadingEl = document.getElementById('sessionsLoading');
  const sessionsModalCloseEl = document.getElementById('sessionsModalClose');
  if (sessionsModalTitle) sessionsModalTitle.textContent = t('sessions');
  if (sessionsModalDescription) sessionsModalDescription.textContent = t('sessionsDescription');
  if (sessionsEmptyEl) sessionsEmptyEl.textContent = t('sessionsEmpty');
  if (sessionsLoadingEl) sessionsLoadingEl.textContent = t('sessionsLoading');
  if (sessionsModalCloseEl) sessionsModalCloseEl.textContent = t('sessionsClose');
  const langSel = document.getElementById('languageSelect');
  if (langSel) langSel.value = currentLanguage;

  const newsEl = document.getElementById('linkNews');
  const siteEl = document.getElementById('linkSite');
  const mirrorEl = document.getElementById('linkMirror');
  const accountEl = document.getElementById('linkAccount');
  if (newsEl) newsEl.textContent = t('news');
  if (siteEl) siteEl.textContent = t('officialSite');
  if (mirrorEl) mirrorEl.textContent = t('mirror');
  if (accountEl) accountEl.textContent = t('accountLink');
}

let trafficUpdateInterval = null;

function renderTraffic(state) {
  const trafficEl = document.getElementById('traffic');
  if (!trafficEl) return;
  
  function updateTime() {
    const baseMs = state.totalActiveMs || 0;
    let inSessionMs = 0;
    
    if (state.connected && state.sessionStart) {
      const sessionStartTime = typeof state.sessionStart === 'number' ? state.sessionStart : parseInt(state.sessionStart);
      if (sessionStartTime && !isNaN(sessionStartTime)) {
        inSessionMs = Math.max(0, Date.now() - sessionStartTime);
      }
    }
    
    const totalMs = baseMs + inSessionMs;
    const totalSec = Math.floor(totalMs / 1000);
    const totalMin = Math.floor(totalSec / 60);
    const totalHours = Math.floor(totalMin / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = totalMin % 60;
    
    const parts = [];
    if (days > 0) {
      let dayWord;
      if (currentLanguage === 'ru') {
        const mod = days % 10;
        const mod100 = days % 100;
        if (mod100 >= 11 && mod100 <= 19) {
          dayWord = t('days2');
        } else if (mod === 1) {
          dayWord = t('day');
        } else if (mod >= 2 && mod <= 4) {
          dayWord = t('days1');
        } else {
          dayWord = t('days2');
        }
      } else {
        dayWord = days === 1 ? t('day') : t('days2');
      }
      parts.push(`${days} ${dayWord}`);
    }
    
    if (hours > 0) {
      let hourWord;
      if (currentLanguage === 'ru') {
        const mod = hours % 10;
        const mod100 = hours % 100;
        if (mod100 >= 11 && mod100 <= 19) {
          hourWord = t('hours2');
        } else if (mod === 1) {
          hourWord = t('hour');
        } else if (mod >= 2 && mod <= 4) {
          hourWord = t('hours1');
        } else {
          hourWord = t('hours2');
        }
      } else {
        hourWord = hours === 1 ? t('hour') : t('hours2');
      }
      parts.push(`${hours} ${hourWord}`);
    }
    
    if (minutes > 0 || parts.length === 0) {
      let minuteWord;
      if (currentLanguage === 'ru') {
        const mod = minutes % 10;
        const mod100 = minutes % 100;
        if (mod100 >= 11 && mod100 <= 19) {
          minuteWord = t('minutes2');
        } else if (mod === 1) {
          minuteWord = t('minute');
        } else if (mod >= 2 && mod <= 4) {
          minuteWord = t('minutes1');
        } else {
          minuteWord = t('minutes2');
        }
      } else {
        minuteWord = minutes === 1 ? t('minute') : t('minutes2');
      }
      parts.push(`${minutes} ${minuteWord}`);
    }
    
    trafficEl.textContent = `${t('totalActiveTime')}: ${parts.join(' ')}`;
  }
  
  if (trafficUpdateInterval) {
    clearInterval(trafficUpdateInterval);
    trafficUpdateInterval = null;
  }
  
  updateTime();
  
  if (state.connected && state.sessionStart) {
    trafficUpdateInterval = setInterval(() => {
      chrome.runtime.sendMessage({ type:'GET_STATE' }, (resp) => {
        if (resp && resp.ok && resp.state) {
          state.totalActiveMs = resp.state.totalActiveMs || 0;
          state.sessionStart = resp.state.sessionStart;
          state.connected = resp.state.connected;
          updateTime();
        }
      });
    }, 60000);
  }
}

async function renderAuth(state) {
  const container = document.getElementById('authContent');
  const authSection = document.getElementById('authSection');
  if (!container) return;
  container.innerHTML = '';

  if (!state.loggedInUser) {
    const storageData = await chrome.storage.local.get(['loggedInUser', 'subscriptionActive', 'subscriptionExpires']);
    if (storageData.loggedInUser) {
      state.loggedInUser = storageData.loggedInUser;
      state.subscriptionActive = !!storageData.subscriptionActive;
      state.subscriptionExpires = storageData.subscriptionExpires || null;
    }
  }

  const loggedInUser = state.loggedInUser;
  if (!loggedInUser) {
    if (authSection) authSection.style.display = 'none';
    return;
  }
  if (authSection) authSection.style.display = '';
    const info = document.createElement('div');
    info.className = 'info';
    info.textContent = `${t('loggedInAs')}: ${loggedInUser}`;
    container.appendChild(info);

    const subInfo = document.createElement('div');
    subInfo.className = 'info';
    if (state.subscriptionActive && state.subscriptionExpires) {
      subInfo.textContent = `${t('subscriptionUntil')}: ${new Date(state.subscriptionExpires).toLocaleDateString()}`;
    } else {
      subInfo.textContent = t('subscriptionInactive');
      const licDiv = document.createElement('div');
      licDiv.className = 'license-section';
      const keyInput = document.createElement('input');
      keyInput.placeholder = t('licenseKey');
      keyInput.id = 'licenseKeyInput';
      const actBtn = document.createElement('button');
      actBtn.textContent = t('activate');
      actBtn.addEventListener('click', () => {
        const key = keyInput.value.trim();
        if (!key) return;
        chrome.runtime.sendMessage({ type:'ACTIVATE_LICENSE', key }, (res) => {
          const modal = document.getElementById('activationModal');
          const title = document.getElementById('activationTitle');
          const msg = document.getElementById('activationMessage');
          const tips = document.getElementById('activationTips');
          const close = document.getElementById('activationClose');
          const support = document.getElementById('activationSupport');
          if (!modal || !title || !msg || !close || !tips) return;
          tips.innerHTML = '';
          tips.style.display = 'none';
          if (support) support.style.display = 'none';
          if (res && res.ok) {
            title.textContent = (currentLanguage === 'ru') ? 'Успешная активация' : 'Activation successful';
            msg.textContent = (currentLanguage === 'ru') ? 'Подписка активирована. Спасибо!' : 'Subscription activated. Thank you!';
            modal.classList.add('show');
            close.onclick = () => { modal.classList.remove('show'); initialize(); };
          } else {
            title.textContent = (currentLanguage === 'ru') ? 'Не удалось активировать ключ' : 'Activation failed';
            const reason = (res && res.error) ? res.error : ((currentLanguage === 'ru') ? 'Неизвестная ошибка' : 'Unknown error');
            msg.textContent = reason;
            const list = [
              (currentLanguage === 'ru') ? 'Проверьте правильность ввода ключа.' : 'Check that the key is entered correctly.',
              (currentLanguage === 'ru') ? 'Ключ мог быть уже активирован ранее.' : 'The key may have been already activated.',
              (currentLanguage === 'ru') ? 'Если покупка была недавно — подождите 1–2 минуты и повторите.' : 'If you purchased recently, wait 1–2 minutes and try again.'
            ];
            list.forEach(t => { const li = document.createElement('li'); li.textContent = t; tips.appendChild(li); });
            tips.style.display = 'block';
            if (support) support.style.display = 'block';
            modal.classList.add('show');
            close.onclick = () => { modal.classList.remove('show'); };
          }
        });
      });
      licDiv.appendChild(keyInput);
      licDiv.appendChild(actBtn);
      container.appendChild(licDiv);
    }
    container.appendChild(subInfo);

    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = t('logout');
    logoutBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type:'LOGOUT' }, (res) => {
        if (res.ok) {
          initialize();
        }
      });
    });
    container.appendChild(logoutBtn);
}

let lastRenderedUser = null;

async function initialize(onDone) {
  const sessionsModal = document.getElementById('sessionsModal');
  if (sessionsModal) sessionsModal.classList.remove('show');

  if (trafficUpdateInterval) {
    clearInterval(trafficUpdateInterval);
    trafficUpdateInterval = null;
  }
  
  await loadLanguage();
  updateStaticTexts();
  chrome.runtime.sendMessage({ type:'GET_STATE' }, async (resp) => {
    const hidePreloader = () => {
      const el = document.getElementById('pagePreloader');
      if (el) el.classList.add('hidden');
    };
    if (!resp || !resp.ok) {
      hidePreloader();
      return;
    }
    let state = resp.state;
    const warn = document.getElementById('settingsProxyWarning');
    const openExtBtn = document.getElementById('settingsOpenExtensions');
    if (warn) {
      const conflict = state.proxyControl && state.proxyControl.conflict;
      if (conflict) {
        warn.style.display = 'block';
        warn.textContent = (currentLanguage === 'ru')
          ? 'Обнаружен конфликт прокси: другое VPN‑расширение управляет прокси. Удалите сторонние VPN‑расширения.'
          : 'Proxy conflict detected: another VPN extension controls proxy. Remove third‑party VPN extensions.';
        if (openExtBtn) {
          openExtBtn.style.display = 'inline-block';
          openExtBtn.textContent = (currentLanguage === 'ru') ? 'Открыть страницу расширений' : 'Open extensions page';
        }
      } else {
        warn.style.display = 'none';
        warn.textContent = '';
        if (openExtBtn) openExtBtn.style.display = 'none';
      }
    }
    if (state.loggedInUser) {
      const sub = await new Promise(resolve => chrome.runtime.sendMessage({ type:'REFRESH_SUBSCRIPTION' }, resolve));
      if (sub && sub.ok) {
        state.subscriptionActive = sub.active;
        state.subscriptionExpires = sub.expires;
      }
    }
    
    const storageData = await chrome.storage.local.get([
      'loggedInUser',
      'subscriptionActive',
      'subscriptionExpires'
    ]);
    if (storageData.loggedInUser) {
      state.loggedInUser = storageData.loggedInUser;
    }
    if (typeof storageData.subscriptionActive !== 'undefined') {
      state.subscriptionActive = !!storageData.subscriptionActive;
    }
    if (storageData.subscriptionExpires) {
      state.subscriptionExpires = storageData.subscriptionExpires;
    }
    
    renderTraffic(state);
    await renderAuth(state);
    lastRenderedUser = state.loggedInUser || null;
    if (state.loggedInUser) {
      chrome.runtime.sendMessage({ type: 'REGISTER_SESSION', user_agent: navigator.userAgent }, () => {});
    }
    const data = await chrome.storage.local.get('autoConnect');
    const autoFlag = data.autoConnect || false;
    const chk = document.getElementById('autoconnectChk');
    if (chk) {
      chk.checked = !!autoFlag;
    }
    const p = await chrome.storage.local.get(['proxyMode','proxyOnlyDomains']);
    const mode = p.proxyMode || 'all';
    const domains = Array.isArray(p.proxyOnlyDomains) ? p.proxyOnlyDomains : [];
    const rAll = document.getElementById('proxyModeAll');
    const rOnly = document.getElementById('proxyModeOnly');
    if (rAll && rOnly) {
      rAll.checked = mode === 'all';
      rOnly.checked = mode === 'proxy_only';
      const block = document.getElementById('proxyOnlySites');
      if (block) block.style.display = (mode === 'proxy_only') ? 'block' : 'none';
    }
    const hasYouTube = domains.some(d => ['youtube.com','youtu.be','ytimg.com','googlevideo.com','youtubei.googleapis.com','youtube-nocookie.com','ytmusic.com','youtubekids.com','ggpht.com','gvt1.com','gvt2.com','gvt3.com','googleusercontent.com'].includes(d));
    const hasInstagramOrFacebook = domains.some(d => ['instagram.com','cdninstagram.com','fbcdn.net','facebook.com','messenger.com','fbsbx.com','cdn.fbsbx.com'].includes(d));
    const hasFacebook = domains.some(d => ['facebook.com','messenger.com','fbsbx.com','cdn.fbsbx.com','fbcdn.net'].includes(d));
    const hasTwitter = domains.some(d => ['twitter.com','x.com','twimg.com','t.co'].includes(d));
    const hasChatGPT = domains.some(d => ['openai.com','api.openai.com','platform.openai.com','cdn.openai.com','oaiusercontent.com','auth0.openai.com','chatgpt.com','sora.com'].includes(d));
    const hasDiscord = domains.some(d => ['discord.com','ptb.discord.com','canary.discord.com','discordapp.com','discordapp.net','discord.gg','cdn.discordapp.com','media.discordapp.net','images-ext-1.discordapp.net','images-ext-2.discordapp.net','status.discord.com','discordstatus.com','discord.media','dis.gd'].includes(d));
    const hasTelegram = domains.some(d => ['web.telegram.org','telegram.org','t.me','telegra.ph','telegram.me','api.telegram.org','core.telegram.org','telesco.pe','cdn1.telesco.pe','cdn2.telesco.pe','cdn3.telesco.pe','cdn4.telesco.pe','cdn5.telesco.pe','telegram.dog'].includes(d));
    const hasGemini = domains.some(d => ['gemini.google.com','ai.google.dev','generativelanguage.googleapis.com','bard.google.com','content-generativelanguage.googleapis.com','aistudio.google.com'].includes(d));
    const hasClaude = domainsIncludeClaude(domains);
    const cYouTube = document.getElementById('proxyYouTube');
    const cInstagram = document.getElementById('proxyInstagram');
    const cFacebook = document.getElementById('proxyFacebook');
    const cTwitter = document.getElementById('proxyTwitter');
    const cChatGPT = document.getElementById('proxyChatGPT');
    const cDiscord = document.getElementById('proxyDiscord');
    const cTelegram = document.getElementById('proxyTelegram');
    const cGemini = document.getElementById('proxyGemini');
    const cClaude = document.getElementById('proxyClaude');
    if (cYouTube) cYouTube.checked = hasYouTube;
    if (cInstagram) cInstagram.checked = hasInstagramOrFacebook;
    if (cFacebook) cFacebook.checked = hasFacebook || hasInstagramOrFacebook; // share cdn
    if (cTwitter) cTwitter.checked = hasTwitter;
    if (cChatGPT) cChatGPT.checked = hasChatGPT;
    if (cDiscord) cDiscord.checked = hasDiscord;
    if (cTelegram) cTelegram.checked = hasTelegram;
    if (cGemini) cGemini.checked = hasGemini;
    if (cClaude) cClaude.checked = hasClaude;
    [cYouTube,cInstagram,cFacebook,cTwitter,cChatGPT,cDiscord,cTelegram,cGemini,cClaude].forEach(cb => {
      if (!cb) return;
      const label = cb.closest('label.service');
      if (label) label.classList.toggle('selected', !!cb.checked);
    });
    hidePreloader();
    if (typeof onDone === 'function') onDone();
  });
}

document.getElementById('autoconnectChk').addEventListener('change', (e) => {
  const val = e.target.checked;
  chrome.runtime.sendMessage({ type:'SET_AUTOCONNECT', value: val });
});

document.getElementById('languageSelect').addEventListener('change', async (e) => {
  const val = e.target.value;
  await chrome.runtime.sendMessage({ type:'SET_LANGUAGE', value: val });
  await initialize();
});

function buildSelectedDomains() {
  const d = new Set();
  const y = document.getElementById('proxyYouTube');
  const ig = document.getElementById('proxyInstagram');
  const fb = document.getElementById('proxyFacebook');
  const tw = document.getElementById('proxyTwitter');
  const cg = document.getElementById('proxyChatGPT');
  const dc = document.getElementById('proxyDiscord');
  const tg = document.getElementById('proxyTelegram');
  const gm = document.getElementById('proxyGemini');
  const cl = document.getElementById('proxyClaude');
  if (y && y.checked) {
    ['youtube.com','youtu.be','ytimg.com','googlevideo.com','youtubei.googleapis.com','youtube-nocookie.com','ytmusic.com','youtubekids.com','ggpht.com','gvt1.com','gvt2.com','gvt3.com','googleusercontent.com'].forEach(v => d.add(v));
  }
  if ((ig && ig.checked) || (fb && fb.checked)) {
    ['instagram.com','cdninstagram.com','fbcdn.net','facebook.com','messenger.com','fbsbx.com','cdn.fbsbx.com'].forEach(v => d.add(v));
  }
  if (tw && tw.checked) {
    ['twitter.com','x.com','twimg.com','t.co'].forEach(v => d.add(v));
  }
  if (cg && cg.checked) {
    ['openai.com','api.openai.com','platform.openai.com','cdn.openai.com','oaiusercontent.com','auth0.openai.com','chatgpt.com','sora.com'].forEach(v => d.add(v));
  }
  if (dc && dc.checked) {
    [
      'discord.com', 'ptb.discord.com', 'canary.discord.com', 'discordapp.com', 'discordapp.net', 'discord.gg',
      'cdn.discordapp.com', 'media.discordapp.net', 'images-ext-1.discordapp.net', 'images-ext-2.discordapp.net',
      'status.discord.com', 'discordstatus.com', 'discord.media', 'dis.gd'
    ].forEach(v => d.add(v));
  }
  if (tg && tg.checked) {
    [
      'web.telegram.org', 'telegram.org', 't.me', 'telegra.ph', 'telegram.me', 'api.telegram.org', 'core.telegram.org',
      'telesco.pe', 'cdn1.telesco.pe', 'cdn2.telesco.pe', 'cdn3.telesco.pe', 'cdn4.telesco.pe', 'cdn5.telesco.pe',
      'telegram.dog'
    ].forEach(v => d.add(v));
  }
  if (gm && gm.checked) {
    [
      'gemini.google.com', 'ai.google.dev', 'generativelanguage.googleapis.com', 'bard.google.com',
      'content-generativelanguage.googleapis.com', 'aistudio.google.com'
    ].forEach(v => d.add(v));
  }
  if (cl && cl.checked) {
    CLAUDE_PROXY_DOMAINS.forEach(v => d.add(v));
  }
  return Array.from(d);
}

async function saveProxyMode(mode) {
  await chrome.storage.local.set({ proxyMode: mode });
  chrome.runtime.sendMessage({ type:'APPLY_PROXY_SETTINGS' });
}

async function saveProxyDomains() {
  const list = buildSelectedDomains();
  const hasTwitter = list.includes('twitter.com') || list.includes('x.com');
  if (hasTwitter) {
    if (!list.includes('twitter.com')) list.push('twitter.com');
    if (!list.includes('x.com')) list.push('x.com');
  }
  await chrome.storage.local.set({ proxyOnlyDomains: list });
  chrome.runtime.sendMessage({ type:'APPLY_PROXY_SETTINGS' });
}

document.addEventListener('change', (e) => {
  const t = e.target;
  if (t && t.name === 'proxyMode') {
    const mode = t.value;
    const block = document.getElementById('proxyOnlySites');
    if (block) block.style.display = (mode === 'proxy_only') ? 'block' : 'none';
    saveProxyMode(mode);
  }
  if (t && (t.id === 'proxyYouTube' || t.id === 'proxyInstagram' || t.id === 'proxyFacebook' || t.id === 'proxyTwitter' || t.id === 'proxyChatGPT' || t.id === 'proxyDiscord' || t.id === 'proxyTelegram' || t.id === 'proxyGemini' || t.id === 'proxyClaude')) {
    const label = t.closest('label.service');
    if (label) label.classList.toggle('selected', !!t.checked);
    saveProxyDomains();
  }
});

const settingsOpenExtensions = document.getElementById('settingsOpenExtensions');
if (settingsOpenExtensions) {
  settingsOpenExtensions.addEventListener('click', () => {
    const url = 'chrome://extensions';
    try { chrome.tabs.create({ url }); } catch (e) { try { window.open(url, '_blank'); } catch (_) {} }
  });
}

function openSessionsModal() {
  const modal = document.getElementById('sessionsModal');
  const listEl = document.getElementById('sessionsList');
  const emptyEl = document.getElementById('sessionsEmpty');
  const loadingEl = document.getElementById('sessionsLoading');
  if (!modal || !listEl) return;

  chrome.storage.local.get(['loggedInUser'], (data) => {
    const currentUser = data.loggedInUser || null;
    if (!currentUser) {
      if (modal.classList.contains('show')) modal.classList.remove('show');
      return;
    }
    if (currentUser !== lastRenderedUser) {
      initialize(() => {
        doOpenSessionsModal(
          document.getElementById('sessionsModal'),
          document.getElementById('sessionsList'),
          document.getElementById('sessionsEmpty'),
          document.getElementById('sessionsLoading')
        );
      });
      return;
    }
    doOpenSessionsModal(modal, listEl, emptyEl, loadingEl);
  });
}

function doOpenSessionsModal(modal, listEl, emptyEl, loadingEl) {
  if (!modal || !listEl) return;
  modal.classList.add('show');
  listEl.innerHTML = '';
  if (emptyEl) emptyEl.style.display = 'none';
  if (loadingEl) loadingEl.style.display = 'block';
  chrome.runtime.sendMessage({ type: 'LIST_SESSIONS' }, (resp) => {
    if (loadingEl) loadingEl.style.display = 'none';
    if (!resp || !resp.ok) {
      if (emptyEl) {
        emptyEl.textContent = (resp && resp.error) || t('sessionsEmpty');
        emptyEl.style.display = 'block';
      }
      return;
    }
    const sessions = resp.sessions || [];
    if (sessions.length === 0) {
      if (emptyEl) {
        emptyEl.textContent = t('sessionsEmpty');
        emptyEl.style.display = 'block';
      }
      return;
    }
    sessions.forEach((s) => {
      const card = document.createElement('div');
      card.style.cssText = 'padding:12px 14px;margin-bottom:8px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);';
      const lastSeen = s.last_seen ? new Date(s.last_seen).toLocaleString() : '—';
      const ip = (s.ip || '').trim() || '—';
      const ua = (s.user_agent || '').slice(0, 60) + ((s.user_agent || '').length > 60 ? '…' : '');
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;margin-bottom:4px">${s.is_current ? '<span style="color:var(--accent)">' + t('sessionsCurrentDevice') + '</span>' : (ua || ip)}</div>
            <div style="font-size:12px;color:var(--muted)">${t('sessionsIP')}: ${escapeHtmlSession(ip)}</div>
            <div style="font-size:12px;color:var(--muted);margin-top:2px">${t('sessionsLastSeen')}: ${lastSeen}</div>
          </div>
          ${s.is_current ? '' : `<button type="button" data-session-id="${s.id}" class="sessions-terminate-btn" style="padding:6px 12px;font-size:13px;border-radius:8px;border:1px solid rgba(255,104,104,.5);background:rgba(255,104,104,.15);color:var(--danger);cursor:pointer;white-space:nowrap">${t('sessionsTerminate')}</button>`}
        </div>
      `;
      listEl.appendChild(card);
      const termBtn = card.querySelector('.sessions-terminate-btn');
      if (termBtn) {
        termBtn.addEventListener('click', () => {
          const sid = parseInt(termBtn.dataset.sessionId, 10);
          if (!sid) return;
          termBtn.disabled = true;
          chrome.runtime.sendMessage({ type: 'TERMINATE_SESSION', session_id: sid }, (r) => {
            if (r && r.ok) {
              doOpenSessionsModal(
                document.getElementById('sessionsModal'),
                document.getElementById('sessionsList'),
                document.getElementById('sessionsEmpty'),
                document.getElementById('sessionsLoading')
              );
            } else {
              termBtn.disabled = false;
            }
          });
        });
      }
    });
  });
}

function escapeHtmlSession(s) {
  if (s == null) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

const btnSessions = document.getElementById('btnSessions');
if (btnSessions) {
  btnSessions.addEventListener('click', openSessionsModal);
}
const sessionsModalClose = document.getElementById('sessionsModalClose');
if (sessionsModalClose) {
  sessionsModalClose.addEventListener('click', () => {
    const modal = document.getElementById('sessionsModal');
    if (modal) modal.classList.remove('show');
  });
}
document.getElementById('sessionsModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'sessionsModal') {
    e.target.classList.remove('show');
  }
});

document.addEventListener('DOMContentLoaded', initialize);