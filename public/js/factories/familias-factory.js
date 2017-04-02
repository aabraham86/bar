(function(app) {
	app.factory('familiasFactory', function($http) { 
	    $http({
	      method: 'GET',
	      url: '/../../familias.json'
	   }).then(function (success){
	   		return success;
	   },function (error){
	   		return error;
	   });
	});
})(bar);