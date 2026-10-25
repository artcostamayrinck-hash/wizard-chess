export const PIECE_VALUES = { P: 10, N: 30, B: 30, R: 50, Q: 90, K: 900 };

export class ChessEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.turn = 'w';
    this.lastMove = null;
    this.history = [];
    this.halfmoveClock = 0; // Regra dos 50 lances
    this.positionHistory = []; // Regra da tripla repetição
    this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
    const backRank = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

    for (let c = 0; c < 8; c++) {
      this.board[0][c] = { type: backRank[c], color: 'b', moved: false };
      this.board[1][c] = { type: 'P', color: 'b', moved: false };
      this.board[6][c] = { type: 'P', color: 'w', moved: false };
      this.board[7][c] = { type: backRank[c], color: 'w', moved: false };
    }

    this.positionHistory.push(this.getPositionHash());
  }

  // Carrega uma posição a partir de uma notação FEN (Forsyth–Edwards Notation)
  loadFen(fen) {
    const parts = fen.trim().split(/\s+/);
    const piecePlacement = parts[0];
    const activeColor = parts[1] || 'w';

    this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.turn = activeColor;
    this.lastMove = null;
    this.history = [];
    this.halfmoveClock = parseInt(parts[4], 10) || 0;
    this.positionHistory = [];

    const rows = piecePlacement.split('/');
    for (let r = 0; r < 8; r++) {
      let c = 0;
      const rowStr = rows[r] || '';
      for (const char of rowStr) {
        if (char >= '1' && char <= '8') {
          c += parseInt(char, 10);
        } else {
          const isWhite = char === char.toUpperCase();
          const type = char.toUpperCase();
          const color = isWhite ? 'w' : 'b';
          this.board[r][c] = { type, color, moved: true };
          c++;
        }
      }
    }
    this.positionHistory.push(this.getPositionHash());
  }

  // Retorna pontuação de vantagem relativa às Brancas (+1.5, -2.0, etc.)
  getEvaluationScore() {
    const raw = this.evaluateBoard(this.board, 'w');
    return +(raw / 100).toFixed(1);
  }

  inBounds(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

  // Gera uma impressão digital rápida do estado do tabuleiro
  getPositionHash(boardState = this.board, turn = this.turn) {
    let str = turn + ':';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        str += p ? `${p.color}${p.type}` : '.';
      }
    }
    return str;
  }

  // Atualiza os contadores de empate ao executar um lance
  recordMoveRuleState(piece, isCapture, isPawnMove) {
    if (isCapture || isPawnMove) {
      this.halfmoveClock = 0;
    } else {
      this.halfmoveClock++;
    }
    this.positionHistory.push(this.getPositionHash());
  }

  // Regra dos 50 lances (100 turnos individuais sem captura e sem mover peão)
  isFiftyMoveRule() {
    return this.halfmoveClock >= 100;
  }

  // Regra da Tripla Repetição (a mesma posição repetiu 3 vezes)
  isThreefoldRepetition() {
    if (this.positionHistory.length < 3) return false;
    const currentHash = this.positionHistory[this.positionHistory.length - 1];
    let count = 0;
    for (const h of this.positionHistory) {
      if (h === currentHash) count++;
    }
    return count >= 3;
  }

  // Verifica se restam apenas os dois Reis no tabuleiro (Empate automático)
  isInsufficientMaterial() {
    let pieceCount = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (this.board[r][c]) pieceCount++;
      }
    }
    return pieceCount === 2;
  }

  getPseudoLegalMoves(r, c, boardState = this.board) {
    const piece = boardState[r][c];
    if (!piece) return [];
    const moves = [];
    const dir = piece.color === 'w' ? -1 : 1;

    if (piece.type === 'P') {
      if (this.inBounds(r + dir, c) && !boardState[r + dir][c]) {
        moves.push({ r: r + dir, c });
        if (!piece.moved && this.inBounds(r + dir * 2, c) && !boardState[r + dir * 2][c] && !boardState[r + dir][c]) {
          moves.push({ r: r + dir * 2, c });
        }
      }
      for (const dc of [-1, 1]) {
        if (this.inBounds(r + dir, c + dc)) {
          const target = boardState[r + dir][c + dc];
          if (target && target.color !== piece.color) moves.push({ r: r + dir, c: c + dc, capture: true });
          
          // Regra do En Passant
          if (this.lastMove && this.lastMove.piece.type === 'P' && Math.abs(this.lastMove.from.r - this.lastMove.to.r) === 2) {
            if (this.lastMove.to.r === r && this.lastMove.to.c === c + dc) {
              moves.push({ r: r + dir, c: c + dc, capture: true, enPassant: true });
            }
          }
        }
      }
    }

    const slideDirs = {
      R: [[1,0],[-1,0],[0,1],[0,-1]],
      B: [[1,1],[1,-1],[-1,1],[-1,-1]],
      Q: [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
    }[piece.type];

    if (slideDirs) {
      for (const [dr, dc] of slideDirs) {
        let nr = r + dr, nc = c + dc;
        while (this.inBounds(nr, nc)) {
          const target = boardState[nr][nc];
          if (!target) { moves.push({ r: nr, c: nc }); } 
          else {
            if (target.color !== piece.color) moves.push({ r: nr, c: nc, capture: true });
            break;
          }
          nr += dr; nc += dc;
        }
      }
    }

    if (piece.type === 'N') {
      const jumps = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
      for (const [dr, dc] of jumps) {
        const nr = r + dr, nc = c + dc;
        if (this.inBounds(nr, nc)) {
          const t = boardState[nr][nc];
          if (!t || t.color !== piece.color) moves.push({ r: nr, c: nc, capture: !!t });
        }
      }
    }

    if (piece.type === 'K') {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          const nr = r + dr, nc = c + dc;
          if (this.inBounds(nr, nc)) {
            const t = boardState[nr][nc];
            if (!t || t.color !== piece.color) moves.push({ r: nr, c: nc, capture: !!t });
          }
        }
      }
    }
    return moves;
  }

  isSquareAttacked(r, c, attackerColor, boardState = this.board) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = boardState[i][j];
        if (piece && piece.color === attackerColor) {
          const pseudoMoves = this.getPseudoLegalMoves(i, j, boardState);
          if (pseudoMoves.some(m => m.r === r && m.c === c)) return true;
        }
      }
    }
    return false;
  }

  isInCheck(color, boardState = this.board) {
    let kingPos = null;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (p && p.type === 'K' && p.color === color) {
          kingPos = { r, c };
          break;
        }
      }
      if (kingPos) break;
    }
    if (!kingPos) return false;
    const attackerColor = color === 'w' ? 'b' : 'w';
    return this.isSquareAttacked(kingPos.r, kingPos.c, attackerColor, boardState);
  }

  getLegalMoves(r, c, boardState = this.board) {
    const piece = boardState[r][c];
    if (!piece) return [];
    
    const pseudoMoves = this.getPseudoLegalMoves(r, c, boardState);
    const legalMoves = [];

    if (piece.type === 'K') {
      legalMoves.push(...this.getCastlingMoves(r, c, piece.color, boardState));
    }

    for (const move of pseudoMoves) {
      const tempBoard = boardState.map(row => [...row]);
      tempBoard[move.r][move.c] = tempBoard[r][c];
      tempBoard[r][c] = null;
      
      if (move.enPassant) tempBoard[r][move.c] = null;
      
      if (!this.isInCheck(piece.color, tempBoard)) legalMoves.push(move);
    }
    
    return legalMoves;
  }

  getAllLegalMoves(color, boardState = this.board) {
    const all = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (p && p.color === color) {
          const moves = this.getLegalMoves(r, c, boardState);
          for (const m of moves) {
            all.push({ from: { r, c }, to: m });
          }
        }
      }
    }
    return all;
  }

  // Avalia estrategicamente a força militar e posicional do tabuleiro
  evaluateBoard(boardState, color) {
    let myScore = 0;
    let enemyScore = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (!p) continue;

        // 1. Valor Material
        let val = PIECE_VALUES[p.type] * 10;

        // 2. Estratégia de Centro
        val += (3.5 - Math.abs(3.5 - r)) * 2;
        val += (3.5 - Math.abs(3.5 - c)) * 2;

        // 3. Estratégia de Peões
        if (p.type === 'P') {
           val += (p.color === 'w' ? (6 - r) : (r - 1)) * 3;
        }

        // 4. Desenvolvimento Inicial
        if ((p.type === 'N' || p.type === 'B') && !p.moved) {
           val -= 8;
        }

        if (p.color === color) myScore += val;
        else enemyScore += val;
      }
    }
    return myScore - enemyScore;
  }

  // Minimax recursivo com Poda Alpha-Beta (Profundidade 2-3 para a IA Difícil)
  minimaxAlphaBeta(boardState, depth, alpha, beta, isMaximizing, myColor, enemyColor) {
    if (depth === 0) {
      return this.evaluateBoard(boardState, myColor);
    }

    const currentColor = isMaximizing ? myColor : enemyColor;
    const moves = this.getAllLegalMoves(currentColor, boardState);

    if (moves.length === 0) {
      if (this.isInCheck(currentColor, boardState)) {
        return isMaximizing ? -99999 + (3 - depth) : 99999 - (3 - depth);
      }
      return 0; // Empate
    }

    // Ordenação básica de lances para otimizar podas (capturas primeiro)
    moves.sort((a, b) => {
      const targetA = boardState[a.to.r][a.to.c];
      const targetB = boardState[b.to.r][b.to.c];
      const valA = targetA ? PIECE_VALUES[targetA.type] : 0;
      const valB = targetB ? PIECE_VALUES[targetB.type] : 0;
      return valB - valA;
    });

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const m of moves) {
        const nextBoard = boardState.map(row => [...row]);
        nextBoard[m.to.r][m.to.c] = nextBoard[m.from.r][m.from.c];
        nextBoard[m.from.r][m.from.c] = null;
        if (m.to.enPassant) nextBoard[m.from.r][m.to.c] = null;

        const evalScore = this.minimaxAlphaBeta(nextBoard, depth - 1, alpha, beta, false, myColor, enemyColor);
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break; // Poda Beta
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const m of moves) {
        const nextBoard = boardState.map(row => [...row]);
        nextBoard[m.to.r][m.to.c] = nextBoard[m.from.r][m.from.c];
        nextBoard[m.from.r][m.from.c] = null;
        if (m.to.enPassant) nextBoard[m.from.r][m.to.c] = null;

        const evalScore = this.minimaxAlphaBeta(nextBoard, depth - 1, alpha, beta, true, myColor, enemyColor);
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break; // Poda Alpha
      }
      return minEval;
    }
  }

  // Escolhe a melhor jogada consoante a dificuldade
  chooseBestMove(color = this.turn, difficulty = 2) {
    const enemyColor = color === 'w' ? 'b' : 'w';

    // 1. Aberturas dinâmicas
    if (difficulty >= 2 && (!this.history || this.history.length <= 2)) {
      const openingMoves = [];
      const rPawn = color === 'w' ? 6 : 1;
      const rTarget = color === 'w' ? 4 : 3;
      const rKnight = color === 'w' ? 7 : 0;
      const rKnightTarget = color === 'w' ? 5 : 2;

      [2, 3, 4].forEach(c => openingMoves.push({ from: { r: rPawn, c }, to: { r: rTarget, c } }));
      openingMoves.push({ from: { r: rKnight, c: 1 }, to: { r: rKnightTarget, c: 2 } }); 
      openingMoves.push({ from: { r: rKnight, c: 6 }, to: { r: rKnightTarget, c: 5 } }); 

      const validOpenings = openingMoves.filter(m => {
        const piece = this.board[m.from.r][m.from.c];
        if (!piece || piece.color !== color) return false;
        const legals = this.getLegalMoves(m.from.r, m.from.c);
        return legals.some(v => v.r === m.to.r && v.c === m.to.c);
      });

      if (validOpenings.length > 0) {
        const chosen = validOpenings[Math.floor(Math.random() * validOpenings.length)];
        const finalMove = this.getLegalMoves(chosen.from.r, chosen.from.c).find(v => v.r === chosen.to.r && v.c === chosen.to.c);
        return { from: chosen.from, to: finalMove };
      }
    }

    const legalMoves = this.getAllLegalMoves(color, this.board);
    if (legalMoves.length === 0) return null;

    // Dificuldade 1 (Fácil): Capturas fáceis ou jogadas semi-aleatórias
    if (difficulty === 1) {
      legalMoves.forEach(m => {
        const target = this.board[m.to.r][m.to.c];
        m.score = (target ? PIECE_VALUES[target.type] * 5 : 0) + Math.random() * 25;
      });
      legalMoves.sort((a, b) => b.score - a.score);
      return legalMoves[0];
    }

    // Dificuldade 2 (Média): Avaliação de tabuleiro + busca de Xeque
    if (difficulty === 2) {
      legalMoves.forEach(m => {
        const tempBoard = this.board.map(row => [...row]);
        tempBoard[m.to.r][m.to.c] = tempBoard[m.from.r][m.from.c];
        tempBoard[m.from.r][m.from.c] = null;
        if (m.to.enPassant) tempBoard[m.from.r][m.to.c] = null;

        let score = this.evaluateBoard(tempBoard, color);
        if (this.isInCheck(enemyColor, tempBoard)) score += 35;
        score += Math.random() * 4;
        m.score = score;
      });
      legalMoves.sort((a, b) => b.score - a.score);
      return legalMoves[0];
    }

    // Dificuldade 3 (Difícil): Minimax com Poda Alpha-Beta (profundidade 2 completa)
    let bestMove = null;
    let bestScore = -Infinity;

    for (const m of legalMoves) {
      const tempBoard = this.board.map(row => [...row]);
      tempBoard[m.to.r][m.to.c] = tempBoard[m.from.r][m.from.c];
      tempBoard[m.from.r][m.from.c] = null;
      if (m.to.enPassant) tempBoard[m.from.r][m.to.c] = null;

      const score = this.minimaxAlphaBeta(tempBoard, 2, -Infinity, Infinity, false, color, enemyColor);
      const randomized = score + Math.random() * 1.5; // Desempate natural

      if (randomized > bestScore) {
        bestScore = randomized;
        bestMove = m;
      }
    }

    return bestMove || legalMoves[0];
  }

  // Lógica de Validação do Roque (Castling)
  getCastlingMoves(r, c, color, boardState = this.board) {
    const moves = [];
    const p = boardState[r][c];
    if (!p || p.type !== 'K' || p.moved || this.isInCheck(color, boardState)) return moves;

    // Roque Menor
    const rookK = boardState[r][7];
    if (rookK && rookK.type === 'R' && !rookK.moved) {
      if (!boardState[r][5] && !boardState[r][6]) {
        let safe = true;
        for (let col = 5; col <= 6; col++) {
          const temp = boardState.map(row => [...row]);
          temp[r][col] = p; temp[r][c] = null;
          if (this.isInCheck(color, temp)) safe = false;
        }
        if (safe) moves.push({ r, c: 6, castling: 'kingside' });
      }
    }

    // Roque Maior
    const rookQ = boardState[r][0];
    if (rookQ && rookQ.type === 'R' && !rookQ.moved) {
      if (!boardState[r][1] && !boardState[r][2] && !boardState[r][3]) {
        let safe = true;
        for (let col = 2; col <= 3; col++) {
          const temp = boardState.map(row => [...row]);
          temp[r][col] = p; temp[r][c] = null;
          if (this.isInCheck(color, temp)) safe = false;
        }
        if (safe) moves.push({ r, c: 2, castling: 'queenside' });
      }
    }
    return moves;
  }

  // Guarda uma fotografia exata do tabuleiro atual
  saveState() {
    if (!this.history) this.history = [];
    this.history.push({
      board: this.board.map(row => row.map(p => p ? {...p} : null)),
      turn: this.turn,
      lastMove: this.lastMove ? JSON.parse(JSON.stringify(this.lastMove)) : null,
      halfmoveClock: this.halfmoveClock,
      positionHistory: [...this.positionHistory]
    });
  }

  // Restaura a última fotografia guardada
  undo() {
    if (!this.history || this.history.length === 0) return false;
    const snapshot = this.history.pop();
    this.board = snapshot.board;
    this.turn = snapshot.turn;
    this.lastMove = snapshot.lastMove;
    this.halfmoveClock = snapshot.halfmoveClock || 0;
    this.positionHistory = snapshot.positionHistory || [];
    return true;
  }
}