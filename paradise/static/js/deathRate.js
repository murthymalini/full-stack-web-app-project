
var myGeoData = statesData;
function setDeathRate(cause,year) {
    // console.log(myGeoData);
    var URL = "/data/" + year + "/" + cause.substr(0,3);
    for (var i = 0; i < myGeoData.length; i++) { //outer loop geojson state data
        console.log("process deathRate:" + myGeoData.features[i].properties.name);
        d3.json(URL).then(function (response) {
            var fatality = response.result;
            for (var j = 0; j < fatality.length; j++) { //inner loop death data
                if(myGeoData.features[i].properties.name == fatality[j].state) {
                    myGeoData.features[i].properties.density = fatality[j].deaths;
                    console.log("updated "+ myGeoData.features[i].properties.nam);
                }
            }
        });
    }
}