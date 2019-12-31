  
function buildPieCharts(year) {
  
    var URL = '/total_deaths/' + year;
    console.log("Build Pie Chart Data:");
    console.log(year);
    d3.json(URL).then(function (response) {
        console.log("Pie chart json output, URL, response");
        console.log(URL);
        sampleData = response;
        console.log(sampleData);
        myCauses = [];
        myDeaths = [];

        for (var i = 0; i < sampleData.length; i++) {
            if (sampleData[i].causes != "All causes") {
                myCauses.push(sampleData[i].causes);
                myDeaths.push(sampleData[i].deaths);
            }
        }
        console.log(myCauses);
        console.log(myDeaths);
        
  
      // BUILD PIE CHART
      var dataPie = [{
        "labels": myCauses.slice(0,10),
        "values": myDeaths.slice(0,10),
        "hovertext": year,
        "type": "pie"
      }];
  
      var layoutPie = {
        autosize: true,
        width: 500,
        height: 200,
        margin: { l: 0, r: 15, t:0, b:0}
      };
      
      Plotly.newPlot("pie", dataPie, layoutPie);
  
      
    
    });
    
} // end function buildPieCharts