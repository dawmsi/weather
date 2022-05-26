
clock()
document.querySelector("#plusBtn").addEventListener("click", addWidget);

//Key listener 
function key(event) {
  return "key" in event ? event.key : event.code
}

function AskServer() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`;
  return fetch(url)
    .then((response) => response.json())
    .catch(e => console.log(e))
}
