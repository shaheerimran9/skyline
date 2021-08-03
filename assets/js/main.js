const city = document.querySelector('#city');
const country = document.querySelector('#country');
const form = document.querySelector('#form');
const searchbox = document.querySelector('#searchbox');
const currentTemperature = document.querySelector('#current-temperature');
const currentTime = document.querySelector('#current-time');
const currentDate = document.querySelector('#current-date');

const setTimeDate = (timezone) => {
    const timezoneInMins = timezone / 60;
    const timeDateObj = {
        time: moment().utcOffset(timezoneInMins).format("h:mm A"),
        date: moment().utcOffset(timezoneInMins).format("dddd MMMM Do")
    }
    return timeDateObj;
}

const fetchWeather = async (query) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=5414838647c954a8d21bc5e0a83a6c2e&units=imperial&cnt=12`);
        return response.json();
    } catch(err) {
        console.log(err);
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = searchbox.value.trim();

    fetchWeather(searchQuery)
    .then(weatherData => {
        if (weatherData.cod !== "404") {
            city.textContent = weatherData.city.name;
            country.textContent = weatherData.city.country;
            currentTemperature.textContent = `${weatherData.list[0].main.temp.toFixed(0)}°`;
            currentTime.textContent = `${setTimeDate(weatherData.city.timezone).time}`;
            currentDate.textContent = `${setTimeDate(weatherData.city.timezone).date}`;

        } else {
            alert("Please enter a valid city.");
        }
    })
    searchbox.value = "";
});