
// URL to get JSON data
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'



// Retrieve JSON data
d3.json(url).then((data) => {
  console.log(data)
  // Create GeoJSON layer wiht retrieved data 
  createFeatures(data.features);
});
// assign variables to magnitude and depth
let mag = data.feature.properties.mag
let depth = data.feature.geometry.coordinates[2]


// function marker size by magnitude
function markerSize(mag) {
  return Math.sqrt(mag) * 500;

  
};

// function marker color by depth 
function circleColor(depth) {
  if (depth < 10) return 'greenyellow';
    else if (depth < 30) return "yellow";
    else if (depth < 50) return "gold";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "coral";
    else return "red";
}

// Function marker opacity by depth 
function circleOpacity()

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  function onEachFeature(feature, layer){
    
     // Give each feature a popup that describes the place and time of the earthquake.
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);

    // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
  }
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
      
      var markers = {
        radius: markerSize
        fillColor: 
        fillOpacity
        color:
        stroke: true,
        weight: 0.5
      }
    return L.circle(latlng, markers)
    } 
  });

  createMap(earthquakes);
};

function createMap(earthquakes) {
  let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
}).addTo(myMap);

}