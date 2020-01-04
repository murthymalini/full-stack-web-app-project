
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


