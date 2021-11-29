import React from "react";
// import { useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Detail.css";

function Detail(props) {
  // записываю в переменную все элементы из localStorage
  const items = JSON.parse(localStorage.getItem("items"));
// на основе переданного айдишника обекта  , ищу его в массиве и записываю в еременную
  const thisProduct = items.find(
    (item) => item.id === props.match.params.productId
  );

  // дела десструктуризацию нужных переменных
  const { name, dataFetch } = thisProduct;
  const { temp, feels_like, humidity, pressure } = thisProduct.main;
 
  // при  запросе forecast ,получаю 48 обектов ,беру только нужные 9
  let n = 10;
  const ten = thisProduct.forecastHourly.slice(1, n);


  return (
    <div className="detail">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="detail_wrap_temp">
              <div className="detail_temp">
                <span>{Math.round(temp)}° C</span>
                <img
                  src={`http://openweathermap.org/img/wn/${thisProduct.cloud[0].icon}@2x.png`}
                  alt=""
                />
              </div>
              <div className="detail_city_wrap">
                <div className="detail_city">
                  Location: <span className="city">{name}</span>
                </div>
                <div className="detail_city">
                  Time update: <span>{dataFetch}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="weather_description_wrap">
              <div className="description_item">
                <div className="descr_icon">
                  <img src="/img/thermometer.png" alt="" />
                </div>
                <div className="descr_title">Temperature:</div>
                <div className="descr_text">
                  {Math.round(feels_like)} feels_like
                </div>
              </div>

              <div className="description_item">
                <div className="descr_icon">
                  <img src="/img/humidity.png" alt="" />
                </div>
                <div className="descr_title">Humidity:</div>
                <div className="descr_text">{humidity}%</div>
              </div>
              <div className="description_item">
                <div className="descr_icon">
                  <img src="/img/evaporation.png" alt="" />
                </div>
                <div className="descr_title">Precipitation:</div>
                <div className="descr_text">
                  {thisProduct.cloud[0].description}
                </div>
              </div>
              <div className="description_item">
                <div className="descr_icon">
                  <img src="/img/pressure-gauge.png" alt="" />
                </div>
                <div className="descr_title">Pressure:</div>
                <div className="descr_text">
                  {Math.round(pressure * 0.75)}mm
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="forecast_wrap">
              {ten.map((item, i) => {
                return (
                  <div className="forecast_card" key={i}>
                    <div className="forecast_time">
                      <div>{new Date(item.dt * 1000).getHours()} : 00</div>
                    </div>
                    <div className="forecast_icon">
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </div>
                    <div className="forecast_temp temp_update">
                      {Math.round(item.temp - 273.15)}° C
                    </div>
                    <div className="forecast_temp blue_color">
                      {item.wind_speed}m/s
                    </div>
                    <div className="forecast_temp red_color">
                      {Math.round(item.pressure * 0.75)}mm
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Detail);
