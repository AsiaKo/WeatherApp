
var APPID = "835e62fd10b56c34ecdf4d75e049381b";
var temp;
var loc;
var humidity;
var wind;
var direction;
var temp_min;
var temp_max;
var description;
var unit = "°C";
var unitDescription;
var icon;

function update(weather) {
  icon.src= "https://github.com/AsiaKo/WeatherApp/blob/master/img/icon/" + weather.icon + ".png?raw=true";
  var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png?raw=true";
  humidity.innerHTML = weather.humidity + "%";
  wind.innerHTML = weather.wind + " mph" + " " + weather.direction;
  direction.innerHTML = weather.direction;
  loc.innerHTML = weather.location;
  temp.innerHTML = weather.temp  + "&deg;";
  temp_min.innerHTML = weather.temp_min + "&deg;";
  temp_max.innerHTML = weather.temp_max + "&deg;";
  description.innerHTML = weather.description;
}

window.onload = function () { 
  temp = document.getElementById("temperature");
  temp_min = document.getElementById("temp_min");
  temp_max = document.getElementById("temp_max");
  loc = document.getElementById("location");
  icon = document.getElementById("icon-weather");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementsByClassName("direction");
  description = document.getElementById("description");
  units = document.getElementById("unit");
  city = document.getElementById("city");	

  if(navigator.geolocation){
  var showPosition = function(position){
  updateByGeo(position.coords.latitude, position.coords.longitude);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
  } else {
  alert("Could not identify your location");	
  }

  function updateByGeo(lat, lon){
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
  "lat=" + lat +
  "&lon=" + lon +
  "&APPID=" + APPID;
  sendRequest(url);    
}

function sendRequest(url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var data = JSON.parse(xmlhttp.responseText);
    var weather = {};
    weather.name = data.id;
    weather.icon = data.weather[0].icon;
    weather.description = data.weather[0].description;
    weather.humidity = data.main.humidity;
    weather.wind = data.wind.speed;
    weather.direction = degreesToDirection(data.wind.deg)
    weather.location = data.name;
    weather.temp = K2F(data.main.temp);	
    weather.temp_max = K2F(data.main.temp_max);
    weather.temp_min = K2F(data.main.temp_min);	
    weather.units = K2C(data.main.temp);

  console.log(weather.icon);
  update(weather);
}

  // Fahrenheit to Celsius 
  unitDescription = document.getElementById('cel-fah');
  units.onclick = changeUnits;

  function changeUnits() {
    if (units.innerHTML === "°C"  ) {
      temp.innerHTML = K2C(data.main.temp) + "&deg;";
      temp_min.innerHTML = K2C(data.main.temp_min) + "&deg;";
      temp_max.innerHTML = K2C(data.main.temp_max) + "&deg;";
      wind.innerHTML = Math.round(data.wind.speed * 1.609344) + " kmh " + weather.direction;
      units.innerHTML = "°F";
      unitDescription.innerHTML = "fahrenheit"; } 
    else { 
      units.innerHTML === "°F"
      temp.innerHTML = K2F(data.main.temp) + "&deg;";
      temp_min.innerHTML = K2F(data.main.temp_min) + "&deg;";	
      temp_max.innerHTML = K2F(data.main.temp_max) + "&deg;";
      wind.innerHTML = data.wind.speed + " mph " + weather.direction;
      units.innerHTML = "°C";
      unitDescription.innerHTML = "celsius";
    }
  }

  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();    
}

// Wind direction symbol
  function degreesToDirection(degrees){
    var range = 360/8; // 8 types of direction 
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    for( i in angles ) {
      if(degrees >= low && degrees < high){
      return angles[i];  
      }
    low = (low + range) % 360;
    high = (high + range) % 360;
    }
  return "N";  
  }

  // Kelvin to Fahrenheit
  function K2F(k){
    return Math.round(k*(9/5)-459.67);
  }

  // Kelvin to Celsius
  function K2C(k){
    return Math.round(k - 273.15); 
  }

  // Current Date 
  var d = new Date();
  var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  document.getElementById("date").innerHTML = dayName[d.getDay()] + ", " + month[d.getMonth()] + " " + d.getDate();

} 





