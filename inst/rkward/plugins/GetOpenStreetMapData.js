// this code was generated using the rkwarddev package.
// perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(is_preview){
	// add requirements etc. here
	echo("require(cartographr)\n");
}

function calculate(is_preview){
	// read in variables from dialog


	// the R code to be evaluated

    var url = getValue("url_input");
    var x_dist = getValue("x_dist");
    var y_dist = getValue("y_dist");
    var size_preset = getValue("size_preset");
    var size_custom = getValue("size_custom");
    var code = "require(cartographr)\n";

    if(size_custom){
        code += "set_output_size(" + size_custom + ")\n";
    } else {
        code += "set_output_size(size = \"" + size_preset + "\")\n";
    }

    if(url){
      var match = url.match(/#map=\d+\/([\d\.-]+)\/([\d\.-]+)/);
      if(match && match.length >= 3){
        var lat = match[1];
        var lon = match[2];
        // The object is ALWAYS hard-coded to "map"
        code += "map <- get_osmdata(";
        code += "\n  lat = " + lat + ",";
        code += "\n  lon = " + lon + ",";
        code += "\n  x_distance = " + x_dist + ",";
        code += "\n  y_distance = " + y_dist + ",";
        code += "\n  quiet = FALSE";
        code += "\n)\n";
      } else {
        code += "rk.stop(\"URL could not be parsed. Please use the format ...#map=ZOOM/LAT/LON\")\n";
      }
    }
    echo(code);
  
}

function printout(is_preview){
	// printout the results
	new Header(i18n("Get Open Street Map Data results")).print();

    var save_name = getValue("main_save_obj.objectname");
    var r_commands = "rk.header(\"sf object '" + save_name + "' created successfully.\", level=3)";
    r_commands += ";\nprint(summary(map))\n";
    echo(r_commands);
  
	//// save result object
	// read in saveobject variables
	var mainSaveObj = getValue("main_save_obj");
	var mainSaveObjActive = getValue("main_save_obj.active");
	var mainSaveObjParent = getValue("main_save_obj.parent");
	// assign object to chosen environment
	if(mainSaveObjActive) {
		echo(".GlobalEnv$" + mainSaveObj + " <- map\n");
	}

}

