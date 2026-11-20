const { app, BrowserWindow, ipcMain, session, shell } = require('electron');
const http = require('http'), fs = require('fs'), path = require('path');
const { execFile } = require('child_process');

const WWW = path.join(__dirname, '..', 'www');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
let server, port, currentPac = 'function FindProxyForURL(){return "DIRECT";}';

function startServer() {
  return new Promise((resolve) => {
    server = http.createServer((req, res) => {
      const url = decodeURIComponent((req.url || '/').split('?')[0]);
      if (url === '/proxy.pac') {
        res.writeHead(200, { 'Content-Type': 'application/x-ns-proxy-autoconfig', 'Cache-Control': 'no-store' });
        return res.end(currentPac);
      }
      const file = path.normalize(path.join(WWW, url === '/' ? 'index.html' : url));
      if (!file.startsWith(WWW) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => { port = server.address().port; resolve(); });
  });
}

/* ---------- системный прокси Windows (PAC) ---------- */
const REG = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings';
const run = (cmd, args) => new Promise((r) => execFile(cmd, args, { windowsHide: true }, () => r()));
const refreshWininet = () => run('powershell', ['-NoProfile', '-Command',
  '$s=\'[DllImport("wininet.dll")] public static extern bool InternetSetOption(IntPtr h,int o,IntPtr b,int l);\';' +
  '$t=Add-Type -MemberDefinition $s -Name W -Namespace N -PassThru;' +
  '$t::InternetSetOption([IntPtr]::Zero,39,[IntPtr]::Zero,0)|Out-Null;$t::InternetSetOption([IntPtr]::Zero,37,[IntPtr]::Zero,0)|Out-Null']);

async function enableSystemProxy() {
  if (process.platform !== 'win32') return;
  await run('reg', ['add', REG, '/v', 'AutoConfigURL', '/t', 'REG_SZ', '/d', `http://127.0.0.1:${port}/proxy.pac`, '/f']);
  await refreshWininet();
}
async function disableSystemProxy() {
  currentPac = 'function FindProxyForURL(){return "DIRECT";}';
  if (process.platform !== 'win32') return;
  await run('reg', ['delete', REG, '/v', 'AutoConfigURL', '/f']);
  await refreshWininet();
}

function configToPac(cfg) {
  if (cfg && cfg.mode === 'pac_script' && cfg.pacScript && cfg.pacScript.data) return cfg.pacScript.data;
  const s = cfg && cfg.rules && cfg.rules.singleProxy;
  if (s) return `function FindProxyForURL(){return "${(s.scheme || 'proxy').toUpperCase()} ${s.host}:${s.port}";}`;
  return 'function FindProxyForURL(){return "DIRECT";}';
}

ipcMain.handle('proxy:set', async (_e, cfg) => { currentPac = configToPac(cfg); await enableSystemProxy(); return true; });
ipcMain.handle('proxy:clear', async () => { await disableSystemProxy(); return true; });

/* ---------- окно ---------- */
async function createWindow() {
  await startServer();
  await session.defaultSession.setProxy({ mode: 'direct' });   // само приложение ходит напрямую
  await disableSystemProxy();                                    // сброс «зависшего» прокси после аварийного выхода
  const win = new BrowserWindow({
    width: 400, height: 720, minWidth: 340, minHeight: 560, autoHideMenuBar: true, title: 'Yellow VPN',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false,
      webSecurity: false /* запросы к API без CORS, как у расширения с host_permissions */ }
  });
  win.setMenuBarVisibility(false);
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(`http://127.0.0.1:${port}/`)) return { action: 'allow', overrideBrowserWindowOptions: { width: 520, height: 760, autoHideMenuBar: true } };
    shell.openExternal(url); return { action: 'deny' };
  });
  win.loadURL(`http://127.0.0.1:${port}/index.html`);
}

let cleaned = false;
app.on('before-quit', async (e) => {
  if (cleaned) return;
  e.preventDefault(); cleaned = true;
  await disableSystemProxy();
  app.quit();
});
if (!app.requestSingleInstanceLock()) app.quit();
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
