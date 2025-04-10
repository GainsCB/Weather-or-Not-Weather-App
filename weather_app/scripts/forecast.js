// API KEY from accuweather
const key = "uevWHjr7yO4Jkk0PRVKKAqE9pNJUlAnX";

// async to make requests and return a promise


// Get Weather Information

const getWeather = async (locationId) => {
  // CurrentConditions Base URL of the API endpoint to make request to
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${locationId}?apikey=${key}`;

  // await this promise until it resolves
  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// Get City Information


const getCity = async (city) => {
  // Location Base URL of the API endpoint to make request to
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  //query parameters to add to the end of the URL
  const query = `?apikey=${key}&q=${city}`;

  // returns the promise
  const response = await fetch(base + query);
  const data = await response.json();

  // returns the closest match - [0]
  return data[0];
};

getCity("liverpool")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
