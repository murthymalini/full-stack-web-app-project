function resetDonutCanvas(){
    $('#donutChart').remove(); // this is my <canvas> element
    $('#myChart').append('<canvas id="donutChart" width="600" height="400"></canvas>');
}

function buildDonutChart(year,summary) {
    var ctx = document.getElementById('donutChart').getContext('2d');

    var URL = '/total_deaths/' + year;
    d3.json(URL).then(function (response) {
        myCauses = [];
        myDeaths = [];


        for (var i = 0; i < response.length; i++) {
            if (response[i].causes != "All causes") {
                myCauses.push(response[i].causes);

                if (summary == 'deaths') {
                    myDeaths.push(response[i].deaths);
                }
                else {
                    myDeaths.push(response[i].aadr);
                }
            }
        }

        myDonutChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: myCauses.slice(0,10),
                datasets: [{
                    label: chartTitle,
                    data: myDeaths.slice(0,10),
                    backgroundColor: [
                        '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c',
                        '#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']
                }]
            },
            options: {
				responsive: true,
				legend: {
					position: 'right',
                },
                cutoutPercentage: 20,
				title: {
					display: true,
					text: chartTitle
				},
                tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function(previousValue, currentValue) {
                          return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                  
                        return  percentage + "% (" +currentValue+")";
                      }
                    }
                  },

            }
        });
    });
}  // end function buildDonutChart