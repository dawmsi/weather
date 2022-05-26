class WeatherWidget {
    constructor(name, main, timezone, visibility, wind, weather, sys, lastDate) {
      this.name = name;
      this.main = main;
      this.timezone = timezone;
      this.visibility = visibility;
      this.wind = wind;
      this.weather = weather;
      this.sys = sys;
      this.parent = document.querySelector(".main");
      this.widget = widget;
      this.lastTime;
      this.lastDay;
    }
    render() {
      let weatherW = document.createElement("div");
      weatherW.classList.add("widget");
      weatherW.innerHTML = `
          <div class="box">
          <div class="full">
          <button class="update-button"></button>
            <div class="city">
              ${this?.name}
              <img
                id="flag"
              />
            </div>
            <div class="closeBtn">+</div>
          </div>
          <div class="half">
            <div class="day">
              ${lastDay}
            </div>
            <div class="time">
               ${lastTime}
            </div>
            <div class="details-weather">
              Humidity: ${this?.main?.humidity} %<br />
              Pressure: ${this?.main?.pressure} hPa<br />
              Wind: ${this?.wind?.speed} km/SSE <br />
            </div>
          </div>
          <div class="half">
            <div class="about-weather">
              ${this?.weather?.values()?.next()?.value?.description}
            </div>
            <div class="icon-weather">
              <img
                src="https://openweathermap.org/img/wn/${
                  this?.weather?.values()?.next()?.value?.icon
                }@2x.png"
              />
            </div>
                <div class="temperature">
                <div>${this?.main?.temp} C</div>
                <div class="feels-like">feels like: ${
                  this?.main?.feels_like
                } C</div>
                </div>
          </div>
  
        </div>
        `;
      this.parent.prepend(weatherW);
    }
  }