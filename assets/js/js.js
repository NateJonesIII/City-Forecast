var API_KEY = "f69d7e27d4d508660302b27a21ac471b";
var dailyCont = document.getElementById("forecastCards");

document.getElementById("cityForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var cityName = document.getElementById("cityInput").value;
    if (!cityName) {
        alert("Please enter the name of a city.");
    }
    else {
        //document.getElementById("cityName").innerText = cityName;

        var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + API_KEY;

        fetch(requestUrl).then(function (response) {
            if (!response.ok) {
                alert("No information found for " + cityName);
            }
            return response.json();

        }).then(function (data) {
            //console.log(data);
        })

        var geoStatsUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + API_KEY;

        fetch(geoStatsUrl).then(function (response) {

            if (!response.ok) {
                alert("No information found for " + cityName);
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            console.log("long: " + data[0].lon);
            console.log("lat: " + data[0].lat);

            var long = data[0].lon;
            var lat = data[0].lat;

            var forcastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial" + "&appid=" + API_KEY;

            fetch(forcastUrl).then(function (response) {
                if (!response.ok) {
                    alert("No Forecast information found for " + cityName);
                }
                return response.json();
            }).then(function (data) {
                var unix_timeStamp = new Date(data.current.dt * 1000);
                var day = unix_timeStamp.getDay();
                var month = unix_timeStamp.getMonth();
                var year = unix_timeStamp.getFullYear();
                var currentDay = month + "/" + day + "/" + year;
                var iconUrlCurrent = "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
                var cityImg = $("#cityNameImg");
                cityImg.attr("src", iconUrlCurrent);
                cityImg.attr("alt", "Weather Icon");
                //var icon = $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Icon depicting current weather.'>");

                document.getElementById("cityName").innerText = cityName + " " + currentDay + " ";
                document.getElementById("temperature").innerText = data.current.temp + "°F";
                document.getElementById("humidity").innerText = data.current.humidity + "%";
                document.getElementById("windSpeed").innerText = data.current.wind_speed + " MPH";
                document.getElementById("uvIndex").innerText = data.current.uvi;

                console.log(data);
                //console.log(data.daily);
                //use moment capital X to convert dt unix value

                for (var i = 0; i < 5; i++) {
                    //var weatherCard = data.daily[i];
                    var card = $("<div>");
                    card.addClass("weatherCard");

                    var daily_timeStamp = new Date(data.daily[i].dt * 1000);
                    var day = daily_timeStamp.getDay();
                    var month = daily_timeStamp.getMonth();
                    var year = daily_timeStamp.getFullYear();
                    var dailyDay = month + "/" + day + "/" + year;

                    var cardTitle = $("<h5>");
                    cardTitle.addClass("cardTitle");
                    cardTitle.text(dailyDay);
                    var icon = $("<div>");
                    var imgTag = $("<img>")

                    icon.append(imgTag);
                    imgTag.attr("id", "wicon" + i);

                    imgTag.attr("alt", "Weather icon");

                    var iconUrl = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
                    imgTag.attr("src", iconUrl);


                    var temp = $("<h6>");
                    temp.text("Temp: " + data.daily[i].temp.day + " °F");
                    var humidity = $("<h6>");
                    humidity.text("Humidity: " + data.daily[i].humidity + "%");
                    card.append(cardTitle);
                    card.append(icon);
                    card.append(temp);
                    card.append(humidity);

                    card.appendTo(dailyCont);
                }
            })


        })


    }

})
