import React from "react";

const card = (props) => {
  return (
    <div className='card col-sm-2 my-3 ' onClick={props.changed} 
    style={props.keyPassed === props.selectedButton ? {"borderRadius": "1.25rem","border": "1px double rgb(226, 193, 220)", 'background':'lightsteelblue'}:{"borderRadius": "1.25rem","border": "1px double rgb(226, 193, 220)"}}>
      <div className="card-body">
        <h5 className="card-title">
          <i
            style={{ color: "black" }}
            className={`wi ${props.weatherIcon} `}
          />
        </h5>
        <h6 className="card-subtitle mb-2 text-dark">
          {props.temp_celsius ? (
            <p className="py-2">{props.temp_celsius}&deg;</p>
          ) : null}
        </h6>
        
          {maxminTemp(props.temp_min, props.temp_max)}
           
          {/* Weather description */}
          {props.description ? (
            <p className='text-dark' style={{"textTransform":"capitalize"}}>
              {props.description}
            </p>
          ) : null}
          {props.date ? <p className='text-dark'>{props.date}</p> : null}
      
      </div>
    </div>
  );

  function maxminTemp(min, max) {
    if (max && min) {
      return (
        <p className="card-text">
          <span className="px-6" style={{ color: "blue" ,'paddingRight': '10px', 'fontSize':'larger'}}>
            {min}&deg;
          </span>
          <span className="px-6" style={{ color: "red", 'fontSize':'larger' }}>
            {max}&deg;
          </span>
        </p>
      );
    }
  }
};

export default card;
