(function(app) {
	app.controller('LoginController', ['$scope','$state','userService','$rootScope', function($scope, $state, userService, $rootScope) {
		//$scope.$parent.loggedIn = true;
		var logged = userService.getFromLS();
		if(logged){
			$scope.$parent.usrName = logged;
			$scope.$parent.loggedIn = true;
			$state.go('home');
		}
		$scope.validate = function (e, fromPass){
			var code = e.keyCode || e.which;
			if(code == 13) {
				if(!fromPass){
					$("#password").focus();
				} else { 
					$scope.login();
				}
			}
		}
		$scope.login = function(){
			var data = {
				userName:$scope.name,
				password:$scope.pass
			}
			userService.login(data).then(function (resp) {
				//esto me tiene que dar la billetera y las mesas
				$scope.$parent.usrName = $scope.name;
				if(resp){
					//localStorage.setItem('zonas', JSON.stringify(resp.zonas));
					$scope.$parent.billetera = resp.billetera || 0;
					$scope.$parent.loggedIn = true;
					$state.go('home');
				}
			});
		}

	}]);
})(bar);
