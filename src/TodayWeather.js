import React from "react";
import "./TodayWeather.css";
export default function TodayWeather(props) {
  const today = props.todayInformation;
  const styleHot = { color: "#ED6F4C" };
  const styleWarm = { color: "#EDA458" };
  const styleCold = { color: "#34BFED" };
  const uviLow = { color: "#64ED77" };
  const uviMedium = { color: "#edd74c" };
  const uviHigh = { color: "#EDA458" };
  const uviVeryHigh = { color: "#ED6F4C" };

  return (
    <div className="weather-big">
      <div className="weather-big-description">
        <div className="container">
          <div className="weather-big-description-temp-real">
            {Math.round(today.temp)}°C
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
            alt={today.weather[0].description}
          />
        </div>
        <div className="container">
          За окном {today.weather[0].description}
          <div
            style={
              today.feels_like > 18
                ? today.feels_like < 30
                  ? styleWarm
                  : styleHot
                : styleCold
            }
          >
            По ощущению: {Math.round(today.feels_like)}°C
          </div>
          <div style={{ color: "#34BFED" }}>Влажность: {today.humidity}%</div>
          <div>
            Ветер: {props.getWindDirection(today.wind_deg)} {today.wind_speed}
            м/с
          </div>
          <div
            style={
              today.uvi < 8
                ? today.uvi < 6
                  ? today.uvi < 3
                    ? uviLow
                    : uviMedium
                  : uviHigh
                : uviVeryHigh
            }
          >
            Индекс UF: {today.uvi}
          </div>
        </div>
      </div>
    </div>
  );
}
