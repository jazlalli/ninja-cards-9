define(['app', 'bootstrap'], function ($app) {
	'use strict';
	
	return $app.directive('mmCardDetails', ['$window', '$location', '$timeout', function ($window, $location, $timeout) {
		return function (scope, element, attrs) {
			element.fadeIn(500);
			
			scope.hideCardDetail = function () {
				element.slideUp(500);
				$($window.document.body).animate({scrollTop: 0}, 300);

				$timeout(function () {
					scope.$apply(function () {
						$location.path('/');
					});
				}, 500);
			};
		};
	}]);
});