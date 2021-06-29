import React from 'react';
import {CityBtn} from './CityBtn';
import '../App.css';
import '../Modal'

//Компонент, который является navbar-ом, в котором рендерятся кнопки CityBtn
const Cities = (props) => {
  const handleDeleteBtnClick = (deleteBtn) => {
    props.onDeleteCityBtnClick(deleteBtn);
  }

  const {data, onCityClick, activeCityId} = props;

  return (
    <nav className="cities-wrapper">
      <h2 className="cities-wrapper__label">Выберите город</h2>
      <ul className="cities">
        {data.map(element => 
            <CityBtn 
              key={element.id} 
              id={element.id}
              name={element.city}
              
              onCityClick={onCityClick}
              onDeleteBtnClick={handleDeleteBtnClick}
              activeCityId={activeCityId}
            />
        )}
      </ul>
    </nav>
  )

}

export {Cities};