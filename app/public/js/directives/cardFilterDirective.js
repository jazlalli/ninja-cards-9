define(['app'], function ($app) {
	'use strict';
	
	return $app.directive('mmCardsFilter', [function () {
		return function (scope, element, attrs) {
			element.bind('click', function (e) {
				scope.$emit('filterCards', attrs.filter);
			});
		};
	}]);
});