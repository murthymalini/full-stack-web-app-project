var svgWidth = 700;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "year";
var chosenYAxis = "aadr";
var abbrYOffset = 5;
var abbrXOffset = -11;

// function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d[chosenXAxis]) - 1,
        d3.max(censusData, d => d[chosenXAxis]) + 0.5
        ])
        .range([0, width]);
    return xLinearScale;
}

// function used for updating y-scale var upon click on axis label
function yScale(censusData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([200,
        //d3.min(censusData, d => d[chosenYAxis]) - 13364,
        //d3.max(censusData, d => d[chosenYAxis])
        9000
        ])
        .range([height, 0]);
    return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderXCircles(circlesGroup, newXScale, chosenXaxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));
    return circlesGroup;
}

// function used for updating circles group with a transition to
// new circles
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
}

function renderXAbbr(abbrGroup, newXScale, chosenXAxis) {
    abbrGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]) + abbrXOffset);
    return abbrGroup;
}

function renderYAbbr(abbrGroup, newYScale, chosenYAxis) {
    abbrGroup.transition()
        .duration(1000)
        .attr("y", d => newYScale(d[chosenYAxis]) + abbrYOffset);
    return abbrGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    if (chosenXAxis === "year") {
        var xLabel = "Year";
    }

    if (chosenYAxis === "aadr") {
        var yLabel = "AADR";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.causes}<br><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
        });
    circlesGroup.call(toolTip);
    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}

var url = "/total_deaths";
d3.json(url).then(function(response) {

    const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    var causeArray = [];
    var responseArray =[];
  
    for (var i = 0; i < response.length; i++) {
        var response_array = response[i];
        responseArray.push(response_array);
      if (causeArray.indexOf(response[i]) == -1 && response[i].causes !== "All causes") {
        var cause_array = response[i].causes;
        causeArray.push(cause_array);
    }
    }
    var unique_causeArray = causeArray.filter(distinct);
    // console.log(responseArray);

    // xLinearScale function above csv import
    var xLinearScale = xScale(response, chosenXAxis);

    // yLinearScale function above csv import
    var yLinearScale = yScale(response, chosenYAxis);

   // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = unique_causeArray.map( function(grpName) { // .map allows to do something for each element of the list
        return {
          name: grpName,
          values: responseArray.map(function(d) {
            return {time: d.year, value: d.aadr};
          })
        };
      });
    //   console.log(dataReady)

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(unique_causeArray)
      .range(d3.schemeSet2);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = d3.scaleLinear()
    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = d3.scaleLinear()
    chartGroup.append("g")
        .call(leftAxis);
      
    
    var line = d3.line()
        .x(function(d) { return xAxis(+d.time) })
        .y(function(d) { return yAxis(+d.value) })
        chartGroup.selectAll("myLines")
        .data(dataReady)
        .enter()
        .append("path")
          .attr("d", function(d){ return line(d.values) } )
          .attr("stroke", function(d){ return myColor(d.name) })
          .style("stroke-width", 4)
          .style("fill", "none")

    var circlesGroup = chartGroup.selectAll("circle")
        .data(response)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 5)
        .style("fill", function(d){ return myColor(d.causes) })
        .attr("opacity", "6");

    // Add a legend at the end of each line
    // svg
    //   .selectAll("myLabels")
    //   .data(response)
    //   .enter()
    //     .append('g')
    //     .append("text")
    //       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
    //       .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.deaths) + ")"; }) // Put the text at the position of the last point
    //       .attr("x", 12) // shift the text a bit more right
    //       .text(function(d) { return d.name; })
    //       .style("fill", function(d){ return myColor(d.name) })
    //       .style("font-size", 15)
    

    // Create group for  2 x- axis labels
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var yearLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "year") // value to grab for event listener
        .classed("active", true)
        .text("Year");

    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)")

    // append y axis
    var deathLabel = yLabelsGroup.append("text")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("value", "aadr")
        .attr("dy", "1em")
        .classed("active", true)
        .text("AADR");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(response, chosenXAxis);

                // updates x axis with transition
                xAxis = renderXAxes(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

                //abbrGroup = renderXAbbr(abbrGroup, xLinearScale, chosenXAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                // changes classes to change bold text
                if (chosenXAxis === "year") {
                    yearLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
            }
        });

        // y axis labels event listener
    yLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

                // replaces chosenXAxis with value
                chosenYAxis = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                yLinearScale = yScale(censusData, chosenYAxis);

                // updates x axis with transition
                yAxis = renderYAxes(yLinearScale, yAxis);

                // updates circles with new x values
                circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

                //abbrGroup = renderYAbbr(abbrGroup, yLinearScale, chosenYAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                // changes classes to change bold text
                if (chosenYAxis === "aadr") {
                    deathLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }
        });

    // y axis labels event listener
    yLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

                // replaces chosenXAxis with value
                chosenYAxis = value;

                // console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                yLinearScale = yScale(response, chosenYAxis);

                // updates x axis with transition
                yAxis = renderYAxes(yLinearScale, yAxis);

                // updates circles with new x values
                circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

                //abbrGroup = renderYAbbr(abbrGroup, yLinearScale, chosenYAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                // changes classes to change bold text
                if (chosenYAxis === "aadr") {
                    deathLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }
        });

});