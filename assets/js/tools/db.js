define([], function() {
	var Db = {
		get : function() {
			return openDatabase('myfuel', '1.0', 'pl.slaszu.myfuel', 2 * 1024 * 1024);
		}
	}
	
	return Db;
});