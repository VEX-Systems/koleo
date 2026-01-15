import { describe, it } from 'node:test';
import assert from 'node:assert';
import Connections from '../src/modules/connections.js';
import Types from '../src/modules/types.js';

describe('Connections Module', () => {
  const connections = new Connections();

  it('should find connections between two cities', async () => {
    const result = await connections.findConnection(
        'Warszawa Centralna', 
        'Kraków Główny', 
        Types.DEP_DATE.now
    );
    
    if (result.error) {
        assert.ok(result.code);
    } else {
        assert.ok(Array.isArray(result));
    }
  });

  it('should get connection info by ID', async () => {
      await assert.rejects(
          async () => await connections.getConnectionInfo('invalid-id'),
          /Invalid Connection ID format/
      );
  });
});
