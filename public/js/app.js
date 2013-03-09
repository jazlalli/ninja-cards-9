var app = angular.module('CreditCards', []).
	config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	    $locationProvider.html5Mode(false);
	    $routeProvider
	    	.when('/', {
	        	controller: 'CardsController'
	    	})
	    	.when('/category/:category', {
	        	controller: 'CardsController'
	    	})
	    	.when('/:id', {
	        	templateUrl: '/views/partials/carddetail.html',
	        	controller: 'CardDetailController'
	    	})
	    	.otherwise({redirectTo: '/'});
	}]);

var CardsController = function ($scope, $http, $filter) {
	$http.get('/api/cards/').success(function (data) {
		console.log(data);

		$scope.cards = mapCardCategoryInfo(data.PrimaryCreditCards, 'CreditCard');
		$scope.categories = data.ProductCategories;
		$scope.selectedCategory = 'CreditCard';
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
}

var CardDetailController = function ($scope, $routeParams) {
	var i,
	cardsLength = $scope.cards.length;

	for (var i = 0; i < cardsLength; i += 1) {
		if ($scope.cards[i].ProductCode === $routeParams.id) {
			$scope.selectedCard = $scope.cards[i];
		}
	}
};

var mapCardCategoryInfo = function (cards, selectedCategory) {
	var i, j,
		card,
		cardCount = cards.length,
		cardCategories,
		cardCategoriesLength,
		cardCategoriesCss,
		cardsToReturn = [];

	for (i = 0; i < cardCount; i += 1) {
		card = cards[i];
		cardCategories = card.Categories;
		cardCategoriesLength = cardCategories.length;

		cardCategoriesCss = 'carditem ';
		
		for (j = 0; j < cardCategoriesLength; j += 1) {
			cardCategoriesCss += cardCategories[j].Name + ' ';
			card.CategoriesCss = cardCategoriesCss;
			card.DisplayOrder = 999;

			if (selectedCategory && selectedCategory === cardCategories[j].Name) {
				card.DisplayOrder = cardCategories[j].DisplayOrder;
			}
		}
		cardsToReturn.push(card);
	}
	return cardsToReturn;
}

app.directive('toggleCard', function ($location) {
	return function (scope, element, attrs) {
		$(element).fadeIn(500);
		
		scope.hideCardDetail = function () {
			$(element).slideUp(500);
			$(document.body).animate({scrollTop: 0}, 300);

			setTimeout(function () {
				scope.$apply(function () {
					$location.path('/');
				})
			}, 500);
		}
	}
})

app.directive('creditCard', function () {
	return function (scope, element, attrs) {
		$(element).click(function(event) {
		    $(document.body).animate({scrollTop: 0}, 300);
		});

		$(element).addClass(scope.card.CategoriesCss);
		$(element).data('order', scope.card.DisplayOrder);

		if (scope.$last) {
        	scope.$emit('lastItemLoaded');
      	}
	};
})
.directive('cardsLoaded', function () {
	return function (scope, element, attrs) {
		scope.$on('lastItemLoaded', function (e) {
			$(element).isotope({
        		itemSelector: '.carditem',
        		layoutMode: 'cellsByRow',
				cellsByRow: {
					columnWidth: 350,
					rowHeight: 220
				},
        		getSortData: {
					order: function ($elem) {
						return parseInt($elem.data('order'));
					}
				},
				sortBy: 'order',
				sortAscending: true
        	});
		});

		scope.$on('filterCards', function (e, filter) {
			$(element).isotope({
				filter: filter
			});
		})
	};
})
.directive('isotopeFilter', function () {
	return function (scope, element, attrs) {
		$(element).bind('click', function (e) {
			scope.cards = mapCardCategoryInfo(scope.cards, attrs.filter);
			scope.selectedCategory = attrs.filter.substring(1, attrs.filter.length);

			scope.$emit('filterCards', attrs.filter);
		});
	}
});