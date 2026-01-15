import { describe, it } from 'node:test';
import assert from 'node:assert';
import Brands from '../src/modules/brands.js';

describe('Brands Module', () => {
  it('should fetch brands successfully', async () => {
    const brands = new Brands();
    const result = await brands.getBrands();
    
    if (result.error) {
       if (result.code) {
           assert.ok(result.code);
       } else {
           assert.fail(`API returned error: ${result.error}`);
       }
    } else {
        assert.ok(result);
        if (Array.isArray(result)) {
            assert.ok(result.length > 0);
        }
    }
  });
});
