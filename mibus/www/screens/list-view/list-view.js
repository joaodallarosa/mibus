angular.module('mibus').controller("ListViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService) {

  $scope.routes = [];
  $scope.searchText = '';
  $scope.isSearching = false;

  $scope.getRoutes = function(routeStop) {
    $scope.isSearching = true;
    console.log('Route stop:', routeStop);

    routeService.searchRoute(routeStop)
      .then(
        function(response) {
          $scope.isSearching = false;
          $scope.routes = response.data['rows'];
        }),
      function(httpError) {
        throw httpError.status + " : " +
          httpError.data;
      };
  };

  $scope.goToDetails = function(routeObj) {
    console.log(routeObj);
    routeService.selectRoute(routeObj);
    $state.go('detail-view.stops');
  };


});
