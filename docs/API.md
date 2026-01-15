# API Reference

This document provides a detailed reference for the OpenKoleo API wrapper.

## Table of Contents

- [User Module](#user-module)
- [Stations Module](#stations-module)
- [Connections Module](#connections-module)
- [Brands Module](#brands-module)
- [Discounts Module](#discounts-module)
- [Converters Module](#converters-module)
- [Types Module](#types-module)

---

## User Module

Handles user authentication and profile management.

### `performLogin(email, password)`

Authenticates a user and retrieves an access token.

- **Parameters**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Returns**: `Promise<Object>`
  - Success: Object containing `access_token`, `refresh_token`, `expires_in`, etc.
  - Failure: `{ error: string, code: string }`

### `getMe(accessToken)`

Retrieves the current user's profile.

- **Parameters**:
  - `accessToken` (string): Valid OAuth access token.
- **Returns**: `Promise<Object>`
  - Success: User profile object.
  - Failure: `{ error: string, code: string }` (e.g., if token is invalid).

### `getPassangers(accessToken)`

Retrieves the list of saved passengers.

- **Parameters**:
  - `accessToken` (string): Valid OAuth access token.
- **Returns**: `Promise<Object>`
  - Success: List of passengers.
  - Failure: Error object.

### `getActiveTickets(accessToken)`

Retrieves active (current/future) tickets.

- **Parameters**:
  - `accessToken` (string): Valid OAuth access token.
- **Returns**: `Promise<Object>`
  - Success: List of active orders.
  - Failure: Error object.

### `getInactiveTickets(accessToken, page = 1, per_page = 17)`

Retrieves inactive (past) tickets with pagination.

- **Parameters**:
  - `accessToken` (string): Valid OAuth access token.
  - `page` (number): Page number (default: 1).
  - `per_page` (number): Items per page (default: 17).
- **Returns**: `Promise<Object>`
  - Success: Paginated list of inactive orders.
  - Failure: Error object.

### `getTransactionHistory(accessToken)`

Retrieves the user's transaction history (Koleo wallet).

- **Parameters**:
  - `accessToken` (string): Valid OAuth access token.
- **Returns**: `Promise<Object>`
  - Success: Grouped transaction history.
  - Failure: Error object.

---

## Stations Module

Methods for finding and retrieving station information.

### `getAllStations()`

Retrieves all available stations in the system.

- **Returns**: `Promise<Array<Object>>` - Array of station objects.

### `findStationsByName(name)`

Performs a live search for stations matching the given name.

- **Parameters**:
  - `name` (string): Partial or full station name.
- **Returns**: `Promise<Array<Object>>` - List of matching stations.

### `getBySlug(slug)`

Retrieves detailed information for a specific station by its slug.

- **Parameters**:
  - `slug` (string): Station slug (e.g., `warszawa-centralna`).
- **Returns**: `Promise<Object>` - Station details or error if not found.

### `getByName(name)`

Retrieves detailed information for a specific station by its exact name.

- **Parameters**:
  - `name` (string): Station name (e.g., `Warszawa Centralna`).
- **Returns**: `Promise<Object>` - Station details or error.

### `getStationsByCity(city)`

Filters stations by city name.

- **Parameters**:
  - `city` (string): Exact city name.
- **Returns**: `Promise<Array<Object>>` - List of stations in the city.

### `getStationsByRegion(region)`

Filters stations by region.

- **Parameters**:
  - `region` (string): Region name (case-insensitive).
- **Returns**: `Promise<Array<Object>>` - List of stations in the region.

### `getStationInfoByID(id)`

Retrieves station details by its numeric ID.

- **Parameters**:
  - `id` (number): Station ID.
- **Returns**: `Promise<Object>` - Station details or error.

### `getStationsInfoByIDs(ids)`

Retrieves details for multiple stations by their IDs.

- **Parameters**:
  - `ids` (Array<number>): Array of station IDs (must contain at least 2).
- **Returns**: `Promise<Array<Object>>` - List of station details.

---

## Connections Module

Handles train connection searches and details.

### `findConnection(stationFrom, stationTo, departureAfter, onlyDirect)`

Searches for connections between two stations.

- **Parameters**:
  - `stationFrom` (string): Departure station name.
  - `stationTo` (string): Arrival station name.
  - `departureAfter` (string): ISO 8601 date string (default: now).
  - `onlyDirect` (boolean): Whether to search for direct connections only (default: `false`).
- **Returns**: `Promise<Array<Object>>` - List of connections.

### `getConnectionInfo(connectionId)`

Retrieves details for a specific connection.

- **Parameters**:
  - `connectionId` (string): UUID of the connection.
- **Returns**: `Promise<Object>` - Connection details.

### `getConnectionTicketPrice(connectionId)`

Retrieves pricing information for a connection.

- **Parameters**:
  - `connectionId` (string): UUID of the connection.
- **Returns**: `Promise<Object>` - Price details.

---

## Brands Module

### `getBrands()`

Retrieves all available train operators/brands.

- **Returns**: `Promise<Array<Object>>`

---

## Discounts Module

### `getDiscounts()`

Retrieves all available discount types.

- **Returns**: `Promise<Array<Object>>`

---

## Converters Module

### `nameToSlug(name, validate)`

Converts a station name to a Koleo-compatible slug.

- **Parameters**:
  - `name` (string): Station name.
  - `validate` (boolean): If `true`, verifies the slug exists in Koleo (default: `false`).
- **Returns**: `Promise<string|Object>` - The slug string, or an object with validation status if `validate` is true.

---

## Types Module

### `DEP_DATE.now`

Returns the current date and time formatted for the Koleo API.

- **Returns**: `string` (e.g., `2023-10-27T10:00:00`)

### `KREGEX.connection_id`

Regex pattern for validating connection UUIDs.
