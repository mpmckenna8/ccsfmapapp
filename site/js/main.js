window.onload = (function(){

    L.mapbox.accessToken = 'pk.eyJ1IjoibXBtY2tlbm5hOCIsImEiOiJfYWx3RlJZIn0.v-vrWv_t1ytntvWpeePhgQ';
    var map = L.mapbox.map('map', 'mapbox.streets')
      .setView([37.77, -122.42], 12);

})
