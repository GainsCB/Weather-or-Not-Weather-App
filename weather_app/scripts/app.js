const cityForm = document.querySelector("form");
const cardEl = document.querySelector(".card");
const detailsEl = document.querySelector(".card-details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  console.log(data);

  const cityDetails = data.cityDetails;
  const weather = data.weather;

  //   update details tempate
  detailsEl.innerHTML = `
         <h3>${cityDetails.EnglishName}</h3>
          <div class="sub-title">${weather.WeatherText}</div>
          <div>
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
`;

  //  update the night/day & icon images

  const iconSrc = `imgs/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;

  if (weather.IsDayTime) {
    timeSrc = "imgs/pictures/day.svg";
  } else {
    timeSrc = "imgs/pictures/night.svg";
  }

  time.setAttribute("src", timeSrc);
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weather: weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  //  get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   update the ui with the new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
