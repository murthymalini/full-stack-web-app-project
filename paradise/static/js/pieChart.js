  
function buildPieCharts() {
  
    var URL = '/data';
  
    d3.json(URL).then((sampleData) => {
  
      // BUILD PIE CHART
      var dataPie = [{
        "labels": sampleData["otu_ids"].slice(0,10),
        "values": sampleData["sample_values"].slice(0,10),
        "hovertext": sampleData["otu_labels"].slice(0,10),
        "type": "pie"
      }];
  
      var layoutPie = {
        autosize: true,
        width: 400,
        height: 400,
        margin: { l: 0, r: 0, t:0, b:0}
      };
      
      Plotly.newPlot("pie", dataPie, layoutPie);
  
      // BUILD BUBBLE CHART
      var traceBubble = {
        x: sampleData["otu_ids"],
        y: sampleData["sample_values"],
        text: sampleData["otu_labels"],
        mode: 'markers',
        marker: {
          size: sampleData["sample_values"],
          color: sampleData["otu_ids"]
        }
      };
    
      var layoutBubble = {
          xaxis: {
            title: {
              text: "OTU_IDS"
            }}
      };
      
      var dataBubble = [traceBubble];
     
      Plotly.newPlot('bubble', dataBubble,layoutBubble);
    
    });
    
} // end function buildPieCharts