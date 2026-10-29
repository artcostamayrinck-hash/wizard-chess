const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('[Build] Sincronizando arquivos entre root, dist e public...');

// 1. Sincroniza index.html para dist/index.html
fs.copyFileSync('index.html', 'dist/index.html');
console.log('✓ index.html copiado para dist/index.html');

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

// 4. Capacitor sync para manter o APK Android 100% atualizado
try {
  console.log('[Build] Sincronizando com Android via Capacitor...');
  execSync('npx cap sync android', { stdio: 'inherit' });
  console.log('✓ Capacitor Android sincronizado com sucesso.');
} catch (err) {
  console.warn('[Build] Aviso ao sincronizar Capacitor:', err.message);
}

console.log('[Build] Build concluído com sucesso!');

