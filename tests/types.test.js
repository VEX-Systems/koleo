import { describe, it } from 'node:test';
import assert from 'node:assert';
import Types from '../src/modules/types.js';

describe('Types Module', () => {
  it('should have a DEP_DATE getter returning current date in correct format', () => {
    const depDateStatic = Types.DEP_DATE;
    assert.ok(depDateStatic.now);
    assert.match(depDateStatic.now, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);

    const types = new Types();
    const depDateInstance = types.DEP_DATE;
    assert.ok(depDateInstance.now);
    assert.strictEqual(depDateInstance.now, depDateStatic.now);
  });

  it('should have a static KREGEX getter with connection_id regex', () => {
    const regex = Types.KREGEX.connection_id;
    assert.ok(regex instanceof RegExp);
    assert.match("a3aa8c9c-accd-5d39-9a14-36bac737c5ec", regex);
    assert.doesNotMatch("invalid-uuid", regex);
  });
});
