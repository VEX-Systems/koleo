<p align="center"> 
   <img width="150" src="https://sc.vex.systems/branding/vex_n.png" /> 
 </p> 
  
 # OpenKoleo (koleo)
  
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 [![npm version](https://img.shields.io/npm/v/koleo.svg)](https://www.npmjs.com/package/koleo)
 [![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/VEX-Systems/koleo)
  
A robust, unofficial Node.js wrapper for the Koleo.pl API by VEX Systems. Provides a comprehensive interface for searching connections, stations, brands, and discounts with built-in validation and type safety.

> **Note**: This library is not affiliated with Koleo.pl or PKP. Use it responsibly.

## Features
 
 - 🚆 **Search Connections**: Find train connections between stations with prices and details.
 - 🚉 **Stations**: Search stations by name, slug, city, or region.
 - 👤 **User Account**: Authenticate users and retrieve profile data, tickets, and passenger info.
 - 🎫 **Brands & Discounts**: Retrieve available train operators and discount types.
 - 🛠️ **Utilities**: Built-in helpers for slug conversion and validation.
 
 ## Installation
 
 ```bash
 npm install open-koleo
 ```
 
 ## Usage
 
 ```javascript
 import Koleo from 'open-koleo';
 
 const client = new Koleo();
 
 // Find a connection
 const connections = await client.connections.findConnection(
     'Warszawa Centralna',
     'Kraków Główny',
     client.types.DEP_DATE.now
 );
 console.log(connections);
 
 // Search for a station
 const stations = await client.stations.findStationsByName('Gdańsk');
 console.log(stations);
 ```

 See [examples](./docs/EXAMPLES.md) for more advanced usage scenarios including user authentication.
 
 ## Documentation
 
 Detailed API documentation is available in [docs/API.md](./docs/API.md).
 
 ### Modules
 
 The library is structured into modules accessible via the main `Koleo` instance.
 
 #### `stations`
 - `getAllStations()`: Returns all available stations.
 - `findStationsByName(name)`: Live search for stations by name.
 - `getBySlug(slug)`: Get detailed station info by its slug.
- `getByName(name)`: Get detailed station info by exact name.
- `getStationsByCity(city)`: Filter stations by city.
 - `getStationsByRegion(region)`: Filter stations by region.
 
 #### `user`
 - `performLogin(email, password)`: Authenticate and get access token.
 - `getMe(accessToken)`: Get user profile.
 - `getPassangers(accessToken)`: Get saved passengers.
 - `getActiveTickets(accessToken)`: Get active tickets.
 - `getInactiveTickets(accessToken, page, per_page)`: Get past tickets.
 - `getTransactionHistory(accessToken)`: Get wallet history.

 #### `connections`
 - `findConnection(from, to, date, onlyDirect)`: Search for connections.
 - `getConnectionInfo(id)`: Get details of a specific connection.
 - `getConnectionTicketPrice(id)`: Get price information.
 
 #### `brands`
 - `getBrands()`: List all train brands/operators.
 
 #### `discounts`
 - `getDiscounts()`: List all available discounts.
 
 #### `converters`
- `nameToSlug(name, validate)`: Convert station name to Koleo slug. Optional validation against API.

#### `types`
- `DEP_DATE.now`: Returns current date in format required by API (YYYY-MM-DDTHH:MM:SS).
- `KREGEX.connection_id`: Regex pattern for validating connection IDs.

## Error Handling

The API wrapper returns structured error objects when operations fail. Common error codes include:

- `stationNotFound`: The requested station could not be found.
- `slugConversionFailed`: Failed to convert a station name to a valid Koleo slug.
- `stationsNotFound`: One or both stations in a connection search could not be resolved.
- `noConnectionsFound`: No connections were found for the given criteria.
- `brandsNotFound`: Failed to retrieve the list of brands.
- `discountsNotFound`: Failed to retrieve the list of discounts.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
