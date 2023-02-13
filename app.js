
// 1e553f83c258b4d84bd9cae841e97820

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

console.log("Helo ");
const weatherApi = {
    key: "1e553f83c258b4d84bd9cae841e97820",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"

}

const searchInputBox = document.getElementById('input-box');

// Event Listner function on key press
searchInputBox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }

});


// Get Weather Report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            // console.log(weather);
            return weather.json();
        }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    if(weather.cod==404){
        document.getElementsByClassName('weather-body')[0].style.display="none";
        alert('Wrong city name');
    }
else{
    document.querySelector('.weather-body').style.display="block";
    let city = document.getElementById('city');
    city.innerHTML = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerHTML = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url(img/clear.jpg)";
    }
    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url(img/cloud.jpg)";
    }
    else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url(img/rain.jpg)";
    }
    // else if(weatherType.textContent == 'Snow'){
    //     document.body.style.backgroundImage = "url(img/snow.jpg)";
    // }
    // else  if(weatherType.textContent == 'Haze'){
    //     document.body.style.backgroundImage = "url(img/haze.jpg)";
    //  }
    else if(weatherType.textContent == 'Thunderstrom'){
        document.body.style.backgroundImage = "url(img/thunderstrom.jpg)";
    }
    else if(weatherType.textContent == 'Sunny')
        document.body.style.backgroundImage = "url(img/sunny.jpg)";
}

}  


// Date manage

function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date =dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) ${year}`;
}