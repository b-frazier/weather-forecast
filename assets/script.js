let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('searchBtn');
let historyUl = document.getElementById('history-list');
let forecast = document.getElementById('forecast');
let searchHistory = document.getElementById('search-history');



/* searchBtn.addEventListener('click', function(){
    let city = searchBar.value;
    console.log(city);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd7c6b4bfefmsh543bab1a89406f9p15f96bjsn733aef5dbccc',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };
    
    function getWeather(){
        fetch('https://open-weather13.p.rapidapi.com/city/'+city, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    };

    getWeather();
});
*/

// let lat = '39.201439';
// let lon = '-85.921379';
let key = '567de4c5feb717e35af6cd339ab5f2d9';
let city = 'columbus';

function cityLocation(){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=2&appid='+ key)
    .then(response => response.json())
    .then (data => console.log(data))
    // .then(response => response.json())
    // .then(function(data){
    //     let lat = data[0].lat;
    //     let lon = data[0].lon;
    //     let cityName = data[0].name;
    // })
    // .catch(console.error());
};
cityLocation();


/* function callApi(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key)
    // fetch('http://api.openweathermap.org/data/2.5/forecast?lat=39.201439&lon=-85.921379&appid=567de4c5feb717e35af6cd339ab5f2d9')
    .then(response => response.json())
    .then(weatherData)
    .catch(console.error());
};
function weatherData(data){
    for (let i = 0; i < data.length; i++){
        forecast.textContent = JSON.stringify(data[i], null, 2)
    }
};

callApi();
*/