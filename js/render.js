import { sanitizeUrl } from './validator.js';
import { ICONS } from './icons.js';

/**
 * Cria o HTML para um botão de link estilo pílula (fiel à referência)
 * @param {object} link 
 * @returns {string} HTML string
 */
export function createLinkItemHTML(link) {
  const safeUrl = sanitizeUrl(link.url);
  const iconKey = (link.icon || 'external').toLowerCase();
  const iconSvg = ICONS[iconKey] || ICONS.external;
  const badgeClass = `icon-badge icon-badge-${iconKey}`;
  const highlightClass = link.highlight ? ' link-card-highlight' : '';

  return `
    <a href="${safeUrl}" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="link-card${highlightClass}" 
       data-id="${link.id || iconKey}">
      <span class="${badgeClass}">
        ${iconSvg}
      </span>
      <span class="link-card-text">${link.title}</span>
    </a>
  `.trim();
}

/**
 * Cria o HTML para ícone de rede social compacto do cabeçalho
 * @param {object} social 
 * @returns {string} HTML string
 */
export function createSocialIconHTML(social) {
  const safeUrl = sanitizeUrl(social.url);
  const platform = (social.platform || '').toLowerCase();
  const iconSvg = ICONS[platform] || ICONS.external;

  return `
    <a href="${safeUrl}" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="social-icon-btn" 
       aria-label="${platform}">
      ${iconSvg}
    </a>
  `.trim();
}
