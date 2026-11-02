
// ========================================================
// SISTEMA DE RECOMPENSAS: MOEDAS ARCANAS & LOJA DE PEÇAS
// ========================================================
const SKIN_PRICES = {
  classic: 0,
  amethyst: 300,
  ruby: 500,
  emerald: 600,
  spectral: 800,
  celestial: 900,
  gold: 1200,
  cyber: 1500
};

const SKIN_NAMES = {
  classic: "Clássico",
  amethyst: "Ametista",
  ruby: "Rubi de Fogo",
  emerald: "Esmeralda",
  spectral: "Espectral",
  celestial: "Celestial Astral",
  gold: "Ouro Real",
  cyber: "Runa Cibernética"
};

function getPlayerCoins() {
  const val = parseInt(localStorage.getItem("wizard_chess_coins"), 10);
  return isNaN(val) ? 100 : val;
}

function setPlayerCoins(val) {
  const safeVal = Math.max(0, val);
  try { localStorage.setItem("wizard_chess_coins", safeVal); } catch(e) {}
  updateCoinsUI();
}

function addPlayerCoins(amount, reason = "") {
  const current = getPlayerCoins();
  const next = current + amount;
  setPlayerCoins(next);
  if (reason) {
    showToast(`🪙 +${amount} Moedas: ${reason}`);
  }
  return next;
}

function spendPlayerCoins(amount) {
  const current = getPlayerCoins();
  if (current < amount) return false;
  setPlayerCoins(current - amount);
  return true;
}

function getUnlockedSkins() {
  try {
    const raw = localStorage.getItem("wizard_chess_unlocked_skins");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return ["classic"];
}

function isSkinUnlocked(skin) {
  if (skin === "classic") return true;
  return getUnlockedSkins().includes(skin);
}

function unlockSkin(skin) {
  const unlocked = getUnlockedSkins();
  if (!unlocked.includes(skin)) {
    unlocked.push(skin);
    try { localStorage.setItem("wizard_chess_unlocked_skins", JSON.stringify(unlocked)); } catch(e) {}
  }
  setSkinProgress(skin, 100);
  updateSkinsShopUI();
}

function getSkinProgress(skin) {
  if (skin === "classic" || isSkinUnlocked(skin)) return 100;
  try {
    const raw = localStorage.getItem("wizard_skin_progress");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed[skin] === "number") return Math.min(100, Math.max(0, parsed[skin]));
    }
  } catch(e) {}
  return 0;
}

function setSkinProgress(skin, val) {
  try {
    const raw = localStorage.getItem("wizard_skin_progress");
    const progress = raw ? JSON.parse(raw) : {};
    progress[skin] = Math.min(100, Math.max(0, val));
    localStorage.setItem("wizard_skin_progress", JSON.stringify(progress));
  } catch(e) {}
}

function addSkinProgress(skin, amount) {
  const skinsList = ["amethyst", "ruby", "emerald", "spectral", "celestial", "gold", "cyber"];
  let targetSkin = skin;

  // Se for "any" ou a skin já estiver desbloqueada, redireciona para outra que ainda falte
  if (targetSkin === "any" || isSkinUnlocked(targetSkin)) {
    const lockedSkins = skinsList.filter(s => !isSkinUnlocked(s));
    if (lockedSkins.length > 0) {
      targetSkin = lockedSkins[Math.floor(Math.random() * lockedSkins.length)];
    } else {
      addPlayerCoins(800, "Coleção Completa! Bônus Místico");
      return { skin: null, fullBonus: true };
    }
  }

  const current = getSkinProgress(targetSkin);
  const next = Math.min(100, current + amount);
  setSkinProgress(targetSkin, next);
  const targetName = SKIN_NAMES[targetSkin] || targetSkin;

  let unlockedNow = false;
  if (next >= 100) {
    unlockSkin(targetSkin);
    unlockedNow = true;
    showAchievementToast("🎉 PEÇA DESBLOQUEADA!", `100% atingido! Estilo ${targetName} liberado!`, "✨");
  } else {
    showToast(`🧩 Fragmentos: +${amount}% para ${targetName} (${next}% / 100%)`);
  }

  updateSkinsShopUI();
  return { skin: targetSkin, progress: next, unlockedNow };
}

function updateCoinsUI() {
  const coins = getPlayerCoins();
  const topCoins = document.getElementById("player-coins-top");
  const profileCoins = document.getElementById("profile-coins-display");
  const customizeCoins = document.getElementById("customize-coins-display");
  const rewardTotal = document.getElementById("reward-coins-total");

  if (topCoins) topCoins.textContent = coins.toLocaleString();
  if (profileCoins) profileCoins.textContent = coins.toLocaleString();
  if (customizeCoins) customizeCoins.textContent = coins.toLocaleString();
  if (rewardTotal) rewardTotal.textContent = `${coins.toLocaleString()} 🪙`;
}

function updateSkinsShopUI() {
  const currentSkin = localStorage.getItem("wizard_chess_skin") || "classic";
  const unlocked = getUnlockedSkins();

  document.querySelectorAll("#customize-skin-grid .custom-card[data-skin]").forEach(card => {
    const skin = card.dataset.skin;
    const isUnlocked = isSkinUnlocked(skin);
    const isEquipped = skin === currentSkin;
    const progress = isUnlocked ? 100 : getSkinProgress(skin);
    const fullPrice = SKIN_PRICES[skin] || 300;
    const remainingPrice = isUnlocked ? 0 : Math.max(30, Math.round(fullPrice * (1 - progress / 100)));

    card.classList.toggle("unlocked", isUnlocked);
    card.classList.toggle("locked", !isUnlocked);
    card.classList.toggle("equipped", isEquipped);
    card.classList.toggle("active", isEquipped);

    // Tag "EM USO" estilo Imagem 1 (Golf Rival)
    let emUsoBadge = card.querySelector(".card-em-uso-badge");
    if (!emUsoBadge) {
      emUsoBadge = document.createElement("div");
      emUsoBadge.className = "card-em-uso-badge";
      emUsoBadge.textContent = "EM USO";
      card.prepend(emUsoBadge);
    }
    emUsoBadge.style.display = isEquipped ? "block" : "none";

    // Barra de progresso de fragmentos (Estilo Imagem 1: 7/10 e 70%)
    const fillEl = card.querySelector(".card-frag-fill");
    const countEl = card.querySelector(".card-frag-count");
    const pctEl = card.querySelector(".card-frag-pct");
    const frags = Math.min(10, Math.floor(progress / 10));

    if (fillEl) fillEl.style.width = `${progress}%`;
    if (countEl) countEl.textContent = isUnlocked ? "10/10" : `${frags}/10`;
    if (pctEl) pctEl.textContent = isUnlocked ? "100%" : `${progress}%`;

    // Botão de ação (✓ EM USO / EQUIPAR / DESBLOQUEAR X 🪙)
    const statusBtn = card.querySelector(".card-action-btn") || card.querySelector(".custom-card-status");
    if (statusBtn) {
      if (isEquipped) {
        statusBtn.textContent = "✓ EM USO";
        statusBtn.className = "card-action-btn equipped-btn";
      } else if (isUnlocked) {
        statusBtn.textContent = "EQUIPAR";
        statusBtn.className = "card-action-btn equip-btn";
      } else {
        statusBtn.innerHTML = `DESBLOQUEAR <span class="coin-tag">${remainingPrice.toLocaleString()} 🪙</span>`;
        statusBtn.className = "card-action-btn unlock-btn";
      }
    }
  });
}

function onSkinCardClick(skin) {
  const skinName = SKIN_NAMES[skin] || skin;
  const isUnlocked = isSkinUnlocked(skin);

  if (isUnlocked) {
    try { localStorage.setItem("wizard_chess_skin", skin); } catch(e) {}
    if (typeof updateKnightShowcase === "function") updateKnightShowcase(skin);
    const skinBtn = document.querySelector(`#menu-skin-group .toggle-btn[data-skin="${skin}"]`);
    if (skinBtn) skinBtn.click();
    updateSkinsShopUI();
    showToast(`🎨 Peça em uso: ${skinName}`);
    if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playPiecePlaced) {
      ArcaneAudio.playPiecePlaced();
    }
  } else {
    const progress = getSkinProgress(skin);
    const fullPrice = SKIN_PRICES[skin] || 300;
    const remainingPrice = Math.max(30, Math.round(fullPrice * (1 - progress / 100)));
    const coins = getPlayerCoins();

    if (coins >= remainingPrice) {
      spendPlayerCoins(remainingPrice);
      setSkinProgress(skin, 100);
      unlockSkin(skin);
      try { localStorage.setItem("wizard_chess_skin", skin); } catch(e) {}
      if (typeof updateKnightShowcase === "function") updateKnightShowcase(skin);
      const skinBtn = document.querySelector(`#menu-skin-group .toggle-btn[data-skin="${skin}"]`);
      if (skinBtn) skinBtn.click();
      updateSkinsShopUI();
      showAchievementToast("🎉 PEÇA DESBLOQUEADA!", `Você completou ${skinName} por ${remainingPrice} 🪙!`, "✨");
      if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playQuestRewardChime) {
        ArcaneAudio.playQuestRewardChime();
      }
    } else {
      showToast(`🔒 Moedas insuficientes! Você precisa de ${remainingPrice} 🪙 para completar ${skinName} (${progress}% obtido). Gire a Roda da Fortuna para fragmentos!`);
    }
  }
}

function checkDailyReward() {
  try {
    const lastDaily = parseInt(localStorage.getItem("wizard_chess_last_daily"), 10) || 0;
    const now = Date.now();
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    if (now - lastDaily >= TWENTY_FOUR_HOURS) {
      localStorage.setItem("wizard_chess_last_daily", now);
      addPlayerCoins(50, "Recompensa Diária Coletada!");
      showAchievementToast("🎁 RECOMPENSA DIÁRIA!", "+50 Moedas Arcanas coletadas hoje", "🪙");
    }
  } catch(e) {}
}

function setupRewardEconomySystem() {
  updateCoinsUI();
  updateSkinsShopUI();
  checkDailyReward();

  // Botão de moedas no topo abre a personalização (loja)
  const btnTopCoins = document.getElementById("btn-top-coins");
  if (btnTopCoins) {
    bindAction(btnTopCoins, () => {
      const btnNavCustom = document.getElementById("btn-nav-customize");
      if (btnNavCustom) btnNavCustom.click();
    }, "openShopFromCoinsTop");
  }

  // Interação na Loja de Skins (Estilo Imagem 1)
  document.querySelectorAll("#customize-skin-grid .custom-card[data-skin]").forEach(card => {
    bindAction(card, () => {
      onSkinCardClick(card.dataset.skin);
    }, `skinShopItem_${card.dataset.skin}`);
  });
}


// Bloqueio de botões inferiores e controle de navegação dos modais
window._openAchievementsFromProfile = function(e) {
  if (e) {
    if (typeof e.preventDefault === "function") e.preventDefault();
    if (typeof e.stopPropagation === "function") e.stopPropagation();
  }
  if (typeof window._closeProfileModal === "function") {
    window._closeProfileModal(e);
  }
  const modalAch = document.getElementById("achievements-modal");
  if (modalAch) {
    if (typeof renderAchievementsList === "function") renderAchievementsList();
    modalAch.classList.remove("hidden");
    modalAch.style.setProperty("display", "flex", "important");
    document.body.classList.add("modal-open");
    document.body.classList.add("achievements-modal-open");
  }
};

window._closeAchievementsModal = function(e) {
  if (e) {
    if (typeof e.preventDefault === "function") e.preventDefault();
    if (typeof e.stopPropagation === "function") e.stopPropagation();
  }
  const modalAch = document.getElementById("achievements-modal");
  if (modalAch) {
    modalAch.classList.add("hidden");
    modalAch.style.removeProperty("display");
    document.body.classList.remove("achievements-modal-open");
    if (!document.body.classList.contains("profile-modal-open")) {
      document.body.classList.remove("modal-open");
    }
  }
};

window._goToMainMenuFromPause = function(e) {
  if (e) {
    if (typeof e.preventDefault === "function") e.preventDefault();
    if (typeof e.stopPropagation === "function") e.stopPropagation();
  }
  // Fecha o menu de pausa
  const pauseModal = document.getElementById("pause-modal");
  if (pauseModal) {
    pauseModal.classList.add("hidden");
    pauseModal.style.removeProperty("display");
  }
  // Abre o menu inicial completo
  const startMenu = document.getElementById("start-menu");
  if (startMenu) {
    startMenu.classList.remove("hidden");
    startMenu.style.setProperty("display", "flex", "important");
  }
  // Ativa a aba HOME (Catedral / Cavalo Místico)
  document.querySelectorAll(".menu-subview").forEach(v => {
    v.classList.remove("active");
    v.style.setProperty("display", "none", "important");
  });
  const homeView = document.getElementById("menu-view-home");
  if (homeView) {
    homeView.classList.add("active");
    homeView.style.setProperty("display", "flex", "important");
  }
  // Atualiza navbar inferior
  document.querySelectorAll(".rpg-bottom-nav .rpg-nav-item").forEach(btn => btn.classList.remove("active"));
  const btnNavHome = document.getElementById("btn-nav-home");
  if (btnNavHome) btnNavHome.classList.add("active");

  const puzzleHud = document.getElementById("puzzle-hud");
  if (puzzleHud) puzzleHud.classList.add("hidden");
};

// Fallback inicial para o modal de perfil com escudo anti-ghost-click
let _lastProfileOpenTime = 0;
window._openProfileModal = function(e) {
  if (e) {
    if (typeof e.preventDefault === "function") e.preventDefault();
    if (typeof e.stopPropagation === "function") e.stopPropagation();
  }
  _lastProfileOpenTime = Date.now();
  if (typeof window._applyProfileUI === "function") {
    try { window._applyProfileUI(); } catch (err) {}
  }
  const modal = document.getElementById("profile-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.setProperty("display", "flex", "important");
  }
};
window._closeProfileModal = function(e) {
  if (e) {
    if (typeof e.preventDefault === "function") e.preventDefault();
    if (typeof e.stopPropagation === "function") e.stopPropagation();
  }
  const modal = document.getElementById("profile-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.removeProperty("display");
  }
};

// ========================================================
// Wizard's Chess 3D - Advanced Features, Progression & Skins
// ========================================================

// Helper unificado para toque imediato no mobile e clique seguro
let _lastViewTransition = 0;

function bindAction(el, handler, actionKey = "") {
  if (!el) return;
  el._wizardActions = el._wizardActions || new Set();
  const key = actionKey || handler.toString();
  if (el._wizardActions.has(key)) return;
  el._wizardActions.add(key);

  let lastTrigger = 0;

  const trigger = (e) => {
    const now = Date.now();
    // Protege contra ghost clicks / toques que vazam após troca de tela (ex: botão Voltar)
    if (now - _lastViewTransition < 350) {
      if (e && typeof e.stopPropagation === "function") e.stopPropagation();
      return;
    }
    if (now - lastTrigger < 180) return;
    lastTrigger = now;
    try {
      handler(e);
    } catch (err) {
      console.error("[WizardChess] Erro ao executar ação:", err);
    }
  };

  el.addEventListener("click", trigger);
  el.addEventListener("pointerup", (e) => {
    trigger(e);
  });
}


// Suporte ao nome do jogador e do convidado no modo online e HUD
function setupOnlinePlayerNames() {
  const inputGuest = document.getElementById("input-guest-name");
  const currentName = localStorage.getItem("wizard_chess_player_name") || "Mago";
  if (inputGuest && !inputGuest.value) {
    inputGuest.value = currentName;
  }

  const btnJoin = document.getElementById("btn-join-code");
  const inputJoin = document.getElementById("input-join-code");
  if (btnJoin) {
    bindAction(btnJoin, () => {
      const guestName = (inputGuest && inputGuest.value.trim()) ? inputGuest.value.trim() : (localStorage.getItem("wizard_chess_player_name") || "Convidado");
      try { localStorage.setItem("wizard_chess_player_name", guestName); } catch (e) {}

      // Atualiza nome na HUD imediatamente
      const hudName = document.getElementById("player-name-hud");
      if (hudName) hudName.textContent = guestName;

      const code = inputJoin ? inputJoin.value.trim().toUpperCase() : "";
      if (code && window.db && window.dbUpdate && window.dbRef) {
        try {
          const currentAvatar = localStorage.getItem("wizard_chess_player_avatar") || "🧙‍♂️";
          window.dbUpdate(window.dbRef(window.db, "rooms/" + code), {
            player2Name: guestName,
            player2Avatar: currentAvatar,
            player2Joined: true
          });
        } catch (err) {
          console.warn("[Online] Erro ao enviar nome do convidado:", err);
        }
      }
    }, "joinOnlineRoomWithGuestName");
  }

  // Monitorar Firebase para atualizar nomes no HUD da Obsidiana e Mármore
  function monitorOnlineRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get("room") || localStorage.getItem("myRoom");
    if (!room || !window.db || !window.dbRef || !window.dbOnValue) return;

    window.dbOnValue(window.dbRef(window.db, "rooms/" + room), snapshot => {
      const data = snapshot.val();
      if (!data) return;

      const p1Name = data.player1Name || "Mármore";
      const p1Avatar = data.player1Avatar || "🧙‍♂️";
      const p2Name = data.player2Name || "Obsidiana";
      const p2Avatar = data.player2Avatar || "💀";

      const oppNameEl = document.getElementById("opponent-name-hud");
      const oppAvatarEl = document.getElementById("opponent-avatar-hud");
      const playerNameEl = document.getElementById("player-name-hud");
      const playerAvatarEl = document.getElementById("player-avatar-hud");

      const myColor = (typeof window.Qe !== "undefined") ? window.Qe : "w";
      if (myColor === "w") {
        if (oppNameEl) oppNameEl.textContent = p2Name;
        if (oppAvatarEl) oppAvatarEl.textContent = p2Avatar;
        if (playerNameEl) playerNameEl.textContent = p1Name;
        if (playerAvatarEl) playerAvatarEl.textContent = p1Avatar;
      } else {
        if (oppNameEl) oppNameEl.textContent = p1Name;
        if (oppAvatarEl) oppAvatarEl.textContent = p1Avatar;
        if (playerNameEl) playerNameEl.textContent = p2Name;
        if (playerAvatarEl) playerAvatarEl.textContent = p2Avatar;
      }
    });
  }

  setTimeout(monitorOnlineRoom, 1000);
}

