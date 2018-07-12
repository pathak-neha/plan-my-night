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
})