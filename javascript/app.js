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
   


};

$('#search-btn').on('click', function (event) {
    event.preventDefault();
    lat = 43.6482130; // temporary - to be linked to Maps geolocation data
    lng = -79.3890950; // temporary - to be linked to Maps geolocation data
    var radius = 25;
    var eventfulKey = 'WF6X75bcVKvW7tKm';
    var oArgs = {
        app_key: eventfulKey,
        where: lat + ',' + lng,
        within: 25,
        "date": "2018071900-2018081900", // temporary - to be linked to today's date 
        page_size: 25,
        sort_order: "popularity"
    };

    EVDB.API.call("/events/search", oArgs, function (oData) {
        var result = oData;
        var eventsArray = result.events.event;
        console.log(eventsArray);
        for (i=0; i < eventsArray.length; i++) {
            var num = i+1
            $('#eventful-results').append('Event #'+num+': '+eventsArray[i]['title']+'<br>');
        };
    });
});

