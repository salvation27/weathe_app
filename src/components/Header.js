import React from "react";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
  return (
    <div className="nemu">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="menu_wrap">
              <Link to="/">
                <div className="menu_logo">
                  <img src="/img/weather-app1.png" alt="" />
                  <span>Weather App</span>
                </div>
              </Link>
              <ul className='menu_items'>
                <li>
                  <Link to="/">Main</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
