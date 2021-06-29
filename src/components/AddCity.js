import React from 'react';
import '../App.css';
import '../Modal'
//Компонент рендерит поисковую строку и сообщения о невалидных данных
const AddCity = (props) => {
  const handleChange = (e) => {
    e.preventDefault();
    props.onChange(e.target);
  }

  const handleSearchBtnClick = (e) => {
    props.onClick(e);
  }

  const handleKeyDown = (e) => {
    props.onEnterKeyDown(e);
  }

  const handleLocationClick = (e) => {
    props.onLocationClick(e);
  }

  return (
    <div className="search-wrapper">
      <div className="search">
        <input
          type="text" 
          className="search_input"
          onChange={handleChange}
          value={props.value}
          placeholder="Найти город..."
          onKeyDown={handleKeyDown}
        />
        <button id="searchBtn" className="search_btn" onClick={handleSearchBtnClick}></button>
        <div className="search_location" onClick={handleLocationClick}>
          <img 
            className="search_location-img" 
            src="https://img.icons8.com/color/48/000000/gps-device.png" 
            alt='Моё местоположение'
            title='Моё местоположение'
          />
        </div>
		  </div>
   
    </div>
  );
}

export {AddCity};