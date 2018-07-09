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

function geoFire_set(resultsArray, nameProperty, latProperty, lngProperty) {
    //  -- converts results array to an object and saves as a GeoFire instance
    //  -- first parameter is results array
    //  -- other parameters are strings giving the property names for 
    //  event name, latitude and longitude in this result set
    // -- returns the new GeoFire object

    var newRef = firebase.database().ref('Geofire').push();
    var newGeoFireInstance = new GeoFire(newRef);

    var buildObject = new Object();
    resultsArray.forEach(function(newLocation, i) {
        coords = [parseFloat(newLocation[latProperty]), parseFloat(newLocation[lngProperty])];
        buildObject[i] = coords;
        
        firebase.database()
            .ref('Geofire/' + thisRef.key + '/index/' + i)
            .set({name: newLocation[nameProperty]});
    })

    newGeoFireInstance
        .set(buildObject)
        .then(function() {
            console.log('New locations have been saved to firebase.');
        })

    return newGeoFireInstance;
}

function geoFire_getNearby(geoFireObject, loc, rad) {
    //  -- takes a geoFire instance, location [lat, long] and radius(km)
    //  -- returns array of names (from stored index) of stored locations within the search radius

    var results = [];
    var query = geoFireObject.query({center: loc, radius: rad});
    query.on('key_entered', function(key, loc, distance) {
        
        geoFireObject.ref().once('value', function(snap) {
            var name = snap.val().index[key].name;
            results.push(name);

            console.log(name + ' is ' + Math.round(distance) + ' km from this location');
        })

    });

    return results;
}

