let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('searchBtn');
let historyUl = document.getElementById('history-list');
let forecastDiv = document.getElementById('forecast');
let searchHistory = document.getElementById('search-history');
let currentForecast = document.getElementById('current-forecast');
let key = '567de4c5feb717e35af6cd339ab5f2d9';
let lat = null;
let lon = null;

searchBtn.addEventListener('click', function() {
    getCityLocation(searchBar.value);
    getCurrentWeather(searchBar.value);
    saveSearch(searchBar.value);
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

                    let icon = dailyData.weather[0].icon
                    
                    let dailyHtml = `
                <div class="card-body">
                  <h5 class="card-title">${dailyData.weather[0].main}<span><img src="assets/icons/${icon}.png" style="width: 25px; margin-left: 8px; margin-bottom: 8px"></span></h5>
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

            let icon = current.list[0].weather[0].icon;
            let main = current.list[0].weather[0].main;
            let description = current.list[0].weather[0].description;

            let newDiv = document.createElement('div');
            newDiv.classList.add('card');

            let currentHtml = `
            <div class="card-body">
                <h2>${current.city.name}</h2>
                <h5 class="card-title">${main}<span><img src="assets/icons/${icon}.png" style="width: 25px; margin-left: 8px; margin-bottom: 8px"></span></h5>
                  <h6>${description}</h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Temp: ${currentTemp} degrees</li>
                <li class="list-group-item">Humidity: ${currentHumid}%</li>
                <li class="list-group-item">Wind: ${currentWind} mph</li>
            </ul>
            `
            newDiv.innerHTML = currentHtml;
            currentForecast.appendChild(newDiv);
        })
};

// take coordinates, output weather
function getWeather(lat, lon) {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=imperial')
};
function findCurrentWeather(lat, lon) {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=imperial')
};

function saveSearch(city){
    let citySearch = JSON.parse(localStorage.getItem('cities'))
    if (!citySearch){
        citySearch = []
    }
    citySearch.push(city)
    localStorage.setItem('cities', JSON.stringify(citySearch));
    showHistory();
};

function showHistory(){
    let citySearch = JSON.parse(localStorage.getItem('cities'))
    if (citySearch != null){
        citySearch = citySearch.reverse()
        if (citySearch.length > 5){
            citySearch = citySearch.slice(0,5)
        }
        let printSearch = '';
        citySearch.forEach(function (city){
            printSearch += `<li><button class="historyBtn" onclick="resetWeather('${city}')">${city}</button></li>`
        })
        searchHistory.classList.remove('hide');
        historyUl.innerHTML = printSearch;
    }
};

function resetWeather(e){
    searchBar.value = e;
    getCityLocation(searchBar.value);
    getCurrentWeather(searchBar.value);
};

showHistory();