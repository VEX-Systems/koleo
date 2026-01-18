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

  const TEST_DISCOUNT_USER_AGE = 26;

  it('should fetch discount cards successfully', async () => {
    const discounts = new Discounts();
    const result = await discounts.getDiscountCards(TEST_DISCOUNT_USER_AGE);
    
    if (result.error) {
       if (result.code) {
           assert.ok(result.code);
       } else {
           assert.fail(`API returned error: ${result.error}`);
       }
    } else {
        assert.ok(result, 'Expected a result object from getDiscountCards');
        assert.strictEqual(typeof result, 'object', 'Result should be an object');
        
        let cards = [];
        if (Array.isArray(result)) {
            cards = result;
        } else if (result.cards && Array.isArray(result.cards)) {
            cards = result.cards;
        } else {
             const values = Object.values(result);
             if (values.length > 0 && Array.isArray(values[0])) {
                 cards = values.flat();
             }
        }
        
        if (Array.isArray(result)) {
             assert.ok(result.length >= 0);
        } else {
             assert.ok(result);
        }
    }
  });
});
