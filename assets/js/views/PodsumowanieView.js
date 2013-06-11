﻿define([ "jquery", "backbone", "models/AutoModel", "models/TankowanieModel", "common", "session", "lang" ], function( $, Backbone, AutoModel, TankowanieModel, Common, Session, Lang ) {

    var PodsumowanieView = Backbone.View.extend( {
		
		render: function() {
			
			var dane = {};
			dane.spalanie 	= {'max': 0, 'min': 0, 'avg': 0};
			dane.przebieg 	= {'max': 0, 'min': 0, 'all': 0, 'between': 0, 'between_max':0 , 'between_min':0};
			dane.paliwo 	= {'sum': 0, 'avg': 0, 'max': 0, 'min': 0};
			dane.koszty		= {'sum': 0, 'avg': 0, 'max': 0, 'min': 0};
			
			var coll = this.collection.toJSON();
			
			if (coll.length > 0) {
			
				dane.spalanie.max 	= _.max(coll, function(one){ if (one.spalanie != "") return one.spalanie; }).spalanie.toFixed(2);
				dane.spalanie.min 	= _.min(coll, function(one){ if (one.spalanie != "") return one.spalanie; }).spalanie.toFixed(2);
				
				dane.przebieg.min 	= _.min(coll, function(one){ return one.przebieg; }).przebieg;
				dane.przebieg.max 	= _.max(coll, function(one){ return one.przebieg; }).przebieg;
				dane.przebieg.all 	= dane.przebieg.max - dane.przebieg.min;
				dane.przebieg.between 		= Math.round((dane.przebieg.all / coll.length));
				var between = [];
				_.reduce(coll.reverse(), function (memo, one) { var x = one.przebieg - memo; memo = one.przebieg; between.push(x); return memo;}, 0);
				console.log(between);
				dane.przebieg.between_max 	= _.max(between);
				dane.przebieg.between_min 	= _.min(between);
				
				dane.paliwo.sum		= _.reduce(coll, function (memo, one) { return memo + one.ilosc}, 0);
				
				// srednie spalanie to ( ilosc calego paliwa - ostatnie tankowanie * 100) / max przebieg - min przebieg
				dane.spalanie.avg	= ((dane.paliwo.sum - coll[0].ilosc) * 100)/ (dane.przebieg.all);
				dane.spalanie.avg 	= dane.spalanie.avg.toFixed(2);
				
				dane.paliwo.avg		= (dane.paliwo.sum / coll.length).toFixed(2);
				dane.paliwo.min 	= _.min(coll, function(one){ return one.ilosc; }).ilosc;
				dane.paliwo.max 	= _.max(coll, function(one){ return one.ilosc; }).ilosc;
				
				var kosztySumCounter = 0;
				dane.koszty.sum		= _.reduce(coll, function (memo, one) { if (one.cena != "") {memo = memo + one.cena * one.ilosc; kosztySumCounter++} return memo;}, 0);
				if (kosztySumCounter > 0) {
					dane.koszty.avg		= (dane.koszty.sum / kosztySumCounter).toFixed(2);
				}
				dane.koszty.min 	= _.min(coll, function(one){ if (one.cena != "") return one.cena * one.ilosc; });
				dane.koszty.min		= (dane.koszty.min.cena * dane.koszty.min.ilosc).toFixed(2);
				dane.koszty.max 	= _.max(coll, function(one){ if (one.cena != "") return one.cena * one.ilosc; });
				dane.koszty.max		= (dane.koszty.max.cena * dane.koszty.max.ilosc).toFixed(2);
			}
			
			console.log(dane);
			
			
			
			this.template = _.template( $( "script#podsumowanieContent" ).html(), {'dane' : dane, 'session' : Session} );
			this.$el.html(this.template);
			this.$el.find("div[data-role='header']>h1").html(this.auto.get("nazwa"));
			
            return this;
		}
		
    } );

    // Returns the View class
    return PodsumowanieView;

} );