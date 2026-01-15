import BaseModule from "./BaseModule.js";
import Converters from "./converters.js";
import Stations from "./stations.js";
import Types from "./types.js";

export default class Connections extends BaseModule {
  async findConnection(stationFrom, stationTo, departureAfter = Types.DEP_DATE.now, onlyDirect = false) {    
    if (!stationFrom || !stationTo || !departureAfter) {
      throw new Error("Station from, station to and departure after are required");
    }
    const conv = new Converters();
    const stat = new Stations();

    const stationFromSlug = await conv.nameToSlug(stationFrom, true);
    const stationToSlug = await conv.nameToSlug(stationTo, true);

    if (!stationFromSlug.isValidByKoleo || !stationToSlug.isValidByKoleo) {
      return {
        error: `Failed conversion of station names to slugs. Koleo says that the slugs are not valid.`,
        code: 'slugConversionFailed',
      };
    }

    const stationFromObj = await stat.getBySlug(stationFromSlug.slug);
    const stationToObj = await stat.getBySlug(stationToSlug.slug);

    if (!stationFromObj || !stationToObj) {
      return {
        error: `Failed to find stations.`,
        code: 'stationsNotFound',
      };
    }

    let searchObject = {
        departure_after: departureAfter,
        start_id: stationFromObj.id,
        end_id: stationToObj.id,
        only_direct: onlyDirect
    }

    let resp = await this.request('/main/eol_connections/search', searchObject);
    if (resp.length === 0) {
      return {
        error: `No connections found.`,
        code: 'noConnectionsFound',
      };
    }

    return resp;
  }

  async getConnectionInfo(connectionId) {
    if (!connectionId) {
      throw new Error("Connection ID is required");
    }

    const uuidRegex = Types.KREGEX.connection_id;
    if (!uuidRegex.test(connectionId)) {
        throw new Error("Invalid Connection ID format. Expected UUID.");
    }
    
    let resp = await this.request(`/main/eol_connections/${connectionId}`);
    return resp;
  }

  async getConnectionTicketPrice(connectionId) {
    if (!connectionId) {
      throw new Error("Connection ID is required");
    }

    const uuidRegex = Types.KREGEX.connection_id;
    if (!uuidRegex.test(connectionId)) {
        throw new Error("Invalid Connection ID format. Expected UUID.");
    }
    
    let resp = await this.request(`/main/eol_connections/${connectionId}/price`);
    return resp;
  }     
}
