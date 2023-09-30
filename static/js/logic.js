// URL to get JSON data
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'


// Retrieve JSON data
d3.json(url).then((data) => {
  console.log(data);
  // Create GeoJSON layer with retrieved data 
  createFeatures(data.features);
});

// function marker size by magnitude
function markerSize(mag) {
  return mag * 20000;
 
};

// function marker color by depth 
function circleColor(depth) {
   if (depth < 10) return 'greenyellow';
   else if (depth < 30) return "yellow";
   else if (depth < 50) return "gold";
   else if (depth < 70) return "orange";
   else if (depth < 90) return "coral";
   else return "red";
};

// Function marker opacity by depth 


function createFeatures(earthquakeData) {
   
  // Define a function that we want to run once for each feature in the features array.
  function onEachFeature(feature, layer){
    
     // Give each feature a popup that describes the place and time of the earthquake.
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
  
  };
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function(feature, latlng) {
      
      var markers = {
        radius: markerSize(feature.properties.mag),
        fillColor: circleColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.75,
        color: "white",
        stroke: true,
        weight: 0.5
      };
    return L.circle(latlng, markers);
    } 
  });
  // send our earthquakes layer ot the createMap function
    createMap(earthquakes);
};
function createMap(earthquakes) {
  // Add a tile layer.
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
});

   // Create a baseMaps object.
  let baseMaps = {
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [topo, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

};

