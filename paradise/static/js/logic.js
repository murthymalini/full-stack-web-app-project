
d3.json("/mapkey").then( configResponse => {

    let API_KEY = configResponse.apikey;
    // var newYorkCoords = [40.73, -74.0059];
    // var mapZoomLevel = 12;
  
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
  
    var layers = {
      // COMING_SOON: new L.LayerGroup(),
      // EMPTY: new L.LayerGroup(),
      // LOW: new L.LayerGroup(),
      // NORMAL: new L.LayerGroup(),
      // OUT_OF_ORDER: new L.LayerGroup()
      ALL: new L.LayerGroup()
    };
  
    // Create the map with our layers
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [
        lightmap,
        layers.ALL
      ]
    });
    // Create the createMap function
  
  
    // Create the tile layer that will be the background of our map
  
  
    // Create a baseMaps object to hold the lightmap layer
  
  
    // Create an overlayMaps object to hold the bikeStations layer
  
  
    // Create the map object with options
  
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  
  
    d3.json('https://gbfs.citibikenyc.com/gbfs/en/station_information.json').then(response => {
      console.log(response.data);
  
      // Create the createMarkers function
      // console.log(stations);
  
      // Pull the "stations" property off of response.data
      let stations = response.data.stations
  
      // Initialize an array to hold bike markers
      let bikeMarkers = [];
  
      // Loop through the stations array
      stations.forEach(station => {
  
        // For each station, create a marker and bind a popup with the station's name
        bikeMarkers.push(L.marker([station.lat, station.lon], {
  
        }));
  
        // Add the marker to the bikeMarkers array
        bikeMarkers[bikeMarkers.length - 1].addTo(layers['ALL']);
      });
      // Create a layer group made from the bike markers array, pass it into the createMap function
  
  
    });
  
    // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  
  })
  
  