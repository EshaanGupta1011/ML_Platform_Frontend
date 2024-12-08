import React from "react";
import { Route, Routes } from "react-router-dom"; // Import routing components
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

// Pages
import Iris from "./pages/Iris/Iris";
// Import other pages when ready
// import LandPricePage from "./pages/LandPricePage";
// import DogCatPage from "./pages/DogCatPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/Iris" element={<Iris />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
