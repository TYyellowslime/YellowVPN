const REGIONS = [
  { id: 'nl', name: 'Netherlands' },
  { id: 'gm', name: 'Germany' },
  { id: 'am', name: 'Armenia' },
  { id: 'se', name: 'Sweden' },
  { id: 'tr', name: 'Turkey' },
  { id: 'us', name: 'USA' },
  { id: 'ee', name: 'Estonia' },
  { id: 'uk', name: 'Switzerland' },
  { id: 'kz', name: 'Kazakhstan' }
];

const I18N = {
  ru: {
    title: 'Yellow VPN',
    subtitleFree: 'Серверы Aurora · без локального таймера',
    subtitlePaid: 'Выберите регион',
    connect: 'Подключиться',
    disconnect: 'Отключить',
    disconnectedState: 'Отключено',
    connectedState: 'Подключено',
    how: 'Как подключиться?',
    settings: 'Настройки',
    buy: 'Купить подписку',
    modalTitle: 'Как подключиться?',
    modalStepsFree: [
      'Выберите нужный регион в списке.',
      'Нажмите «Подключиться».',
      'Доступ к серверам зависит от правил Aurora.'
    ],
    modalStepsPaid: [
      'Выберите нужный регион в списке.',
      'Нажмите Connect.',
      'Используйте VPN до окончания срока подписки.'
    ],
    ok: 'Понятно',
    timeRemaining: 'Осталось',
    freeEnded: 'Бесплатное время истекло',
    hourEndedAlert: 'Ваш бесплатный час истёк. Соединение было отключено.',
    subscriptionUntil: 'Подписка до'
    ,login: 'Войти'
    ,register: 'Зарегистрироваться'
    ,username: 'Логин'
    ,password: 'Пароль'
    ,noAccount: 'У вас нет аккаунта?'
    ,haveAccount: 'Уже есть аккаунт?'
    ,loginSubtitle: 'Войдите или зарегистрируйтесь'
    ,invalidCreds: 'Неверный логин или пароль'
    ,missingData: 'Введите логин и пароль'
    ,generalError: 'Ошибка'
    ,soon: 'Скоро'
    ,premium: 'Премиум'
    ,premiumHint: 'Доступно по подписке'
    ,proxyConflictTitle: 'Обнаружен конфликт прокси',
    proxyConflictText: 'В браузере найдено другое VPN‑расширение, которое управляет прокси. Удалите сторонние VPN‑расширения, иначе Yellow VPN работать не будет.',
    openExtensions: 'Открыть страницу расширений',
    help: 'Помощь',
    support: 'Поддержка',
    telegramChannel: 'Наш Telegram канал',
    loading: 'Загрузка...',
    welcomeTitle: 'Добро пожаловать в Yellow VPN!',
    telegramModalText: 'Подпишитесь на наш Telegram канал, чтобы получать:',
    telegramModalBenefits: [
      'Новости о новых серверах',
      'Специальные предложения', 
      'Техническую поддержку'
    ],
    subscribeToChannel: 'Подписаться на канал',
    skip: 'Пропустить',
    minLength5: 'Минимальная длина 5 символов',
    renew: 'Продлить подписку',
    forgotPassword: 'Забыл пароль',
    autoConnectTooltip: 'Автоподключение к самому быстрому серверу',
    proxyModeAll: 'Весь трафик',
    proxyModeOnly: 'Только выбранные сайты',
    proxyModeTooltipAll: 'Весь трафик · нажмите для выбранных сайтов',
    proxyModeTooltipOnly: 'Только выбранные сайты · нажмите для всего трафика',
    giveawayTitle: '🎉 Розыгрыш 1500 звёзд ⭐ Telegram!',
    giveawayText: 'Мы проводим розыгрыш на 1500 звёзд в нашем Telegram канале!',
    giveawayDescription: 'Подпишитесь на канал, чтобы участвовать и получать новости о новых обновлениях и специальных акциях.',
    goToTelegram: 'Узнать больше',
    securityCheckTimeout: 'Проверка не завершилась. VPN отключен. Проверьте интернет и откройте расширение снова.',
    connectTimeout: 'Превышено время ожидания подключения к серверу.',
    paywallPremiumTitle: 'Подписка закончилась',
    paywallPremiumText: 'Продлите премиум на сайте — без лимитов, Premium‑серверы и один аккаунт на все устройства.',
    paywallFreeTitle: 'Пробный час закончился',
    paywallFreeText: 'Пробный доступ завершён. Оформите премиум на сайте — один аккаунт на все устройства.',
    paywallBenefits: [
      'От 125 ₽/мес — зависит от срока тарифа',
      'Премиум без автосписаний — оплата разово',
      'VPN на всех устройствах без доплаты',
      'Онлайн‑чат поддержки прямо на сайте'
    ],
    paywallPrice: '',
    paywallCtaRenew: 'Продлить премиум',
    paywallCtaBuy: 'Купить премиум',
    paywallDismiss: 'Не сейчас',
    subtitleExhausted: 'Пробный час закончился',
    upsellTimer: 'Премиум от 125 ₽/мес · без автосписаний',
    upsellTimerSoft: 'Пробный час закончился',
    upsellHints: 'Все устройства без доплаты · онлайн‑чат на сайте'
  },
  en: {
    title: 'Yellow VPN',
    subtitleFree: 'Aurora servers · no local timer',
    subtitlePaid: 'Select region',
    connect: 'Connect',
    disconnect: 'Disconnect',
    disconnectedState: 'Disconnected',
    connectedState: 'Connected',
    how: 'How to connect?',
    settings: 'Settings',
    buy: 'Buy subscription',
    modalTitle: 'How to connect?',
    modalStepsFree: [
      'Select the desired region from the list.',
      'Click Connect.',
      'Server access is subject to Aurora policies.'
    ],
    modalStepsPaid: [
      'Select the desired region from the list.',
      'Click Connect.',
      'Use the VPN until your subscription expires.'
    ],
    ok: 'OK',
    timeRemaining: 'Remaining',
    freeEnded: 'Free time ended',
    hourEndedAlert: 'Your free hour has expired. Connection has been disconnected.',
    subscriptionUntil: 'Subscription valid until'
    ,login: 'Login'
    ,register: 'Register'
    ,username: 'Username'
    ,password: 'Password'
    ,noAccount: 'No account?'
    ,haveAccount: 'Already have an account?'
    ,loginSubtitle: 'Login or register'
    ,invalidCreds: 'Invalid credentials'
    ,missingData: 'Missing data'
    ,generalError: 'Error',
    soon: 'Soon',
    forgotPassword: 'Forgot password?'
    ,premium: 'Premium'
    ,premiumHint: 'Available with subscription'
    ,proxyConflictTitle: 'Proxy conflict detected',
    proxyConflictText: 'Another VPN extension controls the browser proxy. Remove third‑party VPN extensions or Yellow VPN will not work.',
    openExtensions: 'Open extensions page',
    help: 'Help',
    support: 'Support',
    telegramChannel: 'Our Telegram channel',
    loading: 'Loading...',
    welcomeTitle: 'Welcome to Yellow VPN!',
    telegramModalText: 'Subscribe to our Telegram channel to receive:',
    telegramModalBenefits: [
      'News about new servers',
      'Special offers',
      'Technical support'
    ],
    subscribeToChannel: 'Subscribe to channel',
    skip: 'Skip',
    minLength5: 'Minimum length is 5 characters',
    renew: 'Renew subscription',
    autoConnectTooltip: 'Auto-connect to the fastest server',
    proxyModeAll: 'All traffic',
    proxyModeOnly: 'Only selected sites',
    proxyModeTooltipAll: 'All traffic · click for selected sites',
    proxyModeTooltipOnly: 'Only selected sites · click for all traffic',
    giveawayTitle: '🎉 1500 Stars Giveaway!',
    giveawayText: 'We are hosting a giveaway for 1500 stars in our Telegram channel!',
    giveawayDescription: 'Subscribe to the channel to not miss the giveaway and receive news about new servers and special offers.',
    goToTelegram: 'Go to Telegram',
    securityCheckTimeout: 'Security check did not complete. VPN disconnected. Check your internet and open the extension again.',
    connectTimeout: 'Connection to server timed out.',
    paywallPremiumTitle: 'Subscription ended',
    paywallPremiumText: 'Renew Premium on the website — unlimited access, Premium servers, one account for all devices.',
    paywallFreeTitle: 'Trial hour ended',
    paywallFreeText: 'Your trial is over. Get Premium on the website — one account for all devices.',
    paywallBenefits: [
      'From 125 ₽/mo — depends on plan length',
      'Premium with no auto-renew — pay once',
      'VPN on all devices at no extra cost',
      'Live support chat on the website'
    ],
    paywallPrice: '',
    paywallCtaRenew: 'Renew Premium',
    paywallCtaBuy: 'Buy Premium',
    paywallDismiss: 'Not now',
    subtitleExhausted: 'Trial hour ended',
    upsellTimer: 'Premium from 125 ₽/mo · no auto-renew',
    upsellTimerSoft: 'Trial hour ended',
    upsellHints: 'All devices included · live chat on the website'
  }
};

