var HTMLmenuName = "<li><a href='%url%'>%data%</a></li>";

var HTMLheaderName = "<h1 id='name'>%data%</h1>";
var HTMLheaderRole = "<span>%data%</span><hr/>";

var HTMLcontactGeneric = "<li class='flex-item'><span class='orange-text'>%contact%</span><span class='white-text'>%data%</span></li>";
var HTMLmobile = "<li class='flex-item'><span class='orange-text'>mobile</span><span class='white-text'>%data%</span></li>";
var HTMLemail = "<li class='flex-item'><span class='orange-text'>email</span><span class='white-text'>%data%</span></li>";
var HTMLtwitter = "<li class='flex-item'><span class='orange-text'>twitter</span><span class='white-text'>%data%</span></li>";
var HTMLgithub = "<li class='flex-item'><span class='orange-text'>github</span><span class='white-text'>%data%</span></li>";
var HTMLblog = "<li class='flex-item'><span class='orange-text'>blog</span><span class='white-text'>%data%</span></li>";
var HTMLlocation = "<li class='flex-item'><span class='orange-text'>location</span><span class='white-text'>%data%</span></li>";

var HTMLbioPic = "<img src='%data%' class='biopic'>";
var HTMLWelcomeMsg = "<span class='welcome-message'>%data%</span>";

var HTMLskillsStart = "<div class='skills-entry'><h3 id='skillsH3'>Skills at a Glance:</h3><ul id='skills' class='flex-box'></ul>";
var HTMLskills = "<li class='flex-item'><span class='white-text'>%data%</span></li></div>";

var HTMLworkStart = "<div class='work-entry'>";
var HTMLworkEmployer = "<a href='#workExperience'>%data%";
var HTMLworkTitle = " - %data%</a>";
var HTMLworkDates = "<div class='date-text'>%data%</div>";
var HTMLworkLocation = "<div class='location-text'>%data%</div>";
var HTMLworkDescription = "<p><br>%data%</p></div>";
var HTMLworkReadMore = "<a href='#' class='w_read_more work-entry'>Show More</a><br/>";
var HTMLworkMoreWork = "<span id ='workMoreText' style='display: none'></span>";

var HTMLprojectStart = "<div class='project-entry tab' id='%data%'><input type='radio' id='%id%' name='tab-group-1' %checked%>";
var HTMLprojectLabel = "<label for='%id%'>Project %id+1%</label>"
var HTMLprojectTitle = "<div class='tab-content'><a href='#projects'>%data%</a>";
var HTMLprojectDates = "<div class='date-text'>%data%</div>";
var HTMLprojectDescription = "<p><br>%data%</p>";
var HTMLprojectImage = "<a href='%url%' target='_blank'><img class='projectpic' src='%data%'></a></div></div>";

var HTMLschoolStart = "<div class='education-entry'>";
var HTMLschoolName = "<a href='#education'>%data%";
var HTMLschoolDegree = " - %data%</a>";
var HTMLschoolDates = "<div class='date-text'>%data%</div>";
var HTMLschoolLocation = "<div class='location-text'>%data%</div>";
var HTMLschoolMajor = "<em><br>%majors%: %data%</em></div>"

var HTMLonlineClasses = "<h3>Courses & Certificates</h3>";
var HTMLonlineTitle = "<div class='education-entry'><a href='%url%' target='_blank'>%data%";
var HTMLonlineSchool = " - %data%</a>";
var HTMLonlineDates = "<div class='date-text'>%data%</div></div>";
var HTMLonlineReadMore = "<a href='#' class='e_read_more education-entry'>Show More</a><br/>";
var HTMLonlineMoreCourses = "<span id ='coursesMoreText' style='display: none'></span>";

var internationalizeButton = "<button>Internationalize</button>";
var googleMap = "<div id='map'></div>";


/*
 The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
 */
$(document).ready(function() {
    $('button').click(function() {
        var iName = inName() || function(){};
        $('#name').html(iName);
    });
})


/*
 The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
 */
clickLocations = [];

function logClicks(x,y) {
    clickLocations.push(
        {
            "x": x,
            "y": y
        }
    );
    console.log("x location: " + x + "; y location: " + y);
}

$(document).click(function(loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x,y);
});



/*
 This is the fun part. Here's where we generate the custom Google Map for the website.
 See the documentation below for more details.
 https://developers.google.com/maps/documentation/javascript/reference
 */
var map;    // declares a global map variable


/*
 Start here! initializeMap() is called when page is loaded.
 */
function initializeMap() {

    var locations;

    var mapOptions = {
        disableDefaultUI: true
    };

    // This next line makes `map` a new Google Map JavaScript Object and attaches it to
    // <div id="map">, which is appended as part of an exercise late in the course.
    var map = new google.maps.Map(document.querySelector('#map'), mapOptions);

    /*
     https://developers.google.com/maps/documentation/javascript/places
     locationFinder() returns an array of every location string from the JSONs
     written for bio, education, and work.
     */
    function locationFinder() {
        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        locations.push(bio.contactInfo.location);

        // iterates through school locations and appends each location to
        // the locations array
        for (var school in education.schools) {
            locations.push(education.schools[school].location);
        }

        // iterates through work locations and appends each location to
        // the locations array
        for (var job in workHistory.work) {
            locations.push(workHistory.work[job].location);
        }

        return locations;
    }
    /*
     createMapMarker(placeData) reads Google Places search results to create map pins.
     placeData is the object returned from search results containing information
     about a single location.
     */
    function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.k;  // latitude from the place service
        var lon = placeData.geometry.location.B;  // longitude from the place service
        var name = placeData.formatted_address;   // name of the place from the place service
        var bounds = window.mapBounds;            // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name
        });

        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
            content: name
        });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map,marker);
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    /*
     callback(results, status) makes sure the search returned results for a location.
     If so, it creates a new map marker for that location.
     */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0])
        }
    }

    /*
     pinPoster(locations) takes in the array of locations created by locationFinder()
     and fires off Google place searches for each location
     */
    function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
        for (place in locations) {

            // the search request object
            var request = {
                query: locations[place]
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        }
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // pinPoster(locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);

};

/*
 Uncomment all the code below when you're ready to implement a Google Map!
 */

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
//Make sure the map bounds get updated on page resize
map.fitBounds(mapBounds);
});
