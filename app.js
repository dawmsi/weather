//Key listener
function key(event) {
  return "key" in event ? event.key : event.code;
}

let now = new Date()
function clockTimer() {
    now = new Date()
    document.querySelectorAll("#clock").forEach((el) => {
    el.innerHTML = now.toLocaleTimeString()
    setTimeout("clockTimer()", 1000);
  });
}

clockTimer();

class Weather {
  constructor(name, main, timezone, visibility, wind, weather, sys, lastDate) {
    this.name = name;
    this.main = main;
    this.timezone = timezone;
    this.visibility = visibility;
    this.wind = wind;
    this.weather = weather;
    this.sys = sys;
    this.parent = document.querySelector(".main");
    this.lastDate = lastDate;
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
            ${lastDate[1]}
          </div>
          <div class="time">
             ${lastDate[0]}
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

let inputSearchCity = document.querySelector(".inputCity");
let city;

function cleaninputSC() {
  setTimeout(() => (inputSearchCity.value = ""), 1500);
}

function addWidget() {
  city = document.querySelector(".inputCity").value;
  AskServer();
  cleaninputSC();
}

let url;

document.querySelector("#plusBtn").addEventListener("click", addWidget);

function AskServer() {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.cod == 200) {
        new Weather(
          data.name,
          data.main,
          data.timezone,
          data.visibility,
          data.wind,
          data.weather,
          data.sys,
          (lastDate = [
            new Date((data.dt+(data.timezone)) *1000).toGMTString().slice(17,19)+
            now.toGMTString().slice(19,22),
            new Date((data.dt+(data.timezone)) *1000).toGMTString().slice(0,3),
          ])
        ).render();
        if (data?.sys?.country)
          document
            .querySelector("#flag")
            .setAttribute(
              "src",
              `https://openweathermap.org/images/flags/${data?.sys?.country?.toLowerCase()}.png`
            );

        console.log(lastDate);
        console.log(lastDate[0]);
      } else {
        inputSearchCity.value = data.message;
        cleaninputSC();
      }
    })
    .then(() => {
      let widgets = document.querySelectorAll(".widget");
      let removeBtns = document.querySelectorAll(".closeBtn");
      for (let index = 0; index < removeBtns.length; index++) {
        if (removeBtns[index] === null || widgets[index] === null) return;
        removeBtns[index].addEventListener("click", () => {
          widgets[index].remove();
          removeBtns[index]?.parentNode?.removeChild(removeBtns[index]);
          delete removeBtns[index];
          widgets[index]?.parentNode?.removeChild(widgets[index]);
          delete widgets[index];
          console.log(removeBtns, widgets);
          index - 1;
        });
      }
      console.log(removeBtns, widgets);
    });
}