const REGION_NAMES = {
  ru: { nl:'Нидерланды', gm:'Германия', am:'Армения', se:'Швеция', tr:'Турция', us:'США', ee:'Эстония', uk:'Швейцария', kz:'Казахстан' },
  en: { nl:'Netherlands', gm:'Germany', am:'Armenia', se:'Sweden', tr:'Turkey', us:'USA', ee:'Estonia', uk:'Switzerland', kz:'Kazakhstan' }
};

let currentLanguage = 'ru';

async function loadLanguage() {
  const data = await chrome.storage.local.get('language');
  currentLanguage = data.language || 'ru';
}

function t(key) {
  const dict = I18N[currentLanguage] || I18N['ru'];
  return dict[key] || key;
}

function escapeHtml(s) {
  return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const regionContainer = document.getElementById('regions');
const btnToggle = document.getElementById('btnToggle');
const btnAutoConnect = document.getElementById('btnAutoConnect');
const btnProxyMode = document.getElementById('btnProxyMode');
const stateText = document.getElementById('stateText');
const serverText = document.getElementById('serverText');
const flagEl = document.getElementById('flag');
const timerEl = document.getElementById('timer');
const modal = document.getElementById('modal');
const btnHow = document.getElementById('how');
const btnClose = document.getElementById('closeModal');
const settingsBtn = document.getElementById('settingsBtn');
const buyBtn = document.getElementById('buyBtn');
const helpBtn = document.getElementById('helpBtn');
const telegramBtn = document.getElementById('telegramBtn');
const renewBtn = document.getElementById('renewBtn');
const telegramGiveawayModal = document.getElementById('telegramGiveawayModal');
const openTelegramChannel = document.getElementById('openTelegramChannel');
const closeGiveawayModal = document.getElementById('closeGiveawayModal');
const paywallModal = document.getElementById('paywallModal');
const paywallTitle = document.getElementById('paywallTitle');
const paywallText = document.getElementById('paywallText');
const paywallBenefits = document.getElementById('paywallBenefits');
const paywallPrice = document.getElementById('paywallPrice');
const paywallCta = document.getElementById('paywallCta');
const paywallDismiss = document.getElementById('paywallDismiss');
const PAYWALL_PRICING_URL = 'https://links-aurora.pro/website#pricing';
let paywallVisible = false;

const authContainer = document.getElementById('authContainer');
const authUsername = document.getElementById('authUsername');
const authPassword = document.getElementById('authPassword');
const authSubmit   = document.getElementById('authSubmit');
const authToggle   = document.getElementById('toggleAuth');
const statusDiv       = document.querySelector('.status');
const connectDiv      = document.querySelector('.connect');
const extraButtonsDiv = document.querySelector('.extra-buttons');

const popupError = document.getElementById('popupError');
const authError  = document.getElementById('authError');
const conflictOverlay = document.getElementById('conflictOverlay');
const openExtensionsBtn = document.getElementById('openExtensions');
const loadingOverlay = document.getElementById('loadingOverlay');

let isRegister = false;
let loggedIn = false;
let isAutoConnecting = false;
let freeExhausted = false;
const upsellHintsEl = document.getElementById('upsellHints');

function computeFreeExhausted(remainingMs, sessionStart, isConnectedNow) {
  return false;
}

function applyAccessMode() {
  const label = document.querySelector('.btn-label');
  const showUpsell = !!(freeExhausted && !isPaid && !connected);

  if (upsellHintsEl) upsellHintsEl.style.display = 'none';

  if (showUpsell) {
    if (timerEl) {
      timerEl.textContent = t('upsellTimerSoft');
      timerEl.classList.remove('expired');
      timerEl.classList.add('expired-soft');
    }
    if (label) label.textContent = t('paywallCtaBuy');
    if (btnToggle) {
      btnToggle.classList.add('upsell-buy');
      btnToggle.classList.remove('disconnected');
      btnToggle.disabled = false;
      btnToggle.style.opacity = '';
      btnToggle.style.cursor = '';
    }
  } else if (btnToggle) {
    btnToggle.classList.remove('upsell-buy');
    if (timerEl) timerEl.classList.remove('expired-soft');
  }
}

function showLoading(customText = null) {
  if (loadingOverlay) {
    loadingOverlay.style.display = 'flex';
    const loadingText = document.getElementById('loadingText');
    if (loadingText) {
      loadingText.textContent = customText || t('loading');
    }
  }
}

function hideLoading() {
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }
}

function updateAuthTexts() {
  if (!authContainer) return;
  if (authUsername) authUsername.placeholder = t('username');
  if (authPassword) authPassword.placeholder = t('password');
  if (authSubmit) authSubmit.textContent = isRegister ? t('register') : t('login');
  if (authToggle) authToggle.textContent = isRegister ? t('haveAccount') : t('noAccount');
  const forgotPasswordLink = document.getElementById('forgotPassword');
  if (forgotPasswordLink) forgotPasswordLink.textContent = t('forgotPassword');
  hideAuthError();
}

function showAuthError(msg) {
  if (!authError) return;
  const forgotPasswordLink = document.getElementById('forgotPassword');
  if (msg) {
    authError.textContent = msg;
    authError.style.display = 'block';
    if (forgotPasswordLink && msg === t('invalidCreds')) {
      forgotPasswordLink.style.display = 'block';
    } else if (forgotPasswordLink) {
      forgotPasswordLink.style.display = 'none';
    }
  } else {
    hideAuthError();
  }
}

