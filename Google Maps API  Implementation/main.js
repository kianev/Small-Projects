
function initMap() {
    let options = {
        zoom: 10,
        center: {lat: 42.069546, lng: 24.818327}
    };

    let map = new google.maps.Map(document.getElementById('map'), options);

    google.maps.event.addListener(map,"click", function (event) {
        addMarker({coordinates: event.latLng})
    });

    let markers = [
        {
            coordinates: {lat: 42.149686, lng: 24.740087},
            iconImage: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            content: "<h3>Some Address</h3>"
        },
        {
            coordinates: {lat: 42.009783, lng: 24.876549},
            content: "<h3>Some Other Address</h3>"
        },
        {
            coordinates: {lat: 42.132395, lng: 24.938502},
            content: "<h3>Some Other Address</h3>"
        }];

    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }
    
    function addMarker(properties) {
        let marker = new google.maps.Marker({
            position: properties.coordinates,
            map: map,
        });

        if(properties.iconImage) {
            marker.setIcon(properties.iconImage);
        }

        if(properties.content){
            let infoWindow = new google.maps.InfoWindow({
                content: properties.content
            });

            marker.addListener("click", function () {
                infoWindow.open(map, marker);
            });
        }
    }
}