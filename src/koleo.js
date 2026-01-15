import Brands from "./modules/brands.js";
import Discounts from "./modules/discounts.js";
import Stations from "./modules/stations.js";
import Connections from "./modules/connections.js";
import Converters from "./modules/converters.js";
import Types from "./modules/types.js";
import User from "./modules/user.js";

class Koleo {
  constructor() {
    this.brands = new Brands();
    this.discounts = new Discounts();
    this.stations = new Stations();
    this.connections = new Connections();
    this.converters = new Converters();
    this.types = new Types();
    this.user = new User();
  }
}


export default Koleo;
