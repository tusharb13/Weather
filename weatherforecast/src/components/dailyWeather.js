import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const dailyWeather = (props) => {
  const  renderGraph = (list, date) => {
    let arrayToPassInOptionsCelcius= []
    let arrayToPassInOptionsFarenhiet= [];
    let filterByDate = list.filter(
      (x) =>
        new Date(x.dt_txt).getDate().toString() ===
        new Date(date).getDate().toString()
    );

    filterByDate.map((x) => {
      let arrayForCelcius = [];
      let arrayForFarenheit = [];
      arrayForCelcius.push(new Date(x.dt_txt).getHours());
      arrayForCelcius.push(Math.floor(x.main.temp - 273.15));
      arrayForFarenheit.push(new Date(x.dt_txt).getHours());
      arrayForFarenheit.push(Math.floor(x.main.temp - 273.15) * 9/5 + 32)
      arrayToPassInOptionsCelcius.push(arrayForCelcius);
      arrayToPassInOptionsFarenhiet.push(arrayForFarenheit)
      return null;
    });
    const options = {
      chart: {
        height: 200,
      },
      credits: {
        enabled: false
      },
      title: {
        text: "Time vs Temprature for " + props.city,
      },
      series: [{ name: "Temprature in Farenheit", data: arrayToPassInOptionsFarenhiet },
      { name: "Temprature in Celcius", data: arrayToPassInOptionsCelcius },
      ]
      
    };

    return options;
  }

  return (
    <div className="row justify-content-center">
      <div className="Card">
        <HighchartsReact
          highcharts={Highcharts}
          options={renderGraph(props.list, props.date)}
        />
      </div>
    </div>
  );

  
  
};

export default dailyWeather;
