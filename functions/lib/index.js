"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPartidas = exports.salvarPartida = void 0;
const serverless_1 = require("@neondatabase/serverless");
const firebase_functions_1 = require("firebase-functions");
const https_1 = require("firebase-functions/https");
(0, firebase_functions_1.setGlobalOptions)({ maxInstances: 10 });
exports.salvarPartida = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        const { jogador_brancas, jogador_pretas, vencedor } = req.body;
        const sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
        const resultado = await sql `
      INSERT INTO partidas (jogador_brancas, jogador_pretas, vencedor)
      VALUES (${jogador_brancas}, ${jogador_pretas}, ${vencedor})
      RETURNING *;
    `;
        res.json({ salvo: true, partida: resultado[0] });
    }
    catch (erro) {
        res.status(500).json({ erro: "Erro ao salvar partida" });
    }
});
exports.listarPartidas = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    try {
        const sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
        const partidas = await sql `
      SELECT * FROM partidas ORDER BY criado_em DESC LIMIT 20;
    `;
        res.json(partidas);
    }
    catch (erro) {
        res.status(500).json({ erro: "Erro ao listar partidas" });
    }
});
//# sourceMappingURL=index.js.map