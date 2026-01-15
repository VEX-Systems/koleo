import BaseModule from "./BaseModule.js";
import Converters from "./converters.js";

export default class Stations extends BaseModule {
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

  async findStationsByName(name) {
    if (!name) {
      throw new Error("Name is required");
    }
    return await this.request(`/main/livesearch?q=${name.toLowerCase()}`);
  }

  async getAllStations() {
    return await this.request(`/main/stations`);
  }

  async getStationsByRegion(region) {
    if (!region) {
      throw new Error("Region is required");
    }
    let resp = await this.getAllStations();
    return resp.filter(station => station.region === region.toLowerCase());
  }

  async getStationsByCity(city) {
    if (!city) {
      throw new Error("City is required");
    }
    let resp = await this.getAllStations();
    return resp.filter(station => station.city === city);
  }
}
