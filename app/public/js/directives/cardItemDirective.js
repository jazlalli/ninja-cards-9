define(['app'], function ($app) {
	'use strict';
	
	return $app.directive('mmCardItem', ['$window', function ($window) {
		return function (scope, element, attrs) {
			element.click(function() {
				$($window.document.body).animate({scrollTop: 0}, 300);
			});

			element.addClass(scope.card.CategoriesCss);
			element.data('order', scope.card.DisplayOrder);
			
			element.hover(function () {
				$(this).find('img').fadeTo(300, 0.1);
			}, function() {
				$(this).find('img').fadeTo(300, 1);
			});

			if (scope.$last) {
				scope.$emit('lastItemLoaded');
			}
		};
	}]);
});