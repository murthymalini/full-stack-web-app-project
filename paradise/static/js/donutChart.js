function buildBarChart(year) {
    var ctx = document.getElementById('barChart').getContext('2d');

    var URL = '/total_deaths/' + year;
    d3.json(URL).then(function (response) {
        sampleData = response;
        myCauses = [];
        myDeaths = [];
        myAADR = [];

        for (var i = 0; i < sampleData.length; i++) {
            if (sampleData[i].causes != "All causes") {
                myCauses.push(sampleData[i].causes);
                myDeaths.push(sampleData[i].deaths);
                myAADR.push(sampleData[i].aadr);
            }
        }
        myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: myCauses.slice(0,10),
                datasets: [{
                    label: year + ' Death Rate',
                    data: myDeaths.slice(0,10),
                    backgroundColor: [
                        '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'],
                        // 'rgba(255, 99, 132, 0.7)',
                        // 'rgba(54, 162, 235, 0.7)',
                        // 'rgba(255, 206, 86, 0.7)',
                        // 'rgba(75, 192, 192, 0.7)',
                        // 'rgba(153, 102, 255, 0.7)',
                        // 'rgba(198, 140, 83, 0.7)',
                        // 'rgba(255, 153, 204, 0.7)',
                        // 'rgba(102, 255, 102, 0.7)',
                        // 'rgba(204, 51, 255, 0.7)',
                        // 'rgba(255, 159, 64, 0.7)'
                    // ],
                    borderColor: [                        
                        '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'],
                    //     'rgba(255, 99, 132, 1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(198, 140, 83, 1)',
                    //     'rgba(255, 153, 204, 1)',
                    //     'rgba(102, 255, 102, 1)',
                    //     'rgba(204, 51, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });
}  // end function buildBarChart

function buildDonutChart(year) {
    var ctx = document.getElementById('donutChart').getContext('2d');

    var URL = '/total_deaths/' + year;
    d3.json(URL).then(function (response) {
        sampleData = response;
        myCauses = [];
        myDeaths = [];
        myAADR = [];

        for (var i = 0; i < sampleData.length; i++) {
            if (sampleData[i].causes != "All causes") {
                myCauses.push(sampleData[i].causes);
                myDeaths.push(sampleData[i].deaths);
                myAADR.push(sampleData[i].aadr);
            }
        }

        myDonutChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: myCauses.slice(0,10),
                datasets: [{
                    label: ' Death Rate',
                    data: myDeaths.slice(0,10),
                    backgroundColor: [
                        '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']
                    //     'rgba(255, 99, 132, 1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(198, 140, 83, 1)',
                    //     'rgba(255, 153, 204, 1)',
                    //     'rgba(0, 204, 102, 1)',
                    //     'rgba(204, 51, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ]
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
					text: year + ' Death Rate'
				},
                tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
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