function hideAuthError() {
  if (!authError) return;
  authError.style.display = 'none';
  authError.textContent = '';
  const forgotPasswordLink = document.getElementById('forgotPassword');
  if (forgotPasswordLink) forgotPasswordLink.style.display = 'none';
}

function showPopupError(msg) {
  if (!popupError) return;
  if (msg) {
    popupError.textContent = msg;
    popupError.style.display = 'block';
  } else {
    hidePopupError();
  }
}

function hidePopupError() {
  if (!popupError) return;
  popupError.style.display = 'none';
  popupError.textContent = '';
}

function dismissPaywall(openPricing) {
  if (paywallModal) paywallModal.classList.add('hidden');
  document.body.classList.remove('paywall-open');
  paywallVisible = false;
  chrome.runtime.sendMessage({ type: 'DISMISS_PAYWALL' }, () => {});
  if (openPricing) {
    window.open(PAYWALL_PRICING_URL, '_blank');
  }
}

function showPaywall(reason) {
  if (!paywallModal || paywallVisible) return;
  const isFree = reason === 'free_ended';
  if (paywallTitle) paywallTitle.textContent = isFree ? t('paywallFreeTitle') : t('paywallPremiumTitle');
  if (paywallText) paywallText.textContent = isFree ? t('paywallFreeText') : t('paywallPremiumText');
  if (paywallBenefits) {
    paywallBenefits.innerHTML = '';
    const items = (I18N[currentLanguage] && I18N[currentLanguage].paywallBenefits) || I18N.ru.paywallBenefits;
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      paywallBenefits.appendChild(li);
    });
  }
  if (paywallPrice) paywallPrice.textContent = '';
  if (paywallCta) paywallCta.textContent = isFree ? t('paywallCtaBuy') : t('paywallCtaRenew');
  if (paywallDismiss) paywallDismiss.textContent = t('paywallDismiss');
  if (telegramGiveawayModal) telegramGiveawayModal.classList.add('hidden');
  if (modal) modal.classList.add('hidden');
  hidePopupError();
  document.body.classList.add('paywall-open');
  paywallModal.classList.remove('hidden');
  paywallVisible = true;
}

async function maybeShowPendingPaywall() {
  try {
    const data = await chrome.storage.local.get('paywallPending');
    const pending = data && data.paywallPending;
    if (pending && pending.reason) {
      showPaywall(pending.reason);
    }
  } catch (e) {}
}

function applyProxyModeUi(mode, domainCount) {
  if (!btnProxyMode) return;
  const visible = loggedIn && isPaid && domainCount > 0;
  btnProxyMode.style.display = visible ? 'flex' : 'none';
  if (!visible) return;
  const sites = mode === 'proxy_only';
  btnProxyMode.classList.toggle('active', sites);
  btnProxyMode.classList.toggle('vpn-on', !!connected);
  btnProxyMode.setAttribute('aria-pressed', sites ? 'true' : 'false');
  btnProxyMode.title = sites ? t('proxyModeTooltipOnly') : t('proxyModeTooltipAll');
}

async function loadAndRenderProxyMode() {
  const p = await chrome.storage.local.get(['proxyMode', 'proxyOnlyDomains']);
  const mode = p.proxyMode || 'all';
  const domains = Array.isArray(p.proxyOnlyDomains) ? p.proxyOnlyDomains : [];
  applyProxyModeUi(mode, domains.length);
}

async function toggleProxyMode() {
  if (!btnProxyMode || !isPaid) return;
  const p = await chrome.storage.local.get(['proxyMode', 'proxyOnlyDomains']);
  const domains = Array.isArray(p.proxyOnlyDomains) ? p.proxyOnlyDomains : [];
  if (domains.length === 0) {
    applyProxyModeUi(p.proxyMode || 'all', 0);
    return;
  }
  const current = p.proxyMode || 'all';
  const next = current === 'proxy_only' ? 'all' : 'proxy_only';
  applyProxyModeUi(next, domains.length);
  await chrome.storage.local.set({ proxyMode: next });
  chrome.runtime.sendMessage({ type: 'APPLY_PROXY_SETTINGS' });
}

function showAuth() {
  if (authContainer) {
    authContainer.style.display = 'flex';
    if (authUsername) authUsername.value = '';
    if (authPassword) authPassword.value = '';
    updateAuthTexts();
    hideAuthError();
    hidePopupError();
  }
  if (regionContainer) regionContainer.style.display = 'none';
  const regionsWrapperEl = document.querySelector('.regions-wrapper');
  if (regionsWrapperEl) regionsWrapperEl.style.display = 'none';
  document.querySelectorAll('.divider').forEach(d => d.style.display = 'none');
  if (statusDiv) statusDiv.style.display = 'none';
  if (connectDiv) connectDiv.style.display = 'none';
  if (btnHow) btnHow.style.display = 'none';
  if (extraButtonsDiv) extraButtonsDiv.style.display = 'none';
  if (btnAutoConnect) btnAutoConnect.style.display = 'none';
  if (btnProxyMode) btnProxyMode.style.display = 'none';
  
  const topButtonsContainer = document.getElementById('top-buttons-container');
  const bottomButtonsContainer = document.getElementById('bottom-buttons-container');
  if (topButtonsContainer) topButtonsContainer.style.display = 'none';
  if (bottomButtonsContainer) bottomButtonsContainer.style.display = 'none';
}

function hideAuth() {
  if (authContainer) authContainer.style.display = 'none';
  if (regionContainer) regionContainer.style.display = '';
  const regionsWrapperEl = document.querySelector('.regions-wrapper');
  if (regionsWrapperEl) regionsWrapperEl.style.display = '';
  document.querySelectorAll('.divider').forEach(d => d.style.display = '');
    if (statusDiv) statusDiv.style.display = '';
  if (connectDiv) connectDiv.style.display = '';
  if (btnHow) btnHow.style.display = '';
  if (extraButtonsDiv) extraButtonsDiv.style.display = '';
  if (btnAutoConnect) {
    btnAutoConnect.style.display = isPaid ? 'flex' : 'none';
  }
  loadAndRenderProxyMode();
  const topButtonsContainer = document.getElementById('top-buttons-container');
  const bottomButtonsContainer = document.getElementById('bottom-buttons-container');
  if (topButtonsContainer) topButtonsContainer.style.display = 'flex';
  if (bottomButtonsContainer) bottomButtonsContainer.style.display = 'flex';

  hideAuthError();
  hidePopupError();
}

function handleAuthSubmit() {
  const username = authUsername ? authUsername.value.trim() : '';
  const password = authPassword ? authPassword.value : '';
  if (!username || !password) {
    showAuthError(t('missingData'));
    return;
  }
  if (username.length < 5 || password.length < 5) {
    showAuthError(t('minLength5'));
    return;
  }
  const type = isRegister ? 'REGISTER' : 'LOGIN';
  chrome.runtime.sendMessage({ type, username, password }, (res) => {
    if (res && res.ok) {
      if (isRegister) isRegister = false;
      refresh();
    } else {
      const errMsg = (res && res.error) || null;
      let translated;
      if (errMsg === 'Invalid credentials') {
        translated = t('invalidCreds');
      } else if (errMsg === 'Missing data') {
        translated = t('missingData');
      } else if (errMsg) {
        translated = errMsg;
      } else {
        translated = t('generalError');
      }
      showAuthError(translated);
    }
  });
}

