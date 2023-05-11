export default function DateFormate(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const myDate = new Date(date);
  let weekName = daysOfWeek[myDate.getUTCDay()];
  let monthNumber = myDate.getUTCDate();
  let monthName = months[myDate.getUTCMonth()];
  let year = myDate.getUTCFullYear();
  console.log(myDate.getHours());
  return `<span>
  ${weekName} , ${monthNumber} , ${monthName} ,${year} </span>`;
}
