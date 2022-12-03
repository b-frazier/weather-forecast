let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('searchBtn');
let historyUl = document.getElementById('history-list');
let forecast = document.getElementById('forecast');
let searchHistory = document.getElementById('search-history');



searchBtn.addEventListener('click', function(){
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





