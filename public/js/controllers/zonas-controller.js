(function(app) {
	app.controller('ZonasController', ['$scope','$state', 'mesasService','$stateParams','userService', function($scope, $state, mesasService, $stateParams,userService) {
		if(!userService.getLoggedUser()){
			$state.go('login');
		}
		mesasService.getZonas().then(function(resp){
			$scope.zonas = resp;
		});
		
		$scope.verZona = function(id){
			//mesasService.getMesas(id);
			$state.go('mesas',{"zona":id});
		}

	}]);
})(bar);
