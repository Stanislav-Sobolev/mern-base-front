import React from "react";
import { NavLink } from "react-router-dom";

import { User } from "../../components/Elements";

import logo from "../../asset/img/logo_mini.jpg";

import classes from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav>
      <div className={classes.wrapNav}>
        <img src={logo} alt="logo golden platform" height="30px" />
        <ul className={classes.linksWpar}>
          <li>
            <NavLink to="/create">Конструктор цели</NavLink>
          </li>
          <li>
            <NavLink to="/goals">Цели</NavLink>
          </li>
        </ul>
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
