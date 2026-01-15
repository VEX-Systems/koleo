import BaseModule from "./BaseModule.js";

/**
 * Module for handling user authentication and profile data.
 * @extends BaseModule
 */
export default class User extends BaseModule {
  /**
   * Logs in a user to obtain an access token.
   * 
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<object>} The login response containing the access token or an error object.
   * @throws {Error} If email or password is missing.
   */
  async performLogin(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const body = {
      grant_type: "password",
      client_id: "83a8978d16b584621b9f9b2f7662a441f51ac39133d4441f34f08d0c79ad5042",
      password: password,
      username: email
    };

    let resp = await this.request('/main/oauth/token', body);
    if (resp.respBody?.json?.error) {
      return {
        error: 'Could not obtain access token (' + resp.respBody.json.error + ')',
        code: 'couldNotObtainAccessToken',
      };
    } else {
        return resp;
    }
  }

  /**
   * Retrieves the current user's profile information.
   * 
   * @param {string} accessToken - The OAuth access token.
   * @returns {Promise<object>} The user profile data or an error object.
   */
  async getMe(accessToken) {
    let resp = await this.userRequest('/main/user', accessToken);
    if (resp.error === 'HTTP 401') {
        return {
            error: 'Invalid access token',
            code: 'invalidAccessToken',
        }
    } else {
        return resp;
    }
  }

  /**
   * Retrieves the list of saved passengers for the user.
   * 
   * @param {string} accessToken - The OAuth access token.
   * @returns {Promise<object>} List of passengers or an error object.
   */
  async getPassangers(accessToken) {
    let resp = await this.userRequest('/main/passengers', accessToken);
    if (resp.error === 'HTTP 401') {
        return {
            error: 'Invalid access token',
            code: 'invalidAccessToken',
        }
    } else {
        return resp;
    }
  }

  /**
   * Retrieves active orders/tickets.
   * 
   * @param {string} accessToken - The OAuth access token.
   * @returns {Promise<object>} List of active orders or an error object.
   */
  async getActiveTickets(accessToken) {
    let resp = await this.userRequest('/main/orders/active', accessToken);
    if (resp.error === 'HTTP 401') {
        return {
            error: 'Invalid access token',
            code: 'invalidAccessToken',
        }
    } else {
        return resp;
    }
  }

  /**
   * Retrieves inactive (past) orders with pagination.
   * 
   * @param {string} accessToken - The OAuth access token.
   * @param {number} [page=1] - The page number to retrieve.
   * @param {number} [per_page=17] - Number of items per page.
   * @returns {Promise<object>} Paginated list of inactive orders or an error object.
   * @throws {Error} If page or per_page are invalid.
   */
  async getInactiveTickets(accessToken, page=1, per_page=17) {
    if (!page || !per_page) {
      throw new Error("Page and per_page are required");
    }
    if (isNaN(page) || isNaN(per_page)) {
      throw new Error("Page and per_page must be numbers");
    }
    let resp = await this.userRequest('/main/paginated_orders/inactive?page='+page+'&per_page='+per_page, accessToken);
    if (resp.error === 'HTTP 401') {
        return {
            error: 'Invalid access token',
            code: 'invalidAccessToken',
        }
    } else {
        return resp;
    }
  }

  /**
   * Retrieves the user's transaction history.
   * 
   * @param {string} accessToken - The OAuth access token.
   * @returns {Promise<object>} Grouped transaction history or an error object.
   */
  async getTransactionHistory(accessToken) {
    let resp = await this.userRequest('/main/wallet/transactions/grouped', accessToken);
    if (resp.error === 'HTTP 401') {
        return {
            error: 'Invalid access token',
            code: 'invalidAccessToken',
        }
    } else {
        return resp;
    }
  }
}
