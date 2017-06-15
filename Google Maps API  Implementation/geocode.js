
function geocode(e) {

    e.preventDefault();
    let location = document.getElementById("location-input").value;
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
            address: location,
            key: "AIzaSyDKYIlMhuUtS1s3KHxUak1cZa_lcbol3xE"
        }
    })
        .then(function (responce) {

            let formattedAddress = responce.data.results[0].formatted_address;
            let formattedAddressOutput = `
            <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
            </ul>
        `;

            let addressComponents = responce.data.results[0].address_components;
            let addressComponentsOutput = '<ul class="list-group">';
            for (let i = 0; i < addressComponents.length; i++) {
                addressComponentsOutput += `
                 <li class="list-group-item"><strong>${addressComponents[i].types[0]}
                 </strong>: ${addressComponents[i].long_name}</li>
                `
            }
            addressComponentsOutput += "</ul>";

            let lat = responce.data.results[0].geometry.location.lat;
            let lng = responce.data.results[0].geometry.location.lng;
            let geometryOutput = `
            <ul class="list-group">
                <li class="list-group-item"><strong>Latitude:</strong>${lat}</li>
                <li class="list-group-item"><strong>Longitude:</strong>${lng}</li>
            </ul>
        `;

            document.getElementById("formatted_address").innerHTML = formattedAddressOutput;
            document.getElementById("address_components").innerHTML = addressComponentsOutput;
            document.getElementById("geometry").innerHTML = geometryOutput;
        })
        .catch(function (error) {
            console.log(error)
        })
}
