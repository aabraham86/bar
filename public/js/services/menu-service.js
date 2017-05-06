(function() {

  angular.module('bar').service('menuService', menuService);
  menuService.$inject = ['$http','$q'];

  function menuService($http, $q) {
  	var rubros,
  		familias,
  		articulos,
  		configUrl = 'http://192.168.1.11:50222';
		var getFamilias = function (){
			var defer = $q.defer();
			$http({
		      method: 'GET',
		      url: configUrl +'/mobileServe.asmx/GetFamilias'
		   	}).then(function (success){
		   		defer.resolve(angular.copy(success.data));
		    },function (error){
		   		defer.reject({});
		    });
		    return defer.promise;
		} 
	   
	    var getArticulos = function(id){
	    	var defer = $q.defer();
		    $http({
		      method: 'GET',
		      url: configUrl +'/mobileServe.asmx/GetArticulos?IdRubro='+id
		    }).then(function (success){
		   		defer.resolve(angular.copy(success.data));
		    },function (error){
		    	console.log(error)
		   		defer.reject(error);
		    });
		    return defer.promise;
	    }

	    var getRubros = function(id){
	    	var defer = $q.defer();
		    $http({
		      method: 'GET',
		      url: configUrl +'/mobileServe.asmx/GetRubros?IdFamilia='+id
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
