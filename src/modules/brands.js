import BaseModule from "./BaseModule.js";

/**
 * Module for retrieving information about train brands/operators.
 * @extends BaseModule
 */
export default class Brands extends BaseModule {
  /**
   * Retrieves all available train brands/operators.
   * 
   * @returns {Promise<Array|object>} List of brands or an error object.
   */
  async getBrands() {
    let resp = await this.request(`/main/brands`);
    if (resp.error === 'discoveryError') {
      return {
        error: 'Brands not found',
        code: 'brandsNotFound',
      };
    }
    return resp;
  }
}
