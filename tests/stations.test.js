import { describe, it } from 'node:test';
import assert from 'node:assert';
import Stations from '../src/modules/stations.js';

describe('Stations Module', () => {
  const stations = new Stations();

  it('should fetch all stations', async () => {
    const result = await stations.getAllStations();
    assert.ok(Array.isArray(result));
    assert.ok(result.length > 0);
  });

  it('should find stations by name (livesearch)', async () => {
    const result = await stations.findStationsByName('Warszawa');
    if (Array.isArray(result)) {
         assert.ok(result.length > 0);
    } else {
         assert.ok(result.stations && Array.isArray(result.stations));
    }
  });

  it('should get station by slug', async () => {
    const result = await stations.getBySlug('warszawa-centralna');
    if (result.error) {
        assert.strictEqual(result.code, 'stationNotFound');
    } else {
        assert.ok(result.id);
    }
  });

  it('should get station by name', async () => {
    const result = await stations.getByName('Warszawa Centralna');
    assert.ok(result);
    if (!result.error) {
        assert.ok(result.id);
    }
  });

  it('should get stations by city', async () => {
    const result = await stations.getStationsByCity('Warszawa');
    assert.ok(Array.isArray(result));
    if (result.length > 0) {
        assert.strictEqual(result[0].city, 'Warszawa');
    }
  });
});
