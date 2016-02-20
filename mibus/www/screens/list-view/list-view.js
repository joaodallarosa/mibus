angular.module('mibus').controller("ListViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService) {

  $scope.routes = [];
  $scope.searchText = '';

  $scope.getRoutes = function(routeStop) {
    console.log('Route stop:', routeStop);

    $ionicLoading.show({
      template: "Loading..."
    });

    routeService.searchRoute(routeStop)
      .then(
        function(response) {
          $ionicLoading.hide();
          $scope.routes = response.data['rows'];
        }),
      function(httpError) {
        throw httpError.status + " : " +
          httpError.data;
      };
  };

  $scope.goToDetails = function(routeObj) {
    routeService.selectRoute(routeObj);
    $state.go('detail-view.stops');
  };



});
