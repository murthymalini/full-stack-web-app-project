

function buildTestCharts(year, cause) {
    var url = "/data/" + year + "/" + cause.substr(0,3);
    var myAbbr = [];
    var deaths = [];
    // getting state abbreviations
    d3.json("static/js/statesabbr.js").then((statesAbbr) => {
        console.log(statesAbbr);
        for (var i = 0; i < statesAbbr.data.length; i++) {
            myAbbr.push(statesAbbr[i].data.Code);
        }
        
    });
     // getting deathrates
    d3.json(url).then((response) => {
        var fatality = response.result;   
        for (var i = 0; i < fatality.length; i++) {   
        deaths.push(fatality[i].deaths);
        }
    });

    console.log(deaths);

//     var data = [{
//         type: “choroplethmapbox”, locations: [“NY”, “MA”, “VT”, “MO”], z: [-50, -10, -20, -35],
//         geojson: “https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json”
//       }];
// var layout = {
//     mapbox: { center: { lon: -74, lat: 43 }, zoom: 3.5 },
//     width: 600, height: 400
// };
// var config = { mapboxAccessToken: API_KEY };

// console.log(“build Test Plotly Choropleth”);
// Plotly.newPlot(‘mapChoroPlot’, data, layout, config);
}





