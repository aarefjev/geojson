

window.onload = function(){

    var go = new GeoPal();
    go.init();


};



var GeoPal = function(){



    var overlay = document.getElementById("overlay");
    var selector = document.getElementById("selector");




    this.init = function(){

        console.log("Initialisation...");

    };



    var start = function(){


    };

    var stop = function(){


    };


    var expandOverlay = function(){


    };

};



document.addEventListener('click', function (event) {

    if( click_num == 0 ){
        click_num++;
    }else if(click_num==1){
        click_num=0;
    }
    console.log(event);
    var selector = document.getElementById("selector");

    if(click_num==1){
        selector.style.top = event.clientY + 'px';
        selector.style.left = event.clientX + 'px';
        sel_x = event.clientX;
        sel_y = event.clientY;
        selector.style.width = '5px';
        selector.style.height = '5px';
    }else{
        var sel_h = event.clientY - sel_y;
        var sel_w = event.clientX - sel_x;
        selector.style.width = sel_w + 'px';
        selector.style.height = sel_h + 'px';
    }
});


document.addEventListener("mousemove", function (event) {

    if( click_num == 1 ){

        var selector = document.getElementById("selector");

        var sel_h = event.clientY - sel_y;
        var sel_w = event.clientX - sel_x;
        selector.style.width = sel_w + 'px';
        selector.style.height = sel_h + 'px';

        console.log(event);

    }

});





var map;
var markers = new Array();
var sel_x = 0;
var sel_y = 0;

var click_num = 0;



function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'),
        {center: new google.maps.LatLng(53.346884,-6.2634696), zoom: 16});

    google.maps.event.addListener(map,'click',function(event) {
        console.log( "Lat: "+event.latLng.lat() );
        console.log( "Lng: "+event.latLng.lng() );
    });

    var iconBase =
        'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

    var icons = {
        parking: {
            icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
            icon: iconBase + 'library_maps.png'
        },
        info: {
            icon: iconBase + 'info-i_maps.png'
        }
    };

    var features = [
        {
            position: new google.maps.LatLng(53.3450048,-6.2640247),
            type: 'info'
        },
        {
            position: new google.maps.LatLng(53.348189,-6.2676807),
            type: 'info'
        },
        {
            position: new google.maps.LatLng(53.346543,-6.2676485),
            type: 'info'
        },
        {
            position: new google.maps.LatLng(53.346884,-6.2634696),
            type: 'info'
        },
    ];



    // Create markers.
    for (var i = 0; i < features.length; i++) {
        markers[i] = new google.maps.Marker({
            position: features[i].position,
            icon: 'http://dev.geopal/static/red.png',
            map: map
        });
    };
}