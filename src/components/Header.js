import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nemu">
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
