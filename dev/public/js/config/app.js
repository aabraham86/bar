var bar = angular.module('bar', ['ngMaterial', 'ngMessages', 'ngAria', 'ui.router','ngLodash']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('menu', {
		url: '/menu',
		templateUrl: 'partials/menu-partial.html',
		controller: 'menuController'
	})

	.state('home', {
            url: '/',
            templateUrl: 'partials/home-partial.html',
            controller: 'HomeController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/about-partial.html',
            controller: 'AboutController'
        })
        .state('mesas', {
            url: '/mesas/{zona:[0-9]+}',
            templateUrl: 'partials/mesas-partial.html',
            controller: 'MesasController'
        })
        .state('detail', {
            url: '/detail/{id:[0-9]+}',
            templateUrl: 'partials/mesa-detail-partial.html',
            controller: 'MesasController'
        })
        .state('zonas', {
            url: '/zonas',
            templateUrl: 'partials/zonas-partial.html',
            controller: 'ZonasController'
        });
    }]);
})(bar);