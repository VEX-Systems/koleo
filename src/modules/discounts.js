import BaseModule from "./BaseModule.js";

/**
 * Module for retrieving information about available discounts.
 * @extends BaseModule
 */
export default class Discounts extends BaseModule {
  /**
   * Retrieves all available discounts.
   * 
   * @returns {Promise<Array|object>} List of discounts or an error object.
   */
  async getDiscounts() {
    let resp = await this.request(`/main/discounts`);
    if (resp.error === 'discoveryError') {
      return {
        error: 'Discounts not found',
        code: 'discountsNotFound',
      };
    }
    return resp;
  }
}
