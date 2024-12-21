let country = document.getElementById('country');
let searchbtn = document.getElementById('searchbtn');
let findSearch = document.getElementById('findsearch');
let firstdegree = document.getElementById('firstdegree');
let firststate = document.getElementById('firststate');
let month = document.querySelector('.month');
let nextday = document.getElementById('nextday');
let thirdday = document.getElementById('thirdday');
let imgicon = document.querySelectorAll('#imgicon');
var searchValue = '';


if (searchValue == "") {
    getWeather('cairo');
};

searchbtn.addEventListener('input', function () {

    searchValue = searchbtn.value;
    getWeather(searchValue);
    console.log(searchValue);
    

});


async function getWeather(searchValue) {
    let getData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=63ad7fc2abf548a38b7222014241612&q=${searchValue}&days=3`);
    
    if (getData.ok) {
        let data = await getData.json();

        // Display current weather
        country.innerHTML = data.location.name;
        firstdegree.innerHTML = data.current.temp_c;
        firststate.innerHTML = data.current.condition.text;
        imgicon[0].setAttribute('src', data.current.condition.icon)
        // Display the temperature for tomorrow
        let tempTomorrow = data.forecast.forecastday[1].day.avgtemp_c;
        nextday.innerHTML = tempTomorrow;
        let seconedday = document.getElementById('seconedday');
        seconedday.innerHTML = data.forecast.forecastday[1].day.condition.text
        imgicon[1].setAttribute('src', data.forecast.forecastday[1].day.condition.icon)
        document.getElementById('nextdayunder').innerHTML = data.forecast.forecastday[1].day.mintemp_c
        // Display the temperature for the third day
        let tempThirdDay = data.forecast.forecastday[2].day.avgtemp_c;
        thirdday.innerHTML = tempThirdDay;
        let thierdstatuse = document.getElementById('thierdstatuse');
        thierdstatuse.innerHTML = data.forecast.forecastday[2].day.condition.text
        imgicon[2].setAttribute('src', data.forecast.forecastday[2].day.condition.icon)
        document.getElementById('thirddayunder').innerHTML = data.forecast.forecastday[2].day.mintemp_c


    }
};

function getmyDate() {
    // Get Defult day and Month
    var dateTime = new Date();
    let monthname = dateTime.toLocaleDateString('en-US', { month: 'long' });
    var fullDayName = dateTime.toLocaleDateString('en-US', { weekday: 'long' });

    
    month.innerHTML = dateTime.getDate() +" "+ monthname;

    // get Tomorrow
    let tomorrow = new Date();
    tomorrow.setDate(dateTime.getDate() + 1);
    var fullDayNameTomorrow = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
    // get Next Tomorrow
    let nexttomorrow = new Date();
    nexttomorrow.setDate(dateTime.getDate() + 2);
    var fullDayNameNextTomorrow = nexttomorrow.toLocaleDateString('en-US', { weekday: 'long' });

    // Set Days in Html
    let days = document.querySelectorAll('.day');
    days[0].innerHTML = fullDayName;
    days[1].innerHTML = fullDayNameTomorrow;
    days[2].innerHTML = fullDayNameNextTomorrow;
}

getmyDate();