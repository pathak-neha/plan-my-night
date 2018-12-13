## Plan My Night
Based in Toronto and looking for a quick plan for tonight? [Plan My Night](https://pathak-neha.github.io/plan-my-night "View Live!") is single page web app to provide an easy way for a user to find a nearby event & restaurant happening today! Utilizing the Google Maps + Places libraries, and a Firebase back-end, this app is serverless in function, and the design is mobile-responsive, making this app optimal for use on both web and mobile devices.

**_The Inspiration_**  
This app was born of a UX need that my team and I identified. Most apps provide a single service - either find an event or a restaurant - and never as the result of a single search query. My team and I found that this was a problem that we personally faced, even though this is something that technology can easily solve.

Websites like Yelp, Eventful, Eventbrite, TicketMaster, etc. already provided information on upcoming events. The Google Maps + Places libraries, in combination, already provided the ability to conduct a location-based search to find a closeby restaurant. It was just a matter of combining the two in a meaningful manner, to lessen the number of steps needed to be taken by a user to plan a night out in our city.  

**_The Technical Details_**  
Firstly, the APIs and libraries we used for the main functionality (in order of use upon landing on our page):
- _Google Firebase Auth Module_: to provide an option to login and save previously searched information.
- _Geolocation_: to auto-fill the location of the active device in the search field.
- _Google Maps Autocomplete_: to imporve the UX of our searchbar.
- _Eventful_: to find event details from a location-based search.
- _Google Places_: to list restaurant options from a location-based query.

Secondly, our RESTful app used a Firebase backend, to optimize the load time for get/post requests of individual units of information.

**_The Team_**  
[Mark Prince](https://www.github.com/mrkprinc "View Profile")  
[Tobi Akinwumi](https://www.github.com/akinwol "View Profile")  
[Aboozar Mojdeh](https://www.github.com/aboozarmojdeh "View Profile")
