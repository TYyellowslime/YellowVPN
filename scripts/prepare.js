// Собирает папку www/ из extension/ (копирует файлы и подключает chrome-shim).
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const src = path.join(root, 'extension'), out = path.join(root, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true });
fs.copyFileSync(path.join(root, 'shim', 'chrome-shim.js'), path.join(out, 'chrome-shim.js'));

// Окно приложения вместо popup фиксированной ширины 320px
fs.writeFileSync(path.join(out, 'app-overrides.css'),
  'html,body{width:100%!important;max-width:none!important;min-height:100vh!important;overflow-x:hidden!important;overflow-y:auto!important}');

function patch(html) {
  html = html.replace(/<head>/i, (m) => m + '\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">');
  html = html.replace(/<script/i, '<script src="chrome-shim.js"></script>\n<script');   // shim раньше модулей
  return html.replace(/<\/head>/i, '<link rel="stylesheet" href="app-overrides.css">\n</head>');
}
let popup = patch(fs.readFileSync(path.join(src, 'popup.html'), 'utf8'));
popup = popup.replace(/<\/body>/i, '<iframe src="bg.html" style="display:none" aria-hidden="true"></iframe>\n</body>');
fs.writeFileSync(path.join(out, 'index.html'), popup);
fs.writeFileSync(path.join(out, 'settings.html'), patch(fs.readFileSync(path.join(src, 'settings.html'), 'utf8')));
fs.writeFileSync(path.join(out, 'bg.html'),
  '<!doctype html><meta charset="utf-8"><script>window.__CTX="bg"</script>\n' +
  '<script src="chrome-shim.js"></script>\n<script type="module" src="background.js"></script>');
['content-script.js', 'manifest.json'].forEach((f) => fs.rmSync(path.join(out, f), { force: true }));
console.log('www/ готова');
