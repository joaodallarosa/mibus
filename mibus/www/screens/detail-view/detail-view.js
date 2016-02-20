angular.module('mibus').controller("DetailViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService) {



  $scope.routeId = $stateParams.routeId;
  $scope.routeTitle = $stateParams.routeTitle;
  $scope.routeStops = [];
  $scope.routeDepartures = [];

  $scope.getRouteStops = function(routeId) {

    routeService.getRouteStops(routeId)
      .then(
        function(response) {
          console.log(response);
        }),
      function(httpError) {
        throw httpError.status + " : " +
          httpError.data;
      };
  };

  $scope.getRouteStops($scope.routeId);


  $scope.getRouteDepartures = function(routeId) {

    routeService.getRouteDepartures(routeId)
      .then(
        function(response) {
          console.log(response);
        }),
      function(httpError) {
        throw httpError.status + " : " +
          httpError.data;
      };
  };

  $scope.getRouteDepartures($scope.routeId);


});
