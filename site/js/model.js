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


    var campsBH = new Bloodhound({
    name:"CampSearch",
    datumTokenizer: function (d){
      //console.log('tockan')
      //console.log(d);
      return Bloodhound.tokenizers.whitespace(d.name)
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: this.campusSearch,
    limit:10
  })

  var geonamesBH = new Bloodhound({
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
  limit: 10
});



    campsBH.initialize();


    geonamesBH.initialize();

    view.setupSearch(campsBH, geonamesBH);


  },



}


var layersHelp = {



}
