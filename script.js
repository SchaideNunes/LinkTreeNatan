import { linktreeConfig } from './config.js';
import { validateConfig } from './js/validator.js';
import { createLinkItemHTML, createSocialIconHTML } from './js/render.js';
import { ICONS } from './js/icons.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp(linktreeConfig);
});

export function initApp(config) {
  // Validação preventiva do config
  const validation = validateConfig({
    name: config.profile?.name,
    links: config.links
  });

  if (!validation.isValid) {
    console.warn('[LinkTreeNatan] Alertas de configuração:', validation.errors);
  }

  // 1. Renderizar Ícones dos botões de ação e toast
  const subscribeIconEl = document.getElementById('subscribeIcon');
  if (subscribeIconEl) subscribeIconEl.innerHTML = ICONS.bell;

  const shareIconEl = document.getElementById('shareIcon');
  if (shareIconEl) shareIconEl.innerHTML = ICONS.share;

  const toastIconEl = document.getElementById('toastIcon');
  if (toastIconEl) toastIconEl.innerHTML = ICONS.check;

  // 2. Renderizar Dados do Perfil
  const profile = config.profile || {};
  const profileAvatar = document.getElementById('profileAvatar');
  const profileTitle = document.getElementById('profileTitle');
  const noticeCard = document.getElementById('noticeCard');

  if (profileAvatar && profile.avatar) {
    profileAvatar.src = profile.avatar;
    profileAvatar.alt = profile.name || 'Foto de Perfil';
  }

  if (profileTitle && profile.name) {
    profileTitle.textContent = profile.name;
    document.title = `${profile.name} • Links Oficiais`;
  }

  const verifiedBadge = document.getElementById('verifiedBadge');
  if (verifiedBadge) {
    if (profile.verified) {
      verifiedBadge.innerHTML = ICONS.verified;
      verifiedBadge.style.display = 'inline-flex';
    } else {
      verifiedBadge.style.display = 'none';
    }
  }

  const profileBio = document.getElementById('profileBio');
  if (profileBio) {
    if (profile.bio) {
      profileBio.textContent = profile.bio;
      profileBio.style.display = 'block';
    } else {
      profileBio.style.display = 'none';
    }
  }

  const statusBadge = document.getElementById('statusBadge');
  const statusText = document.getElementById('statusText');
  if (statusBadge) {
    if (profile.statusBadge) {
      if (statusText) statusText.textContent = profile.statusBadge;
      statusBadge.style.display = 'inline-flex';
    } else {
      statusBadge.style.display = 'none';
    }
  }

  if (noticeCard) {
    if (profile.noticeText) {
      noticeCard.textContent = profile.noticeText;
      noticeCard.style.display = 'block';
    } else {
      noticeCard.style.display = 'none';
    }
  }

  // 3. Renderizar Barra de Redes Sociais Rápidas
  const socialsBar = document.getElementById('socialsBar');
  if (socialsBar && Array.isArray(config.socials)) {
    socialsBar.innerHTML = config.socials
      .map(social => createSocialIconHTML(social))
      .join('');
  }

  // 4. Renderizar Botões Principais de Links
  const linksContainer = document.getElementById('linksContainer');
  if (linksContainer && Array.isArray(config.links)) {
    linksContainer.innerHTML = config.links
      .map(link => createLinkItemHTML(link))
      .join('');
  }

  // 5. Configurar Botão Subscribe e Textos
  const subscribeBtn = document.getElementById('subscribeBtn');
  const subscribeText = document.getElementById('subscribeText');
  if (config.subscribe && config.subscribe.enabled === false) {
    if (subscribeBtn) subscribeBtn.style.display = 'none';
  } else if (config.subscribe) {
    if (subscribeText && config.subscribe.buttonText) {
      subscribeText.textContent = config.subscribe.buttonText;
    }
  }

  // 6. Rodapé
  const footerText = document.getElementById('footerText');
  if (footerText && config.footer?.text) {
    footerText.textContent = config.footer.text;
  }

  // 7. Eventos de Compartilhamento e Modais
  setupShareAction(config.share || {});
  setupSubscribeModal(config.subscribe || {});
}

/**
 * Configura o comportamento de compartilhamento (Web Share API nativa com fallback para cópia)
 */
function setupShareAction(shareConfig) {
  const shareBtn = document.getElementById('shareBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
      (navigator.maxTouchPoints > 0 && window.innerWidth <= 768);

    const shareData = {
      title: shareConfig.title || document.title,
      text: shareConfig.text || 'Acesse meus links oficiais:',
      url: window.location.href
    };

    if (isMobileDevice && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // No desktop ou como fallback: copia o link e exibe toast imediato
    await copyToClipboard(window.location.href);
  });
}

/**
 * Copia texto para o clipboard com compatibilidade total
 */
async function copyToClipboard(text) {
  let copied = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (e) {
      // Falha permissão clipboard
    }
  }

  if (!copied) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copied = true;
    } catch (err) {
      console.warn('Fallback execCommand falhou', err);
    }
  }

  showToast('Link copiado para a área de transferência!');
}

/**
 * Exibe o toast animado
 */
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/**
 * Configura o modal de inscrição
 */
function setupSubscribeModal(subConfig) {
  const modal = document.getElementById('subscribeModal');
  const openBtn = document.getElementById('subscribeBtn');
  const closeBtn = document.getElementById('closeSubscribeModal');
  const form = document.getElementById('subscribeForm');
  const input = document.getElementById('subscribeInput');
  const feedback = document.getElementById('modalFeedback');

  if (!modal) return;

  const titleEl = document.getElementById('subscribeModalTitle');
  const subtitleEl = document.getElementById('subscribeModalSubtitle');
  const submitBtn = document.getElementById('subscribeSubmitBtn');

  if (titleEl && subConfig.modalTitle) titleEl.textContent = subConfig.modalTitle;
  if (subtitleEl && subConfig.modalSubtitle) subtitleEl.textContent = subConfig.modalSubtitle;
  if (input && subConfig.placeholder) input.placeholder = subConfig.placeholder;
  if (submitBtn && subConfig.submitButtonText) submitBtn.textContent = subConfig.submitButtonText;

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    if (input) input.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (feedback) {
      feedback.classList.remove('active');
      feedback.textContent = '';
    }
  };

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Fechar ao clicar fora do modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Fechar ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Submissão do formulário
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;

      if (feedback) {
        feedback.textContent = subConfig.successMessage || '✅ Inscrição confirmada com sucesso!';
        feedback.style.color = '#4ade80';
        feedback.classList.add('active');
      }

      form.reset();
      setTimeout(() => {
        closeModal();
      }, 1600);
    });
  }
}