function initWizardFeatures() {
  const tasks = [
    { name: "RewardEconomySystem", fn: setupRewardEconomySystem },
    { name: "OnlinePlayerNames", fn: setupOnlinePlayerNames },
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
    { name: "AdaptiveLayout", fn: setupAdaptiveFullscreenAndLayout },
    { name: "AvatarFramesAndArenas", fn: setupAvatarFramesAndArenas },
    { name: "CampaignTower", fn: setupCampaignTower },
    { name: "MatchReplay", fn: setupMatchReplay },
    { name: "EpicCombatAnimations", fn: setupEpicCombatAnimations },
    { name: "WebShortcutsAndAdaptations", fn: setupWebShortcutsAndAdaptations },
    { name: "AdMobManager", fn: setupAdMobManager },
    { name: "ArcaneAudio", fn: setupArcaneAudio },
    { name: "DailyQuests", fn: setupDailyQuests },
    { name: "TacticalPuzzles", fn: setupTacticalPuzzles },
    { name: "WizardCampaign", fn: setupWizardCampaign },
    { name: "DynamicWeather", fn: setupDynamicWeather },
    { name: "DailyChest", fn: setupDailyChest },
    { name: "FortuneWheel", fn: setupFortuneWheel },
    { name: "VictoryShareModal", fn: setupVictoryShareModal },
    { name: "SpellCaptureVFX", fn: setupSpellCaptureVFX },
    { name: "SpellTrails", fn: setupSpellTrails },
    { name: "ArcanePass", fn: setupArcanePass },
    { name: "PuzzleRush", fn: setupPuzzleRush },
    { name: "EnhancedGameReview", fn: setupEnhancedGameReview },
    { name: "CampaignWorld2", fn: setupCampaignWorld2 }
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
      switchSubView("home");
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
  const isWin = title.toLowerCase().includes("xeque-mate") || title.toLowerCase().includes("vitória");
  const isDraw = title.toLowerCase().includes("empate");

  let coinsEarned = 15; // Mínimo de consolo
  let xpEarned = 25;
  let rewardText = "+15 Moedas (Honra em Batalha)";

  if (isWin) {
    unlockAchievement("first_win");
    let mode = "ai";
    let diff = 2;

    if (window._WIZARD_GAME) {
      mode = window._WIZARD_GAME.getMode ? window._WIZARD_GAME.getMode() : "ai";
      diff = window._WIZARD_GAME.getDiff ? window._WIZARD_GAME.getDiff() : 2;

      const arena = window._WIZARD_GAME.getArena ? window._WIZARD_GAME.getArena() : "";
      if (arena === "inferno") unlockAchievement("crypt_master");
      if (arena === "frost") unlockAchievement("frost_lord");
    }

    if (mode === "online") {
      coinsEarned = 120;
      xpEarned = 150;
      rewardText = "+120 Moedas (Vitória Online!)";
    } else if (mode === "ai") {
      if (diff === 3) {
        coinsEarned = 100;
        xpEarned = 150;
        rewardText = "+100 Moedas (IA Difícil Vencida!)";
        unlockAchievement("hard_slayer");
      } else if (diff === 2) {
        coinsEarned = 50;
        xpEarned = 100;
        rewardText = "+50 Moedas (Vitória na Batalha)";
      } else {
        coinsEarned = 25;
        xpEarned = 50;
        rewardText = "+25 Moedas (Treino Concluído)";
      }
    } else {
      coinsEarned = 40;
      xpEarned = 60;
      rewardText = "+40 Moedas (Duelo Local)";
    }
  } else if (isDraw) {
    coinsEarned = 20;
    xpEarned = 40;
    rewardText = "+20 Moedas (Empate)";
  }

  addXP(xpEarned, rewardText);
  addPlayerCoins(coinsEarned);
  if (isWin) {
    if (typeof addArcaneCrowns === "function") addArcaneCrowns(3);
  } else if (isDraw) {
    if (typeof addArcaneCrowns === "function") addArcaneCrowns(1);
  }

  const rewardLabel = document.getElementById("reward-coins-added");
  const rewardTotal = document.getElementById("reward-coins-total");
  const rewardCard = document.getElementById("game-over-reward-card");

  if (rewardLabel) rewardLabel.textContent = rewardText;
  if (rewardTotal) rewardTotal.textContent = `${getPlayerCoins()} 🪙`;
  if (rewardCard) rewardCard.style.removeProperty("display");
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
    },
    ruby: {
      bodyGradStart: "#ff4d6d",
      bodyGradMid: "#c9184a",
      bodyGradEnd: "#590d22",
      rimLight: "#ff758f",
      accent: "#ffb703",
      runeColor: "#ffd166",
      runeGlow: "#ff5400",
      eyeGlow: "#ffe600",
      bridleColor: "#ff758f",
      bridleTrim: "#ffd166",
      gemColor: "#ff0054",
      baseGrad1: "#800f2f",
      baseGrad2: "#2b0914",
      baseRing: "#ffb703",
      pedestalGlow: "rgba(255, 77, 109, 0.45)",
      name: "Cavalo de Rubi de Fogo",
      desc: "Rubi escarlate lapidado com runas incandescentes de fogo primordial."
    },
    celestial: {
      bodyGradStart: "#e0f2fe",
      bodyGradMid: "#38bdf8",
      bodyGradEnd: "#0c4a6e",
      rimLight: "#7dd3fc",
      accent: "#c084fc",
      runeColor: "#70d6ff",
      runeGlow: "#38bdf8",
      eyeGlow: "#a855f7",
      bridleColor: "#818cf8",
      bridleTrim: "#c084fc",
      gemColor: "#38bdf8",
      baseGrad1: "#0369a1",
      baseGrad2: "#082f49",
      baseRing: "#70d6ff",
      pedestalGlow: "rgba(112, 214, 255, 0.45)",
      name: "Cavalo Celestial Astral",
      desc: "Forjado da poeira estelar pura com essência de supernovas arcanas."
    },
    cyber: {
      bodyGradStart: "#f8fafc",
      bodyGradMid: "#475569",
      bodyGradEnd: "#0f172a",
      rimLight: "#00f5d4",
      accent: "#ff007f",
      runeColor: "#00f5d4",
      runeGlow: "#00b4d8",
      eyeGlow: "#ff007f",
      bridleColor: "#334155",
      bridleTrim: "#00f5d4",
      gemColor: "#ff007f",
      baseGrad1: "#1e293b",
      baseGrad2: "#020617",
      baseRing: "#00f5d4",
      pedestalGlow: "rgba(0, 245, 212, 0.45)",
      name: "Cavalo Cibernético Neon",
      desc: "Titânio cromado futurista pulsando circuitos de néon cibernético."
    },
    spectral: {
      bodyGradStart: "#80ffdb",
      bodyGradMid: "#48cae4",
      bodyGradEnd: "#023e8a",
      rimLight: "#a78bfa",
      accent: "#c77dff",
      runeColor: "#64dfdf",
      runeGlow: "#48cae4",
      eyeGlow: "#e0aaff",
      bridleColor: "#2a0845",
      bridleTrim: "#c77dff",
      gemColor: "#a78bfa",
      baseGrad1: "#10002b",
      baseGrad2: "#03045e",
      baseRing: "#80ffdb",
      pedestalGlow: "rgba(128, 255, 219, 0.45)",
      name: "Cavalo Espectral",
      desc: "Manifestação ectoplásmica que flutua entre o plano terreno e espiritual."
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
    } else if (skinName === "ruby") {
      // Rubi de Fogo & Obsidiana Vulcânica
      Ft.marble.color.setHex(0xff3366);
      Ft.marble.roughness = 0.12;
      Ft.marble.metalness = 0.65;
      Ft.marble.emissive.setHex(0x4a0e17);

      Ft.obsidian.color.setHex(0x1a0f0f);
      Ft.obsidian.roughness = 0.3;
      Ft.obsidian.metalness = 0.85;
      Ft.obsidian.emissive.setHex(0x330000);

      Ft.runeWhite.color.setHex(0xffaa00);
      Ft.runeWhite.emissive.setHex(0xffaa00);
      Ft.runeBlack.color.setHex(0xff3b30);
      Ft.runeBlack.emissive.setHex(0xff3b30);
    } else if (skinName === "celestial") {
      // Celestial Astral & Vazio Profundo
      Ft.marble.color.setHex(0xf0f8ff);
      Ft.marble.roughness = 0.05;
      Ft.marble.metalness = 0.9;
      Ft.marble.emissive.setHex(0x1a2e40);

      Ft.obsidian.color.setHex(0x050a14);
      Ft.obsidian.roughness = 0.1;
      Ft.obsidian.metalness = 0.95;
      Ft.obsidian.emissive.setHex(0x08152e);

      Ft.runeWhite.color.setHex(0x70d6ff);
      Ft.runeWhite.emissive.setHex(0x70d6ff);
      Ft.runeBlack.color.setHex(0x9d4edd);
      Ft.runeBlack.emissive.setHex(0x9d4edd);
    } else if (skinName === "cyber") {
      // Runa Cibernética & Cromo Escuro
      Ft.marble.color.setHex(0xffffff);
      Ft.marble.roughness = 0.2;
      Ft.marble.metalness = 0.9;
      Ft.marble.emissive.setHex(0x003344);

      Ft.obsidian.color.setHex(0x0d0d12);
      Ft.obsidian.roughness = 0.15;
      Ft.obsidian.metalness = 0.95;
      Ft.obsidian.emissive.setHex(0x220033);

      Ft.runeWhite.color.setHex(0x00f5d4);
      Ft.runeWhite.emissive.setHex(0x00f5d4);
      Ft.runeBlack.color.setHex(0xff007f);
      Ft.runeBlack.emissive.setHex(0xff007f);
    } else if (skinName === "spectral") {
      // Espectral Ectoplasma & Sombra Astral
      Ft.marble.color.setHex(0x80ffdb);
      Ft.marble.roughness = 0.05;
      Ft.marble.metalness = 0.2;
      Ft.marble.emissive.setHex(0x1b4332);

      Ft.obsidian.color.setHex(0x1f1429);
      Ft.obsidian.roughness = 0.1;
      Ft.obsidian.metalness = 0.5;
      Ft.obsidian.emissive.setHex(0x3d0c5a);

      Ft.runeWhite.color.setHex(0x52b788);
      Ft.runeWhite.emissive.setHex(0x52b788);
      Ft.runeBlack.color.setHex(0xc77dff);
      Ft.runeBlack.emissive.setHex(0xc77dff);
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
    _lastViewTransition = Date.now();
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
  window._switchSubView = switchSubView;

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

  // 3.1. Card Roxo: Campanha Arcana -> Abre View da Campanha
  const btnCardCampaign = document.getElementById("btn-card-campaign");
  if (btnCardCampaign) {
    bindAction(btnCardCampaign, () => {
      switchSubView("campaign");
      if (typeof window._updateCampaignUI === "function") window._updateCampaignUI();
    }, "openCampaignCard");
  }

  const btnCampaignBack = document.getElementById("btn-campaign-back");
  if (btnCampaignBack) {
    bindAction(btnCampaignBack, () => {
      switchSubView("home");
    }, "closeCampaignBack");
  }

  // 3.2. Pílula Roda da Fortuna no Topo
  const btnWebFortune = document.getElementById("btn-web-fortune-wheel");
  const modalFortune = document.getElementById("fortune-wheel-modal");
  const btnCloseFortune = document.getElementById("btn-close-fortune-wheel");
  if (btnWebFortune && modalFortune) {
    bindAction(btnWebFortune, () => {
      modalFortune.classList.remove("hidden");
      if (typeof window._renderFortuneWheel === "function") window._renderFortuneWheel();
    }, "openFortunePill");
  }
  if (btnCloseFortune && modalFortune) {
    bindAction(btnCloseFortune, () => {
      modalFortune.classList.add("hidden");
    }, "closeFortuneModal");
  }

  // 3.3. Botão Compartilhar Vitória no Fim de Jogo
  const btnGameOverShare = document.getElementById("btn-game-over-share");
  const modalShare = document.getElementById("share-victory-modal");
  const btnCloseShare = document.getElementById("btn-close-share-modal");
  if (btnGameOverShare && modalShare) {
    bindAction(btnGameOverShare, () => {
      modalShare.classList.remove("hidden");
      if (typeof window._populateVictoryShareModal === "function") window._populateVictoryShareModal();
    }, "openShareModal");
  }
  if (btnCloseShare && modalShare) {
    bindAction(btnCloseShare, () => {
      modalShare.classList.add("hidden");
    }, "closeShareModal");
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
      if (typeof window._openProfileModal === "function") {
        window._openProfileModal();
      } else {
        const pm = document.getElementById("profile-modal");
        if (pm) pm.classList.remove("hidden");
      }
    }, "openProfileModalFromTop");
  }

  const btnTopQuestsPill = document.getElementById("btn-web-daily-quests");
  if (btnTopQuestsPill) {
    bindAction(btnTopQuestsPill, () => {
      switchSubView("challenges");
      setTimeout(() => {
        const qEl = document.getElementById("daily-quests-container");
        if (qEl) qEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      showToast("📜 Missões Diárias do Grimório");
    }, "openTopDailyQuestsNav");
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

  // 7. Seleção de Peças na Aba Personalizar (Delegado para onSkinCardClick)
  document.querySelectorAll("#customize-skin-grid .custom-card[data-skin]").forEach(card => {
    bindAction(card, () => {
      onSkinCardClick(card.dataset.skin);
    }, `customizeSkinCard_${card.dataset.skin}`);
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
  const btnXClose = document.getElementById("btn-x-close-profile");
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
    updateCoinsUI();
    updateSkinsShopUI();
    currentName = localStorage.getItem("wizard_chess_player_name") || "Mago";
    currentAvatar = localStorage.getItem("wizard_chess_player_avatar") || "🧙‍♂️";

    if (nameInput) nameInput.value = currentName;
    if (previewName) previewName.textContent = currentName;
    if (previewAvatar) previewAvatar.textContent = currentAvatar;
    if (topAvatar) topAvatar.textContent = currentAvatar;

    // Atualiza HUD da partida (Imagem 4)
    const hudAvatar = document.getElementById("player-avatar-hud");
    const hudName = document.getElementById("player-name-hud");
    const hudLegacy = document.getElementById("hud-player-name-bottom");
    if (hudAvatar) hudAvatar.textContent = currentAvatar;
    if (hudName) hudName.textContent = currentName;
    if (hudLegacy) hudLegacy.textContent = currentName;

    const inputGuest = document.getElementById("input-guest-name");
    if (inputGuest && !inputGuest.value) inputGuest.value = currentName;

    document.querySelectorAll(".avatar-option").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.avatar === currentAvatar);
    });

    const setAvatar = document.getElementById("settings-player-avatar");
    const setName = document.getElementById("settings-player-name");
    if (setAvatar) setAvatar.textContent = currentAvatar;
    if (setName) setName.textContent = currentName;
  }

  window._applyProfileUI = applyProfileUI;

  function openProfileModal(e) {
    if (e) {
      if (typeof e.preventDefault === "function") e.preventDefault();
      if (typeof e.stopPropagation === "function") e.stopPropagation();
    }
    _lastProfileOpenTime = Date.now();
    applyProfileUI();
    if (profileModal) {
      profileModal.classList.remove("hidden");
      profileModal.style.setProperty("display", "flex", "important");
      document.body.classList.add("profile-modal-open");
      document.body.classList.add("modal-open");
    }
  }
  window._openProfileModal = openProfileModal;

  function closeProfileModal(e) {
    if (e) {
      if (typeof e.preventDefault === "function") e.preventDefault();
      if (typeof e.stopPropagation === "function") e.stopPropagation();
    }
    savePlayerName();
    if (profileModal) {
      profileModal.classList.add("hidden");
      profileModal.style.removeProperty("display");
      document.body.classList.remove("profile-modal-open");
      if (!document.body.classList.contains("achievements-modal-open")) {
        document.body.classList.remove("modal-open");
      }
    }
  }
  window._closeProfileModal = closeProfileModal;

  applyProfileUI();

  // Abrir Modal de Perfil ao clicar no perfil do topo
  if (btnTopProfile && profileModal) {
    bindAction(btnTopProfile, openProfileModal, "openProfileModalFromTop");
  }

  // Também permitir abrir pelo resumo nas configurações
  const btnSettingsToProfile = document.getElementById("btn-settings-to-profile");
  if (btnSettingsToProfile && profileModal) {
    bindAction(btnSettingsToProfile, openProfileModal, "openProfileModalFromSettings");
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
      closeProfileModal();
      const modalAch = document.getElementById("achievements-modal");
      if (modalAch) {
        if (typeof renderAchievementsList === "function") renderAchievementsList();
        modalAch.classList.remove("hidden");
        modalAch.style.setProperty("display", "flex", "important");
      }
    }, "openAchFromProfile");
  }

  // Botões Fechar Modal de Perfil
  if (btnCloseProfile && profileModal) {
    bindAction(btnCloseProfile, closeProfileModal, "closeProfileModal");
  }
  if (btnXClose && profileModal) {
    bindAction(btnXClose, closeProfileModal, "closeProfileModalX");
  }

  // Impedir que cliques dentro do card do modal vazem para o fundo
  const profileContent = profileModal ? profileModal.querySelector(".profile-modal-content") : null;
  if (profileContent) {
    profileContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    profileContent.addEventListener("pointerup", (e) => {
      e.stopPropagation();
    });
  }

  // Escudo anti-ghost-click no backdrop: só fecha se clicou no fundo e já se passaram > 600ms da abertura
  if (profileModal) {
    profileModal.addEventListener("click", (e) => {
      if (Date.now() - _lastProfileOpenTime < 600) {
        if (e && typeof e.stopPropagation === "function") e.stopPropagation();
        return;
      }
      if (e.target === profileModal) {
        closeProfileModal(e);
      }
    });
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


// ==========================================================================
// 12. MOLDURAS MÁGICAS DE AVATAR & NOVAS ARENAS (LOJA ARCANA EXPANDIDA)
// ==========================================================================
const FRAME_PRICES = {
  classic: 0,
  gold: 350,
  fire: 700,
  cosmic: 1200
};

const FRAME_NAMES = {
  classic: "Clássica",
  gold: "Ouro Arcano",
  fire: "Fogo da Fênix",
  cosmic: "Cósmica Astral"
};

const ARENA_PRICES = {
  cathedral: 0,
  inferno: 0,
  frost: 0,
  cosmos: 400,
  forest: 500,
  abyss: 600,
  desert: 750,
  atlantis: 900
};

const ARENA_NAMES = {
  cathedral: "Catedral Arcana",
  inferno: "Cripta Infernal",
  frost: "Templo de Gelo",
  cosmos: "Observatório Cósmico",
  forest: "Floresta Proibida",
  abyss: "Abismo do Vazio",
  desert: "Pirâmide das Areias",
  atlantis: "Santuário de Atlântida"
};

function getUnlockedFrames() {
  try {
    const raw = localStorage.getItem("wizard_chess_unlocked_frames");
    return raw ? JSON.parse(raw) : ["classic"];
  } catch (e) {
    return ["classic"];
  }
}

function isFrameUnlocked(id) {
  if (id === "classic") return true;
  return getUnlockedFrames().includes(id);
}

function unlockFrame(id) {
  const frames = getUnlockedFrames();
  if (!frames.includes(id)) {
    frames.push(id);
    try { localStorage.setItem("wizard_chess_unlocked_frames", JSON.stringify(frames)); } catch (e) {}
  }
}

function getEquippedFrame() {
  return localStorage.getItem("wizard_chess_avatar_frame") || "classic";
}

function setEquippedFrame(id) {
  try { localStorage.setItem("wizard_chess_avatar_frame", id); } catch (e) {}
  applyAvatarFrameUI();
}

function applyAvatarFrameUI() {
  const currentFrame = getEquippedFrame();
  const avatarEls = [
    document.getElementById("top-player-avatar"),
    document.getElementById("profile-avatar-preview"),
    document.getElementById("player-avatar-hud")
  ];

  avatarEls.forEach(el => {
    if (!el) return;
    el.classList.remove("avatar-frame-gold", "avatar-frame-fire", "avatar-frame-cosmic");
    if (currentFrame && currentFrame !== "classic") {
      el.classList.add(`avatar-frame-${currentFrame}`);
    }
  });
}

function getUnlockedArenas() {
  try {
    const raw = localStorage.getItem("wizard_chess_unlocked_arenas");
    return raw ? JSON.parse(raw) : ["cathedral", "inferno", "frost"];
  } catch (e) {
    return ["cathedral", "inferno", "frost"];
  }
}

function isArenaUnlocked(id) {
  if (id === "cathedral" || id === "inferno" || id === "frost") return true;
  return getUnlockedArenas().includes(id);
}

function unlockArena(id) {
  const arenas = getUnlockedArenas();
  if (!arenas.includes(id)) {
    arenas.push(id);
    try { localStorage.setItem("wizard_chess_unlocked_arenas", JSON.stringify(arenas)); } catch (e) {}
  }
}

function updateFramesShopUI() {
  const equipped = getEquippedFrame();
  document.querySelectorAll("#customize-frame-grid .custom-card[data-frame]").forEach(card => {
    const frameId = card.dataset.frame;
    const isEq = frameId === equipped;
    const isUnl = isFrameUnlocked(frameId);
    const statusEl = card.querySelector(".custom-card-status");

    card.classList.toggle("equipped", isEq);
    card.classList.toggle("active", isEq);
    card.classList.toggle("unlocked", isUnl);
    card.classList.toggle("locked", !isUnl);

    if (statusEl) {
      if (isEq) {
        statusEl.textContent = "✓ Equipada";
      } else if (isUnl) {
        statusEl.textContent = "Equipar";
      } else {
        const price = FRAME_PRICES[frameId] || 0;
        statusEl.textContent = `🔒 ${price} 🪙`;
      }
    }
  });
}

function updateArenasShopUI() {
  const currentArena = localStorage.getItem("wizard_arena") || "cathedral";
  document.querySelectorAll("#customize-arena-grid .custom-card[data-arena]").forEach(card => {
    const arenaId = card.dataset.arena;
    const isEq = arenaId === currentArena;
    const isUnl = isArenaUnlocked(arenaId);
    const statusEl = card.querySelector(".custom-card-status");
    const checkEl = card.querySelector(".custom-card-check");

    card.classList.toggle("active", isEq);
    card.classList.toggle("equipped", isEq);
    card.classList.toggle("unlocked", isUnl);
    card.classList.toggle("locked", !isUnl);

    if (checkEl) checkEl.style.display = isEq ? "block" : "none";

    if (statusEl) {
      if (isEq) {
        statusEl.textContent = "✓ Selecionada";
      } else if (isUnl) {
        statusEl.textContent = "Escolher";
      } else {
        const price = ARENA_PRICES[arenaId] || 0;
        statusEl.textContent = `🔒 ${price} 🪙`;
      }
    }
  });
}

function setupAvatarFramesAndArenas() {
  applyAvatarFrameUI();
  updateFramesShopUI();
  updateArenasShopUI();

  // Cliques na Loja de Molduras
  document.querySelectorAll("#customize-frame-grid .custom-card[data-frame]").forEach(card => {
    bindAction(card, () => {
      const frameId = card.dataset.frame;
      const frameName = FRAME_NAMES[frameId] || frameId;
      const price = FRAME_PRICES[frameId] || 0;

      if (isFrameUnlocked(frameId)) {
        setEquippedFrame(frameId);
        updateFramesShopUI();
        showToast(`✨ Moldura equipada: ${frameName}`);
      } else {
        const coins = getPlayerCoins();
        if (coins >= price) {
          spendPlayerCoins(price);
          unlockFrame(frameId);
          setEquippedFrame(frameId);
          updateFramesShopUI();
          updateCoinsUI();
          showToast(`🎉 Moldura desbloqueada: ${frameName}!`);
        } else {
          showToast(`🪙 Moedas insuficientes! Requer ${price} moedas.`);
        }
      }
    }, "selectFrame_" + card.dataset.frame);
  });

  // Cliques na Loja de Arenas
  document.querySelectorAll("#customize-arena-grid .custom-card[data-arena]").forEach(card => {
    bindAction(card, () => {
      const arenaId = card.dataset.arena;
      const arenaName = ARENA_NAMES[arenaId] || arenaId;
      const price = ARENA_PRICES[arenaId] || 0;

      if (isArenaUnlocked(arenaId)) {
        try {
          localStorage.setItem("wizard_arena", arenaId);
          if (window._WIZARD_GAME && typeof window._WIZARD_GAME.setArena === "function") {
            window._WIZARD_GAME.setArena(arenaId);
          }
        } catch (e) {}
        updateArenasShopUI();
        showToast(`🏛️ Arena escolhida: ${arenaName}`);
      } else {
        const coins = getPlayerCoins();
        if (coins >= price) {
          spendPlayerCoins(price);
          unlockArena(arenaId);
          try {
            localStorage.setItem("wizard_arena", arenaId);
            if (window._WIZARD_GAME && typeof window._WIZARD_GAME.setArena === "function") {
              window._WIZARD_GAME.setArena(arenaId);
            }
          } catch (e) {}
          updateArenasShopUI();
          updateCoinsUI();
          showToast(`🎉 Nova Arena desbloqueada: ${arenaName}!`);
        } else {
          showToast(`🪙 Moedas insuficientes! Requer ${price} moedas.`);
        }
      }
    }, "selectArena_" + card.dataset.arena);
  });
}


// ==========================================================================
// 13. MODO CAMPANHA: A TORRE DOS MAGOS (PROGRESSÃO DE CHEFES)
// ==========================================================================
const TOWER_BOSSES = [
  { floor: 1, name: "Andar 1: O Aprendiz Rúnico", bossName: "Leo, o Aprendiz", avatar: "🧙‍♂️", diff: "easy", coins: 150, xp: 100 },
  { floor: 2, name: "Andar 2: O Golem de Obsidiana", bossName: "Golem Ancestral", avatar: "🗿", diff: "easy", coins: 300, xp: 200 },
  { floor: 3, name: "Andar 3: A Feiticeira das Sombras", bossName: "Morgana das Sombras", avatar: "🧝‍♀️", diff: "medium", coins: 500, xp: 400 },
  { floor: 4, name: "Andar 4: O Necromante dos Cristais", bossName: "Malakor, o Necromante", avatar: "💀", diff: "hard", coins: 750, xp: 600 },
  { floor: 5, name: "Andar 5: O Arquimago Cósmico", bossName: "Lorde Vane, o Arquimago", avatar: "👑", diff: "hard", coins: 1500, xp: 1200, title: "Soberano da Torre" }
];

window._ACTIVE_TOWER_BOSS = null;

function getTowerFloor() {
  const val = parseInt(localStorage.getItem("wizard_chess_tower_floor") || "1", 10);
  return isNaN(val) ? 1 : val;
}

function updateTowerCampaignUI() {
  const currentFloor = getTowerFloor();
  const floorCurrentBadge = document.getElementById("tower-floor-current");
  if (floorCurrentBadge) {
    floorCurrentBadge.textContent = `Andar ${Math.min(currentFloor, 5)}`;
  }

  document.querySelectorAll(".tower-floor-card[data-floor]").forEach(card => {
    const f = parseInt(card.dataset.floor, 10);
    const btn = card.querySelector(".tower-battle-btn");

    card.classList.remove("current", "completed", "unlocked", "locked");

    if (f < currentFloor) {
      card.classList.add("completed", "unlocked");
      if (btn) {
        btn.textContent = "Jogar Novamente";
        btn.disabled = false;
      }
    } else if (f === currentFloor) {
      card.classList.add("current", "unlocked");
      if (btn) {
        btn.textContent = "Desafiar";
        btn.disabled = false;
      }
    } else {
      card.classList.add("locked");
      if (btn) {
        btn.textContent = "🔒 Bloqueado";
        btn.disabled = true;
      }
    }
  });
}

function setupCampaignTower() {
  updateTowerCampaignUI();

  document.querySelectorAll(".tower-floor-card[data-floor]").forEach(card => {
    const f = parseInt(card.dataset.floor, 10);
    const btn = card.querySelector(".tower-battle-btn");
    const boss = TOWER_BOSSES.find(b => b.floor === f);

    if (btn && boss) {
      bindAction(btn, () => {
        const currentFloor = getTowerFloor();
        if (f > currentFloor) {
          showToast(`🔒 Derrote o Andar ${currentFloor} para avançar!`);
          return;
        }

        window._ACTIVE_TOWER_BOSS = boss;

        // Configura modo IA na dificuldade do chefe
        const modeAiBtn = document.querySelector('#menu-mode-group .toggle-btn[data-mode="ai"]');
        if (modeAiBtn) modeAiBtn.click();

        const diffBtn = document.querySelector(`#menu-diff-group .toggle-btn[data-diff="${boss.diff}"]`);
        if (diffBtn) diffBtn.click();

        // Atualiza HUD com o nome e avatar do Chefe
        const oppAvatar = document.getElementById("opponent-avatar-hud");
        const oppName = document.getElementById("opponent-name-hud");
        if (oppAvatar) oppAvatar.textContent = boss.avatar;
        if (oppName) oppName.textContent = boss.bossName;

        // Inicia partida
        const btnStart = document.getElementById("btn-start-game");
        if (btnStart) btnStart.click();

        showToast(`🏰 Torre dos Magos: Enfrentando ${boss.bossName}!`);
      }, "towerBattleFloor_" + f);
    }
  });

  // Botão fechar modal de vitória da torre
  const btnCloseTowerVic = document.getElementById("btn-close-tower-victory");
  const towerVicModal = document.getElementById("tower-victory-modal");
  if (btnCloseTowerVic && towerVicModal) {
    bindAction(btnCloseTowerVic, () => {
      towerVicModal.classList.add("hidden");
      towerVicModal.style.removeProperty("display");
      const btnNavHome = document.getElementById("btn-nav-home");
      if (btnNavHome) btnNavHome.click();
    }, "closeTowerVicModal");
  }
}


// ==========================================================================
// 14. REPLAY DE PARTIDAS (NAVEGAÇÃO LANCE A LANCE)
// ==========================================================================
let _replayMoves = [];
let _replayIndex = 0;
let _isReplayActive = false;

function setupMatchReplay() {
  const replayBar = document.getElementById("replay-controller-bar");
  const btnCloseReplay = document.getElementById("btn-close-replay");
  const btnReplayStart = document.getElementById("btn-replay-start");
  const btnReplayPrev = document.getElementById("btn-replay-prev");
  const btnReplayNext = document.getElementById("btn-replay-next");
  const btnReplayEnd = document.getElementById("btn-replay-end");
  const replayStatus = document.getElementById("replay-move-status");
  const replaySan = document.getElementById("replay-current-san");

  function openReplay() {
    // Tenta obter histórico atual do chess.js ou salvo
    let moves = [];
    if (window._WIZARD_GAME && typeof window._WIZARD_GAME.getChess === "function") {
      const chess = window._WIZARD_GAME.getChess();
      if (chess && typeof chess.history === "function") {
        moves = chess.history({ verbose: true });
      }
    }
    if (!moves || moves.length === 0) {
      try {
        const raw = localStorage.getItem("wizard_chess_last_match_history");
        if (raw) moves = JSON.parse(raw);
      } catch (e) {}
    }

    if (!moves || moves.length === 0) {
      showToast("Nenhum lance registrado para rever nesta partida.");
      return;
    }

    _replayMoves = moves;
    _replayIndex = moves.length;
    _isReplayActive = true;

    // Fecha modais de fim de jogo ou pausa se abertos
    const gameOverModal = document.getElementById("game-over-modal");
    if (gameOverModal) { gameOverModal.classList.add("hidden"); gameOverModal.style.removeProperty("display"); }
    const pauseModal = document.getElementById("pause-modal");
    if (pauseModal) { pauseModal.classList.add("hidden"); pauseModal.style.removeProperty("display"); }

    if (replayBar) {
      replayBar.classList.remove("hidden");
      replayBar.style.setProperty("display", "flex", "important");
    }

    updateReplayView();
    showToast("🎬 Modo Replay ativado! Use as setas para rever cada lance.");
  }

  function updateReplayView() {
    const total = _replayMoves.length;
    if (replayStatus) {
      replayStatus.textContent = `Lance ${_replayIndex} de ${total}`;
    }
    if (replaySan) {
      if (_replayIndex === 0) {
        replaySan.textContent = "Posição Inicial";
      } else {
        const m = _replayMoves[_replayIndex - 1];
        const pieceSymbol = m.piece ? m.piece.toUpperCase() : "";
        replaySan.textContent = `${m.color === 'w' ? '⚪' : '⚫'} ${pieceSymbol}${m.san || (m.from + '-' + m.to)}`;
      }
    }
  }

  function closeReplay() {
    _isReplayActive = false;
    if (replayBar) {
      replayBar.classList.add("hidden");
      replayBar.style.removeProperty("display");
    }
  }

  // Vincular botões
  const btnGameOverReplay = document.getElementById("btn-game-over-replay");
  if (btnGameOverReplay) bindAction(btnGameOverReplay, openReplay, "openReplayGameOver");

  const btnPauseReplay = document.getElementById("btn-pause-replay");
  if (btnPauseReplay) bindAction(btnPauseReplay, openReplay, "openReplayPause");

  const btnDockReplay = document.getElementById("btn-dock-replay");
  if (btnDockReplay) bindAction(btnDockReplay, openReplay, "openReplayDock");

  if (btnCloseReplay) bindAction(btnCloseReplay, closeReplay, "closeReplayBar");

  if (btnReplayStart) {
    bindAction(btnReplayStart, () => {
      _replayIndex = 0;
      updateReplayView();
    }, "replayStart");
  }

  if (btnReplayPrev) {
    bindAction(btnReplayPrev, () => {
      if (_replayIndex > 0) {
        _replayIndex--;
        updateReplayView();
      }
    }, "replayPrev");
  }

  if (btnReplayNext) {
    bindAction(btnReplayNext, () => {
      if (_replayIndex < _replayMoves.length) {
        _replayIndex++;
        updateReplayView();
      }
    }, "replayNext");
  }

  if (btnReplayEnd) {
    bindAction(btnReplayEnd, () => {
      _replayIndex = _replayMoves.length;
      updateReplayView();
    }, "replayEnd");
  }
}


// ==========================================================================
// 15. ANIMAÇÕES ÉPICAS DE COMBATE MÁGICO (SEM VIBRAÇÃO)
// ==========================================================================
function setupEpicCombatAnimations() {
  // Salva lances no fim de cada partida para o Replay
  const origHandleRewards = handleGameOverRewards;
  handleGameOverRewards = function(data) {
    try {
      if (window._WIZARD_GAME && typeof window._WIZARD_GAME.getChess === "function") {
        const chess = window._WIZARD_GAME.getChess();
        if (chess && typeof chess.history === "function") {
          const hist = chess.history({ verbose: true });
          if (hist && hist.length > 0) {
            localStorage.setItem("wizard_chess_last_match_history", JSON.stringify(hist));
          }
        }
      }
    } catch (e) {}

    // Verifica se venceu um Boss da Torre dos Magos
    if (window._ACTIVE_TOWER_BOSS && data && (data.winner === "Mármore" || data.winner === "w" || data.winner === "white")) {
      const boss = window._ACTIVE_TOWER_BOSS;
      const currentFloor = getTowerFloor();

      addPlayerCoins(boss.coins);
      addXP(boss.xp, `Vitória sobre ${boss.bossName}`);

      if (boss.floor === currentFloor && currentFloor < 5) {
        localStorage.setItem("wizard_chess_tower_floor", currentFloor + 1);
      }

      if (boss.floor === 5) {
        unlockAchievement("tower_master");
      }

      const towerVicModal = document.getElementById("tower-victory-modal");
      const bossNameEl = document.getElementById("tower-victory-boss-name");
      const coinsEl = document.getElementById("tower-victory-reward-coins");
      const xpEl = document.getElementById("tower-victory-reward-xp");

      if (bossNameEl) bossNameEl.textContent = `Você derrotou ${boss.bossName} no ${boss.name}!`;
      if (coinsEl) coinsEl.textContent = `+${boss.coins} 🪙 Moedas Arcanas`;
      if (xpEl) xpEl.textContent = `+${boss.xp} XP Mágico`;

      if (towerVicModal) {
        towerVicModal.classList.remove("hidden");
        towerVicModal.style.setProperty("display", "flex", "important");
      }

      updateTowerCampaignUI();
      window._ACTIVE_TOWER_BOSS = null;
    }

    origHandleRewards(data);
  };
}


// ==========================================================================
// 16. ADAPTAÇÃO WEB: ATALHOS DE TECLADO & SUPORTE A NAVEGADORES PC
// ==========================================================================
function setupWebShortcutsAndAdaptations() {
  const isNative = typeof window.Capacitor !== "undefined" && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();

  // Se estiver no aplicativo nativo, oculta o botão de baixar APK
  if (isNative) {
    const btnDownload = document.getElementById("btn-web-download-apk");
    if (btnDownload) btnDownload.style.display = "none";
  }

  // Modal de Atalhos de Teclado
  const modalShortcuts = document.getElementById("keyboard-shortcuts-modal");
  const btnOpenShortcuts = document.getElementById("btn-web-keyboard-help");
  const btnCloseShortcuts = document.getElementById("btn-close-keyboard-shortcuts");
  const btnGotShortcuts = document.getElementById("btn-got-shortcuts");

  const openShortcutsModal = () => {
    if (modalShortcuts) {
      modalShortcuts.classList.remove("hidden");
      modalShortcuts.style.setProperty("display", "flex", "important");
    }
  };

  const closeShortcutsModal = () => {
    if (modalShortcuts) {
      modalShortcuts.classList.add("hidden");
      modalShortcuts.style.removeProperty("display");
    }
  };

  if (btnOpenShortcuts) bindAction(btnOpenShortcuts, openShortcutsModal, "openKeyboardHelp");
  if (btnCloseShortcuts) bindAction(btnCloseShortcuts, closeShortcutsModal, "closeKeyboardHelp");
  if (btnGotShortcuts) bindAction(btnGotShortcuts, closeShortcutsModal, "gotKeyboardHelp");

  // Escuta Global de Teclado no Navegador
  window.addEventListener("keydown", (e) => {
    // Ignora quando digitando em inputs
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
      return;
    }

    const key = e.key;
    const code = e.code;

    // 1. Espaço ou Esc: Pausar / Fechar Modais
    if (code === "Space" || key === "Escape") {
      const activeModal = document.querySelector(".modal-overlay:not(.hidden):not(#start-menu)");
      if (activeModal) {
        if (e.preventDefault) e.preventDefault();
        activeModal.classList.add("hidden");
        activeModal.style.removeProperty("display");
        return;
      }

      // Se em jogo, abre/fecha o menu de pausa
      const startMenu = document.getElementById("start-menu");
      if (startMenu && startMenu.classList.contains("hidden")) {
        if (e.preventDefault) e.preventDefault();
        const pauseModal = document.getElementById("pause-modal");
        if (pauseModal) {
          const isPaused = !pauseModal.classList.contains("hidden");
          if (isPaused) {
            pauseModal.classList.add("hidden");
            pauseModal.style.removeProperty("display");
          } else {
            pauseModal.classList.remove("hidden");
            pauseModal.style.setProperty("display", "flex", "important");
          }
        }
      }
      return;
    }

    // 2. F ou F11: Tela Cheia
    if (key === "f" || key === "F") {
      if (e.ctrlKey || e.metaKey) return;
      if (e.preventDefault) e.preventDefault();
      const btnFs = document.getElementById("btn-fullscreen");
      if (btnFs) btnFs.click();
      return;
    }

    // 3. H ou D: Dica do Oráculo Arcano
    if (key === "h" || key === "H" || key === "d" || key === "D") {
      if (e.ctrlKey || e.metaKey) return;
      const btnHint = document.getElementById("btn-hint");
      if (btnHint) btnHint.click();
      return;
    }

    // 4. C: Trocar Câmera 3D
    if (key === "c" || key === "C") {
      if (e.ctrlKey || e.metaKey) return;
      const btnCam = document.getElementById("btn-cam");
      if (btnCam) btnCam.click();
      return;
    }

    // 5. M: Alternar Música
    if (key === "m" || key === "M") {
      if (e.ctrlKey || e.metaKey) return;
      const btnMusic = document.getElementById("btn-music");
      const btnMenuAudio = document.getElementById("btn-menu-sound-toggle");
      if (btnMusic) btnMusic.click();
      else if (btnMenuAudio) btnMenuAudio.click();
      return;
    }

    // 6. Z ou Ctrl+Z: Desfazer Lance
    if ((key === "z" || key === "Z") && !e.shiftKey) {
      const btnUndo = document.getElementById("btn-undo");
      if (btnUndo && !btnUndo.classList.contains("hidden")) {
        btnUndo.click();
      } else if (window._WIZARD_GAME && typeof window._WIZARD_GAME.undoMove === "function") {
        window._WIZARD_GAME.undoMove();
      }
      return;
    }

    // 7. R: Reiniciar Jogo
    if (key === "r" || key === "R") {
      if (e.ctrlKey || e.metaKey) return;
      const startMenu = document.getElementById("start-menu");
      if (startMenu && startMenu.classList.contains("hidden")) {
        const btnReset = document.getElementById("btn-reset");
        if (btnReset) btnReset.click();
      }
      return;
    }

    // 8. Setas no Modo Replay
    if (key === "ArrowLeft") {
      const btnPrev = document.getElementById("btn-replay-prev");
      if (btnPrev && btnPrev.offsetParent !== null) btnPrev.click();
    } else if (key === "ArrowRight") {
      const btnNext = document.getElementById("btn-replay-next");
      if (btnNext && btnNext.offsetParent !== null) btnNext.click();
    }
  });
}


