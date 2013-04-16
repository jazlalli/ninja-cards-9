define(['app'], function ($app) {
	'use strict';

	return $app.controller('categorySelectController', ['$scope', '$routeParams', '$http' , function ($scope, $routeParams, $http) {
		$scope.Test = 'Here is a test string';
		
	}]);
});