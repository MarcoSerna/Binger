angular.module('starter.controllers', [])
  .factory("PlacesFactory", function($http) {
    return {
      getPlaces: function() {
        return $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1055,-115.1392&radius=1609&type=food&key=AIzaSyDziyIlWeC-bUTiG2XOkDG9fkNT1bu2vHw");
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
    $scope.photo = "";
    $scope.current = 0;
    $scope.length = 0;
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
      launchnavigator.navigate([$scope.currentResult.lat, $scope.currentResult.lng]);
    };

    //X button increments current to pull new image
    $scope.next = function() {
      if($scope.length != 0){
        $scope.current = (++$scope.current) % $scope.results.results.length;
        getNext();
        console.log($scope.currentResult)
      }
    };
    //call Nearby Search and store in results variable
    PlacesFactory.getPlaces().success(function(data) {
      $scope.results = data;
      console.log($scope.results);
      $scope.length = $scope.results.results.length;
      getNext();
      console.log($scope.currentResult);
    });
    //pulls only the necessary fields from results{}
    var getNext = function() {
      $scope.currentResult = {
        //restaurant, image, address, coordinates
        restaurantName: $scope.results.results[$scope.current].name,
        imageRef: $scope.results.results[$scope.current].photos != null ? $scope.results.results[$scope.current].photos[0].photo_reference : null,
        address: $scope.results.results[$scope.current].vicinity,
        lat: $scope.results.results[$scope.current].geometry.location.lat,
        lng: $scope.results.results[$scope.current].geometry.location.lng
      }
      //call Get Photos API and return an image variable
      $scope.photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1020&photoreference='+$scope.currentResult.imageRef+'&key=AIzaSyDziyIlWeC-bUTiG2XOkDG9fkNT1bu2vHw';
    
    };


  })