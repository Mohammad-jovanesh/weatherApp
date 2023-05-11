import getElement from "./_getElement.js";

export default function BuiltUI_ForeCast_Today(forecastList) {
  let ForeCastCart_Elm = forecastList
    .map((forecast) => {
      return `<div class="today_forcast_cart">
                    <p class="today_forcast_time">
                        ${forecast.time}
                    </p>
                    <img src=${forecast.icon} alt="" class="today_forcast_icon">
                    <p class="today_forcast_temp">
                        ${forecast.temp_c} <span>&#8451</span>
                    </p>
                 </div>`;
    })
    .join("");

  getElement(".today_forcast_conatiner").innerHTML = ForeCastCart_Elm;
}
