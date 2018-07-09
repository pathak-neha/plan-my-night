function initMap(){
    
    function activateSearch(){
        var input = document.getElementById('search-term');
       var autoComplete = new google.maps.places.Autocomplete(input)
      
    
    };
    activateSearch();
}

function geoFire_set(resultsArray, nameProperty, latProperty, lngProperty) {
    //  -- converts results array to an object and saves to a geoFire instance
    //  -- first parameter is a results array
    //  -- other parameters take strings identifying the name, latitude, longitude property
    //  for this results set
    //  -- returns geofire object

    var newRef = firebase.database().ref('Geofire').push();
    var newGeoFireInstance = new GeoFire(newRef);

    var buildObject = new Object();
    resultsArray.forEach(function(newLocation, i) {
        coords = [parseFloat(newLocation[latProperty]), parseFloat(newLocation[lngProperty])];
        buildObject[i] = coords;
        
        firebase.database()
            .ref('Geofire/' + newRef.key + '/index/' + i)
            .set({name: newLocation[nameProperty]});
    })

    newGeoFireInstance
        .set(buildObject)
        .then(function() {
            console.log('New locations have been saved to firebase.');
        })

    return newGeoFireInstance;
}

function geoFire_getNearby(geoFireObj, loc, rad) {
    //  -- takes a geoFire object, location [lat, long], rad(km)
    //  -- returns an array of names (as stored in database index) of stored locations within the search radius

    var results = [];
    var query = geoFireObj.query({center: loc, radius: rad});
    query.on('key_entered', function(key, loc, distance) {
        geoFireObj.ref().once('value', function(snap) {
                var name = snap.val().index[key].name;
                results.push(name);

                console.log(name + ' is ' + Math.round(distance) + ' km from this location');
            })
    });

    return results;
}