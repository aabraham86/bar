(function(app) {
	app.controller('HomeController', ['$scope','userService','$state', function($scope, userService, $state) {
		if(!userService.getLoggedUser()){
			$state.go('login');
		}
		$scope.userName = userService.getLoggedUser();
	}]);
})(bar);
