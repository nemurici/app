// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1chy1o-ZZlb1nkZgoE9S9TE7yYg9-BZU",
    authDomain: "extz-a8b13.firebaseapp.com",
    databaseURL: "https://extz-a8b13.firebaseio.com",
    storageBucket: "extz-a8b13.appspot.com",
    messagingSenderId: "695079908279"
};
firebase.initializeApp(config);




var facebookReady = function () {
//initializing FB
    console.log("initializing facebook app");
    FB.init({
        appId: '584022215134596',
        xfbml: true,
        version: 'v2.6'
    });
    FB.getLoginStatus(function (response) {
        console.log(response);
        if (response.status = "unknown") {
            console.log("loading login screen!");
        }
    });
};


function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                streetViewControl:false,
                // How zoomed in you want the map to start at (always required)
                zoom: 16,

                // The latitude and longitude to center the map (always required)
                center: initialLocation, // bucharest

                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
            };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var events = firebase.database().ref('/events').on('value', function(snapshot) {
             snapshot.val().forEach(function(elem){
                 if (elem.place && elem.place.location){
                     var location=new google.maps.LatLng(elem.place.location.latitude, elem.place.location.longitude);
                     var marker = new google.maps.Marker({
                         position: location,
                         map: map,
                         title: 'Click to zoom'
                     });
                 }

             })

            });


        });
    }


    console.log("Initializing Maps");

}


// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
