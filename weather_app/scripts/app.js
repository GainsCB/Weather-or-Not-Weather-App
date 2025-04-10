const cityForm = document.querySelector("form");
const cardEl = document.querySelector(".card");
const detailsEl = document.querySelector(".card-details");

const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  //   update details tempate
  detailsEl.innerHTML = `
         <h2>${cityDetails.EnglishName}</h2>
          <div>${weather.WeatherText}</div>
          <div>
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
`;


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
