var myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 5
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

  for (var i = 0; i < fatality.length; i++) {
    latitude = fatality[i].Latitude;
    longitude = fatality[i].Longitude;
    aadr =   fatality[i].aadr;

    marker = L.marker([latitude, longitude]).addTo(myMap); 
    
  //   if (latitude) {
  //     heatArray.push([latitude, longitude]);
  //   }

  // var heat = L.heatLayer(heatArray, {
  //   radius: aadr*0.10,
  //   blur: 35
  // }).addTo(myMap);

  }

});
