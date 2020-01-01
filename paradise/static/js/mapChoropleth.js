function buildTestCharts(cause, year) {
  var url = "/data/" + year + "/" + cause.substr(0, 3);
  var myAbbr = [];
  var myState = [];
  var deaths = [];

  console.log("build Test Plotly Choropleth");
  // // getting state abbreviations
  d3.json("https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json").then((states) => {
      stateData = states.features
      // for (var i = 0; i < stateData.length; i++) {
      for (var i = 0; i < 5; i++) {
          myAbbr.push(stateData[i].id);
          myState.push(stateData[i].properties.name);
      }
  });

  // // plot data
  var data = [{
      type: "choroplethmapbox", locations: ["MO","AZ","NY","GA","CA"], z: [-50,25,-2,75,300],
      geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
    }];
  var layout = {
      mapbox: { center: { lon: -74, lat: 43 }, zoom: 2 },
      width: 600, height: 400
  };
  var config = { mapboxAccessToken: API_KEY };

  Plotly.newPlot('mapChoroPlot', data, layout, config);
}
