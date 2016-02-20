angular.module('mibus').controller("StopsViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService) {

  $scope.routeId = $stateParams.routeId;
  $scope.routeTitle = $stateParams.routeTitle;
  $scope.routeStops = [];
  $scope.routeDepartures = [];

  $ionicLoading.show({
    template: "Loading..."
  });

  $scope.getRouteStops = function(routeId) {
    routeService.getRouteStops(routeId)
      .then(
        function(response) {
          $ionicLoading.hide();
          $scope.routeStops = response.data['rows'];
        }),
      function(httpError) {
        throw httpError.status + " : " +
          httpError.data;
      };
  };

  $scope.getRouteStops($scope.routeId);

});