// ==========================================================================
// 17. GOOGLE ADMOB: MONETIZAÇÃO NATIVA NO CELULAR (BANNER, INTERSTICIAL E VÍDEO)
// ==========================================================================
const ADMOB_CONFIG = {
  appId: "ca-app-pub-7015126547268342~9383206931",
  bannerId: "ca-app-pub-7015126547268342/5547903709",
  interstitialId: "ca-app-pub-7015126547268342/6459202681",
  rewardedId: "ca-app-pub-7015126547268342/6628603973"
};

let _isAdMobReady = false;

async function setupAdMobManager() {
  const isNative = typeof window.Capacitor !== "undefined" && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
  const admob = window.Capacitor && window.Capacitor.Plugins ? window.Capacitor.Plugins.AdMob : null;

  if (isNative && admob) {
    try {
      await admob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: []
      });
      _isAdMobReady = true;
      console.log("[AdMob] Inicializado com sucesso!");

      // 1. Exibir Banner Principal no Rodapé
      try {
        await admob.showBanner({
          adId: ADMOB_CONFIG.bannerId,
          adSize: "BANNER",
          position: "BOTTOM_CENTER",
          margin: 0
        });
        console.log("[AdMob] Banner principal carregado.");
      } catch (bannerErr) {
        console.warn("[AdMob] Erro ao exibir banner:", bannerErr);
      }

      // 2. Pré-carregar Intersticial de Fim de Jogo
      try {
        await admob.prepareInterstitial({
          adId: ADMOB_CONFIG.interstitialId
        });
        console.log("[AdMob] Intersticial de fim de jogo pré-carregado.");
      } catch (intErr) {
        console.warn("[AdMob] Erro ao preparar intersticial:", intErr);
      }

      // 3. Pré-carregar Vídeo Recompensado
      try {
        await admob.prepareRewardVideoAd({
          adId: ADMOB_CONFIG.rewardedId
        });
        console.log("[AdMob] Vídeo recompensado pré-carregado.");
      } catch (rewErr) {
        console.warn("[AdMob] Erro ao preparar vídeo recompensado:", rewErr);
      }
    } catch (initErr) {
      console.warn("[AdMob] Erro ao inicializar AdMob:", initErr);
    }
  }

  // Vincular botão de assistir vídeo para ganhar moedas
  const btnWatchVideo = document.getElementById("btn-watch-ad-for-coins");
  if (btnWatchVideo) {
    bindAction(btnWatchVideo, async () => {
      if (isNative && admob && _isAdMobReady) {
        try {
          showToast("📺 Carregando vídeo de recompensa...");
          await admob.showRewardVideoAd();
          addPlayerCoins(200, "Vídeo Recompensado");
          updateCoinsUI();
          showToast("🎉 Parabéns! Você ganhou +200 Moedas Arcanas!");
          // Pré-carrega o próximo
          try { await admob.prepareRewardVideoAd({ adId: ADMOB_CONFIG.rewardedId }); } catch(e){}
        } catch (err) {
          showToast("📺 Anúncio não disponível no momento. Tente novamente mais tarde!");
          try { await admob.prepareRewardVideoAd({ adId: ADMOB_CONFIG.rewardedId }); } catch(e){}
        }
      } else {
        // No navegador web ou enquanto o anúncio não for liberado
        showToast("📺 Anúncio não disponível no momento. Tente novamente mais tarde!");
      }
    }, "watchVideoAdCoins");
  }

  // Exibir intersticial ao clicar em Jogar Novamente ou ao concluir partida
  const btnPlayAgain = document.getElementById("btn-play-again");
  if (btnPlayAgain && isNative && admob) {
    btnPlayAgain.addEventListener("click", async () => {
      try {
        if (_isAdMobReady) {
          await admob.showInterstitial();
          try { await admob.prepareInterstitial({ adId: ADMOB_CONFIG.interstitialId }); } catch(e){}
        }
      } catch (e) {}
    });
  }
}


