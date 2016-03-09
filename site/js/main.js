window.onload = (function(){

  view.setUpBaseMapController();

  view.addBuilds("Ocean Campus", '../shapes/oceanCampusBuilds.geojson')

  view.addBuilds("North Beach", '../shapes/nbChinaTownBuildings.geojson')
  view.addBuilds("Airport", '../shapes/airport.geojson');

  view.addBuilds("Fort Mason", '../shapes/fortMason.geojson');

  view.setUpTop();

})

L.mapbox.accessToken = 'pk.eyJ1IjoibXBtY2tlbm5hOCIsImEiOiJfYWx3RlJZIn0.v-vrWv_t1ytntvWpeePhgQ';

var map = L.mapbox.map('map', null)
  .setView([37.77, -122.42], 12);


var campGeojson;
var campReq  = new XMLHttpRequest();

campReq.onreadystatechange = view.addcamps;

campReq.open('GET', '../shapes/campPoints.geojson');
campReq.send();
