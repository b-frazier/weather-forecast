let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('searchBtn');
let historyUl = document.getElementById('history-list');
let forecast = document.getElementById('forecast');
let searchHistory = document.getElementById('search-history');
let key = '567de4c5feb717e35af6cd339ab5f2d9';
let lat = null;
let lon = null;


searchBtn.addEventListener('click', function(){
    getCityLocation(searchBar.value);
});

// converts city name to coordinates
function getCityLocation(city){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=2&appid='+ key)
    .then(response => response.json())
    .then(data => {
        let lat = data[0].lat;
        let lon = data[0].lon;
        return getWeather(lat, lon);
    }) 
    .then(response => response.json())
    .then(forecast => {
        console.log(forecast)
    })
    .catch(err => console.error());
};

// take coordinates, output weather
function getWeather(lat, lon){
   return fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=imperial')
};

function findTemp(data){
    for (let i = 0; i < data.length; i+= 8){
        forecast.textContent = data[i].list[0].main.temp;
    }
}



/* function weatherData(data){
    for (let i = 0; i < data.length; i++){
        forecast.textContent = JSON.stringify(data[i], null, 2)
    }
};
*/