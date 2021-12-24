import React from "react";
import { Link } from "react-router-dom";
import Dark from "./Dark";
import Light from "./Light";
import './Header.css'

const Header = ({ handelThem ,them}) => {
  
  return (
    <div className="nemu">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="menu_wrap">
              <div className="menu_lay">
                <Link to="/">
                  <div className="menu_logo">
                    <img src="/img/weather-app1.png" alt="" />
                    <span>Weather App</span>
                  </div>
                </Link>
                <ul className="menu_items">
                  <li>
                    <Link to="/">Main</Link>
                  </li>
                </ul>
              </div>
              <div
                className="menu_theme"
                style={{ color: "#fff", marginLeft: "20px" }}
                onClick={handelThem}
              >
                {!them ? <Dark /> : <Light />}
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
