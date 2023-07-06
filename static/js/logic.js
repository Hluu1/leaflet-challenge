// Set up the map and initial tile layer
let myMap = L.map("map").setView([27.96044, -82.30695], 3);

let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(myMap);

let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> ' +
    '(<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create the layer groups for earthquakes and tectonic plates
let earthquakesLayer = L.layerGroup();
let tectonicPlatesLayer = L.layerGroup();

// Fetch and add the tectonic plates data to the map
fetch("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          color: "#ff7800",
          weight: 2
        };
      }
    }).addTo(tectonicPlatesLayer);
  });

// Fetch and add the earthquake data to the map
fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        let markerStyle = createMarkerStyle(feature);
        let marker = L.circleMarker(latlng, markerStyle);

        // Add tooltip
        marker.bindTooltip(createTooltipContent(feature));

        return marker;
      }
    }).addTo(earthquakesLayer);
  });

// Define base maps
let baseMaps = {
  "Street Map": streetMap,
  "Topographic Map": topoMap
};

// Define overlay maps
let overlayMaps = {
  "Earthquakes": earthquakesLayer,
  "Tectonic Plates": tectonicPlatesLayer
};

// Add layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  
  // Function to get marker size based on magnitude
  function getMarkerSize(magnitude) {
    return magnitude * 5;
  }
  
  // Function to get marker color based on depth
  function getMarkerColor(depth) {
    if (depth < 10) {
      return "#1a9850";
    } else if (depth < 30) {
      return "#91cf60";
    } else if (depth < 50) {
      return "#d9ef8b";
    } else if (depth < 70) {
      return "#fee08b";
    } else if (depth < 90) {
      return "#fc8d59";
    } else {
      return "#d73027";
    }
  }
  
// Function to create marker style
function createMarkerStyle(earthquake) {
    let magnitude = earthquake.properties?.mag;
    let depth = earthquake.geometry.coordinates[2];
  
    if (typeof magnitude !== 'number' || isNaN(magnitude)) {
      magnitude = 0;
    }
  
    return {
      radius: getMarkerSize(magnitude),
      fillColor: getMarkerColor(depth),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
  }
  
  
  // Function to create tooltip content
  function createTooltipContent(earthquake) {
    let magnitude = earthquake.properties.mag;
    let location = earthquake.properties.place;
    let depth = earthquake.geometry.coordinates[2];
  
    return `<b>Magnitude:</b> ${magnitude}<br><b>Location:</b> ${location}<br><b>Depth:</b> ${depth} km`;
  }
  
  // Fetch the earthquake data
  fetch(geoData)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Create GeoJSON layer and add it to the map
      let geoJsonLayer = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          let markerStyle = createMarkerStyle(feature);
          let marker = L.circleMarker(latlng, markerStyle);
  
          // Add tooltip
          marker.bindTooltip(createTooltipContent(feature));
  
          return marker;
        }
      }).addTo(myMap);
  
      // Fit map bounds to the GeoJSON layer
      myMap.fitBounds(geoJsonLayer.getBounds());
    });
  
// Create legend
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function(map) {
  let div = L.DomUtil.create('div', 'legend');
  let depthRanges = [10, 30, 50, 70, 90];
  let colors = ["#1a9850", "#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"];

  let legendInfo = "<h4>Depth</h4>";

  div.innerHTML = legendInfo;

  let labels = depthRanges.map(function(range, index) {
    return `<div class="legend-item">
              <span class="legend-color" style="background-color: ${colors[index]}"></span>
              <span class="legend-text">${range} km</span>
            </div>`;
  });

  div.innerHTML += labels.join("");

  return div;
};

legend.addTo(myMap);