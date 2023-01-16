var searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', citySearch);

function citySearch() {
    var searchTxt = document.querySelector('#searchText').value;

    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?appid=f04a58c9a2e1f1ef45516c6f6b1c8eb6&units=imperial&q=" + searchTxt;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            //use weather code to pull image from api
            var iconCode = data.list[0].weather[0].icon;
            var wImage = document.createElement('img');
            wImage.src = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            
            //displays the current city name and date + weather icon
            var cityName = document.querySelector('#currentCityName');
            var day = data.list[0].dt_txt.split(' ');
            cityName.textContent = data.city.name + ' ' + day[0];
            cityName.appendChild(wImage);

            //gets current temp and displays it only in farenheit
            var currentTemp = document.querySelector('#currentCityTemp');
            currentTemp.textContent = "Temp: " + data.list[0].main.temp + "\u00B0F";

            //gets current wind speed
            var currentWind = document.querySelector('#currentCityWind');
            currentWind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";

            //current humidity percentage
            var currentHum = document.querySelector('#currentCityHum');
            currentHum.textContent = "Humidity: " + data.list[0].main.humidity + " %";



        
    })


}

/*function citySearch() {
    var searchTxt = document.querySelector('#searchText').value;
    //console.log(searchTxt);
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?&appid=f04a58c9a2e1f1ef45516c6f6b1c8eb6&q=" + searchTxt;
    
    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;

            getCityWeather(cityLat,cityLon);
    })
}

function getCityWeather(lat, lon) {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +"&appid=f04a58c9a2e1f1ef45516c6f6b1c8eb6"

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    })



}*/