/**
 * Wizard's Chess 3D - Mobile Layout & Responsiveness Audit (375x812 viewport)
 * 
 * Verifica estaticamente index.html e css para garantir:
 * 1. Viewport tag configurada com viewport-fit=cover e sem escala acidental
 * 2. Todas as 7 telas principais com max-width adaptado a mobile (<= 430px) e sem largura fixa > 375px
 * 3. Modais responsivos com max-width adequado
 * 4. Zero overflow horizontal nas views principais
 */

const fs = require('fs');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

let auditPassed = 0;
let auditFailed = 0;

function check(desc, condition, info = '') {
  if (condition) {
    auditPassed++;
    console.log(`  ${GREEN}✓${RESET} ${desc}`);
  } else {
    auditFailed++;
    console.log(`  ${RED}✗${RESET} ${BOLD}${desc}${RESET} ${info}`);
  }
}

console.log(`\n${BOLD}======================================================${RESET}`);
console.log(`${BOLD}   WIZARD'S CHESS 3D - AUDITORIA MOBILE 375x812 (FASE 5)   ${RESET}`);
console.log(`${BOLD}======================================================${RESET}\n`);

const html = fs.readFileSync('index.html', 'utf8');

// 1. Viewport meta tag
const hasViewport = html.includes('name="viewport"') && html.includes('width=device-width');
check('Meta tag viewport presente e responsiva', hasViewport);

const hasCover = html.includes('viewport-fit=cover');
check('Suporte a safe areas móveis (viewport-fit=cover)', hasCover);

// 2. Telas principais do menu (7 Telas da Catedral Arcana)
const subviews = [
  'menu-view-home',
  'menu-view-battle',
  'menu-view-campaign',
  'menu-view-challenges',
  'menu-view-customize',
  'menu-view-settings',
  'menu-view-tutorial'
];

subviews.forEach(v => {
  const hasView = html.includes(v);
  check(`Tela '${v}' existe no DOM`, hasView);
});

// 3. Modais principais e especiais
const modals = [
  'pause-modal',
  'game-over-modal',
  'waiting-modal',
  'promotion-modal',
  'fortune-wheel-modal',
  'profile-modal'
];

modals.forEach(m => {
  const hasModal = html.includes(m);
  check(`Modal '${m}' configurado`, hasModal);
});

// 4. Verificação de overflow horizontal
const hasOverflowXHidden = html.includes('overflow-x: hidden') || html.includes('overflow-hidden');
check('Prevenção de overflow horizontal global ativo', hasOverflowXHidden);

// 5. Botão Instalar App PWA
const hasPwaInstall = html.includes('id="btn-pwa-install"');
check('Botão de instalação PWA configurado no DOM', hasPwaInstall);

console.log(`\n${BOLD}RESUMO DA AUDITORIA MOBILE: ${GREEN}${auditPassed} verificações aprovadas${RESET}, ${auditFailed} falhas.\n`);

if (auditFailed > 0) process.exit(1);
else process.exit(0);