if (authSubmit) {
  authSubmit.addEventListener('click', handleAuthSubmit);
}

if (authContainer) {
  authContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target;
      if (target === authUsername && authPassword) {
        authPassword.focus();
      } else if (target === authPassword) {
        handleAuthSubmit();
      }
    }
  });
}
if (authToggle) {
  authToggle.addEventListener('click', () => {
    isRegister = !isRegister;
    updateAuthTexts();
  });
}

let selectedId = null;
let connected = false;
let countdownInterval = null;
let isPaid = false;
let subscriptionExpires = null;
let currentRegion = null;
let carouselIndex = 0;
const VISIBLE_SERVERS = 3;
let serverStatuses = {};
let statusCheckInterval = null;

async function checkServerStatuses() {
  try {
    const response = await fetch('https://servers-aurora-w.ru/aurora_support_chat/proxy_monitor/api/proxy_servers_status.php');
    const data = await response.json();
    
    if (data.ok && Array.isArray(data.data)) {
      const newStatuses = {};
      data.data.forEach(item => {
        newStatuses[item.region_code] = item.status;
      });
      serverStatuses = newStatuses;
      
      chrome.runtime.sendMessage({ type: 'GET_STATE' }, ({ ok, state }) => {
        if (ok && state) {
          const isConnected = state.connected;
          const connectedRegion = state.currentRegion;
          
          if (isConnected && connectedRegion && serverStatuses[connectedRegion.id] === 'offline') {
            chrome.runtime.sendMessage({ type: 'DISCONNECT' }, () => {
              showPopupError(currentLanguage === 'ru' 
                ? 'Сервер недоступен. Отключено автоматически.' 
                : 'Server unavailable. Disconnected automatically.');
              refresh();
            });
          }
        }
      });
      
      buildRegions();
      updateConnectButtonState();
    }
  } catch (e) {
  }
}

function updateCarouselButtons() {
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const wrapperEl = document.querySelector('.regions-wrapper');
  if (!prevBtn || !nextBtn) return;
  if (authContainer && authContainer.style.display !== 'none') {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }
  const btns = Array.from(document.querySelectorAll('.region-btn'));
  const totalWidth = btns.reduce((sum, el) => sum + el.offsetWidth, 0) + Math.max(0, btns.length - 1) * 6;
  const wrapperWidth = wrapperEl ? wrapperEl.clientWidth : 0;
  const canScroll = totalWidth > wrapperWidth + 1;
  if (!canScroll) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    carouselIndex = 0;
    if (regionContainer) regionContainer.style.transform = 'translateX(0)';
    return;
  }
  const maxIndex = Math.max(0, REGIONS.length - VISIBLE_SERVERS);
  const atStart = carouselIndex === 0;
  const atEnd = carouselIndex >= maxIndex;
  prevBtn.style.display = atStart ? 'none' : 'flex';
  nextBtn.style.display = atEnd ? 'none' : 'flex';
}

function scrollCarousel(direction) {
  const maxIndex = Math.max(0, REGIONS.length - VISIBLE_SERVERS);
  const step = Math.max(1, VISIBLE_SERVERS);
  carouselIndex = Math.max(0, Math.min(maxIndex, carouselIndex + direction * step));
  const regionBtns = document.querySelectorAll('.region-btn');
  const offset = carouselIndex * (regionBtns[0]?.offsetWidth + 6 || 0);
  regionContainer.style.transform = `translateX(-${offset}px)`;
  updateCarouselButtons();
}

function scrollToSelectedRegion() {
  if (!selectedId) return;
  const selectedIdx = REGIONS.findIndex(r => r.id === selectedId);
  if (selectedIdx === -1) return;
  
  const maxIndex = Math.max(0, REGIONS.length - VISIBLE_SERVERS);
  
  if (selectedIdx < VISIBLE_SERVERS) {
    carouselIndex = 0;
  } else if (selectedIdx === REGIONS.length - 1) {
    carouselIndex = maxIndex;
  } else {
    carouselIndex = Math.floor(selectedIdx / VISIBLE_SERVERS) * VISIBLE_SERVERS;
    carouselIndex = Math.min(carouselIndex, maxIndex);
  }
  
  const regionBtns = document.querySelectorAll('.region-btn');
  if (regionBtns.length > 0) {
    const step = (regionBtns[0]?.offsetWidth + 6) || 0;
    const offset = carouselIndex * step;
    regionContainer.style.transform = `translateX(-${offset}px)`;
    updateCarouselButtons();
  }
}

function buildRegions() {
  regionContainer.innerHTML = '';
  REGIONS.forEach(r => {
    const isPremiumServer = (r.id === 'kz' || r.id === 'us' || r.id === 'uk' || r.id === 'tr' || r.id === 'am' || r.id === 'se' || r.id === 'ee');
    const isPremiumLocked = isPremiumServer && !isPaid;
    const serverStatus = serverStatuses[r.id];
    const isOffline = serverStatus === 'offline';
    const isAvailable = !isPremiumLocked && !isOffline;
    let latency = null;
    if (isAvailable) {
      if (r.id === 'us') {
        latency = Math.floor(120 + Math.random() * 80);
      } else if (r.id === 'tr') {
        latency = Math.floor(70 + Math.random() * 20);
      } else if (r.id === 'kz') {
        latency = Math.floor(90 + Math.random() * 30);
      } else {
        latency = Math.floor(40 + Math.random() * 60);
      }
    }
    const div = document.createElement('div');
    div.className = 'region-btn';
    if (selectedId && selectedId === r.id) {
      div.classList.add('selected');
    }
    if (isPremiumLocked) {
      div.classList.add('premium');
      div.setAttribute('title', t('premiumHint'));
    }
    if (isOffline) {
      div.classList.add('offline');
      div.setAttribute('title', currentLanguage === 'ru' ? 'Сервер недоступен' : 'Server unavailable');
    }
    div.dataset.id = r.id;
    const name = REGION_NAMES[currentLanguage][r.id] || r.name;
    let latencyText;
    if (isOffline) {
      latencyText = currentLanguage === 'ru' ? 'Недоступен' : 'Offline';
    } else if (isPremiumLocked) {
      latencyText = t('premium');
    } else {
      latencyText = `${latency} ms`;
    }
    div.innerHTML = `
      <div class="region-flag flag-${r.id}"></div>
      <div class="region-name">${name}</div>
      <div class="region-latency${r.id === 'us' ? ' us' : ''}${r.id === 'kz' ? ' kz' : ''}${isOffline ? ' offline' : ''}">${latencyText}</div>
    `;
    if (isOffline) {
      div.style.cursor = 'not-allowed';
      div.style.opacity = '0.5';
    } else if (isPremiumLocked) {
      div.addEventListener('click', () => {
        if (freeExhausted) {
          showPaywall('free_ended');
        } else {
          window.open(PAYWALL_PRICING_URL, '_blank');
        }
      });
    } else {
      div.addEventListener('click', () => selectRegion(r.id));
    }
    regionContainer.appendChild(div);
  });
  setTimeout(() => {
    carouselIndex = 0;
    regionContainer.style.transform = 'translateX(0)';
    scrollToSelectedRegion();
  }, 0);
}

