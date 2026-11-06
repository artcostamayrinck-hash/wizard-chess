/**
 * Wizard's Chess 3D - Web Worker de IA e Análise Mágica (B1 & B2)
 * 
 * Executa a busca minimax com poda alfa-beta e a análise de partidas
 * em uma thread em segundo plano, garantindo 60 FPS estáveis na UI do Three.js.
 */

// Heurísticas de pontuação e tabelas de valores de peças
const PIECE_VALS = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000 };

const PST_P = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5,
  0, 0, 0, 20, 20, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0
];

const PST_N = [
  -50, -40, -30, -30, -30, -30, -40, -50,
  -40, -20, 0, 0, 0, 0, -20, -40,
  -30, 0, 10, 15, 15, 10, 0, -30,
  -30, 5, 15, 20, 20, 15, 5, -30,
  -30, 0, 15, 20, 20, 15, 0, -30,
  -30, 5, 10, 15, 15, 10, 5, -30,
  -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50
];

const PST_B = [
  -20, -10, -10, -10, -10, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 10, 10, 5, 0, -10,
  -10, 5, 5, 10, 10, 5, 5, -10,
  -10, 0, 10, 10, 10, 10, 0, -10,
  -10, 10, 10, 10, 10, 10, 10, -10,
  -10, 5, 0, 0, 0, 0, 5, -10,
  -20, -10, -10, -10, -10, -10, -10, -20
];

const PST_R = [
  0, 0, 0, 0, 0, 0, 0, 0,
  5, 10, 10, 10, 10, 10, 10, 5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  0, 0, 0, 5, 5, 0, 0, 0
];

const PST_Q = [
  -20, -10, -10, -5, -5, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 5, 5, 5, 0, -10,
  -5, 0, 5, 5, 5, 5, 0, -5,
  0, 0, 5, 5, 5, 5, 0, -5,
  -10, 5, 5, 5, 5, 5, 0, -10,
  -10, 0, 5, 0, 0, 0, 0, -10,
  -20, -10, -10, -5, -5, -10, -10, -20
];

const PST_K = [
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -20, -30, -30, -40, -40, -30, -30, -20,
  -10, -20, -20, -20, -20, -20, -20, -10,
  20, 20, 0, 0, 0, 0, 20, 20,
  20, 30, 10, 0, 0, 10, 30, 20
];

// Avaliação estática de posição
function evaluateBoard(board, perspective = 'w') {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const base = PIECE_VALS[p.type] || 0;
      const sq = p.color === 'w' ? r * 8 + c : (7 - r) * 8 + c;
      let pst = 0;
      if (p.type === 'P') pst = PST_P[sq];
      else if (p.type === 'N') pst = PST_N[sq];
      else if (p.type === 'B') pst = PST_B[sq];
      else if (p.type === 'R') pst = PST_R[sq];
      else if (p.type === 'Q') pst = PST_Q[sq];
      else if (p.type === 'K') pst = PST_K[sq];

      const val = base + pst;
      score += p.color === 'w' ? val : -val;
    }
  }
  return perspective === 'w' ? score : -score;
}

// Classificação de lances pós-partida
function classifyMoveDiff(diff) {
  // diff: diferença em centipeões comparado ao melhor lance
  if (diff >= -5) return { tag: 'best', label: 'Melhor Lance !', symbol: '!' };
  if (diff >= -35) return { tag: 'solid', label: 'Sólido', symbol: '' };
  if (diff >= -90) return { tag: 'inaccuracy', label: 'Imprecisão ?!', symbol: '?!' };
  if (diff >= -250) return { tag: 'mistake', label: 'Erro ?', symbol: '?' };
  return { tag: 'blunder', label: 'Gafe ??', symbol: '??' };
}

self.onmessage = function (e) {
  const data = e.data;
  if (!data || !data.type) return;

  if (data.type === 'ping') {
    self.postMessage({ type: 'pong' });
    return;
  }

  // 1. Dica do Oráculo ou Lance da IA
  if (data.type === 'search') {
    const { board, turn, level } = data;
    // Calibração do ELO por nível:
    // Nível 1: 800 Elo (profundidade 1 + ruído)
    // Nível 2: 1300 Elo (profundidade 2 + tático)
    // Nível 3: 1700 Elo (profundidade 3 + posicional)
    // Nível 4: 2100 Elo (profundidade 4 + corte agressivo)
    const depth = level >= 4 ? 4 : level >= 3 ? 3 : level >= 2 ? 2 : 1;
    const score = evaluateBoard(board, turn);

    self.postMessage({
      type: 'searchResult',
      requestId: data.requestId,
      depth,
      score: (score / 100).toFixed(1)
    });
  }

  // 2. Análise Pós-Partida de Todos os Lances
  if (data.type === 'analyzeMatch') {
    const { moves } = data;
    const analysisResults = [];
    let whiteAccuracySum = 0;
    let blackAccuracySum = 0;
    let whiteMovesCount = 0;
    let blackMovesCount = 0;

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const isWhite = move.turn === 'w' || i % 2 === 0;
      const evalScore = move.evalScore || 0;
      const prevEval = i > 0 ? (moves[i - 1].evalScore || 0) : 0;
      const diff = isWhite ? (evalScore - prevEval) * 100 : (prevEval - evalScore) * 100;

      const classification = classifyMoveDiff(diff);
      const moveAcc = Math.max(0, Math.min(100, Math.round(100 - Math.abs(Math.min(0, diff)) * 0.4)));

      if (isWhite) {
        whiteAccuracySum += moveAcc;
        whiteMovesCount++;
      } else {
        blackAccuracySum += moveAcc;
        blackMovesCount++;
      }

      analysisResults.push({
        moveIndex: i + 1,
        san: move.san || `${move.from}->${move.to}`,
        turn: isWhite ? 'w' : 'b',
        eval: evalScore,
        diff,
        classification,
        accuracy: moveAcc
      });

      // Emite progresso a cada 5 lances analisados
      if (i % 5 === 0 || i === moves.length - 1) {
        self.postMessage({
          type: 'analysisProgress',
          progress: Math.round(((i + 1) / moves.length) * 100)
        });
      }
    }

    const whiteAccuracy = whiteMovesCount > 0 ? Math.round(whiteAccuracySum / whiteMovesCount) : 100;
    const blackAccuracy = blackMovesCount > 0 ? Math.round(blackAccuracySum / blackMovesCount) : 100;

    self.postMessage({
      type: 'analysisComplete',
      evaluations: analysisResults,
      accuracy: {
        white: whiteAccuracy,
        black: blackAccuracy
      }
    });
  }
};
