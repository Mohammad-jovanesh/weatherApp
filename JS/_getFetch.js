export default async function FetchApi(typeApi, city, aqi, days = 1) {
  let ApiKey = "298619e6973f4992b1e153252231005";
  let URL = `http://api.weatherapi.com/v1/${typeApi}.json?key=${ApiKey}`;
  const controller = new AbortController();
  //api.weatherapi.com/v1/current.json?key=298619e6973f4992b1e153252231005&q=${city}&aqi=yes
  if (typeApi == "current") {
    URL = `${URL}&q=${city}&aqi=${aqi}`;
  } else if (typeApi == "forecast") {
    URL = `${URL}&q=${city}&days=${days}&aqi=${aqi}`;
  } else if (typeApi == "search") {
    URL = `${URL}&q=${city}`;
  }
  try {
    let resposne = await fetch(URL, { signal: controller.signal });
    let data = await resposne.json();
    if (resposne.ok) {
      return data;
    }
  } catch (err) {
    throw new Error(err);
  }
  controller.abort();
}
