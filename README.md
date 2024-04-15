# Weather Forcaster

## Table of Contents

- [Preview](#preview)
- [Link](#link)
- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Methodologies](#methodologies)
- [Testing](#testing)
- [Requirements](#requirements)
- [Creator](#creator)

## Preview

<img width="500" alt="Tag" src="https://github.com/NateJonesIII/City-Forecast/blob/main/assets/img/miami.PNG">

## Link

[ClickHere!](https://natejonesiii.github.io/City-Forecast/)

## Project Description

The Weather Dashboard is a web application that allows users to search for weather forecasts of various cities. It provides real-time weather data along with an extended-day forecast. Users can either search for a city using the search bar or click on predefined city buttons to get the weather information.

## Technologies Used

- HTML
- CSS
- Bootstrap
- JavaScript (including jQuery)
- Fetch API
- OpenWeatherMap API
- Moment.js

## Methodologies

- **For Loops:** Used to iterate over arrays, such as the collection of city buttons and daily weather data.
- **Fetch Calls:** Utilized to fetch weather data from the OpenWeatherMap API.
- **Working with APIs:** Made API calls to fetch real-time weather data and extended-day forecast data.
- **Event Listeners:** Added event listeners to city buttons and the search form to trigger actions like fetching weather data.
- **Responsive Design:** Used media queries to adjust the layout and styling for different screen sizes, ensuring the dashboard is responsive and mobile-friendly.
- **DOM Manipulation:** Dynamically updated the DOM elements with fetched weather data to display the weather information.
- **Error Handling:** Implemented error handling to display alerts in case of invalid input or unsuccessful API calls.

## Testing

Testing for this project would involve:

1. Verifying that the weather data displayed is accurate and up-to-date.
2. Testing the responsiveness of the dashboard across various devices and screen sizes.
3. Checking for any errors or alerts displayed during user interactions, such as searching for a city or clicking on city buttons.
4. Testing the functionality of the scrollbar under the weather cards to ensure it works correctly when there is overflow content.

<img width="500" alt="Tag" src="https://github.com/NateJonesIII/City-Forecast/blob/main/assets/img/postman_testing.PNG">

## Requirements

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Creator

- [Profile](https://github.com/NateJonesIII/ "Nathaniel Jones") - [LinkedIn](https://www.linkedin.com/in/nathaniel-jones/) - [Email](mailto:15nate.jones@gmail.com?subject=Hello "Hello Nate!")
