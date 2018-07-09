function initMap(){
    
    function activateSearch(){
        var input = document.getElementById('search-term');
       var autoComplete = new google.maps.places.Autocomplete(input)
      
    
    };
    activateSearch();
}

function geoFire(resultsArray, nameProperty, latProperty, lngProperty) {
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