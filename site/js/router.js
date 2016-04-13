
console.log("any router");


var Workspace = Backbone.Router.extend({

  routes: {
    "building/:query":      "building",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search" ,  // #search/kiwis/p7

  },

  building: function(build) {
    console.log('bin building route')
  },

  search: function(query, page) {
    console.log('in other route')
  }

});


startRouter();


function startRouter(){

var route = new Workspace();

route.navigate('blah')
Backbone.history.start();



}
