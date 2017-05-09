(function(app) {
	app.controller('HomeController', ['$scope','userService','$state', function($scope, userService, $state) {
		if(!userService.getLoggedUser()){
			$state.go('login');
		}
		var logged = userService.getLoggedUser();
		$scope.userName	 = logged ? JSON.parse(logged).NombreCajero : '';
	}]);
})(bar);
