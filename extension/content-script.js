async function fillLoginInPurchaseForm() {
  const data = await chrome.storage.local.get('loggedInUser');
  const username = data.loggedInUser;
  
  if (!username) {
    return;
  }
  
  const loginInput = document.querySelector('.pay-input-login');
  
  if (loginInput) {
    if (!loginInput.value || loginInput.value.trim() === '') {
      loginInput.value = username;
      loginInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}

let modalObserver = null;

function observePurchaseModal() {
  const checkAndFill = () => {
    const payModal = document.querySelector('.pay-modal');
    if (payModal) {
      fillLoginInPurchaseForm();
      
      if (!modalObserver) {
        modalObserver = new MutationObserver(() => {
          fillLoginInPurchaseForm();
        });
        
        modalObserver.observe(payModal, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        });
      }
    }
  };
  
  const observer = new MutationObserver(() => {
    checkAndFill();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  checkAndFill();
  setTimeout(checkAndFill, 500);
  setTimeout(checkAndFill, 1500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observePurchaseModal);
} else {
  observePurchaseModal();
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.loggedInUser) {
    fillLoginInPurchaseForm();
  }
});

async function exportAuroraProfileToPage() {
  try {
    const keys = [
      'connectedRegionId',
      'isConnected',
      'loggedInUser',
      'proxyMode',
      'proxyOnlyDomains',
      'remainingMs',
      'selectedRegionId',
      'subscriptionActive',
      'subscriptionExpires',
      'totalActiveMs',
      'trafficUsed'
    ];
    const data = await chrome.storage.local.get(keys);

    const manifest = chrome.runtime.getManifest();
    const extensionVersion = manifest?.version ?? null;

    const profile = {
      connectedRegionId: data.connectedRegionId ?? null,
      isConnected: !!data.isConnected,
      loggedInUser: data.loggedInUser ?? null,
      proxyMode: data.proxyMode || 'all',
      proxyOnlyDomains: Array.isArray(data.proxyOnlyDomains) ? data.proxyOnlyDomains : [],
      remainingMs: typeof data.remainingMs === 'number' ? data.remainingMs : null,
      selectedRegionId: data.selectedRegionId ?? null,
      subscriptionActive: !!data.subscriptionActive,
      subscriptionExpires: data.subscriptionExpires ?? null,
      totalActiveMs: typeof data.totalActiveMs === 'number' ? data.totalActiveMs : 0,
      trafficUsed: typeof data.trafficUsed === 'number' ? data.trafficUsed : 0,
      extensionVersion: extensionVersion
    };

    try {
      window.localStorage.setItem('aurora_vpn_profile', JSON.stringify(profile));
    } catch (e) {}

    try {
      let el = document.getElementById('aurora-vpn-profile-data');
      if (!el) {
        el = document.createElement('div');
        el.id = 'aurora-vpn-profile-data';
        el.style.display = 'none';
        (document.documentElement || document.body).appendChild(el);
      }
      el.textContent = JSON.stringify(profile);
    } catch (_) {}
  } catch (e) {}
}

function scheduleExportAuroraProfile() {
  try {
    exportAuroraProfileToPage();
  } catch (_) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleExportAuroraProfile);
} else {
  scheduleExportAuroraProfile();
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local') return;
  const relevant = [
    'connectedRegionId',
    'isConnected',
    'loggedInUser',
    'proxyMode',
    'proxyOnlyDomains',
    'remainingMs',
    'selectedRegionId',
    'subscriptionActive',
    'subscriptionExpires',
    'totalActiveMs',
    'trafficUsed'
  ];
  if (relevant.some(k => Object.prototype.hasOwnProperty.call(changes, k))) {
    scheduleExportAuroraProfile();
  }
});

