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

