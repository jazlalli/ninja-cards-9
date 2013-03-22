define(['libs/angular'], function (angular) {
	'use strict';
	console.log('loading Angular app');

	var app = angular.module('app', []);
	
	app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(false);
		$routeProvider
		.when('/:category', {
			controller: 'cardsController'
		})
		.when('/card/:id', {
			templateUrl: '/views/partials/carddetail.html',
			controller: 'cardDetailController'
		})
		.otherwise({redirectTo: '/'});
	}]);

	return app;
});