function buildTestCharts(cause, year) {
  var url = "/data/" + year + "/" + cause.substr(0, 3);
  var myAbbr = [];
  var myState = [];
  var deaths = [];

  console.log("build Test Plotly Choropleth");
  // // getting state abbreviations
  d3.json("https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json").then((states) => {
      console.log("d3json hello states");
      console.log("json type: " + states.type);
      stateData = states.features
      console.log("Number of States: " + stateData.length);
      console.log("json data: " + stateData);
      console.log("state abbrev sample: " + stateData[1].id);
      console.log("state Name sample: " + stateData[1].properties.name);
      // for (var i = 0; i < stateData.length; i++) {
      for (var i = 0; i < 5; i++) {
          myAbbr.push(stateData[i].id);
          myState.push(stateData[i].properties.name);
      }
  });
  console.log("prepare to get death rates");
  // getting deathrates
  d3.json(url).then((response) => {
      var myData = response.result;
      for (var i = 0; i < 5; i++) {
          // for (var i = 0; i < myData.length; i++) {
          deaths.push(myData.deaths);
      }
      console.log(deaths);
  });

  var map = L.map('mapChoroPlot').setView([39.9897471840457, -75.13893127441406], 11)

  // Add basemap
  L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  



  // plot data
  var data = [{
      type: "choroplethmapbox", locations: myAbbr, z:[deaths],
      geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
    }];
  var layout = {
      mapbox: { center: { lon: -95.7129, lat: 37.0902 }, zoom: 2 },
      width: 600, height: 400
  };
  var config = { mapboxAccessToken: API_KEY };

  Plotly.newPlot('mapChoroPlot', data, layout, config);
}
