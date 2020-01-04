function buildmetadata(){
var url = "/total_deaths";
var causename = "Unintentional injuries";
//============Set up chart=====================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// ====Create an SVG wrapper,append an SVG group that will hold chart and set margins=====
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json(url).then(function(response) {

  //console.log(response);

  var deathArray = [];
  var yearArray = [];

  for (var i = 0; i < response.length; i++) {
    var deaths = response[i].deaths;
    var year = response[i].year;
    if (response[i].causes==causename) {
      deathArray.push([deaths]);
      yearArray.push([year]);
    }
  }
  console.log(deathArray);
  console.log(yearArray);


/////////////////////////////////////////////////////////
// ==============Create Scales====================
const xScale = d3.scaleLinear()
.domain(d3.extent(response, d => d.yearArray))
.range([0, width])
.nice(); //makes the intersection of axes crisp

const yScale = d3.scaleLinear()
.domain([6,d3.max(response, d => d.deathArray)])
.range([height, 0])
.nice();

// =============Create Axes=========================
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);


// ============Append axes to the chartGroup==========
chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
chartGroup.append("g").call(yAxis);

//============Generate scatter plot=========
chartGroup.selectAll("circle")
.data(response)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.yearArray))
.attr("cy", d=>yScale(d.deathArray))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.75);

//============add texts to each datapoint=========
chartGroup.append("g")
.selectAll('text')
.data(response)
.enter()
.append("text")
.text(d=>d.abbr)
.attr("x",d=>xScale(d.yearArray))
.attr("y",d=>yScale(d.deathArray))
.classed(".stateText", true)
.attr("font-family", "sans-serif")
.attr("text-anchor", "middle")
.attr("fill", "white")
.attr("font-size", "10px")
.style("font-weight", "bold")
.attr("alignment-baseline", "central");

//============add axes titles=========
chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .text("Median Age");

    chartGroup.append("text")
    .attr("y", 0 - ((margin.left / 2) + 2))
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .attr("transform", "rotate(-90)")
    .text("Smokers (%)");
}).catch(function(error) {
console.log(error);
});

};
buildmetadata();