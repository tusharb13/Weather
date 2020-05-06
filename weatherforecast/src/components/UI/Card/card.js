import React from "react";
import './card.css';
const card = (props) => {
  return (
    <div className={props.keyPassed === props.selectedButton ? 'col-sm-2 my-3 selected' : 'col-sm-2 my-3 notSelected'}
     onClick={props.changed} 
     >
      <div className="card-body">
        <h5 className="card-title">
          <i
            className={`wi ${props.weatherIcon} text-dark`}
          />
        </h5>
        <h6 className="card-subtitle mb-2 text-dark">
          {props.temp_celsius ? (
            <p className="py-2">{props.temp_celsius}&deg;</p>
          ) : null}
        </h6>
        
          {getMaxMinTempJSX(props.temp_min, props.temp_max)}
           
          {/* Weather description */}
          {props.description ? (
            <p className='text-dark text-capitalize'>
              {props.description}
            </p>
          ) : null}
          {props.date ? <p className='text-dark'>{props.date}</p> : null}
      
      </div>
    </div>
  );

  function getMaxMinTempJSX(min, max) {
    if (max && min) {
      return (
        <p className="card-text">
          <span className="px-6 min" >
            {min}&deg;
          </span>
          <span className="px-6 max">
            {max}&deg;
          </span>
        </p>
      );
    }
  }
};

export default card;
