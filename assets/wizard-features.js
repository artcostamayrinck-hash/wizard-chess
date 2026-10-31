// ========================================================
// Wizard's Chess 3D - Advanced Features, Progression & Skins
// ========================================================

// Helper unificado para toque imediato no mobile e clique seguro
function bindAction(el, handler, actionKey = "") {
  if (!el) return;
  el._wizardActions = el._wizardActions || new Set();
  const key = actionKey || handler.toString();
  if (el._wizardActions.has(key)) return;
  el._wizardActions.add(key);

  let lastTrigger = 0;

  const trigger = (e) => {
    const now = Date.now();
    if (now - lastTrigger < 120) return;
    lastTrigger = now;
    try {
      handler(e);
    } catch (err) {
      console.error("[WizardChess] Erro ao executar ação:", err);
    }
  };

  el.addEventListener("click", trigger);
  el.addEventListener("pointerup", (e) => {
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      trigger(e);
    }
  });
}

function initWizardFeatures() {
  const tasks = [
    { name: "StartMenuGrid", fn: setupStartMenuGrid },
    { name: "ProfileSystem", fn: setupProfileSystem },
    { name: "CenteredModalsClose", fn: setupCenteredModalsClose },
    { name: "ProgressionAndAchievements", fn: setupProgressionAndAchievements },
    { name: "SkinsSystem", fn: setupSkinsSystem },
    { name: "MusicControls", fn: setupMusicControls },
    { name: "BackButtonIntegration", fn: setupBackButtonIntegration },
    { name: "UndoFeature", fn: setupUndoFeature },
    { name: "CustomPGNCopy", fn: setupCustomPGNCopy },
    { name: "WhatsAppShare", fn: setupWhatsAppShare },
    { name: "MoveAnalysis", fn: setupMoveAnalysis },
    { name: "ChessDynamics", fn: setupChessDynamics },
    { name: "AdaptiveLayout", fn: setupAdaptiveFullscreenAndLayout }
  ];

  for (const task of tasks) {
    try {
      task.fn();
    } catch (err) {
      console.warn(`[WizardChess] Erro ao inicializar ${task.name}:`, err);
    }
  }
}


// --------------------------------------------------------
// 1. WhatsApp Share
// --------------------------------------------------------
function setupWhatsAppShare() {
  const btnShare = document.getElementById("btn-whatsapp-share");
  if (!btnShare) return;

  btnShare.addEventListener("click", () => {
    const code = document.getElementById("room-short-code")?.textContent.trim() || "";
    const input = document.getElementById("room-link-input");
    const link = (input && input.value.trim()) || window.location.href;

    const message = `⚔️ Desafio para o Xadrez de Bruxo 3D!\nEntre na minha sala mágica com o Código: *${code}*\nOu clique direto no link:\n${link}`;

    unlockAchievement("whatsapp_challenger");

    if (navigator.share) {
      navigator.share({
        title: "Wizard's Chess 3D",
        text: message,
        url: link
      }).catch(() => {
        openWhatsAppFallback(message);
      });
    } else {
      openWhatsAppFallback(message);
    }
  });
}

function openWhatsAppFallback(msg) {
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// --------------------------------------------------------
// 2. Undo Feature (Desativado e Oculto conforme solicitado)
// --------------------------------------------------------
function setupUndoFeature() {
  const btnUndo = document.getElementById("btn-undo");
  if (btnUndo) {
    btnUndo.style.display = "none";
    btnUndo.classList.add("hidden");
  }
}

// --------------------------------------------------------
// 3. Android & Web Back Button Integration
// --------------------------------------------------------
function setupBackButtonIntegration() {
  let lastBackPress = 0;

  try {
    window.history.pushState({ wizardChess: true }, "");
  } catch (e) {}

  function handleBack(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const modalSelectors = [
      "#profile-modal",
      "#achievements-modal",
      "#waiting-modal",
      "#pause-modal",
      "#resign-modal",
      "#promotion-modal",
      "#emotes-popup",
      "#history-panel",
      "#puzzle-hud"
    ];

    for (const sel of modalSelectors) {
      const el = document.querySelector(sel);
      if (el && !el.classList.contains("hidden")) {
        el.classList.add("hidden");
        try { window.history.pushState({ wizardChess: true }, ""); } catch (err) {}
        return;
      }
    }

        // Se estiver em uma subview do menu inicial diferente de home, volta para a tela inicial
    const activeSubView = document.querySelector(".menu-subview.active:not(#menu-view-home)");
    if (activeSubView) {
      const homeView = document.getElementById("menu-view-home");
      document.querySelectorAll(".menu-subview").forEach(v => {
        v.classList.remove("active");
        v.style.setProperty("display", "none", "important");
      });
      if (homeView) {
        homeView.classList.add("active");
        homeView.style.setProperty("display", "flex", "important");
      }
      document.querySelectorAll(".rpg-bottom-nav .rpg-nav-item").forEach(btn => btn.classList.remove("active"));
      const btnNavHome = document.getElementById("btn-nav-home");
      if (btnNavHome) btnNavHome.classList.add("active");
      try { window.history.pushState({ wizardChess: true }, ""); } catch (err) {}
      return;
    }

    const startMenu = document.getElementById("start-menu");
    const pauseModal = document.getElementById("pause-modal");
    if (startMenu && startMenu.classList.contains("hidden")) {
      if (pauseModal && pauseModal.classList.contains("hidden")) {
        pauseModal.classList.remove("hidden");
        try { window.history.pushState({ wizardChess: true }, ""); } catch (err) {}
        return;
      }
    }

    const now = Date.now();
    if (now - lastBackPress < 2000) {
      if (window.navigator?.app?.exitApp) {
        window.navigator.app.exitApp();
      }
    } else {
      lastBackPress = now;
      showToast("Pressione voltar novamente para sair do jogo", 2000);
      try { window.history.pushState({ wizardChess: true }, ""); } catch (err) {}
    }
  }

  window.addEventListener("popstate", handleBack);
  document.addEventListener("backbutton", handleBack);
}

// --------------------------------------------------------
// 4. Move Analysis (Post-Game)
// --------------------------------------------------------
function setupMoveAnalysis() {
  const gameOverModal = document.getElementById("game-over-modal");
  const analysisCard = document.getElementById("game-analysis-card");
  if (!gameOverModal || !analysisCard) return;

  const observer = new MutationObserver(() => {
    if (!gameOverModal.classList.contains("hidden")) {
      generateMatchAnalysis();
      handleGameOverRewards();
    }
  });

  observer.observe(gameOverModal, { attributes: true, attributeFilter: ["class"] });
}

function generateMatchAnalysis() {
  const analysisCard = document.getElementById("game-analysis-card");
  if (!analysisCard) return;

  const historyList = document.querySelectorAll("#history-list li");
  const totalMoves = historyList.length || 8;
  const game = window._WIZARD_GAME;
  const history = game && game.xe && game.xe.history ? game.xe.history : [];
  const engine = game && game.xe ? game.xe : null;

  let brilliant = 0;
  let great = 0;
  let blunders = 0;
  let totalLossW = 0;
  let totalLossB = 0;
  let movesW = 0;
  let movesB = 0;

  if (engine && history.length > 1) {
    let prevEval = 0;
    for (let i = 0; i < history.length; i++) {
      const snap = history[i];
      if (!snap || !snap.board) continue;
      const currentEval = typeof engine.evaluateBoard === "function"
        ? engine.evaluateBoard(snap.board, "w")
        : 0;
      
      const moveColor = (i % 2 === 0) ? "w" : "b";
      const evalDelta = moveColor === "w" ? (currentEval - prevEval) : (prevEval - currentEval);

      if (moveColor === "w") {
        movesW++;
        if (evalDelta < -150) blunders++;
        else if (evalDelta > 180) brilliant++;
        else if (evalDelta >= -20) great++;
        totalLossW += Math.max(0, -evalDelta);
      } else {
        movesB++;
        if (evalDelta < -150) blunders++;
        else if (evalDelta > 180) brilliant++;
        else if (evalDelta >= -20) great++;
        totalLossB += Math.max(0, -evalDelta);
      }
      prevEval = currentEval;
    }
  }

  const avgLossW = movesW > 0 ? (totalLossW / movesW) : 25;
  const avgLossB = movesB > 0 ? (totalLossB / movesB) : 32;

  const accW = Math.round(Math.max(55, Math.min(98, 100 - (avgLossW * 0.12))));
  const accB = Math.round(Math.max(50, Math.min(97, 100 - (avgLossB * 0.12))));

  if (great === 0) great = Math.max(1, Math.floor(totalMoves / 4));
  if (brilliant === 0 && (accW > 85 || accB > 85)) brilliant = 1;

  const elAccW = document.getElementById("analysis-acc-w");
  const elAccB = document.getElementById("analysis-acc-b");
  const elBrilliant = document.getElementById("analysis-brilliant-count");
  const elGreat = document.getElementById("analysis-great-count");
  const elBlunder = document.getElementById("analysis-blunder-count");

  if (elAccW) elAccW.textContent = `${accW}%`;
  if (elAccB) elAccB.textContent = `${accB}%`;
  if (elBrilliant) elBrilliant.textContent = `${brilliant}`;
  if (elGreat) elGreat.textContent = `${great}`;
  if (elBlunder) elBlunder.textContent = `${blunders}`;

  analysisCard.classList.remove("hidden");
}

function handleGameOverRewards() {
  const title = document.getElementById("game-over-title")?.textContent || "";
  if (title.toLowerCase().includes("xeque-mate") || title.toLowerCase().includes("vitória")) {
    unlockAchievement("first_win");
    addXP(100, "Vitória na Batalha");

    if (window._WIZARD_GAME) {
      const arena = window._WIZARD_GAME.getArena();
      if (arena === "inferno") unlockAchievement("crypt_master");
      if (arena === "frost") unlockAchievement("frost_lord");

      const mode = window._WIZARD_GAME.getMode();
      const diff = window._WIZARD_GAME.getDiff();
      if (mode === "ai" && diff === 3) {
        unlockAchievement("hard_slayer");
        addXP(150, "Vitória contra IA no Difícil");
      }
    }
  }
}

// --------------------------------------------------------
// 5. Music Ambient Controls
// --------------------------------------------------------
function setupMusicControls() {
  const btnMusic = document.getElementById("btn-music");
  const btnMenuAudio = document.getElementById("btn-menu-sound-toggle");

  const toggle = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!window._WIZARD_GAME) return;
    const isPlaying = window._WIZARD_GAME.toggleMusic();
    if (btnMusic) btnMusic.classList.toggle("active", isPlaying);
    if (btnMenuAudio) {
      btnMenuAudio.classList.toggle("active", isPlaying);
      const icon = btnMenuAudio.querySelector(".material-symbols-rounded");
      if (icon) icon.textContent = isPlaying ? "music_note" : "music_off";
    }
    showToast(isPlaying ? "🎶 Música Arcana iniciada" : "🔇 Música pausada");
    if (isPlaying) unlockAchievement("music_lover");
  };

  if (btnMusic) btnMusic.addEventListener("click", toggle);
  if (btnMenuAudio) btnMenuAudio.addEventListener("click", toggle);
}

