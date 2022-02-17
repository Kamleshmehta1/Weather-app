const currentLocation = document.querySelector(".current-location")
const weatherContainer = document.querySelector(".w-container")
const display = document.querySelector(".fa-search")
const currentLoaction = document.querySelector(".current-location")
const input = document.querySelector("input")
const city = document.querySelector(".city")
const temp = document.querySelector(".temp")
const weath = document.querySelector(".weath")
const date = document.querySelector(".date")
const click = document.querySelector(".click")


const apikey = "9577ed9712a7b415338789f085bfb72f";


input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        weather(input.value)
        input.value = "";
    }
})



display.addEventListener('click', () => {
    weather(input.value)
})

function weather(inputValue) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=50a7aa80fa492fa92e874d23ad061374')
        .then(response => response.json())
        .then(data => {
            var tempValue = Math.floor(data['main']['temp'] - 273);
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];

            var currentdate = new Date();

            var datetime = currentdate.getDate() + "-" +
                (currentdate.getMonth() + 1) + "-" +
                currentdate.getFullYear() + " |\n" + currentdate.toLocaleTimeString();
            console.log(tempValue);
            // --------------------------------------------------------------------------------------------------------------
            if (tempValue >= 30 && tempValue <= 35) {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
            } else if (tempValue < 12) {
                document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/1253681.jpg')";
            } else if (tempValue <= 20 && tempValue >= 12) {
                document.body.style.backgroundImage = "url('https://www.teahub.io/photos/full/37-374643_sky-with-little-clouds..jpg')";
            } else if (tempValue < 30 && tempValue > 20) {
                document.body.style.backgroundImage = "url('https://bloximages.chicago2.vip.townnews.com/fredericksburg.com/content/tncms/assets/v3/editorial/3/58/358193bd-3aac-564b-9aac-8f2e842a85a3/5c9a86dfa8b0d.image.jpg?resize=1200%2C801')"
            }
            // --------------------------------------------------------------------------------------------------------------

            click.addEventListener("click", () => {

                temp.innerHTML = tempValue * (9 / 5) + 32 + `\u00B0` + "F";
            })
            click.addEventListener("dblclick", () => {

                temp.innerHTML = tempValue + `\u00B0` + "c";
            })


            temp.innerHTML = tempValue + `\u00B0` + "c";
            city.innerHTML = nameValue.toUpperCase();
            weath.innerHTML = descValue.toUpperCase();
            date.innerHTML = datetime

            // console.log(Math.floor(tempValue - 273), nameValue, descValue);
        })
}

currentLoaction.addEventListener("click", () => handleOnload())


function getWeatherByGeoLoc(currLocation) {
    // console.log("pos", currLocation);
    var lat = currLocation && currLocation.coords && currLocation.coords.latitude;
    var lon = currLocation && currLocation.coords && currLocation.coords.longitude;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
    fetch(api)
        .then((res) => res.json())
        .then((result) => {
            // console.log("res", result);
            weatherDetails(result);
        });
}

function handleOnload() {
    navigator.geolocation.getCurrentPosition(getWeatherByGeoLoc, (err) => {
        // console.log("err", err)
    })

}


function weatherDetails(info) {
    // console.log("weather data", info)
    const city = info.name;
    const {
        description,
        id,
        main
    } = info && info.weather && Object.keys(info.weather).length > 0 && info.weather[0];
    const temp = info.main.temp;

    // console.log(city);
    weather(city)
}