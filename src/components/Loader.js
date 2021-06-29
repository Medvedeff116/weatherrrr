import React from 'react';
import '../App.css';

const Loader = (props) => {
  return (
    <div className="weather-display">
      <div className="load-5">
        <div className="ring-2">
          <div className="ball-holder">
            <div className="ball"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Loader};