mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FkYW1kZXZvb3BzIiwiYSI6ImNrN2YxYThoNzBwMTIzbW80cnBjOWk4emUifQ.DF23udvy8o_LIE2OsvpSZg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [13.082317, 80.190579]
});
// Fetch stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();
  console.log(data);

  const stores = data.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: "shop"
      }
    };
  });
  console.log(stores);

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  // map.on('load', function() {
  //   map.addLayer({
  //     id: 'points',
  //     type: 'symbol',
  //     source: {
  //       type: 'geojson',
  //       data: {
  //         type: 'FeatureCollection',
  //         features: stores
  //       }
  //     },
  //     layout: {
  //       'icon-image': '{icon}-15',
  //       'icon-size': 1.5,
  //       'text-field': '{storeId}',
  //       'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  //       'text-offset': [0, 0.9],
  //       'text-anchor': 'top'
  //     }
  //   });
  // });
  map.on("load", function() {
    map.loadImage(
      "https://cdn.shopify.com/s/files/1/0252/9820/6802/files/icon.png?v=1583586630",
      function(error, image) {
        if (error) throw error;
        map.addImage("cat", image);
        map.addSource("point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: stores
          }
        });
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "point",
          layout: {
            "icon-image": "cat",
            "icon-size": 0.5
          }
        });
      }
    );
  });
}

getStores();
