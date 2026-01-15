import Koleo from '../index.js';

const run = async () => {
    const koleo = new Koleo();

    console.log("--- Fetching Brands ---");
    const brands = await koleo.brands.getBrands();
    console.log(`Found ${brands.length} brands.`);

    console.log("\n--- Searching for 'Warszawa' stations ---");
    const stations = await koleo.stations.findStationsByName('Warszawa');
    console.log(`Found ${stations.length} stations matching 'Warszawa'.`);
    const warszawaCentralna = stations.find(s => s.name === 'Warszawa Centralna');

    console.log("\n--- Searching for 'Kraków' stations ---");
    const krakowStations = await koleo.stations.findStationsByName('Kraków');
    const krakowGlowny = krakowStations.find(s => s.name === 'Kraków Główny');

    if (warszawaCentralna && krakowGlowny) {
        console.log(`\n--- Searching connections from ${warszawaCentralna.name} to ${krakowGlowny.name} ---`);
        const connections = await koleo.connections.findConnection(
            warszawaCentralna.name,
            krakowGlowny.name,
            koleo.types.DEP_DATE.now
        );

        console.log(`Found ${connections.length} connections.`);
        if (connections.length > 0) {
            console.log("First connection details:");
            console.log(`From: ${connections[0].start_station.name}`);
            console.log(`To: ${connections[0].end_station.name}`);
            console.log(`Departure: ${connections[0].departure}`);
            console.log(`Duration: ${connections[0].duration}`);
        }
    }
};

run().catch(console.error);
