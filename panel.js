let input = document.querySelector(".inputCity");
let city;
let now;

function clock() {
    now = new Date()
    document.querySelectorAll("#clock").forEach((el) => {
    el.innerHTML = now.toLocaleTimeString()
    setTimeout("clock()", 1000);
  });
};

function autoClean() {
  setTimeout(() => (input.value = ""), 1500);
}

function addWidget() {
  city = document.querySelector(".inputCity").value;
  AskServer()
  .then(data => {
    console.log(data);
    if (data.cod === 200) {
      new WeatherWidget(
        data.name,
        data.main,
        data.timezone,
        data.visibility,
        data.wind,
        data.weather,
        data.sys,
        lastTime = new Date((data?.dt+(data?.timezone)) *1000).toGMTString().slice(17,19)+
          now.toGMTString().slice(19,22),
        lastDay = new Date((data?.dt+(data?.timezone)) *1000).toGMTString().slice(0,3),
        widget = document.querySelector(".widget")
      ).render();
      if (data?.sys?.country)
        document
          .querySelector("#flag")
          .setAttribute(
            "src",
            `https://openweathermap.org/images/flags/${data?.sys?.country?.toLowerCase()}.png`
          ); 
    }
      else{
        input.value = data.message;
        autoClean();
      }
  })
  .then(() => {
    let widgets = document.querySelectorAll(".widget");
    let removeBtns = document.querySelectorAll(".closeBtn");
    for (let index = 0; index < removeBtns.length; index++) {
      if (removeBtns[index] === null || widgets[index] === null) return;
      removeBtns[index].addEventListener("click", () => {
        removeBtns[index]?.parentNode?.removeChild(removeBtns[index]);
        delete removeBtns[index];
        widgets[index]?.parentNode?.removeChild(widgets[index]);
        delete widgets[index];
      });
    }
    console.log(removeBtns, widgets);
  });
  autoClean();
}


