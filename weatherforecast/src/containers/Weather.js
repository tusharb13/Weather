import React, { Component } from "react";
import Search from "../components/Search";
import DailyWeather from "../components/dailyWeather";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import Spinner from "../components/UI/Spinner/Spinner";
import WeeklyWeather from "../components/WeeklyWeather/weeklyWeather";

class Weather extends Component {
  render() {
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
        <Search {...this.props} />
        {dailyWeather}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.city,
    icon: state.icon,
    celsius: state.celsius,
    temp_max: state.temp_max,
    temp_min: state.temp_min,
    description: state.description,
    error: state.error,
    loading: state.loading,
    list: state.list,
    date: state.date,
    selectedButton: state.selectedButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchCity: (city) => dispatch(actions.fetchWeatherData(city)),
    onWeatherChange: (ctrl, cityName, maxTemp, minTemp, selectedButton) =>
      dispatch(
        actions.setDailyWeatherFromWeek(
          ctrl,
          cityName,
          maxTemp,
          minTemp,
          selectedButton
        )
      ),
    handleCityChange: (city) => dispatch(actions.setCity(city)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
