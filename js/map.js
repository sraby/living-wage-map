// BASEMAP

var map = L.map('mainmap', {
    center: [33.9, -118.23,], 
    zoom: 10,
    zoomControl: false
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        opacity: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>'
             }).addTo(map);


// ABOUT PAGES

var showAbout = false;

function toggleMapInteraction() {
    if (showAbout === true) {
        $( "#button-panel" ).hide;
        map._handlers.forEach(function(handler) {
                handler.disable();
            });
    }
    else {
        $( "#button-panel" ).show;
        map._handlers.forEach(function(handler) {
                handler.enable();
            });
    }
}

// INTERACTION

function toggleAbout(e) {

    if(showAbout === true){
       $('.about-page').html('');
       $('.about-page').hide(); 
       showAbout = false;
       toggleMapInteraction();
    }

    else {

        var layer = e.target;

        switch (layer.feature.properties.Name) {
        case "Boyle Heights":
            $('#about-bh').html($('#about-bh-content').html());
            $('#about-bh').show();
            break;
        case "Central / West Long Beach":
            $('#about-lb').html($('#about-lb-content').html());
            $('#about-lb').show();
            break;  
        case "South Los Angeles":
            $('#about-sla').html($('#about-sla-content').html());
            $('#about-sla').show();
            break;    
        }

        showAbout = true;
        toggleMapInteraction();
    }
}

function highlightFeature(e) {

    var layer = e.target;

    layer.setStyle({
        fillOpacity: 1,
        color: "#7B4F00",
        weight: 3
    });

    // Link map feature hover events with buttons
    switch (layer.feature.properties.Name) {
        case "Boyle Heights":
            $('#boyle_heights').addClass('hover');
            break;
        case "Central / West Long Beach":
            $('#long_beach').addClass('hover');
            break;  
        case "South Los Angeles":
            $('#south_la').addClass('hover');
            break;    
    }
}

function highlightFromButton(area) {
    area.setStyle({
        fillOpacity: 1,
        color: "#7B4F00",
        weight: 3
    });
}

function resetHighlight(e) {

    var layer = e.target;

    layer.setStyle({
        fillOpacity: 0.8,
        color: "#DDA221"
    });

    $('#boyle_heights').removeClass('hover');
    $('#long_beach').removeClass('hover');
    $('#south_la').removeClass('hover');

}

function resetFromButton(area) {
    area.setStyle({
        fillOpacity: 0.8,
        color: "#DDA221"
    });
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: toggleAbout
    });
} 


// Link button hover and click events with map features
$('#boyle_heights').hover(function(){
                            highlightFromButton(boyle_heights);
                        },function(){
                            resetFromButton(boyle_heights);
                        })
                    .click(function(){
                        $('#about-bh').html($('#about-bh-content').html());
                        $('#about-bh').show();
                        showAbout = true;
                        toggleMapInteraction();
                    });

$('#long_beach').hover(function(){
                            highlightFromButton(long_beach);
                        },function(){
                            resetFromButton(long_beach);
                        })
                    .click(function(){
                        $('#about-lb').html($('#about-lb-content').html());
                        $('#about-lb').show();
                        showAbout = true;
                        toggleMapInteraction();
                    });

$('#south_la').hover(function(){
                            highlightFromButton(south_la);
                        },function(){
                            resetFromButton(south_la);
                        })
                    .click(function(){
                        $('#about-sla').html($('#about-sla-content').html());
                        $('#about-sla').show();
                        showAbout = true;
                        toggleMapInteraction();
                    });

// MAP DATA

function style(feature) {
    return {
        weight: 1.5,
        color: '#DDA221',
        fillColor: '#DDA221',
        fillOpacity: 0.8
    };
}

var boyle_heights = L.geoJson(boyleHeights, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var long_beach = L.geoJson(longBeach, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var south_la = L.geoJson(southLA, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


/* POP UPS 

boyle_heights.bindPopup(function (layer) {
    return L.Util.template(
        `Sample Pop 
        Up`
        )});

long_beach.bindPopup(function (layer) {
    return L.Util.template(
        `Sample Pop 
        Up`
        )});

south_la.bindPopup(function (layer) {
    return L.Util.template(
        `Sample Pop 
        Up`
        )});

// Link button click events with map pop ups

$('#boyle_heights').on("click",function() {boyle_heights.openPopup();});
$('#long_beach').on("click",function() {long_beach.openPopup();});
$('#south_la').on("click",function() {south_la.openPopup();});

*/




 


 