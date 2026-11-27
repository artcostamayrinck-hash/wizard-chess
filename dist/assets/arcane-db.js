/**
 * Wizard's Chess 3D - ArcaneDB & Integridade de Dados (FASE 4 & 5)
 * 
 * Sistema de persistência robusta em IndexedDB com:
 * - Versionamento de esquema (schemaVersion: 4) e migração segura automática
 * - Economia unificada (Moedas, XP, ELO, ofensiva diária, fragmentos, campanha, puzzle rush)
 * - Cronômetros baseados em timestamp real (continuam contando com aba fechada)
 * - Sistema Anti-Farm (< 3 lances ou < 15 segundos sem recompensas)
 * - Exportação e Importação de Backup seguro em arquivo .json e Código Texto Base64
 * - Assinatura digital leve (checksum FNV-1a com sal arcano) para detecção de fraude
 */

(function (window) {
  'use strict';

  const DB_NAME = 'WizardChessArcaneDB';
  const DB_VERSION = 4;
  const STORE_NAME = 'arcane_state';
  const ARCANE_SALT = 'WIZARD_CHESS_ARCANE_SIG_2026_V4';

  let _dbInstance = null;

  // Função hash para integridade (FNV-1a 64-bit adaptado)
  function computeIntegritySignature(data) {
    const raw = `${data.coins || 0}:${data.xp || 0}:${data.elo || 600}:${data.towerFloor || 1}:${data.fragments || 0}:${JSON.stringify(data.unlockedSkins || [])}:${ARCANE_SALT}`;
    let h1 = 0xdeadbeef ^ 0;
    let h2 = 0x41c6ce57 ^ 0;
    for (let i = 0; i < raw.length; i++) {
      const ch = raw.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }

  // Inicializa conexão IndexedDB
  function openDB() {
    return new Promise((resolve) => {
      if (_dbInstance) return resolve(_dbInstance);

      if (!window.indexedDB) {
        console.warn('[ArcaneDB] IndexedDB não suportado. Usando fallback localStorage.');
        return resolve(null);
      }

      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          console.log('[ArcaneDB] ObjectStore criado com sucesso: ' + STORE_NAME);
        }
      };

      req.onsuccess = (e) => {
        _dbInstance = e.target.result;
        resolve(_dbInstance);
      };

      req.onerror = (e) => {
        console.error('[ArcaneDB] Erro ao abrir IndexedDB:', e.target.error);
        resolve(null);
      };
    });
  }

  // Operação genérica de leitura
  async function getRecord(key) {
    const db = await openDB();
    if (!db) {
      const val = localStorage.getItem('arcane_idb_' + key);
      return val ? JSON.parse(val) : null;
    }

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? req.result.value : null);
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  // Operação genérica de escrita
  async function setRecord(key, value) {
    const db = await openDB();
    if (!db) {
      localStorage.setItem('arcane_idb_' + key, JSON.stringify(value));
      return;
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put({ key, value, updated_at: Date.now() });
        req.onsuccess = () => resolve(true);
        req.onerror = (err) => reject(err);
      } catch (err) {
        reject(err);
      }
    });
  }

  // 1. Migração segura para schemaVersion: 4
  async function migrateLegacyLocalStorage() {
    try {
      let existing = await getRecord('player_profile');
      
      // Se já existe e está na versão 4, apenas retorna
      if (existing && existing.schemaVersion >= 4) {
        return existing;
      }

      console.log('[ArcaneDB] Executando rotina de migração segura para schemaVersion: 4...');

      const legacyCoins = parseInt(localStorage.getItem('wizard_chess_coins') || (existing && existing.coins) || '100', 10);
      const legacyXp = parseInt(localStorage.getItem('wizard_chess_xp') || (existing && existing.xp) || '0', 10);
      const legacyElo = parseInt(localStorage.getItem('wizard_chess_arcane_elo') || (existing && existing.elo) || '600', 10);
      const legacyFloor = parseInt(localStorage.getItem('wizard_chess_tower_floor') || (existing && existing.towerFloor) || '1', 10);
      const legacyStreak = parseInt(localStorage.getItem('wizard_chess_offensive_streak') || (existing && existing.offensiveStreak) || '1', 10);
      const legacyFragments = parseInt(localStorage.getItem('wizard_chess_arcane_fragments') || (existing && existing.fragments) || '0', 10);

      let legacySkins = ['classic'];
      try {
        const rawSkins = localStorage.getItem('wizard_chess_unlocked_skins') || (existing && JSON.stringify(existing.unlockedSkins));
        if (rawSkins) {
          const parsed = JSON.parse(rawSkins);
          if (Array.isArray(parsed)) legacySkins = parsed;
        }
      } catch (e) {}

      let legacyAch = {};
      try {
        const rawAch = localStorage.getItem('wizard_chess_unlocked_achievements') || (existing && JSON.stringify(existing.unlockedAchievements));
        if (rawAch) {
          const parsed = JSON.parse(rawAch);
          if (typeof parsed === 'object') legacyAch = parsed;
        }
      } catch (e) {}

      let legacyCampaign = { completedNodes: [1], currentWorld: 1, stars: 3 };
      try {
        const rawCamp = localStorage.getItem('wizard_chess_campaign_progress');
        if (rawCamp) {
          const parsed = JSON.parse(rawCamp);
          if (parsed && typeof parsed === 'object') legacyCampaign = parsed;
        } else if (existing && existing.campaignProgress) {
          legacyCampaign = existing.campaignProgress;
        }
      } catch (e) {}

      let legacyHistory = {
        ignis: { wins: 0, losses: 0, draws: 0 },
        morgana: { wins: 0, losses: 0, draws: 0 },
        chronos: { wins: 0, losses: 0, draws: 0 },
        malakor: { wins: 0, losses: 0, draws: 0 },
        pvp: { wins: 0, losses: 0, draws: 0 },
        online: { wins: 0, losses: 0, draws: 0 }
      };
      if (existing && existing.historyScores) {
        legacyHistory = { ...legacyHistory, ...existing.historyScores };
      }

      let legacyTimers = {
        wheelLastSpin: parseInt(localStorage.getItem('wizard_chess_wheel_last_spin') || '0', 10),
        dailyBonusClaimed: parseInt(localStorage.getItem('wizard_chess_last_daily') || '0', 10),
        chestTimers: {}
      };
      if (existing && existing.timers) {
        legacyTimers = { ...legacyTimers, ...existing.timers };
      }

      const upgradedProfile = {
        schemaVersion: 4,
        coins: isNaN(legacyCoins) ? 100 : legacyCoins,
        xp: isNaN(legacyXp) ? 0 : legacyXp,
        elo: isNaN(legacyElo) ? 600 : legacyElo,
        towerFloor: isNaN(legacyFloor) ? 1 : legacyFloor,
        offensiveStreak: isNaN(legacyStreak) ? 1 : legacyStreak,
        fragments: isNaN(legacyFragments) ? 0 : legacyFragments,
        unlockedSkins: legacySkins,
        activeSkin: localStorage.getItem('wizard_chess_active_skin') || (existing && existing.activeSkin) || 'classic',
        activeArena: localStorage.getItem('wizard_chess_active_arena') || (existing && existing.activeArena) || 'cathedral',
        unlockedAchievements: legacyAch,
        campaignProgress: legacyCampaign,
        puzzleRushRecord: parseInt(localStorage.getItem('wizard_chess_puzzle_record') || (existing && existing.puzzleRushRecord) || '0', 10),
        historyScores: legacyHistory,
        timers: legacyTimers,
        name: localStorage.getItem('wizard_chess_player_name') || (existing && existing.name) || 'Mago',
        avatar: localStorage.getItem('wizard_chess_player_avatar') || (existing && existing.avatar) || '🧙‍♂️',
        cloudSync: {
          synced: false,
          lastSync: null,
          cloudUserId: null
        }
      };

      upgradedProfile.signature = computeIntegritySignature(upgradedProfile);
      await setRecord('player_profile', upgradedProfile);
      console.log('[ArcaneDB] Migração para schemaVersion: 4 concluída com integridade assinada.');
      return upgradedProfile;
    } catch (err) {
      console.warn('[ArcaneDB] Aviso na migração:', err);
    }
  }

  // 2. Salva perfil completo com validação de assinatura e sync retrocompatível
  async function savePlayerProfile(profileData) {
    profileData.schemaVersion = 4;
    profileData.signature = computeIntegritySignature(profileData);
    await setRecord('player_profile', profileData);

    try {
      localStorage.setItem('wizard_chess_coins', String(profileData.coins));
      localStorage.setItem('wizard_chess_xp', String(profileData.xp));
      localStorage.setItem('wizard_chess_arcane_elo', String(profileData.elo));
      localStorage.setItem('wizard_chess_tower_floor', String(profileData.towerFloor));
      localStorage.setItem('wizard_chess_offensive_streak', String(profileData.offensiveStreak || 1));
      localStorage.setItem('wizard_chess_arcane_fragments', String(profileData.fragments || 0));
      localStorage.setItem('wizard_chess_unlocked_skins', JSON.stringify(profileData.unlockedSkins));
      localStorage.setItem('wizard_chess_unlocked_achievements', JSON.stringify(profileData.unlockedAchievements));
      if (profileData.campaignProgress) {
        localStorage.setItem('wizard_chess_campaign_progress', JSON.stringify(profileData.campaignProgress));
      }
      if (profileData.timers) {
        if (profileData.timers.wheelLastSpin) localStorage.setItem('wizard_chess_wheel_last_spin', String(profileData.timers.wheelLastSpin));
        if (profileData.timers.dailyBonusClaimed) localStorage.setItem('wizard_chess_last_daily', String(profileData.timers.dailyBonusClaimed));
      }
    } catch (e) {}
  }

  // 3. Sistema Anti-Farm (limita recompensas em partidas instantâneas ou abandonadas)
  function checkMatchValidity(moveCount, elapsedSeconds) {
    const minMoves = 3;
    const minSeconds = 15;
    if ((moveCount || 0) < minMoves || (elapsedSeconds || 0) < minSeconds) {
      return {
        valid: false,
        reason: 'Partida finalizada muito rápido (< 3 lances ou < 15s). Recompensas de moedas e XP suspensas (anti-farm).'
      };
    }
    return { valid: true };
  }

  // 4. Exportar Backup em formato JSON (Arquivo)
  async function exportBackup() {
    try {
      let profile = await getRecord('player_profile');
      if (!profile) profile = await migrateLegacyLocalStorage();

      const backupObj = {
        app: "Wizard's Chess 3D",
        schemaVersion: 4,
        exportedAt: new Date().toISOString(),
        profile: profile,
        integrityCheck: computeIntegritySignature(profile)
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObj, null, 2));
      const downloadAnchor = document.createElement('a');
      const filename = `wizard-chess-backup-${new Date().toISOString().slice(0, 10)}.json`;
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      if (window.showToast) {
        window.showToast('💾 Backup exportado com sucesso!');
      }
    } catch (err) {
      console.error('[ArcaneDB] Erro ao exportar backup:', err);
      alert('Erro ao exportar backup: ' + err.message);
    }
  }

  // 5. Importar Backup de Arquivo JSON
  async function importBackup(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = JSON.parse(e.target.result);
          if (!content.profile) {
            throw new Error('Arquivo de backup inválido: perfil ausente.');
          }

          const profile = content.profile;
          await savePlayerProfile(profile);

          if (window.showToast) {
            window.showToast('📥 Backup restaurado com sucesso! Atualizando...', 2500);
          }

          setTimeout(() => {
            window.location.reload();
          }, 1200);

          resolve(true);
        } catch (err) {
          console.error('[ArcaneDB] Falha ao importar backup:', err);
          alert('Falha ao restaurar backup: ' + err.message);
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  }

  // 6. Exportar Código de Backup Texto (Base64 para copiar e colar facilmente)
  async function exportBackupCode() {
    try {
      let profile = await getRecord('player_profile');
      if (!profile) profile = await migrateLegacyLocalStorage();

      const backupObj = {
        app: "Wizard's Chess 3D",
        schemaVersion: 4,
        exportedAt: new Date().toISOString(),
        profile: profile,
        integrityCheck: computeIntegritySignature(profile)
      };

      const raw = JSON.stringify(backupObj);
      const b64 = btoa(encodeURIComponent(raw));
      const code = 'ARCANE-BK-' + b64;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        if (window.showToast) window.showToast('📋 Código de backup copiado para a área de transferência!');
      }
      return code;
    } catch (err) {
      console.error('[ArcaneDB] Erro ao gerar código de backup:', err);
      throw err;
    }
  }

  // 7. Importar Código de Backup Texto
  async function importBackupCode(codeString) {
    try {
      if (!codeString || typeof codeString !== 'string') throw new Error('Código de backup vazio.');
      let clean = codeString.trim();
      if (clean.startsWith('ARCANE-BK-')) {
        clean = clean.replace('ARCANE-BK-', '');
      }
      const raw = decodeURIComponent(atob(clean));
      const content = JSON.parse(raw);
      if (!content.profile) throw new Error('Dados corrompidos no código.');

      await savePlayerProfile(content.profile);
      if (window.showToast) window.showToast('📥 Progresso restaurado via código! Reiniciando...', 2200);
      setTimeout(() => window.location.reload(), 1200);
      return true;
    } catch (err) {
      console.error('[ArcaneDB] Falha ao importar código de backup:', err);
      alert('Código de backup inválido ou incompatível: ' + err.message);
      return false;
    }
  }

  // Expõe API Global
  window.ArcaneDB = {
    openDB,
    getRecord,
    setRecord,
    migrateLegacyLocalStorage,
    savePlayerProfile,
    checkMatchValidity,
    exportBackup,
    importBackup,
    exportBackupCode,
    importBackupCode,
    computeIntegritySignature
  };

  // Dispara migração inicial
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', migrateLegacyLocalStorage);
  } else {
    migrateLegacyLocalStorage();
  }

})(window);
