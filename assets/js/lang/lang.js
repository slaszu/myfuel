define(["jquery", "session"], function ($, Session) {
	var Lang = {
		pl : {
			spalanie : "Spalanie",
			cena : "Cena",
			koszt :"Koszt",
			na : "na",
			brak_informacji : "Brak informacji aby obliczyć spalanie",
			do_pelna: "do pełna",
			byla_rezerwa : "była rezerwa",
			zatankowano : "Zatankowano",
			pole_wymagane : "Pole wymagane",
			to_nie_jest_liczba : "To nie jest liczba",
			przebieg_za_maly : "Przebieg jest mniejszy niż podczas poprzedniego tankowania z listy",
			przebieg_za_duzy : "Przebieg jest większy niż podczas następnego tankowania z listy",
			data_pozniejsza : "Data jest późniejsza niż następne tankowanie z listy",
			data_wczesniejsza : "Data jest wcześniejsza niż poprzednie tankowanie z listy"
		},
		en : {
			wroc: "back",
			ustawienia: "Settings",
			jednostka_dlugosci: "Distance unit",
			jednostka_dlugosci_inna: "Other unit",
			jednostka_pojemnosci: "Capacity unit",
			jednostka_pojemnosci_inna: "Other unit",
			waluta: "Currency",
			waluta_inna : "Other currency",
			jezyk : "Language",
			zapisz : "Save",
			opcje : "options",
			wykres : "Graph",
			spalanie : "Fuel consumption",
			cena : "Price",
			koszt :"Cost",
			typ: 'Type',
			miesieczny: 'Monthly',
			szczegolowy: 'Details',
			tankuje: "Add log",
			tankowanie : "Refueling",
			pojazdy: "Vehicles",
			podsumowanie: "Summary",
			odswiez : "Refresh",
			ostrzezenie : "Warning",
			na : "per",
			brak_informacji : "No information to calculate fuel consumption",
			do_pelna: "fill up",
			byla_rezerwa : "reserve",
			zatankowano : "Amount of fuel",
			edycja: "Edit",
			usun: "Delete",
			na_pewno_usunac: "Are you sure to delete this refueling?",
			ilosc_paliwa: "The amount of fuel",
			anuluj: "Cancel",
			przebieg : "Mileage",
			wlane_paliwo : "Amount of fuel",
			wybierz_date: "Choose date",
			aktualny_przebieg : "Current mileage",
			ostatnio: "last",
			ilosc_wlanego_paliwa : "Amount of fuel",
			cena_za : "Price per",
			informacje_dodatkowe : "Additional Information",
			data : "Date",
			pole_wymagane : "Required field",
			to_nie_jest_liczba : "It is not a number",
			przebieg_za_maly : "Mileage is smaller than during the previous refueling from the list",
			przebieg_za_duzy : "Mileage is greater than the next filling from the list",
			data_pozniejsza : "The date is later than the next refueling from a list",
			data_wczesniejsza : "The date is earlier than the previous refueling from a list",
			nowy : "New",
			na_pewno_usunac_auto : "Are you sure to delete this vehicle ?",
			marka_model : "Brand and model",
			silnik : "Engine",
			nowy_pojazd : "New vehicle",
			wiecej : "more",
			podsumowanie : "..."
		},
		
		de : {
			wroc: "Zurück",
			ustawienia: "Einstellungen",
			jednostka_dlugosci: "Längeneinheit",
			jednostka_dlugosci_inna: "Andere Einheit",
			jednostka_pojemnosci: "Kapazität Einheit",
			jednostka_pojemnosci_inna: "Andere Einheit",
			waluta: "Währung",
			waluta_inna: "Andere Währung",
			jezyk: "Sprache",
			zapisz: "Speichern",
			opcje: "Optionen",
			wykres: "Graph",
			spalanie: "Verbrennung",
			cena: "Preis",
			koszt: "Kosten",
			typ: 'Typ',
			miesieczny: 'Monatlich',
			szczegolowy: 'Details',
			tankuje: "Tanken",
			tankowanie: "Tanken",
			pojazdy: "Fahrzeuge",
			podsumowanie: "Zusammenfassung",
			odswiez: "Refresh",
			ostrzezenie: "Warning",
			na: "pro",
			brak_informacji: "Keine Information, um die Verbrennung zu berechnen",
			do_pelna: "full tanken",
			byla_rezerwa: "reserve",
			zatankowano: "Betankt",
			edycja: "Bearbeiten",
			usun: "Löschen",
			na_pewno_usunac: "Sind Sie sicher, dass diese Tanken zu löschen",
			ilosc_paliwa: "Die Menge an Kraftstoff",
			anuluj: "Abbrechen",
			przebieg: "Kilometerstand",
			wlane_paliwo: "Treibstoffmenge",
			wybierz_date: "Datum wählen",
			aktualny_przebieg: "Aktuelle Laufleistung",
			ostatnio: "last",
			ilosc_wlanego_paliwa: "Treibstoffmenge betankt",
			cena_za: "Preis pro",
			informacje_dodatkowe: "Weitere Informationen",
			data: "Datum",
			pole_wymagane: "Pflichtfeld",
			to_nie_jest_liczba: "Es ist keine Zahl",
			przebieg_za_maly: "Mileage kleiner ist als während der vorherigen Tanken aus der Liste",
			przebieg_za_duzy: "Mileage größer ist als die nächste Füllung aus der Liste",
			data_pozniejsza: "Das Datum ist später als die nächste Betankung aus einer Liste",
			data_wczesniejsza: "Das Datum ist älter als die vorherige Tanken aus einer Liste",
			nowy: "Neu",
			na_pewno_usunac_auto: "Sind Sie sicher, um dieses Fahrzeug zu löschen",
			marka_model: "Marke und Modell",
			silnik: "Engine",
			nowy_pojazd : "Neues Fahrzeug",
			wiecej : "mehr"
		},
		
		/**
		* metoda do tlumaczenia tekstow
		*/
		translate : function(element, lang) {
					
			if (typeof lang === "undefined") {
				lang = Session.lang;
			}
			if (lang === null) {
				lang = "en";
			}
			
			var words = this[lang];
				
			if (typeof words === "undefined") {
				return false;
			}
			var elementObj = $(element);	
			elementObj.find("[data-lang]").each(function(index, one) {
				
				one = $(one);
				var name = one.data('lang');
				//console.log(name);
				
				var word = words[name];
				if (typeof word !== "undefined") {
					var tag = one.get(0).tagName;
					
					switch(tag) {
						case 'INPUT' : one.attr('placeholder',word); break;
						default: one.text(word);
					}
					//console.log(tag);
				}
			})
			
			return elementObj;
		},
		
		getText : function(name, lang) {
		
			if (typeof lang === "undefined") {
				lang = Session.lang;
			}
			if (lang === null) {
				lang = "en";
			}
		
			var words = this[lang];
				
			if (typeof words === "undefined") {
				return false;
			}
			
			var word = words[name];
			if (typeof word === "undefined") {
				return false;
			}
			
			return word;
		}
	}
	
	return Lang;
});