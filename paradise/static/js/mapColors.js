// stateColors.js -  choropleth map 

// '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']
var info = L.control();
var geojson;
var myColorMap = L.map('mapChoropleth').setView([37.0902, -95.7129], 4);


info.onAdd = function () {
// info.onAdd = function (myColorMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {

    this._div.innerHTML = '<h5>' + currentYear + ' Death Rates<br>' + currentCause + '</h5>' + (props ?
        '<b>' + props.name + '</b><br>' + props.density + ' total deaths'
        : 'Hover over a state');
};

function getColor_bkp(d) {
    return d > 100000 ? '#800026' :
           d > 50000  ? '#BD0026' :
           d > 25000  ? '#E31A1C' :
           d > 10000  ? '#FC4E2A' :
           d > 5000   ? '#FD8D3C' :
           d > 2000   ? '#FEB24C' :
           d > 1000   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {    
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
function getLegendColor_bkp(d) { //original code
    return d >= 100000 ? '#800026' :
           d >= 50000  ? '#BD0026' :
           d >= 25000  ? '#E31A1C' :
           d >= 10000  ? '#FC4E2A' :
           d >= 5000   ? '#FD8D3C' :
           d >= 2000   ? '#FEB24C' :
           d >= 1000   ? '#FED976' :
                      '#FFEDA0';
}

function getLegendColor(d) { //new code
    return d < 100    ? '#a6cee3' :
           d < 1000   ? '#1f78b4' :
           d < 10000  ? '#b2df8a' :
           d < 25000  ? '#33a02c' :
           d < 50000  ? '#fb9a99' :
           d < 100000 ? '#e31a1c' :
           d < 200000 ? '#fdbf6f' :
           '#ff7f00';
}

function getColor(d) {//new code
    return d < 100    ? '#a6cee3' :
           d < 1000   ? '#1f78b4' :
           d < 10000  ? '#b2df8a' :
           d < 25000  ? '#33a02c' :
           d < 50000  ? '#fb9a99' :
           d < 100000 ? '#e31a1c' :
           d < 200000 ? '#fdbf6f' :
           '#ff7f00';
}

function highlightFeature(e) { // mouseover event listener
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) { //mouseout event handler
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) { //click event handler
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}



function buildColorMap(cause,year) {
    // update geojson with deathRate based on currentYear and currentCause
    setDeathRate(cause,year);

    myColorMap.remove();
    // myColorMap = L.map('mapChoropleth').setView([37.0902, -95.7129], 4);
    myColorMap = L.map('mapChoropleth').setView([37.8, -96], 4);

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    }).addTo(myColorMap);

    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).bindPopup(function (layer) {
            return layer.features.properties.density;
    }).addTo(myColorMap);

    info.addTo(myColorMap);
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),

        grades = [0, 100, 1000, 10000, 25000, 50000, 100000,200000],
        
        labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getLegendColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    }
    legend.addTo(myColorMap);

}



