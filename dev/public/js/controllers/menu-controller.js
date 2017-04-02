(function(app) {
	app.controller('menuController', ['$scope', function($scope) {
		$scope.hideBar = function () {
			angular.element('body').trigger('click');
		}
	}]);
});
