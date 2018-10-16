// var url = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b1b5d900f010b71ca16655a75e0d5912"

const myLocation = document.getElementById('location')
const myDegrees = document.getElementById('degrees')
const myDescription = document.getElementById('description')
const mySunrise = document.getElementById('sunrise')
const mySunset = document.getElementById('sunset')
const myPage = document.getElementsByTagName('body')[0]
const myBackgroundUrl = document.getElementById('outerContainer').style.backgroundImage
let firstLoad = true;

//Adds zero before single digit time units
const checkIfTimeOnlyOneDigit = (timeUnit) => {
  if (timeUnit < 10) {
    return "0" + timeUnit
  } else {
    return timeUnit
  }
}

//MY CHECK WEATHER FUNCTION
const getWeather = (chosenCity) => {

  var url = chosenCity

  var req = new Request(url)
  fetch(req)
      .then(function(response) {
          return response.json()
      }).then(function(result){
          console.log(result)

          //Get time for sunset and sunrise, convert to proper date format and add 0 before single digits
          let sunriseTime = new Date (result.sys.sunrise * 1000)
          let sunriseHours = checkIfTimeOnlyOneDigit(sunriseTime.getHours())
          let sunriseMinutes = checkIfTimeOnlyOneDigit(sunriseTime.getMinutes())

          let sunsetTime = new Date (result.sys.sunset * 1000)
          let sunsetHours = checkIfTimeOnlyOneDigit(sunsetTime.getHours())
          let sunsetMinutes = checkIfTimeOnlyOneDigit(sunsetTime.getMinutes())

          myLocation.innerHTML = `${result.name.toUpperCase()}, ${result.sys.country}`
          myDegrees.innerHTML = `${result.main.temp.toFixed(1)} °C`
          myDescription.innerHTML = `${result.weather[0].description}`
          mySunrise.innerHTML = `<i class="fas fa-sun"></i><br>${sunriseHours}:${sunriseMinutes} CET`
          mySunset.innerHTML = `<i class="fas fa-moon"></i><br>${sunsetHours}:${sunsetMinutes} CET`

          // Change background color depending on degrees
          if (result.main.temp <= 0) {
            myPage.style.background = "#08FEFA" //iceblue
          } else if (result.main.temp > 0 && result.main.temp < 12){
            myPage.style.background = "#33BEFF" //lightblue
          } else if (result.main.temp >= 12 && result.main.temp < 20){
            myPage.style.background = "#F9FF33" //yellow
          } else if (result.main.temp >= 20 && result.main.temp < 30){
            myPage.style.background = "#FE9908" //orange
          } else {
            myPage.style.background = "#FF5733" //red
          }
  })

//Gets new weather when user selects new city
}
const selectChange = (e) => {
  const chosenCityString = e.target.value
  getWeather(chosenCityString)
}

document.getElementById('citySelector').addEventListener('change', selectChange)

//Gets weather on first load
if (firstLoad) {
  firstLoad = false
  getWeather(document.getElementById('citySelector').value)
}
