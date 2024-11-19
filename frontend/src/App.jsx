import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/Hero/Hero";
import GetStarted from "./components/GetStarted/GetStarted";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Hero />
        <GetStarted />
      </div>
    </div>
  );
};

export default App;
