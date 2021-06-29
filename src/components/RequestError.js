import React from 'react';
import '../App.css';
import '../Modal'

//Компонент, который рендерит ошибку, если не получены данные при запросе на API
const RequestError = (props) => {
  const errStatus = +props.errStatus;
  const errGeo = props.errGeo;
  const activeCity = props.activeCity;
 
  return (
    <div className="weather-display">
      <div className="weather-display__error">
        <h2>Ошибка!</h2>
        {
          (errStatus >= 400 && errStatus < 500)  &&  
          <p>
            Ошибка {errStatus} (Not Found).Город <span className='weather-display__error-city'>{activeCity}</span> не найден в базе.<br/>
            Попробуйте ввести название на английском или попробуйте изменить поисковый запрос
          </p>
        }
        {
          (errStatus >= 500 && errStatus < 600)  && 
          <p>Ошибка на стороне сервера, ошибка {errStatus}. Попробуйте позже.</p>
        }
        {
          errGeo && 
          <p>
            Произошла ошибка при запросе данных о местоположении.<br/>
            Попробуйте повторить позже или можете ввести название города
            в строку поиска.<br/><hr/>
            Ошибка: {errGeo.code}. {errGeo.message}
          </p>
        }
      </div>
    </div>
  )
}

export {RequestError};