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
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastTrigger < 250) return;
    lastTrigger = now;
    try {
      handler(e);
    } catch (err) {
      console.error("[WizardChess] Erro ao executar ação:", err);
    }
  };

  el.addEventListener("click", trigger);
  el.addEventListener("touchend", trigger, { passive: true });
}

function initWizardFeatures() {
  const tasks = [
    { name: "StartMenuGrid", fn: setupStartMenuGrid },
    { name: "CenteredModalsClose", fn: setupCenteredModalsClose },
    { name: "ProgressionAndAchievements", fn: setupProgressionAndAchievements },
    { name: "SkinsSystem", fn: setupSkinsSystem },
    { name: "MusicControls", fn: setupMusicControls },
    { name: "BackButtonIntegration", fn: setupBackButtonIntegration },
    { name: "UndoFeature", fn: setupUndoFeature },
    { name: "CustomPGNCopy", fn: setupCustomPGNCopy },
    { name: "WhatsAppShare", fn: setupWhatsAppShare },
    { name: "MoveAnalysis", fn: setupMoveAnalysis }
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
function setupSkinsSystem() {
  const savedSkin = localStorage.getItem("wizard_chess_skin") || "classic";

  function applyPieceSkin(skinName) {
    try {
      localStorage.setItem("wizard_chess_skin", skinName);
    } catch(e) {}

    // Atualiza visual ativo dos seletores
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
  const startMenu = document.getElementById("start-menu");
  const btnHeroBattle = document.getElementById("btn-hero-battle");
  const btnCardPuzzle = document.getElementById("btn-card-puzzle");
  const btnAchCard = document.getElementById("btn-menu-achievements");
  const btnSettingsCard = document.getElementById("btn-menu-settings");
  const btnBattleBack = document.getElementById("btn-battle-back");
  const btnSettingsBack = document.getElementById("btn-settings-back");
  const btnSettingsClose = document.getElementById("btn-settings-close-view");
  const modalAch = document.getElementById("achievements-modal");
  const btnStart = document.getElementById("btn-start-game");

  // Subview Switcher
  function switchSubView(viewName) {
    document.querySelectorAll(".menu-subview").forEach(v => v.classList.remove("active"));
    const target = document.getElementById('menu-view-' + viewName);
    if (target) {
      target.classList.add("active");
    }
    const modalContent = document.querySelector("#start-menu .modal-content");
    if (modalContent) modalContent.scrollTop = 0;
  }

  // 1. Hero Card: "Comece a Batalha" -> Abre Preparação da Batalha (Foto 2)
  if (btnHeroBattle) {
    bindAction(btnHeroBattle, () => {
      switchSubView("battle");
    });
  }

  // 2. Quebra-cabeças Card: Inicia direto com Arena e Skin Aleatórias!
  if (btnCardPuzzle) {
    bindAction(btnCardPuzzle, () => {
      // Estilos e Skins no Aleatório
      const arenas = ["cathedral", "inferno", "frost"];
      const skins = ["classic", "gold", "amethyst", "emerald"];
      const randArena = arenas[Math.floor(Math.random() * arenas.length)];
      const randSkin = skins[Math.floor(Math.random() * skins.length)];

      const arenaBtn = document.querySelector('#menu-arena-group .toggle-btn[data-arena="' + randArena + '"]');
      if (arenaBtn) arenaBtn.click();

      const skinBtn = document.querySelector('#menu-skin-group .toggle-btn[data-skin="' + randSkin + '"]');
      if (skinBtn) skinBtn.click();

      // Modo Puzzle via trigger oculto
      const puzzleTrigger = document.querySelector('#menu-mode-group-hidden .toggle-btn[data-mode="puzzle"]');
      if (puzzleTrigger) {
        puzzleTrigger.click();
      }

      // Inicia direto a partida de desafios
      if (btnStart) {
        btnStart.click();
      }

      showToast("🧩 Desafio iniciado! Arena e Skin aleatórias.");
    });
  }

  // 3. Conquistas Card -> Abre Modal de Conquistas
  if (btnAchCard && modalAch) {
    bindAction(btnAchCard, () => {
      renderAchievementsList();
      modalAch.classList.remove("hidden");
    });
  }

  // 4. Configurações Card -> Abre View de Configurações
  if (btnSettingsCard) {
    bindAction(btnSettingsCard, () => {
      switchSubView("settings");
      updateSettingsUI();
    });
  }

  // 5. Tutorial Card & Settings Shortcut -> Abre View de Tutorial
  const btnCardTutorial = document.getElementById("btn-card-tutorial");
  const btnTutorialBack = document.getElementById("btn-tutorial-back");
  const btnOpenTutSetting = document.getElementById("btn-open-tutorial-setting");
  const btnStartTutMode = document.getElementById("btn-start-tutorial-mode");

  if (btnCardTutorial) {
    bindAction(btnCardTutorial, () => {
      switchSubView("tutorial");
    });
  }
  if (btnOpenTutSetting) {
    bindAction(btnOpenTutSetting, () => {
      switchSubView("tutorial");
    });
  }
  if (btnTutorialBack) {
    bindAction(btnTutorialBack, () => {
      switchSubView("home");
    });
  }

  // Abas internas do Tutorial (Peças, Magias, Xeque-Mate)
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

  // Iniciar Partida Guiada de Tutorial
  function launchGuidedTutorialMatch() {
    // Define modo vs IA Fácil, Mármore, Livre
    const aiBtn = document.querySelector('#menu-mode-group .toggle-btn[data-mode="ai"]');
    if (aiBtn) aiBtn.click();
    const easyBtn = document.querySelector('#menu-diff-group .toggle-btn[data-diff="1"]');
    if (easyBtn) easyBtn.click();
    const timeFreeBtn = document.querySelector('#menu-time-group .toggle-btn[data-time="0"]');
    if (timeFreeBtn) timeFreeBtn.click();
    const whiteColorBtn = document.querySelector('#menu-color-group .toggle-btn[data-color="w"]');
    if (whiteColorBtn) whiteColorBtn.click();

    // Inicia a partida na Catedral
    if (btnStart) btnStart.click();

    // Ativa banner flutuante do tutorial na partida
    initTutorialBannerHUD();
    unlockAchievement("tutorial_master");
    showToast("🎓 Modo Tutorial ativado! Siga o Guia.");
  }

  if (btnStartTutMode) {
    bindAction(btnStartTutMode, () => {
      launchGuidedTutorialMatch();
    });
  }

  // Opção 'Tutorial' no seletor de modo da Preparação de Batalha
  document.querySelectorAll("#menu-mode-group .toggle-btn[data-mode='tutorial']").forEach(btn => {
    bindAction(btn, () => {
      switchSubView("tutorial");
    });
  });

  // Botões Voltar
  if (btnBattleBack) {
    bindAction(btnBattleBack, () => {
      switchSubView("home");
    });
  }
  if (btnSettingsBack) {
    bindAction(btnSettingsBack, () => {
      switchSubView("home");
    });
  }
  if (btnSettingsClose) {
    bindAction(btnSettingsClose, () => {
      switchSubView("home");
    });
  }

  // Ao reabrir pelo HUD ou pelo Menu de Pausa, reseta para a Home e esconde banner do tutorial se pausado
  const btnOpenMenu = document.getElementById("btn-open-menu");
  if (btnOpenMenu) {
    bindAction(btnOpenMenu, () => {
      switchSubView("home");
    });
  }
  const btnPauseMainMenu = document.getElementById("btn-pause-main-menu");
  if (btnPauseMainMenu) {
    bindAction(btnPauseMainMenu, () => {
      switchSubView("home");
      const tutBanner = document.getElementById("tutorial-guide-banner");
      if (tutBanner) tutBanner.classList.add("hidden");
    });
  }

  // Configurações: Alternar Som
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

  // Configurações: Alternar Música
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

  // Configurações: Abrir Conquistas
  const btnOpenAch = document.getElementById("btn-open-achievements-setting");
  if (btnOpenAch && modalAch) {
    bindAction(btnOpenAch, () => {
      renderAchievementsList();
      modalAch.classList.remove("hidden");
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

  // Sincroniza estatísticas espelhadas na view de batalha
  const syncStatsMirror = () => {
    const w = document.getElementById("stat-wins")?.textContent || "0";
    const d = document.getElementById("stat-draws")?.textContent || "0";
    const l = document.getElementById("stat-losses")?.textContent || "0";
    document.querySelectorAll(".stat-wins-mirror").forEach(el => el.textContent = w);
    document.querySelectorAll(".stat-draws-mirror").forEach(el => el.textContent = d);
    document.querySelectorAll(".stat-losses-mirror").forEach(el => el.textContent = l);
  };
  setTimeout(syncStatsMirror, 200);

  // Botão Entrar na Catedral (Iniciar Jogo)
  if (btnStart) {
    bindAction(btnStart, (e) => {
      if (e && e.type === "touchend") {
        btnStart.click();
      }
    });
  }

  // Toque rápido em seletores da Batalha (Modo, Arena, Cor, Tempo, Dificuldade)
  document.querySelectorAll(".photo2-toggle-group .toggle-btn").forEach(btn => {
    bindAction(btn, (e) => {
      if (e && e.type === "touchend") {
        btn.click();
      }
    });
  });
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
function startWizardApp() {
  try {
    initWizardFeatures();
  } catch (err) {
    console.error("[WizardChess] Erro no startWizardApp:", err);
  }
}

// Execução imediata garantida (script está no final do documento, DOM já está presente)
startWizardApp();

// Execução complementar para navegadores lentos ou carregamentos assíncronos
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startWizardApp);
}
window.addEventListener("load", startWizardApp);
setTimeout(startWizardApp, 150);

