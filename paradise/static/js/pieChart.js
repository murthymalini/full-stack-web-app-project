  
function buildPieCharts(year) {
  
    var URL = '/total_deaths/' + year;
    
    d3.json(URL).then(function (response) {
        sampleData = response;
        myCauses = [];
        myDeaths = [];

        for (var i = 0; i < sampleData.length; i++) {
            if (sampleData[i].causes != "All causes") {
                myCauses.push(sampleData[i].causes);
                myDeaths.push(sampleData[i].deaths);
            }
        }
        
  
      // BUILD PIE CHART
      var dataPie = [{
        "labels": myCauses.slice(0,10),
        "values": myDeaths.slice(0,10),
        "hovertext": year,
        "type": "pie",
        domain: {column: 0},
        name: year + ' Deaths',
        hoverinfo: 'label+percent+value+name',
        hole: .2,
      }];
  
      var layoutPie = {
        autosize: false,
        width: 450,
        height: 400,
        margin: { l: 0, r: 0, t:0, b:0}
      };
      
      Plotly.newPlot("pie", dataPie, layoutPie);
    });
    
} // end function buildPieCharts