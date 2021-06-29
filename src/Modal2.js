import React from 'react'
import './Modal2.css'
import './App.css';
import moment from 'moment';


export default class Modal2 extends React.Component {
    state = {
        isOpen: false,
        sunset: null,
        sunrise: null,
        showSunSet: false,
        showSunRise: false,
        coordinatesTopSunSet: null,
        coordinatesTopSunRise: null,
        coordinatesRightSunSet: null,
        coordinatesLeftSunRise: null,
        arrCoordinatesTopSunRise: [135, 130, 120, 110, 90, 70, 50, 40, 30, 20, 10, 0, -6],
        arrCoordinatesLeftSunRise: [-5, -3, -3, -1, 4, 14, 8, 28, 36, 45, 60, 75, 100, 145],
        arrCoordinatesTopSunSet: [-17, -5, 0, 10, 30, 40, 60, 70, 80, 90, 100, 110, 130],
        arrCoordinatesRightSunSet: [-150, -200, -215, -230, -255, -262, -275, -280, -285, -287, -290, -293, -295],
    }
    
    componentDidMount() {
        this.getTimeWithDate();
    };


    /**
     * Координаты для восхода
     */
     coordinatesSunRise = () => {
        let time = this.state.sunrise.slice(0, 2);
        if (time !== '10' && time !== '11' && time !== '12') {
            time = time.slice(1);
        };
        this.state.arrCoordinatesLeftSunRise.forEach((coordinatesLeftSunRise, index) => {
            if (`${index}` === time) {
                this.setState({ coordinatesLeftSunRise });
            }
        });
        this.state.arrCoordinatesTopSunRise.forEach((coordinatesTopSunRise, index) => {
            if (`${index}` === time) {
                this.setState({ coordinatesTopSunRise });
            }
        })
    };

    /**
     * Координаты для заката
     */
    coordinatesSunSet = () => {
        this.state.arrCoordinatesTopSunSet.forEach((coordinatesTopSunSet, index) => {
            if (`${index + 12}` === this.state.sunset.slice(0, 2)) {
                this.setState({ coordinatesTopSunSet });
            }
        });

        this.state.arrCoordinatesRightSunSet.forEach((coordinatesRightSunSet, index) => {
            if (`${index + 12}` === this.state.sunset.slice(0, 2)) {
                this.setState({ coordinatesRightSunSet });
            }
        })
    };

    handleLocationClick = (e) => {
        this.setState({ isOpen: false });
        this.props.onLocationClick(e);
    }

    getTimeWithDate = () => {
        this.setState(
            {
                sunrise: moment(new Date(this.props.city.sys.sunrise * 1000)).zone(-this.props.city.timezone / 3600).format('HH:mm'),
                sunset: moment(new Date(this.props.city.sys.sunset * 1000)).zone(-this.props.city.timezone / 3600).format('HH:mm'),
            },
            () => {
                this.coordinatesSunSet();
                this.coordinatesSunRise();
            }
        )
    }

    render() {
        return(
            <React.Fragment>
                <button
                    onClick={() => this.setState({ isOpen: true })}
                >
                    Рассвет и закат
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
                                   Информация о расвете и закате
                                </h1>
                                <button
                                    onClick={() => this.setState({ isOpen: false })}
                                >
                                    X
                                </button>
                            </div>
                            <div className="cont">
                                <div
                                    className="modal-body__dot"
                                    style={{
                                        top: this.state.coordinatesTopSunRise,
                                        left: this.state.coordinatesLeftSunRise,
                                    }}
                                    onMouseOver={() => this.setState({ showSunRise: true })}
                                    onMouseOut={() => this.setState({ showSunRise: false })}
                                >
                                <img
                                    className={'modal-body__img-sun'}
                                    src={'../sun.jpg'}
                                    alt={'Солнце'}
                                />
                                    {
                                        this.state.showSunRise &&
                                        <div
                                            className={'modal-body__dot-hover'}
                                            onMouseOut={() => this.setState({ showSunRise: false })}
                                            onMouseOver={() => this.setState({ showSunRise: true })}
                                        >
                                            Восход - {this.state.sunrise}
                                        </div>
                                    }
                                </div>
                                <div
                                    style={{
                                        top: this.state.coordinatesTopSunSet,
                                        right: this.state.coordinatesRightSunSet,
                                    }}
                                    className={'modal-body__dot'}
                                    onMouseOver={() => this.setState({ showSunSet: true })}
                                    onMouseOut={() => this.setState({ showSunSet: false })}
                                >
                                <img
                                    className={'modal-body__img-moon'}
                                    src={'../moon.png'}
                                    alt={'Луна'}
                                />
                                    {
                                        this.state.showSunSet &&
                                        <div
                                            className={'modal-body__dot-hover'}
                                            onMouseOut={() => this.setState({ showSunSet: false })}
                                            onMouseOver={() => this.setState({ showSunSet: true })}
                                        >
                                            Закат - {this.state.sunset}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}
