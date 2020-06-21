import React from "react";
export default function DailyBlock(props) {
  const { weather, temp, dt } = props.content;
  let icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  let options = {
    month: "numeric",
    day: "numeric",
    weekday: "long",
    timezone: "UTC",
  };
  let date = new Date(dt * 1000).toLocaleDateString("ru", options);
  let styles = {
    textAlign: "center",
    padding: "10px",
    margin: "5px",
    border: "solid 1px #f2f2f2",
    borderRadius: " 3%",
    minWidth: "230px",
    boxShadow: "-1px 0px 4px #00000026",
    backgroundColor: " #ffffff",
    maxWidth: "230px",
  };
  return (
    <div style={styles}>
      <div>{date}</div>
      <img src={icon} alt={weather[0].description} />
      <div>06:00 | {Math.round(temp.morn)}°C</div>
      <div>12:00 | {Math.round(temp.day)}°C</div>
      <div>18:00 | {Math.round(temp.eve)}°C</div>
      <div>00:00 | {Math.round(temp.night)}°C</div>
    </div>
  );
}
