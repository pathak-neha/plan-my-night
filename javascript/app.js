$(document).ready(function () {

  /////////////////////// Authentication

  // Firebase: initialize
  var config = {
    apiKey: "AIzaSyDyl6LbsZhvCUAEnH0wgDavA3MGW8daMP4",
    authDomain: "bootcamp-project-1-uoft.firebaseapp.com",
    databaseURL: "https://bootcamp-project-1-uoft.firebaseio.com",
    projectId: "bootcamp-project-1-uoft",
    storageBucket: "bootcamp-project-1-uoft.appspot.com",
    messagingSenderId: "369507245874"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var projectName = "Project Name"
  var databaseRef = database.ref(projectName)

  // Google: toggle sign-in/sign-out
  function toggleSignInGoogle() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var userGoogle = result.user;
        var photoURLGoogle = userGoogle.photoURL;
        $('#quickstart-image-google').text(photoURLGoogle);
        $(".card-img-top").attr("src", photoURLGoogle);
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          $(".help-block").text('You have already signed up with a different auth provider for that email.');
        } else {
          console.error(error);
        }
      });
    } else {
      firebase.auth().signOut();
      $(".google").hide();
    }
  }

  // Google: initialize
  function initAppGoogle() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var displayNameGoogle = user.displayName;
        var emailGoogle = user.email;
        var emailVerifiedGoogle = user.emailVerified;
        var photoURLGoogle = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var photoURLGoogle = user.photoURL;
        $('#quickstart-sign-in-status-google').text('Signed in');
        $('#quickstart-sign-in-google').text("Sign out");
        $('#quickstart-account-details-google').text(displayNameGoogle);
        $(".card-img-top").attr("src", photoURLGoogle)
        $(".google").show();
        $(".facebook").hide();
        $("#quickstart-sign-in-face").hide();
      } else {
        $('#quickstart-sign-in-status-google').text("Signed out");
        $('#quickstart-sign-in-google').text("Google Sign In");
        $('#quickstart-account-details-google').text(null);
        $('#quickstart-image-google').text(null);
        $(".card-img-top").attr("src", null);
        $(".google").hide();
        $(".facebook").show();
        $("#quickstart-sign-in-face").show();
      }
    });
    document.getElementById('quickstart-sign-in-google').addEventListener('click', toggleSignInGoogle, false);
  }

  // Facebook: toggle sign-in/sign-out
  function toggleSignInFace() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.FacebookAuthProvider();
      // provider.addScope('user_birthday');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var userFace = result.user;
        var photoURLFace = userFace.photoURL;
        $('#quickstart-oauthtoken-face').text(token);
        $('#quickstart-image-face').text(photoURLFace);
        $(".card-img-top").attr("src", photoURLFace)
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
        } else {
          console.error(error);
        }
      });
    } else {
      firebase.auth().signOut();
      $(".facebook").hide();

    }
    $("#quickstart-sign-in-face").prop("disabled", true);
  }


  // Facebook: initialize
  function initAppFace() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var displayNameFace = user.displayName;
        var emailFace = user.email;
        var emailVerified = user.emailVerified;
        var photoURLFace = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        writeUserData(emailFace, displayNameFace, uid)

        $('#quickstart-sign-in-status-face').text('Signed in');
        $('#quickstart-sign-in-face').text('Log out');
        $('#quickstart-account-details-face').text(displayNameFace);
        $(".card-img-top").attr("src", photoURLFace)
        $(".facebook").show();
        $(".google").hide();
        $("#quickstart-sign-in-google").show()
        $("#quickstart-sign-in-face").hide()
        $("#mainApp").show();
      } else {
        $('#quickstart-sign-in-status-face').text('Signed out');
        $('#quickstart-sign-in-face').text('Facebook Sign In');
        $('#quickstart-account-details-face').text(null);
        $('#quickstart-oauthtoken-face').text(null);
        $('#quickstart-image-face').text(null);
        $(".card-img-top").attr("src", null)
        $(".facebook").hide();
        $("#quickstart-sign-in-google").show()
        $("#mainApp").hide();
      }

      $("#quickstart-sign-in-face").prop("disabled", false);

    });
    document.getElementById('quickstart-sign-in-face').addEventListener('click', toggleSignInFace, false);
  }

  // Execute initialize functions
  window.onload = function () {
    initAppGoogle();
    initAppFace();
  };


  // FireBase: saving user data
  function writeUserData(emailFace, displayNameFace, uid) {
    firebase.database().ref('Users/' + displayNameFace + uid).update({
      username: displayNameFace,
      // email: emailFace,
      // userId: uid
    });
  }

  var firstName;

  $("#submit").on("click", function () {
    event.preventDefault();
    // var userId = firebase.auth().currentUser.uid;
    var userId = firebase.auth().currentUser.uid;
    var userName = firebase.auth().currentUser.displayName;
    firstName = $("#fname").val().trim();

    database.ref('UsersData/' + userName + userId).update({
      FirstName: firstName,
    });
    // var userId = firebase.auth().currentUser.uid;

  });

  // App: Flow
  $('.sign-in-btn').on('click',function(){
    $('#login-text').hide();
    $('#location-input').show();
    $('.header').hide();
    $('.header-2').show();
  })

  /////////////////////// End of Authentication

  /////////////////////// App Functionality

  // Google Maps/Locator
  var Waypoints = [];
  var currentAddress;
  // *** needs updating?
  var eventLocations = [{ location: 'Thornhill, ON' }, { location: 'Richmond Hill, ON' }, { location: 'Vaughan, ON' }];
  var Origin;

  $("#getCurrentLoc").on("click", function () {
    event.preventDefault();
    Origin = document.getElementById("currentAddress").value;
    Destination = Origin;
    console.log("current address: " + Origin)
  })

  var pointer;
  var locName;

  for (i = 0; i < eventLocations.length; i++) {
    pointer = i;
    locName = eventLocations[i].location;
    checkBoxMaker(pointer, locName)
  }
  /////////////////////// 
  function checkBoxMaker(pointer, locName) {
    var input = $("<input>");
    input.attr("id", "Point-" + pointer)
    input.attr("name", "Point-" + pointer)
    input.attr("value", locName)
    input.attr("type", "checkbox")

    var label = $("<label>")
    label.attr("for", "Point-" + pointer)
    label.text(locName)
    $("#locations").append(input, label);

  };
  ///////////////////////
  $(":checkbox").click(function () {
    $("#right-panel").empty();
    var id = $(this).attr('id');
    var loc = $(this).attr('value')
    var checkBox = document.getElementById(id)
    var Testination;
    if (checkBox.checked == true) {
      console.log(Waypoints.indexOf(loc));
      var isAvailable = Waypoints.findIndex(i => i.location === loc);
      console.log("is available" + isAvailable)
      if (isAvailable === -1) {
        console.log(Waypoints.findIndex(i => i.location === loc))
        Waypoints.push({ location: loc });
        console.log(Destination)
        initMap2();
        console.log(loc)
        console.log(Waypoints)
      } else {
        console.log(Waypoints)
      }
    } else {
      var indexLoc = Waypoints.findIndex(i => i.location === loc);
      console.log("in kos kesho pak kon  " + loc)
      Waypoints.splice(indexLoc, 1)
      console.log(Waypoints)
      initMap2();
    }
  });

  function initMap2() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: 43.8205895, lng: -79.391605 }  // Richmondhill *** is this correct?
    });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map,
      panel: document.getElementById('right-panel')
    });
    displayRoute(Origin, Destination, directionsService,
      directionsDisplay);
  }

  function displayRoute(origin, destination, service, display) {
    service.route({
      origin: Origin,
      destination: Destination,
      waypoints: Waypoints,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }

  // Current Location Finder
  var currgeocoder;

  navigator.geolocation.getCurrentPosition(function (position, html5Error) {
    geo_loc = processGeolocationResult(position);
    currLatLong = geo_loc.split(",");
    initializeCurrent(currLatLong[0], currLatLong[1]);

  });

  function processGeolocationResult(position) {
    html5Lat = position.coords.latitude; //Get latitude
    html5Lon = position.coords.longitude; //Get longitude
    html5TimeStamp = position.timestamp; //Get timestamp
    html5Accuracy = position.coords.accuracy; //Get accuracy in meters
    return (html5Lat).toFixed(8) + ", " + (html5Lon).toFixed(8);
  }

  // Check value is present or not & call google api function

  function initializeCurrent(latcurr, longcurr) {
    currgeocoder = new google.maps.Geocoder();
    console.log(latcurr + "-- ######## --" + longcurr);

    if (latcurr != '' && longcurr != '') {
      var myLatlng = new google.maps.LatLng(latcurr, longcurr);
      return getCurrentAddress(myLatlng);
    }
  }

  // Get current address

  var searchAddress;
  function getCurrentAddress(location) {
    currgeocoder.geocode({
      'location': location

    }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0]);
        $("#address").html(results[0].formatted_address);
        currentAddress = results[0].formatted_address;
        $('#search-term').val(currentAddress);
        searchAddress = currentAddress;

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  $('#form-location').submit(function(event) {
      event.preventDefault();
  })


  ///////////////// End of Google Maps/Locator 


//   var latSearch = 0;
//   var lngSearch = 0;


  function activateSearch() {
    var input = document.getElementById('search-term');
    var autoComplete = new google.maps.places.Autocomplete(input);
    console.log(autoComplete)
    google.maps.event.addListener(autoComplete, 'place_changed', function () {
      var place = autoComplete.getPlace();
      var name = place.name;
      latSearch = place.geometry.location.lat();
      lngSearch = place.geometry.location.lng();
      console.log("name: " + name + " lat: " + latSearch + " lng: " + lngSearch)
      searchAddress = place.formatted_address;
    });
}

  activateSearch();

  // Eventful/Events Finder

  var eventfulResultsArray;
  var locationsToMap = [];
  var resultsMap;

  $('#events-submit-btn').on('click', function (event) {
    event.preventDefault();
    $('#events').show();
    var radius = 25;
    var eventfulKey = 'WF6X75bcVKvW7tKm';
    // var eventfulURL = 'http://api.eventful.com/json/events/search?app_key=' + eventfulKey + '&where=' + lat + ',' + long + '&within=' + radius;
    // console.log("submit lat: " + latSearch + "lng Submit: " + lngSearch)
    var oArgs = {
      app_key: eventfulKey,
    //   where: latSearch + ',' + lngSearch,
      where: searchAddress,
      within: radius,
      "date": "TODAY",
      page_size: 25,
      sort_order: "popularity",
      scheme: 'https'
    }

    // display search message (bc API response can be slow)
    $('#eventful-results').html('<span>Searching for nearby events...</span>');

    // API call
    EVDB.API.call("/events/search", oArgs, function (oData) {
      var result = oData;
      var eventsArray = result.events.event;
      var newArray = convertEventful(eventsArray);
      eventfulResultsArray = newArray;

      $('#eventful-results').empty();
      for (i = 0; i < newArray.length; i++) {
        $('#eventful-results').append(
          '<div class="col eventful-result" id="result-card" data-index="' + i + '" data-location= "' + newArray[i].location + '"><img src="' +
          newArray[i].imageURL + '" alt="" > <div class="col-10"><h3>' +
          newArray[i].name + ' </h3><br> <strong> Venue: </strong>' +
          newArray[i].venue + '  </div><hr> </div>'
        )
      }
    });
  });

  function convertEventful(eventfulArr) {
    // -- takes Eventful JSON response, converts into an array of simpler objects
    // -- returns new array

    var newArray = eventfulArr.map(function (obj) {
      var newObj = {
        name: obj.title,
        venue: obj.venue_name,
        venue_address: obj.venue_address,
        venueURL: obj.venue_url,
        location: [obj.latitude, obj.longitude],
        startTime: obj.start_time,
        eventfulID: obj.id
      }
      if (obj.image !== null) {
        newObj.imageURL = obj.image.medium.url;
      } else {
        newObj.imageURL = 'https://picsum.photos/128?image=56';
      }
      return newObj;
    })
    return newArray;
  }

  var restaurantResultsArray;
  $('#eventful-results').on('click', '.eventful-result', function () {
    //  --click event, logs restaurants from Google Places within 1 km
    //  based on 'data-location' attribute of clicked element

    var loc = $(this).data('location').split(',');
    var index = $(this).data('index');

    var locationObj = {
      location: eventfulResultsArray[index].venue_address
    }
    locationsToMap.push(locationObj);

    getNearbyRestaurants(loc, 1000).then(function (response) {

      restaurantResultsArray = response;

      // render restaurant results to html
      $('#eventful-results').empty();
      $('#eventful-results').append(
        '<div class="col eventful-result" id="result-card" data-index="' + index + '" data-location= "' + eventfulResultsArray[index].location + '"><img src="' +
        eventfulResultsArray[index].imageURL + '" alt="" > <div class="col-10"><h3>' +
        eventfulResultsArray[index].name + ' </h3><br> <strong> Venue: </strong>' +
        eventfulResultsArray[index].venue + '  </div><hr> </div>'
      )

      var mapDiv = $('<div>');
      mapDiv
        .attr('id', 'resultsMap')
      mapDiv.appendTo($('#eventful-results'));

      var startcoord = new google.maps.LatLng(43.642721, -79.387046);
      var thisMap = new google.maps.Map(document.getElementById('resultsMap'), {zoom: 12, center: startcoord});
      var latlong = new google.maps.LatLng(eventfulResultsArray[index].location[0], eventfulResultsArray[index].location[1]);
      var marker = new google.maps.Marker({position: latlong, map: thisMap});
      var markerInfo = new google.maps.InfoWindow({
          content: eventfulResultsArray[index].name
      })
      marker.addListener('click', function() {
        markerInfo.open(thisMap, marker);
      });
      resultsMap = thisMap;


      var newDiv = '<div><span>Nearby restaurants: </span></div>';
      $('#eventful-results').append(newDiv);

      response.forEach(function(restaurant, j) {
        var newDiv = $('<div>');
        newDiv
          .addClass('restaurant-result')
          .attr('data-index', j);
        var content = '<div><strong>' + restaurant.name + '</strong></div>';
        newDiv.html(content);

        $('#eventful-results').append(newDiv);

      })

    })
  })

  $('#eventful-results').on('click', '.restaurant-result', function() {

    var index = $(this).data('index');
    var newDiv = $('<div>');

    // var service = new google.maps.places.PlacesService(document.createElement('div'));
    var service = new google.maps.places.PlacesService(resultsMap);
    service.getDetails({placeId: restaurantResultsArray[index].googleID}, function(response, status) {

      newDiv.html('<div>' + response.formatted_address + '</div> <div>' + response.formatted_phone_number + '</div>');

      var locationObj = {
        location: response.formatted_address
      }
      locationsToMap.push(locationObj);
    })

    var latlong = new google.maps.LatLng(restaurantResultsArray[index].location[0], restaurantResultsArray[index].location[1]);
    var marker = new google.maps.Marker({position: latlong , map: resultsMap});
    var markerInfo = new google.maps.InfoWindow({
        content: restaurantResultsArray[index].name
    })
    marker.addListener('click', function() {
      markerInfo.open(resultsMap, marker);
    });

    $(this).append(newDiv);
    $(this).append('<hr>');
    $(this).insertAfter($('.eventful-result'));

  })

  function initMap(){

  }

  function getNearbyRestaurants(location, radius) {
    //  -- takes location [lat, lng] and radius (m)
    //  -- returns promise -- use .then() to get response

    return new Promise(function (resolve, reject) {
      var loc = new google.maps.LatLng(location[0], location[1]);

      var service = new google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch({
        location: loc,
        radius: radius,
        type: ['restaurant']
      }, function (response, status) {

        if (status == 'OK') {

          var returnArr = response.map(function (obj) {

            var newObj = {
              type: 'restaurant',
              name: obj.name,
              location: [obj.geometry.location.lat(), obj.geometry.location.lng()],
              googleID: obj.place_id
            }
            return newObj;
          })
          resolve(returnArr);
        };
      });
    });
  };

  // End of Eventful/Events Finder

});
