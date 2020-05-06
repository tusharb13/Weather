import * as actionTypes from "./actionTypes";
import axios from "axios";
const Api_Key = "dbb6c21c9ec348c76563669d50f057a4";
const weatherIcon = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog",
};
let icon = null;
export const fetchWeatherSuccess = (response) => {

  getWeatherIcon(weatherIcon, response.list[0].weather[0].id);
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    response: response,
    icon: icon,
  };
};

export const getWeatherIcon = (icons, rangeId) => {
  switch (true) {
    case rangeId >= 200 && rangeId < 232:
      icon = icons.Thunderstorm;
      break;
    case rangeId >= 300 && rangeId <= 321:
      icon = icons.Drizzle;
      break;
    case rangeId >= 500 && rangeId <= 521:
      icon = icons.Rain;
      break;
    case rangeId >= 600 && rangeId <= 622:
      icon = icons.Snow;
      break;
    case rangeId >= 701 && rangeId <= 781:
      icon = icons.Atmosphere;
      break;
    case rangeId === 800:
      icon = icons.Clear;
      break;
    case rangeId >= 801 && rangeId <= 804:
      icon = icons.Clouds;
      break;
    default:
      icon = icons.Clouds;
  }
};

export const fetchWeatherFailure = (err) => {

 
  return {
    type: actionTypes.FETCH_WEATHER_FAILURE,
  };
};

export const fetchWeatherStart =() => {
    return {
        type: actionTypes.FETCH_WEATHER_START,
      };
}

export const setDailyWeatherFromWeek =(ctrl, cityName,maxTemp,minTemp,selectedButton) => {
  
  getWeatherIcon(weatherIcon, ctrl.weather[0].id);
  return {
    type: actionTypes.SET_DAILY_WEATHER,
    response: ctrl,
    icon: icon,
    cityName : cityName,
    maxTemp : maxTemp,
    minTemp : minTemp,
    selectedButton : selectedButton
  };

}

export const fetchWeatherData = (city) => {
  return (dispatch) => {
    if (city) {
        dispatch(fetchWeatherStart())
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Api_Key}`
        )
        .then((response) =>{
        
        return response.data})
        .then((response) => {
          
        
          dispatch(fetchWeatherSuccess(response));
        })
        .catch((err) => dispatch(fetchWeatherFailure(err)));
    } else {
      dispatch(fetchWeatherFailure());
    }
  };

  
};

export const setCity =(city) => {
  return (dispatch) => {
    dispatch(setCityToState(city))
    
  }
};

export const setCityToState =(city) => {
  return {
    type: actionTypes.SET_CITY,
    city : city
  };
}


