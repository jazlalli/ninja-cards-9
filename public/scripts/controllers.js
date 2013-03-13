angular.module('controllers', ['services'])
	.controller('CardsController', ['$scope', '$http', '$routeParams', 'CreditCardCategoryMapper', function ($scope, $http, $routeParams, CreditCardCategoryMapper) {

		$http.get('/api/cards/').success(function (data) {
			var i,
				cardsLength,
				mappedCards = CreditCardCategoryMapper(data.PrimaryCreditCards, 'CreditCard');
			
			$scope.cards = mappedCards;
			$scope.categories = data.ProductCategories;
			$scope.selectedCategory = 'CreditCard';

			if ($routeParams.id) {
				cardsLength = $scope.cards.length;
				
				for (var i = 0; i < cardsLength; i += 1) {
					if ($scope.cards[i].ProductCode === $routeParams.id) {
						$scope.selectedCard = $scope.cards[i];
					}
				}
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