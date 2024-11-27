import React, { useEffect, useRef } from "react";
import TypedEff from "../TypedEff/TypedEff";
import heroImg from "../../assets/photos/hero-img.png";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-flex">
        <div className="hero-text">
          <p>Your all in one application for</p>
          <TypedEff />
          <div className="hero-btn-container">
            <button className="hero-btn">Get Started</button>
          </div>
        </div>

        <div className="hero-img">
          <img src={heroImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
