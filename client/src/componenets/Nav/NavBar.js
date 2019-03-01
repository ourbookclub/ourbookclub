import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
const dizzy = {
  margin: "20px",
  color: "#79d2ae",
  fontWeight: "bold",
  fontSize: "35px"
};
const signin = {
  margin: "20px",
  fontWeight: "bold",
  fontSize: "20px"
};
const logout = {
  margin: "20px",
  fontWeight: "bold",
  fontSize: "20px"
};
const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-custom">
    <strong style={dizzy}>Dizzy Broccoli</strong>
    <Link to={"/"}>
        <strong style={signin}>Sign In</strong>
    </Link>
    <Link to={"/logout/"}>
        <strong style={logout}>Logout</strong>
    </Link>
  </nav>
);
export default Nav;