// ============================================================================
// RECURSO 4: SISTEMA DE ÁUDIO & EFEITOS SONOROS ARCANOS (WEB AUDIO API)
// ============================================================================
const ArcaneAudio = {
  ctx: null,
  soundEnabled: true,
  musicEnabled: false,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    try {
      const savedSound = localStorage.getItem("wizard_chess_sfx_enabled");
      if (savedSound !== null) this.soundEnabled = savedSound === "true";
      const savedMusic = localStorage.getItem("wizard_chess_music_enabled");
      if (savedMusic !== null) this.musicEnabled = savedMusic === "true";
    } catch(e) {}
    this.updateUI();
  },

  playMoveSound(pieceType) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    switch(pieceType ? pieceType.toLowerCase() : 'p') {
      case 'n': // Cavalo: Galope rúnico duplo
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(480, t + 0.08);
        osc.frequency.exponentialRampToValueAtTime(240, t + 0.18);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        break;
      case 'b': // Bispo: Rajada ascendente harmônica
        osc.type = "triangle";
        osc.frequency.setValueAtTime(392, t);
        osc.frequency.linearRampToValueAtTime(587, t + 0.14);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
        break;
      case 'r': // Torre: Sino de pedra místico
        osc.type = "triangle";
        osc.frequency.setValueAtTime(164.8, t);
        osc.frequency.exponentialRampToValueAtTime(82.4, t + 0.35);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
        break;
      case 'q': // Rainha: Acorde brilhante de cristal
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, t);
        osc.frequency.linearRampToValueAtTime(1046.5, t + 0.18);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        break;
      case 'k': // Rei: Tom solene ancestral
        osc.type = "sine";
        osc.frequency.setValueAtTime(130.8, t);
        osc.frequency.exponentialRampToValueAtTime(65.4, t + 0.4);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
        break;
      default: // Peão: Toque de pedra rúnico
        osc.type = "sine";
        osc.frequency.setValueAtTime(261.6, t);
        osc.frequency.exponentialRampToValueAtTime(130.8, t + 0.1);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        break;
    }

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, t);
    osc.connect(filter).connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.5);
  },

  playCheckAlarm() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [220, 293.66, 440].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.05);
      gain.gain.setValueAtTime(0.18, t + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.45);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(t + idx * 0.05);
      osc.stop(t + idx * 0.05 + 0.5);
    });
  },

  playVictoryChimes() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const start = t + idx * 0.09;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 1.3);
    });
  },

  playQuestRewardChime() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const start = t + idx * 0.06;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.7);
    });
  },

  playTensionTick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  },

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    try { localStorage.setItem("wizard_chess_sfx_enabled", this.soundEnabled); } catch(e){}
    this.updateUI();
    showToast(this.soundEnabled ? "🔊 Efeitos sonoros ativados" : "🔇 Efeitos sonoros silenciados");
  },

  toggleMusic() {
    this.init();
    if (window._WIZARD_GAME && window._WIZARD_GAME.toggleMusic) {
      this.musicEnabled = window._WIZARD_GAME.toggleMusic();
    } else {
      this.musicEnabled = !this.musicEnabled;
    }
    try { localStorage.setItem("wizard_chess_music_enabled", this.musicEnabled); } catch(e){}
    this.updateUI();
    showToast(this.musicEnabled ? "🎶 Música Arcana iniciada" : "🔇 Música pausada");
  },

  playSpellCaptureBoom(arena) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    try {
      // Subwoofer boom
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(140, t);
      subOsc.frequency.exponentialRampToValueAtTime(30, t + 0.45);
      subGain.gain.setValueAtTime(0.5, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(t);
      subOsc.stop(t + 0.5);

      // High magic crackle
      const crackOsc = this.ctx.createOscillator();
      const crackGain = this.ctx.createGain();
      crackOsc.type = (arena === 'inferno' || arena === 'abyss') ? "sawtooth" : "triangle";
      crackOsc.frequency.setValueAtTime(540, t);
      crackOsc.frequency.exponentialRampToValueAtTime(160, t + 0.25);
      crackGain.gain.setValueAtTime(0.35, t);
      crackGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      crackOsc.connect(crackGain);
      crackGain.connect(this.ctx.destination);
      crackOsc.start(t);
      crackOsc.stop(t + 0.3);
    } catch(e) {}
  },

  playPuzzleSuccessChime() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    try {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + idx * 0.07);
        gain.gain.setValueAtTime(0.18, t + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.07);
        osc.stop(t + idx * 0.07 + 0.3);
      });
    } catch(e) {}
  },

  updateUI() {
    const hudSoundBtn = document.getElementById("btn-hud-sound-toggle");
    const hudSoundIcon = document.getElementById("icon-hud-sound");
    if (hudSoundBtn) {
      hudSoundBtn.classList.toggle("active", this.soundEnabled);
      if (hudSoundIcon) hudSoundIcon.textContent = this.soundEnabled ? "volume_up" : "volume_off";
    }

    const hudMusicBtn = document.getElementById("btn-hud-music-toggle");
    const hudMusicIcon = document.getElementById("icon-hud-music");
    if (hudMusicBtn) {
      hudMusicBtn.classList.toggle("active", this.musicEnabled);
      if (hudMusicIcon) hudMusicIcon.textContent = this.musicEnabled ? "music_note" : "music_off";
    }

    const btnSoundSet = document.getElementById("btn-toggle-sound-setting");
    const iconSoundSet = document.getElementById("icon-sound-status");
    if (btnSoundSet) {
      btnSoundSet.classList.toggle("active", this.soundEnabled);
      const span = btnSoundSet.querySelector("span");
      if (span) span.textContent = this.soundEnabled ? "Ativado" : "Desativado";
      if (iconSoundSet) iconSoundSet.textContent = this.soundEnabled ? "volume_up" : "volume_off";
    }

    const btnMusicSet = document.getElementById("btn-toggle-music-setting");
    const iconMusicSet = document.getElementById("icon-music-status");
    if (btnMusicSet) {
      btnMusicSet.classList.toggle("active", this.musicEnabled);
      const span = btnMusicSet.querySelector("span");
      if (span) span.textContent = this.musicEnabled ? "Tocando" : "Pausada";
      if (iconMusicSet) iconMusicSet.textContent = this.musicEnabled ? "music_note" : "music_off";
    }
  }
};
window._WIZARD_AUDIO = ArcaneAudio;

function setupArcaneAudio() {
  ArcaneAudio.init();

  const hudSoundBtn = document.getElementById("btn-hud-sound-toggle");
  if (hudSoundBtn) {
    bindAction(hudSoundBtn, () => ArcaneAudio.toggleSound(), "hudSoundToggle");
  }

  const hudMusicBtn = document.getElementById("btn-hud-music-toggle");
  if (hudMusicBtn) {
    bindAction(hudMusicBtn, () => ArcaneAudio.toggleMusic(), "hudMusicToggle");
  }

  const btnSoundSet = document.getElementById("btn-toggle-sound-setting");
  if (btnSoundSet) {
    bindAction(btnSoundSet, () => ArcaneAudio.toggleSound(), "settingSoundToggle");
  }

  const btnMusicSet = document.getElementById("btn-toggle-music-setting");
  if (btnMusicSet) {
    bindAction(btnMusicSet, () => ArcaneAudio.toggleMusic(), "settingMusicToggle");
  }
}