// --------------------------------------------------------
// 6. Progression (XP & Titles) and Achievements System
// --------------------------------------------------------
const RANKS = [
  { level: 1, title: "Iniciado Arcano", xpRequired: 0, nextXp: 200 },
  { level: 2, title: "Aprendiz da Catedral", xpRequired: 200, nextXp: 500 },
  { level: 3, title: "Mago de Batalha", xpRequired: 500, nextXp: 1000 },
  { level: 4, title: "Feiticeiro da Cripta", xpRequired: 1000, nextXp: 2000 },
  { level: 5, title: "Mestre Elemental", xpRequired: 2000, nextXp: 3500 },
  { level: 6, title: "Arquimago Supremo", xpRequired: 3500, nextXp: 6000 }
];

const ACHIEVEMENTS_DATA = [
  { id: "first_blood", icon: "⚔️", title: "Primeiro Sangue", desc: "Capture sua primeira peça no jogo.", xp: 25 },
  { id: "first_win", icon: "👑", title: "Primeira Vitória", desc: "Vença sua primeira batalha de xadrez.", xp: 50 },
  { id: "crypt_master", icon: "💀", title: "Mestre da Cripta", desc: "Vença uma partida na Cripta Infernal.", xp: 50 },
  { id: "frost_lord", icon: "❄️", title: "Senhor do Gelo", desc: "Vença uma partida no Templo de Gelo.", xp: 50 },
  { id: "hard_slayer", icon: "🧙", title: "Imbatível", desc: "Derrote a inteligência artificial no modo Difícil.", xp: 100 },
  { id: "undo_apprentice", icon: "↩️", title: "Segunda Chance", desc: "Use a magia de Desfazer Lance contra a IA no Fácil.", xp: 20 },
  { id: "music_lover", icon: "🎶", title: "Sinfonia Arcana", desc: "Ative a música ambiente da Catedral.", xp: 20 },
  { id: "whatsapp_challenger", icon: "📲", title: "Convocação Mágica", desc: "Convide um amigo para o jogo pelo WhatsApp.", xp: 25 },
  { id: "skin_collector", icon: "🎨", title: "Guarda-Roupa Mágico", desc: "Experimente uma nova Skin de peças 3D.", xp: 25 },
  { id: "puzzle_wizard", icon: "🧩", title: "Mente Iluminada", desc: "Jogue no modo de Desafios da Catedral.", xp: 35 },
  { id: "tutorial_master", icon: "📜", title: "Academia Arcana", desc: "Complete ou pratique no Modo de Tutorial.", xp: 50 }
];

function getPlayerXP() {
  try {
    const val = parseInt(localStorage.getItem("wizard_chess_xp") || "0", 10);
    return isNaN(val) ? 0 : val;
  } catch (e) {
    return 0;
  }
}

function getUnlockedAchievements() {
  try {
    return JSON.parse(localStorage.getItem("wizard_chess_achievements") || "{}");
  } catch {
    return {};
  }
}

function getRankData(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].xpRequired) return RANKS[i];
  }
  return RANKS[0];
}

// Verifica se uma partida está ativamente em andamento no tabuleiro
function isMatchInProgress() {
  const startMenu = document.getElementById("start-menu");
  const gameOverModal = document.getElementById("game-over-modal");
  const isMenuHidden = !startMenu || startMenu.classList.contains("hidden") || getComputedStyle(startMenu).display === "none";
  const isGameOverHidden = !gameOverModal || gameOverModal.classList.contains("hidden") || getComputedStyle(gameOverModal).display === "none";
  return isMenuHidden && isGameOverHidden;
}

function addXP(amount, reason = "") {
  const currentXP = getPlayerXP();
  const oldRank = getRankData(currentXP);
  const newXP = currentXP + amount;
  try {
    localStorage.setItem("wizard_chess_xp", newXP.toString());
  } catch (e) {}

  const newRank = getRankData(newXP);
  updateProgressionUI(newXP, newRank);

  // Requisito: Não mostrar toasts ou avisos de XP durante a partida
  if (isMatchInProgress()) {
    return;
  }

  if (newRank.level > oldRank.level) {
    showAchievementToast("🎉 EVOLUÇÃO DE GRAU!", `${newRank.title} (Nível ${newRank.level})`, "🔮");
  } else if (reason) {
    showToast(`+${amount} XP (${reason})`);
  }
}

function unlockAchievement(id) {
  const unlocked = getUnlockedAchievements();
  if (unlocked[id]) return;

  const data = ACHIEVEMENTS_DATA.find(a => a.id === id);
  if (!data) return;

  unlocked[id] = Date.now();
  localStorage.setItem("wizard_chess_achievements", JSON.stringify(unlocked));

  // Apenas notifica toast se não estiver jogando partida
  if (!isMatchInProgress()) {
    showAchievementToast(data.title, data.desc, data.icon);
  }
  addXP(data.xp, `Conquista: ${data.title}`);
  renderAchievementsList();
}

function unlockAllAchievements(notify = true) {
  const unlocked = getUnlockedAchievements();
  ACHIEVEMENTS_DATA.forEach(ach => {
    unlocked[ach.id] = Date.now();
  });
  try {
    localStorage.setItem("wizard_chess_achievements", JSON.stringify(unlocked));
    localStorage.setItem("wizard_chess_xp", "6000");
    localStorage.setItem("wizard_chess_all_unlocked", "true");
  } catch (e) {}

  const rank = getRankData(6000);
  updateProgressionUI(6000, rank);
  renderAchievementsList();

  if (notify) {
    showToast("⚡ Todas as funções, conquistas e títulos foram desbloqueados!");
    showAchievementToast("👑 GRAU MÁXIMO!", "Arquimago Supremo (Nível 6)", "🔮");
  }
}

function showAchievementToast(title, desc, icon = "🏆") {
  const toast = document.getElementById("achievement-toast");
  const titleEl = document.getElementById("ach-toast-title");
  const descEl = document.getElementById("ach-toast-desc");
  const iconEl = toast?.querySelector(".ach-toast-icon");

  if (!toast || !titleEl || !descEl) return;

  titleEl.textContent = title;
  descEl.textContent = desc;
  if (iconEl) iconEl.textContent = icon;

  toast.classList.remove("hidden");
  toast.style.animation = "achSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";

  setTimeout(() => {
    toast.style.animation = "achSlideOut 0.4s ease forwards";
    setTimeout(() => toast.classList.add("hidden"), 400);
  }, 4200);
}

function updateProgressionUI(xp = getPlayerXP(), rank = getRankData(xp)) {
  const rankTitle = document.getElementById("menu-rank-title");
  const rankLvl = document.getElementById("menu-rank-lvl");
  const barFill = document.getElementById("menu-xp-bar-fill");
  const xpCurrent = document.getElementById("menu-xp-current");
  const xpNext = document.getElementById("menu-xp-next");
  const hudRank = document.getElementById("hud-player-rank");
  const hudLvl = document.getElementById("hud-player-lvl");

  if (rankTitle) rankTitle.textContent = `🧙 ${rank.title}`;
  if (rankLvl) rankLvl.textContent = `Nível ${rank.level}`;
  if (hudRank) hudRank.textContent = rank.title;
  if (hudLvl) hudLvl.textContent = `Nv. ${rank.level}`;
  const menuLvlNum = document.getElementById("menu-rank-lvl-num"); if (menuLvlNum) menuLvlNum.textContent = rank.level;
  // Requisito: Não mostrar Nível/XP na barra do jogador durante a partida
  const rBottom = document.getElementById("player-rating-bottom"); if (rBottom) rBottom.textContent = `(Você)`;

  const currentLevelBase = rank.xpRequired;
  const nextLevelTarget = rank.nextXp;
  const progressPercent = Math.min(100, Math.max(5, Math.floor(((xp - currentLevelBase) / (nextLevelTarget - currentLevelBase)) * 100)));

  if (barFill) barFill.style.width = `${progressPercent}%`;
  if (xpCurrent) xpCurrent.textContent = `${xp} XP`;
  if (xpNext) xpNext.textContent = `${nextLevelTarget} XP para o próximo grau`;
}

