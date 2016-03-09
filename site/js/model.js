var searches = {
  campusSearch:[],
  buildingSearch:[],


}


var layersHelp = {

  
  campusLayer: L.geoJson(null, {

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

}
