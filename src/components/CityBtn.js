import React from 'react';
import '../Modal';

//Компонент рендерит кнопку с названием города в navbar-e.
//Так же рендерится кнопка "Удалить" при наведении на CityBtn
class CityBtn extends React.Component {
  state = {
    deleteBtn: null
  }

  hadleClick = (e) => {
   this.props.onCityClick(e.target);
  }

  handleDeleteBtnClick = (e) => {
    e.preventDefault();
    this.props.onDeleteBtnClick(e.target);
  }

  handleMouseEnter = (e) => {
    this.setState({deleteBtn: true});
  }

  handleMouseLeave = (e) => {
    this.setState({deleteBtn: false});
  }

  render () {
    const {deleteBtn} = this.state;
    const {id, name} = this.props;
    const activeCityId = +this.props.activeCityId;
    return (
      activeCityId === id ?
        <li className="city-wrapper city__active" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <div id={id} className="city" onClick={this.hadleClick}>
            {name}
          </div>
          {deleteBtn && <button id={id} className="delete-city" onClick={this.handleDeleteBtnClick}>Удалить</button>}
        </li>
        :
        <li className="city-wrapper" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <div id={id} className="city" onClick={this.hadleClick}>
            {name}
          </div>
          {deleteBtn && <button id={id} className="delete-city" onClick={this.handleDeleteBtnClick}>Удалить</button>}
        </li>
  )
  }
}

export {CityBtn};