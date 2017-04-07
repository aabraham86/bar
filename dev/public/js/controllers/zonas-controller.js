(function(app) {
	app.controller('ZonasController', ['$scope','$state', 'mesasService','$stateParams','userService', function($scope, $state, mesasService, $stateParams,userService) {
		if(!userService.getLoggedUser()){
			$state.go('login');
		}
		$scope.zonas = mesasService.getZonas();
		
		$scope.verZona = function(id){
			mesasService.setZona(id);
			$state.go('mesas',{"zona":id});
		}

	}]);
})(bar);
