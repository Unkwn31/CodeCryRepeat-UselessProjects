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

calculateButton.addEventListener('click', () => {
    // If both locations are set, calculate the distance
    if (startLatLng && destLatLng) {
        calculateDistance();
    } else {
        alert('Please click to set both start and destination points on the map.');
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

    // Calculate and display distance
    const distanceInMeters = startLatLng.distanceTo(destLatLng); // Distance in meters
    const distanceInFootballFields = distanceInMeters / 100; // Convert to football fields (100m)
    const distanceInBeerBottles = distanceInMeters / 0.3; // Convert to beer bottles (0.3m)

    distanceDisplay.innerText = `Distance: ${distanceInFootballFields.toFixed(2)} football fields (${distanceInBeerBottles.toFixed(2)} beer bottles)`;
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
