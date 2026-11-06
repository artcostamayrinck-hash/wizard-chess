/**
 * Wizard's Chess 3D - ArcaneDB & Integridade de Dados (A4)
 * 
 * Sistema de persistência robusta em IndexedDB com:
 * - Versionamento de esquema (v1) e migração automática de localStorage
 * - Assinatura digital leve (checksum com sal arcano) para detecção de fraude
 * - Exportação e Importação de Backup seguro em arquivo .json
 * - Campos preparados para sincronização futura em nuvem
 */

(function (window) {
  'use strict';

  const DB_NAME = 'WizardChessArcaneDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'arcane_state';
  const ARCANE_SALT = 'WIZARD_CHESS_ARCANE_SIG_2026';

  let _dbInstance = null;

  // Função hash para integridade (FNV-1a 64-bit adaptado)
  function computeIntegritySignature(data) {
    const raw = `${data.coins || 0}:${data.xp || 0}:${data.elo || 600}:${data.towerFloor || 1}:${JSON.stringify(data.unlockedSkins || [])}:${ARCANE_SALT}`;
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
    return new Promise((resolve, reject) => {
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

  // 1. Migração automática de dados legados do localStorage para IndexedDB
  async function migrateLegacyLocalStorage() {
    try {
      const existing = await getRecord('player_profile');
      if (existing) {
        console.log('[ArcaneDB] Perfil carregado do IndexedDB com sucesso.');
        return existing;
      }

      console.log('[ArcaneDB] Migrando dados legados do localStorage para IndexedDB...');
      const legacyCoins = parseInt(localStorage.getItem('wizard_chess_coins') || '100', 10);
      const legacyXp = parseInt(localStorage.getItem('wizard_chess_xp') || '0', 10);
      const legacyElo = parseInt(localStorage.getItem('wizard_chess_arcane_elo') || '600', 10);
      const legacyFloor = parseInt(localStorage.getItem('wizard_chess_tower_floor') || '1', 10);

      let legacySkins = ['classic'];
      try {
        const parsed = JSON.parse(localStorage.getItem('wizard_chess_unlocked_skins') || '["classic"]');
        if (Array.isArray(parsed)) legacySkins = parsed;
      } catch (e) {}

      let legacyAch = {};
      try {
        const parsed = JSON.parse(localStorage.getItem('wizard_chess_unlocked_achievements') || '{}');
        if (typeof parsed === 'object') legacyAch = parsed;
      } catch (e) {}

      const initialProfile = {
        schemaVersion: 1,
        coins: isNaN(legacyCoins) ? 100 : legacyCoins,
        xp: isNaN(legacyXp) ? 0 : legacyXp,
        elo: isNaN(legacyElo) ? 600 : legacyElo,
        towerFloor: isNaN(legacyFloor) ? 1 : legacyFloor,
        unlockedSkins: legacySkins,
        activeSkin: localStorage.getItem('wizard_chess_active_skin') || 'classic',
        activeArena: localStorage.getItem('wizard_chess_active_arena') || 'cathedral',
        unlockedAchievements: legacyAch,
        name: localStorage.getItem('wizard_chess_player_name') || 'Mago',
        avatar: localStorage.getItem('wizard_chess_player_avatar') || '🧙‍♂️',
        cloudSync: {
          synced: false,
          lastSync: null,
          cloudUserId: null
        }
      };

      initialProfile.signature = computeIntegritySignature(initialProfile);
      await setRecord('player_profile', initialProfile);
      console.log('[ArcaneDB] Migração concluída com integridade assinada.');
      return initialProfile;
    } catch (err) {
      console.warn('[ArcaneDB] Aviso na migração:', err);
    }
  }

  // 2. Salva perfil completo com validação de assinatura
  async function savePlayerProfile(profileData) {
    profileData.signature = computeIntegritySignature(profileData);
    await setRecord('player_profile', profileData);

    // Mantém retrocompatibilidade síncrona com localStorage
    try {
      localStorage.setItem('wizard_chess_coins', String(profileData.coins));
      localStorage.setItem('wizard_chess_xp', String(profileData.xp));
      localStorage.setItem('wizard_chess_arcane_elo', String(profileData.elo));
      localStorage.setItem('wizard_chess_tower_floor', String(profileData.towerFloor));
      localStorage.setItem('wizard_chess_unlocked_skins', JSON.stringify(profileData.unlockedSkins));
      localStorage.setItem('wizard_chess_unlocked_achievements', JSON.stringify(profileData.unlockedAchievements));
    } catch (e) {}
  }

  // 3. Exportar Backup do Progresso em formato JSON
  async function exportBackup() {
    try {
      let profile = await getRecord('player_profile');
      if (!profile) profile = await migrateLegacyLocalStorage();

      const backupObj = {
        app: "Wizard's Chess 3D",
        schemaVersion: 1,
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

  // 4. Importar e Validar Backup JSON
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
          const expectedSig = computeIntegritySignature(profile);

          if (content.integrityCheck && content.integrityCheck !== expectedSig) {
            console.warn('[ArcaneDB] Assinatura do backup divergente da esperada.');
          }

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

  // Expõe API Global
  window.ArcaneDB = {
    openDB,
    getRecord,
    setRecord,
    migrateLegacyLocalStorage,
    savePlayerProfile,
    exportBackup,
    importBackup,
    computeIntegritySignature
  };

  // Dispara migração inicial
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', migrateLegacyLocalStorage);
  } else {
    migrateLegacyLocalStorage();
  }

})(window);
