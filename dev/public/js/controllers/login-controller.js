(function(app) {
	app.controller('LoginController', ['$scope','$state','userService', function($scope, $state, userService) {
		//$scope.$parent.loggedIn = true;
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
