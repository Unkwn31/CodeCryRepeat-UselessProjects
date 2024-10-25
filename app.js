// Initialize the map at a default center point
const map = L.map('map', {
    center: [20, 0], // Center the map at these coordinates
    zoom: 2, // Initial zoom level
    maxZoom: 18, // Allow zooming in to a high level (18 for detailed view)
    minZoom: 2, // Set minimum zoom level (can adjust based on requirements)
    dragging: true, // Enable dragging
    scrollWheelZoom: true // Enable zoom with scroll wheel
});

// Use a tile layer (you can choose different tile layers if needed)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

const calculateButton = document.getElementById('calculate-button');
const distanceDisplay = document.getElementById('distance-display');

let startLatLng = null;
let destLatLng = null;

// Add click event to the map
map.on('click', (e) => {
    // If the start location is not set, set it
    if (!startLatLng) {
        startLatLng = e.latlng;
        L.marker(startLatLng).addTo(map).bindPopup('Start Point').openPopup();
    } 
    // If the start location is set and the destination is not, set the destination
    else if (!destLatLng) {
        destLatLng = e.latlng;
        L.marker(destLatLng).addTo(map).bindPopup('Destination').openPopup();
        
        // Automatically calculate distance when destination is set
        calculateDistance();
    }
});

// Function to calculate and display distance
function calculateDistance() {
    // Clear previous lines
    map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    // Draw straight line path
    const path = L.polyline([startLatLng, destLatLng], { color: 'blue' }).addTo(map);

    // Calculate the distance in meters
    const distanceInMeters = startLatLng.distanceTo(destLatLng); // Distance in meters
    const distanceInKm = distanceInMeters / 1000; // Convert to kilometers

    // Convert the distance to funny units
    const funUnits = convertToFunUnits(distanceInKm);

    // Display the results
    let output = `Distance: ${distanceInKm.toFixed(2)} km<br>`;
    for (const [unit, value] of Object.entries(funUnits)) {
        output += `${unit}: ${value}<br>`;
    }
    distanceDisplay.innerHTML = output;
}

// Function to convert kilometers to funny units
function convertToFunUnits(km) {
    const units = {
        'School Buses': (km * 1000 / 12).toFixed(2), // Average bus is 12 meters
        'Football Fields': (km * 1000 / 100).toFixed(2), // Football field is 100 meters
        'iPhone 16 Pro': (km * 1000 / 0.16002).toFixed(2), // iPhone 16 Pro is 0.16002 meters
        'Bikes': (km * 1000 / 1.7).toFixed(2), // Average bike length is 1.7 meters
        'Pencils': (km * 1000 / 0.19).toFixed(2), // Pencil is 0.19 meters
        'Elephants': (km * 1000 / 3).toFixed(2), // Elephant is 3 meters
        'Shoe':(km * 1000 / 0.262).toFixed(2), // Shoe is 0.262 meters
    };
    return units;
}

// Reset the markers and distance when clicking the button
function reset() {
    startLatLng = null;
    destLatLng = null;
    distanceDisplay.innerText = '';
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });
}

// Reset markers on button click
calculateButton.addEventListener('click', reset);

// Function to validate coordinates (not needed anymore but kept for reference)
function isValidCoord(lat, lng) {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}





