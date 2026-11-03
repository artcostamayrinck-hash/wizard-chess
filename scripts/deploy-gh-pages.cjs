const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('1. Pushing main branch to wizard-chess...');
execSync('git push --force https://github.com/artcostamayrinck-hash/wizard-chess.git main:main', { stdio: 'inherit' });

console.log('2. Preparing dist for gh-pages deployment...');
const distDir = path.resolve('dist');
// Initialize git inside dist if not already initialized
execSync('git init', { cwd: distDir, stdio: 'ignore' });
execSync('git checkout -B gh-pages', { cwd: distDir, stdio: 'ignore' });
execSync('git add -A', { cwd: distDir, stdio: 'inherit' });
try {
  execSync('git commit -m "deploy gh-pages with apk and fixes"', { cwd: distDir, stdio: 'inherit' });
} catch (e) {
  console.log('Nothing to commit in dist');
}

console.log('3. Pushing dist directly to wizard-chess.git gh-pages...');
execSync('git push --force https://github.com/artcostamayrinck-hash/wizard-chess.git gh-pages:gh-pages', { cwd: distDir, stdio: 'inherit' });

console.log('✓ Successfully deployed dist to gh-pages of wizard-chess!');
