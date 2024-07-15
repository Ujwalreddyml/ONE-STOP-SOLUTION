document.addEventListener('DOMContentLoaded', () => {
    // Check if the browser supports geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(showMap, showError);
    } else {
      alert('Geolocation is not supported by your browser');
    }
  
    // Function to display the map with user's location
    function showMap(position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
  
      // Create the map
      const map = L.map('map').setView([userLat, userLon], 13);
  
      // Set up the OpenStreetMap layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      // Add marker for the user's location
      L.marker([userLat, userLon]).addTo(map)
        .bindPopup('You are here')
        .openPopup();
  
      // Use Google Places API to find nearby government offices
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        location: new google.maps.LatLng(userLat, userLon),
        radius: '5000', // 5km radius
        types: ['local_government_office'] // Type of place
      };
  
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(place => {
            const latLng = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };
  
            L.marker([latLng.lat, latLng.lng]).addTo(map)
              .bindPopup(`<b>${place.name}</b><br>${place.vicinity}`)
              .openPopup();
          });
        }
      });
    }
  
    // Error handling
    function showError(error) {
      alert(`Geolocation error: ${error.message}`);
    }
  });
  