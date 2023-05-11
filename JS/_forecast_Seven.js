import getElement from "./_getElement.js";
import DateFormate from "./_dateFormat.js";
export default function foreCast_Seven(city) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=298619e6973f4992b1e153252231005&q=${city}&days=7&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.forecast.forecastday);
      let Seven_forecast_list = data.forecast.forecastday.map((item) => {
        let {
          date,
          day: {
            maxtemp_c,
            mintemp_c,
            condition: { icon },
          },
        } = item;
        return { date, maxtemp_c, mintemp_c, icon };
      });
      console.log(Seven_forecast_list);
      getElement(".weather_forecast_flexBox").innerHTML =
        Seven_forecast_list.map((elm) => {
          return `<div class="weather_forecast_cart">
                <p class="weather_forecast_cart_date">
                    ${elm.date}
                </p>
                <div class="weather_forecast_cart_image">
                    <img src=${elm.icon} alt="" class="weather_forecast_cart_icon">
                    
                </div>
                <p class="weather_forecast_cart_temp">
                    ${elm.maxtemp_c} / ${elm.mintemp_c}
                </p>
            </div>`;
        }).join("");
    });
}
