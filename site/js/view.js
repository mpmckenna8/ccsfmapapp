// put stuff messing with the view in here

var view = {

  setUpTop: function(){
    var workspace; // this variable is going to hold the router.
    $(window).resize(function() {
      sizeLayerControl();
    });

    $(document).on("click", ".feature-row", function(e) {
      $(document).off("mouseout", ".feature-row", clearHighlight);
      sidebarClick(parseInt($(this).attr("id"), 10));
    });

    $(document).on("mouseover", ".feature-row", function(e) {
      highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
    });

    $(document).on("mouseout", ".feature-row", clearHighlight);

    $("#about-btn").click(function() {
      $("#aboutModal").modal("show");
      $(".navbar-collapse.in").collapse("hide");
      return false;
    });

    $("#full-extent-btn").click(function() {
      map.fitBounds(layersHelp.campusLayer.getBounds());
      $(".navbar-collapse.in").collapse("hide");
      return false;
    });

    $("#legend-btn").click(function() {

      $("#legendModal").modal("show");
      $(".navbar-collapse.in").collapse("hide");

      return false;
    });

    $("#login-btn").click(function() {
      $("#loginModal").modal("show");
      $(".navbar-collapse.in").collapse("hide");
      return false;
    });

    $("#list-btn").click(function() {
      $('#sidebar').toggle();
      //map.invalidateSize();
      console.log('need to fix the map so it goes to 100% width or back to sharing width')
      return false;
    });

    $("#nav-btn").click(function() {
      $(".navbar-collapse").collapse("toggle");
      return false;
    });

    $("#sidebar-toggle-btn").click(function() {
      $("#sidebar").toggle();
      map.invalidateSize();
      return false;
    });

    $("#sidebar-hide-btn").click(function() {
      $('#sidebar').hide();
      map.invalidateSize();
    });

          /* Highlight search box text on click */
      $("#searchbox").click(function () {
        $(this).select();
      });


      /* Prevent hitting enter from refreshing the page */
      $("#searchbox").keypress(function (e) {
        console.log(e)
        if (e.which == 13) {
          e.preventDefault();
        }
      });

  },




  addBuilds: function(campus, loc){

    view.addDownload(campus + ' buildings', loc)

    $.get(loc, function(data){
//      console.log(typeof(data))

        var buildgeo = data;
        var datStr = campus.split(' ')[0];

        // for some reason when not running locally jquery automatically converts to json
        // so this if fixes is
        if(typeof(buildgeo) === 'string'){
          buildgeo = JSON.parse(data);
        }


        searches.addBuildSearch(buildgeo.features, campus);


        var oncampus = $("."+ campus.split(' ')[0]) //("Civic Center")

// just better quilfy all the campus names and send those to add to downloads

        var buildlist = "<ul>";

        for(i in buildgeo.features){

          var feature = buildgeo.features[i];

            buildlist = buildlist + "<a href='./#building/" +  datStr + "'><li class='" +campus + "' onclick='buildclick(this)' >" + feature.properties.name + "</li> </a>";

        }

        buildlist += "</ul>";

        oncampus.append(buildlist);

        var count = 0;

      //  console.log(buildlist)

        map.addSource(datStr, {
                  'type':'geojson',
                  'data':buildgeo
              });

        layersHelp.buildingSrcs.push(datStr)


        map.addLayer({
                'id': datStr,
                'type': 'fill',
                'source': datStr,
                'paint': {
                "fill-outline-color": "red",
                //  "line-width": 1,
                'fill-color': '#FF0000',
                },
                'layout':{

                },
                'interactive':true
              })

    })


  },
  setUpBaseMapController: function(){

    console.log('need to set up switching basemaps');

  },


  addToSide: function(feat){

      var camli= document.getElementById('campList');

      for(i in feat.features){
        //console.log(camli.innerHTML);
        camli.innerHTML += '<h5 class="campo" data="'+ feat.features[i].properties.campusname + '"><span class="campis">' +
        feat.features[i].properties.campusname + '</h5> <div> <h7 class="buildList">Buildings</h7> <div class="buildname '+ feat.features[i].properties.campusname.split(' ')[0] +'"></div></div></span>';
      }

      $('#campList').accordion({collapsible:true, active:false, heightStyle: "content"})

      $('.campo').click(function(d){

        console.log('lci calied on', (d.currentTarget.attributes.data.value))

        var dunnoca = d.currentTarget.attributes.data.value;
        console.log((typeof(dunnoca)));
        view.gocamp(dunnoca);



      })
  },




  addcamps: function(dat){


    if(campReq.status === 200  && campReq.readyState === 4){


      campGeojson = JSON.parse(campReq.responseText);
      view.addToSide(campGeojson);
      searches.addToSearch(campGeojson);
      console.log(campGeojson)

      // locally http://localhost:8080/shapes/campPoints.geojson



      //  var campPointLay = new mapboxgl.GeoJSONSource(    {data:campReq.responseText}  )

      map.on('style.load', function(){


        map.addSource('campuses', {
            'type':'geojson',
            'data':campGeojson
          });


    //      console.log('should add cmmpus labels')
          map.addLayer({
              'id': 'campusPois',
              'type': 'symbol',
              'source': 'campuses',
              'layout':{
                'text-field':'{campusname}',
                'text-allow-overlap': true,
                "text-size": 15

              },
              'paint':{
                'text-color': 'white',

              },
              'interactive':false,
            })

  })




}},


 gocamp: function (feat){
    var cakey = feat;
      console.log((cakey))

      for(i in campGeojson.features){
        if(campGeojson.features[i].properties.campusname == cakey){

        //  console.log('right feat, ', campGeojson.features[i].geometry)
          var geco = [campGeojson.features[i].geometry.coordinates[1], campGeojson.features[i].geometry.coordinates[0]];
    //      map.setView(geco, 16)
        console.log('should fly to ', geco)
          map.flyTo({center:campGeojson.features[i].geometry.coordinates,
            zoom: 16}
          )

        }
      }

  },

  setupSearch: function(campusBH, geonamesBH, buildingsBH){

      $("#searchbox").typeahead({
          minLength: 3,
            highlight: true,
            hint: false
          },{
        name:"CampSearch",
        displayKey: "name",
        source: campusBH.ttAdapter(),
        templates:{
          header:"<h3 class='typeahead-header'>Campuses</h3>"
        }
      },{
      name:"BuildingSearch",
      displayKey: "name",
      source: buildingsBH.ttAdapter(),
      templates:{
        header:"<h3 class='typeahead-header'>Buildings</h3>"
      }
    },
      {
        name: "GeoNames",
        displayKey: "name",
        source: geonamesBH.ttAdapter(),
        templates: {
          header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
        }
      }
    )
      .on("typeahead:selected", function (obj, datum) {
        console.log(datum)
        console.log(obj)
        var obje = obj;




        map.flyTo({ center: [ datum.lng, datum.lat ],
                    zoom: 17})

        if (datum.source === "Buildings") {
                    //  view.gocamp(dunnoca);


                      //  map.setView([datum.lat, datum.lng], 14);

                      }

                    else if (datum.source === "camps"){
                    //  map.setView([datum.lat, datum.lng], 17);
                    console.log('got to camp')

                    }


        if ($(".navbar-collapse").height() > 50) {
          $(".navbar-collapse").collapse("hide");

        }
      })
      .on("typeahead:opened", function () {
        $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
        $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
      })
      .on("typeahead:closed", function () {
        $(".navbar-collapse.in").css("max-height", "");
        $(".navbar-collapse.in").css("height", "");
      });


      $(".twitter-typeahead").css("position", "static");
      $(".twitter-typeahead").css("display", "block");


},

  addDownload: function(campusName, srcStr){
      // set up and add download for  each
    //  console.log(srcStr.split('/').length);

      var downloadStr = srcStr.split('/')[srcStr.split('/').length-1]

  //    console.log(downloadStr);

      var liItem = '<li><a href="' + srcStr + '" download="' + downloadStr + '" target="_blank" data-toggle="collapse" data-target=".navbar-collapse.in"><i class="fa fa-download"></i>&nbsp;&nbsp;' + campusName + '</a></li>';

    //  console.log($('#downloadDrop')[0].nextSibling.nextSibling)

      $($('#downloadDrop')[0].nextSibling.nextSibling).append(liItem)

  },


}





