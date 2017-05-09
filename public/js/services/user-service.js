(function() {

  angular.module('bar').service('userService', userService);
  userService.$inject = ['$http','$q'];

  function userService($http, $q) {
  	var loggedUser,
  		articulosMozo,
  		billetera,
		configUrl = 'http://192.168.1.11:50222';
  	var saveToLS = function(){
		localStorage.setItem('loggedIn', JSON.stringify(loggedUser));
	}
	var getFromLS = function (){
		loggedUser = localStorage.getItem("loggedIn");
		return loggedUser;
	}

  	var login = function (data){
  		
		var defer = $q.defer();
		$http({
	      method: 'GET',
	      url: configUrl + '/mobileServe.asmx/login?pUsr='+data.userName+'&pPwd='+data.password
	   	}).then(function (success){
	   		//var respuesta = {billetera:99};
	   		loggedUser = success.data[0];
	   		defer.resolve(loggedUser);
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
	  		saveToLS: saveToLS,
	  		getLoggedUser: getLoggedUser
    	}; 
  }
})();