function updateConnectButtonState() {
  if (!btnToggle) return;
  if (freeExhausted && !isPaid && !connected) {
    btnToggle.disabled = false;
    btnToggle.style.opacity = '';
    btnToggle.style.cursor = '';
    return;
  }
  if (connected) {
    btnToggle.disabled = false;
    btnToggle.style.opacity = '';
    btnToggle.style.cursor = '';
    return;
  }
  const isOffline = serverStatuses[selectedId] === 'offline';
  const isPremiumLocked = ((selectedId === 'kz' || selectedId === 'us' || selectedId === 'uk' || selectedId === 'tr' || selectedId === 'am' || selectedId === 'se' || selectedId === 'ee') && !isPaid);
  btnToggle.disabled = isOffline || isPremiumLocked;
  if (isOffline || isPremiumLocked) {
    btnToggle.style.opacity = '0.5';
    btnToggle.style.cursor = 'not-allowed';
  } else {
    btnToggle.style.opacity = '';
    btnToggle.style.cursor = '';
  }
}

function selectRegion(id) {
  selectedId = id;
  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.id === id);
  });
  
  scrollToSelectedRegion();
  updateConnectButtonState();
  
  if (connected && currentRegion && currentRegion.id !== id) {
    const isOffline = serverStatuses[id] === 'offline';
    if (isOffline) {
      showPopupError(currentLanguage === 'ru' 
        ? 'Сервер недоступен. Отключаемся...' 
        : 'Server unavailable. Disconnecting...');
      chrome.runtime.sendMessage({ type: 'DISCONNECT' }, () => {
        refresh();
      });
      return;
    }
    
    btnToggle.classList.add('connecting');
    btnToggle.disabled = true;
    
    chrome.runtime.sendMessage({ type:'SELECT_REGION', id }, ({ ok, error, state }) => {
      btnToggle.classList.remove('connecting');
      btnToggle.disabled = false;
      
      if (!ok && error) {
        showPopupError(error);
      }
      refresh();
    });
  } else {
    chrome.runtime.sendMessage({ type:'SELECT_REGION', id });
  }
}

async function startCountdown(isConnected) {
  clearInterval(countdownInterval);
  if (isPaid && subscriptionExpires) {
    function updateSub() {
      const left = subscriptionExpires - Date.now();
      if (left <= 0) {
        timerEl.textContent = t('freeEnded');
        timerEl.classList.add('expired');
        clearInterval(countdownInterval);
        chrome.runtime.sendMessage({ type: 'REFRESH_SUBSCRIPTION' }, (response) => {
          if (response && response.paywall) {
            showPaywall(response.paywallReason || 'premium_expired');
          } else {
            maybeShowPendingPaywall();
          }
          refresh(true);
        });
        return;
      }
      const days = Math.ceil(left / 86400000);
      const daysText = (currentLanguage === 'ru') ? `Осталось: ${days} ${days === 1 ? 'день' : (days>=2 && days<=4 ? 'дня' : 'дней')}` : `${t('timeRemaining')}: ${days} days`;
      timerEl.textContent = daysText;
      timerEl.classList.remove('expired');
    }
    updateSub();
    countdownInterval = setInterval(updateSub, 3600000);
    return;
  }
  timerEl.textContent = currentLanguage === 'ru' ? 'Таймер отключён' : 'Timer disabled';
  timerEl.classList.remove('expired', 'expired-soft');
}

const REFRESH_TIMEOUT_MS = 15000;
const CONNECT_TIMEOUT_MS = 5000;

function refresh(skipLoading = false) {
  if (!skipLoading && !isAutoConnecting) {
    showLoading(currentLanguage === 'ru' 
      ? 'Проверка безопасности. Не закрывайте расширение.' 
      : 'Security check. Do not close the extension.');
  } else {
    hideLoading();
  }
  
  let refreshDone = false;
  let refreshTimeoutId = null;
  
  function clearRefreshTimeout() {
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
      refreshTimeoutId = null;
    }
  }
  
  function onRefreshTimeout() {
    if (refreshDone) return;
    refreshDone = true;
    clearRefreshTimeout();
    hideLoading();
    showPopupError(t('securityCheckTimeout'));
    chrome.runtime.sendMessage({ type: 'DISCONNECT' }, () => {
      refresh(true);
    });
  }
  
  if (!skipLoading && !isAutoConnecting) {
    refreshTimeoutId = setTimeout(onRefreshTimeout, REFRESH_TIMEOUT_MS);
  }
  
  chrome.runtime.sendMessage({ type:'ADD_TO_WHITELIST' }, (whitelistResponse) => {
    if (refreshDone) return;
    if (whitelistResponse && whitelistResponse.ok && whitelistResponse.result) {
      const result = whitelistResponse.result;
      if (result.skipped) {
        continueRefresh();
        return;
      }
    }
    continueRefresh();
  });
  
  function continueRefresh() {
    if (refreshDone) return;
    chrome.runtime.sendMessage({ type:'REFRESH_SUBSCRIPTION' }, (response) => {
      if (refreshDone) return;
      if (response && response.loggedOut) {
        clearRefreshTimeout();
        refreshDone = true;
        hideLoading();
        refresh();
        return;
      }
      const paywallFromRefresh = !!(response && response.paywall);
      const paywallReasonFromRefresh = response && response.paywallReason;
      chrome.runtime.sendMessage({ type:'GET_STATE' }, ({ ok, state }) => {
        if (refreshDone) return;
        clearRefreshTimeout();
        refreshDone = true;
        hideLoading();
        if (!ok) return;
    const { currentRegion: cr, connected: conn, geoInfo, subscriptionActive, subscriptionExpires: subExp, loggedInUser, proxyControl, selectedRegionId, remainingMs, sessionStart } = state;
    connected = conn;
    currentRegion = cr || null;
    isPaid = !!subscriptionActive;
    subscriptionExpires = subExp ? new Date(subExp).getTime() : null;
    loggedIn = !!loggedInUser;
    freeExhausted = computeFreeExhausted(remainingMs, sessionStart, connected);
    hideAuth();
    if (loggedIn) {
      chrome.runtime.sendMessage({ type: 'REGISTER_SESSION', user_agent: navigator.userAgent }, () => {});
    }
    if (currentRegion) {
      selectedId = currentRegion.id;
    } else if (selectedRegionId) {
      selectedId = selectedRegionId;
    }
    stateText.textContent = connected ? t('connectedState') : t('disconnectedState');
    stateText.classList.toggle('off', !connected);
    if (connected && geoInfo) {
      flagEl.textContent = geoInfo.countryCode ? String.fromCodePoint(...[...geoInfo.countryCode].map(c=>0x1F1E6-65+c.charCodeAt())) : '🏳️';
      serverText.textContent = `${geoInfo.country || ''} ${geoInfo.city ? '('+geoInfo.city+')' : ''}`.trim();
    } else {
      flagEl.textContent = '🏳️';
      serverText.textContent = '—';
    }
    startCountdown(connected);
    updateStaticTexts();
    buildRegions();
    updateConnectButtonState();
    const labelEl = document.querySelector('.btn-label');
    if (labelEl) {
      if (connected) {
        labelEl.textContent = t('disconnect');
      } else if (!(freeExhausted && !isPaid)) {
        labelEl.textContent = t('connect');
      }
    }
    if (btnToggle) {
      btnToggle.classList.toggle('disconnected', connected);
      if (connected) btnToggle.classList.remove('upsell-buy');
    }
    applyAccessMode();
    
    const cardElement = document.querySelector('.card.glass');
    if (cardElement) {
      cardElement.classList.toggle('connected', connected);
    }
    
    if (btnAutoConnect) {
      btnAutoConnect.style.display = isPaid ? 'flex' : 'none';
    }

    const hasConflict = proxyControl && proxyControl.conflict;
    if (conflictOverlay) {
      conflictOverlay.classList.toggle('hidden', !hasConflict);
      const title = document.getElementById('conflictTitle');
      const text = document.getElementById('conflictText');
      if (title) title.textContent = t('proxyConflictTitle');
      if (text) text.textContent = t('proxyConflictText');
      if (openExtensionsBtn) openExtensionsBtn.textContent = t('openExtensions');
    }

    if (btnToggle) {
      if (hasConflict) {
        btnToggle.disabled = true;
      } else {
        updateConnectButtonState();
      }
    }

    if (paywallFromRefresh) {
      showPaywall(paywallReasonFromRefresh || 'premium_expired');
    } else {
      maybeShowPendingPaywall();
    }
    });
    });
  }
}

