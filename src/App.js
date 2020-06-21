import React from "react";
import WeatherDisplay from "./WeatherDisplay";
import "./App.css";
const KEY = "a27e349dc5c35c5fdb3ec0f87a9d3d9c";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      lon: "",
      success: false,
      error: false,
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
  onManual(event) {
    event.preventDefault();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.searchInput.value}&appid=${KEY}&lang=ru`
    )
      .then((response) => response.json())
      .then((res) => {
        const { coord } = res;
        this.setState({
          lat: coord.lat,
          lon: coord.lon,
          success: true,
          error: false,
        });
      })
      .catch(
        (err) => console.error("ERROR", err),
        this.setState({ error: true })
      );
    this.searchInput.value = "";
    return false;
  }
  render() {
    return (
      <>
        {this.state.success ? (
          <WeatherDisplay lat={this.state.lat} lon={this.state.lon} />
        ) : (
          <>
            <div className="warning">
              Пожалуйста, разрешите доступ к геолокации и обновите страницу!
              <form onSubmit={(e) => this.onManual(e)}>
                <label>
                  Или введите город вручную:{" "}
                  <input
                    type="text"
                    ref={(input) => {
                      this.searchInput = input;
                    }}
                  />
                </label>
              </form>
              {this.state.error ? (
                <p>
                  Проверьте правильность введенных данных и попробуйте еще раз!
                </p>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default App;
