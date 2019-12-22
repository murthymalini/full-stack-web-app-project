function buildmetadata(){
var url = "/causes";

d3.json(url).then(function(response) {

  console.log(response);

  var deathArray = [];

  for (var i = 0; i < response.result.length; i++) {
    var deaths = response.result[i].deaths;
    if (deaths) {
      deathArray.push([deaths]);
    }
  }
  console.log(deathArray);
});
};

buildmetadata();