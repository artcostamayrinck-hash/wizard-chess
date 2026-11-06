/**
 * Wizard's Chess 3D - Política de Privacidade, Termos e Consentimento LGPD/COPPA (F2)
 */

(function (window) {
  'use strict';

  const PRIVACY_KEY = 'wizard_chess_privacy_consent_v1';

  function hasUserConsented() {
    return localStorage.getItem(PRIVACY_KEY) === 'accepted';
  }

  function setConsent(accepted = true) {
    localStorage.setItem(PRIVACY_KEY, accepted ? 'accepted' : 'declined');
    const banner = document.getElementById('lgpd-consent-banner');
    if (banner) banner.style.display = 'none';
  }

  function openPrivacyModal() {
    const modal = document.getElementById('privacy-policy-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  }

  function closePrivacyModal() {
    const modal = document.getElementById('privacy-policy-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  }

  // Exclusão de todos os dados locais com um toque (Direito do Titular LGPD Art. 18)
  function clearAllUserData() {
    if (confirm('⚠️ Tem certeza que deseja apagar todo o seu progresso local? Suas moedas, skins e ELO serão resetados aos valores iniciais.')) {
      try {
        localStorage.clear();
        if (window.indexedDB) {
          indexedDB.deleteDatabase('WizardChessArcaneDB');
        }
        alert('✓ Todos os seus dados locais foram excluídos com sucesso.');
        window.location.reload();
      } catch (err) {
        console.error('Erro ao apagar dados:', err);
      }
    }
  }

  function initPrivacyBanner() {
    if (!hasUserConsented()) {
      const banner = document.getElementById('lgpd-consent-banner');
      if (banner) banner.style.display = 'flex';
    }
  }

  window.ArcanePrivacy = {
    hasUserConsented,
    setConsent,
    openPrivacyModal,
    closePrivacyModal,
    clearAllUserData,
    initPrivacyBanner
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrivacyBanner);
  } else {
    initPrivacyBanner();
  }

})(window);

