angular.module('directives', [])
	.directive('mmCardsGrid', function () {
		return function (scope, element, attrs) {
			scope.$on('lastItemLoaded', function (e) {
				element.isotope({
					itemSelector: '.carditem',
					layoutMode: 'cellsByRow',
					cellsByRow: {
						columnWidth: 350,
						rowHeight: 220
					},
					getSortData: {
						order: function (elem) {
							return parseInt(elem.data('order'));
						}
					},
					sortBy: 'order',
					sortAscending: true
				});
			});

			scope.$on('filterCards', function (e, filter) {
				element.isotope({
					filter: filter
				});
			});
		};
	})
	.directive('mmCardItem', ['$window', function ($window) {
		return function (scope, element, attrs) {
			element.click(function() {
				$($window.document.body).animate({scrollTop: 0}, 300);
			});

			element.addClass(scope.card.CategoriesCss);
			element.data('order', scope.card.DisplayOrder);

			if (scope.$last) {
				scope.$emit('lastItemLoaded');
			}
		};
	}])
	.directive('mmCardsFilter', ['CreditCardCategoryMapper', function (CreditCardCategoryMapper) {
		return function (scope, element, attrs) {
			element.bind('click', function (e) {
				var mappedCards = CreditCardCategoryMapper(scope.cards, attrs.filter);
				
				scope.cards = mappedCards
				scope.selectedCategory = attrs.filter.substring(1, attrs.filter.length);
				scope.$emit('filterCards', attrs.filter);
			});
		}
	}])
	.directive('mmCardDetails', ['$window', '$location', '$timeout', function ($window, $location, $timeout) {
		return function (scope, element, attrs) {
			element.fadeIn(500);
			
			scope.hideCardDetail = function () {
				element.slideUp(500);
				$($window.document.body).animate({scrollTop: 0}, 300);

				$timeout(function () {
					scope.$apply(function () {
						$location.path('/');
					})
				}, 500);
			}
		}
	}]);