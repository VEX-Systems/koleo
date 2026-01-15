import BaseModule from "./BaseModule.js";
import Converters from "./converters.js";

/**
 * Module for searching and retrieving station information.
 * @extends BaseModule
 */
export default class Stations extends BaseModule {
  /**
   * Retrieves station details by its slug.
   * 
   * @param {string} slug - The station slug (e.g., 'warszawa-centralna').
   * @returns {Promise<object>} Station details or error object if not found.
   * @throws {Error} If slug is missing.
   */
  async getBySlug(slug) {
    if (!slug) {    
      throw new Error("Slug is required");
    }
    let resp = await this.request(`/main/stations/by_slug/${slug}`);
    if (resp.error === 'discoveryError') {
      return {
        error: 'Station by slug ' + slug + ' not found',
        code: 'stationNotFound',
      };
    }
    return resp;
  }

  /**
   * Retrieves station details by its exact name.
   * Internally converts name to slug and calls getBySlug.
   * 
   * @param {string} name - The station name (e.g., 'Warszawa Centralna').
   * @returns {Promise<object>} Station details or error object.
   * @throws {Error} If name is missing.
   */
  async getByName(name) {
    if (!name) {
      throw new Error("Name is required");
    }
    let converters = new Converters();
    let slug = await converters.nameToSlug(name, true);
    if (!slug.isValidByKoleo) {
      return {
        error: `Failed conversion of name ${name} to slug ${slug.slug}. Koleo says that the slug is not valid.`,
        code: 'slugConversionFailed',
      };
    }
    return await this.getBySlug(slug.slug);
  }

  /**
   * Searches for stations by name using the livesearch API.
   * 
   * @param {string} name - The partial or full name to search for.
   * @returns {Promise<Array>} List of matching stations.
   * @throws {Error} If name is missing.
   */
  async findStationsByName(name) {
    if (!name) {
      throw new Error("Name is required");
    }
    return await this.request(`/main/livesearch?q=${name.toLowerCase()}`);
  }

  /**
   * Retrieves all available stations.
   * 
   * @returns {Promise<Array>} List of all stations.
   */
  async getAllStations() {
    return await this.request(`/main/stations`);
  }

  /**
   * Filters stations by region.
   * 
   * @param {string} region - The region name (case-insensitive).
   * @returns {Promise<Array>} List of stations in the specified region.
   * @throws {Error} If region is missing.
   */
  async getStationsByRegion(region) {
    if (!region) {
      throw new Error("Region is required");
    }
    let resp = await this.getAllStations();
    return resp.filter(station => station.region === region.toLowerCase());
  }

  /**
   * Filters stations by city.
   * 
   * @param {string} city - The city name (exact match).
   * @returns {Promise<Array>} List of stations in the specified city.
   * @throws {Error} If city is missing.
   */
  async getStationsByCity(city) {
    if (!city) {
      throw new Error("City is required");
    }
    let resp = await this.getAllStations();
    return resp.filter(station => station.city === city);
  }

  /**
   * Retrieves station details by its ID.
   * 
   * @param {number} id - The station ID.
   * @returns {Promise<object>} Station details or error object.
   * @throws {Error} If ID is missing.
   */
  async getStationInfoByID(id) {
    if (!id) {
      throw new Error("ID is required");
    }

    let resp = await this.request(`/main/stations?ids%5B%5D=${id}`);
    
    if (resp.error) {
      return resp;
    }

    if (Array.isArray(resp) && resp.length > 0) {
      return resp[0];
    }

    return {
      error: 'Station not found',
      code: 'stationNotFound'
    };
  }

  /**
   * Retrieves details for multiple stations by their IDs.
   * 
   * @param {number[]} ids - Array of station IDs.
   * @returns {Promise<Array>} List of station details.
   * @throws {Error} If IDs array is invalid or has fewer than 2 IDs.
   */
  async getStationsInfoByIDs(ids) {
    if (!ids) {
        throw new Error("IDs are required");
    }
    if (!Array.isArray(ids)) {
        throw new Error("IDs must be an array");
    }
    if (ids.length === 0) {
        throw new Error("IDs array cannot be empty");
    }
    if (ids.length <= 1) {
        throw new Error("IDs array must contain at least 2 IDs. For singular operations use <KoleoClient>.getStationInfoByID()");
    }
    
    const queryParams = ids.map(singleId => `ids%5B%5D=${singleId}`).join('&');
    let resp = await this.request(`/main/stations?${queryParams}`);
    return resp;
  }
}
