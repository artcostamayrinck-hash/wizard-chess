const fs = require('fs');
const path = require('path');

function copyFileSafe(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
}

// 1. Ensure root has all dist static files (favicon, icon, manifest, ads.txt)
['favicon.png', 'icon-512.png', 'manifest.json', 'ads.txt'].forEach(f => {
  if (fs.existsSync(`dist/${f}`)) {
    copyFileSafe(`dist/${f}`, f);
  }
});

// 2. Ensure public has everything needed for Vite raw static serving
const publicFiles = [
  'favicon.png',
  'icon-512.png',
  'manifest.json',
  'ads.txt',
  'app-debug.apk',
  'assets/index-CrO8ZqHi.css',
  'assets/index-Dmtay6rb.js',
  'assets/wizard-features.js'
];

publicFiles.forEach(f => {
  if (fs.existsSync(f)) {
    copyFileSafe(f, `public/${f}`);
  }
});

console.log('Asset synchronization complete!');
