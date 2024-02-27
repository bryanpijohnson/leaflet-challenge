// Creating the map object
let myMap = L.map("map", {
    center: [38.5816,-121.4944],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	minZoom: 3,
    maxZoom: 8,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function depColor(item){
    if (item >= 90) {
        return "rgb(237,106,106)"
    }
    else if (item > 70) {
        return "rgb(239,167,106)"
    }
    else if (item > 50) {
        return "rgb(243,186,76)"
    }
    else if (item > 30) {
        return "rgb(242,220,76)"
    }
    else if (item > 10) {
        return "rgb(225,243,79)"
    }
    else {
        return "rgb(182,244,76)"
    }
};

// URL for the API call
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let depth = []
d3.json(url).then(function(data){
    let earthquakes = data.features;
    earthquakes.forEach(element => {
        let lat = element.geometry.coordinates[1];
        let lon = element.geometry.coordinates[0];
        let dep = element.geometry.coordinates[2];
        let mag = element.properties.mag;
        depth.push(dep);
        L.circle([lat, lon], {
            color: "black",
            weight: 1,
            fillColor: depColor(dep),
            fillOpacity: "0.75",
            radius: (70*mag)**2
        })
            .bindPopup(`Lat: ${lat}, Lon: ${lon}, Mag: ${mag}`)
            .addTo(myMap);

    });
    // L.control.Legend({
    //     position: "bottomright",
    //     legends: [{
    //         label: "Text",
    //         type: "rectange",
    //         fillColor: "rgb(182,244,76)"
    //     }]
    // }).addTo(myMap);
    L.control.Legend({
        position: "bottomleft",
        collapsed: false,
        symbolWidth: 24,
        opacity: 1,
        legends: [{
            label: "-10-10",
            type: "polygon",
            sides: 4,
            color: "#B6F44C",
            fillColor: "#B6F44C",
            weight: 5
        }, {
            label: "10-30",
            type: "polygon",
            sides: 4,
            color: "#E1F34F",
            fillColor: "#E1F34F",
            weight: 5
        }, {
            label: "30-50",
            type: "polygon",
            sides: 4,
            color: "#F2DC4C",
            fillColor: "#F2DC4C",
            weight: 5
        }, {
            label: "50-70",
            type: "polygon",
            sides: 4,
            color: "#F3BA4C",
            fillColor: "#F3BA4C",
            weight: 5
        }, {
            label: "70-90",
            type: "polygon",
            sides: 4,
            color: "#EFA76A",
            fillColor: "#EFA76A",
            weight: 5
        }, {
            label: "90+",
            type: "polygon",
            sides: 4,
            color: "#ED6A6A",
            fillColor: "#ED6A6A",
            weight: 5
        }]
    }).addTo(myMap);
});