import DateFormate from "./JS/_dateFormat.js";
import ShowCurrent from "./JS/_showToday.js";
import BuiltUI_ForeCast_Today from "./JS/_buildUI_forecastToday.js";
import foreCast_Seven from "./JS/_forecast_Seven.js";
import FetchApi from "./JS/_getFetch.js";
import getElement from "./JS/_getElement.js";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++>
const inputName = getElement(".input_name");
const SearchSection = getElement(".input_section");
const dropDown = getElement(".dorpDown");
let CiteNames = [];
var City = "Gorgan";
// =====================================================>

// Search and AutoComplet Api
inputName.addEventListener("input", async (e) => {
  SearchSection.classList.add("Active_Form");
  if (e.target.value == "") {
    SearchSection.classList.remove("Active_Form");
  }
  let data = await FetchApi("search", e.target.value, "no");
  CiteNames = [];
  data.forEach((city) => {
    CiteNames = [
      ...CiteNames,
      { name: city.name, region: city.region, country: city.country },
    ];
    dropDown.innerHTML = "";
    CiteNames.forEach((city) => {
      dropDown.innerHTML += `<p class="drop_city">${city.name},${city.region},${city.country}</p>`;
    });
  });
});

// choising from list of City and then have INFO ..
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
async function InitData(city) {
  let data = await FetchApi("current", city, "no");
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
}

// forecast Api
async function foreCast(city) {
  let Every_3_List = [];
  let data = await FetchApi("forecast", city, "no");
  let mylist = data.forecast.forecastday[0].hour;
  Every_3_List = mylist
    .filter((Times, index) => {
      if (index % 3 === 0) {
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
            ? (time.split(" ")[1].split(":")[0] % 12) + " PM"
            : time.split(" ")[1].split(":")[0] + " AM",
      };
    });
  BuiltUI_ForeCast_Today(Every_3_List);
}

foreCast(City);
InitData(City);
foreCast_Seven(City);
