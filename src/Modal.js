import React from 'react'
import './Modal.css'
import './App.css';

export default class Modal extends React.Component {
    state = {
        isOpen: false,
    }

    handleLocationClick = (e) => {
        this.setState({ isOpen: false });
        this.props.onLocationClick(e);
    }

    render() {
        return(
            <React.Fragment>
                <button
                    onClick={() => this.setState({ isOpen:true })}
                >
                    Выбрать город
                </button>
                {
                    this.state.isOpen && (
                    <div
                        className='modal'
                    >
                        <div
                            className='modal-body'
                        >
                            <div
                                className='modal-body__header'
                            >
                                <h1
                                    className='modal-body__title'
                                >
                                    Добавить город
                                </h1>
                                <button
                                    onClick={() => this.setState({ isOpen:false })}
                                >
                                    X
                                </button>
                            </div>
                            <input
                                type="text"
                                className="search_input"
                                value={this.props.value ?? ''}
                                placeholder="Погода в вашем городе..."
                                onChange={(e) => this.props.onChange(e?.target ?? '')}
                            />
                            <button
                                id="searchBtn"
                                className="search_btn"
                                onClick={(e) => {
                                    this.setState({ isOpen:false });
                                    this.props.closeCallback(e);
                                }}
                            />
                            <button
                                className="search_location"
                                onClick={this.handleLocationClick}
                            >
                                <img
                                    className="search_location-img" 
                                    src="https://img.icons8.com/color/48/000000/gps-device.png" 
                                    alt='Моё местоположение'
                                    title='Моё местоположение'
                                />
                            </button>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}
