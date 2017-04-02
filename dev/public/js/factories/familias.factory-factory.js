(function(app) {
	app.factory('familias.factoryFactory', function($http) { 
	    var mainInfo = $http.get('../../familias.json').success(function(response) {
	        return response.data;
	    });
	    var factory = {}; // define factory object
	    factory.getMainInfo = function() { // define method on factory object
	        return mainInfo; // returning data that was pulled in $http call
	    };
	    return factory; // returning factory to make it ready to be pulled by the controller
	});
})(bar);