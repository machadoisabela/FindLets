app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
// app.service('GooglePlacesService', function($q){
//   this.getPlacePredictions = function(query){
//     var dfd = $q.defer(),
//     		service = new google.maps.places.AutocompleteService();

//     service.getPlacePredictions({ input: query }, function(predictions, status){
//       if (status != google.maps.places.PlacesServiceStatus.OK) {
//         dfd.resolve([]);
//       }
//       else
//       {
//         dfd.resolve(predictions);
//       }
//     });

//     return dfd.promise;
//   };

// 	this.getLatLng = function(placeId){
//     var dfd = $q.defer(),
// 				geocoder = new google.maps.Geocoder;

// 		geocoder.geocode({'placeId': placeId}, function(results, status) {
//       if(status === 'OK'){
//         if(results[0]){
// 					dfd.resolve(results[0].geometry.location);
// 				}
// 				else {
// 					dfd.reject("no results");
// 				}
// 			}
// 			else {
// 				dfd.reject("error");
// 			}
// 		});

//     return dfd.promise;
//   };

// 	this.getPlacesNearby = function(location){
// 		// As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
// 		var dfd = $q.defer(),
// 				elem = document.createElement("div"),
//     		service = new google.maps.places.PlacesService(elem);

// 		service.nearbySearch({
// 	    location: location,
// 	    radius: '1000',
// 	    types: ['restaurant']
// 	  }, function(results, status){
// 			if (status != google.maps.places.PlacesServiceStatus.OK) {
// 		    dfd.resolve([]);
// 		  }
// 			else {
// 				dfd.resolve(results);
// 			}
// 		});

//     return dfd.promise;
//   };

// 	this.getPlaceDetails = function(placeId){
// 		// As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
// 		var dfd = $q.defer(),
// 				elem = document.createElement("div"),
//     		service = new google.maps.places.PlacesService(elem);

// 		service.getDetails({
// 	    placeId: placeId
// 	  }, function(place, status){
// 			if (status == google.maps.places.PlacesServiceStatus.OK) {
// 		    dfd.resolve(place);
// 		  }
// 			else {
// 				dfd.resolve(null);
// 			}
// 		});

//     return dfd.promise;
//   };
// })

;
