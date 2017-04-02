(function(app) {
	app.factory('MesasFactory', function($http) { 
	    $http({
	      method: 'GET',
	      url: '/../../mesas.json'
	   }).then(function (success){
	   		return success;
	   },function (error){
	   		return error;
	   });
	});
})(bar);