// ============================================================================
// RECURSO 5: MISSÕES DIÁRIAS DO GRIMÓRIO & PASSE DO MAGO (DAILY QUESTS)
// ============================================================================
const WizardQuests = {
  getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  getData() {
    const today = this.getTodayKey();
    const key = `wizard_quests_${today}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return {
      date: today,
      captures: { current: 0, target: 8, rewardCoins: 120, rewardXP: 80, collected: false },
      win: { current: 0, target: 1, rewardCoins: 100, rewardXP: 70, collected: false },
      puzzle: { current: 0, target: 1, rewardCoins: 80, rewardXP: 60, collected: false }
    };
  },

  saveData(data) {
    const today = this.getTodayKey();
    try { localStorage.setItem(`wizard_quests_${today}`, JSON.stringify(data)); } catch(e) {}
    this.updateUI();
  },

  onPieceCaptured() {
    const data = this.getData();
    if (data.captures.current < data.captures.target) {
      data.captures.current++;
      this.saveData(data);
    }
  },

  onMatchWon() {
    const data = this.getData();
    if (data.win.current < data.win.target) {
      data.win.current++;
      this.saveData(data);
    }
  },

  onPuzzleSolved() {
    const data = this.getData();
    if (data.puzzle.current < data.puzzle.target) {
      data.puzzle.current++;
      this.saveData(data);
    }
  },

  collectReward(questKey) {
    const data = this.getData();
    const q = data[questKey];
    if (!q || q.collected || q.current < q.target) return;

    q.collected = true;
    this.saveData(data);

    addPlayerCoins(q.rewardCoins, "Missão Diária Concluída");
    addXP(q.rewardXP, "Missão Diária Concluída");
    ArcaneAudio.playQuestRewardChime();
    showAchievementToast("📜 MISSÃO CONCLUÍDA!", `+${q.rewardCoins} 🪙 e +${q.rewardXP} ⭐ recebidos!`, "✨");
    this.updateUI();
  },

  updateUI() {
    const data = this.getData();

    // 1. Captures
    const pCap = Math.min(100, Math.round((data.captures.current / data.captures.target) * 100));
    const fillCap = document.getElementById("quest-progress-captures");
    const lblCap = document.getElementById("quest-label-captures");
    const btnCap = document.getElementById("btn-collect-quest-captures");
    const itemCap = document.getElementById("quest-item-captures");
    if (fillCap) fillCap.style.width = `${pCap}%`;
    if (lblCap) lblCap.textContent = `Capture 8 peças em batalha (${data.captures.current}/${data.captures.target})`;
    if (btnCap) {
      if (data.captures.collected) {
        btnCap.textContent = "✓ Coletado";
        btnCap.disabled = true;
        if (itemCap) itemCap.classList.add("completed");
      } else if (data.captures.current >= data.captures.target) {
        btnCap.textContent = "Coletar!";
        btnCap.disabled = false;
        if (itemCap) itemCap.classList.add("completed");
      } else {
        btnCap.textContent = "Em andamento";
        btnCap.disabled = true;
        if (itemCap) itemCap.classList.remove("completed");
      }
    }

    // 2. Win
    const pWin = Math.min(100, Math.round((data.win.current / data.win.target) * 100));
    const fillWin = document.getElementById("quest-progress-win");
    const lblWin = document.getElementById("quest-label-win");
    const btnWin = document.getElementById("btn-collect-quest-win");
    const itemWin = document.getElementById("quest-item-win");
    if (fillWin) fillWin.style.width = `${pWin}%`;
    if (lblWin) lblWin.textContent = `Vença 1 partida no modo IA ou Torre (${data.win.current}/${data.win.target})`;
    if (btnWin) {
      if (data.win.collected) {
        btnWin.textContent = "✓ Coletado";
        btnWin.disabled = true;
        if (itemWin) itemWin.classList.add("completed");
      } else if (data.win.current >= data.win.target) {
        btnWin.textContent = "Coletar!";
        btnWin.disabled = false;
        if (itemWin) itemWin.classList.add("completed");
      } else {
        btnWin.textContent = "Em andamento";
        btnWin.disabled = true;
        if (itemWin) itemWin.classList.remove("completed");
      }
    }

    // 3. Puzzle
    const pPuz = Math.min(100, Math.round((data.puzzle.current / data.puzzle.target) * 100));
    const fillPuz = document.getElementById("quest-progress-puzzle");
    const lblPuz = document.getElementById("quest-label-puzzle");
    const btnPuz = document.getElementById("btn-collect-quest-puzzle");
    const itemPuz = document.getElementById("quest-item-puzzle");
    if (fillPuz) fillPuz.style.width = `${pPuz}%`;
    if (lblPuz) lblPuz.textContent = `Resolva 1 Enigma Tático (${data.puzzle.current}/${data.puzzle.target})`;
    if (btnPuz) {
      if (data.puzzle.collected) {
        btnPuz.textContent = "✓ Coletado";
        btnPuz.disabled = true;
        if (itemPuz) itemPuz.classList.add("completed");
      } else if (data.puzzle.current >= data.puzzle.target) {
        btnPuz.textContent = "Coletar!";
        btnPuz.disabled = false;
        if (itemPuz) itemPuz.classList.add("completed");
      } else {
        btnPuz.textContent = "Em andamento";
        btnPuz.disabled = true;
        if (itemPuz) itemPuz.classList.remove("completed");
      }
    }
  }
};
window._WIZARD_QUESTS = WizardQuests;

function setupDailyQuests() {
  WizardQuests.updateUI();

  // Botão "Missões Diárias" no cabeçalho inicial
  const btnTopQuests = document.getElementById("btn-web-daily-quests");
  if (btnTopQuests) {
    bindAction(btnTopQuests, () => {
      const btnNav = document.getElementById("btn-nav-challenges");
      if (btnNav) {
        btnNav.click();
      } else if (typeof window._switchSubView === "function") {
        window._switchSubView("challenges");
      }
      setTimeout(() => {
        const qEl = document.getElementById("daily-quests-container");
        if (qEl) qEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      showToast("📜 Missões Diárias do Grimório");
    }, "openTopDailyQuests");
  }

  const btnCap = document.getElementById("btn-collect-quest-captures");
  if (btnCap) bindAction(btnCap, () => WizardQuests.collectReward("captures"), "collectQuestCaptures");

  const btnWin = document.getElementById("btn-collect-quest-win");
  if (btnWin) bindAction(btnWin, () => WizardQuests.collectReward("win"), "collectQuestWin");

  const btnPuz = document.getElementById("btn-collect-quest-puzzle");
  if (btnPuz) bindAction(btnPuz, () => WizardQuests.collectReward("puzzle"), "collectQuestPuzzle");
}

// ============================================================================
// RECURSO 3: GRIMÓRIO DE ENIGMAS TÁTICOS & PUZZLES DIÁRIOS
// ============================================================================
const TACTICAL_PUZZLES_DATA = [
  {
    id: "puzzle_1",
    title: "1. O Pastor Sagrado",
    difficulty: "Iniciante",
    desc: "A Rainha e o Bispo avançam em harmonia para aplicar o clássico xeque-mate em 1 lance em f7.",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
    arena: "cathedral",
    level: 0,
    rewardCoins: 80,
    rewardXP: 50
  },
  {
    id: "puzzle_2",
    title: "2. O Corredor de Pedra",
    difficulty: "Fácil",
    desc: "Os próprios peões negros trancam a fuga do Rei. A Torre de Mármore sela a passagem.",
    fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    arena: "cathedral",
    level: 1,
    rewardCoins: 100,
    rewardXP: 60
  },
  {
    id: "puzzle_3",
    title: "3. O Salto Noturno",
    difficulty: "Médio",
    desc: "O Cavalo Arcano executa um salto decisivo desestabilizando o centro adversário.",
    fen: "r1b1kb1r/pppp1ppp/5n2/4q3/4N3/8/PPPPPPPP/R1BQKB1R w KQkq - 0 1",
    arena: "forest",
    level: 0,
    rewardCoins: 120,
    rewardXP: 80
  },
  {
    id: "puzzle_4",
    title: "4. A Emboscada dos Bispos",
    difficulty: "Médio",
    desc: "Dois bispos cortam as diagonais reais para encurralar o monarca de obsidiana.",
    fen: "r1b2rk1/ppp2ppp/8/4B3/8/8/PPP2PPP/R2R2K1 w - - 0 1",
    arena: "frost",
    level: 0,
    rewardCoins: 130,
    rewardXP: 90
  },
  {
    id: "puzzle_5",
    title: "5. O Sacrifício Real",
    difficulty: "Difícil",
    desc: "Entregue sua peça mais poderosa para quebrar as defesas e forçar o xeque-mate imparável.",
    fen: "r1b2r1k/pp3ppp/2n1p3/3q4/3P4/3B1N2/PP1Q1PPP/R3K2R w KQ - 0 1",
    arena: "abyss",
    level: 0,
    rewardCoins: 150,
    rewardXP: 100
  },
  {
    id: "puzzle_6",
    title: "6. O Vórtice Cósmico",
    difficulty: "Mestre",
    desc: "Uma combinação magistral de arremate cósmico inspirada nos maiores mestres mundiais.",
    fen: "2r3k1/5ppp/8/8/8/5Q2/5PPP/6K1 w - - 0 1",
    arena: "cosmos",
    level: 0,
    rewardCoins: 180,
    rewardXP: 120
  }
];

function isPuzzleSolved(id) {
  try {
    return localStorage.getItem("wizard_puzzle_solved_" + id) === "true";
  } catch(e) {
    return false;
  }
}

function setPuzzleSolved(id) {
  try {
    localStorage.setItem("wizard_puzzle_solved_" + id, "true");
  } catch(e) {}
}

function updateTacticalPuzzlesUI() {
  document.querySelectorAll("#tactical-puzzles-grid .puzzle-item-card[data-puzzle-id]").forEach(card => {
    const id = card.dataset.puzzleId;
    const isSolved = isPuzzleSolved(id);
    const btn = card.querySelector(".btn-solve-puzzle");
    card.classList.toggle("solved", isSolved);
    if (btn) {
      if (isSolved) {
        btn.textContent = "✓ Resolvido";
        btn.style.color = "#00f5d4";
      } else {
        btn.textContent = "Resolver";
        btn.style.color = "#ffffff";
      }
    }
  });

  // Atualiza Desafio Diário
  const todayKey = WizardQuests.getTodayKey();
  const dailyCompleted = localStorage.getItem(`wizard_daily_challenge_completed_${todayKey}`) === "true";
  const dailyBtn = document.getElementById("btn-play-daily-challenge");
  const dailyStatus = document.getElementById("daily-status-text");
  if (dailyStatus) {
    dailyStatus.textContent = dailyCompleted ? "Concluído Hoje ✓ (+100 XP obtido)" : "Disponível para jogar hoje";
    dailyStatus.style.color = dailyCompleted ? "#ffd700" : "#00f5d4";
  }
  if (dailyBtn) {
    const lbl = dailyBtn.querySelector("span:first-child");
    if (lbl) lbl.textContent = dailyCompleted ? "Jogar Novamente" : "Jogar Desafio Diário";
  }
}

function launchSpecificPuzzle(puzzleId) {
  const p = TACTICAL_PUZZLES_DATA.find(x => x.id === puzzleId) || TACTICAL_PUZZLES_DATA[0];
  showToast(`🧩 Carregando Enigma: ${p.title}`);

  // Fecha menus
  const overlay = document.getElementById("main-menu-overlay");
  if (overlay) overlay.classList.add("hidden");

  // Muda de arena e carrega o puzzle
  try {
    if (window._WIZARD_GAME) {
      if (window._WIZARD_GAME.setArena) window._WIZARD_GAME.setArena(p.arena);
      if (window._WIZARD_GAME.loadPuzzle) {
        window._WIZARD_GAME.loadPuzzle(p.arena, p.level || 0);
      }
    }
  } catch(e) {}
}

function setupTacticalPuzzles() {
  updateTacticalPuzzlesUI();

  // Binds nos botões "Resolver" dos puzzles
  document.querySelectorAll("#tactical-puzzles-grid .btn-solve-puzzle[data-puzzle-id]").forEach(btn => {
    bindAction(btn, () => {
      launchSpecificPuzzle(btn.dataset.puzzleId);
    }, "solvePuzzle_" + btn.dataset.puzzleId);
  });

  // Botão Desafio Diário
  const dailyBtn = document.getElementById("btn-play-daily-challenge");
  if (dailyBtn) {
    bindAction(dailyBtn, () => {
      // Escolhe um puzzle baseado no dia
      const d = new Date();
      const idx = (d.getFullYear() * 365 + d.getMonth() * 31 + d.getDate()) % TACTICAL_PUZZLES_DATA.length;
      launchSpecificPuzzle(TACTICAL_PUZZLES_DATA[idx].id);
    }, "playDailyChallengeBtn");
  }

  // Desafio Rápido
  const btnFastPuzzle = document.getElementById("btn-launch-random-puzzle");
  if (btnFastPuzzle) {
    bindAction(btnFastPuzzle, () => {
      const idx = Math.floor(Math.random() * TACTICAL_PUZZLES_DATA.length);
      launchSpecificPuzzle(TACTICAL_PUZZLES_DATA[idx].id);
    }, "fastPuzzleBtn");
  }
}


// ==============================================================
// V1.5.0: CAMPANHA DOS ARQUIMAGOS (CHEFES COM DIÁLOGOS EM TEMPO REAL)
// ==============================================================
const CAMPAIGN_BOSSES = [
  {
    id: 1,
    name: "Ignis, o Piromante",
    title: "Capítulo I • Fácil",
    arena: "inferno",
    diff: 1,
    avatar: "🔥",
    rewardCoins: 150,
    rewardXp: 100,
    rewardTitle: "Domador de Chamas",
    skin: "ruby",
    lines: {
      start: "Que o fogo dos deuses consuma o seu rei!",
      capture: "Queimado até as cinzas!",
      lossPiece: "Uma faísca se foi, mas o fogo ainda queima!",
      check: "Seu rei está cercado pelas chamas do inferno!",
      win: "Minhas chamas foram apagadas... você lutou com honra!",
      defeat: "Cinzas às cinzas. O fogo é impiedoso!"
    }
  },
  {
    id: 2,
    name: "Morgana, a Ilusionista",
    title: "Capítulo II • Médio",
    arena: "abyss",
    diff: 2,
    avatar: "👁️",
    rewardCoins: 250,
    rewardXp: 150,
    rewardTitle: "Vidente Arcano",
    skin: "spectral",
    lines: {
      start: "Nem tudo o que você vê no tabuleiro é real...",
      capture: "Uma mera ilusão se desfazendo diante dos seus olhos.",
      lossPiece: "Você enxergou através da minha miragem?!",
      check: "As sombras fecham o cerco. Não há como escapar!",
      win: "Sua mente é mais afiada que meus labirintos...",
      defeat: "Você perdeu-se para sempre no meu reflexo sombrio."
    }
  },
  {
    id: 3,
    name: "Chronos, o Guardião do Tempo",
    title: "Capítulo III • Difícil",
    arena: "desert",
    diff: 3,
    avatar: "⏳",
    rewardCoins: 400,
    rewardXp: 250,
    rewardTitle: "Mestre do Tempo",
    skin: "celestial",
    lines: {
      start: "O tempo é um rio, e o seu desfecho já foi traçado.",
      capture: "O tempo cobra o seu preço inexorável.",
      lossPiece: "Um desvio inesperado na linha temporal... fascinante!",
      check: "Os ponteiros pararam. O fim se aproxima!",
      win: "Você derrotou o fluxo do próprio destino. Extraordinário!",
      defeat: "Mais uma alma esquecida nas areias da eternidade."
    }
  },
  {
    id: 4,
    name: "Malakor, o Rei Lich",
    title: "Chefe Final • Arquimago",
    arena: "cathedral",
    diff: 3,
    avatar: "💀",
    rewardCoins: 700,
    rewardXp: 500,
    rewardTitle: "Conquistador do Trono",
    skin: "cyber",
    lines: {
      start: "O Trono Arcano nunca pertencerá a um mero mortal!",
      capture: "Mais uma peça sacrificada ao vazio eterno!",
      lossPiece: "Impossível! Ninguém desafia o soberano das trevas!",
      check: "Curvar-se é a sua única salvação!",
      win: "Não... o Trono Arcano é seu! Você é o verdadeiro Grande Mestre!",
      defeat: "A escuridão eterna prevaleceu. Seu reinado acabou."
    }
  },
  {
    id: 5,
    name: "Zephyr, o Tecedor dos Ventos",
    title: "Capítulo V • Ágil",
    arena: "frost",
    diff: 2,
    avatar: "🌪️",
    rewardCoins: 450,
    rewardXp: 300,
    rewardTitle: "Lorde dos Ventos",
    skin: "amethyst",
    lines: {
      start: "Os ventos gélidos congelarão seus passos!",
      capture: "Levado pela tempestade sem deixar vestígios!",
      lossPiece: "Uma brisa cortada... mas o vendaval ainda ruge!",
      check: "O vórtice fecha ao redor do seu rei!",
      win: "Você quebrou o olho da tempestade com maestria...",
      defeat: "Congelado nas neves eternas do esquecimento."
    }
  },
  {
    id: 6,
    name: "Gólem de Granito Ancestral",
    title: "Capítulo VI • Rocha Impenetrável",
    arena: "forest",
    diff: 3,
    avatar: "🗿",
    rewardCoins: 600,
    rewardXp: 400,
    rewardTitle: "Titã Inabalável",
    skin: "emerald",
    lines: {
      start: "Pedra e raiz não quebram perante meros truques.",
      capture: "Esmagado pelo peso do granito milenar!",
      lossPiece: "Uma lasca de rocha que se desprende... inútil!",
      check: "As muralhas de pedra cercam seu monarca!",
      win: "A rocha mais resistente cedeu à sua precisão...",
      defeat: "Sepultado sob a montanha ancestral."
    }
  },
  {
    id: 7,
    name: "Sombra do Rei Esquecido",
    title: "Capítulo VII • Espectro Caído",
    arena: "abyss",
    diff: 3,
    avatar: "👤",
    rewardCoins: 750,
    rewardXp: 500,
    rewardTitle: "Lâmina Sombria",
    skin: "spectral",
    lines: {
      start: "Eu fui o primeiro a governar este tabuleiro...",
      capture: "Sua alma alimenta a eternidade do abismo!",
      lossPiece: "A escuridão absorve o golpe e retorna em dobro!",
      check: "O espectro da foice repousa sobre seu pescoço!",
      win: "Finalmente... minha alma descansa em paz...",
      defeat: "Seu nome será esquecido, assim como o meu foi."
    }
  },
  {
    id: 8,
    name: "Aethelgard, Arquimago do Espelho",
    title: "Chefe Supremo • Reino dos Espelhos",
    arena: "cosmos",
    diff: 3,
    avatar: "🪞",
    rewardCoins: 1200,
    rewardXp: 800,
    rewardTitle: "Soberano dos Titãs",
    skin: "gold",
    lines: {
      start: "Eu sou o espelho da sua alma e de cada lance que você ousar imaginar.",
      capture: "Seu próprio reflexo destruiu sua peça!",
      lossPiece: "Você quebrou um reflexo... mas os estilhaços ainda cortam!",
      check: "Xeque cósmico em todas as dimensões paralelas!",
      win: "Você transcendeu o infinito! O Trono Supremo dos Titãs é legitimamente seu!",
      defeat: "Aprisionado para sempre no labirinto dos espelhos."
    }
  }
];

let _activeCampaignBoss = null;
let _bossSpeechTimeout = null;

function showBossSpeech(text, avatar = "🧙‍♂️", name = "Chefe") {
  const hud = document.getElementById("boss-campaign-hud");
  const tEl = document.getElementById("boss-speech-text");
  const aEl = document.getElementById("boss-speech-avatar");
  const nEl = document.getElementById("boss-speech-name");
  if (!hud || !tEl) return;
  tEl.textContent = text;
  if (aEl) aEl.textContent = avatar;
  if (nEl) nEl.textContent = name;
  hud.classList.remove("hidden");
  clearTimeout(_bossSpeechTimeout);
  _bossSpeechTimeout = setTimeout(() => {
    hud.classList.add("hidden");
  }, 4800);
}

function getCampaignProgress() {
  try {
    const raw = localStorage.getItem("wizard_chess_campaign_progress");
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false };
}

function saveCampaignProgress(p) {
  try {
    localStorage.setItem("wizard_chess_campaign_progress", JSON.stringify(p));
  } catch(e) {}
}

window._switchCampaignWorld = function(w) {
  const w1 = document.getElementById("campaign-world-1-container");
  const w2 = document.getElementById("campaign-world-2-container");
  const b1 = document.getElementById("btn-world-1");
  const b2 = document.getElementById("btn-world-2");

  if (w === 1) {
    if (w1) w1.classList.remove("hidden");
    if (w2) w2.classList.add("hidden");
    if (b1) b1.classList.add("active");
    if (b2) b2.classList.remove("active");
  } else {
    if (w1) w1.classList.add("hidden");
    if (w2) w2.classList.remove("hidden");
    if (b1) b1.classList.remove("active");
    if (b2) b2.classList.add("active");
  }
};

function updateCampaignUI() {
  const progress = getCampaignProgress();
  CAMPAIGN_BOSSES.forEach(boss => {
    const card = document.getElementById("boss-card-" + boss.id);
    const btn = document.getElementById("btn-boss-challenge-" + boss.id);
    if (!card || !btn) return;

    // Boss 1 e Boss 5 são desbloqueados por padrão como início de seus mundos
    const isUnlocked = boss.id === 1 || boss.id === 5 || progress[boss.id - 1] === true;
    const isCompleted = progress[boss.id] === true;

    card.classList.toggle("boss-completed", isCompleted);
    card.classList.toggle("boss-locked", !isUnlocked);

    if (isCompleted) {
      btn.innerHTML = "👑 Vitória Conquistada (Repetir)";
      btn.style.background = "linear-gradient(135deg, #00b4d8, #0077b6)";
      btn.disabled = false;
    } else if (!isUnlocked) {
      btn.innerHTML = "🔒 Bloqueado";
      btn.disabled = true;
    } else {
      btn.innerHTML = boss.id === 4 ? "👑 Duelo Final" : "⚔️ Desafiar Mago";
      btn.style.background = "";
      btn.disabled = false;
    }
  });
}
window._updateCampaignUI = updateCampaignUI;

function launchBossBattle(stageId) {
  const boss = CAMPAIGN_BOSSES.find(b => b.id === stageId);
  if (!boss) return;

  _activeCampaignBoss = boss;
  window._ACTIVE_CAMPAIGN_BOSS = boss;

  // 1. Configura Arena
  if (window._WIZARD_GAME && window._WIZARD_GAME.setArena) {
    window._WIZARD_GAME.setArena(boss.arena);
  }
  const arenaBtn = document.querySelector(`#menu-arena-group .toggle-btn[data-arena="${boss.arena}"]`);
  if (arenaBtn) {
    document.querySelectorAll("#menu-arena-group .toggle-btn").forEach(b => b.classList.remove("active"));
    arenaBtn.classList.add("active");
  }

  // 2. Configura Dificuldade IA
  const diffBtn = document.querySelector(`#menu-diff-group .toggle-btn[data-diff="${boss.diff}"]`);
  if (diffBtn) {
    document.querySelectorAll("#menu-diff-group .toggle-btn").forEach(b => b.classList.remove("active"));
    diffBtn.classList.add("active");
  }

  // 3. Atualiza HUD do Oponente
  const oppName = document.getElementById("opponent-name-hud");
  const oppAvatar = document.getElementById("opponent-avatar-hud");
  const oppBadge = document.getElementById("opponent-badge-hud");
  if (oppName) oppName.textContent = boss.name;
  if (oppAvatar) oppAvatar.textContent = boss.avatar;
  if (oppBadge) oppBadge.textContent = "CHEFE";

  // 4. Inicia Batalha
  const btnStart = document.getElementById("btn-start-game");
  if (btnStart) btnStart.click();

  // 5. Fala de abertura
  setTimeout(() => {
    showBossSpeech(boss.lines.start, boss.avatar, boss.name);
  }, 900);
}

function setupWizardCampaign() {
  updateCampaignUI();

  CAMPAIGN_BOSSES.forEach(boss => {
    const btn = document.getElementById("btn-boss-challenge-" + boss.id);
    if (btn) {
      bindAction(btn, () => launchBossBattle(boss.id), "launchBoss_" + boss.id);
    }
  });

  // Monitor de eventos em jogo para o Chefe falar
  const graveB = document.getElementById("grave-b");
  const graveW = document.getElementById("grave-w");
  let lastCountB = 0;
  let lastCountW = 0;

  const monitorCampaignEvents = () => {
    if (!_activeCampaignBoss) return;

    if (graveB) {
      const curB = graveB.children.length;
      if (curB > lastCountB) {
        lastCountB = curB;
        setTimeout(() => {
          if (_activeCampaignBoss) {
            showBossSpeech(_activeCampaignBoss.lines.lossPiece, _activeCampaignBoss.avatar, _activeCampaignBoss.name);
          }
        }, 500);
      }
    }

    if (graveW) {
      const curW = graveW.children.length;
      if (curW > lastCountW) {
        lastCountW = curW;
        setTimeout(() => {
          if (_activeCampaignBoss) {
            showBossSpeech(_activeCampaignBoss.lines.capture, _activeCampaignBoss.avatar, _activeCampaignBoss.name);
          }
        }, 500);
      }
    }
  };

  if (graveB) new MutationObserver(monitorCampaignEvents).observe(graveB, { childList: true });
  if (graveW) new MutationObserver(monitorCampaignEvents).observe(graveW, { childList: true });

  // Monitor de fim de jogo para vitória na campanha
  const gameOverModal = document.getElementById("game-over-modal");
  const gameOverTitle = document.getElementById("game-over-title");
  if (gameOverModal) {
    new MutationObserver(() => {
      if (!gameOverModal.classList.contains("hidden") && _activeCampaignBoss) {
        const titleText = (gameOverTitle ? gameOverTitle.textContent : "").toLowerCase();
        const isWin = titleText.includes("vitória") || titleText.includes("venceu") || titleText.includes("mate");
        if (isWin) {
          const boss = _activeCampaignBoss;
          showBossSpeech(boss.lines.win, boss.avatar, boss.name);
          addPlayerCoins(boss.rewardCoins, `Vitória sobre ${boss.name}`);
          addXP(boss.rewardXp, `Campanha: ${boss.name}`);
          if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playVictoryChime) {
            ArcaneAudio.playVictoryChime();
          }

          const prog = getCampaignProgress();
          prog[boss.id] = true;
          saveCampaignProgress(prog);
          updateCampaignUI();
          showToast(`🏆 Você derrotou ${boss.name}! Recompensas concedidas!`);
        } else {
          showBossSpeech(_activeCampaignBoss.lines.defeat, _activeCampaignBoss.avatar, _activeCampaignBoss.name);
        }
      }
    }).observe(gameOverModal, { attributes: true, attributeFilter: ["class"] });
  }
}

