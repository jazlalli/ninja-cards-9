define(['app'], function ($app) {
	'use strict';
	
	console.log('loading Angular controllers');

	return $app.controller('cardsController', ['$scope', '$http', '$routeParams', 'categoryMapper', function ($scope, $http, $routeParams, categoryMapper) {

		$http.get('/api/cards/').success(function (data) {
			var i,
				cardsLength,
				mappedCards = categoryMapper(data.PrimaryCreditCards, 'CreditCard');
			
			$scope.cards = mappedCards;
			$scope.categories = data.ProductCategories;
			
			if ($routeParams.category) {
				$scope.selectedCategory = $routeParams.category;
			} else {
				$scope.selectedCategory = 'CreditCard';
			}
		});

		$scope.setActive = function (category) {
			if (category === $scope.selectedCategory) {
				return 'active';
			} else {
				return '';
			}
		};

		$scope.setCategory = function (category) {
			$scope.selectedCategory = category;
		};
	}]);
});
