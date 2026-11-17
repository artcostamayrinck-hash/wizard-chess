import { ChessEngine } from './chessEngine.js';

// Web Worker dedicado para cálculo de lances da IA sem bloquear a thread principal da GPU
self.onmessage = (e) => {
  const { id, board, turn, difficulty, history, lastMove, halfmoveClock } = e.data;
  try {
    const engine = new ChessEngine();
    engine.board = board;
    engine.turn = turn;
    engine.history = history || [];
    engine.lastMove = lastMove;
    engine.halfmoveClock = halfmoveClock || 0;

    const bestMove = engine.chooseBestMove(turn, difficulty);
    self.postMessage({ id, bestMove, success: true });
  } catch (err) {
    self.postMessage({ id, error: err.message, success: false });
  }
};
