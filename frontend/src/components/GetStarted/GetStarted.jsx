import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./GetStarted.css";
import getStartedData from "../../assets/data/getStarted.js";

const GetStarted = () => {
  return (
    <div id="getStarted" className="get-started">
      <h1 className="get-started-heading">
        Choose from various data sets specially for you!
      </h1>

      <div className="dataset-cards">
        {getStartedData.map((data, index) => (
          <div className="dataset-card" key={index}>
            <img src={data.image} alt={data.heading} />
            <h2>{data.heading}</h2>
            <p>{data.text}</p>
            {/* Use Link to navigate to the page */}
            <Link to={`/${data.link}`}>
              <button>Click here</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetStarted;