function createBlackHoleAnimation() {
  const overlay = document.createElement('div');
  overlay.className = 'black-hole-overlay';
  overlay.id = 'blackHoleOverlay';
  
  const container = document.createElement('div');
  container.className = 'black-hole-container';
  
  const blackHole = document.createElement('div');
  blackHole.className = 'black-hole';
  
  const cometCount = 12;
  for (let i = 0; i < cometCount; i++) {
    const comet = document.createElement('div');
    comet.className = 'comet';
    const angle = (Math.PI * 2 * i) / cometCount;
    const distance = 250 + Math.random() * 150;
    const endX = 50 + Math.cos(angle) * (distance / 10);
    const endY = 50 + Math.sin(angle) * (distance / 10);
    const angleDeg = (angle * 180 / Math.PI) + 180;
    comet.style.setProperty('--comet-end-x', `${endX}%`);
    comet.style.setProperty('--comet-end-y', `${endY}%`);
    comet.style.setProperty('--comet-angle', `${angleDeg}deg`);
    comet.style.animationDelay = `${Math.random() * 0.15 + 0.05}s`;
    container.appendChild(comet);
  }
  
  container.appendChild(blackHole);
  overlay.appendChild(container);
  document.body.appendChild(overlay);
  
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });
  
  setTimeout(() => {
    overlay.classList.remove('active');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 400);
  }, 1800);
}

async function autoConnectToFastestServer() {
  if (!loggedIn) {
    showPopupError(currentLanguage === 'ru' ? 'Войдите в аккаунт для использования автоподключения' : 'Please login to use auto-connect');
    isAutoConnecting = false;
    return;
  }
  
  if (!isPaid) {
    showPopupError(currentLanguage === 'ru' ? 'Автоподключение доступно только для премиум пользователей' : 'Auto-connect is available only for premium users');
    isAutoConnecting = false;
    return;
  }
  
  if (btnAutoConnect) {
    btnAutoConnect.disabled = true;
  }
  
  isAutoConnecting = true;
  
  hideLoading();
  
  createBlackHoleAnimation();
  
  try {
    const response = await fetch('https://servers-aurora-w.ru/aurora_support_chat/proxy_monitor/api/proxy_servers_best.php', {
      method: 'GET',
      headers: {
        'Authorization': 'aurora_973ea990d627ad54ed702a181535b295'
      }
    });
    
    const data = await response.json();
    
    if (data.ok && data.data && data.data.country_code) {
      const countryCode = data.data.country_code.toUpperCase();
      
      const countryToRegion = {
        'NL': 'nl',
        'DE': 'gm',
        'AM': 'am',
        'SE': 'se',
        'TR': 'tr',
        'US': 'us',
        'EE': 'ee',
        'CH': 'uk',
        'KZ': 'kz'
      };
      
      const regionId = countryToRegion[countryCode];
      
      if (regionId) {
        const region = REGIONS.find(r => r.id === regionId);
        if (region) {
          const isPremium = region.id === 'kz' || region.id === 'us' || region.id === 'uk' || region.id === 'tr' || region.id === 'am' || region.id === 'se' || region.id === 'ee';
          if (isPremium && !isPaid) {
            showPopupError(currentLanguage === 'ru' ? 'Этот сервер доступен только по подписке' : 'This server is available only with subscription');
            if (btnAutoConnect) btnAutoConnect.disabled = false;
            return;
          }
          
          if (connected && currentRegion && currentRegion.id === regionId) {
            refresh();
            isAutoConnecting = false;
            if (btnAutoConnect) btnAutoConnect.disabled = false;
            return;
          }
          
          selectRegion(regionId);
          
          if (!connected) {
            btnToggle.classList.add('connecting');
            btnToggle.disabled = true;
            
            chrome.runtime.sendMessage({ type: 'CONNECT' }, ({ ok, error }) => {
              btnToggle.classList.remove('connecting');
              btnToggle.disabled = false;
              
              if (!ok && error) {
                showPopupError(error);
              }
              refresh();
              isAutoConnecting = false;
              if (btnAutoConnect) btnAutoConnect.disabled = false;
            });
          } else {
            setTimeout(() => {
              refresh();
              isAutoConnecting = false;
              if (btnAutoConnect) btnAutoConnect.disabled = false;
            }, 500);
          }
        } else {
          showPopupError(currentLanguage === 'ru' ? 'Регион не найден' : 'Region not found');
          isAutoConnecting = false;
          if (btnAutoConnect) btnAutoConnect.disabled = false;
        }
      } else {
        showPopupError(currentLanguage === 'ru' ? 'Неизвестный регион' : 'Unknown region');
        isAutoConnecting = false;
        if (btnAutoConnect) btnAutoConnect.disabled = false;
      }
    } else {
      showPopupError(currentLanguage === 'ru' ? 'Ошибка получения данных сервера' : 'Failed to get server data');
      isAutoConnecting = false;
      if (btnAutoConnect) btnAutoConnect.disabled = false;
    }
  } catch (error) {
    showPopupError(currentLanguage === 'ru' ? 'Ошибка подключения к серверу' : 'Connection error');
    isAutoConnecting = false;
    if (btnAutoConnect) btnAutoConnect.disabled = false;
  }
}

if (btnAutoConnect) {
  btnAutoConnect.addEventListener('click', () => {
    autoConnectToFastestServer();
  });
}

