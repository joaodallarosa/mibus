angular.module('mibus').controller("DetailViewController", function($scope, $state, $stateParams, $http, $ionicLoading) {

  $scope.routeId = $stateParams.routeId;
  $scope.routeTitle = $stateParams.routeTitle;
  $scope.routeStops = [];
  $scope.routeDepartures = [];

  $ionicLoading.show({
    template: "Loading..."
  });

  var authString = "WKD4N7YMA1uiM8V" + ":" + "DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68";
  var encodedString = btoa(authString);

  var params = {
    "params": {
      "routeId": $scope.routeId
    }
  }

  $http({
      method: 'POST',
      dataType: 'json',
      url: 'https://api.appglu.com/v1/queries/findStopsByRouteId/run',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodedString,
        'X-AppGlu-Environment': 'staging'
      },
      data: params
    })
    .success(function(data, status) {
      $ionicLoading.hide();
      $scope.routeStops = data['rows'];
      console.log("Data received: ", data);

    }).error(function() {
      console.log("Error while received data.");
      $ionicLoading.hide();
    });




});
