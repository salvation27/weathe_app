import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather"; 
// const API_key = "2daede86c6d3922180bb9aeeb97717eb";
const API_key = "8d25ed1420f8f1a60e8c585cf60c7834";

export const fetchWeather = async (query) => {
 const { data } = await axios.get(URL, {
   params: {
     q: query,
     units: 'metric',
     appid: API_key,
   }
 })
 return data
}

export const getForecast =  (lat,lon) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_key}`
  );
};