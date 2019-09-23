<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Welcome to GeoPal TEST | From Arte Arefjev</title>

    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>static/main.css" />
    <!-- development version, includes helpful console warnings -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->

    <!-- production version, optimized for size and speed -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue"></script> -->

    <script src="<?php echo base_url(); ?>static/main.js"></script>
    <script src="<?php echo base_url(); ?>static/GeoPal.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <script>



        function initMap() {
            map = new google.maps.Map(
                document.getElementById('map'),{
                    center: new google.maps.LatLng(53.346884,-6.2634696),
                    zoom: 16,
                    gestureHandling: 'cooperative'
                });

        }

    </script>
</head>
<body>

<div id="map"></div>

<div id="selector"></div>
<div id="control" style="">
    <input type="button" class="ui-button control-button" id="btn_upload" value="Upload GEO Json File"/><br/>
    <input type="button" class="ui-button control-button" id="btn_selection" value="Lasso Seletion"/><br/>
    <input type="button" class="ui-button control-button" id="btn_color" value="Change Icon Color"/><br/>
<!--

    <button v-on:click="say('hi')">Say hi</button><br/>
    <button v-on:click="test01()">Test1</button><br/>
    <button v-on:click="test02()">Test2</button>
-->
    <div id="dialog_upload" class="hideit" title="Upload GeoJson File">
        <form>
            Select File to Upload:
            <input type="file" id="file" name="fileToUpload">
        </form>
    </div>


    <div id="dialog_selected" class="hideit" title="Selected Marker Points">
        <table id="selected_table">
            <thead><tr><th>Name</th><th>Lat</th><th>Lng</th></tr></thead>
            <tbody></tbody>
        </table>
    </div>



    <div id="dialog_color" class="hideit" title="Selected Marker Points">
        <form>
            Pick New Color For Map Icons:
            <select id="color_selector" name="color_selector">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
            </select>
        </form>
    </div>


</div>


<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlnCll-Vq6datEa8Jg_yZOwpgqqlvSXQQ&callback=initMap"
        async defer></script>

</body>
</html>