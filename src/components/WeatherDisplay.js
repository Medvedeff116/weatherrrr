import React from 'react';
import {RequestError} from './RequestError';
import {Loader} from './Loader';
import '../App.css';
import '../Modal'
import Modal2 from '../Modal2'

//Компонент показывает данные о погоде в выбарнном городе
class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      weatherData: null,
      err: null,
      loading: true
    }
  }

  //Запрос на API по имени выбранного города в navbar. activeCity получаем из props.
  fetchData(activeCity) {
    const APPID = 'ef598dd48091a3a2eb6a63ef6c4d75b2'
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + 
                activeCity + `&units=metric&lang=ru&APPID=${APPID}`;

    this.setState({loading: true});

    fetch(URL).then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw response.status
      }
    })
    .then(data => {
      this.setState({
        weatherData: data,
        loading: false,
        err: null
      });
    })
    .catch(err => {
      console.warn('Данные не были получены, ошибка: ' + err);
      this.setState({
        err: err
      })
    }) 
  }

  //Когда компонент примонтирован, если есть данные о погоде полученые из местоположения пользователя то
  //компонент отображает их, в противном случае делает запрос на api по активному городу
  componentDidMount() {
    const {activeCity, weatherDataByGeo} = this.props;
    
    weatherDataByGeo ? 
    this.setState({weatherData: weatherDataByGeo, loading: false}) :
    this.fetchData(activeCity);    
  }

  //делает запрос на api, если был выбран другой город или если есть данные о погоде по местоположению то отображает их
  componentDidUpdate(prevProps) {
    const {activeCity, weatherDataByGeo} = this.props;
    
    prevProps.activeCity !== activeCity && this.fetchData(activeCity);
    prevProps.weatherDataByGeo !== weatherDataByGeo && this.setState({weatherData: weatherDataByGeo, loading: false});
  }

  render() {
    const {weatherData, err, loading} = this.state;
    const {activeCity} = this.props;
    
    if (err) return <RequestError errStatus={err} activeCity={activeCity}/>;
    else if (loading) return <Loader/>;

    const weather = weatherData.weather[0];
    const weatherIcon = `https://openweathermap.org/img/wn/${weather.icon}.png`;
    
    return (
      <div className="weather-display">
        <h2 className="city-status">
          {` В ${weatherData.name} ${weather.description}`}
          <img 
            src={weatherIcon} 
            alt={weather.description} 
            title={weather.description}/>  
        </h2>
        <div className="weather-info">
          <p className="weather-info__item">Температура: {weatherData.main.temp}°</p>
          <p className="weather-info__item">По ощущению: {weatherData.main.feels_like}°</p>
          <p className="weather-info__item">Ветер: {weatherData.wind.speed} м/с</p>
          <p className="weather-info__item">Статус: {weather.description}</p>
          <p className="weather-info__item">Давление: {
            /*перевод давления из атм в мм.рт.ст*/
            (weatherData.main.pressure *  0.75006375541921).toFixed(2)
          } мм рт. ст.</p>
          <p className="weather-info__item">Влажность: {weatherData.main.humidity}%</p>
          <p className="weather-info__item">Координаты: {`[${weatherData.coord.lat}, ${weatherData.coord.lon}]; ${weatherData.sys.country}`}</p>
        </div>
        <h1>Завтра в {weatherData.name} {weather.description} <img 
            src={weatherIcon} 
            alt={weather.description} 
            title={weather.description}/>   </h1>
        
        
        <div className="weather-info">
          <p className="weather-info__item">Температура: {weatherData.main.temp}°</p>
          <p className="weather-info__item">По ощущению: {weatherData.main.feels_like}°</p>
          <p className="weather-info__item">Ветер: {weatherData.wind.speed} м/с</p>
          <p className="weather-info__item">Статус: {weather.description}</p>
          <p className="weather-info__item">Давление: {
            /*перевод давления из атм в мм.рт.ст*/
            (weatherData.main.pressure *  0.75006375541921).toFixed(2)
          } мм рт. ст.</p>
          <p className="weather-info__item">Влажность: {weatherData.main.humidity}%</p>
          
          <p className="weather-info__item">Координаты: {`[${weatherData.coord.lat}, ${weatherData.coord.lon}]; ${weatherData.sys.country}`}</p>
          
          
</div>
            <Modal2
              city={weatherData}
            />
      </div>
      
    )
  }
}

export {WeatherDisplay}