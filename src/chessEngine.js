export const PIECE_VALUES = { P: 10, N: 30, B: 30, R: 50, Q: 90, K: 900 };

export class ChessEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.turn = 'w';
    this.lastMove = null;
    this.history = [];
    this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
    const backRank = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

    for (let c = 0; c < 8; c++) {
      this.board[0][c] = { type: backRank[c], color: 'b', moved: false };
      this.board[1][c] = { type: 'P', color: 'b', moved: false };
      this.board[6][c] = { type: 'P', color: 'w', moved: false };
      this.board[7][c] = { type: backRank[c], color: 'w', moved: false };
    }
  }

  inBounds(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

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
            
            // NOVO: Regra do En Passant
            if (this.lastMove && this.lastMove.piece.type === 'P' && Math.abs(this.lastMove.from.r - this.lastMove.to.r) === 2) {
              // Se o peão inimigo andou 2 casas e parou exatamente ao nosso lado
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

  getLegalMoves(r, c) {
    const piece = this.board[r][c];
    if (!piece) return [];
    
    const pseudoMoves = this.getPseudoLegalMoves(r, c);
    const legalMoves = [];

    if (piece.type === 'K') {
      legalMoves.push(...this.getCastlingMoves(r, c, piece.color));
    }

    for (const move of pseudoMoves) {
      const tempBoard = this.board.map(row => [...row]);
      tempBoard[move.r][move.c] = tempBoard[r][c];
      tempBoard[r][c] = null;
      
      // NOVO: Apaga o peão vítima do tabuleiro simulado se for En Passant
      if (move.enPassant) tempBoard[r][move.c] = null;
      
      if (!this.isInCheck(piece.color, tempBoard)) legalMoves.push(move);
    }
    
    return legalMoves;
  }
  // Avalia estrategicamente a força militar e posicional do tabuleiro
  evaluateBoard(boardState, color) {
    let myScore = 0;
    let enemyScore = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (!p) continue;

        // 1. Valor Material (Uma Rainha vale muito mais que um Bispo)
        let val = PIECE_VALUES[p.type] * 10;

        // 2. Estratégia de Centro (Dominar o meio do tabuleiro)
        val += (3.5 - Math.abs(3.5 - r)) * 2;
        val += (3.5 - Math.abs(3.5 - c)) * 2;

        // 3. Estratégia de Peões (Incentiva a marcha em direção ao outro lado)
        if (p.type === 'P') {
           val += (p.color === 'w' ? (6 - r) : (r - 1)) * 3;
        }

        // 4. Desenvolvimento Inicial (Penaliza manter Cavalos e Bispos presos na base)
        if ((p.type === 'N' || p.type === 'B') && !p.moved) {
           val -= 8;
        }

        if (p.color === color) myScore += val;
        else enemyScore += val;
      }
    }
    return myScore - enemyScore;
  }

  // Escolhe a melhor jogada consoante a dificuldade
  chooseBestMove(color = this.turn, difficulty = 2) {

    // ==========================================
    // ABERTURAS DINÂMICAS E IMPREVISÍVEIS
    // ==========================================
    
    // Se o jogo está no início (menos de 3 jogadas no histórico), a IA usa aberturas reais
    if (difficulty >= 2 && (!this.history || this.history.length <= 2)) {
      const openingMoves = [];
      const rPawn = color === 'w' ? 6 : 1;
      const rTarget = color === 'w' ? 4 : 3;
      const rKnight = color === 'w' ? 7 : 0;
      const rKnightTarget = color === 'w' ? 5 : 2;

      // Opções: Avançar peões centrais (c, d, e) ou os Cavalos
      [2, 3, 4].forEach(c => openingMoves.push({ from: { r: rPawn, c }, to: { r: rTarget, c } }));
      openingMoves.push({ from: { r: rKnight, c: 1 }, to: { r: rKnightTarget, c: 2 } }); 
      openingMoves.push({ from: { r: rKnight, c: 6 }, to: { r: rKnightTarget, c: 5 } }); 

      // Filtra apenas as jogadas de abertura que sejam legais e seguras
      const validOpenings = openingMoves.filter(m => {
        const piece = this.board[m.from.r][m.from.c];
        if (!piece || piece.color !== color) return false;
        const legals = this.getLegalMoves(m.from.r, m.from.c);
        return legals.some(v => v.r === m.to.r && v.c === m.to.c);
      });

      // Escolhe uma abertura aleatória para confundir o jogador
      if (validOpenings.length > 0) {
        const chosen = validOpenings[Math.floor(Math.random() * validOpenings.length)];
        const finalMove = this.getLegalMoves(chosen.from.r, chosen.from.c).find(v => v.r === chosen.to.r && v.c === chosen.to.c);
        return { from: chosen.from, to: finalMove };
      }
    }
    const candidates = [];
    const enemyColor = color === 'w' ? 'b' : 'w';

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p && p.color === color) {
          for (const m of this.getLegalMoves(r, c)) {
            
            // Simula o futuro: O que acontece se eu fizer esta jogada?
            const tempBoard = this.board.map(row => [...row]);
            tempBoard[m.r][m.c] = tempBoard[r][c];
            tempBoard[r][c] = null;

            let score = 0;

            if (difficulty === 1) { 
              // Fácil: Caótico, faz jogadas aleatórias e capturas óbvias
              score = (this.board[m.r][m.c] ? PIECE_VALUES[this.board[m.r][m.c].type] : 0) + Math.random() * 20;
            } 
            else if (difficulty === 2) { 
              // Média: Avalia o tabuleiro e ataca de forma agressiva (Xeque = Bom)
              score = this.evaluateBoard(tempBoard, color);
              if (this.isInCheck(enemyColor, tempBoard)) score += 30;
              score += Math.random() * 5;
            } 
            else if (difficulty === 3) { 
              // Difícil: Estratégia Profunda (Prevê o pior cenário)
              score = this.evaluateBoard(tempBoard, color);
              if (this.isInCheck(enemyColor, tempBoard)) score += 40;

              // IA simula a melhor resposta possível do jogador para arruinar a jogada dela
              let worstCaseResponse = 0;
              for (let er = 0; er < 8; er++) {
                for (let ec = 0; ec < 8; ec++) {
                  const ep = tempBoard[er][ec];
                  if (ep && ep.color === enemyColor) {
                    const enemyMoves = this.getPseudoLegalMoves(er, ec, tempBoard);
                    for (const em of enemyMoves) {
                      const target = tempBoard[em.r][em.c];
                      if (target && target.color === color) {
                        // Se o jogador puder capturar uma peça após esta jogada, a IA recua
                        const penalty = PIECE_VALUES[target.type] * 12;
                        if (penalty > worstCaseResponse) worstCaseResponse = penalty;
                      }
                    }
                  }
                }
              }
              score -= worstCaseResponse; // Subtrai a armadilha do jogador
              score += Math.random() * 2; // Quebra empates
            }

            // Defesa Absoluta: Salvar o próprio Rei ignora qualquer outra estratégia
            if(this.isInCheck(color)) score += 100000; 

            candidates.push({ from: { r, c }, to: m, score });
          }
        }
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    return candidates[0] || null;
  }

  // Lógica de Validação do Roque (Castling)
  getCastlingMoves(r, c, color, boardState = this.board) {
    const moves = [];
    const p = boardState[r][c];
    // Se não for o Rei, ou se já se mexeu, ou se estiver em Xeque, não pode fazer Roque
    if (!p || p.type !== 'K' || p.moved || this.isInCheck(color, boardState)) return moves;

    // Roque Menor (Kingside - Torre da Direita)
    const rookK = boardState[r][7];
    if (rookK && rookK.type === 'R' && !rookK.moved) {
      if (!boardState[r][5] && !boardState[r][6]) { // Caminho livre
        let safe = true;
        for (let col = 5; col <= 6; col++) {
          const temp = boardState.map(row => [...row]);
          temp[r][col] = p; temp[r][c] = null;
          if (this.isInCheck(color, temp)) safe = false; // Passa por área atacada
        }
        if (safe) moves.push({ r, c: 6, castling: 'kingside' });
      }
    }

    // Roque Maior (Queenside - Torre da Esquerda)
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
      lastMove: this.lastMove ? JSON.parse(JSON.stringify(this.lastMove)) : null
    });
  }

  // Restaura a última fotografia guardada
  undo() {
    if (!this.history || this.history.length === 0) return false;
    const snapshot = this.history.pop();
    this.board = snapshot.board;
    this.turn = snapshot.turn;
    this.lastMove = snapshot.lastMove;
    return true;
  }
}