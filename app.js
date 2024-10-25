// Initialize the map at a default center point
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

const calculateButton = document.getElementById('calculate-button');
const distanceDisplay = document.getElementById('distance-display');

calculateButton.addEventListener('click', () => {
    // Get coordinates from user input
    const startLat = parseFloat(document.getElementById('start-lat').value);
    const startLng = parseFloat(document.getElementById('start-lng').value);
    const destLat = parseFloat(document.getElementById('dest-lat').value);
    const destLng = parseFloat(document.getElementById('dest-lng').value);

    if (!isValidCoord(startLat, startLng) || !isValidCoord(destLat, destLng)) {
        alert('Please enter valid coordinates.');
        return;
    }

    // Clear previous layers
    map.eachLayer((layer) => {
        if (layer instanceof L.Polyline || layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Start and destination points
    const startLatLng = L.latLng(startLat, startLng);
    const destLatLng = L.latLng(destLat, destLng);

    // Add markers
    L.marker(startLatLng).addTo(map).bindPopup('Start Point').openPopup();
    L.marker(destLatLng).addTo(map).bindPopup('Destination').openPopup();

    // Draw straight line path
    const path = L.polyline([startLatLng, destLatLng], { color: 'blue' }).addTo(map);
    map.fitBounds(path.getBounds());

    // Calculate and display distance
    const distanceInMeters = startLatLng.distanceTo(destLatLng); // Distance in meters
    const distanceInFootballFields = distanceInMeters / 100; // Convert to football fields (100m)
    const distanceInBeerBottles = distanceInMeters / 0.3; // Convert to beer bottles (0.3m)

    distanceDisplay.innerText = `Distance: ${distanceInFootballFields.toFixed(2)} football fields (${distanceInBeerBottles.toFixed(2)} beer bottles)`;
});

// Function to validate coordinates
function isValidCoord(lat, lng) {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
