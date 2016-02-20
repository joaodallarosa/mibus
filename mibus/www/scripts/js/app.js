angular.module('mibus', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
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
        url: "/users/:userId",
        templateUrl: "screens/detail-view/detail-view.html",
        controller: "DetailViewController"
      });
    $urlRouterProvider.otherwise('/list-view');
  });
