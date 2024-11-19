import React from "react";
import "./GetStarted.css";
import getStartedData from "../../assets/data/getStarted.js";

const GetStarted = () => {
  return (
    <div className="get-started">
      <h1 className="get-started-heading">
        Choose from various data sets specially for you!
      </h1>

      <div className="dataset-cards">
        {getStartedData.map((data, index) => (
          <div className="dataset-card" key={index}>
            <img src={data.image} alt="" />
            <h2>{data.heading}</h2>
            <p>{data.text}</p>
            <button>Click here</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetStarted;