var clicking = {

  startMapClicks: function(){
    map.on('click', function(e){
      var features = map.queryRenderedFeatures(e.point, { layers: layersHelp.buildingSrcs});

  //    console.log(features);
      if(!features.length){
        return;
      }

      var feature = features[0];

      var popup = new mapboxgl.Popup()
          .setLngLat(map.unproject(e.point))
          .setHTML(feature.properties.name)
          .addTo(map);

    })


    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: layersHelp.buildingSrcs });
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });
  }
}



/// Bad global things I was too lazy to deal with
function buildclick(d){
  console.log("clicked a building hey", d.attributes.class.value)
  var layer = d.attributes.class.value.split(' ')[0];

  var buildname = d.textContent;
  console.log(buildname);

  console.log(layer)

  var features = map.queryRenderedFeatures( { layers: [layer]});

    console.log(features)
    if(!features.length){
      console.error('something went wrong with the finding the building in the map features')
      return;
    }

    for(i in features){
      if(buildname === features[i].properties.name){
        console.log('got a match')
      //  console.log(features[i])
        openBuildingPopup(features[i])

      }
    }

//  console.log(onlay)
//  onlay.openPopup()
}




function openBuildingPopup(feature){

  console.log('open popup on', feature)

  var centroid = turf.centroid(feature.geometry);

  console.log(centroid);

  var popup = new mapboxgl.Popup()
      .setLngLat((centroid.geometry.coordinates))
      .setHTML(feature.properties.name)
      .addTo(map);


}




function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}
