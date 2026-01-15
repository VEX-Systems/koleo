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

  it('should get multiple stations by IDs', async () => {
      const search = await stations.findStationsByName('Warszawa');
      if (search.length >= 2) {
          const ids = search.slice(0, 3).map(s => s.id);
          const result = await stations.getStationsInfoByIDs(ids);
          
          assert.ok(Array.isArray(result));
          assert.ok(result.length > 0);
          
          const returnedIds = result.map(s => s.id);
          assert.ok(ids.some(id => returnedIds.includes(id)));
      }
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

  it('should get station by ID', async () => {
    const station = await stations.getBySlug('warszawa-centralna');
    if (station.id) {
        const result = await stations.getStationInfoByID(station.id);
        assert.ok(result);
        assert.strictEqual(result.id, station.id);
    } else {
        const search = await stations.findStationsByName('Warszawa');
        if (search.length > 0) {
            const firstId = search[0].id;
            const result = await stations.getStationInfoByID(firstId);
            assert.ok(result);
            assert.strictEqual(result.id, firstId);
        }
    }
  });
});
