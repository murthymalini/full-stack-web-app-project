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

  console.log(fatality);

  var heatArray = [];

  for (var i = 0; i < fatality.length; i++) {
    var latitude = fatality[i].Latitude;
    var longitude = fatality[i].Longitude;
    console.log(latitude);
  }
});

  //   if (latitude) {
  //     heatArray.push([latitude, longitude]);
  //   }
  // }
