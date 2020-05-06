import React, { Component } from "react";
import Search from "../components/Search";
import DailyWeather from "../components/dailyWeather";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import Spinner from "../components/UI/Spinner/Spinner";
import WeeklyWeather from "../components/WeeklyWeather/weeklyWeather";


class Weather extends Component {


  render() {
    
    let dailyWeather = null;
    
    dailyWeather = this.props.loading ? (
      <Spinner></Spinner>
    ) : !this.props.error && this.props.list ? (
      <React.Fragment>
       
        <DailyWeather
          {...this.props}
        />
        <WeeklyWeather
          {...this.props}
        ></WeeklyWeather>
      </React.Fragment>
    ) : null;

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
    selectedButton : state.selectedButton
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchCity: (city) => dispatch(actions.fetchWeatherData(city)),
    onWeatherChange : (ctrl,cityName,maxTemp, minTemp, selectedButton) => dispatch(actions.setDailyWeatherFromWeek(ctrl,cityName,maxTemp,minTemp, selectedButton)),
    handleCityChange : (city) => dispatch(actions.setCity(city))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
