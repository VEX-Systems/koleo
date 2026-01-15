import { describe, it } from 'node:test';
import assert from 'node:assert';
import Converters from '../src/modules/converters.js';

describe('Converters Module', () => {
  const converters = new Converters();

  it('should convert name to slug correctly', async () => {
    const slug = await converters.nameToSlug('Warszawa Centralna');
    assert.strictEqual(slug, 'warszawa-centralna');
  });

  it('should handle polish characters in slug', async () => {
    const slug = await converters.nameToSlug('Łódź Kaliska');
    assert.strictEqual(slug, 'lodz-kaliska');
  });

  it('should validate slug if requested', async () => {
    const result = await converters.nameToSlug('Warszawa Centralna', true);
    assert.strictEqual(result.slug, 'warszawa-centralna');
    assert.ok(typeof result.isValidByKoleo === 'boolean');
  });
});
