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


$('#submit-btn').on('click', function (event) {
    event.preventDefault();
    lat = 43.6482130; // temporary - to be linked to Tobi's map geolocation data
    lng = -79.3890950; // temporary - to be linked to Tobi's map geolocation data
    var radius = 25;
    var eventfulKey = 'WF6X75bcVKvW7tKm';
    // var eventfulURL = 'http://api.eventful.com/json/events/search?app_key=' + eventfulKey + '&where=' + lat + ',' + long + '&within=' + radius;
    var oArgs = {
        app_key: eventfulKey,
        where: lat + ',' + lng,
        within: 25,
        "date": "2018071900-2018081900",
        page_size: 25,
        sort_order: "popularity"
    }
    EVDB.API.call("/events/search", oArgs, function (oData) {
        var result = oData;
        var eventsArray = result.events.event;
        console.log(eventsArray);
        var newArray = convertEventful(eventsArray);

        console.log(newArray[0].imageURL)

        for (i=0; i < newArray.length; i++) {
            $('#eventful-results').append(
                '<div class="col-2" data-location= "' + newArray[i].location + '">   <img src="' + 
                newArray[i].imageURL + '" alt="" ></div> <div class="col-10"><h3>' + 
                newArray[i].name +' </h3><br> <strong> Venue: </strong>' +
                newArray[i].venue +'  </div><hr>' )

            // var num = i+1
            
            // $('#eventful-results').append('Event #'+num+': '+eventsArray[i]['title']+'<br> <hr>');
        }
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