angular.module('mibus').controller("ListViewController", function($scope, $stateParams, $http, $ionicLoading) {

  $scope.routes = [];

  $ionicLoading.show({
    template: "Loading..."
  });

  var authString = "WKD4N7YMA1uiM8V" + ":" + "DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68";
  var encodedString = btoa(authString);

  var params = {
    "params": {
      "stopName": "%lauro linhares%"
    }
  }

  $http({
      method: 'POST',
      dataType: 'json',
      url: 'https://api.appglu.com/v1/queries/findRoutesByStopName/run',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodedString,
        'X-AppGlu-Environment': 'staging'
      },
      data: params
    })
    .success(function(data, status) {
      $ionicLoading.hide();
      $scope.routes = data['rows'];
    }).error(function() {
      console.log("Error while received data.");
      $ionicLoading.hide();
    });





});
