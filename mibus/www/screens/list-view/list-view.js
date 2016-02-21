angular.module('mibus').controller("ListViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService, $ionicModal, $cordovaGeolocation) {

  $scope.routes = [];
  $scope.searchData = {};
  $scope.isSearching = false;
  $scope.hasLoadedMap = false;

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

  $scope.goToMap = function() {
    $state.go('map-view');
  };

  // Google maps modal handling street selection
  $ionicModal.fromTemplateUrl('screens/map-modal/map-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();

    // if (!$scope.hasLoadedMap) {
    $ionicLoading.show({
      template: "Loading Google Maps..."
    });
    var options = {
      timeout: 5000
    };

    $scope.selectedStreet = '';

    // Florianopolis Lat/Long
    var latLng = new google.maps.LatLng("-27.5928351", "-48.5327725");

    var mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.geocoder = new google.maps.Geocoder();
    google.maps.event.addListener($scope.map, 'click', function(event) {
      placeMarker(event.latLng);
    });

    var marker;
    function placeMarker(location) {
      if (marker) {
        marker.setPosition(location);
      } else {
        marker = new google.maps.Marker({
          position: location,
          map: $scope.map
        });
      }
      getAddress(location);
    }

    function getAddress(latLng) {
      $scope.geocoder.geocode({
          'latLng': latLng
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              $scope.selectedStreet = results[0].formatted_address.split(',')[0];
              $scope.searchData.searchText = "";
              $scope.searchData.searchText = results[0].formatted_address.split(',')[0];
              console.log($scope.searchData.searchText);
              $scope.$apply();
            } else {
              console.log('No results...');
            }
          } else {
            $ionicLoading.hide();
            $scope.modal.hide();
            console.log('Geocoder error...');
          }
        });
    }
    $ionicLoading.hide();
    $scope.hasLoadedMap = true;
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.cancelMapSelection = function() {
    $scope.searchData.searchText = '';
    $scope.modal.hide();
  }

  $scope.hasSelectedStreet = function() {
    $scope.getRoutes($scope.searchData.searchText);
    $scope.modal.hide();
  }

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

});
