
function init() {
  // Grab a reference to the dropdown select element
  var selectorCause = d3.select("#selCauseDataset");
  var selectorYear = d3.select("#selYearDataset");
  var selectorMeasure = d3.select("#selSummary");

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

  selectorCause.select("option").property("value", currentCause)
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

  selectorYear.select("option").property("value", currentYear)
    .text(currentYear);

  selectorMeasure
    .append("option")
    .text("AADR")
    .property("value", "aadr")
    .enter;

  selectorMeasure
    .append("option")
    .text("Total Deaths")
    .property("value", "deaths")
    .enter;



  selectorMeasure.select("option").property("value", "aadr")
    .text("AADR");

  buildDonutChart(currentYear, currentSummary);

  // setDeathRate(currentCause,currentYear,currentSummary);
  buildColorMap(currentCause, currentYear, currentSummary);

}

function optionChangeCause(newCause) {
  // Fetch new data each time a new cause is selected
  currentCause = newCause;
  // setDeathRate(currentCause,currentYear,currentSummary);
  buildColorMap(currentCause, currentYear, currentSummary);

}
function optionChangeYear(newYear) {
  // Fetch new data each time a new year is selected
  currentYear = newYear;
  
  if (currentSummary == 'aadr') {
    currentUnits = " aadr";
    chartTitle = currentYear + " Age Adjusted Death Rate (per 100,000 in population)";
  }
  else {
    currentUnits = " deaths";
    chartTitle = currentYear + " Total Deaths";
  }
  resetDonutCanvas();
  buildDonutChart(currentYear, currentSummary);

  // setDeathRate(currentCause,currentYear,currentSummary);
  buildColorMap(currentCause, currentYear, currentSummary);
}

function optionChangeSummary(newSummary) {
  // Fetch new data each time a new summary is selected
  currentSummary = newSummary;

  if (currentSummary == 'aadr') {
    currentUnits = " aadr";
    chartTitle = currentYear + " Age Adjusted Death Rate (per 100,000 in population)";
  }
  else {
    currentUnits = " deaths";
    chartTitle = currentYear + " Total Deaths";
  }

  resetDonutCanvas();
  buildDonutChart(currentYear, currentSummary);

  getDeathRate();
  buildColorMap(currentCause, currentYear, currentSummary);
}

// Initialize the dashboard

init();


