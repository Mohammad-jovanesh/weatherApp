import getElement from "./_getElement.js";

export default function ShowCurrent(
  cityName,
  cityRegion,
  cityCountry,
  dateFormat,
  temp_c,
  icon,
  feels,
  wind,
  humidity,
  uv
) {
  getElement(".city_name").innerHTML = cityName;
  getElement(".country_name").innerHTML = `${cityRegion},${cityCountry}`;
  getElement(".today_Date").innerHTML = dateFormat;
  getElement(".Temp_c").innerHTML = `${temp_c} <span>&#8451</span>`;
  getElement(".icon_weather").src = icon;
  getElement(".uv_index").textContent = uv;
  getElement(".humidity").textContent = `${humidity} %`;
  getElement(".Wind_speed").textContent = `${wind} km/h`;
  getElement(".fleels_like").innerHTML = `${feels} &#8451`;
}
