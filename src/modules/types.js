import BaseModule from "./BaseModule.js";

/**
 * Module providing type constants and helpers.
 * @extends BaseModule
 */
export default class Types extends BaseModule {
    /**
     * Gets the current date in ISO 8601 format suitable for API requests.
     * @returns {object} Object containing the 'now' property.
     */
    static get DEP_DATE() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');

        return {
            now: `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
        };
    }

    /**
     * Instance accessor for DEP_DATE.
     */
    get DEP_DATE() {
        return Types.DEP_DATE;
    }

    /**
     * Regular expressions for validation.
     * @returns {object} Object containing regex patterns.
     */
    static get KREGEX() {
        return {
            connection_id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        }
    }

    /**
     * Instance accessor for KREGEX.
     */
    get KREGEX() {
        return Types.KREGEX;
    }
}
