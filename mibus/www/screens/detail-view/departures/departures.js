angular.module('mibus').controller("DeparturesViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService) {

  $scope.routeId = $stateParams.routeId;
  $scope.routeTitle = $stateParams.routeTitle;
  $scope.routeStops = [];
  $scope.routeDepartures = [];

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

  $scope.getRouteDepartures($scope.routeId);


});
