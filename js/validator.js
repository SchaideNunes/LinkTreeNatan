/**
 * Validador e sanitizador de URLs e Configuração do Linktree
 */

/**
 * Sanitiza URLs prevenindo ataques de XSS baseados em javascript: ou data:
 * @param {string} url 
 * @returns {string} URL segura ou '#'
 */
export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return '#';
  }
  
  // Aceita http, https, mailto, tel, e links relativos
  if (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:') ||
    lower.startsWith('/') ||
    lower.startsWith('#')
  ) {
    return trimmed;
  }

  // Fallback padrão adicionando https:// se for apenas domínio ou link externo
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

/**
 * Valida o objeto de configuração do perfil e dos links
 * @param {object} config 
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object') {
    return { isValid: false, errors: ['A configuração deve ser um objeto válido.'] };
  }

  if (!config.name || typeof config.name !== 'string' || !config.name.trim()) {
    errors.push('O campo "name" é obrigatório.');
  }

  if (!Array.isArray(config.links) || config.links.length === 0) {
    errors.push('A lista "links" deve conter pelo menos um link.');
  } else {
    config.links.forEach((link, idx) => {
      if (!link || typeof link !== 'object') {
        errors.push(`O link no índice ${idx} é inválido.`);
      } else {
        if (!link.title || typeof link.title !== 'string' || !link.title.trim()) {
          errors.push(`Link title é obrigatório no índice ${idx}.`);
        }
        if (!link.url || typeof link.url !== 'string' || !link.url.trim()) {
          errors.push(`Link URL é obrigatório no índice ${idx}.`);
        }
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