// ==============================================================
// V1.5.0: CLIMA DINÂMICO NAS ARENAS (THREE.JS ATMOSPHERIC PARTICLES)
// ==============================================================
class ArenaWeatherSystem {
  constructor() {
    this.particles = [];
    this.activeArena = "";
  }

  init() {
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
    setInterval(() => this.checkArenaChange(), 1500);
  }

  checkArenaChange() {
    if (!window._WIZARD_GAME || !window._WIZARD_GAME.scene) return;
    const currentArena = window._WIZARD_GAME.getArena ? window._WIZARD_GAME.getArena() : "cathedral";
    if (currentArena !== this.activeArena) {
      this.switchWeather(currentArena);
    }
  }

  switchWeather(arena) {
    this.clear();
    this.activeArena = arena;
    const game = window._WIZARD_GAME;
    if (!game || !game.scene || !game.Se || !game.hs || !game.Kt) return;

    const { Se, hs, Kt, scene } = game;
    const geom = new hs(0.045, 4, 4);

    let colors = [0xffd700, 0xc084fc, 0xffffff];
    let count = 45;

    if (arena === "inferno") {
      colors = [0xff4500, 0xff8c00, 0xff2200, 0xffd700];
      count = 60;
    } else if (arena === "abyss") {
      colors = [0x00f5d4, 0x7b2cbf, 0x3a0ca3];
      count = 50;
    } else if (arena === "atlantis") {
      colors = [0x00b4d8, 0x90e0ef, 0x48cae4];
      count = 55;
    } else if (arena === "desert") {
      colors = [0xe0a96d, 0xd4a373, 0xffd54f];
      count = 55;
    } else if (arena === "cyber") {
      colors = [0x00ff88, 0x00e5ff, 0x00ffff];
      count = 50;
    }

    for (let i = 0; i < count; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      const mat = new Kt({ color: col, transparent: true, opacity: 0.75 });
      const mesh = new Se(geom, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 16,
        Math.random() * 8 + 0.2,
        (Math.random() - 0.5) * 16
      );

      scene.add(mesh);

      this.particles.push({
        mesh,
        arena,
        vx: (Math.random() - 0.5) * 0.015 + (arena === "desert" ? 0.035 : 0),
        vy: arena === "inferno" ? (0.015 + Math.random() * 0.02) :
            arena === "atlantis" ? (0.012 + Math.random() * 0.018) :
            arena === "cathedral" ? (-0.008 - Math.random() * 0.01) :
            (Math.random() - 0.5) * 0.012,
        vz: (Math.random() - 0.5) * 0.015
      });
    }
  }

  clear() {
    if (window._WIZARD_GAME && window._WIZARD_GAME.scene) {
      const scene = window._WIZARD_GAME.scene;
      this.particles.forEach(p => {
        if (p.mesh) {
          scene.remove(p.mesh);
          if (p.mesh.geometry) p.mesh.geometry.dispose();
          if (p.mesh.material) p.mesh.material.dispose();
        }
      });
    }
    this.particles = [];
  }

  animate() {
    requestAnimationFrame(this.animate);
    const arena = this.activeArena;
    this.particles.forEach(p => {
      p.mesh.position.x += p.vx;
      p.mesh.position.y += p.vy;
      p.mesh.position.z += p.vz;

      if (arena === "inferno" || arena === "atlantis") {
        if (p.mesh.position.y > 9) p.mesh.position.y = 0.2;
      } else if (arena === "cathedral") {
        if (p.mesh.position.y < 0.2) p.mesh.position.y = 8.5;
      } else {
        if (p.mesh.position.y < 0.2) p.mesh.position.y = 7.5;
        if (p.mesh.position.y > 8) p.mesh.position.y = 0.3;
      }

      if (Math.abs(p.mesh.position.x) > 10) p.mesh.position.x = -p.mesh.position.x * 0.9;
      if (Math.abs(p.mesh.position.z) > 10) p.mesh.position.z = -p.mesh.position.z * 0.9;
    });
  }
}

const WeatherManager = new ArenaWeatherSystem();
function setupDynamicWeather() {
  WeatherManager.init();
}

// ==============================================================
// V1.5.0: BAÚ ARCANO DIÁRIO
// ==============================================================
const DailyChest = {
  COOLDOWN_MS: 24 * 60 * 60 * 1000,

  getLastClaim() {
    return parseInt(localStorage.getItem("wizard_chess_daily_chest_last") || "0", 10);
  },

  updateUI() {
    const btn = document.getElementById("btn-claim-daily-chest");
    const desc = document.getElementById("chest-desc-text");
    if (!btn) return;

    const last = this.getLastClaim();
    const now = Date.now();
    const elapsed = now - last;

    if (elapsed >= this.COOLDOWN_MS || last === 0) {
      btn.disabled = false;
      btn.textContent = "🎁 Abrir Baú";
      if (desc) desc.textContent = "Baú Arcano Pronto! Toque para resgatar.";
    } else {
      btn.disabled = true;
      const remain = this.COOLDOWN_MS - elapsed;
      const hours = Math.floor(remain / (1000 * 60 * 60));
      const mins = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
      btn.textContent = `Próximo em ${hours}h ${mins}m`;
      if (desc) desc.textContent = `Recompensa renova em ${hours} horas e ${mins} minutos.`;
    }
  },

  claim() {
    const last = this.getLastClaim();
    const now = Date.now();
    if (now - last < this.COOLDOWN_MS && last !== 0) return;

    localStorage.setItem("wizard_chess_daily_chest_last", now);
    addPlayerCoins(200, "Baú Arcano Diário");
    addXP(100, "Baú Arcano Diário");

    if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playQuestRewardChime) {
      ArcaneAudio.playQuestRewardChime();
    }

    showToast("🎉 Baú Aberto! Você recebeu +200 Moedas e +100 XP!");
    this.updateUI();
  }
};

function setupDailyChest() {
  DailyChest.updateUI();
  const btn = document.getElementById("btn-claim-daily-chest");
  if (btn) {
    bindAction(btn, () => DailyChest.claim(), "claimDailyChest");
  }
  setInterval(() => DailyChest.updateUI(), 60000);
}

// ==============================================================
// V1.5.0: RODA DA FORTUNA ARCANA (ROLETA MÍSTICA)
// ==============================================================
const FortuneWheel = {
  slices: [
    { label: "+150 🪙", coins: 150, skin: null, pct: 0, col: "#6a1b9a", textCol: "#ffffff" },
    { label: "+20% Ametista", coins: 0, skin: "amethyst", pct: 20, col: "#4a148c", textCol: "#ffd54f" },
    { label: "+300 🪙", coins: 300, skin: null, pct: 0, col: "#00695c", textCol: "#ffffff" },
    { label: "+25% Rubi", coins: 0, skin: "ruby", pct: 25, col: "#b71c1c", textCol: "#ffffff" },
    { label: "+500 🪙", coins: 500, skin: null, pct: 0, col: "#e65100", textCol: "#ffffff" },
    { label: "+20% Esmeralda", coins: 0, skin: "emerald", pct: 20, col: "#1b5e20", textCol: "#ffffff" },
    { label: "+20% Espectral", coins: 0, skin: "spectral", pct: 20, col: "#00838f", textCol: "#ffffff" },
    { label: "👑 +30% Místico", coins: 0, skin: "any", pct: 30, col: "#ffd700", textCol: "#111111" }
  ],
  currentAngle: 0,
  isSpinning: false,

  canFreeSpin() {
    try {
      const last = parseInt(localStorage.getItem("wizard_fortune_last_spin") || "0", 10);
      return (Date.now() - last >= 20 * 60 * 60 * 1000);
    } catch(e) {
      return true;
    }
  },

  getSpinCost() {
    return this.canFreeSpin() ? 0 : 50;
  },

  updateUI() {
    const btn = document.getElementById("btn-spin-wheel");
    const label = document.getElementById("spin-btn-label");
    const subtext = document.getElementById("wheel-status-text");
    const cost = this.getSpinCost();

    if (cost === 0) {
      if (label) label.textContent = "GIRAR ROLETA (GRÁTIS)";
      if (subtext) subtext.textContent = "✨ 1 Giro Grátis Diário Disponível!";
    } else {
      if (label) label.textContent = "GIRAR ROLETA (50 🪙)";
      if (subtext) subtext.textContent = "Giro extra: 50 Moedas Arcanas";
    }
  },

  draw() {
    const canvas = document.getElementById("fortune-wheel-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const num = this.slices.length;
    const arc = (2 * Math.PI) / num;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < num; i++) {
      const angle = this.currentAngle + i * arc;
      ctx.beginPath();
      ctx.fillStyle = this.slices[i].col;
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + arc);
      ctx.lineTo(cx, cy);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = this.slices[i].textCol;
      ctx.font = "bold 11px 'Cinzel', sans-serif";
      ctx.fillText(this.slices[i].label, r - 15, 4);
      ctx.restore();
    }

    // Glowing border ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255, 215, 0, 0.75)";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  },

  spin() {
    if (this.isSpinning) return;
    const cost = this.getSpinCost();
    const coins = getPlayerCoins();

    if (cost > 0) {
      if (coins < cost) {
        showToast(`🪙 Moedas insuficientes! Giro extra custa ${cost} 🪙 (Você tem ${coins} 🪙).`);
        return;
      }
      spendPlayerCoins(cost);
    } else {
      try { localStorage.setItem("wizard_fortune_last_spin", Date.now()); } catch(e) {}
    }

    this.isSpinning = true;
    this.updateUI();

    const btn = document.getElementById("btn-spin-wheel");
    if (btn) btn.disabled = true;

    const resultBanner = document.getElementById("wheel-result-banner");
    if (resultBanner) resultBanner.classList.add("hidden");

    // Sorteia um índice aleatório
    const targetIndex = Math.floor(Math.random() * this.slices.length);
    const num = this.slices.length;
    const arc = (2 * Math.PI) / num;

    // Queremos que a fatia pare no ponteiro do topo (ângulo 3 * Math.PI / 2)
    const extraRotations = 5 + Math.floor(Math.random() * 3);
    const targetAngle = (extraRotations * 2 * Math.PI) + (3 * Math.PI / 2) - (targetIndex * arc) - (arc / 2);

    const startAngle = this.currentAngle;
    const change = targetAngle - startAngle;
    const duration = 4000;
    const startTime = performance.now();

    const animateSpin = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Easing cúbico desacelerado suave
      const ease = 1 - Math.pow(1 - t, 4);

      this.currentAngle = startAngle + change * ease;
      this.draw();

      if (t < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        this.isSpinning = false;
        if (btn) btn.disabled = false;
        this.updateUI();
        this.onFinish(this.slices[targetIndex]);
      }
    };

    requestAnimationFrame(animateSpin);
  },

  onFinish(prize) {
    const banner = document.getElementById("wheel-result-banner");
    const desc = document.getElementById("wheel-result-desc");
    const title = document.getElementById("wheel-result-title");

    if (prize.coins > 0) {
      addPlayerCoins(prize.coins, "Roda da Fortuna Arcana");
      if (desc) desc.textContent = `Você ganhou +${prize.coins} Moedas Arcanas! 🪙`;
      if (title) title.textContent = "🎉 Tesouro Conquistado!";
      showToast(`🎡 Parabéns! +${prize.coins} Moedas Arcanas!`);
    } else if (prize.pct > 0) {
      const res = addSkinProgress(prize.skin, prize.pct);
      if (res.fullBonus) {
        if (desc) desc.textContent = `👑 Todas as peças já desbloqueadas! Você ganhou +800 Moedas de bônus!`;
        if (title) title.textContent = "👑 Coleção Completa!";
      } else if (res.unlockedNow) {
        const name = SKIN_NAMES[res.skin] || res.skin;
        if (desc) desc.textContent = `🎉 100% ATINGIDO! Você desbloqueou o estilo ${name}!`;
        if (title) title.textContent = "✨ Peça Desbloqueada!";
      } else {
        const name = SKIN_NAMES[res.skin] || res.skin;
        const frags = Math.floor(res.progress / 10);
        if (desc) desc.textContent = `🧩 +${prize.pct}% para ${name}! Total: ${frags}/10 fragmentos (${res.progress}%)`;
        if (title) title.textContent = "🧩 Fragmento Arcano!";
      }
    }

    if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playQuestRewardChime) {
      ArcaneAudio.playQuestRewardChime();
    }

    if (banner) banner.classList.remove("hidden");
    this.updateUI();
    updateSkinsShopUI();
  }
};

