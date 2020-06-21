import React from "react";
import WeatherDisplay from "./WeatherDisplay";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      lon: "",
      success: false,
    };

    this.onSuccessGeo = this.onSuccessGeo.bind(this);
  }
  onSuccessGeo(pos) {
    const crd = pos.coords;
    this.setState({ lat: crd.latitude, lon: crd.longitude, success: true });
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      this.onSuccessGeo,
      (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
      options
    );
  }

  render() {
    return (
      <>
        {this.state.success ? (
          <WeatherDisplay lat={this.state.lat} lon={this.state.lon} />
        ) : (
          <div className="warning">
            Пожалуйста, разрешите доступ к геолокации и обновите страницу!
          </div>
        )}
      </>
    );
  }
}

export default App;