function renderAchievementsList() {
  const container = document.getElementById("achievements-container");
  if (!container) return;

  const unlocked = getUnlockedAchievements();
  container.innerHTML = "";

  ACHIEVEMENTS_DATA.forEach(ach => {
    const isUnlocked = !!unlocked[ach.id];
    const item = document.createElement("div");
    item.className = `achievement-item ${isUnlocked ? "unlocked" : "locked"}`;

    item.innerHTML = `
      <div class="ach-icon-box">${ach.icon}</div>
      <div class="ach-info">
        <div class="ach-title-row">
          <span class="ach-title">${ach.title}</span>
          <span class="ach-xp-tag">+${ach.xp} XP</span>
        </div>
        <div class="ach-desc">${ach.desc}</div>
        <div class="ach-status-tag ${isUnlocked ? "unlocked" : "locked"}">
          ${isUnlocked ? "✅ Desbloqueada" : "🔒 Bloqueada"}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function setupProgressionAndAchievements() {
  const xp = getPlayerXP();
  updateProgressionUI(xp);
  renderAchievementsList();

  // Listeners for achievements modal
  const btnAchDock = document.getElementById("btn-achievements");
  const btnAchHud = document.getElementById("btn-achievements-hud");
  const modalAch = document.getElementById("achievements-modal");
  const btnCloseAch = document.getElementById("btn-close-achievements");

  const openAch = () => {
    renderAchievementsList();
    if (modalAch) modalAch.classList.remove("hidden");
  };

  if (btnAchDock) bindAction(btnAchDock, openAch);
  if (btnAchHud) bindAction(btnAchHud, openAch);
  if (btnCloseAch && modalAch) bindAction(btnCloseAch, () => modalAch.classList.add("hidden"));

  // Botão para Desbloqueio Geral de Feitos
  const btnUnlockAll = document.getElementById("btn-unlock-all-achievements");
  if (btnUnlockAll) {
    bindAction(btnUnlockAll, () => {
      unlockAllAchievements(true);
    });
  }

  // Desbloqueio automático de funções para a versão web / site
  try {
    const isNative = typeof window.Capacitor !== "undefined" && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    if (!isNative) {
      if (localStorage.getItem("wizard_chess_all_unlocked") !== "false") {
        unlockAllAchievements(false);
      }
    } else if (localStorage.getItem("wizard_chess_all_unlocked") === "true") {
      unlockAllAchievements(false);
    }
  } catch (e) {}

  // Track captures for First Blood
  const graveW = document.getElementById("grave-w");
  const graveB = document.getElementById("grave-b");
  if (graveW && graveB) {
    const checkCaptures = () => {
      if ((graveW.textContent && graveW.textContent.trim().length > 0) ||
          (graveB.textContent && graveB.textContent.trim().length > 0)) {
        unlockAchievement("first_blood");
        addXP(15, "Captura de Peça");
      }
    };
    new MutationObserver(checkCaptures).observe(graveW, { childList: true, characterData: true, subtree: true });
    new MutationObserver(checkCaptures).observe(graveB, { childList: true, characterData: true, subtree: true });
  }

  // Track puzzle button
  const puzzleTabs = document.querySelectorAll(".puzzle-tab, [data-mode='puzzle']");
  puzzleTabs.forEach(tab => tab.addEventListener("click", () => unlockAchievement("puzzle_wizard")));
}

// --------------------------------------------------------
// 7. Visual Skins System (Custom 3D Pieces & Runes)
// --------------------------------------------------------

// ========================================================
// RENDERIZADOR DINÂMICO DO CAVALO ARCANO (PEÇA EM DESTAQUE)
// ========================================================
function getKnightSvg(skinName) {
  const configs = {
    classic: {
      bodyGradStart: "#2e2945",
      bodyGradMid: "#1a162b",
      bodyGradEnd: "#0e0c18",
      rimLight: "#695999",
      accent: "#e6af2e",
      runeColor: "#ffd166",
      runeGlow: "#f39c12",
      eyeGlow: "#ffeaa7",
      bridleColor: "#cca028",
      bridleTrim: "#ffd166",
      gemColor: "#ff4d6d",
      baseGrad1: "#262238",
      baseGrad2: "#12101e",
      baseRing: "#ffd166",
      pedestalGlow: "rgba(255, 209, 102, 0.35)",
      name: "Cavalo Clássico",
      desc: "Mármore e obsidiana pura esculpidos com runas douradas arcanas."
    },
    gold: {
      bodyGradStart: "#fff3b0",
      bodyGradMid: "#ffb703",
      bodyGradEnd: "#b8860b",
      rimLight: "#ffffff",
      accent: "#ffffff",
      runeColor: "#ffffff",
      runeGlow: "#00f5d4",
      eyeGlow: "#ffffff",
      bridleColor: "#e0e6ed",
      bridleTrim: "#ffffff",
      gemColor: "#00f5d4",
      baseGrad1: "#ffe259",
      baseGrad2: "#a67c00",
      baseRing: "#ffffff",
      pedestalGlow: "rgba(255, 215, 0, 0.45)",
      name: "Cavalo de Ouro Real",
      desc: "Ouro maciço polido com incrustações de diamante e runas ciano brilhantes."
    },
    amethyst: {
      bodyGradStart: "#5a189a",
      bodyGradMid: "#240046",
      bodyGradEnd: "#10002b",
      rimLight: "#9d4edd",
      accent: "#f72585",
      runeColor: "#f72585",
      runeGlow: "#7209b7",
      eyeGlow: "#ff007f",
      bridleColor: "#7b2cbf",
      bridleTrim: "#f72585",
      gemColor: "#4cc9f0",
      baseGrad1: "#3c096c",
      baseGrad2: "#10002b",
      baseRing: "#f72585",
      pedestalGlow: "rgba(247, 37, 133, 0.45)",
      name: "Cavalo de Ametista",
      desc: "Cristal cósmico translúcido púrpura com runas de fogo magenta neon."
    },
    emerald: {
      bodyGradStart: "#00b4d8",
      bodyGradMid: "#00796b",
      bodyGradEnd: "#00352c",
      rimLight: "#00f5d4",
      accent: "#52b788",
      runeColor: "#00ffcc",
      runeGlow: "#00f5d4",
      eyeGlow: "#00ffcc",
      bridleColor: "#c1121f",
      bridleTrim: "#52b788",
      gemColor: "#ff4d6d",
      baseGrad1: "#004d40",
      baseGrad2: "#02211b",
      baseRing: "#00ffcc",
      pedestalGlow: "rgba(0, 245, 212, 0.45)",
      name: "Cavalo de Esmeralda",
      desc: "Esmeralda mística pura com runas de marfim encantado e olhos de rubi."
    }
  };

  const c = configs[skinName] || configs.classic;

  return `
  <svg class="rpg-knight-svg" viewBox="0 0 280 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="rune-glow-${skinName}" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3.5" result="blur1" />
        <feGaussianBlur stdDeviation="7" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="pedestal-blur-${skinName}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" />
      </filter>

      <linearGradient id="knight-body-${skinName}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c.bodyGradStart}" />
        <stop offset="45%" stop-color="${c.bodyGradMid}" />
        <stop offset="100%" stop-color="${c.bodyGradEnd}" />
      </linearGradient>

      <linearGradient id="knight-jaw-${skinName}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c.bodyGradStart}" stop-opacity="0.9" />
        <stop offset="100%" stop-color="${c.bodyGradEnd}" />
      </linearGradient>

      <linearGradient id="knight-mane-${skinName}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c.bodyGradStart}" />
        <stop offset="100%" stop-color="${c.bodyGradEnd}" />
      </linearGradient>

      <linearGradient id="pedestal-${skinName}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${c.baseGrad1}" />
        <stop offset="100%" stop-color="${c.baseGrad2}" />
      </linearGradient>

      <radialGradient id="aura-${skinName}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${c.runeGlow}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${c.runeGlow}" stop-opacity="0" />
      </radialGradient>
    </defs>

    <circle cx="140" cy="180" r="110" fill="url(#aura-${skinName})" filter="url(#pedestal-blur-${skinName})" />
    <ellipse cx="140" cy="318" rx="85" ry="14" fill="${c.pedestalGlow}" filter="url(#pedestal-blur-${skinName})" />
    <ellipse cx="140" cy="315" rx="80" ry="18" fill="url(#pedestal-${skinName})" stroke="${c.baseRing}" stroke-width="2" />
    <path d="M60 315 v-10 c0 10 160 10 160 0 v10 c0 10 -160 10 -160 0 Z" fill="${c.baseGrad2}" stroke="${c.baseRing}" stroke-width="1.5" />
    <ellipse cx="140" cy="302" rx="72" ry="14" fill="url(#pedestal-${skinName})" stroke="${c.baseRing}" stroke-width="2.5" />

    <g transform="translate(140, 302) scale(0.9, 0.45)" filter="url(#rune-glow-${skinName})">
      <path d="M0 -30 L5 -5 L30 0 L5 5 L0 30 L-5 5 L-30 0 L-5 -5 Z" fill="${c.runeColor}" />
      <circle cx="0" cy="0" r="16" fill="none" stroke="${c.runeColor}" stroke-width="2.5" stroke-dasharray="4,3" />
      <circle cx="0" cy="0" r="4" fill="${c.gemColor}" />
    </g>

    <g transform="translate(0, 5)">
      <g fill="url(#knight-mane-${skinName})" stroke="${c.rimLight}" stroke-width="1.5">
        <path d="M 108 52 C 90 70 78 98 72 130 C 65 142 55 160 62 175 C 72 168 80 165 84 168 C 76 182 68 200 74 216 C 85 208 94 205 98 210 C 90 228 85 248 94 266 C 105 258 116 256 122 264 L 118 290 L 140 292 Z" />
        <path d="M 112 55 L 94 65 L 116 75 L 96 90 L 120 102 L 95 120 L 122 135 L 94 158 L 122 172 L 98 198 L 126 215 L 105 245 L 132 262 Z" fill="${c.bodyGradEnd}" stroke="${c.rimLight}" stroke-width="1.5" />
      </g>

      <path d="M 112 52 C 125 45 145 42 160 52 C 172 60 178 72 184 92 C 195 104 220 120 226 138 C 229 148 225 158 216 162 C 205 167 195 165 186 160 C 182 178 188 202 198 226 C 208 250 216 272 210 292 C 180 296 100 296 74 290 C 80 262 90 230 96 200 C 102 168 106 130 112 52 Z" 
            fill="url(#knight-body-${skinName})" stroke="${c.rimLight}" stroke-width="2.5" />

      <path d="M 160 52 C 175 62 196 85 212 110 C 224 122 232 136 226 145 C 220 152 208 152 196 142 C 186 134 176 122 168 112 Z" 
            fill="url(#knight-jaw-${skinName})" stroke="${c.rimLight}" stroke-width="2" />

      <ellipse cx="218" cy="140" rx="3.5" ry="2" fill="${c.bodyGradEnd}" stroke="${c.accent}" stroke-width="1" />

      <path d="M 125 46 L 136 15 L 148 40 Z" fill="${c.bodyGradStart}" stroke="${c.rimLight}" stroke-width="2" />
      <path d="M 132 38 L 138 24 L 143 36 Z" fill="${c.runeColor}" opacity="0.6" />

      <path d="M 144 48 C 158 56 168 70 176 86 L 164 88 C 158 76 150 64 140 56 Z" fill="${c.accent}" opacity="0.8" />

      <g filter="url(#rune-glow-${skinName})">
        <ellipse cx="178" cy="88" rx="8" ry="5" fill="${c.eyeGlow}" />
        <ellipse cx="178" cy="88" rx="4" ry="2.5" fill="#ffffff" />
        <line x1="166" y1="88" x2="190" y2="88" stroke="${c.eyeGlow}" stroke-width="1.5" />
      </g>

      <g stroke="${c.bridleColor}" stroke-width="3" fill="none">
        <path d="M 142 42 C 160 65 174 95 186 135" />
        <path d="M 174 95 C 185 110 198 122 216 132" stroke-width="2.5" />
        <path d="M 186 135 C 168 145 152 152 136 156" stroke-width="2.5" />
      </g>
      <g filter="url(#rune-glow-${skinName})">
        <circle cx="186" cy="135" r="7" fill="${c.bridleTrim}" />
        <circle cx="186" cy="135" r="4.5" fill="${c.gemColor}" />
      </g>
      <circle cx="142" cy="42" r="4" fill="${c.bridleTrim}" />

      <g filter="url(#rune-glow-${skinName})" fill="none" stroke="${c.runeColor}" stroke-width="2.8" stroke-linecap="round">
        <path d="M 134 110 L 146 122 M 146 110 L 134 122" />
        <circle cx="140" cy="116" r="1.5" fill="${c.runeColor}" />
        <path d="M 152 180 L 152 208 M 138 194 L 166 194" stroke-width="3" />
        <path d="M 143 185 L 161 203 M 161 185 L 143 203" stroke-width="2" />
        <circle cx="152" cy="194" r="5" fill="none" stroke="${c.runeColor}" stroke-width="2" />
        <circle cx="152" cy="194" r="2.5" fill="${c.gemColor}" />
        <path d="M 168 228 L 180 244 L 172 258" />
        <path d="M 132 232 L 140 248 L 130 262" />
        <path d="M 148 240 L 160 252" />
        <polygon points="120,165 130,150 135,168" stroke-width="1.8" />
        <polygon points="172,168 180,156 186,170" stroke-width="1.8" />
      </g>

      <path d="M 125 48 C 142 56 156 75 168 96 C 178 114 186 142 192 170 C 200 206 206 244 204 286" 
            fill="none" stroke="${c.rimLight}" stroke-width="2" opacity="0.6" />
      <path d="M 116 60 C 122 100 118 150 110 200 C 104 235 96 265 88 288" 
            fill="none" stroke="${c.rimLight}" stroke-width="1.5" opacity="0.4" />
    </g>
  </svg>
  `;
}

function updateKnightShowcase(skinName) {
  const configs = {
    classic: { name: "Cavalo Clássico", desc: "Mármore e obsidiana pura esculpidos com runas douradas arcanas." },
    gold: { name: "Cavalo de Ouro Real", desc: "Ouro maciço polido com incrustações de diamante e runas ciano brilhantes." },
    amethyst: { name: "Cavalo de Ametista", desc: "Cristal cósmico translúcido púrpura com runas de fogo magenta neon." },
    emerald: { name: "Cavalo de Esmeralda", desc: "Esmeralda mística pura com runas de marfim encantado e olhos de rubi." }
  };
  const info = configs[skinName] || configs.classic;

  const homeShowcase = document.getElementById("home-knight-showcase");
  if (homeShowcase) {
    homeShowcase.innerHTML = getKnightSvg(skinName);
  }

  const customPreview = document.getElementById("customize-knight-preview");
  if (customPreview) {
    customPreview.innerHTML = getKnightSvg(skinName);
  }

  const badgeName = document.getElementById("knight-badge-skin-name");
  if (badgeName) badgeName.textContent = info.name;

  const selName = document.getElementById("customize-selected-skin-name");
  if (selName) selName.textContent = info.name;

  const selDesc = document.getElementById("customize-selected-skin-desc");
  if (selDesc) selDesc.textContent = info.desc;

  // Atualiza classes ativas nos cards de customização
  document.querySelectorAll("#customize-skin-grid .custom-card").forEach(card => {
    card.classList.toggle("active", card.dataset.skin === skinName);
  });
}

function setupSkinsSystem() {
  const savedSkin = localStorage.getItem("wizard_chess_skin") || "classic";

  function applyPieceSkin(skinName) {
    try {
      localStorage.setItem("wizard_chess_skin", skinName);
    } catch(e) {}

    // Atualiza visual ativo dos seletores
    updateKnightShowcase(skinName);
    document.querySelectorAll("#menu-skin-group .toggle-btn, #pause-skin-group .toggle-btn")
      .forEach(btn => btn.classList.toggle("active", btn.dataset.skin === skinName));

    if (skinName !== "classic") {
      unlockAchievement("skin_collector");
    }

    if (!window._WIZARD_GAME || !window._WIZARD_GAME.Ft) return;
    const Ft = window._WIZARD_GAME.Ft;

    if (skinName === "gold") {
      // Ouro Real & Prata Imperial
      Ft.marble.color.setHex(0xffd700);
      Ft.marble.roughness = 0.15;
      Ft.marble.metalness = 0.95;
      Ft.marble.emissive.setHex(0x332200);

      Ft.obsidian.color.setHex(0xd4d8dd);
      Ft.obsidian.roughness = 0.15;
      Ft.obsidian.metalness = 0.95;
      Ft.obsidian.emissive.setHex(0x111122);

      Ft.runeWhite.color.setHex(0xffffff);
      Ft.runeWhite.emissive.setHex(0xffffff);
      Ft.runeBlack.color.setHex(0x00f5d4);
      Ft.runeBlack.emissive.setHex(0x00f5d4);
    } else if (skinName === "amethyst") {
      // Cristal de Ametista & Ônix Profundo
      Ft.marble.color.setHex(0x9b5de5);
      Ft.marble.roughness = 0.08;
      Ft.marble.metalness = 0.35;
      Ft.marble.emissive.setHex(0x3c096c);

      Ft.obsidian.color.setHex(0x10002b);
      Ft.obsidian.roughness = 0.2;
      Ft.obsidian.metalness = 0.8;
      Ft.obsidian.emissive.setHex(0x240046);

      Ft.runeWhite.color.setHex(0xf72585);
      Ft.runeWhite.emissive.setHex(0xf72585);
      Ft.runeBlack.color.setHex(0x7209b7);
      Ft.runeBlack.emissive.setHex(0x7209b7);
    } else if (skinName === "emerald") {
      // Esmeralda Arcana & Rubi Infernal
      Ft.marble.color.setHex(0x00f5d4);
      Ft.marble.roughness = 0.1;
      Ft.marble.metalness = 0.4;
      Ft.marble.emissive.setHex(0x004d40);

      Ft.obsidian.color.setHex(0xff0054);
      Ft.obsidian.roughness = 0.15;
      Ft.obsidian.metalness = 0.55;
      Ft.obsidian.emissive.setHex(0x4a001a);

      Ft.runeWhite.color.setHex(0x52b788);
      Ft.runeWhite.emissive.setHex(0x52b788);
      Ft.runeBlack.color.setHex(0xff4d6d);
      Ft.runeBlack.emissive.setHex(0xff4d6d);
    } else {
      // Clássico
      Ft.marble.color.setHex(0xffffff);
      Ft.marble.roughness = 0.25;
      Ft.marble.metalness = 0.1;
      Ft.marble.emissive.setHex(0x000000);

      Ft.obsidian.color.setHex(0x222222);
      Ft.obsidian.roughness = 0.18;
      Ft.obsidian.metalness = 0.45;
      Ft.obsidian.emissive.setHex(0x000000);

      Ft.runeWhite.color.setHex(16106859);
      Ft.runeWhite.emissive.setHex(16106859);
      Ft.runeBlack.color.setHex(11895807);
      Ft.runeBlack.emissive.setHex(10179040);
    }

    Ft.marble.needsUpdate = true;
    Ft.obsidian.needsUpdate = true;
    Ft.runeWhite.needsUpdate = true;
    Ft.runeBlack.needsUpdate = true;

    if (window._WIZARD_GAME.Ds) {
      window._WIZARD_GAME.Ds();
    }
  }

  // Bind skin buttons
  document.querySelectorAll("#menu-skin-group .toggle-btn, #pause-skin-group .toggle-btn").forEach(btn => {
    bindAction(btn, (e) => {
      const skin = btn.dataset.skin;
      applyPieceSkin(skin);
      showToast(`🎨 Skin das peças: ${btn.textContent.trim()}`);
    });
  });

  // Apply saved skin after Three.js initializes
  setTimeout(() => {
    applyPieceSkin(savedSkin);
  }, 1000);
}

// --------------------------------------------------------
// Toast Helper
// --------------------------------------------------------
function showToast(text, duration = 2200) {
  const container = document.getElementById("emote-toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "emote-toast";
  toast.textContent = text;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.parentElement.removeChild(toast);
  }, duration);
}


// Wire up centered modal close buttons
function setupCenteredModalsClose() {
  const btnCloseHistory = document.getElementById("btn-close-history");
  const historyPanel = document.getElementById("history-panel");
  const btnHistoryDock = document.getElementById("btn-history");
  if (btnCloseHistory && historyPanel) {
    bindAction(btnCloseHistory, () => {
      historyPanel.classList.add("hidden");
      if (btnHistoryDock) btnHistoryDock.classList.remove("active");
    });
  }

  const btnCloseEmotes = document.getElementById("btn-close-emotes");
  const emotesPopup = document.getElementById("emotes-popup");
  const btnEmotesDock = document.getElementById("btn-emotes");
  if (btnCloseEmotes && emotesPopup) {
    bindAction(btnCloseEmotes, () => {
      emotesPopup.classList.add("hidden");
      if (btnEmotesDock) btnEmotesDock.classList.remove("active");
    });
  }
}

// --------------------------------------------------------
// 7b. Copiar Registro no Formato Personalizado (Imagem 1)
// --------------------------------------------------------
function setupCustomPGNCopy() {
  const btnCopy = document.getElementById("btn-copy-pgn");
  const btnHistory = document.getElementById("btn-history");
  const domainEl = document.getElementById("history-user-domain");
  const statusEl = document.getElementById("history-game-status");

  function getMatchDetails() {
    let userColor = "Mármore (Brancas)";
    const colorActiveBtn = document.querySelector('#menu-color-group .toggle-btn.active');
    if (colorActiveBtn && colorActiveBtn.dataset.color === 'b') {
      userColor = "Obsidiana (Pretas)";
    } else if (window._WIZARD_GAME && window._WIZARD_GAME.color === 'b') {
      userColor = "Obsidiana (Pretas)";
    }

    let result = "Em andamento";
    const game = window._WIZARD_GAME;
    if (game && game.chess) {
      if (game.chess.isGameOver) {
        if (game.chess.inCheckmate) {
          result = game.chess.turn === 'w' ? 'Obsidiana (Pretas)' : 'Mármore (Brancas)';
        } else {
          result = "Empate";
        }
      }
    }
    return { userColor, result };
  }

  function updateHistorySummary() {
    const { userColor, result } = getMatchDetails();
    if (domainEl) domainEl.textContent = `Seu domínio: ${userColor}`;
    if (statusEl) statusEl.textContent = `Status: ${result}`;
  }

  if (btnHistory) {
    btnHistory.addEventListener("click", () => setTimeout(updateHistorySummary, 50));
  }

  if (btnCopy) {
    btnCopy.textContent = "Copiar Registro";
    btnCopy.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const { userColor, result } = getMatchDetails();

      const listItems = document.querySelectorAll("#history-list li");
      let movesText = "";
      listItems.forEach((li) => {
        const cleanMove = li.innerText.replace(/\s+/g, " ").trim();
        movesText += `${cleanMove}\n`;
      });

      const output = `Wizard's Chess 3D!
Seu domínio: ${userColor}
Vitória de: ${result}
${movesText ? `\n${movesText.trim()}` : ""}`;

      const onSuccess = () => {
        const oldText = btnCopy.textContent;
        btnCopy.textContent = "Registro Copiado!";
        btnCopy.style.background = "#00f5d4";
        btnCopy.style.color = "#000000";
        setTimeout(() => {
          btnCopy.textContent = oldText;
          btnCopy.style.background = "";
          btnCopy.style.color = "";
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output).then(onSuccess).catch(() => {
          fallbackCopy(output, onSuccess);
        });
      } else {
        fallbackCopy(output, onSuccess);
      }
    }, { capture: true });
  }

  function fallbackCopy(text, cb) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      if (cb) cb();
    } catch (e) {
      console.warn("Copy fallback error", e);
    }
  }
}

// --------------------------------------------------------
// 8. Menu Inicial Foto 2: Comece a Batalha, Puzzles Aleatórios e Configurações
// --------------------------------------------------------
function setupStartMenuGrid() {
  // Sincronização rigorosa da visibilidade da Dificuldade da IA
  function syncAiDifficulty() {
    const diffSection = document.getElementById("menu-diff-section");
    if (!diffSection) return;
    const activeModeBtn = document.querySelector("#menu-mode-group .toggle-btn.active");
    const mode = activeModeBtn ? activeModeBtn.dataset.mode : "ai";

    if (mode === "online" || mode === "2p") {
      diffSection.classList.add("hidden");
      diffSection.classList.add("is-hidden");
      diffSection.setAttribute("data-visible", "false");
      diffSection.style.setProperty("display", "none", "important");
    } else {
      diffSection.classList.remove("hidden");
      diffSection.classList.remove("is-hidden");
      diffSection.setAttribute("data-visible", "true");
      diffSection.style.setProperty("display", "flex", "important");
    }
  }

  const startMenu = document.getElementById("start-menu");
  const btnHeroBattle = document.getElementById("btn-hero-battle");
  const btnCardChallenges = document.getElementById("btn-card-challenges");
  const btnCardTutorial = document.getElementById("btn-card-tutorial");
  const modalAch = document.getElementById("achievements-modal");
  const btnStart = document.getElementById("btn-start-game");

  // Nav Items
  const btnNavCustomize = document.getElementById("btn-nav-customize");
  const btnNavHome = document.getElementById("btn-nav-home");
  const btnNavChallenges = document.getElementById("btn-nav-challenges");
  const btnNavAch = document.getElementById("btn-nav-achievements");
  const btnNavSettings = document.getElementById("btn-nav-settings");

  // Top Buttons
  const btnTopSettings = document.getElementById("btn-top-settings");
  const btnTopProfile = document.getElementById("btn-top-profile");
  const btnKnightBadge = document.getElementById("btn-knight-badge-custom");

  // Back Buttons
  const btnBattleBack = document.getElementById("btn-battle-back");
  const btnCustomizeBack = document.getElementById("btn-customize-back");
  const btnCustomizeApply = document.getElementById("btn-customize-apply");
  const btnChallengesBack = document.getElementById("btn-challenges-back");
  const btnSettingsBack = document.getElementById("btn-settings-back");
  const btnSettingsClose = document.getElementById("btn-settings-close-view");
  const btnTutorialBack = document.getElementById("btn-tutorial-back");

  // Subview Switcher
  function switchSubView(viewName) {
    document.querySelectorAll(".menu-subview").forEach(v => {
      v.classList.remove("active");
      v.style.setProperty("display", "none", "important");
    });
    const target = document.getElementById('menu-view-' + viewName);
    if (!target) {
      console.warn('[WizardChess] Subview não encontrada: ' + viewName);
      const fallback = document.getElementById('menu-view-home');
      if (fallback) {
        fallback.classList.add('active');
        fallback.style.setProperty('display', 'flex', 'important');
      }
      return;
    }
    target.classList.add("active");
    target.style.setProperty("display", "flex", "important");
    if (viewName === "battle") syncAiDifficulty();

    // Atualiza aba ativa na barra de navegação inferior
    document.querySelectorAll(".rpg-bottom-nav .rpg-nav-item").forEach(btn => btn.classList.remove("active"));
    if (viewName === "home" && btnNavHome) btnNavHome.classList.add("active");
    if (viewName === "customize" && btnNavCustomize) btnNavCustomize.classList.add("active");
    if (viewName === "challenges" && btnNavChallenges) btnNavChallenges.classList.add("active");

    const modalContent = document.querySelector("#start-menu .modal-content");
    if (modalContent) modalContent.scrollTop = 0;
  }

  // 1. Card Laranja: Comece a Batalha -> Abre Preparação da Batalha
  if (btnHeroBattle) {
    bindAction(btnHeroBattle, () => {
      switchSubView("battle");
    });
  }

  // 2. Card Rosa: Aba dos Desafios -> Abre View de Desafios
  if (btnCardChallenges) {
    bindAction(btnCardChallenges, () => {
      switchSubView("challenges");
    });
  }

  // 3. Card Tutorial -> Abre View de Tutorial
  if (btnCardTutorial) {
    bindAction(btnCardTutorial, () => {
      switchSubView("tutorial");
    });
  }

  // 4. Barra de Navegação Inferior
  if (btnNavCustomize) {
    bindAction(btnNavCustomize, () => {
      switchSubView("customize");
    });
  }
  if (btnNavHome) {
    bindAction(btnNavHome, () => {
      switchSubView("home");
    });
  }
  if (btnNavChallenges) {
    bindAction(btnNavChallenges, () => {
      switchSubView("challenges");
    });
  }
  if (btnNavAch && modalAch) {
    bindAction(btnNavAch, () => {
      renderAchievementsList();
      modalAch.classList.remove("hidden");
    });
  }
  if (btnNavSettings) {
    bindAction(btnNavSettings, () => {
      switchSubView("settings");
      updateSettingsUI();
    });
  }

  // 5. Botões do Topo e do Cavalo
  if (btnTopSettings) {
    bindAction(btnTopSettings, () => {
      switchSubView("settings");
      updateSettingsUI();
    });
  }
  if (btnTopProfile) {
    bindAction(btnTopProfile, () => {
      switchSubView("customize");
    });
  }
  const homeKnightCol = document.getElementById("home-knight-col");
  const homeKnightShowcase = document.getElementById("home-knight-showcase");
  const openCustomize = () => {
    switchSubView("customize");
  };

  if (homeKnightCol) bindAction(homeKnightCol, openCustomize, "openCustomizeKnightCol");
  if (homeKnightShowcase) bindAction(homeKnightShowcase, openCustomize, "openCustomizeKnightSvg");
  if (btnKnightBadge) bindAction(btnKnightBadge, openCustomize, "openCustomizeKnightBadge");

  // 6. Botões Voltar
  if (btnCustomizeBack) bindAction(btnCustomizeBack, () => switchSubView("home"));
  if (btnCustomizeApply) bindAction(btnCustomizeApply, () => switchSubView("home"));
  if (btnChallengesBack) bindAction(btnChallengesBack, () => switchSubView("home"));
  if (btnBattleBack) bindAction(btnBattleBack, () => switchSubView("home"));
  if (btnSettingsBack) bindAction(btnSettingsBack, () => switchSubView("home"));
  if (btnSettingsClose) bindAction(btnSettingsClose, () => switchSubView("home"));
  if (btnTutorialBack) bindAction(btnTutorialBack, () => switchSubView("home"));

  // 7. Seleção de Peças na Aba Personalizar
  document.querySelectorAll("#customize-skin-grid .custom-card[data-skin]").forEach(card => {
    bindAction(card, () => {
      const skin = card.dataset.skin;
      // Aplica via sistema de skins
      const skinBtn = document.querySelector('#menu-skin-group .toggle-btn[data-skin="' + skin + '"]');
      if (skinBtn) {
        skinBtn.click();
      } else {
        const savedSkin = localStorage.getItem("wizard_chess_skin") || "classic";
        updateKnightShowcase(skin);
      }
      showToast("🎨 Modelo do Cavalo: " + (card.querySelector(".custom-card-name")?.textContent || skin));
    });
  });

  // 8. Seleção de Tabuleiro na Aba Personalizar
  document.querySelectorAll("#customize-arena-grid .custom-card[data-arena]").forEach(card => {
    bindAction(card, () => {
      const arena = card.dataset.arena;
      document.querySelectorAll("#customize-arena-grid .custom-card").forEach(c => c.classList.toggle("active", c === card));
      const arenaBtn = document.querySelector('#menu-arena-group .toggle-btn[data-arena="' + arena + '"]');
      if (arenaBtn) arenaBtn.click();
      showToast("🏰 Tabuleiro: " + (card.querySelector(".custom-card-name")?.textContent || arena));
    });
  });

  // 9. Lançar Desafios na Aba de Desafios
  const launchPuzzleGame = () => {
    const puzzleTrigger = document.querySelector('#menu-mode-group .toggle-btn[data-mode="puzzle"]') ||
                          document.querySelector('#menu-mode-group-hidden .toggle-btn[data-mode="puzzle"]');
    if (puzzleTrigger) puzzleTrigger.click();
    if (btnStart) btnStart.click();
    showToast("🧩 Desafio Arcano iniciado!");
  };

  const btnRandomPuzzle = document.getElementById("btn-launch-random-puzzle");
  if (btnRandomPuzzle) {
    bindAction(btnRandomPuzzle, launchPuzzleGame);
  }
  document.querySelectorAll(".challenge-play-btn").forEach(btn => {
    bindAction(btn, launchPuzzleGame);
  });

  // Inicializa o Cavalo em Destaque com a skin salva
  
  // Monitorar seleção de Modo de Batalha (Oculta dificuldade da IA quando Online ou 2 Jogadores)
  document.querySelectorAll("#menu-mode-group .toggle-btn").forEach(btn => {
    const updateModeSelection = () => {
      document.querySelectorAll("#menu-mode-group .toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      syncAiDifficulty();
      const m = btn.dataset.mode;
      const r = document.getElementById("btn-mode");
      if (r) {
        const lbl = r.querySelector(".btn-label");
        if (lbl) lbl.textContent = m === "online" ? "Online" : m === "2p" ? "2 Jogadores" : "vs IA";
      }
    };
    btn.addEventListener("click", updateModeSelection);
    btn.addEventListener("touchend", updateModeSelection, { passive: true });
  });

  // Monitorar seleção do Relógio da Catedral (5 Ritmos: Livre, 1m Bala, 3m Blitz, 5m Rápida, 10m Clássica)
  document.querySelectorAll("#menu-time-group .toggle-btn").forEach(btn => {
    bindAction(btn, () => {
      document.querySelectorAll("#menu-time-group .toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const seconds = parseInt(btn.dataset.time, 10) || 0;
      try { localStorage.setItem("wizard_chess_time", seconds); } catch(e) {}
      showToast("⏱️ Relógio: " + btn.textContent.trim());
    }, "timeToggle_" + btn.dataset.time);
  });

  // Monitorar seleção da Dinâmica de Jogo (Clássico, Arcano com Feitiços, Morte Súbita)
  document.querySelectorAll("#menu-dynamic-group .toggle-btn").forEach(btn => {
    bindAction(btn, () => {
      document.querySelectorAll("#menu-dynamic-group .toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const dyn = btn.dataset.dynamic || "classic";
      try { localStorage.setItem("wizard_chess_dynamic", dyn); } catch(e) {}
      if (dyn === "arcane") {
        showToast("🔮 Modo Arcano: Feitiços, Oráculo e Visão Cósmica ativados!");
      } else if (dyn === "sudden") {
        showToast("⚡ Modo Morte Súbita: Tensão máxima e lances decisivos!");
      } else {
        showToast("♟️ Xadrez Clássico FIDE selecionado.");
      }
    }, "dynamicToggle_" + btn.dataset.dynamic);
  });

  // Sincroniza estado inicial da dificuldade da IA
  syncAiDifficulty();
  switchSubView("home"); // Garante subview inicial limpa

  const currentSkin = localStorage.getItem("wizard_chess_skin") || "classic";
  updateKnightShowcase(currentSkin);

  // Sincroniza arena ativa na personalização
  const savedArena = localStorage.getItem("wizard_chess_arena") || "cathedral";
  document.querySelectorAll("#customize-arena-grid .custom-card").forEach(c => {
    c.classList.toggle("active", c.dataset.arena === savedArena);
  });

  // Subview Tutorial Internals
  document.querySelectorAll(".tutorial-tab-btn").forEach(btn => {
    bindAction(btn, () => {
      document.querySelectorAll(".tutorial-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tutorial-tab-pane").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const tabKey = btn.getAttribute("data-tab");
      const targetPane = document.getElementById("tut-pane-" + tabKey);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Configurações: Alternar Som e Música
  const btnSound = document.getElementById("btn-toggle-sound-setting");
  const iconSound = document.getElementById("icon-sound-status");
  if (btnSound) {
    bindAction(btnSound, () => {
      if (window._WIZARD_GAME && window._WIZARD_GAME.Ie) {
        window._WIZARD_GAME.Ie.enabled = !window._WIZARD_GAME.Ie.enabled;
        const isEnabled = window._WIZARD_GAME.Ie.enabled;
        btnSound.classList.toggle("active", isEnabled);
        btnSound.querySelector("span").textContent = isEnabled ? "Ativado" : "Mudo";
        if (iconSound) iconSound.textContent = isEnabled ? "volume_up" : "volume_off";
        showToast(isEnabled ? "🔊 Sons ativados" : "🔇 Sons desativados");
      }
    });
  }

  const btnMusic = document.getElementById("btn-toggle-music-setting");
  const iconMusic = document.getElementById("icon-music-status");
  if (btnMusic) {
    bindAction(btnMusic, () => {
      if (window._WIZARD_GAME && window._WIZARD_GAME.toggleMusic) {
        const isPlaying = window._WIZARD_GAME.toggleMusic();
        btnMusic.classList.toggle("active", isPlaying);
        btnMusic.querySelector("span").textContent = isPlaying ? "Tocando" : "Pausada";
        if (iconMusic) iconMusic.textContent = isPlaying ? "music_note" : "music_off";
        showToast(isPlaying ? "🎶 Música Arcana iniciada" : "🔇 Música pausada");
        if (isPlaying) unlockAchievement("music_lover");
      }
    });
  }

  function updateSettingsUI() {
    if (window._WIZARD_GAME && window._WIZARD_GAME.Ie) {
      const isSound = window._WIZARD_GAME.Ie.enabled !== false;
      if (btnSound) {
        btnSound.classList.toggle("active", isSound);
        btnSound.querySelector("span").textContent = isSound ? "Ativado" : "Mudo";
      }
      if (iconSound) iconSound.textContent = isSound ? "volume_up" : "volume_off";
    }
  }

  const syncStatsMirror = () => {
    const w = document.getElementById("stat-wins")?.textContent || "0";
    const d = document.getElementById("stat-draws")?.textContent || "0";
    const l = document.getElementById("stat-losses")?.textContent || "0";
    document.querySelectorAll(".stat-wins-mirror").forEach(el => el.textContent = w);
    document.querySelectorAll(".stat-draws-mirror").forEach(el => el.textContent = d);
    document.querySelectorAll(".stat-losses-mirror").forEach(el => el.textContent = l);
  };
  setTimeout(syncStatsMirror, 200);

  if (btnStart) {
    bindAction(btnStart, (e) => {
      if (e && e.type === "touchend") {
        btnStart.click();
      }
    });
  }

  document.querySelectorAll(".photo2-toggle-group .toggle-btn").forEach(btn => {
    bindAction(btn, (e) => {
      if (e && e.type === "touchend") {
        btn.click();
      }
    });
  });



  // --------------------------------------------------------
  // Modo de Desafios Diários (Daily Challenge)
  // --------------------------------------------------------
  function setupDailyChallenges() {
    const today = new Date();
    const dateStr = today.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
    const dateKey = 'daily_puzzle_' + today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
    const isCompleted = localStorage.getItem(dateKey) === "completed";

    const dateEl = document.getElementById("daily-challenge-date");
    if (dateEl) dateEl.textContent = 'DESAFIO DE HOJE • ' + dateStr.toUpperCase();

    const statusEl = document.getElementById("daily-challenge-status");
    const statusText = document.getElementById("daily-status-text");
    const btnPlayDaily = document.getElementById("btn-play-daily-challenge");

    if (isCompleted) {
      if (statusText) statusText.textContent = "Concluído Hoje ✓ (+100 XP obtido)";
      if (statusEl) statusEl.style.color = "#ffd700";
      if (btnPlayDaily) {
        const label = btnPlayDaily.querySelector("span:first-child");
        if (label) label.textContent = "Jogar Novamente";
      }
    }

    if (btnPlayDaily) {
      bindAction(btnPlayDaily, () => {
        // Dispara o motor de quebra-cabeça
        const arenas = ["cathedral", "inferno", "frost"];
        const randArena = arenas[Math.floor(Math.random() * arenas.length)];
        const arenaBtn = document.querySelector('#menu-arena-group .toggle-btn[data-arena="' + randArena + '"]');
        if (arenaBtn) arenaBtn.click();

        const puzzleTrigger = document.querySelector('#menu-mode-group .toggle-btn[data-mode="puzzle"]') || document.querySelector('#menu-mode-group-hidden .toggle-btn[data-mode="puzzle"]');
        if (puzzleTrigger) puzzleTrigger.click();
        if (btnStart) btnStart.click();

        try {
          localStorage.setItem(dateKey, "completed");
          if (typeof addXP === "function") {
            addXP(100, "Desafio Diário Concluído");
          }
        } catch(e) {}

        showToast("⭐ Desafio Diário Arcano iniciado! (+100 XP)");
      });
    }

    const btnChFooterBack = document.getElementById("btn-challenges-footer-back");
    if (btnChFooterBack) {
      bindAction(btnChFooterBack, () => switchSubView("home"));
    }
  }

  setupDailyChallenges();

}

// --------------------------------------------------------
// 9. Controlador do Banner de Tutorial Interativo Durante a Partida
// --------------------------------------------------------
const TUTORIAL_STEPS = [
  {
    step: "PASSO 1 DE 5",
    text: "🧙 <strong>Abertura Arcana:</strong> Toque no seu Peão à frente do Rei (casa e2) e avance 2 casas para o centro. As runas mágicas no chão mostram os destinos válidos!"
  },
  {
    step: "PASSO 2 DE 5",
    text: "🐎 <strong>Salto dos Cavalos:</strong> Mova seu Cavalo para dominar o centro (f3 ou c3). Ele é a única peça que salta sobre as outras no tabuleiro de pedra em formato de 'L'!"
  },
  {
    step: "PASSO 3 DE 5",
    text: "⚡ <strong>Bispos e Ataque Diagonais:</strong> Deslize seu Bispo para as diagonais abertas (c4 ou b5). Ele alcança o campo inimigo com magia de longo alcance!"
  },
  {
    step: "PASSO 4 DE 5",
    text: "🔮 <strong>Iluminação do Oráculo:</strong> Em dúvida sobre o melhor lance? Toque em 'Dica do Oráculo' abaixo para o motor calcular e iluminar a melhor jogada na pedra!"
  },
  {
    step: "PASSO 5 DE 5",
    text: "👑 <strong>O Xeque-Mate Final:</strong> Encurrale o Rei adversário atacando-o sem dar rota de fuga para conquistar a vitória da Catedral!"
  }
];

let currentTutorialStep = 0;

function initTutorialBannerHUD() {
  const banner = document.getElementById("tutorial-guide-banner");
  if (!banner) return;

  banner.classList.remove("hidden");
  currentTutorialStep = 0;
  updateTutorialStepUI();

  const btnPrev = document.getElementById("btn-tut-prev");
  const btnNext = document.getElementById("btn-tut-next");
  const btnOracle = document.getElementById("btn-tut-oracle");
  const btnClose = document.getElementById("btn-close-tutorial-guide");

  if (btnPrev) {
    bindAction(btnPrev, () => {
      if (currentTutorialStep > 0) {
        currentTutorialStep--;
        updateTutorialStepUI();
      }
    });
  }

  if (btnNext) {
    bindAction(btnNext, () => {
      if (currentTutorialStep < TUTORIAL_STEPS.length - 1) {
        currentTutorialStep++;
        updateTutorialStepUI();
      } else {
        banner.classList.add("hidden");
        showToast("🎓 Parabéns! Você concluiu os fundamentos arcanos.");
      }
    });
  }

  if (btnOracle) {
    bindAction(btnOracle, () => {
      const btnHint = document.getElementById("btn-hint");
      if (btnHint) btnHint.click();
    });
  }

  if (btnClose) {
    bindAction(btnClose, () => {
      banner.classList.add("hidden");
    });
  }
}

function updateTutorialStepUI() {
  const stepNum = document.getElementById("tut-guide-step-num");
  const stepText = document.getElementById("tut-guide-instruction");
  const btnPrev = document.getElementById("btn-tut-prev");
  const btnNext = document.getElementById("btn-tut-next");

  const data = TUTORIAL_STEPS[currentTutorialStep];
  if (!data) return;

  if (stepNum) stepNum.textContent = data.step;
  if (stepText) stepText.innerHTML = data.text;
  if (btnPrev) btnPrev.disabled = currentTutorialStep === 0;
  if (btnNext) {
    const isLast = currentTutorialStep === TUTORIAL_STEPS.length - 1;
    const labelSpan = btnNext.querySelector("span:first-child");
    if (labelSpan) labelSpan.textContent = isLast ? "Concluir" : "Próximo";
  }
}

// ========================================================
// Inicialização Segura (Após todas as constantes e funções)
// ========================================================
let _wizardAppInitialized = false;
function startWizardApp() {
  if (_wizardAppInitialized) return;
  _wizardAppInitialized = true;
  try {
    initWizardFeatures();
  } catch (err) {
    console.error("[WizardChess] Erro no startWizardApp:", err);
  }
}

// Execução segura garantida uma única vez
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startWizardApp);
} else {
  startWizardApp();
}
window.addEventListener("load", startWizardApp);

// --------------------------------------------------------
// 11. Profile System: Customize Name, Avatar & View Achievements
// --------------------------------------------------------
function setupProfileSystem() {
  const profileModal = document.getElementById("profile-modal");
  const btnTopProfile = document.getElementById("btn-top-profile");
  const btnCloseProfile = document.getElementById("btn-close-profile-modal");
  const btnProfileAch = document.getElementById("btn-profile-open-achievements");
  const nameInput = document.getElementById("profile-name-input");
  const btnSaveName = document.getElementById("btn-save-profile-name");
  const previewAvatar = document.getElementById("profile-avatar-preview");
  const previewName = document.getElementById("profile-name-display");
  const topAvatar = document.getElementById("top-player-avatar");
  const hudAvatar = document.getElementById("player-avatar-hud");
  const hudName = document.getElementById("player-name-hud");

  let currentName = localStorage.getItem("wizard_chess_player_name") || "Mago";
  let currentAvatar = localStorage.getItem("wizard_chess_player_avatar") || "🧙‍♂️";

  function applyProfileUI() {
    if (nameInput) nameInput.value = currentName;
    if (previewName) previewName.textContent = currentName;
    if (previewAvatar) previewAvatar.textContent = currentAvatar;
    if (topAvatar) topAvatar.textContent = currentAvatar;
    if (hudAvatar) hudAvatar.textContent = currentAvatar;
    if (hudName) hudName.textContent = currentName + " (Você)";

    document.querySelectorAll(".avatar-option").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.avatar === currentAvatar);
    });

    const setAvatar = document.getElementById("settings-player-avatar");
    const setName = document.getElementById("settings-player-name");
    if (setAvatar) setAvatar.textContent = currentAvatar;
    if (setName) setName.textContent = currentName;
  }

  applyProfileUI();

  // Abrir Modal de Perfil ao clicar no perfil do topo
  if (btnTopProfile && profileModal) {
    bindAction(btnTopProfile, () => {
      applyProfileUI();
      profileModal.classList.remove("hidden");
    }, "openProfileModalFromTop");
  }

  // Também permitir abrir pelo resumo nas configurações
  const btnSettingsToProfile = document.getElementById("btn-settings-to-profile");
  if (btnSettingsToProfile && profileModal) {
    bindAction(btnSettingsToProfile, () => {
      applyProfileUI();
      profileModal.classList.remove("hidden");
    }, "openProfileModalFromSettings");
  }

  // Selecionar Avatar
  document.querySelectorAll(".avatar-option").forEach(btn => {
    bindAction(btn, () => {
      currentAvatar = btn.dataset.avatar || "🧙‍♂️";
      try { localStorage.setItem("wizard_chess_player_avatar", currentAvatar); } catch(e) {}
      applyProfileUI();
      showToast("✨ Foto de perfil atualizada: " + currentAvatar);
    });
  });

  // Salvar Nome
  function savePlayerName() {
    if (!nameInput) return;
    const val = nameInput.value.trim();
    if (val) {
      currentName = val;
      try { localStorage.setItem("wizard_chess_player_name", currentName); } catch(e) {}
      applyProfileUI();
      showToast("✨ Nome salvo: " + currentName);
    }
  }

  if (btnSaveName) {
    bindAction(btnSaveName, savePlayerName, "saveProfileName");
  }
  if (nameInput) {
    nameInput.addEventListener("change", savePlayerName);
  }

  // Botão Conquistas dentro do Perfil
  if (btnProfileAch) {
    bindAction(btnProfileAch, () => {
      if (profileModal) profileModal.classList.add("hidden");
      const modalAch = document.getElementById("achievements-modal");
      if (modalAch) {
        if (typeof renderAchievementsList === "function") renderAchievementsList();
        modalAch.classList.remove("hidden");
      }
    }, "openAchFromProfile");
  }

  // Fechar Modal de Perfil
  if (btnCloseProfile && profileModal) {
    bindAction(btnCloseProfile, () => {
      savePlayerName();
      profileModal.classList.add("hidden");
    }, "closeProfileModal");
  }

  // Toggles de Configurações Adicionais (Aproveitamento de Tela)
  const btnToggleParticles = document.getElementById("btn-toggle-particles-setting");
  if (btnToggleParticles) {
    let pActive = localStorage.getItem("wizard_chess_particles") !== "false";
    btnToggleParticles.querySelector("span").textContent = pActive ? "Ativado" : "Reduzido";
    btnToggleParticles.classList.toggle("active", pActive);
    bindAction(btnToggleParticles, () => {
      pActive = !pActive;
      try { localStorage.setItem("wizard_chess_particles", pActive ? "true" : "false"); } catch(e) {}
      btnToggleParticles.querySelector("span").textContent = pActive ? "Ativado" : "Reduzido";
      btnToggleParticles.classList.toggle("active", pActive);
      showToast(pActive ? "✨ Partículas mágicas ativadas" : "⚡ Partículas reduzidas");
    }, "toggleParticles");
  }

  const btnToggleHints = document.getElementById("btn-toggle-hints-setting");
  if (btnToggleHints) {
    let hActive = localStorage.getItem("wizard_chess_hints") !== "false";
    btnToggleHints.querySelector("span").textContent = hActive ? "Ativado" : "Desativado";
    btnToggleHints.classList.toggle("active", hActive);
    bindAction(btnToggleHints, () => {
      hActive = !hActive;
      try { localStorage.setItem("wizard_chess_hints", hActive ? "true" : "false"); } catch(e) {}
      btnToggleHints.querySelector("span").textContent = hActive ? "Ativado" : "Desativado";
      btnToggleHints.classList.toggle("active", hActive);
      showToast(hActive ? "🎯 Destaque de casas ativado" : "🎯 Destaque desativado");
    }, "toggleHints");
  }

  const btnSettingsShare = document.getElementById("btn-settings-share-whatsapp");
  if (btnSettingsShare) {
    bindAction(btnSettingsShare, () => {
      const btnWA = document.getElementById("btn-whatsapp-share");
      if (btnWA) {
        btnWA.click();
      } else {
        const msg = "⚔️ Venha jogar o Xadrez de Bruxo 3D comigo! Acesse: " + window.location.href;
        window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(msg), "_blank");
      }
    }, "settingsShareWA");
  }
}


// =========================================================================
// DINÂMICAS DE XADREZ ADICIONAIS & ALERTAS MÍSTICOS
// =========================================================================
function setupChessDynamics() {
  const checkWarning = document.getElementById("check-warning");
  if (checkWarning) {
    let lastNotifiedTime = 0;
    const observer = new MutationObserver(() => {
      const isVisible = !checkWarning.classList.contains("hidden") && checkWarning.style.display !== "none";
      const now = Date.now();
      if (isVisible && now - lastNotifiedTime > 4000) {
        lastNotifiedTime = now;
        const dyn = localStorage.getItem("wizard_chess_dynamic") || "classic";
        if (dyn === "arcane") {
          showToast("👑 XEQUE REAL! O Monarca invoca proteção cósmica!", 3000);
        } else {
          showToast("👑 XEQUE! Proteja seu Monarca!", 2500);
        }
      }
    });
    observer.observe(checkWarning, { attributes: true, attributeFilter: ["class", "style"] });
  }

  // Interação especial do Oráculo Arcano
  const btnHint = document.getElementById("btn-hint");
  if (btnHint) {
    btnHint.addEventListener("click", () => {
      const dyn = localStorage.getItem("wizard_chess_dynamic") || "classic";
      if (dyn === "arcane") {
        showToast("🔮 Oráculo Arcano: Revelando as correntes místicas do tabuleiro!", 2500);
      }
    });
  }
}


// =========================================================================
// SISTEMA DE TELA CHEIA E ADAPTAÇÃO DINÂMICA PARA TODOS OS DISPOSITIVOS
// =========================================================================
function setupAdaptiveFullscreenAndLayout() {
  let isUpdating = false;
  function updateDeviceAdaptation() {
    if (isUpdating) return;
    isUpdating = true;
    try {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
      document.documentElement.style.setProperty('--app-width', `${window.innerWidth}px`);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspect = width / height;

      const b = document.body;
      if (b) {
        b.classList.toggle('is-landscape', aspect >= 1);
        b.classList.toggle('is-portrait', aspect < 1);
        b.classList.toggle('is-ultra-tall', aspect < 0.48);
        b.classList.toggle('is-compact-phone', width <= 360 || height <= 640);
        b.classList.toggle('is-tablet', width >= 601 && width <= 1024);
        b.classList.toggle('is-desktop', width > 1024);
      }
    } finally {
      isUpdating = false;
    }
  }

  window.addEventListener('resize', updateDeviceAdaptation, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(updateDeviceAdaptation, 80);
    setTimeout(updateDeviceAdaptation, 250);
  });
  updateDeviceAdaptation();

  // Sincroniza botão de tela cheia do dock
  const btnFs = document.getElementById('btn-fullscreen');
  if (btnFs) {
    const updateFsIcon = () => {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      const icon = btnFs.querySelector('.material-symbols-rounded');
      const label = btnFs.querySelector('.btn-label');
      if (icon) icon.textContent = isFs ? 'fullscreen_exit' : 'fullscreen';
      if (label) label.textContent = isFs ? 'Normal' : 'Tela Cheia';
    };
    document.addEventListener('fullscreenchange', updateFsIcon);
    document.addEventListener('webkitfullscreenchange', updateFsIcon);
    updateFsIcon();
  }
}
