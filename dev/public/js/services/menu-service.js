(function() {

  angular.module('bar').service('menuService', menuService);
  menuService.$inject = ['$http','$q'];

  function menuService($http, $q) {
  	var rubros,
  		familias,
  		articulos;

		var getFamilias = function (){
			var defer = $q.defer();
			$http({
		      method: 'GET',
		      url: '/partials/familias.json'
		   	}).then(function (success){
		   		defer.resolve(angular.copy(success.data));
		    },function (error){
		   		defer.reject({});
		    });
		    return defer.promise;
		} 
	   
	    var getArticulos = function(){
	    	var defer = $q.defer();
		    $http({
		      method: 'GET',
		      url: 'http://192.168.1.30:50033/mobileServe.asmx/articulos'
		    }).then(function (success){
		   		defer.resolve(angular.copy(success.data));
		    },function (error){
		    	console.log(error)
		   		defer.reject(error);
		    });
		    return defer.promise;
	    }

	    var getRubros = function(){
	    	var defer = $q.defer();
		    $http({
		      method: 'GET',
		      url: '/partials/rubros.json'
		    }).then(function (success){
		   		defer.resolve(angular.copy(success.data));
		    },function (error){
		   		defer.reject({});
		    });
		    return defer.promise;
	    }

	   return {
	  		getFamilias: getFamilias,
      		getArticulos: getArticulos,
      		getRubros: getRubros
    	};
  }
})();