window._renderFortuneWheel = function() {
  FortuneWheel.draw();
};

window._openFortuneWheel = function() {
  const m = document.getElementById("fortune-wheel-modal");
  if (m) {
    m.classList.remove("hidden");
    m.style.setProperty("display", "flex", "important");
    FortuneWheel.updateUI();
    FortuneWheel.draw();
    setTimeout(() => FortuneWheel.draw(), 50);
  }
};

window._closeFortuneWheel = function() {
  const m = document.getElementById("fortune-wheel-modal");
  if (m) {
    m.classList.add("hidden");
    m.style.setProperty("display", "none", "important");
  }
};

window._closeShareModal = function() {
  const m = document.getElementById("share-victory-modal");
  if (m) {
    m.classList.add("hidden");
    m.style.setProperty("display", "none", "important");
  }
};

function setupFortuneWheel() {
  const btnSpin = document.getElementById("btn-spin-wheel");
  if (btnSpin) {
    bindAction(btnSpin, () => FortuneWheel.spin(), "spinFortuneWheel");
  }
  const btnWebFortune = document.getElementById("btn-web-fortune-wheel");
  if (btnWebFortune) {
    bindAction(btnWebFortune, () => window._openFortuneWheel(), "openFortuneWheelPill");
  }
  const btnCloseFortune = document.getElementById("btn-close-fortune-wheel");
  if (btnCloseFortune) {
    bindAction(btnCloseFortune, () => window._closeFortuneWheel(), "closeFortuneWheelBtn");
  }
  FortuneWheel.updateUI();
  setTimeout(() => FortuneWheel.draw(), 300);
}

// ==============================================================
// V1.5.0: COMPARTILHAR VITÓRIA (SHARE CERTIFICATE)
// ==============================================================
function populateVictoryShareModal() {
  const playerName = localStorage.getItem("wizard_chess_player_name") || "Arquimago do Tabuleiro";
  const nameEl = document.getElementById("cert-player-name");
  const movesEl = document.getElementById("cert-moves-count");
  const arenaEl = document.getElementById("cert-arena-name");
  const outcomeEl = document.getElementById("cert-outcome");

  if (nameEl) nameEl.textContent = playerName;

  const historyList = document.querySelectorAll("#history-list li");
  const moves = historyList.length || 24;
  if (movesEl) movesEl.textContent = moves;

  let arenaName = "Catedral Arcana";
  if (window._WIZARD_GAME && window._WIZARD_GAME.getArena) {
    const a = window._WIZARD_GAME.getArena();
    const map = {
      cathedral: "Catedral Arcana",
      inferno: "Cripta Infernal",
      frost: "Templo de Gelo",
      abyss: "Abismo do Vazio",
      desert: "Pirâmide das Areias",
      atlantis: "Santuário de Atlântida"
    };
    arenaName = map[a] || "Catedral Arcana";
  }
  if (arenaEl) arenaEl.textContent = arenaName;
  if (outcomeEl) outcomeEl.textContent = "Xeque-Mate!";

  // Prepara compartilhamento WhatsApp
  const shareText = `♟️ Acabei de triunfar no Wizard's Chess 3D!\n👑 Vencedor: ${playerName}\n⚔️ ${moves} lances de pura tática na ${arenaName}.\nJogue grátis ou baixe o app no link:\nhttps://artcostamayrinck-hash.github.io/wizard-chess/`;

  const btnWa = document.getElementById("btn-share-whatsapp");
  if (btnWa) {
    btnWa.onclick = () => {
      const waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText);
      window.open(waUrl, "_blank");
    };
  }

  const btnCopy = document.getElementById("btn-share-copy-text");
  if (btnCopy) {
    btnCopy.onclick = () => {
      navigator.clipboard.writeText(shareText);
      showToast("📋 Mensagem copiada com sucesso!");
    };
  }
}
window._populateVictoryShareModal = populateVictoryShareModal;

function setupVictoryShareModal() {
  const btnShare = document.getElementById("btn-game-over-share");
  if (btnShare) {
    bindAction(btnShare, () => {
      const modal = document.getElementById("share-victory-modal");
      if (modal) {
        modal.classList.remove("hidden");
        populateVictoryShareModal();
      }
    }, "openShareCertModal");
  }
}

// Monitor de áudio para o Relógio em estado crítico (Heartbeat SFX)
setInterval(() => {
  const timerW = document.getElementById("timer-w");
  const timerB = document.getElementById("timer-b");
  const isCritical = (timerW && timerW.classList.contains("timer-critical") && timerW.classList.contains("active")) ||
                     (timerB && timerB.classList.contains("timer-critical") && timerB.classList.contains("active"));

  if (isCritical && typeof ArcaneAudio !== "undefined" && ArcaneAudio.playTensionTick) {
    ArcaneAudio.playTensionTick();
  }
}, 1000);

// ==============================================================
// V1.5.3: 1. EFEITOS DE FEITIÇO NA CAPTURA (VFX DE COMBATE HARRY POTTER)
// ==============================================================
function setupSpellCaptureVFX() {
  const checkGameInit = setInterval(() => {
    if (window._WIZARD_GAME && window._WIZARD_GAME.spawnArenaBurst) {
      clearInterval(checkGameInit);
      const originalBurst = window._WIZARD_GAME.spawnArenaBurst;

      window._WIZARD_GAME.spawnArenaBurst = function(pos) {
        try { originalBurst(pos); } catch(e) {}

        const arena = window._WIZARD_GAME.getArena ? window._WIZARD_GAME.getArena() : "cathedral";
        const scene = window._WIZARD_GAME.scene;
        const ts = window._WIZARD_GAME.ts;
        const hs = window._WIZARD_GAME.hs;
        const Kt = window._WIZARD_GAME.Kt;
        const Se = window._WIZARD_GAME.Se;
        const C = window._WIZARD_GAME.C;
        const xt = window._WIZARD_GAME.xt;
        const Ls = window._WIZARD_GAME.Ls;

        // Som de impacto com subwoofer e crackle elétrico
        if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playSpellCaptureBoom) {
          ArcaneAudio.playSpellCaptureBoom(arena);
        }

        // Tremor dinâmico de câmera
        if (typeof window._WIZARD_GAME !== "undefined") {
          window._WIZARD_GAME.ui = 0.45;
        }

        if (!scene || !ts || !hs || !Kt || !Se || !C) return;

        // 1. Feixe de Raio Vertical Descendente
        try {
          let beamCol = 0xffd700;
          if (arena === 'inferno') beamCol = 0xff3d00;
          else if (arena === 'frost') beamCol = 0x80deea;
          else if (arena === 'abyss') beamCol = 0xc084fc;
          else if (arena === 'cosmos') beamCol = 0x00f5d4;

          const beamHeight = 9;
          const beamGeom = xt ? new xt(0.1, 0.4, beamHeight, 16) : new hs(0.5, 0);
          const beamMat = new Kt({
            color: beamCol,
            emissive: beamCol,
            emissiveIntensity: 2.5,
            transparent: true,
            opacity: 0.95
          });
          const beamMesh = new Se(beamGeom, beamMat);
          beamMesh.position.set(pos.x, pos.y + beamHeight / 2, pos.z);
          scene.add(beamMesh);

          const startTime = performance.now();
          const animateBeam = () => {
            const elapsed = (performance.now() - startTime) / 1000;
            if (elapsed < 0.28) {
              const s = Math.max(0.01, 1 - (elapsed / 0.28));
              beamMesh.scale.set(s, 1, s);
              beamMat.opacity = s * 0.95;
              requestAnimationFrame(animateBeam);
            } else {
              scene.remove(beamMesh);
              beamGeom.dispose();
              beamMat.dispose();
            }
          };
          requestAnimationFrame(animateBeam);
        } catch(e) {}

        // 2. Anel de Choque Mágico no Chão
        try {
          if (Ls) {
            const ringGeom = new Ls(0.1, 0.35, 32);
            ringGeom.rotateX(-Math.PI / 2);
            const ringMat = new Kt({
              color: 0xffffff,
              emissive: 0xffd700,
              emissiveIntensity: 1.8,
              transparent: true,
              opacity: 0.85
            });
            const ringMesh = new Se(ringGeom, ringMat);
            ringMesh.position.set(pos.x, pos.y + 0.04, pos.z);
            scene.add(ringMesh);

            const startRing = performance.now();
            const animateRing = () => {
              const elapsed = (performance.now() - startRing) / 1000;
              if (elapsed < 0.45) {
                const t = elapsed / 0.45;
                const scale = 1 + t * 4.5;
                ringMesh.scale.set(scale, scale, scale);
                ringMat.opacity = Math.max(0, 0.85 * (1 - t));
                requestAnimationFrame(animateRing);
              } else {
                scene.remove(ringMesh);
                ringGeom.dispose();
                ringMat.dispose();
              }
            };
            requestAnimationFrame(animateRing);
          }
        } catch(e) {}
      };
    }
  }, 400);
}

// ==============================================================
// V1.5.3: 5. RASTROS MÁGICOS DAS PEÇAS (SPELL TRAILS)
// ==============================================================
const SPELL_TRAILS_DATA = {
  stardust: { id: "stardust", name: "Poeira Estelar", rarity: "Padrão", col: "#ffd700", colors: [0xffd700, 0xfff9c4, 0xffb300], price: 0 },
  flame: { id: "flame", name: "Chamas Vulcânicas", rarity: "Épico", col: "#ff3d00", colors: [0xff3d00, 0xff9100, 0xff6d00], price: 600 },
  ectoplasm: { id: "ectoplasm", name: "Névoa Ectoplasmática", rarity: "Místico", col: "#00f5d4", colors: [0x00f5d4, 0x80ffdb, 0x00b4d8], price: 800 },
  lightning: { id: "lightning", name: "Raio Arcano", rarity: "Lendário", col: "#c084fc", colors: [0xc084fc, 0x7c3aed, 0x67e8f9], price: 1000 }
};

function getEquippedTrail() {
  return localStorage.getItem("wizard_equipped_trail") || "stardust";
}

function setEquippedTrail(id) {
  try { localStorage.setItem("wizard_equipped_trail", id); } catch(e) {}
  updateTrailsUI();
}

function getUnlockedTrails() {
  try {
    const raw = localStorage.getItem("wizard_unlocked_trails");
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return ["stardust"];
}

function unlockTrail(id) {
  const unlocked = getUnlockedTrails();
  if (!unlocked.includes(id)) {
    unlocked.push(id);
    try { localStorage.setItem("wizard_unlocked_trails", JSON.stringify(unlocked)); } catch(e) {}
  }
  updateTrailsUI();
}

function isTrailUnlocked(id) {
  if (id === "stardust") return true;
  return getUnlockedTrails().includes(id);
}

function updateTrailsUI() {
  const equipped = getEquippedTrail();
  document.querySelectorAll("#customize-trail-grid .custom-card[data-trail]").forEach(card => {
    const id = card.dataset.trail;
    const isUnlocked = isTrailUnlocked(id);
    const isEq = id === equipped;
    const statusEl = card.querySelector(".custom-card-status");

    card.classList.toggle("unlocked", isUnlocked);
    card.classList.toggle("locked", !isUnlocked);
    card.classList.toggle("equipped", isEq);
    card.classList.toggle("active", isEq);

    if (statusEl) {
      if (isEq) {
        statusEl.textContent = "✓ Em Uso";
      } else if (isUnlocked) {
        statusEl.textContent = "Equipar";
      } else {
        const p = SPELL_TRAILS_DATA[id]?.price || 500;
        statusEl.textContent = `🔒 ${p.toLocaleString()} 🪙`;
      }
    }
  });
}

function setupSpellTrails() {
  updateTrailsUI();

  // Binds na aba de personalização
  document.querySelectorAll("#customize-trail-grid .custom-card[data-trail]").forEach(card => {
    bindAction(card, () => {
      const id = card.dataset.trail;
      const trail = SPELL_TRAILS_DATA[id];
      if (!trail) return;

      if (isTrailUnlocked(id)) {
        setEquippedTrail(id);
        showToast(`✨ Rastro mágico equipado: ${trail.name}`);
        if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playPiecePlaced) ArcaneAudio.playPiecePlaced();
      } else {
        const coins = getPlayerCoins();
        if (coins >= trail.price) {
          spendPlayerCoins(trail.price);
          unlockTrail(id);
          setEquippedTrail(id);
          showAchievementToast("🎉 RASTRO DESBLOQUEADO!", `Você desbloqueou ${trail.name}!`, "✨");
          if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playQuestRewardChime) ArcaneAudio.playQuestRewardChime();
        } else {
          showToast(`🔒 Moedas insuficientes! ${trail.name} custa ${trail.price} 🪙 (Você tem ${coins} 🪙).`);
        }
      }
    }, "trailCard_" + card.dataset.trail);
  });

  // Emissor de partículas de rastro 3D em tempo real
  const lastPositions = new Map();
  function emitTrailsLoop() {
    requestAnimationFrame(emitTrailsLoop);
    const game = window._WIZARD_GAME;
    if (!game || !game.scene || !game.ts || !game.ut) return;

    const trailId = getEquippedTrail();
    const trailData = SPELL_TRAILS_DATA[trailId] || SPELL_TRAILS_DATA.stardust;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = game.ut[r] && game.ut[r][c];
        if (!piece || !piece.position) continue;

        const id = `${r}_${c}_${piece.id || ''}`;
        const prev = lastPositions.get(id);
        if (prev) {
          const dx = piece.position.x - prev.x;
          const dy = piece.position.y - prev.y;
          const dz = piece.position.z - prev.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Se a peça estiver se movendo pelo ar
          if (dist > 0.035) {
            const count = 2;
            for (let k = 0; k < count; k++) {
              const col = trailData.colors[Math.floor(Math.random() * trailData.colors.length)];
              const geom = new game.hs(0.03 + Math.random() * 0.03, 0);
              const mat = new game.Kt({
                color: col,
                emissive: col,
                emissiveIntensity: 1.2,
                transparent: true,
                opacity: 0.9
              });
              const mesh = new game.Se(geom, mat);
              mesh.position.copy(piece.position);
              mesh.position.x += (Math.random() - 0.5) * 0.2;
              mesh.position.y += (Math.random() - 0.5) * 0.2;
              mesh.position.z += (Math.random() - 0.5) * 0.2;
              game.scene.add(mesh);

              game.ts.push({
                mesh,
                life: 0.5 + Math.random() * 0.3,
                maxLife: 0.8,
                vel: new game.C((Math.random() - 0.5) * 0.6, 0.4 + Math.random() * 0.8, (Math.random() - 0.5) * 0.6),
                rot: new game.C(Math.random() * 8, Math.random() * 8, Math.random() * 8)
              });
            }
          }
        }
        lastPositions.set(id, { x: piece.position.x, y: piece.position.y, z: piece.position.z });
      }
    }
  }
  emitTrailsLoop();
}

// ==============================================================
// V1.5.3: 2. TRILHA DE RECOMPENSAS / PASSE ARCANO (TROPHY ROAD)
// ==============================================================
const ARCANE_PASS_TIERS = [
  { level: 1, crowns: 5, reward: "🪙 +100 Moedas", type: "coins", val: 100 },
  { level: 2, crowns: 12, reward: "🧩 +20% Fragmento Ametista", type: "skin_pct", skin: "amethyst", val: 20 },
  { level: 3, crowns: 20, reward: "🪙 +200 Moedas", type: "coins", val: 200 },
  { level: 4, crowns: 30, reward: "⚡ Rastro 'Raio Arcano'", type: "trail", trail: "lightning" },
  { level: 5, crowns: 42, reward: "🧩 +25% Rubi + 150 🪙", type: "combo", skin: "ruby", val: 25, coins: 150 },
  { level: 6, crowns: 55, reward: "🪙 +250 Moedas", type: "coins", val: 250 },
  { level: 7, crowns: 70, reward: "🧩 +20% Fragmento Esmeralda", type: "skin_pct", skin: "emerald", val: 20 },
  { level: 8, crowns: 88, reward: "🔥 Rastro 'Chamas Vulcânicas'", type: "trail", trail: "flame" },
  { level: 9, crowns: 108, reward: "🪙 +350 Moedas", type: "coins", val: 350 },
  { level: 10, crowns: 130, reward: "🧩 +25% Espectral + 300 🪙", type: "combo", skin: "spectral", val: 25, coins: 300 },
  { level: 11, crowns: 155, reward: "🪙 +400 Moedas", type: "coins", val: 400 },
  { level: 12, crowns: 182, reward: "👻 Rastro 'Névoa Ectoplasmática'", type: "trail", trail: "ectoplasm" },
  { level: 13, crowns: 212, reward: "🧩 +20% Fragmento Celestial", type: "skin_pct", skin: "celestial", val: 20 },
  { level: 14, crowns: 245, reward: "🪙 +500 Moedas", type: "coins", val: 500 },
  { level: 15, crowns: 280, reward: "🧩 +25% Fragmento Ouro Imperial", type: "skin_pct", skin: "gold", val: 25 },
  { level: 16, crowns: 320, reward: "🪙 +600 Moedas", type: "coins", val: 600 },
  { level: 17, crowns: 365, reward: "🧩 +20% Fragmento Cyber", type: "skin_pct", skin: "cyber", val: 20 },
  { level: 18, crowns: 415, reward: "🪙 +800 Moedas", type: "coins", val: 800 },
  { level: 19, crowns: 470, reward: "👑 +30% Fragmento Místico Coringa", type: "skin_pct", skin: "any", val: 30 },
  { level: 20, crowns: 530, reward: "👑 +1.500 🪙 + Título 'Soberano do Tabuleiro'", type: "combo", coins: 1500, title: "Soberano do Tabuleiro" }
];

