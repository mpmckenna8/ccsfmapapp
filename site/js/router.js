

var Workspace = Backbone.Router.extend({

  routes: {
    "buildings:query":      "building",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  building: function() {
    console.log('bin building route')
  },

  search: function(query, page) {
    console.log('in other route')
  }

});


Backbone.history.start();
