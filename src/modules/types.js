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

    /**
     * List of supported identity card types (document types).
     * @returns {Array<object>} Array of identity card objects containing id and name.
     */

    static get IDENTITY_CARD_TYPES() {
        return [
            {
                id: 1,
                name: "Dowód osobisty"
            },
            {
                id: 2,
                name: "Prawo jazdy"
            },
            {
                id: 3,
                name: "Paszport"
            },
            {
                id: 4,
                name: "Książeczka wojskowa"
            },
            {
                id: 5,
                name: "Legitymacja szkolna"
            },
            {
                id: 6,
                name: "Legitymacja studencka"
            },
            {
                id: 8,
                name: "Karta pobytu"
            }
        ];
    }

    /**
     * Instance accessor for IDENTITY_CARD_TYPES.
     */
    get IDENTITY_CARD_TYPES() {
        return Types.IDENTITY_CARD_TYPES;
    }
}
