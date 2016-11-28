angular.module('starter.controllers', [])

.factory("YelpSearch", function() {
  var Yelp = function(){
    // require('./yelp');
    // var yelpApi = new Yelp({
    //   consumer_key: '0UXXnlrVDVdlVf0ep6Z71A',
    //   consumer_secret: 'yiaqJptybCX3NovTtsGA-Hs-7S8',
    //   token: 'k6Ietk_TA37nzW3m3d0pfHUlEBlocxTx',
    //   token_secret: 'LukkVdKDpnKazlpROsZWO-JpP4g',
    //   });

    // return {
    //   yelpApi.search({ term: 'food', location: 'Montreal' }, ).then(function (data) {
    //     console.log(data); }).catch(function (err) {
    //     console.error(err);
    //     });

    // }
  };
})


.controller('AppCtrl', function($scope, $ionicModal, $location, $timeout, YelpSearch) {

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
  PlacesFactory.YelpSearch().success(function(data) {
    $scope.results = data;
    console.log($scope.results);
    $scope.length = $scope.results.businesses.length;
    getNext();
    console.log($scope.currentResult);
  });

  //pulls only the necessary fields from results{}
  var getNext = function() {
    $scope.currentResult = {
      //restaurant, image, address, coordinates
      restaurantName: $scope.results.businesses[$scope.current].name,
      image: $scope.results.businesses[$scope.current].image_url != null ? $scope.results.businesses[$scope.current].image_url : null,
      address: $scope.results.businesses[$scope.current].location.display_address[0],
      lat: $scope.results.businesses[$scope.current].location.coordinate.latitude,
      lng: $scope.results.businesses[$scope.current].location.coodrdinate.longitude
    }
    
  };
  photo = currentResult.image;
  //image array for gallery
  $scope.items = [];
  $scope.add2Q = function() {
    $scope.items.push({
      src: $scope.photo,
      sub: $scope.currentResult.restaurantName,
      address: $scope.results.results[$scope.current].vicinity,
      lat: $scope.results.results[$scope.current].geometry.location.lat,
      lng: $scope.results.results[$scope.current].geometry.location.lng
    });
  };

})