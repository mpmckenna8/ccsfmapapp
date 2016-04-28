var workspace; // this variable is going to hold the router.


window.onload = (function(){


  view.setUpBaseMapController();

  view.addBuilds("Ocean Campus", '../shapes/oceanBuilds.geojson')

  view.addBuilds('Evans Campus', '../shapes/evansbuilds.geojson')

  view.addBuilds("Chinatown / North Beach", '../shapes/nbChinaTownBuildings.geojson')
  view.addBuilds("Airport", '../shapes/airport.geojson');

  view.addBuilds("Fort Mason", '../shapes/fortMason.geojson');

  view.addBuilds("Civic Center", "../shapes/civicBuild.geojson");

  view.addBuilds("Downtown Center", "../shapes/downtownBuild.geojson");

  view.addBuilds("Southeast Center", "../shapes/southEastBuild.geojson");


  view.addBuilds("Gough Street", "../shapes/goughbuild.geojson");
  view.addBuilds("John Adams", "../shapes/johnAdamsBuilds.geojson");
  view.addBuilds("Mission Campus", "../shapes/missionBuilds.geojson")


  view.setUpTop();



})


searches.searchInit();


L.mapbox.accessToken = 'pk.eyJ1IjoibXBtY2tlbm5hOCIsImEiOiJfYWx3RlJZIn0.v-vrWv_t1ytntvWpeePhgQ';

var map = L.mapbox.map('map', null)
  .setView([37.77, -122.42], 12);


var campGeojson;
var campReq  = $.get('../shapes/campPoints.geojson', view.addcamps);

campReq.onreadystatechange = view.addcamps;
