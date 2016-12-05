angular.module('starter.controllers', [])


 .factory("YelpSearch", function($http) {  
   return {
      "getResults": function(name, url, params, callback) {
          $http.jsonp(url, {params: params}).success(callback);
      }
  }
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
  $scope.photo = {};
  $scope.current = 0;
  $scope.length = 0;
  $scope.Math = window.Math;

  //* Tutorial Overlay
  $ionicModal.fromTemplateUrl('templates/tutorial.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openTutorial = function() {
    $scope.modal.show();
  };

  $scope.closeTutorial = function() {
    $scope.modal.hide();
  };

  // Button click goes to specificed path, with a specific photo
  $scope.visit = function(path) {
    $scope.photo = { 
      restaurantName: $scope.currentResult.restaurantName,
      image: $scope.currentResult.image,
      address: $scope.currentResult.address,
      lat: $scope.currentResult.lat,
      lng: $scope.currentResult.lng,
      eat24: $scope.currentResult.eat24 == null ? null : $scope.currentResult.eat24
    };
    $location.path(path)
  };

  $scope.reVisit = function(path, result){
    console.log(result);
    $scope.photo = { 
      restaurantName: result.restaurantName,
      image: result.image,
      address: result.address,
      lat: result.lat,
      lng: result.lng,
      eat24: result.eat24 == null ? null : result.eat24
    };
    $location.path(path)
  };

  $scope.prevAdded = function(){
    for (var i =0; i < $scope.items.length; i++) {
      if($scope.photo.image == $scope.items[i].image)
        return true;
    }
    return false;
  };

  $scope.isNull = function(){
    if($scope.photo.eat24 != null)
      return false;
    else{
      return true;
    }
  };

  $scope.onItemDelete = function(index) {
    $scope.items.splice(index, 1);
  };

  $scope.openMaps = function() {
    launchnavigator.navigate([$scope.photo.lat, $scope.photo.lng]);
  };

  $scope.openEat24 = function() {
    if ($scope.photo.eat24 != null) {
      window.open($scope.photo.eat24, '_blank', 'location=no');
    }
  };

  var randomString = function(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
  }
  // var nonce = 
  var method = 'GET';
  var url = 'http://api.yelp.com/v2/search';
  var params = {
          callback: 'angular.callbacks._0',
          term: 'food',
          limit: '40',
          location: '36.1055,-115.1392',
          radius_filter: '1609',
          actionlinks: 'True',
          oauth_consumer_key: '0UXXnlrVDVdlVf0ep6Z71A', 
          oauth_token: 'k6Ietk_TA37nzW3m3d0pfHUlEBlocxTx', 
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: new Date().getTime(),
          oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      };
  var consumerSecret = 'yiaqJptybCX3NovTtsGA-Hs-7S8'; 
  var tokenSecret = 'LukkVdKDpnKazlpROsZWO-JpP4g'; 
  var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
  params['oauth_signature'] = signature;
  YelpSearch.getResults('', url, params, function(data) {
     $scope.results = data;
     console.log($scope.results);
     $scope.length = $scope.results.businesses.length;
     getNext();
     });

  //X button increments current to pull new image
  $scope.next = function() {
    if($scope.length != 0){

      //$scope.current = (++$scope.current) % $scope.results.results.length;
      
      $scope.current = (++$scope.current) % $scope.results.businesses.length;
      getNext();
    }
  };


  //pulls only the necessary fields from results{}
  var getNext = function() {
    //currentResult contatins the data for the newest photo shown in the main screen
    $scope.currentResult = {
      // /*restaurant, image, address, coordinates*/
      restaurantName: $scope.results.businesses[$scope.current].name,
      image: $scope.results.businesses[$scope.current].image_url != null ? $scope.results.businesses[$scope.current].image_url : null,
      address: $scope.results.businesses[$scope.current].location.display_address[0],
      lat: $scope.results.businesses[$scope.current].location.coordinate.latitude,
      lng: $scope.results.businesses[$scope.current].location.coordinate.longitude,
      eat24: $scope.results.businesses[$scope.current].eat24_url
    
    }
    //fix for small image being loaded
    $scope.currentResult.image = $scope.currentResult.image.replace('ms.jpg', 'o.jpg');

    //photo will contain the data for the photo currently being manipulated
    $scope.photo = $scope.currentResult;

  };

  //image array for gallery
  $scope.items = [];
  
  $scope.add2Q = function() {
    var isNew = 1;

    for (i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].src == $scope.photo) {
        isNew = 0;
      }
    }

    if (Boolean(isNew)) {
      $scope.items.push({
        image: $scope.currentResult.image,
        restaurantName: $scope.currentResult.restaurantName,
        address: $scope.currentResult.address,
        lat:  $scope.currentResult.lat,
        lng:  $scope.currentResult.lng,
        eat24: $scope.results.businesses[$scope.current].eat24_url
      });
    }
  $scope.next();
  $scope.visit('app/mainScreen');
  };
})