if (btnProxyMode) {
  btnProxyMode.addEventListener('click', () => {
    toggleProxyMode();
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (changes.proxyMode || changes.proxyOnlyDomains) {
    loadAndRenderProxyMode();
  }
});

btnToggle.addEventListener('click', () => {
  const action = connected ? 'DISCONNECT' : 'CONNECT';
  
  if (action === 'CONNECT') {
    if (freeExhausted && !isPaid) {
      window.open(PAYWALL_PRICING_URL, '_blank');
      return;
    }
    const isOffline = serverStatuses[selectedId] === 'offline';
    if (isOffline) {
      showPopupError(currentLanguage === 'ru' 
        ? 'Сервер недоступен. Выберите другой регион.' 
        : 'Server unavailable. Please select another region.');
      return;
    }
    
    btnToggle.classList.add('connecting');
    btnToggle.disabled = true;
    
    let connectDone = false;
    const connectTimeoutId = setTimeout(() => {
      if (connectDone) return;
      connectDone = true;
      btnToggle.classList.remove('connecting');
      btnToggle.disabled = false;
      showPopupError(t('connectTimeout'));
      chrome.runtime.sendMessage({ type: 'DISCONNECT' }, () => {
        refresh();
      });
    }, CONNECT_TIMEOUT_MS);
    
    chrome.runtime.sendMessage({ type: action }, (res) => {
      if (connectDone) return;
      connectDone = true;
      clearTimeout(connectTimeoutId);
      btnToggle.classList.remove('connecting');
      btnToggle.disabled = false;
      const ok = res && res.ok;
      const error = res && res.error;
      if (!ok && error) {
        showPopupError(error);
      }
      refresh();
    });
    return;
  }
  
  chrome.runtime.sendMessage({ type: action }, ({ ok, error }) => {
    btnToggle.classList.remove('connecting');
    btnToggle.disabled = false;
    
    if (!ok && error) {
      showPopupError(error);
    }
    refresh();
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'EXPIRED') {
    refresh();
    showPaywall(msg.paywallReason || 'free_ended');
  }
  if (msg.type === 'SHOW_PAYWALL') {
    showPaywall(msg.reason || 'premium_expired');
  }
  if (msg.type === 'LOGOUT') {
    refresh();
  }
  if (msg.type === 'SERVER_OFFLINE') {
    showPopupError(currentLanguage === 'ru' 
      ? 'Сервер недоступен. Отключено автоматически.' 
      : 'Server unavailable. Disconnected automatically.');
    refresh();
  }
});

if (paywallCta) {
  paywallCta.addEventListener('click', () => dismissPaywall(true));
}
if (paywallDismiss) {
  paywallDismiss.addEventListener('click', () => dismissPaywall(false));
}

btnHow.addEventListener('click', () => modal.classList.remove('hidden'));
btnClose.addEventListener('click', () => modal.classList.add('hidden'));

if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('settings.html'));
    }
  });
}

if (buyBtn) {
  buyBtn.addEventListener('click', () => {
    window.open('https://links-aurora.pro/website#pricing', '_blank');
  });
}

if (renewBtn) {
  renewBtn.addEventListener('click', () => {
    window.open('https://links-aurora.pro/website#pricing', '_blank');
  });
}

const helpBtnEl = document.getElementById('helpBtn');
if (helpBtnEl) {
  helpBtnEl.addEventListener('click', () => {
    window.open('https://links-aurora.pro/website', '_blank');
  });
}

function openExtensionsPage() {
  const url = 'chrome://extensions';
  try {
    chrome.tabs.create({ url });
  } catch (e) {
    try { window.open(url, '_blank'); } catch (_) {}
  }
}

if (openExtensionsBtn) {
  openExtensionsBtn.addEventListener('click', openExtensionsPage);
}

if (telegramBtn) {
  telegramBtn.addEventListener('click', () => {
    window.open('tg://resolve?domain=aurora_vpn_extension', '_blank');
  });
}

const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
if (carouselPrev) {
  carouselPrev.addEventListener('click', () => scrollCarousel(-1));
}
if (carouselNext) {
  carouselNext.addEventListener('click', () => scrollCarousel(1));
}

const BTN_ICONS = {
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"/><path d="M19.4 13a7.6 7.6 0 0 0 0-2l1.8-1.4-1.8-3.1-2.2.9a7.4 7.4 0 0 0-1.7-1L15.2 3h-6.4l-.3 3.4a7.4 7.4 0 0 0-1.7 1l-2.2-.9L3 9.6 4.8 11a7.6 7.6 0 0 0 0 2L3 14.4l1.8 3.1 2.2-.9a7.4 7.4 0 0 0 1.7 1l.3 3.4h6.4l.3-3.4a7.4 7.4 0 0 0 1.7-1l2.2.9 1.8-3.1L19.4 13z"/></svg>',
  support: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.25"/><path d="M9.75 9.7a2.35 2.35 0 1 1 3.1 2.2c-.8.38-1.3.95-1.3 1.75"/><circle cx="12" cy="16.6" r="0.7" fill="currentColor" stroke="none"/></svg>',
  premium: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16.5 3.8 8.8 8 11l4-6.5 4 6.5 4.2-2.2L19 16.5H5z"/><path d="M6.5 19h11"/></svg>',
  renew: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.2-5.6"/><path d="M20 4.5V9h-4.5"/></svg>'
};

function setButtonWithIcon(btn, iconKey, label) {
  if (!btn) return;
  const icon = BTN_ICONS[iconKey] || '';
  btn.classList.add('btn-with-icon');
  btn.innerHTML = `<span class="btn-ico">${icon}</span><span class="btn-txt">${label}</span>`;
}

