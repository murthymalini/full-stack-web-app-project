
//var myGeoData = statesData.features;
function getDeathRate() {
    var URL = "/data/" + currentYear + "/" + currentCause.substr(0,3);
    d3.json(URL).then(function (response) {
        var fatality = response.result;
        for (var j = 0; j < fatality.length; j++) { //outer loop death data
            for (var i = 0; i < statesData["features"].length; i++) { //inner loop geojson state data
                if(statesData["features"][i].properties["name"] == fatality[j].state) {
                    if(currentSummary == 'deaths'){
                        statesData["features"][i].properties["density"] = fatality[j].deaths;
                    }
                    else {
                        statesData["features"][i].properties["density"] = fatality[j].aadr;
                    }
                    break;
                }
            }
        }
    });
    return statesData;
    
}

// var URL = "/data/" + year + "/" + cause.substr(0,3);
// d3.json(URL).then(function (response) {
//     var fatality = response.result;
//     console.log("lookup in progress..");
//     console.log("current density;" + feature.properties.density);
//     for (var i = 0; i < fatality.length; i++) {
//         if (fatality[i].state == feature.properties.name) {
//             feature.properties.density = fatality[i].deaths;
//             deathTotal = fatality[i].deaths;
//             console.log("state: " + feature.properties.name);
//             console.log(" total death:"+ deathTotal );
//             console.log("updated density: " + feature.properties.density);
//             break;
//         }
//     }
// });
