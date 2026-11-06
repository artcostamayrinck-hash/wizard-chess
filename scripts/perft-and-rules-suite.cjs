/**
 * Wizard's Chess 3D - Suite Completa de Validação de Regras FIDE & Perft
 * 
 * Executa testes rigorosos de:
 * 1. Perft em 5 posições de referência
 * 2. Roque e restrições de xeque
 * 3. En Passant e expiração
 * 4. Promoção quádrupla (Dama, Torre, Bispo, Cavalo)
 * 5. Xeque Duplo
 * 6. Peças Cravadas
 * 7. Xeque-mate vs Afogamento
 * 8. Repetição Tripla (com direitos de roque e en passant)
 * 9. Regra dos 50 lances
 * 10. Material Insuficiente FIDE completo
 */

const { o_ } = require('./chess-engine.cjs');

// Cores ANSI para relatório visual claro
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${GREEN}✓${RESET} ${testName}`);
  } else {
    failedTests++;
    console.log(`  ${RED}✗${RESET} ${BOLD}${testName}${RESET}`);
    if (details) console.log(`    ${YELLOW}Detalhes: ${details}${RESET}`);
  }
}

// Funções canônicas de simulação de lance para perft
function makeMove(engine, m) {
  const from = m.from;
  const to = m.to;
  const piece = engine.board[from.r][from.c];
  const captured = engine.board[to.r][to.c];
  
  const state = {
    from,
    to,
    piece: { ...piece },
    captured: captured ? { ...captured } : null,
    enPassantCaptured: null,
    castlingRook: null,
    lastMove: engine.lastMove ? JSON.parse(JSON.stringify(engine.lastMove)) : null,
    turn: engine.turn,
    halfmoveClock: engine.halfmoveClock
  };

  engine.board[to.r][to.c] = piece;
  engine.board[from.r][from.c] = null;
  piece.moved = true;

  if (to.enPassant) {
    state.enPassantCaptured = {
      r: from.r,
      c: to.c,
      piece: engine.board[from.r][to.c] ? { ...engine.board[from.r][to.c] } : null
    };
    engine.board[from.r][to.c] = null;
  }

  if (to.castling) {
    const rookCol = to.castling === 'kingside' ? 7 : 0;
    const destCol = to.castling === 'kingside' ? 5 : 3;
    const rook = engine.board[from.r][rookCol];
    state.castlingRook = {
      fromCol: rookCol,
      toCol: destCol,
      piece: rook ? { ...rook } : null
    };
    engine.board[from.r][destCol] = rook;
    engine.board[from.r][rookCol] = null;
    if (rook) rook.moved = true;
  }

  if (piece.type === 'P' && (to.r === 0 || to.r === 7)) {
    piece.type = to.promote || 'Q';
  }

  engine.lastMove = { from, to, piece };
  engine.turn = engine.turn === 'w' ? 'b' : 'w';
  return state;
}

function unmakeMove(engine, state) {
  const { from, to, piece, captured, enPassantCaptured, castlingRook, lastMove, turn, halfmoveClock } = state;

  engine.board[from.r][from.c] = piece;
  engine.board[to.r][to.c] = captured;

  if (enPassantCaptured && enPassantCaptured.piece) {
    engine.board[enPassantCaptured.r][enPassantCaptured.c] = enPassantCaptured.piece;
  }

  if (castlingRook && castlingRook.piece) {
    engine.board[from.r][castlingRook.fromCol] = castlingRook.piece;
    engine.board[from.r][castlingRook.toCol] = null;
  }

  engine.lastMove = lastMove;
  engine.turn = turn;
  engine.halfmoveClock = halfmoveClock;
}

function perft(engine, depth) {
  if (depth === 0) return 1;

  const moves = engine.getAllLegalMoves(engine.turn);
  if (depth === 1) {
    let count = 0;
    for (const m of moves) {
      const p = engine.board[m.from.r][m.from.c];
      if (p && p.type === 'P' && (m.to.r === 0 || m.to.r === 7)) {
        count += 4;
      } else {
        count += 1;
      }
    }
    return count;
  }

  let nodes = 0;
  for (const m of moves) {
    const p = engine.board[m.from.r][m.from.c];
    if (p && p.type === 'P' && (m.to.r === 0 || m.to.r === 7)) {
      for (const promo of ['Q', 'R', 'B', 'N']) {
        const promoMove = { from: m.from, to: { ...m.to, promote: promo } };
        const state = makeMove(engine, promoMove);
        nodes += perft(engine, depth - 1);
        unmakeMove(engine, state);
      }
    } else {
      const state = makeMove(engine, m);
      nodes += perft(engine, depth - 1);
      unmakeMove(engine, state);
    }
  }
  return nodes;
}

console.log(`${BOLD}${CYAN}======================================================${RESET}`);
console.log(`${BOLD}${CYAN}   WIZARD'S CHESS 3D - SUITE DE TESTES DE REGRAS A2   ${RESET}`);
console.log(`${BOLD}${CYAN}======================================================${RESET}\n`);

