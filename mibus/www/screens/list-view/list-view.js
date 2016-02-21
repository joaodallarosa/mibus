angular.module('mibus').controller("ListViewController", function($scope, $state, $stateParams, $http, $ionicLoading, routeService, $ionicModal, $cordovaGeolocation) {

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

  $scope.goToMap = function() {
    $state.go('map-view');
  };

  $ionicModal.fromTemplateUrl('screens/map-modal/map-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();


    if ($scope.map == undefined) {
      $ionicLoading.show({
        template: "Loading..."
      });
      var options = {
        timeout: 10000,
        enableHighAccuracy: true
      };

      $scope.selectedStreet = '';

      $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
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
                  $scope.searchText = results[0].formatted_address.split(',')[0];
                  $scope.$apply();
                  console.log('Address: ', results[0].formatted_address.split(',')[0])
                } else {
                  console.log('No results...');
                }
              } else {
                console.log('Geocoder error...');
              }
            });
        }
        $ionicLoading.hide();
      }, function(error) {
        console.log("Could not get location");
      });
    }





  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.cancelMapSelection = function() {
    $scope.searchText = '';
    $scope.modal.hide();
  }

  $scope.hasSelectedStreet = function() {
    $scope.modal.hide();
    $scope.getRoutes($scope.searchText);
  }
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

});
