import BaseModule from "./BaseModule.js";

export default class Brands extends BaseModule {
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
