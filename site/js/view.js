// put stuff messing with the view in here

var view = {


  gotofeat: function( lat, lon){

    console.log('should go to feat ' + lat + ", " + lon);
    console.log($('.Fort')[1])
    map.fireEvent('click', {
      latlng: [lat, lon]
    })

  },

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
      map.invalidateSize();
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


    map.addControl(L.mapbox.infoControl().addInfo('foo'));

    map.addControl(L.mapbox.legendControl());

  },

   addBuilds: function(campus, loc){


    $.get(loc, function(data){
    //  console.log(data)
    var buildgeo = JSON.parse(data);
    var oncampus = $("."+ campus.split(' ')[0]) //("Civic Center")

    console.log('oncampus', oncampus)
    var buildlist = "<ul>";

  // So I guess the way to set a class name on a feature is done as below in the style part of the options.

      var blay = L.geoJson( buildgeo, {
        onEachFeature:function(feature, layer){

          var popcon = feature.properties.name

          var htpop = "<h3>" + popcon + "<h3>" + "<p>" + "need to add notes field in each building"+ "</p> <h5>Campus</h5> <p>" + campus + "</p>";

          buildlist = buildlist + "<a href='./#building/" +  L.stamp(layer) + "'><li id='" + L.stamp(layer) + "' onclick='buildclick(this)' >" + feature.properties.name + "</li>";


          layer.bindPopup(htpop)

        },
        style:function(feat){
        //  console.log(campus)
          return {
            color:"red",
            className:"buildo " + campus.split(' ')[0],

          }
        },

      })


  //    console.log(oncampus);


      buildlist += "</ul>";

      oncampus.append(buildlist)

  //  campuses.append('bleep')
      blay.addTo(map);


    })
  },
  setUpBaseMapController: function(){


    var controller = L.control.layers({
        "CCSF Red":L.mapbox.tileLayer('mpmckenna8.e19b256b').addTo(map),
        "Mapbox Satellite": L.mapbox.tileLayer('mapbox.satellite'),
        "Mapbox Streets":L.mapbox.tileLayer('mapbox.streets'),
        'Mapbox Light': L.mapbox.tileLayer('mapbox.light')
    }, {

    }).addTo(map);



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

    console.log(dat)
    console.log(campReq.status);

    if(campReq.status === 200  && campReq.readyState === 4){

    //  console.log(typeof(JSON.parse(campReq.responseText)))

      campGeojson = JSON.parse(campReq.responseText);
      view.addToSide(campGeojson);
      searches.addToSearch(campGeojson);


    var featureLayer = layersHelp.campusLayer.addData(campGeojson)


    .addTo(map);

    console.log(featureLayer)
  //  $('#campList').accordion({collapsible:true})


}},

 gocamp: function (feat){
    var cakey = feat;
      console.log((cakey))

      for(i in campGeojson.features){
        if(campGeojson.features[i].properties.campusname == cakey){

        //  console.log('right feat, ', campGeojson.features[i].geometry)
          var geco = [campGeojson.features[i].geometry.coordinates[1], campGeojson.features[i].geometry.coordinates[0]];
          map.setView(geco, 18)
        }
      }

  },

  setupSearch: function(campusBH, geonamesBH){



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
        if (datum.source === "GeoNames") {
            map.setView([datum.lat, datum.lng], 14);
          }

        if (datum.source === "camps"){
          map.setView([datum.lat, datum.lng], 17);
          console.log(map._layers)

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

}
/// Bad global things I was too lazy to deal with
function buildclick(d){
  console.log("clikced a building", d)
  var layId = d.id;

  var onlay = map._layers[layId]


  console.log(onlay)
  onlay.openPopup()

}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}
