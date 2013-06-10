// Sets the require.js configuration for your application.
require.config( {
	  
	  urlArgs: "bust=" +  (new Date()).getTime(),
	  
      // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
      paths: {

            // Core Libraries
            "jquery": "libs/jquery",
            "jquerymobile": "libs/jquerymobile",
            "underscore": "libs/lodash",
            "backbone": "libs/backbone_0.9.10",
			"adapter" : "adapters/websql",
			"common" : "tools/common",
			"wykres" : "tools/wykres",
			"db" : "tools/db",
			"session" : "tools/session",
			"date_format" : "libs/date.format",
			"date_format_lang" : "lang/date.format",
			"lang" : "lang/lang",
			"ui_datepicker" : "libs/jquery.ui.datepicker",
			"ui_datepicker_mobile" : "libs/jquery.ui.datepicker.mobile",
			"jqplot" : "libs/jqplot.min",
			"jqplot_bar_r" : "libs/jqplot.barRenderer.min",
			"jqplot_cat_axis_r" : "libs/jqplot.categoryAxisRenderer.min",
			"jqplot_point_label" : "libs/jqplot.pointLabels.min",
			"jqplot_can_text_r" : "libs/jqplot.canvasTextRenderer.min",
			"jqplot_can_axis_r" : "libs/jqplot.canvasAxisTickRenderer.min"
      },
	  
      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {

            "backbone": {
				"deps": [ "underscore", "jquery" ],
				"exports": "Backbone"  //attaches "Backbone" to the window object
            },
			
			"mobileRouter": {
				"deps": [ "date_format", "date_format_lang" ]
			},
			
			"date_format_lang": {
				"deps": [ "date_format" ]
			},
			
			"ui_datepicker_mobile": {
				"deps": [ "ui_datepicker" ]
			},
			
			"common": {
				"deps": [ "date_format" ]
			},
			
			"jqplot_bar_r" : {
				"deps": [ "jqplot"]
			},
			"jqplot_cat_axis_r" : {
				"deps": [ "jqplot"]
			},
			"jqplot_point_label" : {
				"deps": [ "jqplot"]
			},
			"jqplot_can_text_r" : {
				"deps": [ "jqplot"]
			},
			"jqplot_can_axis_r"  : {
				"deps": [ "jqplot"]
			}

      } // end Shim Configuration

} );

// Includes File Dependencies
require([ "jquery", "backbone", "mobileRouter", "adapter" ], function( $, Backbone, Mobile ) {

	$( document ).on( "mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
			
			$.mobile.defaultPageTransition = "none";
			$.mobile.buttonMarkup.hoverDelay = 0;
		}
	)
	
	$(document).delegate('input[type="number"]', 'keyup', function(e) {
	
		var element = e.currentTarget;
		var value 	= element.value;
		value 		= value.replace(/[^0-9]/g , '.');
		value 		= value.replace(/[^0-9\.]/ , '');
		element.value = value;
		
		//e.preventDefault();
	});
	
	require( [ "jquerymobile" ], function() {
		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();
	});
	/*
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	  tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
	  tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
	});
	*/
} );