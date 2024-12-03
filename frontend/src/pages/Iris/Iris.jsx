import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IrisUpload from "./IrisUpload";
import IrisFeatureSelection from "./IrisFeatureSelection";
import IrisGraphs from "./IrisGraphs";
import "./Iris.css";
import irisImg from "../../assets/photos/iris-img.png";

const Iris = () => {
  const [csvPath, setCsvPath] = useState("");
  const [features, setFeatures] = useState([]);
  const [feature1, setFeature1] = useState("");
  const [feature2, setFeature2] = useState("");
  const [scatterData, setScatterData] = useState(null);
  const [histogramData, setHistogramData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Automatically set feature1 and feature2 when features are populated
  useEffect(() => {
    if (features.length >= 2) {
      setFeature1(features[0]);
      setFeature2(features[1]);
    }
  }, [features]); // This will run whenever features is updated

  return (
    <div className="Iris">
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <div className="iris-grid">
        <div className="iris-text-container">
          <h1 className="iris-text-heading">IRIS</h1>
          <p className="iris-text-subtext">
            The Iris dataset is a classic dataset in machine learning...
          </p>
        </div>
        <div className="iris-img-container">
          <img src={irisImg} alt="Iris" className="iris-img" />
        </div>
      </div>
      <h1 className="steps-heading">It is as easy as it can get!</h1>
      <div className="grid">
        <IrisUpload
          setCsvPath={setCsvPath}
          setFeatures={setFeatures}
          setFeature1={setFeature1}
          setFeature2={setFeature2}
          setLoading={setLoading}
        />
        {csvPath && (
          <IrisFeatureSelection
            features={features}
            feature1={feature1}
            setFeature1={setFeature1}
            feature2={feature2}
            setFeature2={setFeature2}
            setScatterData={setScatterData}
            setHistogramData={setHistogramData}
            csvPath={csvPath}
            setLoading={setLoading}
          />
        )}
      </div>
      {loading && <p>Loading...</p>}
      <IrisGraphs
        scatterData={scatterData}
        histogramData={histogramData}
        feature1={feature1}
        feature2={feature2}
      />
    </div>
  );
};

export default Iris;
