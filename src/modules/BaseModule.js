import formRequest from "../utils/formRequest.js";

export default class BaseModule {
  async request(endpoint, body = null) {
    return formRequest(endpoint, body);
  }
}
