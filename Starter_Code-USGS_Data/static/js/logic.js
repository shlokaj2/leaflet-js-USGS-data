let response = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(response).then(function(data){
    createFeatures(data.features); // i need a function to do that
});

function createFeatures(earthquakeData) {


     function onEachFeature(feature, layer) {

        layer.bindPopup(`<h3> ${feature.properties.place} </h3> <p> ${feature.properties.time} <p/>`)

        // Function to determine marker color by depth


     }
     function pointToLayer(geoJsonPoint, latlng) {
        return L.circleMarker(latlng);

    }
    function style(feature) {
        console.log(feature)
        return {
            radius: feature.properties.mag *5,
            weight: 2,
            color: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.2
           

        }
     }
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer,
       style: style
         
      });
      createMap(earthquakes);

}

function chooseColor(depth){
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "#FF0000";
  }


  //create legend, credit to this website for the structure: https://codepen.io/haakseth/pen/KQbjdO -- this structure is referenced in style.css
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function(myMap) {
      var div = L.DomUtil.create("div", "legend");
         div.innerHTML += "<h4>Depth Color Legend</h4>";
         div.innerHTML += '<i style="background: red"></i><span>(Depth < 10)</span><br>';
         div.innerHTML += '<i style="background: orange"></i><span>(10 < Depth <= 25)</span><br>';
         div.innerHTML += '<i style="background: yellow"></i><span>(25 < Depth <= 40)</span><br>';
         div.innerHTML += '<i style="background: pink"></i><span>(40 < Depth <= 55)</span><br>';
         div.innerHTML += '<i style="background: blue"></i><span>(55 < Depth <= 70)</span><br>';
         div.innerHTML += '<i style="background: green"></i><span>(Depth > 70)</span><br>';
    
      return div;
    };
    //add the legend to the map
    legend.addTo(myMap);
  
  //scratch work for collecting the necessary  and console logging
  //collect data with d3
  d3.json(url).then(function (data) {
      console.log(data);
      let features = data.features;
      console.log(features);

      let results = features.filter(id => id.id == "nc73872510"); //replace the id string with the argument of the function once created
    let first_result = results[0];
    console.log(first_result);
    let geometry = first_result.geometry;
    console.log(geometry);
    let coordinates = geometry.coordinates;
    console.log(coordinates);
    console.log(coordinates[0]); // longitude
    console.log(coordinates[1]); // latitude
    console.log(coordinates[2]); // depth of earthquake
    let magnitude = first_result.properties.mag;
    console.log(magnitude);
    //define depth variable
    let depth = geometry.coordinates[2];
    console.log(depth);
    let id = first_result.id;
    console.log(id);

});
  
   function createMap(earthquakesLayer){

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'

});

// only one layer to be shown at a time
let baseMaps = {
    Street: street,
    Topograhpy: topo

}
let overlayMaps = {
    Earthquakes: earthquakesLayer
}

let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [street, earthquakesLayer]
})


L.control.layers(baseMaps, overlayMaps).addTo(map);
   }
