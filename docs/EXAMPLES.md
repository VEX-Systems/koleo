# Usage Examples

This document provides examples of how to use the OpenKoleo library for common tasks.

## Table of Contents
1. [Basic Setup](#basic-setup)
2. [Searching for Connections](#searching-for-connections)
3. [User Authentication & Profile](#user-authentication--profile)
4. [Station Lookup](#station-lookup)

---

## Basic Setup

Import the library and create a client instance.

```javascript
import Koleo from 'open-koleo';

const client = new Koleo();
```

---

## Searching for Connections

Find trains between two cities.

```javascript
import Koleo from 'open-koleo';
const client = new Koleo();

// Get current time formatted for API
const departureTime = client.types.DEP_DATE.now;

try {
  const connections = await client.connections.findConnection(
    'Warszawa Centralna',
    'Kraków Główny',
    departureTime
  );

  console.log(`Found ${connections.length} connections:`);
  
  connections.forEach(conn => {
    const departure = new Date(conn.start_time).toLocaleTimeString();
    const arrival = new Date(conn.end_time).toLocaleTimeString();
    const duration = conn.duration;
    
    console.log(`${departure} -> ${arrival} (${duration} min)`);
    // Output: 10:00:00 -> 12:30:00 (150 min)
  });

} catch (error) {
  console.error('Error finding connections:', error);
}
```

---

## User Authentication & Profile

Login to access user-specific data like tickets and passengers.

```javascript
import Koleo from 'open-koleo';
const client = new Koleo();

async function userExample() {
  // 1. Login
  const loginResult = await client.user.performLogin('user@example.com', 'secret_password');

  if (loginResult.error) {
    console.error('Login failed:', loginResult.error);
    return;
  }

  const token = loginResult.access_token;
  console.log('Logged in successfully!');

  // 2. Get User Profile
  const profile = await client.user.getMe(token);
  console.log(`Hello, ${profile.first_name} ${profile.last_name}!`);
  // Output: Hello, Jan Kowalski!

  // 3. Get Active Tickets
  const tickets = await client.user.getActiveTickets(token);
  if (tickets.length > 0) {
    console.log('You have active tickets:');
    tickets.forEach(ticket => {
        console.log(`- Ticket #${ticket.id} for ${ticket.route_name}`);
    });
  } else {
    console.log('No active tickets found.');
  }
}

userExample();
```

---

## Station Lookup

Find stations by name, city, or region.

```javascript
import Koleo from 'open-koleo';
const client = new Koleo();

async function stationExample() {
  // Search by name (Live Search)
  const results = await client.stations.findStationsByName('Gdańsk');
  console.log('Search results for "Gdańsk":', results.map(s => s.name));
  // Output: ['Gdańsk Główny', 'Gdańsk Wrzeszcz', 'Gdańsk Oliwa', ...]

  // Get details by Slug
  const station = await client.stations.getBySlug('warszawa-centralna');
  if (!station.error) {
      console.log(`Station ID: ${station.id}, Coordinates: ${station.latitude}, ${station.longitude}`);
  }

  // Filter by Region
  const regionStations = await client.stations.getStationsByRegion('mazowieckie');
  console.log(`Found ${regionStations.length} stations in Mazowieckie.`);
}

stationExample();
```
