angular.module('directives', [])
	.directive('mmCardsGrid', ['cardFilter', function (cardFilter) {
		return function (scope, element, attrs) {
			scope.$on('lastItemLoaded', function (e) {
				element.isotope({
					itemSelector: '.carditem',
					layoutMode: 'cellsByRow',
					cellsByRow: {
						columnWidth: 335,
						rowHeight: 210
					},
					getSortData: {
						order: function (elem) {
							return parseInt(elem.data('order'));
						}
					},
					sortBy: 'order',
					sortAscending: true
				});

				scope.$emit('filterCards', scope.selectedCategory);
			});

			scope.$on('filterCards', function (e, filter) {
				if (filter.substring(0, 1) === '.') {
					scope.selectedCategory = filter.substring(1, filter.length);	
				} else {
					scope.selectedCategory = filter;	
				}
				
				scope.cards = cardFilter(scope.cards, scope.selectedCategory);
				element.isotope({ filter: '.' + scope.selectedCategory });
			});
		};
	}])
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
	.directive('mmCardsFilter', [function () {
		return function (scope, element, attrs) {
			element.bind('click', function (e) {
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