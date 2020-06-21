import React, { useState } from "react";
import "./CityContainer.css";
export default function CityContainer(props) {
  const [date, setDate] = useState(new Date());
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timezone: "UTC",
  };
  setInterval(() => setDate(new Date()), 1000);
  let dateString = date.toLocaleDateString("ru", options);
  return (
    <div className="main">
      <div className="city-name">{props.name}</div>
      <div className="date">Сегодня: {dateString}</div>
      <div>
        Восход солнца: {props.sunrise.getHours()}:{props.sunrise.getMinutes()}
      </div>
      <div>
        Заход солнца: {props.sunset.getHours()}:{props.sunset.getMinutes()}
      </div>
    </div>
  );
}
