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
        "date": "Today",
        page_size: 25,
        sort_order: "popularity"
    };

    EVDB.API.call("/events/search", oArgs, function (oData) {
        var result = oData;
        var eventsArray = result.events.event;
        console.log('eventful response ---------------');
        console.log(eventsArray);
        for (i=0; i < eventsArray.length; i++) {
            var num = i+1
            $('#eventful-results').append('Event #'+num+': '+eventsArray[i]['title']+'<br>');
        };
    });
});

function convertEventful(eventfulArr) {

    var newArray = eventfulArr.map(function(obj) {
        var newObj = {
            name: obj.title,
            venue: obj.venue_name,
            venueURL: obj.venue_url,
            location: [obj.latitude, obj.longitude],
            startTime: obj.start_time,
            eventfulID: obj.id
        }
        if(obj.image !== null) {
            newObj.imageURL = obj.image.medium.url;
        } else {
            newObj.imageURL = 'https://picsum.photos/128';
        }

        return newObj;
    })

    return newArray;
}

