function buildTestCharts() {
    var data = [{
        type: "choroplethmapbox", locations: ["NY", "MA", "VT","MO"], z: [-50, -10, -20,-35],
        geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
      }];
      
      var layout = {mapbox: {center: {lon: -74, lat: 43}, zoom: 3.5},
                    width: 600, height:400};
      
      var config = {mapboxAccessToken: API_KEY};
      var URL = "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
      d3.json(URL).then((stateData) => {
        myAbbr = [];
        myStates = [];
        myAADR = [];
      });

    console.log("build Test Plotly Choropleth");
      Plotly.newPlot('mapChoroPlot', data, layout, config);
}

function buildChoroplethMap(cause,year) {

    var URL = "/data/" + year + "/" + cause.substr(0,3);
    // mapChoropleth
    d3.json(URL).then((sampleData) => {
        myCauses = [];
        myDeaths = [];
        myAADR = [];

        for (var i = 0; i < sampleData.length; i++) {
            if (sampleData[i].causes != "All causes") {
                myCauses.push(sampleData[i].causes);
                myDeaths.push(sampleData[i].deaths);
                myAADR.push(sampleData[i].aadr);
            }
        }
  
    });
  
  }
  