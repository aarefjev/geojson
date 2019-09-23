

var GeoPal = function(){



    this.selector = document.getElementById("selector");


    // Function to Upload File via AJAX
    this.upload_run = function(){

        var file_data = $('#file').prop('files')[0];

        if(file_data ){
            var form_data = new FormData();
            form_data.append('file', file_data);
            $.ajax({
                url: '/ajax-upload_file', // point to server-side controller method
                dataType: 'text', // what to expect back from the server
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (response) {
                    // $('#msg').html(response); // display success response from the server

                    var ret  = JSON.parse(response);

                    console.log(ret);
                    if( ret.code == 200 ){
                        // all good -> close
                        dialog_upload.dialog( "close" );
                        go.newPoints(ret.data);

                    }else{
                        // display Error info
                        alert("Error Occured: " + ret.message);
                    }
                },
                error: function (response) {
                    $('#msg').html(response); // display error response from the server
                }
            });
        }else{
            alert("Please select file to upload.");
        }




    };


    //*********************************************
    //********** MAIN INIT FUNCTION ***************
    this.init = function(){

        // Quick Info
        console.log("Initialisation...");



        // Init Upload Dialog Listener
        document.getElementById("btn_upload").addEventListener("click", function(){
            dialog_upload = $( "#dialog_upload" ).dialog({
                height: 200,
                width: 350,
                modal: true,
                buttons: {
                    "Upload" : go.upload_run,
                    Cancel: function() {
                        dialog_upload.dialog( "close" );
                    }
                }
            });
        });

        // Add Google Map | Lat Lng Listener
        google.maps.event.addListener(map,'click',function(event) {
            console.log( "Lat: "+event.latLng.lat() );
            console.log( "Lng: "+event.latLng.lng() );
            click_lat = event.latLng.lat();
            click_lng = event.latLng.lng();
        });

        //Add listener
        google.maps.event.addListener(map,'mousemove',function(event) {
            click_lat = event.latLng.lat();
            click_lng = event.latLng.lng();
        }); //end addListener


        // Init Lasso Selection process
        document.getElementById("btn_selection").addEventListener("click", function(e){


            // Initialized Selector
            if ( lasso_started==0 ){
                setTimeout(function() {
                    lasso_started=1;
                },200);
                map.setOptions({draggableCursor:'crosshair'});
                go.expandOverlay();

                e.stopPropagation();
                e.preventDefault();

            }else{
                setTimeout(function() {
                    lasso_started=0;
                },200);
                map.setOptions({draggableCursor:''});
                go.hideOverlay();
                click_number = 0;

                e.stopPropagation();
                e.preventDefault();
            }

        });

        // Lasso Select Has Started | Step 01 & Step 02 -> Clicks on a map
        document.addEventListener('click', function (event) {

            console.log('Lasso :'+lasso_started + ' ClickNum:' + click_number);


            // should only work when Lasso Selection Was clicked
            if( lasso_started==1 ){


                // First Click
                if( click_number == 0 ){

                    setTimeout(function() {
                        click_number=1;
                        top_lat = click_lat;
                        top_lng = click_lng;
                    },100);

                    go.selector.style.top = event.clientY + 'px';
                    go.selector.style.left = event.clientX + 'px';


                    sel_x = event.clientX;
                    sel_y = event.clientY;

                    go.selector.style.display = 'block';
                    go.selector.style.width = '1px';
                    go.selector.style.height = '1px';


                    // Second click
                }else if(click_number==1){

                    setTimeout(function() {
                        click_number=0;
                        bottom_lat = click_lat;
                        bottom_lng = click_lng;
                        go.selectedPoints();
                    },100);

                    var sel_h = event.clientY - sel_y;
                    var sel_w = event.clientX - sel_x;
                    go.selector.style.width = sel_w + 'px';
                    go.selector.style.height = sel_h + 'px';

                }
                console.log(event);
                //var selector = document.getElementById("selector");

                console.log('top_lat :'+top_lat + ' bottom_lat:' + bottom_lat);


            }

        });

        // needed for cool visual selection process | lasso selector | Follow Mouse Movement
        document.addEventListener("mousemove", function (event) {

            if( click_number == 1 && lasso_started==1){


                var sel_h = event.clientY - sel_y;
                var sel_w = event.clientX - sel_x;
                go.selector.style.width = sel_w + 'px';
                go.selector.style.height = sel_h + 'px';

                // console.log(event);

            }

        });

        // Init Button Color Dialog
        document.getElementById("btn_color").addEventListener("click", function(){
            dialog_color = $( "#dialog_color" ).dialog({
                height: 200,
                width: 350,
                modal: true,
                buttons: {
                    "Change" : go.change_color,
                    Cancel: function() {
                        dialog_color.dialog( "close" );
                    }
                }
            });
        });


    };


    // Function to run after "Change" button presses in Color Change dialog
    this.change_color = function(){
        current_marker = $('#color_selector').val();
        // alert( $('#color_selector').val() );
        go.mapInit();
        dialog_color.dialog( "close" );
    };

    // Function to Process Selected On Map Points
    this.selectedPoints = function(){

        // Clean All First
        selected_markers  = new Array();
        $('#selected_table > tbody').html("");
        var kk = 0;

        for(var i=0;i < markers.length;i++){

            var mrk = markers[i];
//            console.log(mrk);
            if( mrk.lat < top_lat && mrk.lng > top_lng && mrk.lat > bottom_lat && mrk.lng < bottom_lng ){
                console.log(mrk.info);
                selected_markers[kk++] = mrk; // Saving for potential Bright Future
                $('#selected_table > tbody:last-child').append('<tr><td>'+mrk.title+'</td><td>'+mrk.lat+'</td><td>'+mrk.lng+'</td></tr>');
            }

        }

        if(selected_markers.length == 0){
            $('#selected_table > tbody:last-child').append('<tr><td colspan="3"><br>No Marker Was Selected.<br/></td></tr>');
        }

        dialog_selected = $( "#dialog_selected" ).dialog({
            height: 400,
            width: 550,
            modal: true,
            buttons: {
                "Close": function() {
                    dialog_selected.dialog( "close" );
                }
            }
        });

        lasso_started=0;
        map.setOptions({draggableCursor:''});
        go.hideOverlay();
        click_number = 0;

    };



    //******************************************************************************************
    // Function to Insert All New points to Array + Find Medium point - so we can re-center map
    this.newPoints = function(jsonData){

        // preset some data
        map_lat = 0;
        map_lng = 0;

        console.log(jsonData);
        features = jsonData;
        var itemsNum = jsonData.length;

        for(var i=0;i<itemsNum;i++){
            map_lat += jsonData[i].geometry.coordinates[0];
            map_lng += jsonData[i].geometry.coordinates[1];
        }
        map_lat = map_lat / itemsNum;
        map_lng = map_lng / itemsNum;

        this.mapInit();
    };


    // Sets the map on all markers in the array.
    this.setMapOnAll = function (map_new) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map_new);
        }
    }


    //*********************************************************
    //*** Cool Map Function to populate markers on a MAP
    this.mapInit = function(){

        // clean existing markers
        this.setMapOnAll(null);
        markers = new Array();

        // info window - we gonna need this
        var infowindow = new google.maps.InfoWindow(); /* SINGLE */


        // move map to a cool center position
        var position_map = new google.maps.LatLng(map_lat, map_lng);
        map.setCenter(position_map);


        // Create markers.
        for (var i = 0; i < features.length; i++) {

            var position = new google.maps.LatLng(features[i].geometry.coordinates[0], features[i].geometry.coordinates[1]);

            // Set Marker

            if( features[i].properties.info ){
                var info_text =  features[i].properties.info;
            }else{
                var info_text =  "n/a";
            }

            if( features[i].properties.name ){
                var name_text = features[i].properties.name;
            }else{
                var name_text = 'Point of '+features[i].geometry.coordinates[0]+' , '+features[i].geometry.coordinates[1];
            }

            var marker = new google.maps.Marker({
                position: position,
                icon: '/static/'+current_marker+'.png',
                title: features[i].properties.name,
                info: info_text,
                map: map,
                lat: features[i].geometry.coordinates[0],
                lng: features[i].geometry.coordinates[1]
            });

            // bind info window
            marker.addListener('click', function() {
                // read custom data in this.data
                infowindow.setContent("<div id='infowindow'>Title: "+this.title+"<br/>Lat: "+this.lat+"<br/>Lng: "+this.lng+"<br/>Info: "+ this.info + "</div>");
                infowindow.open(map, this);
                // map.setCenter(this.getPosition());
            });

            // fill array
            markers[i] = marker;


        };

    };


    // tiny support function
    this.expandOverlay = function(){
        $('#btn_selection').css("background-color","green");
        $('#btn_selection').css("color","white");
    };

    // tiny support function
    this.hideOverlay = function(){
        go.selector.style.display = 'none';
        $('#btn_selection').css("background-color","white");
        $('#btn_selection').css("color","black");

    };

};

