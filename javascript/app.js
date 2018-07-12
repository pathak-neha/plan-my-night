$(document).ready(function () {
function initMap(){
    
    function activateSearch(){
        var input = document.getElementById('search-term');
       var autoComplete = new google.maps.places.Autocomplete(input);
       google.maps.event.addListener(autoComplete, 'place_changed', function(){
        var place = autoComplete.getPlace();
        var name = place.name;
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        console.log("name: " + name + " lat: " + lat + " lng: " + lng)
       });
      
       
    };
    activateSearch();
   


}

///////////////////////////////// Initialize Firebase/////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////

  ///////////////Toggle sign In/ Out Google//////////////////////////////////////////////////////////
  function toggleSignInGoogle() {

    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var userGoogle = result.user;
        var photoURLGoogle = userGoogle.photoURL;
        $('#quickstart-image-google').text(photoURLGoogle);
        $(".card-img-top").attr("src", photoURLGoogle)
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

  ///////////////////////////init function google///////////////////////////////////
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

  //////////////////Sign in with Facebook///////////////////

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


  ///////////////////////init function facebook///////////////////////////////
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
        $(".mainApp").show();


//////////////////////////////////////

      } else {

        $('#quickstart-sign-in-status-face').text('Signed out');
        $('#quickstart-sign-in-face').text('Facebook Sign In');
        $('#quickstart-account-details-face').text(null);
        $('#quickstart-oauthtoken-face').text(null);
        $('#quickstart-image-face').text(null);
        $(".card-img-top").attr("src", null)
        $(".facebook").hide();
        $("#quickstart-sign-in-google").show()
        $(".mainApp").hide();
      }

      $("#quickstart-sign-in-face").prop("disabled", false);

    });
    document.getElementById('quickstart-sign-in-face').addEventListener('click', toggleSignInFace, false);
  }

  // ///////////////////////////////////////////////////////////

  window.onload = function () {
    initAppGoogle();
    initAppFace();
  };


/////////////////////////////FireBase Entry Section Test///////////
function writeUserData(emailFace, displayNameFace, uid) {
  firebase.database().ref('Users/'+displayNameFace+uid).update({
      username: displayNameFace,
      // email: emailFace,
      // userId: uid
  });
}



var firstName;

$("#submit").on("click", function () {
  // event.preventDefault();
  // var userId = firebase.auth().currentUser.uid;
  var userId = firebase.auth().currentUser.uid;
  var userName = firebase.auth().currentUser.displayName;
  firstName = $("#fname").val().trim();
  
  database.ref('UsersData/' + userName+userId).update({
    FirstName: firstName,
   
});
// var userId = firebase.auth().currentUser.uid;

})

//////////////////////////////////////////////////////////////////

////////////////////////////////Google Map Locator//////////

var Waypoints= []; 
var currentAddress;
var eventLocations= [{location: 'Thornhill, ON'}, {location: 'richmondhill, on'},{location: 'vaughan, on'}];
var Origin; 

$("#getCurrentLoc").on("click", function () {
  event.preventDefault();
Origin=document.getElementById("currentAddress").value;
Destination=Origin;
console.log("current address: "+Origin)
})

var pointer;
var locName;

for (i=0;i<eventLocations.length;i++){
pointer=i;
locName=eventLocations[i].location;
checkBoxMaker(pointer,locName)
}
/////////////////////
function checkBoxMaker(pointer, locName) {
   var input = $("<input>");
   input.attr("id","Point-"+pointer)
   input.attr("name","Point-"+pointer)
   input.attr("value",locName)
   input.attr("type","checkbox")

   var label=$("<label>")
   label.attr("for","Point-"+pointer)
   label.text(locName)
   $("#locations").append(input,label);

};

///////////////////////


$(":checkbox").click(function(){
  
  $("#right-panel").empty();
    
 
  var id = $(this).attr('id');
   var loc=$(this).attr('value')
  
  var checkBox=document.getElementById(id)
  var Testination;

   if (checkBox.checked == true){

 console.log(Waypoints.indexOf(loc));
 var isAvailable=Waypoints.findIndex(i => i.location === loc);
 console.log("is available"+isAvailable)
 if(isAvailable === -1){
 console.log(Waypoints.findIndex(i => i.location === loc))
 Waypoints.push({location: loc});

  console.log(Destination)

  initMap();

 console.log(loc)
 console.log(Waypoints)
}else{
 console.log(Waypoints)
}

} else{

var indexLoc=Waypoints.findIndex(i => i.location === loc);
console.log("in kos kesho pak kon  "+loc)
Waypoints.splice(indexLoc,1)
console.log(Waypoints)

initMap();

}

});    

 function initMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 4,
     center: {lat: 43.8205895, lng: -79.391605}  // Richmondhill.
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
   }, function(response, status) {
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





///////////current location/////////////////


var currgeocoder;

 

    navigator.geolocation.getCurrentPosition(function(position, html5Error) {
     
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

   //Check value is present or not & call google api function

   function initializeCurrent(latcurr, longcurr) {
        currgeocoder = new google.maps.Geocoder();
        console.log(latcurr + "-- ######## --" + longcurr);

        if (latcurr != '' && longcurr != '') {
            var myLatlng = new google.maps.LatLng(latcurr, longcurr);
            return getCurrentAddress(myLatlng);
        }
  }

   //Get current address

    function getCurrentAddress(location) {
         currgeocoder.geocode({
             'location': location

       }, function(results, status) {
      
           if (status == google.maps.GeocoderStatus.OK) {
               console.log(results[0]);
               $("#address").html(results[0].formatted_address);
               currentAddress=results[0].formatted_address;
               
           } else {
               alert('Geocode was not successful for the following reason: ' + status);
           }
       });
    }

 

////////////////////////////////////////////////////////////////

})