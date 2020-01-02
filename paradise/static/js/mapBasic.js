// mapBasic.js - show basic map with marker   

var myMap = L.map('map').setView([37.0902, -95.7129], 4);

var marker = [];

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

function buildBasicMap(cause,year) {



    var URL = "/data/" + year + "/" + cause.substr(0,3);

    d3.json(URL).then(function (response) {
        var fatality = response.result;

        var latitude = 0;
        var longitude = 0;
        var aadr = 0;
        var deaths = 0;
        var state = "";

        for (var i = 0; i < fatality.length; i++) {
            latitude = fatality[i].Latitude;
            longitude = fatality[i].Longitude;
            state = fatality[i].state;
            deaths = fatality[i].deaths;
            aadr = fatality[i].aadr;
            theYear = fatality[i].year;

            marker = L.marker([latitude, longitude])
            .bindPopup("<h4>" + state + "</h4><p>Cause of Death: " + cause + "<br>Death Rate: " 
            + deaths + "<br>Year: " + theYear +  "<br>Age Adjusted Deaths per 100,000 in population: " + aadr + "</p>")
            .addTo(myMap); 

        }

    });


        
   
}
