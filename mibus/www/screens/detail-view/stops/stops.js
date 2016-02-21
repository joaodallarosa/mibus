angular.module('mibus').controller("StopsViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService) {

  $scope.$on('$ionicView.enter', function() {
    if ($scope.selectedRoute != routeService.getSelectedRoute()) {
      $scope.selectedRoute = routeService.getSelectedRoute();
      $ionicLoading.show({
        template: "Loading..."
      });
      $scope.getRouteStops($scope.selectedRoute.id);
    }
  });

  $scope.routeStops = [];
  $scope.routeDepartures = [];
  $scope.isIOS = ionic.Platform.isIOS();
  $scope.isAndroid = ionic.Platform.isAndroid();

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

  $scope.goBack = function() {
    $state.go('list-view');
  }
});
