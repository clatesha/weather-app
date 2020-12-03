const api = {
    key: "5064a34b38542e28c3222209c347b0a6",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(result) {
    if (result.keyCode == 13) {
        if (isNaN(searchbox.value)) {
            const encoded = encodeURI(searchbox.value);
            getResults(encoded);
        }
        else
            getResultsZip(searchbox.value);
    }
}

/////////////////////////////////
searchbox.addEventListener('keypress', localstorage);

function localstorage(result) {
    if (result.keyCode == 13) {
        const encoded = encodeURI(searchbox.value);
        localStorage.setItem('city', encoded);
    }
}

//on page load, if there is local storage getItem and fetch weather
window.addEventListener('load', checkStorage);

function checkStorage() {
    if (localStorage.getItem('city')) {
        let mycity = localStorage.getItem('city');
        if (isNaN(mycity)) {
            getResults(mycity);
        }
        else { getResultsZip(mycity); }

    }
}


async function getResults(query) {
    const response = await fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`);
    const rtnData = await response.json();
    console.log(rtnData);
    displayResults(rtnData);

    /*
    let lat = rtnData.coord.lat;
    let lon = rtnData.coord.lon;
    //console.log(lat);
    //console.log(lon);

    const fiveday = await fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&units=imperial&APPID=${api.key}`);
    const rtnFiveDay = await fiveday.json();
    console.log(rtnFiveDay);
*/
}

async function getResultsZip(zip) {
    const response = await fetch(`${api.base}weather?zip=${zip},us&units=imperial&APPID=${api.key}`);
    const rtnData = await response.json();
    console.log(rtnData);
    displayResults(rtnData);

    /*
    let lat = rtnData.coord.lat;
    let lon = rtnData.coord.lon;

    const fiveday = await fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&units=imperial&APPID=${api.key}`);
    const rtnFiveDay = await fiveday.json();
    console.log(rtnFiveDay);
    */
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();

    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);


    /*
    let dateObj = new Date(weather.dt * 1000);

    let time = document.querySelector('.location . time');
    time.innerText = dateObj;
    

    ///Display current time in selected city
    let timezone = Math.abs(weather.timezone / 3600);
    let time = document.querySelector('.location .time');
    //console.log(timezone);

    let hours = now.getUTCHours() + timezone;
    console.log(hours);
    let amPM = "PM";
    if (hours >= 13) {
        hours = hours - 12;
        amPM = "PM";
    }
    else { amPM = "AM"; }

    let min = now.getUTCMinutes();
    let minconvert;
    if (min < 10) {
        minconvert = `0${min}`;
    }
    else {
        minconvert = min;
    }
    time.innerText = `${hours}:${minconvert} ${amPM}`;

    ////////////////
    */

    let weather_el = document.querySelector('.today .weather');
    weather_el.innerText = weather.weather[0].main;


    let icon = document.getElementById("icon").src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    let temp = document.querySelector('.today .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;


    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    /*
    let hours = d.getUTCHours() - timezone;
    let amPM = "PM";
    if (hours >= 13) {
        hours = hours - 12;
        amPM = "PM";
    }
    else { amPM = "AM"; }
    let min = d.getUTCMinutes();
*/

    return `${day} - ${month} ${date}, ${year}`;
}