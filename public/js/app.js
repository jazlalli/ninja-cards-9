var app = angular.module('creditcards', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/card/:id', {
        controller: cardDetailController,
        templateUrl: '/views/partials/carddetail.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]).value('$anchorScroll', angular.noop);

function cardListController($scope, $http) {
  $http.get('/api/cards/').success(function(data, status, headers, config) {
      $scope.creditcards = data.Cards;
      $scope.categories = data.Categories;
      $('#cardDetails').hide();
  });
}

function cardDetailController ($scope, $routeParams, $http) {
  $http.get('/api/cards/' + $routeParams.id).success(function(data, status, headers, config) {
      $scope.card = data;
      $('#cardDetails').show();
  });
}

app.directive('repeatDirective', function ($timeout) {
  return function (scope, element, attr) {
      if (scope.$last) {
        scope.$emit('lastLoaded');
      }

      $(element).bind('click', function () {
        $('#cardDetails').show(300);
         $('html, body').animate({ scrollTop: 0 }, 300);
      });

      $(element).mouseenter(function() {
          $('.carditem').not($(this)).fadeTo(100, 0.7, function() {
           
          });
     
      }).mouseleave(function() {
          $('.carditem').not($(this)).fadeTo(10, 1, function() {
            // Animation complete.
          });
      });
  };
})
.directive('loadedDirective', function () {
  return function (scope, element, attr) {
    scope.$on('lastLoaded', function (e) {
      $(element).isotope({
        itemSelector: '.carditem',
        layoutMode: 'masonry'
      });
    });
  };
});