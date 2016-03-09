window.onload = (function(){

  view.setUpBaseMapController();

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

campReq.onreadystatechange = addcamps;

campReq.open('GET', '../shapes/campPoints.geojson');
campReq.send();



//$('#campList').accordion({collapsible:true})
var campusLayer = L.geoJson(null, {

  pointToLayer:function(feature,latlon){
  //  console.log(latlon);
  //  console.log(feature.properties.campusname);
    var campname = feature.properties.campusname;
    return L.marker(latlon, {
      icon: L.divIcon({
       className: 'label',
       html: feature.properties.campusname,
       iconSize: [100, 40]
   })
});
  //  return L.circleMarker(latlon, {radius: 6});;
  }
})


// Adds the campuses to the map and need to add to the side thing
function addcamps(dat){
  console.log(this)
  console.log(dat)
  console.log(campReq.status);

  if(campReq.status === 200  && campReq.readyState === 4){

  //  console.log(typeof(JSON.parse(campReq.responseText)))
    console.log('worked')
    campGeojson = JSON.parse(campReq.responseText);
    addToSide(campGeojson);


  var featureLayer = campusLayer.addData(campGeojson)
/*
   L.mapbox.featureLayer(campGeojson, {

    pointToLayer:function(feature,latlon){
    //  console.log(latlon);
    //  console.log(feature.properties.campusname);
      var campname = feature.properties.campusname;
      return L.marker(latlon, {
        icon: L.divIcon({
         className: 'label',
         html: feature.properties.campusname,
         iconSize: [100, 40]
     })
 });
    //  return L.circleMarker(latlon, {radius: 6});;
    }
  })
  */
  .addTo(map);

  console.log(featureLayer)
//  $('#campList').accordion({collapsible:true})



}
}





function addToSide(feat){
  console.log('add feat to', feat);
  var camli= document.getElementById('campList');
  for(i in feat.features){
 console.log(camli.innerHTML);
 console.log(feat.features[i])
  camli.innerHTML += '<h5 class="campo" data="'+ feat.features[i].properties.campusname + '"><span class="campis">' +
  feat.features[i].properties.campusname + '</h5> <div> <h7 class="buildList">Buildings</h7> <div class="buildname '+ feat.features[i].properties.campusname.split(' ')[0] +'"></div></div></span>';
}

$('#campList').accordion({collapsible:true, active:false})

$('.campo').click(function(d){

  console.log('lci calied on', (d.currentTarget.attributes.data.value))

  var dunnoca = d.currentTarget.attributes.data.value;
  console.log((typeof(dunnoca)));
  gocamp(dunnoca);
})
}




function gocamp(feat){
var cakey = feat;
  console.log((cakey))

  for(i in campGeojson.features){
    if(campGeojson.features[i].properties.campusname == cakey){

      console.log('right feat, ', campGeojson.features[i].geometry)
      var geco = [campGeojson.features[i].geometry.coordinates[1], campGeojson.features[i].geometry.coordinates[0]];
      map.setView(geco, 18)
    }
  }



}

/*
function gotofeat( lat, lon){
  console.log('should go to feat ' + lat + ", " + lon);
  console.log($('.Fort')[1])
  map.fireEvent('click', {
    latlng: [lat, lon]
  })
}

*/

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}
