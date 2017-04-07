(function() {

  angular.module('bar').service('userService', userService);
  userService.$inject = ['$http','$q'];

  function userService($http, $q) {
  	var loggedUser,
  		articulosMozo,
  		billetera;

  	var login = function (data){
  		loggedUser = data.userName;
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
	};

	var getLoggedUser = function(){
		return loggedUser;
	};

	var getArticulosMozo = function(){
		return articulosMozo;
	};

		return {
	  		login: login,
	  		getLoggedUser: getLoggedUser
    	}; 
  }
})();
