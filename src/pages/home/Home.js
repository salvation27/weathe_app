import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
// import Draggable from "react-draggable";

import { getForecast, fetchWeather } from "../../api/fetchWaether";

import   "./Home.css";




function App() {
  // const [item, setItem] = useState("");
const [items, setItems] = useState(
  JSON.parse(localStorage.getItem("items")) || JSON.parse(localStorage.getItem("newItems")) ||
    []
);

const timeNow = new Date().toLocaleString();

const buttonRef  = useRef(null)

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))

    // avtoRefresh()
  }, [items]);

// const avtoRefresh = async () => {
//   await items.forEach(item=>{
//     refreshItem(item.name)
//   })
// }




  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setWeather({})
  };

  const refreshItem = async (name) => {
    let newItem = items
    // console.log("функция обновления");
    // console.log("weather", weather);
    let data = await fetchWeather(name);

    
    const {lat} = data.coord
    const { lon } = data.coord;
   
    // console.log("lat", lat);
    //  console.log("lon", lon);

    let forecast = await getForecast(lat, lon);
    // console.log("новое значение", data.main.temp_min);
    // console.log("все крточки старое", items);
    let oldEl = newItem.find((item) => item.name === name);
    //  console.log("новое значение", data.weather[0]);
    //  console.log("новое значение2", data);
    //  console.log("старое значение", oldEl.cloud[0]);

    // console.log("старое значение", oldEl.main.temp);
    // let objCopy = Object.assign({}, obj);
    // oldEl = Object.assign({}, data);
    // oldEl = data
    // console.log('старый обект',oldEl);

    oldEl.forecastHourly = forecast.data.hourly;
    oldEl.main = data.main;
    oldEl.cloud[0] = data.weather[0];
    oldEl.dataFetch = timeNow;

    setWeather(data);
    //  console.log('обновляем старый обект',oldEl);
    // localStorage.clear();
    localStorage.setItem("items", JSON.stringify(newItem));
    setItems(JSON.parse(localStorage.getItem("items")));
  };
  // const keyPres = (e) => {
  //   const code = e.keyCode || e.which
  //   if(code === 13) {
  //    newItem()
  //   }
  // }

   
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  // const [error, setError] = useState('not found');
  // const [time, setTime] = useState('');
  // const [color,setColor] = useState(false)


  const serch = async () => {
    const data = await fetchWeather(query);
    setWeather(data);
    const lat = data.coord.lat
    const lon = data.coord.lon

    console.log("lat", lat);
    console.log("lon", lon);
    const forecast = await getForecast(lat,lon);

    console.log('data',data);
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
      // setError('')
    
    } else {
      console.log("Поле ввода пустое");
    }
    setQuery("");
    // setError("");
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
                    {weather.name && <span className='found_city'> {weather.name}</span>}
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
                      <div className="card_temp">{item.main.temp}° C</div>
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
                          ref={buttonRef}
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
