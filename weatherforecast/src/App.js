import React from "react";
//import logo from './logo.svg';
import "./App.css";
import Weather from "./containers/Weather";
import Navigation from './components/UI/Navigation'
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
function App() {
  return (
    <div
      className="App AppBackground"
    >
      <Navigation></Navigation>
      <Weather></Weather>
    </div>
  );
}

export default App;
