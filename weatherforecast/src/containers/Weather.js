import React from "react";
import Search from "../components/Search";
import DailyWeather from "../components/dailyWeather";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/index";
import Spinner from "../components/UI/Spinner/Spinner";
import WeeklyWeather from "../components/WeeklyWeather/weeklyWeather";

const Weather = () => {
  const city = useSelector((state) => state.city);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const list = useSelector((state) => state.list);
  const date = useSelector((state) => state.date);
  const selectedButton = useSelector((state) => state.selectedButton);

  const dispatch = useDispatch();
  const loadingCondition = loading;
  const loadingConditionTrue = <Spinner></Spinner>;
  const errorCondition = !error && list;
  const errorConditionFalse = (
    <React.Fragment>
      <DailyWeather list={list} date={date} city={city} />
      <WeeklyWeather
        list={list}
        city={city}
        selectedButton={selectedButton}
        onWeatherChange={(ctrl, cityName, maxTemp, minTemp, selectedButton) =>
          dispatch(
            actions.setDailyWeatherFromWeek(
              ctrl,
              cityName,
              maxTemp,
              minTemp,
              selectedButton
            )
          )
        }
      ></WeeklyWeather>
    </React.Fragment>
  );
  let dailyWeather = null;
  if (loadingCondition) {
    dailyWeather = loadingConditionTrue;
  } else if (!loadingCondition && errorCondition) {
    dailyWeather = errorConditionFalse;
  }
  return (
    <div>
      <Search
        error={error}
        city={city}
        list={list}
        handleCityChange={(city) => dispatch(actions.setCity(city))}
        onSearchCity={(city) => dispatch(actions.fetchWeatherData(city))}
      />
      {dailyWeather}
    </div>
  );
};

export default Weather;
