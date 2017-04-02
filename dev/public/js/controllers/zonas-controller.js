(function(app) {
	app.controller('ZonasController', ['$scope','$state', 'mesasService','$stateParams', function($scope, $state, mesasService, $stateParams) {
		
		$scope.zonas = mesasService.getZonas();
		
		$scope.verZona = function(id){
			mesasService.setZona(id);
			$state.go('mesas',{"zona":id});
		}

	}]);
})(bar);
