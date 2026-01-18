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

    /**
   * Retrieves the available discount cards for the user.
   * 
   * @param {Number} age [0] - The age of the user.
   * @returns {Promise<object>} Grouped discount cards or an error object.
   */
  async getDiscountCards(age=0) {
    let resp = await this.request(`/main/discount_cards?age=${age}`);
    if (resp.error === 'discoveryError') {
      return {
        error: 'Discount cards not found',
        code: 'discountCardsNotFound',
      };
    }
    return resp;
  }
}
