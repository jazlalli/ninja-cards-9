define(['app', 'isotope'], function ($app, isotope) {
	'use strict';
	
	console.log('loading Angular directives');

	return $app.directive('mmCardsGrid', ['categoryMapper', function (categoryMapper) {
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
							return parseInt(elem.data('order'), 10);
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
				
				scope.cards = categoryMapper(scope.cards, scope.selectedCategory);
				element.isotope({ filter: '.' + scope.selectedCategory });
			});
		};
	}]);
});