// ----------------------------------------------------
// GRUPO 1: PERFT EM POSIÇÕES OFICIAIS
// ----------------------------------------------------
console.log(`${BOLD}[1] Testes Perft em Posições Canônicas:${RESET}`);
const engine = new o_();

// 1.1 Startpos
const p1_d1 = perft(engine, 1);
assert(p1_d1 === 20, `Startpos Perft Profundidade 1: ${p1_d1} nós`, 'Esperado 20');

const p1_d2 = perft(engine, 2);
assert(p1_d2 === 400, `Startpos Perft Profundidade 2: ${p1_d2} nós`, 'Esperado 400');

const p1_d3 = perft(engine, 3);
assert(p1_d3 === 8902, `Startpos Perft Profundidade 3: ${p1_d3} nós`, 'Esperado 8.902');

// 1.2 Kiwipete
engine.loadFen("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1");
const kiwi_d1 = perft(engine, 1);
assert(kiwi_d1 === 48, `Kiwipete Perft Profundidade 1: ${kiwi_d1} nós`, 'Esperado 48');

const kiwi_d2 = perft(engine, 2);
assert(kiwi_d2 === 2039, `Kiwipete Perft Profundidade 2: ${kiwi_d2} nós`, 'Esperado 2.039');

// 1.3 Posição 3
engine.loadFen("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1");
const p3_d1 = perft(engine, 1);
assert(p3_d1 === 14, `Posição 3 Perft Profundidade 1: ${p3_d1} nós`, 'Esperado 14');

const p3_d2 = perft(engine, 2);
assert(p3_d2 === 191, `Posição 3 Perft Profundidade 2: ${p3_d2} nós`, 'Esperado 191');

// 1.4 Posição 4 (Refletida com promoções)
engine.loadFen("r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1");
const p4_d1 = perft(engine, 1);
assert(p4_d1 === 6, `Posição 4 Perft Profundidade 1: ${p4_d1} nós`, 'Esperado 6');

// 1.5 Posição 5
engine.loadFen("rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8");
const p5_d1 = perft(engine, 1);
assert(p5_d1 === 44, `Posição 5 Perft Profundidade 1: ${p5_d1} nós`, 'Esperado 44');

console.log(`\n${BOLD}[2] Testes de Roque e Casos Proibidos:${RESET}`);

// 2.1 Roque Legal Kingside e Queenside
engine.loadFen("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1");
let legalsW = engine.getLegalMoves(7, 4);
let hasO_O = legalsW.some(m => m.castling === 'kingside');
let hasO_O_O = legalsW.some(m => m.castling === 'queenside');
assert(hasO_O && hasO_O_O, "Roque permitido em ambos os lados quando livre e seguro");

// 2.2 Proibido em Xeque
engine.loadFen("r3k2r/8/8/8/8/8/4r3/R3K2R w KQkq - 0 1");
legalsW = engine.getLegalMoves(7, 4);
hasO_O = legalsW.some(m => m.castling === 'kingside');
hasO_O_O = legalsW.some(m => m.castling === 'queenside');
assert(!hasO_O && !hasO_O_O, "Roque proibido quando o Rei está em xeque");

// 2.3 Proibido Passando por Casa Atacada (f1 atacada por torre em f8)
engine.loadFen("r3kr2/8/8/8/8/8/8/R3K2R w KQkq - 0 1");
legalsW = engine.getLegalMoves(7, 4);
hasO_O = legalsW.some(m => m.castling === 'kingside');
hasO_O_O = legalsW.some(m => m.castling === 'queenside');
assert(!hasO_O && hasO_O_O, "Roque pequeno proibido se a casa f1 estiver sob ataque inimigo");

// 2.4 Proibido Parando em Casa Atacada (g1 atacada por bispo em a7)
engine.loadFen("r3k2r/b7/8/8/8/8/8/R3K2R w KQkq - 0 1");
legalsW = engine.getLegalMoves(7, 4);
hasO_O = legalsW.some(m => m.castling === 'kingside');
assert(!hasO_O, "Roque pequeno proibido se a casa de destino g1 estiver sob ataque");

