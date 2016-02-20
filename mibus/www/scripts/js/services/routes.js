angular.module('mibus').service('routeService', function($http) {
  var username = "WKD4N7YMA1uiM8V";
  var password = "DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68";
  var authString = username + ":" + password;
  var encodedString = btoa(authString);


  this.searchRoute = function(stopName) {

    var params = {
      "params": {
        "stopName": "%" + stopName + "%"
      }
    }
    return $http({
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
  }

  this.getRouteStops = function(routeId) {

    var params = {
      "params": {
        "routeId": routeId
      }
    }
    return $http({
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
  }

  this.getRouteDepartures = function(routeId) {

    var params = {
      "params": {
        "routeId": routeId
      }
    }
    return $http({
      method: 'POST',
      dataType: 'json',
      url: 'https://api.appglu.com/v1/queries/findDeparturesByRouteId/run',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodedString,
        'X-AppGlu-Environment': 'staging'
      },
      data: params
    })
  }

});
