var workspace; // this variable is going to hold the router.



mapboxgl.accessToken = 'pk.eyJ1IjoibXBtY2tlbm5hOCIsImEiOiJfYWx3RlJZIn0.v-vrWv_t1ytntvWpeePhgQ';

var styleURL = 'mapbox://styles/mpmckenna8/cins56tdv008pafm10wymrsn7'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mpmckenna8/cins56tdv008pafm10wymrsn7',
  center:[ -122.42, 37.77 ],
  zoom:10
})


var campGeojson;
var campReq  = $.get('../shapes/campPoints.geojson', view.addcamps);

campReq.onreadystatechange = view.addcamps;


window.onload = (function(){



  map.on('load', function(){


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

    clicking.startMapClicks();


  })


})


$('#findLocRadio').on('click', function(e){
  console.log(e)
  console.log(this);
  console.log('implement letting the user center/zoom to their current location')
})
