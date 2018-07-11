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

function getNearbyRestaurants(location, radius) {
    //  -- takes location [lat, lng] and radius (m)
    //  -- returns promise -- use .then() to get response

    return new Promise(function(resolve, reject) {
        var loc = new google.maps.LatLng(location[0], location[1]);

        var service = new google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch({
            location: loc,
            radius: radius,
            type: ['restaurant']
            }, function(response, status) {

                if(status == 'OK') {
                    console.log(response);
                    var returnArr = response.map(function(obj) {

                        var newObj = {
                            type: 'restaurant',
                            name: obj.name,
                            googleID: obj.id
                        }
                        return newObj;
                    })
                    resolve(returnArr);
                }
            }
        );
    })
};