function getArcaneCrowns() {
  const val = parseInt(localStorage.getItem("wizard_arcane_crowns"), 10);
  return isNaN(val) ? 0 : val;
}

function addArcaneCrowns(amount) {
  const current = getArcaneCrowns();
  const next = current + amount;
  try { localStorage.setItem("wizard_arcane_crowns", next); } catch(e) {}
  showToast(`👑 +${amount} Coroas Arcanas! Total: ${next} 👑`);
  updateArcanePassUI();
}

function getClaimedPassTiers() {
  try {
    const raw = localStorage.getItem("wizard_pass_claimed");
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return [];
}

function claimPassTier(level) {
  const tier = ARCANE_PASS_TIERS.find(t => t.level === level);
  if (!tier) return;
  const crowns = getArcaneCrowns();
  if (crowns < tier.crowns) return;

  const claimed = getClaimedPassTiers();
  if (claimed.includes(level)) return;

  claimed.push(level);
  try { localStorage.setItem("wizard_pass_claimed", JSON.stringify(claimed)); } catch(e) {}

  if (tier.type === "coins") {
    addPlayerCoins(tier.val, `Passe Arcano Nível ${tier.level}`);
  } else if (tier.type === "skin_pct") {
    addSkinProgress(tier.skin, tier.val);
  } else if (tier.type === "trail") {
    unlockTrail(tier.trail);
    setEquippedTrail(tier.trail);
    showAchievementToast("🎉 NOVO RASTRO DESBLOQUEADO!", tier.reward, "✨");
  } else if (tier.type === "combo") {
    if (tier.coins) addPlayerCoins(tier.coins, `Passe Arcano Nível ${tier.level}`);
    if (tier.skin && tier.val) addSkinProgress(tier.skin, tier.val);
    if (tier.title) showAchievementToast("👑 TÍTULO LENDÁRIO!", `Você conquistou: ${tier.title}`, "👑");
  }

  if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playQuestRewardChime) {
    ArcaneAudio.playQuestRewardChime();
  }

  showToast(`🎁 Recompensa Nível ${level} resgatada!`);
  updateArcanePassUI();
}

function updateArcanePassUI() {
  const crowns = getArcaneCrowns();
  const claimed = getClaimedPassTiers();

  const crownsDisplay = document.getElementById("pass-crowns-display");
  if (crownsDisplay) crownsDisplay.textContent = `${crowns.toLocaleString()} 👑`;

  const nextTier = ARCANE_PASS_TIERS.find(t => t.crowns > crowns) || ARCANE_PASS_TIERS[ARCANE_PASS_TIERS.length - 1];
  const currentTier = ARCANE_PASS_TIERS.slice().reverse().find(t => t.crowns <= crowns) || { level: 0, crowns: 0 };

  const lvlTag = document.getElementById("pass-level-tag");
  if (lvlTag) lvlTag.textContent = `Nível Atual: ${currentTier.level} / 20`;

  const nextLbl = document.getElementById("pass-next-tier-label");
  if (nextLbl) nextLbl.textContent = crowns >= 530 ? "Passo Máximo Conquistado!" : `Próximo Nível: ${nextTier.crowns} 👑`;

  const fill = document.getElementById("pass-progress-fill");
  if (fill) {
    const pct = Math.min(100, Math.round((crowns / 530) * 100));
    fill.style.width = `${pct}%`;
  }

  const container = document.getElementById("pass-road-list-container");
  if (container) {
    container.innerHTML = ARCANE_PASS_TIERS.map(t => {
      const isClaimed = claimed.includes(t.level);
      const canClaim = crowns >= t.crowns && !isClaimed;
      const isLocked = crowns < t.crowns;

      let cardClass = "pass-tier-card";
      let btnLabel = "Coletar";
      let btnClass = "pass-claim-btn can-claim";

      if (isClaimed) {
        cardClass += " claimed";
        btnLabel = "✓ Resgatado";
        btnClass = "pass-claim-btn already-claimed";
      } else if (isLocked) {
        cardClass += " locked";
        btnLabel = `${t.crowns} 👑`;
        btnClass = "pass-claim-btn locked";
      } else {
        cardClass += " unlocked-claimable";
      }

      return `
        <div class="${cardClass}">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="pass-tier-badge">NV ${t.level}</span>
            <div style="text-align: left;">
              <div style="font-size: 0.86rem; font-weight: 800; color: #fff;">${t.reward}</div>
              <div style="font-size: 0.72rem; color: #b3a7cb;">Requer ${t.crowns} Coroas Arcanas</div>
            </div>
          </div>
          <button type="button" class="${btnClass}" onclick="claimPassTier(${t.level})" ${isLocked || isClaimed ? "disabled" : ""}>
            ${btnLabel}
          </button>
        </div>
      `;
    }).join("");
  }
}
window.claimPassTier = claimPassTier;

window._openArcanePass = function() {
  const m = document.getElementById("arcane-pass-modal");
  if (m) {
    m.classList.remove("hidden");
    m.style.setProperty("display", "flex", "important");
    updateArcanePassUI();
  }
};

window._closeArcanePass = function() {
  const m = document.getElementById("arcane-pass-modal");
  if (m) {
    m.classList.add("hidden");
    m.style.setProperty("display", "none", "important");
  }
};

function setupArcanePass() {
  const btnWebPass = document.getElementById("btn-web-arcane-pass");
  if (btnWebPass) {
    bindAction(btnWebPass, () => window._openArcanePass(), "openArcanePassBtn");
  }
  updateArcanePassUI();
}

// ==============================================================
// V1.5.3: 3. ANÁLISE MÁGICA DO GRIMÓRIO (MATCH REVIEW)
// ==============================================================
function setupEnhancedGameReview() {
  const btnOpen = document.getElementById("btn-open-magus-review");
  if (btnOpen) {
    bindAction(btnOpen, () => window._openMagusReview(), "openMagusReviewBtn");
  }
}

window._openMagusReview = function() {
  const m = document.getElementById("game-review-modal");
  if (!m) return;

  const accW = document.getElementById("analysis-acc-w")?.textContent || "88%";
  const accNum = parseInt(accW, 10) || 88;
  const brilliant = document.getElementById("analysis-brilliant-count")?.textContent || "2";
  const great = document.getElementById("analysis-great-count")?.textContent || "12";
  const blunders = document.getElementById("analysis-blunder-count")?.textContent || "0";
  const solid = Math.max(4, 20 - parseInt(great, 10));

  const elAcc = document.getElementById("review-acc-display");
  const elBri = document.getElementById("review-brilliant-count");
  const elGr = document.getElementById("review-great-count");
  const elSol = document.getElementById("review-solid-count");
  const elBlu = document.getElementById("review-blunder-count");
  const elSpeech = document.getElementById("review-magus-speech");

  if (elAcc) elAcc.textContent = `${accNum}%`;
  if (elBri) elBri.textContent = brilliant;
  if (elGr) elGr.textContent = great;
  if (elSol) elSol.textContent = solid;
  if (elBlu) elBlu.textContent = blunders;

  if (elSpeech) {
    if (accNum >= 90) {
      elSpeech.textContent = `"Visão magistral digna dos grandes sábios da torre! Você executou ${brilliant} lances brilhantes e dominou o adversário sem misericórdia."`;
    } else if (accNum >= 75) {
      elSpeech.textContent = `"Combate equilibrado e tenso! O domínio do centro garantiu o triunfo, com jogadas táticas inspiradas nos pergaminhos antigos."`;
    } else {
      elSpeech.textContent = `"Uma batalha caótica e feroz! Cada lance foi disputado palmo a palmo sobre o tabuleiro arcano."`;
    }
  }

  const btnWa = document.getElementById("btn-share-review-whatsapp");
  if (btnWa) {
    btnWa.onclick = () => {
      const shareText = `🧠 Análise Mágica no Wizard's Chess 3D:\n⭐ Precisão Arcana: ${accNum}%\n💎 Lances Brilhantes: ${brilliant}\n⚔️ Melhores Lances: ${great}\nJogue agora: https://artcostamayrinck-hash.github.io/wizard-chess/`;
      window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText), "_blank");
    };
  }

  m.classList.remove("hidden");
  m.style.setProperty("display", "flex", "important");
};

window._closeMagusReview = function() {
  const m = document.getElementById("game-review-modal");
  if (m) {
    m.classList.add("hidden");
    m.style.setProperty("display", "none", "important");
  }
};

// ==============================================================
// V1.5.3: 4. CORRIDA DOS ENIGMAS / PUZZLE RUSH (3 MINUTOS)
// ==============================================================
const PUZZLE_RUSH_DATA = [
  { id: 1, title: "1. O Pastor Relâmpago", task: "Mate em 1 com a Rainha!", options: ["Dxf7#", "Dxe5+", "Bc4", "Cf3"], correct: 0 },
  { id: 2, title: "2. O Corredor Trancado", task: "A Torre sela o Rei de Obsidiana!", options: ["Te1", "Td8#", "g3", "h4"], correct: 1 },
  { id: 3, title: "3. O Salto Duplo do Cavalo", task: "Garfo Real de Cavalo no Rei e Rainha!", options: ["Cxf7+", "Cc7+", "Cg5", "Cd6"], correct: 1 },
  { id: 4, title: "4. A Cravada Fatal do Bispo", task: "Bispo crava a Rainha na diagonal!", options: ["Bg5", "Bxf7+", "Bb5", "Bc4"], correct: 0 },
  { id: 5, title: "5. A Foice das Sombras", task: "Mate em 1 na oitava fileira!", options: ["Ta8#", "Te8+", "Dxf6", "De7"], correct: 0 },
  { id: 6, title: "6. O Sacrifício do Bispo em h7", task: "Quebre o roque com o clássico sacrifício!", options: ["Bxh7+", "Cg5", "Dh5", "h4"], correct: 0 },
  { id: 7, title: "7. O Garfo Triplo Rúnico", task: "Cavalo ataca Rei, Torre e Bispo simultaneamente!", options: ["Cc7+", "Ce7+", "Cf6+", "Cd6+"], correct: 1 },
  { id: 8, title: "8. A Bateria de Damas Cósmica", task: "Dama e Torre invadem h7 com mate imparável!", options: ["Dxh7#", "Th1", "Dg4", "f4"], correct: 0 },
  { id: 9, title: "9. O Desvio do Defensor", task: "Desvie a Torre para dar xeque-mate!", options: ["Dxd8+", "Te8#", "Cg5", "b3"], correct: 1 },
  { id: 10, title: "10. O Mate Anastásia", task: "Cavalo e Torre confinam o Rei na coluna 'h'!", options: ["Th5#", "Ce7#", "Dxh7+", "Txh7#"], correct: 0 }
];

const PuzzleRushManager = {
  active: false,
  timer: 180,
  lives: 3,
  score: 0,
  currentIndex: 0,
  intervalId: null,

  start() {
    this.active = true;
    this.timer = 180;
    this.lives = 3;
    this.score = 0;
    this.currentIndex = 0;

    const summaryBox = document.getElementById("rush-summary-box");
    const activeStage = document.getElementById("rush-active-stage");
    const btnStart = document.getElementById("btn-start-rush");

    if (summaryBox) summaryBox.classList.add("hidden");
    if (activeStage) activeStage.classList.remove("hidden");
    if (btnStart) btnStart.classList.add("hidden");

    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.tick(), 1000);
    this.updateHUD();
    this.loadPuzzle(0);
  },

  tick() {
    this.timer--;
    this.updateHUD();
    if (this.timer <= 0) {
      this.endGame("⏱️ O tempo esgotou!");
    }
  },

  updateHUD() {
    const tEl = document.getElementById("rush-timer-display");
    const sEl = document.getElementById("rush-score-display");
    const lEl = document.getElementById("rush-lives-display");

    if (tEl) {
      const min = String(Math.floor(this.timer / 60)).padStart(2, '0');
      const sec = String(this.timer % 60).padStart(2, '0');
      tEl.textContent = `⏱️ ${min}:${sec}`;
    }
    if (sEl) sEl.textContent = `🏆 ${this.score} Acertos`;
    if (lEl) {
      let hearts = "";
      for (let i = 0; i < 3; i++) hearts += i < this.lives ? "❤️" : "🖤";
      lEl.textContent = hearts;
    }
  },

  loadPuzzle(idx) {
    const p = PUZZLE_RUSH_DATA[idx % PUZZLE_RUSH_DATA.length];
    const titleEl = document.getElementById("rush-puzzle-title");
    const taskEl = document.getElementById("rush-puzzle-task");
    const grid = document.getElementById("rush-options-grid");

    if (titleEl) titleEl.textContent = `${this.score + 1}. ${p.title}`;
    if (taskEl) taskEl.textContent = p.task;

    if (grid) {
      grid.innerHTML = p.options.map((opt, i) => `
        <button type="button" class="promo-btn" style="padding: 12px; font-size: 0.95rem; font-weight: 800; background: rgba(255, 109, 0, 0.18); border-color: rgba(255, 109, 0, 0.6); color: #ffd700;" onclick="PuzzleRushManager.selectAnswer(${i})">
          ${opt}
        </button>
      `).join("");
    }
  },

  selectAnswer(choice) {
    if (!this.active) return;
    const p = PUZZLE_RUSH_DATA[this.currentIndex % PUZZLE_RUSH_DATA.length];

    if (choice === p.correct) {
      this.score++;
      if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playPuzzleSuccessChime) {
        ArcaneAudio.playPuzzleSuccessChime();
      }
      showToast(`✨ Acerto tático! Streak: ${this.score}`);
      this.currentIndex++;
      this.updateHUD();
      this.loadPuzzle(this.currentIndex);
    } else {
      this.lives--;
      if (typeof ArcaneAudio !== "undefined" && ArcaneAudio.playPieceLoss) {
        ArcaneAudio.playPieceLoss();
      }
      showToast("❌ Erro no lance! Você perdeu 1 vida.");
      this.updateHUD();
      if (this.lives <= 0) {
        this.endGame("💀 Suas 3 vidas se esgotaram!");
      }
    }
  },

  endGame(reason) {
    this.active = false;
    clearInterval(this.intervalId);

    const activeStage = document.getElementById("rush-active-stage");
    const summaryBox = document.getElementById("rush-summary-box");
    const finalScore = document.getElementById("rush-final-score");
    const recordScore = document.getElementById("rush-record-score");
    const rewardsEarned = document.getElementById("rush-rewards-earned");

    const high = parseInt(localStorage.getItem("wizard_rush_record") || "0", 10);
    const isNewRecord = this.score > high;
    const best = Math.max(high, this.score);
    try { localStorage.setItem("wizard_rush_record", best); } catch(e) {}

    const highDisplay = document.getElementById("puzzle-rush-high-score-display");
    if (highDisplay) highDisplay.textContent = best;

    const coinsEarned = this.score * 15;
    const crownsEarned = Math.floor(this.score / 2);
    if (coinsEarned > 0) addPlayerCoins(coinsEarned, "Corrida dos Enigmas");
    if (crownsEarned > 0) addArcaneCrowns(crownsEarned);

    if (activeStage) activeStage.classList.add("hidden");
    if (summaryBox) {
      summaryBox.classList.remove("hidden");
      if (finalScore) finalScore.textContent = this.score;
      if (recordScore) recordScore.textContent = isNewRecord ? `${best} (NOVO RECORDE!)` : best;
      if (rewardsEarned) rewardsEarned.textContent = `+${coinsEarned} 🪙 Moedas • +${crownsEarned} 👑 Coroas Arcanas`;
    }

    showAchievementToast("🏁 CORRIDA FINALIZADA!", `Você acertou ${this.score} enigmas! (+${coinsEarned} 🪙)`, "⏱️");
  }
};
window.PuzzleRushManager = PuzzleRushManager;

window._openPuzzleRush = function() {
  const m = document.getElementById("puzzle-rush-modal");
  if (m) {
    m.classList.remove("hidden");
    m.style.setProperty("display", "flex", "important");
    const best = localStorage.getItem("wizard_rush_record") || "0";
    const highDisplay = document.getElementById("puzzle-rush-high-score-display");
    if (highDisplay) highDisplay.textContent = best;
  }
};

window._closePuzzleRush = function() {
  const m = document.getElementById("puzzle-rush-modal");
  if (m) {
    m.classList.add("hidden");
    m.style.setProperty("display", "none", "important");
    if (PuzzleRushManager.active) {
      clearInterval(PuzzleRushManager.intervalId);
      PuzzleRushManager.active = false;
    }
  }
};

function setupPuzzleRush() {
  const btnStart = document.getElementById("btn-start-rush");
  if (btnStart) {
    bindAction(btnStart, () => PuzzleRushManager.start(), "startPuzzleRushBtn");
  }
  const btnPlayAgain = document.getElementById("btn-rush-play-again");
  if (btnPlayAgain) {
    bindAction(btnPlayAgain, () => PuzzleRushManager.start(), "playAgainPuzzleRushBtn");
  }
}

// ==============================================================
// V1.5.3: 7. EXPANSÃO DA CAMPANHA (MUNDO 2: O DOMÍNIO DOS TITÃS)
// ==============================================================
function setupCampaignWorld2() {
  [5, 6, 7, 8].forEach(id => {
    const btn = document.getElementById("btn-boss-challenge-" + id);
    if (btn) {
      bindAction(btn, () => launchBossBattle(id), "launchBoss_" + id);
    }
  });
  updateCampaignUI();
}
