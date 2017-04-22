(function() {

  angular.module('bar').service('userService', userService);
  userService.$inject = ['$http','$q'];

  function userService($http, $q) {
  	var loggedUser,
  		articulosMozo,
  		billetera;

  	var saveToLS = function(){
		localStorage.setItem('loggedIn', loggedUser);
	}
	var getFromLS = function (){
		loggedUser = localStorage.getItem("loggedIn");
		return loggedUser;
	}

  	var login = function (data){
  		loggedUser = data.userName;
  		//saveToLS()
		var defer = $q.defer();
		$http({
	      method: 'POST',
	      url: ' http://192.168.1.30:50222/mobileServe.asmx/login?pUsr='+data.userName+'&pPwd='+data.password
	   	}).then(function (success){
	   		var respuesta = {billetera:99};
	   		defer.resolve(angular.copy(respuesta));
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
	  		getFromLS: getFromLS,
	  		getLoggedUser: getLoggedUser
    	}; 
  }
})();
