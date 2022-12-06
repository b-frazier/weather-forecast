let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('searchBtn');
let historyUl = document.getElementById('history-list');
let forecast = document.getElementById('forecast');
let searchHistory = document.getElementById('search-history');



/* searchBtn.addEventListener('click', function(){
    
});
*/

let key = '567de4c5feb717e35af6cd339ab5f2d9';
let city = 'columbus';

function cityLocation(){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=2&appid='+ key)
    .then(response => response.json())
    .then (function(data){
        let lat = data[0].lat;
        let lon = data[0].lon;
        let cityName = data[0].name;
        getWeather(lat, lon, cityName);
    })
};
function getWeather(lat, lon, cityName){
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

cityLocation();



/* function weatherData(data){
    for (let i = 0; i < data.length; i++){
        forecast.textContent = JSON.stringify(data[i], null, 2)
    }
};
*/