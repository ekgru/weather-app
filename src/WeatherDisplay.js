import React from "react";
import DailyBlock from "./DailyBlock";
import "./WeatherDisplay.css";
import Loader from "./Loader";
import CityContainer from "./CityContainer";
import TodayWeather from "./TodayWeather";
const KEY = "a27e349dc5c35c5fdb3ec0f87a9d3d9c";
export default class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isload: false,
    };
    this.getWindDirection = this.getWindDirection.bind(this);
  }
  getWeather() {
    fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${this.props.lat}&lon=${this.props.lon}&exclude=hourly&appid=${KEY}&lang=ru&units=metric`
    ) //API перепутаны, проследить за изменениями, в случае неккоретного поведения поменять hourly на daily
      .then((response) => response.json())
      .then((res) => {
        const { current, daily } = res;
        this.setState({
          current,
          daily,
          isload: true,
        });
      })
      .catch((err) => console.error("ERROR", err));
  }
  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${this.props.lat}&lon=${this.props.lon}&appid=${KEY}&lang=ru`
    )
      .then((response) => response.json())
      .then((res) => {
        const { name, sys } = res;
        this.setState({
          name,
          sunrise: new Date(sys.sunrise * 1000),
          sunset: new Date(sys.sunset * 1000),
        });
        this.getWeather();
      })
      .catch((err) => console.error("ERROR", err));
    setInterval(() => this.getWeather(), 300000);
  }

  getWindDirection(deg) {
    let directions = ["C", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ", "C"];
    let windDirection = directions[Math.round(deg / 45)];
    return windDirection;
  }

  render() {
    return (
      <>
        {this.state.isload ? (
          <div className="main-container">
            <div className="today-content">
              <CityContainer
                name={this.state.name}
                sunset={this.state.sunset}
                sunrise={this.state.sunrise}
              />
              <TodayWeather
                todayInformation={this.state.current}
                getWindDirection={this.getWindDirection}
              />
            </div>
            <h2>Погода на другие дни:</h2>
            <div className="daily-content">
              {this.state.daily.map((el, i) => (
                <DailyBlock key={i * 3.14} content={el} />
              ))}
            </div>{" "}
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
