import React from "react";
import Card from "./Card/card";


const weatherIcon = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog",
};
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const weeklyWeather = (props) => {
    
  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        return icons.Thunderstorm;

      case rangeId >= 300 && rangeId <= 321:
        return icons.Drizzle;

      case rangeId >= 500 && rangeId <= 521:
        return icons.Rain;

      case rangeId >= 600 && rangeId <= 622:
        return icons.Snow;

      case rangeId >= 701 && rangeId <= 781:
        return icons.Atmosphere;

      case rangeId === 800:
        return icons.Clear;

      case rangeId >= 801 && rangeId <= 804:
        return icons.Clouds;

      default:
        return icons.Clouds;
    }
  };

  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  let newDate = new Date();
  const toRenderOnScreen = props.list.map((data,index) => {
      
    let dateInsideLoop = new Date(data.dt_txt.split(" ")[0]);
    if (newDate.getDate() === dateInsideLoop.getDate()) {
        
        let filterByDate = props.list.filter(x => new Date(x.dt_txt).getDate().toString() === newDate.getDate().toString())
        let maxTemp = calCelsius((Math.max.apply(Math, filterByDate.map(function(o) { return o.main.temp_max; }))));
        let minTemp = calCelsius((Math.min.apply(Math, filterByDate.map(function(o) { return o.main.temp_min; }))))
        newDate.setDate(newDate.getDate() + 1);
        return(
        <Card 
            key={data.dt}
            cityname={props.city}
            weatherIcon={getWeatherIcon(weatherIcon, data.weather[0].id)}
            temp_celsius={Math.floor(data.main.temp - 273.15)}
            temp_max={maxTemp}
            temp_min={minTemp}
            description={data.weather[0].description}
            date={days[new Date(data.dt_txt.split(" ")[0]).getDay()]}
            changed={() => props.onWeatherChange(data, props.city,maxTemp,minTemp,index)}
            selectedButton = {props.selectedButton}
            keyPassed ={index}
          />
        );
    }
 return null
  }).filter(x => x !== undefined && x !== null);
  
  return (
    <div className="row pt-2">
      {toRenderOnScreen}
    </div>
  );
};


export default weeklyWeather;
