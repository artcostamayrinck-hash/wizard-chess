const fs = require('fs');
const path = require('path');

function copyFileSafe(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
}

// Arquivos raiz que devem ser sincronizados para dist e public
const staticFiles = [
  'favicon.png',
  'icon-512.png',
  'manifest.json',
  'ads.txt',
  'sw.js',
  'app-debug.apk',
  'assets/arcane-db.js',
  'assets/chess-worker.js',
  'assets/privacy-lgpd.js',
  'assets/index-CrO8ZqHi.css',
  'assets/index-Dmtay6rb.js',
  'assets/wizard-features.js'
];

staticFiles.forEach(f => {
  if (fs.existsSync(f)) {
    copyFileSafe(f, `dist/${f}`);
    copyFileSafe(f, `public/${f}`);
  }
});

console.log('Asset synchronization complete!');
