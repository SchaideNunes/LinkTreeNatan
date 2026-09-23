import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { linktreeConfig } from '../config.js';
import { validateConfig } from '../js/validator.js';

describe('Config File Integration Test', () => {
  it('should have valid linktreeConfig adhering to schema', () => {
    const result = validateConfig({
      name: linktreeConfig.profile.name,
      links: linktreeConfig.links
    });

    assert.equal(result.isValid, true);
    assert.equal(result.errors.length, 0);
  });

  it('should contain the requested networks (whatsapp, instagram, tiktok)', () => {
    const linkIcons = linktreeConfig.links.map(l => l.icon.toLowerCase());
    
    assert.ok(linkIcons.includes('whatsapp'), 'Must contain WhatsApp link');
    assert.ok(linkIcons.includes('instagram'), 'Must contain Instagram link');
    assert.ok(linkIcons.includes('tiktok'), 'Must contain TikTok link');
  });

  it('should have profile notice text defined for in-app browser guidance', () => {
    assert.ok(linktreeConfig.profile.noticeText, 'Should include notice text');
    assert.ok(linktreeConfig.profile.noticeText.includes('NAVEGADOR'), 'Notice should prompt user to open in external browser');
  });
});
