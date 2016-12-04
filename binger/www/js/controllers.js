angular.module('starter.controllers', [])

// .factory("PlacesFactory", function($http) {
//   return {
//     getPlaces: function() {
//       return $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1055,-115.1392&radius=1609&type=restaurant&key=AIzaSyDziyIlWeC-bUTiG2XOkDG9fkNT1bu2vHw");
//     }
//   }
// })


 .factory("YelpSearch", function($http) {  
   return {
      "getResults": function(name, url, params, callback) {
        // var key;
        // var keys = Object.keys(params); 

        // url += '/?';
        //  for (key in params) {
        //   console.log(key + ':  ' + params[key]);
        //   url += key + '=' + params[key];
        //   if(key !== keys.slice(-1)[0])
        //     url += '&';
        // }
        //   console.log(params);
        //   console.log(url);
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
  $scope.photo = "";
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

  // Button click goes to specificed path
  $scope.go = function(path) {
    $location.path(path)
  };

  $scope.openMaps = function() {
    launchnavigator.navigate([$scope.currentResult.lat, $scope.currentResult.lng]);
  };

  $scope.openEat24 = function() {
    if ($scope.currentResult.eat24 != null) {
      window.open($scope.currentResult.eat24, '_blank', 'location=no');
    }
  };

  // /*call Nearby Search and store in results variable*/
  // PlacesFactory.getPlaces().success(function(data) {
  //   $scope.results = data;
  //   console.log($scope.results);
  //   $scope.length = $scope.results.results.length;
  //   getNext();
  //   console.log($scope.currentResult);
  // });
 
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
     console.log($scope.currentResult);
  });

  //X button increments current to pull new image
  $scope.next = function() {
    if($scope.length != 0){

      //$scope.current = (++$scope.current) % $scope.results.results.length;
      
      $scope.current = (++$scope.current) % $scope.results.businesses.length;
      getNext();
      console.log($scope.currentResult)
    }
  };


  //pulls only the necessary fields from results{}
  var getNext = function() {
    $scope.currentResult = {
      // /*restaurant, image, address, coordinates*/
      // restaurantName: $scope.results.results[$scope.current].name,
      // image: $scope.results.results[$scope.current].photos != null ? $scope.results.results[$scope.current].photos[0].photo_reference : null,
      // address: $scope.results.results[$scope.current].vicinity,
      // lat: $scope.results.results[$scope.current].geometry.location.lat,
      // lng: $scope.results.results[$scope.current].geometry.location.lng
     
      restaurantName: $scope.results.businesses[$scope.current].name,
      image: $scope.results.businesses[$scope.current].image_url != null ? $scope.results.businesses[$scope.current].image_url : null,
      address: $scope.results.businesses[$scope.current].location.display_address[0],
      lat: $scope.results.businesses[$scope.current].location.coordinate.latitude,
      lng: $scope.results.businesses[$scope.current].location.coordinate.longitude,
      eat24: $scope.results.businesses[$scope.current].eat24_url
    }
    //fix for small image being loaded
    $scope.currentResult.image = $scope.currentResult.image.replace('ms.jpg', 'o.jpg');

    //call Get Photos API and return an image variable
    $scope.photo = $scope.currentResult.image;

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
        src: $scope.photo,
        sub: $scope.currentResult.restaurantName,
        // address: $scope.results.results[$scope.current].vicinity,
        // lat: $scope.results.results[$scope.current].geometry.location.lat,
        // lng: $scope.results.results[$scope.current].geometry.location.lng

        address: $scope.currentResult.address,
        lat:  $scope.currentResult.lat,
        lng:  $scope.currentResult.lng
      });
    }
  $scope.next();
  $scope.go('app/mainScreen');
  };
})