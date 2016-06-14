var searches = {
  campusSearch:[],
  buildingSearch:[],


  searchInit: function(){
    console.log("in search", this);





  },


  addToSearch(layer){

    for( i in layer.features){
    //  console.log(layer.features[i])
      var feature = layer.features[i];
      if(feature = layer.features[i]){
      this.campusSearch.push(
        {
          name: feature.properties.campusname,
          source:"camps",
          id: layer + i,
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0]

        }
      )
    }


    }


    searches.campsBH = new Bloodhound({
    name:"CampSearch",
    datumTokenizer: function (d){
      //console.log('tockan')
      //console.log(d);
      return Bloodhound.tokenizers.whitespace(d.name)
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: this.campusSearch,
    limit:5
  })

  searches.geonamesBH = new Bloodhound({
  name: "GeoNames",
  datumTokenizer: function (d) {
  //  console.log(d)
    return Bloodhound.tokenizers.whitespace(d.name);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
    filter: function (data) {
    //  console.log(data)
      return $.map(data.geonames, function (result) {
        return {
          name: result.name + ", " + result.adminCode1,
          lat: result.lat,
          lng: result.lng,
          source: "GeoNames"
        };
      });
    },
    ajax: {
      beforeSend: function (jqXhr, settings) {
        settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
        $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
      },
      complete: function (jqXHR, status) {
        $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
      }
    }
  },
  limit: 5
});






  },

  addBuildSearch: function (geojson, campus){

    var keyStr = campus+"buildings";

    if( !searches.buildings) {
        searches.buildings = [];
    };

    for(i in geojson){
      var feature = geojson[i];
      var centroid = getPolyCentroid(feature);
      searches.buildings.push({
        name: feature.properties.name || 'none',
        source:"Buildings",
        id: keyStr + i,
        lat: centroid[1],
        lng: centroid[0]

      })

    }

  //  console.log('putGeojson into search array', geojson)



  this.buildCount++;
  var buildingsBH ;
  if( this.buildCount >= 11){

      console.log('last buildings')

       buildingsBH = new Bloodhound({
        name: "buildingSearch",
        datumTokenizer: function (d){
          //console.log('tockan')
          return Bloodhound.tokenizers.whitespace(d.name)
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: searches['buildings'],
        limit:10
      })

      this.campsBH.initialize();


      this.geonamesBH.initialize();

      buildingsBH.initialize();

      view.setupSearch(searches.campsBH, searches.geonamesBH, buildingsBH);


  }


},
buildCount: 0,


}



var layersHelp = {

  buildingSrcs: [],


}



function getPolyCentroid (feat){

  var centroid = turf.centroid(feat.geometry);

  return centroid.geometry.coordinates;

};
