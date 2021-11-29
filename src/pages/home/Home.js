import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";

import { getForecast, fetchWeather } from "../../api/fetchWaether";

import "./Home.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // записываю пустой массив в переменную , если  localStorage пустой
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) ||
      JSON.parse(localStorage.getItem("newItems")) ||
      []
  );

  const timeNow = new Date().toLocaleString();

// Rerender страницы зависит от переменной items
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

// ф-ия получения карточки погоды
  const serch = async () => {
    const data = await fetchWeather(query);
    setWeather(data);
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    console.log("lat", lat);
    console.log("lon", lon);
    const forecast = await getForecast(lat, lon);

    console.log("data", data);
    console.log("forecast", forecast.data.hourly);

    const { main, name } = data;
    if (data) {
      const newItem = {
        id: uuidv4(),
        main: main,
        code: data.cod,
        dataFetch: timeNow,
        name: name,
        cloud: data.weather,
        forecastHourly: forecast.data.hourly,
        color: randomColor({
          luminosity: "dark",
          format: "rgba",
          alpha: 0.8,
        }),
      };
      setItems((items) => [...items, newItem]);
    } else {
      console.log("Поле ввода пустое");
    }
    setQuery("");
  };
// ф-ия обновления карточки погоды
  const refreshItem = async (name) => {
    let newItem = items;

    let data = await fetchWeather(name);

    const { lat } = data.coord;
    const { lon } = data.coord;

    let forecast = await getForecast(lat, lon);

    let oldEl = newItem.find((item) => item.name === name);

    oldEl.forecastHourly = forecast.data.hourly;
    oldEl.main = data.main;
    oldEl.cloud[0] = data.weather[0];
    oldEl.dataFetch = timeNow;

    setWeather(data);

    localStorage.setItem("items", JSON.stringify(newItem));
    setItems(JSON.parse(localStorage.getItem("items")));
  };
  // ф-ия удаления карточки погоды
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setWeather({});
  };

  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="wrapper">
              <div className="wrapper_wether_serch">
                <h1>Weather App</h1>
                <div className="wether_serch_button"></div>
                <input
                  type="text"
                  className="serch"
                  placeholder="Enter city...."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={serch}>Load</button>
                {weather && (
                  <div className="city_result">
                    Found a city:
                    {weather.name && (
                      <span className="found_city"> {weather.name}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="wrapper_list">
                {items.map((item) => {
                  return (
                    <div
                      className="card_item"
                      key={item.id}
                      style={{ backgroundColor: item.color }}
                    >
                      <div className="card_name">{item.name}</div>
                      <div className="card_temp">
                        {Math.round(item.main.temp)}° C
                      </div>
                      <div className="card_sky">{item.cloud[0].main}</div>
                      <div className="card_min_max">
                        {item.main.temp_min}(min)/
                        {item.main.temp_max}(max)
                      </div>
                      <div className="card_icon">
                        <img
                          src={`http://openweathermap.org/img/wn/${item.cloud[0].icon}@2x.png`}
                          alt=""
                        />
                      </div>
                      <button
                        className="delete_card"
                        onClick={() => deleteItem(item.id)}
                      >
                        X
                      </button>
                      <Link to={`/weathers/${item.id}`}>
                        <button className="card_detail">Detail</button>
                      </Link>
                      <div className="card_data">
                        <div className="card_time">{item.dataFetch}</div>
                        <button
                          className="refresh_btn"
                          onClick={() => refreshItem(item.name)}
                        >
                          <img
                            className="refresh_icon"
                            src="./refresh.png"
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
