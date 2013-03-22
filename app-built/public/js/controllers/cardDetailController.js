define(['app'], function ($app) {
	'use strict';
	
	return $app.controller('cardDetailController', ['$scope', '$routeParams', '$http' , function ($scope, $routeParams, $http) {
		
		if ($routeParams.id) {
			$http.get('/api/cards/' + $routeParams.id).success(function (data) {
				$scope.selectedCard = data;
			});
		}
	}]);
});