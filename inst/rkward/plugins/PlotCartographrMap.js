// this code was generated using the rkwarddev package.
// perhaps don't make changes here, but in the rkwarddev script instead!

function preview(){
	preprocess(true);
	calculate(true);
	printout(true);
}

function preprocess(is_preview){
	// add requirements etc. here
	if(is_preview) {
		echo("if(!base::require(cartographr)){stop(" + i18n("Preview not available, because package cartographr is not installed or cannot be loaded.") + ")}\n");
	} else {
		echo("require(cartographr)\n");
	}	if(is_preview) {
		echo("if(!base::require(ggplot2)){stop(" + i18n("Preview not available, because package ggplot2 is not installed or cannot be loaded.") + ")}\n");
	} else {
		echo("require(ggplot2)\n");
	}
}

function calculate(is_preview){
	// read in variables from dialog


	// the R code to be evaluated

    var sf_object = getValue("plot_sf_object");
    if(!sf_object) return;

    var palette = getValue("plot_palette");
    var save_plot = getValue("plot_save_obj.active");
    var save_plot_name = getValue("plot_save_obj.objectname");

    var code = "# Generating the map\n";
    code += "p <- cartographr::plot_map(osm = " + sf_object + ", palette = \"" + palette + "\")\n";

    var labs_list = new Array();
    if(getValue("title_input")) { labs_list.push("title = " + JSON.stringify(getValue("title_input"))); }
    if(getValue("subtitle_input")) { labs_list.push("subtitle = " + JSON.stringify(getValue("subtitle_input"))); }
    if(getValue("xlab_input")) { labs_list.push("x = " + JSON.stringify(getValue("xlab_input"))); }
    if(getValue("ylab_input")) { labs_list.push("y = " + JSON.stringify(getValue("ylab_input"))); }
    if(getValue("caption_input")) { labs_list.push("caption = " + JSON.stringify(getValue("caption_input"))); }
    if(labs_list.length > 0) {
      code += "p <- p + ggplot2::labs(" + labs_list.join(", ") + ")\n";
    }

    if (save_plot) {
        code += save_plot_name + " <- p\n";
    }
    echo(code);
  
}

function printout(is_preview){
	// read in variables from dialog


	// printout the results
	if(!is_preview) {
		new Header(i18n("Plot Cartographr Map results")).print();	
	}
    if(!is_preview){
      var graph_options = new Array();
      graph_options.push("device.type=\"" + getValue("device_type") + "\"");
      graph_options.push("width=" + getValue("dev_width"));
      graph_options.push("height=" + getValue("dev_height"));
      graph_options.push("pointsize=10.0");
      graph_options.push("res=" + getValue("dev_res"));
      graph_options.push("bg=\"" + getValue("dev_bg") + "\"");
      if(getValue("device_type") == "JPG"){
        graph_options.push("quality=" + getValue("jpg_quality"));
      }
      echo("rk.graph.on(" + graph_options.join(", ") + ")\n");
    }
    // The plot object is always hard-coded to 'p' in the calculate section
    echo("try(print(p))\n");
    if(!is_preview){
      echo("rk.graph.off()\n");
    }
  
	if(!is_preview) {
		//// save result object
		// read in saveobject variables
		var plotSaveObj = getValue("plot_save_obj");
		var plotSaveObjActive = getValue("plot_save_obj.active");
		var plotSaveObjParent = getValue("plot_save_obj.parent");
		// assign object to chosen environment
		if(plotSaveObjActive) {
			echo(".GlobalEnv$" + plotSaveObj + " <- cartographr.plot\n");
		}	
	}

}

