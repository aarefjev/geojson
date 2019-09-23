# # Test Project For Geo Pal - Arte Arefjev #

## Very interesting manipulations with GeoJson & Google Map JavaScript API ##
More information can be found under "Descriptions of the solutions" - but many options are dependant on why we are doing this - and in this case it's just to give us some basis for further discussion.


## How to run ##
	There is one quick & easy option how to run it:
	 - Run Composer Install
	 - Copy To a Separate Server (not sure if it has to be top level domain and not sub-folder)
	 - No DB being Used - so no DB required
	 - Sample GeoJson Files are located in /uploads folder:
	 	- BadFormatJson.json
		- FailTestEireMissingItemData.json
		- GeoJson-Australia.json
		- GeoJson-Eire.json
	- Following Files needed to be edited in order to run properly:
		- \application\config\config.php => $config['base_url']
		
## Some Fun Information ##
	- original idea was to incapsulate everyting into one GeoPal JavaScript Class and run everything 
	from there. Task appeared a little bit more time consuming than expected, so only the functional 
	part & controls are there at the moment. 
	All Styles and HTML pre-set in CI view. A little less fun...
	
	- code is mostly "vanilla" JavaScript with few small pieces for modal windows and ajax - seems like 
	a waste of time, really.
	
	- At the beginning I've build a little static test using vue.js - so don't be surprised if you find 
	some leftovers from it ;)
	
	- When new GeoJson is loaded Map is centered to have all points in the middle (it doesn't scale). 
	What does it mean: if you load Australian GeoJson - you will see Sydney on a map. 
	If points are covering much larger area than Zoom level 16 - you have to zoom out manually. 
	I suppose it would be a quick enough fix to add zoom, not just location, if needed.


## Known Bugs / Features ##
 - google map doesn't seem to like when you trying to get coordinates while clicking on markers (but I might fix it tonight) - really annoying.
 - Selection is happening in one direction from top / left corner -> going -> down / right. Don't think other directions are important given the nature of the exercise.

