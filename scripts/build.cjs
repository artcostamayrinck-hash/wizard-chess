const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('[Build] Sincronizando arquivos entre root, dist e public...');

// 1. Sincroniza index.html para dist/index.html e .nojekyll
fs.copyFileSync('index.html', 'dist/index.html');
if (fs.existsSync('.nojekyll')) {
  fs.copyFileSync('.nojekyll', 'dist/.nojekyll');
  fs.copyFileSync('.nojekyll', 'public/.nojekyll');
}
console.log('✓ index.html e .nojekyll copiados para dist/');

// 2. Executa sync-assets.cjs
require('./sync-assets.cjs');

// 3. Sincroniza assets para dist/assets
['assets/index-CrO8ZqHi.css', 'assets/index-Dmtay6rb.js', 'assets/wizard-features.js'].forEach(f => {
  const dest = path.join('dist', f);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(f, dest);
  console.log(`✓ ${f} -> ${dest}`);
});

// 3.1. Sincroniza app-debug.apk para dist/app-debug.apk e public/app-debug.apk para download direto na web
if (fs.existsSync('app-debug.apk')) {
  fs.copyFileSync('app-debug.apk', 'dist/app-debug.apk');
  fs.copyFileSync('app-debug.apk', 'public/app-debug.apk');
  console.log('✓ app-debug.apk copiado para dist/ e public/ para download direto');
}

// 4. Capacitor sync para manter o APK Android 100% atualizado
try {
  console.log('[Build] Sincronizando com Android via Capacitor...');
  execSync('npx cap sync android', { stdio: 'inherit' });
  console.log('✓ Capacitor Android sincronizado com sucesso.');
} catch (err) {
  console.warn('[Build] Aviso ao sincronizar Capacitor:', err.message);
}

console.log('[Build] Build concluído com sucesso!');
