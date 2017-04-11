(function(app) {
	app.controller('LoginController', ['$scope','$state','userService','$rootScope', function($scope, $state, userService, $rootScope) {
		//$scope.$parent.loggedIn = true;
		var logged = userService.getFromLS();
		if(logged){
			$scope.$parent.usrName = logged;
			$scope.$parent.loggedIn = true;
			$state.go('home');
		}

		$scope.login = function(){
			var data = {
				userName:$scope.name,
				password:$scope.pass
			}
			userService.login(data).then(function (resp) {
				$scope.$parent.usrName = $scope.name;
				if(resp){
					$scope.$parent.loggedIn = true;
					$state.go('home');
				}
			});
		}

	}]);
})(bar);
