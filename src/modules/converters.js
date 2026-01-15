import BaseModule from "./BaseModule.js";
import Stations from "./stations.js";

export default class Converters extends BaseModule {
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