function updateStaticTexts() {
  const titleEl = document.querySelector('.titles h1');
  const titleTextEl = document.getElementById('titleText');
  const subtitleEl = document.querySelector('.subtitle');
  if (titleTextEl) {
    titleTextEl.textContent = t('title');
  }
  if (subtitleEl) {
    if (isPaid) {
      subtitleEl.textContent = t('subtitlePaid');
    } else {
      subtitleEl.textContent = t('subtitleFree');
    }
  }
  if (btnAutoConnect) {
    btnAutoConnect.title = t('autoConnectTooltip');
    btnAutoConnect.style.display = isPaid ? 'flex' : 'none';
  }
  if (loggedIn) {
    loadAndRenderProxyMode();
  }
  
  const howBtn = document.getElementById('how');
  const settingsBtn = document.getElementById('settingsBtn');
  const helpBtn = document.getElementById('helpBtn');
  const telegramBtn = document.getElementById('telegramBtn');
  const buyBtn = document.getElementById('buyBtn');
  const renewBtn = document.getElementById('renewBtn');
  
  const topButtonsContainer = document.getElementById('top-buttons-container');
  const bottomButtonsContainer = document.getElementById('bottom-buttons-container');

  if (topButtonsContainer) topButtonsContainer.innerHTML = '';
  if (bottomButtonsContainer) bottomButtonsContainer.innerHTML = '';

  if (howBtn) howBtn.textContent = t('how');
  if (telegramBtn) telegramBtn.textContent = 'Telegram';
  setButtonWithIcon(settingsBtn, 'settings', t('settings'));
  setButtonWithIcon(helpBtn, 'support', t('support') || t('help'));
  setButtonWithIcon(buyBtn, 'premium', currentLanguage === 'ru' ? 'Купить премиум' : 'Buy Premium');
  setButtonWithIcon(renewBtn, 'renew', t('renew'));

  if (isPaid) {
    if (topButtonsContainer) {
      if (renewBtn) {
        renewBtn.style.display = 'inline';
        topButtonsContainer.appendChild(renewBtn);
      }
    }
    
    if (bottomButtonsContainer) {
      if (settingsBtn) bottomButtonsContainer.appendChild(settingsBtn);
      if (helpBtn) {
        helpBtn.style.display = 'inline';
        bottomButtonsContainer.appendChild(helpBtn);
      }
      if (telegramBtn) bottomButtonsContainer.appendChild(telegramBtn);
    }
    
    if (buyBtn) buyBtn.style.display = 'none';
    if (howBtn) howBtn.style.display = 'none';
  } else if (freeExhausted && loggedIn) {
    if (howBtn) howBtn.style.display = 'none';
    if (buyBtn) buyBtn.style.display = 'none';
    if (renewBtn) renewBtn.style.display = 'none';
    if (topButtonsContainer && telegramBtn) {
      topButtonsContainer.appendChild(telegramBtn);
    }
    if (bottomButtonsContainer) {
      if (settingsBtn) bottomButtonsContainer.appendChild(settingsBtn);
      if (helpBtn) {
        helpBtn.style.display = 'inline';
        bottomButtonsContainer.appendChild(helpBtn);
      }
    }
  } else {
    if (topButtonsContainer) {
      if (howBtn) {
        howBtn.style.display = 'inline';
        topButtonsContainer.appendChild(howBtn);
      }
      if (telegramBtn) topButtonsContainer.appendChild(telegramBtn);
    }
    
    if (bottomButtonsContainer) {
      if (settingsBtn) bottomButtonsContainer.appendChild(settingsBtn);
      if (buyBtn) {
        buyBtn.style.display = 'inline';
        buyBtn.style.marginLeft = 'auto';
        bottomButtonsContainer.appendChild(buyBtn);
      }
    }
    
    if (helpBtn) helpBtn.style.display = 'none';
    if (renewBtn) renewBtn.style.display = 'none';
  }
  
  const loadingText = document.getElementById('loadingText');
  if (loadingText) {
    loadingText.textContent = t('loading');
  }
  const modalCard = document.querySelector('.modal-card');
  if (modalCard) {
    const h2 = modalCard.querySelector('h2');
    const ol = modalCard.querySelector('ol');
    if (h2) h2.textContent = t('modalTitle');
    if (ol) {
      ol.innerHTML = '';
      const steps = isPaid ? I18N[currentLanguage].modalStepsPaid : I18N[currentLanguage].modalStepsFree;
      steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        ol.appendChild(li);
      });
    }
  }
  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.textContent = t('ok');

  updateAuthTexts();

  const premiumBadge = document.getElementById('premiumBadge');
  const premiumTooltip = document.getElementById('premiumTooltip');
  
  if (premiumBadge) {
    if (isPaid) {
      premiumBadge.textContent = t('premium');
      premiumBadge.style.display = 'inline-block';
      
      if (premiumTooltip) {
        chrome.storage.local.get(['loggedInUser'], (data) => {
          const username = data.loggedInUser || '';
          const benefits = currentLanguage === 'ru' 
            ? ['Все премиум серверы', 'Неограниченное время', 'Приоритетная поддержка', 'Автопоиск сервера']
            : ['All premium servers', 'Unlimited time', 'Priority support', 'Auto-server search'];
          
          premiumTooltip.innerHTML = `
            <div class="premium-tooltip-username">${escapeHtml(username)}</div>
            <div class="premium-tooltip-benefits">
              ${currentLanguage === 'ru' ? 'Вам доступны все преимущества:' : 'All benefits available:'}
              <ul>
                ${benefits.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
              </ul>
            </div>
          `;
        });
        
        const showTooltip = () => {
          if (premiumTooltip && premiumBadge.style.display !== 'none') {
            const badgeRect = premiumBadge.getBoundingClientRect();
            const tooltipWidth = 220;
            const minMargin = 16;
            let left = badgeRect.left + badgeRect.width / 2;
            
            if (left - tooltipWidth / 2 < minMargin) {
              left = tooltipWidth / 2 + minMargin;
            } else if (left + tooltipWidth / 2 > window.innerWidth - minMargin) {
              left = window.innerWidth - tooltipWidth / 2 - minMargin;
            }
            
            premiumTooltip.style.left = left + 'px';
            premiumTooltip.style.top = (badgeRect.bottom + 10) + 'px';
            premiumTooltip.classList.add('show');
          }
        };
        
        const hideTooltip = () => {
          if (premiumTooltip) {
            premiumTooltip.classList.remove('show');
          }
        };
        
        premiumBadge.removeEventListener('mouseenter', showTooltip);
        premiumBadge.removeEventListener('mouseleave', hideTooltip);
        premiumTooltip.removeEventListener('mouseenter', showTooltip);
        premiumTooltip.removeEventListener('mouseleave', hideTooltip);
        
        premiumBadge.addEventListener('mouseenter', showTooltip);
        premiumBadge.addEventListener('mouseleave', hideTooltip);
        premiumTooltip.addEventListener('mouseenter', showTooltip);
        premiumTooltip.addEventListener('mouseleave', hideTooltip);
      }
      
      const handleBadgeClick = () => {
        window.open('https://links-aurora.pro/my_account', '_blank');
      };
      premiumBadge.removeEventListener('click', handleBadgeClick);
      premiumBadge.addEventListener('click', handleBadgeClick);
      premiumBadge.style.cursor = 'pointer';
    } else {
      premiumBadge.style.display = 'none';
      premiumBadge.textContent = '';
      if (premiumTooltip) {
        premiumTooltip.classList.remove('show');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadLanguage();
  updateStaticTexts();
  buildRegions();
  try { window.addEventListener('resize', () => updateCarouselButtons()); } catch (_) {}
  try {
    const data = await chrome.storage.local.get(['selectedRegionId','connectedRegionId','isConnected']);
    const isConn = !!data.isConnected;
    const initialSel = isConn ? data.connectedRegionId : data.selectedRegionId;
    const candidate = initialSel && REGIONS.some(r => r.id === initialSel) ? initialSel : 'nl';
    selectedId = candidate;
    document.querySelectorAll('.region-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.id === selectedId);
    });
    chrome.runtime.sendMessage({ type:'SELECT_REGION', id: candidate });
  } catch (e) {
  }
  
  await checkServerStatuses();
  if (statusCheckInterval) clearInterval(statusCheckInterval);
  statusCheckInterval = setInterval(() => {
    checkServerStatuses();
  }, 30000);
  
  refresh();
  
  try {
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('keydown', (e) => {
      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      const blocked = (
        e.key === 'F12' ||
        (ctrlOrMeta && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
        (ctrlOrMeta && e.key.toUpperCase() === 'U')
      );
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  } catch (_) {}
});

async function checkAndShowFirstOpenModal() {
}

function handleTelegramClick() {
  window.open('tg://resolve?domain=aurora_vpn_extension', '_blank');
  closeGiveawayModalHandler();
}

function closeGiveawayModalHandler() {
  if (telegramGiveawayModal) {
    telegramGiveawayModal.classList.add('hidden');
  }
  chrome.storage.local.set({ firstOpenShown: true });
}
