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
        // Validate that a structured collection of discount cards is returned
        assert.ok(result, 'Expected a result object from getDiscountCards');
        assert.strictEqual(typeof result, 'object', 'Result should be an object');

        // Expect discount cards to be returned in an array property
        assert.ok(Array.isArray(result.cards), 'Expected result.cards to be an array of discount cards');
        assert.ok(result.cards.length > 0, 'Expected at least one discount card in result.cards');

        // Basic validation of the shape of each discount card
        for (const card of result.cards) {
          assert.strictEqual(typeof card, 'object', 'Each discount card should be an object');
          assert.ok(card !== null, 'Each discount card object should be non-null');
          // Require at least one identifying field on each card
          assert.ok(
            'id' in card || 'code' in card || 'name' in card || 'title' in card,
            'Each discount card should have at least one identifying property'
          );
        }
    }
  });
});
