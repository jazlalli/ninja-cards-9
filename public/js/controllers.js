angular.module('controllers', ['services'])
	.controller('CardsController', ['$scope', '$http', '$routeParams', 'categoryMapper', function ($scope, $http, $routeParams, categoryMapper) {

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
	}])
	.controller('CardDetailController', ['$scope', '$routeParams', '$http' , function ($scope, $routeParams, $http) {
		if ($routeParams.id) {
			$http.get('/api/cards/' + $routeParams.id).success(function (data) {
				$scope.selectedCard = data;
			});
		}
	}]);