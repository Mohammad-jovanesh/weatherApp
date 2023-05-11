import DateFormate from "./JS/_dateFormat.js";
import ShowCurrent from "./JS/_showToday.js";
import BuiltUI_ForeCast_Today from "./JS/_buildUI_forecastToday.js";
import foreCast_Seven from "./JS/_forecast_Seven.js";
import FetchApi from "./JS/_getFetch.js";
const inputName = document.querySelector(".input_name");
const SearchSection = document.querySelector(".input_section");
const dropDown = document.querySelector(".dorpDown");
let CiteNames = [];
var City = "Gorgan";
inputName.addEventListener("input", (e) => {
  SearchSection.classList.add("Active_Form");
  if (e.target.value == "") {
    SearchSection.classList.remove("Active_Form");
  }
  fetch(
    `http://api.weatherapi.com/v1/search.json?key=298619e6973f4992b1e153252231005&q=${e.target.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      CiteNames = [];
      data.forEach((city) => {
        CiteNames = [
          ...CiteNames,
          { name: city.name, region: city.region, country: city.country },
        ];
      });
      dropDown.innerHTML = "";
      CiteNames.forEach((city) => {
        dropDown.innerHTML += `<p class="drop_city">${city.name},${city.region},${city.country}</p>`;
      });
    });
});
dropDown.addEventListener("click", (e) => {
  if (e.target.classList.contains("drop_city")) {
    inputName.value = e.target.textContent;
    dropDown.innerHTML = "";
    SearchSection.classList.remove("Active_Form");
    InitData(e.target.textContent);
    foreCast(e.target.textContent);
    foreCast_Seven(e.target.textContent);
  }
});
// current Api
function InitData(city) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=298619e6973f4992b1e153252231005&q=${city}&aqi=yes`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ShowCurrent(
        data.location.name,
        data.location.region,
        data.location.country,
        DateFormate(data.location.localtime_epoch * 1000),
        data.current.temp_c,
        data.current.condition.icon,
        data.current.feelslike_c,
        data.current.wind_kph,
        data.current.humidity,
        data.current.uv
      );
    });
}

// forecast Api
function foreCast(city) {
  let Every_3_List = [];
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=298619e6973f4992b1e153252231005&q=${city}&days=1&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      let mylist = data.forecast.forecastday[0].hour;
      Every_3_List = mylist
        .filter((Times, index) => {
          if (index % 3 === 0) {
            // return time;
            return Times;
          }
        })
        .map((elm) => {
          let {
            condition: { icon },
            temp_c,
            time,
          } = elm;
          return {
            icon,
            temp_c,
            time:
              parseInt(time.split(" ")[1].split(":")[0]) > 12
                ? time.split(" ")[1].split(":")[0] + " PM"
                : time.split(" ")[1].split(":")[0] + " AM",
          };
        });

      BuiltUI_ForeCast_Today(Every_3_List);
    });
}

// foreCast(City);
// InitData(City);
// ShowCurrent();
// foreCast_Seven(City);
// foreCast_Seven(City);

{
  /* <div class="weather_forecast_cart">
                <p class="weather_forecast_cart_date">
                    Today
                </p>
                <div class="weather_forecast_cart_image">
                    <img src="./Sunny.png" alt="" class="weather_forecast_cart_icon">
                    
                </div>
                <p class="weather_forecast_cart_temp">
                    31
                </p>
            </div> */
}
