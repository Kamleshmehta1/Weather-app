currentLoaction.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude);
        fetchLocationName(position.coords.latitude, position.coords.longitude);
    }

    const fetchLocationName = async (lat, lng) => {
        await fetch(
                'https://www.mapquestapi.com/geocoding/v1/reverse?key=G1moSFJkXvMTf7kCVqTOPMh1SxtvJaGi&location=' + lat + '%2C' + lng + '&outFormat=json&thumbMaps=false',
            )
            .then((response) => response.json())
            .then((responseJson) => {

                let alldata = JSON.stringify(responseJson)
                console.log(Object.entries(alldata));

            });
    };
})


