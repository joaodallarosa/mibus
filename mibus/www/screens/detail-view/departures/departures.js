angular.module('mibus').controller("DeparturesViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService) {

  $scope.selectedRoute = routeService.getSelectedRoute();
  $scope.routeStops = [];
  $scope.routeDepartures = [];

  $scope.isIOS = ionic.Platform.isIOS();
  $scope.isAndroid = ionic.Platform.isAndroid();

  $ionicLoading.show({
    template: "Loading..."
  });

  $scope.getRouteDepartures = function(routeId) {
    routeService.getRouteDepartures(routeId)
      .then(
        function(response) {
          $ionicLoading.hide();
          $scope.routeDepartures = response.data['rows'];
        }),
      function(httpError) {
        throw httpError.status + " : " +
          httpError.data;
      };
  };

  $scope.getRouteDepartures($scope.selectedRoute.id);


  $scope.goBack = function(){
    $state.go('list-view');
  }

});
