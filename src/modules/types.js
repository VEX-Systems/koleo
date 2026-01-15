import BaseModule from "./BaseModule.js";

export default class Types extends BaseModule {
    static get DEP_DATE() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');

        return {
            now: `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
        };
    }

    get DEP_DATE() {
        return Types.DEP_DATE;
    }

    static get KREGEX() {
        return {
            connection_id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        }
    }

    get KREGEX() {
        return Types.KREGEX;
    }
}