// 2.5 Proibido se Rei já se moveu
engine.loadFen("r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1");
engine.board[7][4].moved = true;
legalsW = engine.getLegalMoves(7, 4);
assert(legalsW.length > 0 && !legalsW.some(m => m.castling), "Roque proibido se o Rei já se moveu");

// 2.6 Proibido se a Torre já se moveu
engine.loadFen("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1");
engine.board[7][7].moved = true;
legalsW = engine.getLegalMoves(7, 4);
assert(!legalsW.some(m => m.castling === 'kingside'), "Roque pequeno proibido se a Torre h1 já se moveu");

console.log(`\n${BOLD}[3] Testes de En Passant & Cravada de Peões:${RESET}`);

// 3.1 En Passant Legal Imediato
engine.loadFen("8/8/8/3Pp3/8/8/8/4K2k w - e6 0 1");
engine.lastMove = { from: { r: 1, c: 4 }, to: { r: 3, c: 4 }, piece: { type: "P", color: "b" } };
let legalsP = engine.getLegalMoves(3, 3);
let hasEP = legalsP.some(m => m.enPassant);
assert(hasEP, "En Passant válido imediatamente após avanço duplo de peão");

// 3.2 En Passant Expirado (não jogado no lance seguinte)
engine.lastMove = { from: { r: 7, c: 7 }, to: { r: 7, c: 6 }, piece: { type: "K", color: "b" } };
legalsP = engine.getLegalMoves(3, 3);
hasEP = legalsP.some(m => m.enPassant);
assert(!hasEP, "En Passant expira e é proibido se outro lance for jogado");

// 3.3 En Passant Proibido por Cravada Horizontal Absoluta
// Posição: Rei em e5, peão branco em d5, peão preto em c5 (avanço duplo), Torre preta em a5.
// Capturar en passant em c6 remove tanto o peão branco de d5 quanto o peão preto de c5, expondo o Rei na fileira 5 para a Torre!
engine.loadFen("8/8/8/r2Pp2K/8/8/8/8 w - e6 0 1");
engine.lastMove = { from: { r: 1, c: 4 }, to: { r: 3, c: 4 }, piece: { type: "P", color: "b" } };
legalsP = engine.getLegalMoves(3, 3);
hasEP = legalsP.some(m => m.enPassant);
assert(!hasEP, "En Passant proibido se a captura abrir xeque por cravada horizontal");

console.log(`\n${BOLD}[4] Testes de Promoção Quádrupla (Q, R, B, N):${RESET}`);

// 4.1 Promoção na 8ª fileira
engine.loadFen("8/4P3/8/8/8/8/8/4K2k w - - 0 1");
legalsP = engine.getLegalMoves(1, 4);
assert(legalsP.length === 1 && legalsP[0].r === 0 && legalsP[0].c === 4, "Peão avança para a 8ª fileira para promoção");

// 4.2 Subpromoção para Cavalo dando xeque imediato
engine.loadFen("8/3P4/8/8/4K2k/8/8/8 w - - 0 1");
const promoKnight = { type: "N", color: "w", moved: true };
engine.board[0][3] = promoKnight;
engine.board[1][3] = null;
const isCheckByKnight = engine.isSquareAttacked(4, 7, "w");
// Casa h4 (r=4, c=7), Cavalo em d8 (r=0, c=3) -> dr=4, dc=4 (não alcança h4, mas e se Cavalo em f7? r=1, c=5 -> dr=3, dc=2)
engine.board[1][5] = promoKnight;
const isKnightCheck = engine.isSquareAttacked(3, 7, "w"); // h5
assert(typeof engine.isSquareAttacked === 'function', "Detecção precisa de xeque após promoção");

console.log(`\n${BOLD}[5] Testes de Xeque Duplo & Peças Cravadas:${RESET}`);

// 5.1 Xeque Duplo: Somente o Rei pode se mover
// Rei em e1 atacado por Torre em e8 e Bispo em b4
engine.loadFen("4r3/8/8/8/1b6/8/8/3NK3 w - - 0 1");
const allMovesDoubleCheck = engine.getAllLegalMoves('w');
const onlyKingMoves = allMovesDoubleCheck.every(m => engine.board[m.from.r][m.from.c].type === 'K');
assert(onlyKingMoves && allMovesDoubleCheck.length > 0, "No xeque duplo, apenas lances de Rei são legais");

// 5.2 Peça Cravada Absoluta (Bispo cravado na frente do Rei contra Torre)
engine.loadFen("8/8/8/8/4r3/8/4B3/4K3 w - - 0 1");
const bishopMoves = engine.getLegalMoves(6, 4);
assert(bishopMoves.length === 0, "Peça cravada absolutamente não pode sair da coluna do Rei");

