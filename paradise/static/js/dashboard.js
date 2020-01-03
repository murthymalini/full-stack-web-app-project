// var currentCause = "All causes";        
// var currentYear = "2017";

function init() {
    // Grab a reference to the dropdown select element
    var selectorCause = d3.select("#selCauseDataset");
    var selectorYear = d3.select("#selYearDataset");
  
    // Use the list of distinct causes to populate the select options
    var url = "/causes";
    d3.json(url).then(function (response) {
      var causeList = response.result;
      causeList.forEach((cause) => {
        selectorCause
          .append("option")
          .text(cause.cause_name)
          .property("value", cause.cause_name)
          .enter;
      });  
    });
  
    d3.select("#selCauseDataset").select("option").property("value",currentCause)
      .text(currentCause);
  
    // Use the list of distinct years  to populate the select options
    var url = "/years";  
    d3.json(url).then(function (response) {
      var yearList = response.result;
      yearList.forEach((year) => {
        selectorYear
          .append("option")
          .text(year.year)
          .property("value", year.year);
      });      
    }); 
  
    buildDonutChart(currentYear);
    buildColorMap(currentCause,currentYear);
  
    // buildBasicMap(currentCause,currentYear);
    // buildPieCharts(currentYear);
    // buildBarChart(currentYear);
    // buildTestCharts(currentCause,currentYear);
    // buildLayeredMap(currentCause,currentYear);
    // buildLineChart();
    
  }
    
  function optionChangeCause(newCause) {
      // Fetch new data each time a new cause is selected
      currentCause = newCause;
  
      buildColorMap(currentCause,currentYear);
  
      // buildBasicMap(currentCause,currentYear);
      // buildLayeredMap(currentCause,currentYear);
      // buildLineChart();
  }
  function optionChangeYear(newYear) {
      // Fetch new data each time a new year is selected
      currentYear = newYear;
  
      buildDonutChart(currentYear);
      buildColorMap(currentCause,currentYear);
  
      // buildPieCharts(currentYear);
      // buildBarChart(currentYear);
      // buildBasicMap(currentCause,currentYear);
      // buildLayeredMap(currentCause,currentYear);
      // buildLineChart();
  }  
  
  // Initialize the dashboard
  init();
  