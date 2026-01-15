import BaseModule from "./BaseModule.js";
import Stations from "./stations.js";

/**
 * Utility module for data conversions.
 * @extends BaseModule
 */
export default class Converters extends BaseModule {
  /**
   * Converts a station name to a Koleo-compatible slug.
   * 
   * @param {string} name - The station name to convert.
   * @param {boolean} [validate=false] - Whether to validate the slug against the API.
   * @returns {Promise<string|object>} The slug, or an object with validation result if validate is true.
   * @throws {Error} If name is missing.
   */
  async nameToSlug(name, validate = false) {
    if (!name) {
      throw new Error("Name is required");
    }

    const polishMap = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
      'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z'
    };

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[ąćęłńóśźż]/g, match => polishMap[match])
      .replace(/\s+/g, '-');

    if (validate) {
      const stations = new Stations();
      const station = await stations.getBySlug(slug);

      if (station.error) {
        return {
          slug,
          isValidByKoleo: false
        };
      }

      return {
        slug,
        isValidByKoleo: true
      };
    }

    return slug;
  }
}
