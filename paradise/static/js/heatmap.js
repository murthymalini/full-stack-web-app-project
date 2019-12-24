var myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "/causes";
d3.json(url, function (response) {
  var fatality = response.result;
  console.log(fatality)

  var heatArray = [];
  var latitude = 0;
  var longitude = 0;
  var aadr = 0;
  var marker = [];
  var state = "";

  var markers = L.markerClusterGroup();

  for (var i = 0; i < fatality.length; i++) {
    latitude = fatality[i].Latitude;
    longitude = fatality[i].Longitude;
    state = fatality[i].state;
    deaths =   fatality[i].deaths;
    aadr = fatality[i].aadr;
    theYear = fatality[i].year;

    // marker = L.marker([latitude, longitude]).addTo(myMap); 
    console.log(latitude,longitude,aadr,state)
    markers.addLayer(L.marker([latitude, longitude])
      .bindPopup("<h1>" +state+"</h1><hr><p>Total Deaths in " + theYear + ": "+deaths+"</p><p>Deaths per 100,000 in population: "+aadr+"</p>"));



  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
});


    
  //   if (latitude) {
  //     heatArray.push([latitude, longitude]);
  //   }

  // var heat = L.heatLayer(heatArray, {
  //   radius: aadr*0.10,
  //   blur: 35
  // }).addTo(myMap);


