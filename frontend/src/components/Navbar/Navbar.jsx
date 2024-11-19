import React from "react";
import "./Navbar.css";
import logo from "../../assets/photos/final_logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
