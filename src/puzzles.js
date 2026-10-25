// ==========================================
// DESAFIOS TÁTICOS POR ARENA E NÍVEL DE DIFICULDADE
// ==========================================

export const ARENAS_LIST = ['cathedral', 'inferno', 'frost'];

export const ARENA_METADATA = {
  cathedral: {
    id: 'cathedral',
    name: 'Catedral Arcana',
    icon: 'castle',
    themeColor: '#f5c56b',
    lore: 'O santuário ancestral onde a sabedoria do Mármore e as sombras da Obsidiana colidem.'
  },
  inferno: {
    id: 'inferno',
    name: 'Cripta Infernal',
    icon: 'local_fire_department',
    themeColor: '#ff4d00',
    lore: 'As profundezas de basalto e lava onde apenas os feitiços mais agressivos sobrevivem.'
  },
  frost: {
    id: 'frost',
    name: 'Templo de Gelo',
    icon: 'ac_unit',
    themeColor: '#00f5d4',
    lore: 'O pico congelado onde a frieza do cálculo e a precisão do gelo decidem o destino.'
  }
};

export const ARENA_CHALLENGES = {
  cathedral: [
    {
      level: 1,
      difficulty: 'Iniciante',
      title: 'O Pastor Sagrado',
      objective: 'Mate em 1 lance com a Rainha',
      lore: 'A Rainha de Mármore avança sob a bênção do Bispo e mira o ponto fraco do monarca inimigo.',
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Ataque o peão desprotegido em f7 com sua Rainha com a cobertura do Bispo em c4.',
      solution: [{ from: { r: 3, c: 7 }, to: { r: 1, c: 5 } }] // Qh5 x f7#
    },
    {
      level: 2,
      difficulty: 'Fácil',
      title: 'O Corredor de Pedra',
      objective: 'Mate no fundo em 1 lance',
      lore: 'As sentinelas de Obsidiana bloqueiam a fuga de seu monarca. A Torre de Mármore sela a passagem.',
      fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Avance a Torre de d1 diretamente para d8 para aplicar o mate no corredor.',
      solution: [{ from: { r: 7, c: 3 }, to: { r: 0, c: 3 } }] // Rd1 - d8#
    },
    {
      level: 3,
      difficulty: 'Médio',
      title: 'O Beijo da Catedral',
      objective: 'Mate em 1 com Rainha e Cavalo',
      lore: 'O Cavalo mantém o Rei sob a mira mística enquanto a Rainha desfere o golpe de misericórdia.',
      fen: '7k/6pp/7N/8/8/8/8/6QK w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Capture o peão em g7 com a Rainha. O Cavalo em h6 garante a proteção do lance.',
      solution: [{ from: { r: 7, c: 6 }, to: { r: 1, c: 6 } }] // Qg1 x g7#
    },
    {
      level: 4,
      difficulty: 'Mestre',
      title: 'O Cerco dos Apóstolos',
      objective: 'Elimine a defesa e aplique o Mate',
      lore: 'A Torre inimiga tenta segurar a retaguarda, mas a Torre de Mármore aniquila a guardiã.',
      fen: '2r3k1/5ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Capture a Torre em c8 diretamente com sua Torre de c1.',
      solution: [{ from: { r: 7, c: 2 }, to: { r: 0, c: 2 } }] // Rc1 x c8#
    }
  ],

  inferno: [
    {
      level: 1,
      difficulty: 'Fácil',
      title: 'A Sentinela de Enxofre',
      objective: 'Mate lateral em 1 lance',
      lore: 'O monarca de Obsidiana foi empurrado para a beira do precipício de fogo.',
      fen: 'k7/ppp5/8/8/8/8/8/R3K3 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Avance a Torre de a1 diretamente para a8.',
      solution: [{ from: { r: 7, c: 0 }, to: { r: 0, c: 0 } }] // Ra1 - a8#
    },
    {
      level: 2,
      difficulty: 'Médio',
      title: 'A Invasão das Chamas',
      objective: 'Mate em 1 com Torre e Rainha',
      lore: 'A Rainha cerca as saídas superiores enquanto a Torre penetra pela fenda de magma.',
      fen: '6k1/pp3p1p/5Qp1/8/8/8/PPP2PPP/4R1K1 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Mova a Torre de e1 direto para e8 no fundo da cripta.',
      solution: [{ from: { r: 7, c: 4 }, to: { r: 0, c: 4 } }] // Re1 - e8#
    },
    {
      level: 3,
      difficulty: 'Avançado',
      title: 'O Fogo Cruzado',
      objective: 'Mate fulminante com a Rainha',
      lore: 'A Rainha cruza o salão em chamas para atingir a retaguarda vulnerável.',
      fen: '6k1/5ppp/8/4Q3/8/8/5PPP/6K1 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Leve a Rainha de e5 direto para a casa e8.',
      solution: [{ from: { r: 3, c: 4 }, to: { r: 0, c: 4 } }] // Qe5 - e8#
    },
    {
      level: 4,
      difficulty: 'Mestre',
      title: 'O Selo Vulcânico',
      objective: 'Cravação fatal do Bispo e Torre',
      lore: 'O Bispo impede a fuga diagonal e a Torre de Mármore executa o golpe final.',
      fen: 'r1b3kr/ppp3pp/8/8/1B6/8/PPP2PPP/4R1K1 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'A Torre em e1 deve avançar até e8. O Bispo em b4 impede a fuga do Rei.',
      solution: [{ from: { r: 7, c: 4 }, to: { r: 0, c: 4 } }] // Re1 - e8#
    }
  ],

  frost: [
    {
      level: 1,
      difficulty: 'Fácil',
      title: 'A Flecha de Cristal',
      objective: 'Mate na coluna aberta em 1 lance',
      lore: 'A Torre desliza com velocidade sobre o lago congelado até a retaguarda adversária.',
      fen: '1k6/ppp5/8/8/8/8/8/1R2K3 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Deslize a Torre de b1 até b8.',
      solution: [{ from: { r: 7, c: 1 }, to: { r: 0, c: 1 } }] // Rb1 - b8#
    },
    {
      level: 2,
      difficulty: 'Médio',
      title: 'O Raio Polar',
      objective: 'Mate diagonal com o Bispo',
      lore: 'O Bispo dispara um feixe de luz gélida pela grande diagonal do templo.',
      fen: 'k7/8/1K6/8/8/8/8/5B2 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Posicione o Bispo em g2 para acertar o Rei na diagonal longa.',
      solution: [{ from: { r: 7, c: 5 }, to: { r: 6, c: 6 } }] // Bf1 - g2#
    },
    {
      level: 3,
      difficulty: 'Avançado',
      title: 'A Ascensão da Rainha de Gelo',
      objective: 'Promova o peão e finalize o duelo',
      lore: 'O peão solitário atravessa a nevasca e atinge a linha final, despertando a Rainha Suprema.',
      fen: 'kb6/pp5P/8/8/8/8/8/7B w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Avance o peão em h7 para h8 e escolha a Rainha para o xeque-mate.',
      solution: [{ from: { r: 1, c: 7 }, to: { r: 0, c: 7 } }] // h7 - h8=Q#
    },
    {
      level: 4,
      difficulty: 'Grão-Mestre',
      title: 'O Julgamento do Zero Absoluto',
      objective: 'Mate de cooperação entre Torre e Rei',
      lore: 'Com as peças de Obsidiana congeladas na muralha, a Torre desfere o xeque-mate inescapável.',
      fen: '3rkr2/R7/4K3/8/8/8/8/8 w - - 0 1',
      turn: 'w',
      playerColor: 'w',
      hint: 'Deslize a Torre de a7 para e7, protegida pelo Rei em e6.',
      solution: [{ from: { r: 1, c: 0 }, to: { r: 1, c: 4 } }] // Ra7 - e7#
    }
  ]
};
