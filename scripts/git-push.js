import { execSync } from 'child_process';

const customMsg = process.argv.slice(2).join(' ').trim();
const now = new Date();
const timestamp = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR');
const msg = customMsg || `update: ${timestamp}`;

try {
  console.log('\n📦 [1/3] Executando git add . ...');
  execSync('git add .', { stdio: 'inherit' });

  console.log(`\n📝 [2/3] Executando git commit -m "${msg}" ...`);
  try {
    execSync(`git commit -m "${msg}"`, { stdio: 'inherit' });
  } catch (err) {
    console.log('ℹ️ Nenhuma alteração pendente para commit.');
  }

  console.log('\n🚀 [3/3] Executando git push origin main ...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('\n🌐 Sincronizando com repositório público (GitHub Pages e Vercel)...');
  try {
    execSync('git push --force https://github.com/artcostamayrinck-hash/wizard-chess.git main:main', { stdio: 'inherit' });
  } catch (err) {
    console.warn('Aviso ao sincronizar main com wizard-chess:', err.message);
  }

  console.log('\n✅ Sucesso! Todas as alterações foram enviadas para o GitHub.\n');
} catch (error) {
  console.error('\n❌ Erro durante o processo de sincronização:', error.message);
  process.exit(1);
}
