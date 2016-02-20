angular.module('mibus', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list-view', {
        url: '/list-view',
        templateUrl: 'screens/list-view/list-view.html',
        controller: 'ListViewController'
      })
      .state('detail-view', {
        url: "/detail-view",
        templateUrl: "screens/detail-view/detail-view.html",
        abstract: true
      })
      .state('detail-view.stops', {
        url: '/stops',
        views: {
          'stops': {
            templateUrl: 'screens/detail-view/stops/stops.html',
            controller: 'StopsViewController'
          }
        },
        params: {
          routeTitle: '',
          routeId: 0
        }
      })
      .state('detail-view.departures', {
        url: '/departures',
        views: {
          'departures': {
            templateUrl: 'screens/detail-view/departures/departures.html',
            controller: 'DeparturesViewController'
          }
        },
        params: {
          routeTitle: '',
          routeId: 0
        }
      });

    $urlRouterProvider.otherwise('/list-view');
  });
