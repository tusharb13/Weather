import * as actionTypes from "./actions/actionTypes";

const initialState = {
  city: "",
  icon: undefined,
  celsius: undefined,
  temp_max: null,
  temp_min: null,
  description: "",
  error: false,
  loading: false,
  list: null,
  date: null,
  selectedButton: 0,
};

const addWeatherFromWeek = (state, action) => {
  
  return {
    ...state,
    city: action.cityName,

    icon: action.icon,
    celsius: calCelsius(action.response.main.temp),
    temp_max: action.maxTemp,
    temp_min: action.minTemp,
    description: action.response.weather[0].description,
    error: false,
    loading: false,
    // date: days[new Date(action.response.dt_txt.split(" ")[0]).getDay()],
    date: action.response.dt_txt.split(" ")[0],
    selectedButton: action.selectedButton,
  };
};

const addWeatherSuccess = (state, action) => {
  return {
    ...state,
    city: action.response.city.name,
    icon: action.icon,
    celsius: calCelsius(action.response.list[0].main.temp),
    temp_max: calCelsius(calcMaxTemp(action.response.list)),
    temp_min: calCelsius(calcMinTemp(action.response.list)),
    description: action.response.list[0].weather[0].description,
    error: false,
    loading: false,
    list: action.response.list,
    //date: days[new Date(action.response.list[0].dt_txt.split(" ")[0]).getDay()],
    date: action.response.list[0].dt_txt.split(" ")[0],
  };
};

const addWeatherFailure = (state, action) => {
  return {
    ...state,
    error: true,
    loading: false,
  };
};

const calCelsius = (temp) => {
  let cell = Math.floor(temp - 273.15);
  return cell;
};

const addCity = (state,action) =>{
  return {
    ...state,
    city : action.city
  };
}
const addWeatherStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const calcMaxTemp = (list) => {
  let filterByDate = list.filter(
    (x) =>
      new Date(x.dt_txt).getDate().toString() ===
      new Date().getDate().toString()
  );
  return Math.max.apply(
    Math,
    filterByDate.map(function (o) {
      return o.main.temp_max;
    })
  );
};

const calcMinTemp = (list) => {
  let filterByDate = list.filter(
    (x) =>
      new Date(x.dt_txt).getDate().toString() ===
      new Date().getDate().toString()
  );
  return Math.min.apply(
    Math,
    filterByDate.map(function (o) {
      return o.main.temp_min;
    })
  );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHER_START:
      return addWeatherStart(state, action);
    case actionTypes.FETCH_WEATHER_SUCCESS:
      return addWeatherSuccess(state, action);
    case actionTypes.FETCH_WEATHER_FAILURE:
      return addWeatherFailure(state, action);
    case actionTypes.SET_DAILY_WEATHER:
      return addWeatherFromWeek(state, action);
    case actionTypes.SET_CITY:
      return addCity(state, action);
    default:
      return state;
  }
};

export default reducer;
