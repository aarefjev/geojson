var map;
var go;
var markers  = new Array();
var selected_markers  = new Array();
var features = new Array();
var infowindows = new Array();

var dialog_upload;
var dialog_selected;
var dialog_color;

var lasso_started = 0;
var map_lat = 0;
var map_lng = 0;

var top_lat = 0;
var top_lng = 0;

var bottom_lat = 0;
var bottom_lng = 0;

var click_lat = 0;
var click_lng = 0;


var sel_x = 0;
var sel_y = 0;
var current_marker = 'red';

var click_number = 0;




window.onload = function(){


    go = new GeoPal();
    go.init();


};
