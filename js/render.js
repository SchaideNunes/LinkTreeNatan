import { sanitizeUrl } from './validator.js';
import { ICONS } from './icons.js';

/**
 * Cria o HTML para um cartão de link moderno com suporte a subtítulo, tag de destaque e seta interativa
 * @param {object} link 
 * @returns {string} HTML string
 */
export function createLinkItemHTML(link) {
  const safeUrl = sanitizeUrl(link.url);
  const iconKey = (link.icon || 'external').toLowerCase();
  const iconSvg = ICONS[iconKey] || ICONS.external;
  const badgeClass = `icon-badge icon-badge-${iconKey}`;
  const highlightClass = link.highlight ? ' link-card-highlight' : '';

  const badgeTagHTML = link.badge 
    ? `<span class="card-chip-tag">${ICONS.sparkles || ''} ${link.badge}</span>` 
    : '';

  const subtitleHTML = link.subtitle 
    ? `<span class="link-card-subtitle">${link.subtitle}</span>` 
    : '';

  return `
    <a href="${safeUrl}" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="link-card${highlightClass}" 
       data-id="${link.id || iconKey}">
      ${badgeTagHTML}
      <div class="${badgeClass}">
        ${iconSvg}
      </div>
      <div class="link-card-content">
        <span class="link-card-text">${link.title}</span>
        ${subtitleHTML}
      </div>
      <div class="link-card-arrow" aria-hidden="true">
        ${ICONS.chevronRight}
      </div>
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
       class="social-icon-btn social-icon-${platform}" 
       aria-label="${platform}">
      ${iconSvg}
    </a>
  `.trim();
}
