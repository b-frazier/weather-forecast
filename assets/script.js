let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('searchBtn');
let historyUl = document.getElementById('history-list');
let forecastDiv = document.getElementById('forecast');
let searchHistory = document.getElementById('search-history');
let currentForecast = document.getElementById('current-forecast');
let key = '567de4c5feb717e35af6cd339ab5f2d9';
let lat = null;
let lon = null;
/* 
let hour = dayjs().hour();
let newHour = hour + ':00:00';
console.log(newHour)
*/

// searchBar.value

searchBtn.addEventListener('click', function() {
    getCityLocation('columbus');
    getCurrentWeather('columbus');
});



// converts city name to coordinates then gets weather data
function getCityLocation(city) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=2&appid=' + key)
        .then(response => response.json())
        .then(data => {
            let lat = data[0].lat;
            let lon = data[0].lon;
            return getWeather(lat, lon);
        })
        .then(response => response.json())
        .then(forecast => {
            console.log(forecast)
// forecast names the output, then we use forecast to access the data
            for (let i = 0; i < forecast.list.length; i++) {
                if (forecast.list[i].dt_txt.includes('12:00:00')) {
                    let dailyData = forecast.list[i];
                    console.log(dailyData);

                    let divContainer = document.createElement('div');
                    divContainer.classList.add('card');
                    divContainer.style.width = '18rem';

                    // let nameh4 = document.createElement('h4')
                    // let tempP = document.createElement('p')
                    // let humidP = document.createElement('p')

                    // nameh4.textContent = forecast.city.name;
                    // tempP.textContent = "Temp: " + dailyData.main.temp
                    // humidP.textContent = dailyData.main.humidity

                    // divContainer.appendChild(nameh4)
                    // divContainer.appendChild(tempP)
                    // divContainer.appendChild(humidP)
                    
                    let dailyHtml = `
                <div class="card-body">
                  <h5 class="card-title">${dailyData.weather[0].main} <span></span></h5>
                  <h6>${dailyData.weather[0].description}</h6>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Temp: ${dailyData.main.temp} degrees</li>
                  <li class="list-group-item">Humidity: ${dailyData.main.humidity}%</li>
                  <li class="list-group-item">Wind: ${dailyData.wind.speed} mph</li>
                </ul>
                `
                    divContainer.innerHTML = dailyHtml;
                    forecastDiv.appendChild(divContainer);
                }
            }
        })
        .catch(err => console.error());
};


function getCurrentWeather(city){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=2&appid=' + key)
        .then(response => response.json())
        .then(data => {
            let lat = data[0].lat;
            let lon = data[0].lon;
            return findCurrentWeather(lat, lon);
        })
        .then(response => response.json())
        .then(current => {
            console.log(current)
            let currentTemp = current.list[0].main.temp;
            let currentHumid = current.list[0].main.humidity;
            let currentWind = current.list[0].wind.speed;
            console.log(currentTemp)
            console.log(currentHumid)
            console.log(currentWind)
           /* for (let i = 0; i < current.list.length; i++){
                let todayWeather = current.list[0];
                console.log(todayWeather)
                if (todayWeather){
                    let newDiv = document.createElement('div');
                    newDiv.classList.add('card');

                    let currentHtml = `
                    <div class="card-body">
                        <h2>${current.city.name}</h2>
                        <p>Sunrise: ${current.city.sunrise}</p>
                        <p>Sunset: ${current.city.sunset}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Temp: ${todayWeather.main.temp} degrees</li>
                        <li class="list-group-item">Humidity: ${todayWeather.main.humiidty}%</li>
                        <li class="list-group-item">Wind: ${todayWeather.wind.speed} mph</li>
                    </ul>
                    `
                    newDiv.innerHTML = currentHtml;
                    currentForecast.appendChild(newDiv);
                    
                }
            } */
        })
};


// take coordinates, output weather
function getWeather(lat, lon) {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=imperial')
};
function findCurrentWeather(lat, lon) {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=imperial')
};



/* function weatherData(data){
    for (let i = 0; i < data.length; i++){
        forecast.textContent = JSON.stringify(data[i], null, 2)
    }
};
*/