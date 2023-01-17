var searchBtn = document.querySelector('#searchBtn');
var recentSearches = [];

searchBtn.addEventListener('click', citySearch);

function citySearch() {
    var searchTxt = document.querySelector('#searchText').value;
    handleRecentSearch(searchTxt);

    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=f04a58c9a2e1f1ef45516c6f6b1c8eb6&units=imperial&q=" + searchTxt;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            //use weather code to pull image from api
            var iconCode = data.list[0].weather[0].icon;
            var wImage = document.createElement('img');
            wImage.src = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            
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

            //for loop to get the next 5 day forecast
            var fiveDaySec = document.querySelector('#fiveDay');
            fiveDaySec.replaceChildren(); //clears the divs that were created dynamically

            for(var i = 1; i < data.list.length; i++){
                if(data.list[i].dt_txt.includes('15:00:00')){
                    var fiveDayDiv = document.createElement('div');
                    var fdDate = document.createElement('h3');

                    //creates the divs dynamically 
                    fiveDaySec.appendChild(fiveDayDiv);
                    fiveDayDiv.style.backgroundColor = 'gray';
                    fiveDayDiv.appendChild(fdDate);
                    fiveDayDiv.style.display = 'inline-block';
                    fiveDayDiv.style.maxWidth = '15%';
                    fiveDayDiv.style.marginRight = '25px';

                    //for each day get the corresponding date
                    day = data.list[i].dt_txt.split(' ');
                    fdDate.textContent = day[0]; //gets the first half of the date
                    fdDate.style.color = 'white';

                    //creates img element and finds the corresponding image via the code from data using the url as a src
                    iconCode = data.list[i].weather[0].icon;
                    var wImage = document.createElement('img');
                    wImage.src = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

                    fdDate.appendChild(wImage); //appends image to date

                    //create and append temp values
                    var tempH4 = document.createElement('h4');
                    fiveDayDiv.appendChild(tempH4);
                    tempH4.textContent = "Temp: " + data.list[i].main.temp + "\u00B0F";
                    tempH4.style.color = "white";


                    //create and append wind values
                    var windH4 = document.createElement('h4');
                    fiveDayDiv.appendChild(windH4);
                    windH4.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                    windH4.style.color = "white";

                    //create and append humidity values
                    var humH4 = document.createElement('h4');
                    fiveDayDiv.appendChild(humH4);
                    humH4.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                    humH4.style.color = "white";

                }
            }    
    })
}

function handleRecentSearch(search) {
    recentSearches = localStorage.getItem('searches');
    console.log(recentSearches);
    
    //creates btn for each search
    var recent = document.querySelector('#recentSearch');
    var recentBtn = document.createElement('button');

    //places btn element on screen for previous searches
    recent.appendChild(recentBtn);
    recentBtn.textContent = search;
    recentBtn.style.width = '100%';
    recentBtn.style.margin = '5px';
    
    //resets input to previously searched result
    recentBtn.addEventListener('click', function(){    
    document.querySelector('#searchText').value = search;
    });
}
