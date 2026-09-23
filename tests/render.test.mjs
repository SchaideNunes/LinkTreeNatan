import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createLinkItemHTML, createSocialIconHTML } from '../js/render.js';

describe('Linktree HTML Elements Generator', () => {
  it('should generate valid markup for a pill link item', () => {
    const link = {
      id: 'whatsapp',
      title: 'Canal de Promoções WhatsApp',
      url: 'https://whatsapp.com/channel/example',
      icon: 'whatsapp'
    };

    const html = createLinkItemHTML(link);
    assert.ok(html.includes('href="https://whatsapp.com/channel/example"'));
    assert.ok(html.includes('target="_blank"'));
    assert.ok(html.includes('rel="noopener noreferrer"'));
    assert.ok(html.includes('Canal de Promoções WhatsApp'));
    assert.ok(html.includes('link-card'));
    assert.ok(html.includes('icon-badge-whatsapp'));
  });

  it('should sanitize URL in generated HTML', () => {
    const maliciousLink = {
      title: 'Perigo',
      url: 'javascript:alert(1)',
      icon: 'instagram'
    };

    const html = createLinkItemHTML(maliciousLink);
    assert.ok(html.includes('href="#"'));
    assert.ok(!html.includes('javascript:'));
  });

  it('should generate social header icons markup', () => {
    const social = {
      platform: 'tiktok',
      url: 'https://tiktok.com/@natan'
    };

    const html = createSocialIconHTML(social);
    assert.ok(html.includes('href="https://tiktok.com/@natan"'));
    assert.ok(html.includes('social-icon-btn'));
    assert.ok(html.includes('aria-label="tiktok"'));
  });
});