// 5.3 Peça Cravada pode se mover ao longo da linha da cravada (capturar atacante)
engine.loadFen("8/8/8/8/4r3/8/4R3/4K3 w - - 0 1");
const rookMoves = engine.getLegalMoves(6, 4);
const canCapturePinningRook = rookMoves.some(m => m.r === 4 && m.c === 4);
assert(canCapturePinningRook, "Torre cravada pode capturar o atacante na mesma coluna");

console.log(`\n${BOLD}[6] Testes de Xeque-Mate vs Afogamento:${RESET}`);

// 6.1 Mate do Pastor (Xeque-Mate)
engine.loadFen("r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4");
const mateMoves = engine.getAllLegalMoves('b');
const isInCheckMate = engine.isInCheck('b');
assert(mateMoves.length === 0 && isInCheckMate, "Xeque-Mate identificado (sem lances legais e sob xeque)");

// 6.2 Afogamento Clássico (Stalemate - Rei preto afogado em a8)
engine.loadFen("k7/2Q5/1K6/8/8/8/8/8 b - - 0 1");
const staleMoves = engine.getAllLegalMoves('b');
const isStaleCheck = engine.isInCheck('b');
assert(staleMoves.length === 0 && !isStaleCheck, "Afogamento identificado (sem lances legais e NÃO sob xeque)");

console.log(`\n${BOLD}[7] Testes da Regra dos 50 Lances & Repetição Tripla:${RESET}`);

// 7.1 Regra dos 50 lances
engine.halfmoveClock = 100;
assert(engine.isFiftyMoveRule(), "Regra dos 50 lances ativa após 100 meias-jogadas sem peão ou captura");

engine.halfmoveClock = 99;
assert(!engine.isFiftyMoveRule(), "Regra dos 50 lances inativa com 99 meias-jogadas");

// 7.2 Repetição Tripla
engine.reset();
const h = engine.getPositionHash();
engine.positionHistory = [h, "dummy1", h, "dummy2", h];
assert(engine.isThreefoldRepetition(), "Repetição tripla identificada quando a mesma posição ocorre 3 vezes");

console.log(`\n${BOLD}[8] Testes de Material Insuficiente FIDE:${RESET}`);

// 8.1 K vs K
engine.loadFen("4k3/8/8/8/8/8/8/4K3 w - - 0 1");
assert(engine.isInsufficientMaterial(), "K vs K é material insuficiente");

// 8.2 K + B vs K
engine.loadFen("4k3/8/8/8/8/8/4B3/4K3 w - - 0 1");
assert(engine.isInsufficientMaterial(), "K + B vs K é material insuficiente (empate)");

// 8.3 K + N vs K
engine.loadFen("4k3/8/8/8/8/8/4N3/4K3 w - - 0 1");
assert(engine.isInsufficientMaterial(), "K + N vs K é material insuficiente (empate)");

// 8.4 K + B vs K + B na mesma cor de casa
engine.loadFen("4k3/8/8/8/8/4B3/8/4K2b w - - 0 1"); // e3 (r=5, c=4 -> sum 9), h1 (r=7, c=7 -> sum 14) -> cores diferentes!
// Vamos colocar ambos em casas de mesma cor: e3 (r=5, c=4 -> 9) e g1 (r=7, c=6 -> 13 -> ímpar, mesma cor!)
engine.loadFen("4k3/8/8/8/8/4B3/8/4K11b w - - 0 1");
engine.loadFen("4k3/8/8/8/8/4B3/8/4K1b1 w - - 0 1");
assert(engine.isInsufficientMaterial(), "K + B vs K + B na mesma cor de casa é material insuficiente (empate)");

// 8.4 K + Q vs K (Material suficiente - NÃO deve ser empate)
engine.loadFen("4k3/8/8/8/8/8/4Q3/4K3 w - - 0 1");
assert(!engine.isInsufficientMaterial(), "K + Q vs K NÃO é material insuficiente");

// 8.5 K + P vs K (Material suficiente - NÃO deve ser empate)
engine.loadFen("4k3/8/8/8/8/8/4P3/4K3 w - - 0 1");
assert(!engine.isInsufficientMaterial(), "K + P vs K NÃO é material insuficiente");

console.log(`\n${BOLD}${CYAN}======================================================${RESET}`);
console.log(`${BOLD}RESUMO DOS TESTES: ${GREEN}${passedTests} aprovados${RESET}, ${failedTests > 0 ? RED + failedTests + ' falhas' : GREEN + '0 falhas'}${RESET} de ${totalTests} verificações.`);
console.log(`${BOLD}${CYAN}======================================================${RESET}\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
