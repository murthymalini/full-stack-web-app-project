var url = "/data";
var markers = L.markerClusterGroup();

d3.json(url, function (response) {
    var fatality = response.result;
    console.log("My heatmap data today is:");
    console.log(response);

    var heatArray = [];
    var latitude = 0;
    var longitude = 0;
    var aadr = 0;
    // var marker = [];
    var state = "";



    for (var i = 0; i < fatality.length; i++) {
        latitude = fatality[i].Latitude;
        longitude = fatality[i].Longitude;
        state = fatality[i].state;
        deaths = fatality[i].deaths;
        aadr = fatality[i].aadr;
        theYear = fatality[i].year;

        // marker = L.marker([latitude, longitude]).addTo(myMap); 
        // console.log(latitude, longitude, aadr, state)
        markers.addLayer(L.marker([latitude, longitude])
            .bindPopup("<h1>" + state + "</h1><hr><p>Total Deaths in " + theYear + ": " + deaths + "</p><p>Deaths per 100,000 in population: " + aadr + "</p>"));

    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
});

// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var causes = L.layerGroup(markers);

// Create overlay object to hold our overlay layer
var overlayMaps = {
    "All Causes (2017)": causes
};


// Define base layer maps
var satmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
});
var outmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
});

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Satellite Map": satmap,
    "Street Map": streetmap,
    "Grayscale Map": lightmap,
    "Outdoors Map": outmap
};



var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [satmap, lightmap, outmap, streetmap, causes]
});
// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
collapsed: false
}).addTo(myMap);


