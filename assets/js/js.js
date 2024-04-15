// API key variable
let API_KEY = "806dce37489ecd138c1b2d8eaeaf0b9f";
// Keep track of cards listed
let dailyCont = document.getElementById("forecastCards");
// Get the buttons container
let cityButtons = document.querySelectorAll('.cityBtns');
let cityChoice = document.getElementById("cityInput").value;

// Loop through each button
for (const element of cityButtons) {
    // Add event listener to the current button
    element.addEventListener('click', function(event) {
        
        // Get the city name from the data attribute
        var cityName = this.getAttribute('data-city');
        
        // Update the value of the city input field
        cityInput.value = cityName;
    });
}

// Get city name function
document.getElementById("cityForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var cityName = document.getElementById("cityInput").value;
    if (!cityName) {
        event.preventDefault();
        alert("Please enter the name of a city.");
    }
    else {
        var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + API_KEY;

        fetch(requestUrl).then(function (response) {
            if (!response.ok) {
                alert("No information found for " + cityName);
            }
            return response.json();

        }).then(function (data) {
            // Test data retrieval
            //console.log(data);    
        })

        var geoStatsUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + API_KEY;

        fetch(geoStatsUrl).then(function (response) {

            if (!response.ok) {
                alert("No information found for " + cityName);
            }
            return response.json();
        }).then(function (data) {
            console.log(data[0]);
            //console.log("long: " + data[0].lon);
            //console.log("lat: " + data[0].lat);
            var long = data[0].lon;
            var lat = data[0].lat;


            var forcastUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + long + "&units=imperial" + "&appid=" + API_KEY;

            fetch(forcastUrl).then(function (response) {
                if (!response.ok) {
                    alert("No Forecast information found for " + cityName);
                }
                return response.json();
            }).then(function(data) {
                updateUVIndex(data.current.uvi)
                console.log(data)
                // Takes the first node of json data
                
                var unix_timeStamp = new Date(data.current.dt * 1000);
                console.log(unix_timeStamp)
                var day = unix_timeStamp.getDate();
                var month = unix_timeStamp.getMonth()+1;
                var year = unix_timeStamp.getFullYear();
                var currentDay = month + "/" + day + "/" + year;
                var iconUrlCurrent = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
                var cityImg = $("#cityNameImg");
                cityImg.attr("src", iconUrlCurrent);
                cityImg.attr("alt", "Weather Icon");
                //var icon = $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Icon depicting current weather.'>");

                document.getElementById("cityName").innerText = cityName + " " + currentDay + " ";
                document.getElementById("temperature").innerText ="Temperature: " +data.current.temp + "°F";
                document.getElementById("humidity").innerText ="Humidity: "+ data.current.humidity + "%";
                document.getElementById("windSpeed").innerText ="Wind Speed: " + data.current.wind_speed + " MPH";
                document.getElementById("uvIndex").innerText ="UV Index: " + data.current.uvi;
                
                console.log(data[0]);
                
                for (var i = 0; i <= 5; i++) {
                    //var weatherCard = data.daily[i];
                    var card = $("<div>");
                    card.addClass("weatherCard");

                    var daily_timeStamp = new Date(data.daily[i].dt * 1000);

                    console.log(data.list)
                    var day = daily_timeStamp.getDate()+1;
                    var month = daily_timeStamp.getMonth()+1;
                    var year = daily_timeStamp.getFullYear();
                    var dailyDay = month + "/" + day + "/" + year;

                    var cardTitle = $("<h5>");
                    cardTitle.addClass("cardTitle").text(dailyDay);
                    var iconFC = $("<div>");
                    var imgTag = $("<img>");

                    iconFC.append(imgTag);
                    imgTag.attr("id", "wicon" + i);

                    imgTag.attr("alt", "Weather icon");
                    var iconPullData = data.daily[0].weather[0].icon;
                    var iconUrl = "https://openweathermap.org/img/w/" + iconPullData + ".png";
                    console.log("Weather data:", iconPullData);

                    console.log(iconUrl);
                    imgTag.attr("src", iconUrl);

                    var temp = $("<h6>");
                    temp.text("Temp: " + data.daily[i].temp.day + " °F");
                    var humidity = $("<h6>");
                    humidity.text("Humidity: " + data.daily[i].humidity + "%");
                    card.append(cardTitle);
                    card.append(iconFC);
                    card.append(temp);
                    card.append(humidity);

                    card.appendTo(dailyCont);
                }
            })

        })
        // Get the UV index element
        var uvIndexElement = document.getElementById('uvIndex');

        // Function to update UV index
        function updateUVIndex(value) {
        // Set the text content of the UV index element
        uvIndexElement.textContent = value;

            // Check if value is not empty, then apply background color
            if (value.toString().trim() !== '') {
                uvIndexElement.style.backgroundColor = 'rgb(255, 35, 35)';
            } else {
                uvIndexElement.style.backgroundColor = ''; // Reset to default background color
            }
        }
    }
})
