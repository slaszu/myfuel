define([ "jquery", "backbone", "models/AutoModel", "models/TankowanieModel", "common", "session", "lang" ], function( $, Backbone, AutoModel, TankowanieModel, Common, Session, Lang ) {

    var PodsumowanieView = Backbone.View.extend( {
		
		
		/*podsumowanieTankowaniePopup: function () {
			
			
			var dane = {
				przebieg: 0,
				paliwo: 0,
				koszty: 0,
				spalanie: 0
			};
			var coll = this.collection.toJSON();
			dane.przebieg 	= _.max(coll, function(one){ return one.przebieg; }).przebieg - _.min(coll, function(one){ return one.przebieg; }).przebieg;
			dane.paliwo		= _.reduce(coll, function(memo, one){ return memo + one.ilosc; }, 0);
			dane.koszty		= _.reduce(coll, function(memo, one){ return memo + one.ilosc*one.cena; }, 0);
			
			var spalanieCount = 0;
			spalanieSum = _.reduce(coll, function(memo, one){
				if (parseFloat(one.spalanie) > 0) {
					spalanieCount++;
					return memo + one.spalanie;
				} else {
					return memo;
				}
			}, 0);
			
			if (spalanieCount > 0) {
				dane.spalanie = spalanieSum/spalanieCount;
			} else {
				dane.spalanie = 0;
			}
			
			this.template = _.template( $( "script#tankowaniePodsumowanie" ).html(), { "dane": dane, "Session": Session } );
			
			this.template = Lang.translate(this.template);
			
			this.$el.find("#podsumowanieTankowaniePopup>div[data-role='content']").html(this.template);
			this.$el.find("#optionsTankowaniePopup").popup("close");
			this.$el.find("#podsumowanieTankowaniePopup").popup("open");
		},*/
						
        render: function() {
			
			var dane = {};
			dane.spalanie 	= {'max': 0, 'min': 0, 'avg': 0};
			dane.przebieg 	= {'max': 0, 'min': 0, 'all': 0, 'between': 0, 'between_max':0 , 'between_min':0};
			dane.paliwo 	= {'sum': 0};
			
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
				
			}
			
			console.log(dane);
			
			
			
			this.template = _.template( $( "script#podsumowanieContent" ).html(), {'dane' : dane} );
			this.$el.html(this.template);
			this.$el.find("div[data-role='header']>h1").html(this.auto.get("nazwa"));
			
            return this;
		}
		
    } );

    // Returns the View class
    return PodsumowanieView;

} );