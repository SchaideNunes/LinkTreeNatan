import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateConfig, sanitizeUrl } from '../js/validator.js';

describe('Linktree Config & Security Validator', () => {
  it('should validate valid configuration object', () => {
    const validConfig = {
      name: 'Natan',
      handle: '@natan',
      avatar: 'assets/avatar.svg',
      noticeText: '👉 SE NÃO ABRIR, CLIQUE NOS 3 PONTINHOS E ABRA NO NAVEGADOR!',
      socials: [
        { platform: 'tiktok', url: 'https://tiktok.com/@natan' }
      ],
      links: [
        {
          id: 'whatsapp',
          title: 'Canal de Promoções WhatsApp',
          url: 'https://whatsapp.com/channel/example',
          icon: 'whatsapp',
          highlight: true
        },
        {
          id: 'instagram',
          title: 'Instagram Oficial',
          url: 'https://instagram.com/natan',
          icon: 'instagram'
        },
        {
          id: 'tiktok',
          title: 'TikTok Oficial',
          url: 'https://tiktok.com/@natan',
          icon: 'tiktok'
        }
      ]
    };

    const result = validateConfig(validConfig);
    assert.equal(result.isValid, true);
    assert.equal(result.errors.length, 0);
  });

  it('should reject config missing name or links', () => {
    const invalidConfig = {
      name: '',
      links: []
    };

    const result = validateConfig(invalidConfig);
    assert.equal(result.isValid, false);
    assert.ok(result.errors.length > 0);
  });

  it('should prevent XSS or unsafe javascript: URLs', () => {
    assert.equal(sanitizeUrl('javascript:alert(1)'), '#');
    assert.equal(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '#');
    assert.equal(sanitizeUrl('https://instagram.com/natan'), 'https://instagram.com/natan');
    assert.equal(sanitizeUrl('https://wa.me/5511999999999'), 'https://wa.me/5511999999999');
  });

  it('should flag invalid links without title or url', () => {
    const configWithBadLink = {
      name: 'Natan',
      links: [
        { title: '', url: 'https://instagram.com' }
      ]
    };

    const result = validateConfig(configWithBadLink);
    assert.equal(result.isValid, false);
    assert.match(result.errors[0], /link title/i);
  });
});
