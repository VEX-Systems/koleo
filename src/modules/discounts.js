import BaseModule from "./BaseModule.js";

export default class Discounts extends BaseModule {
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
