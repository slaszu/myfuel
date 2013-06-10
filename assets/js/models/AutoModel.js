define([ "jquery", "backbone" ], function( $, Backbone ) {

    var Auto = Backbone.Model.extend( {
		className: 'auto',
		defaults: {
			"nazwa":  	"",
			"opis":   	""
		}
    } );

    return Auto;

});