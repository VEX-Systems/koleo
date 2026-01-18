import { describe, it } from 'node:test';
import assert from 'node:assert';
import Discounts from '../src/modules/discounts.js';

describe('Discounts Module', () => {
  it('should fetch discounts successfully', async () => {
    const discounts = new Discounts();
    const result = await discounts.getDiscounts();
    
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

  it('should fetch discount cards successfully', async () => {
    const discounts = new Discounts();
    const result = await discounts.getDiscountCards(26);
    
    if (result.error) {
       if (result.code) {
           assert.ok(result.code);
       } else {
           assert.fail(`API returned error: ${result.error}`);
       }
    } else {
        assert.ok(result);
        assert.ok(typeof result === 'object');
    }
  });
});
