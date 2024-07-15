let map;
let service;

// Function to initialize MapmyIndia Maps
function initMap() {
    // Initialize map centered on a default location
    map = new MapmyIndia.Map('map', {
        center: [12.9716, 77.5946], // Default location: Bangalore
        zoom: 12,
    });

    // Try to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = [position.coords.latitude, position.coords.longitude];

                // Set map center to user's location
                map.setView(userLocation, 12);

                // Fetch and display nearby health services
                fetchHealthServices(userLocation);
            },
            (error) => {
                console.error("Error: The Geolocation service failed.", error);
                // Use default location if geolocation fails
                const defaultLocation = [12.9716, 77.5946];
                fetchHealthServices(defaultLocation);
            }
        );
    } else {
        console.error("Error: Your browser doesn't support Geolocation.");
    }
}

// Function to fetch and display nearby health services
function fetchHealthServices(location) {
    const url = `https://atlas.mapmyindia.com/api/places/nearby/json?keywords=hospital|pharmacy|clinic&refLocation=${location[0]},${location[1]}&radius=5000&key=c9e16618aeebadd54a5bb1397d36ad99`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                displayHealthServices(data.results);
            } else {
                console.error('Error fetching health services:', data);
            }
        })
        .catch(error => console.error('Error fetching health services:', error));
}

// Function to display health services on the map and in the list
function displayHealthServices(services) {
    const healthServicesList = document.getElementById("healthServices");
    healthServicesList.innerHTML = '';

    services.forEach(service => {
        // Add marker on the map
        const marker = L.marker([service.latitude, service.longitude]).addTo(map);
        marker.bindPopup(`<div><h2>${service.poi}</h2><p>Rating: ${service.rating}</p><p>Address: ${service.address}</p></div>`);

        // Add service to the list
        const serviceItem = document.createElement("li");
        serviceItem.classList.add("service-item");
        serviceItem.innerHTML = `<strong>${service.poi}</strong><br>Rating: ${service.rating}<br>Address: ${service.address}`;
        healthServicesList.appendChild(serviceItem);
    });
}

// Initialize the map
initMap();
