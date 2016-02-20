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



  // var authString = "WKD4N7YMA1uiM8V" + ":" + "DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68";
  // var encodedString = btoa(authString);
  //
  // var params = {
  //   "params": {
  //     "stopName": "%lauro linhares%"
  //   }
  // }
  //
  // $http({
  //     method: 'POST',
  //     dataType: 'json',
  //     url: 'https://api.appglu.com/v1/queries/findRoutesByStopName/run',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + encodedString,
  //       'X-AppGlu-Environment': 'staging'
  //     },
  //     data: params
  //   })
  //   .success(function(data, status) {
  //     $ionicLoading.hide();
  //     $scope.routes = data['rows'];
  //     console.log("Data received: ", data);
  //
  //   }).error(function() {
  //     console.log("Error while received data.");
  //     $ionicLoading.hide();
  //   });

  $scope.goToDetails = function(routeId, routeTitle) {
    $state.go('detail-view', {
      routeTitle: routeTitle,
      routeId: routeId
    });
  };



});
