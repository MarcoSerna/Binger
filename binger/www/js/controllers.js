angular.module('starter.controllers', [])
  .factory("PlacesFactory", function($http) {
    return {
      getPlaces: function() {
        return $http({
          method: 'GET',
          url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1055,-115.1392&radius=1609&type=restaurant&key=AIzaSyDziyIlWeC-bUTiG2XOkDG9fkNT1bu2vHw",
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    }
  })
  .controller('AppCtrl', function($scope, $ionicModal, $location, $timeout, PlacesFactory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.results = {};
    $scope.current = 0;
    $scope.loginData = {

    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };

    // Button click goes to specificed path
    $scope.go = function(path) {
      $location.path(path)
    };

    $scope.openMaps = function() {
      launchnavigator.navigate([36.114647, -115.172813]), {
        start: "50.342847, -4.749904"
      };
    };
    //X button increments current to pull new image
    $scope.next = function() {
      $scope.current++;
      getNext();
      console.log($scope.currentResult)

    };
    //call Nearby Search and store in results variable
    PlacesFactory.getPlaces().success(function(data) {
      $scope.results = data;
      getNext();
      console.log($scope.currentResult);
    });
    var getNext = function() {
      $scope.currentResult = {
        //restaurant, image, address, coordinates
        restaurantName: $scope.results.results[$scope.current].name,
        // image: $scope.results.results[$scope.current].photos != null ? $scope.results.results[$scope.current].photo[0].reference : null,
        address: $scope.results.results[$scope.current].vicinity,
        lat: $scope.results.results[$scope.current].geometry.location.lat,
        lng: $scope.results.results[$scope.current].geometry.location.lng
      }
    }



  })