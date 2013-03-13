angular.module('CreditCards', ['controllers', 'directives', 'services'])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(false);
		$routeProvider
		.when('/', {
			controller: 'IndexController'
		})
		.when('/category/:category', {
			controller: 'CardsController'
		})
		.when('/card/:id', {
			templateUrl: '/views/partials/carddetail.html',
			controller: 'CardsController'
		})
		.otherwise({redirectTo: '/'});
	}]);