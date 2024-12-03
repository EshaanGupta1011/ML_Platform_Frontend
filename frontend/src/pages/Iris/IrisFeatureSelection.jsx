import React, { useEffect } from "react";
import { fetchScatterData, fetchHistogramData } from "./fetchData.js";
import { toast } from "react-toastify";

const IrisFeatureSelection = ({
  features,
  feature1,
  setFeature1,
  feature2,
  setFeature2,
  setScatterData,
  setHistogramData,
  csvPath,
  setLoading,
}) => {
  useEffect(() => {
    // Set default feature1 and feature2 if features array has at least two items
    if (features.length >= 2) {
      setFeature1(features[0]);
      setFeature2(features[1]);
    }
  }, [features, setFeature1, setFeature2]);

  const handleFetchData = async () => {
    if (!feature1 || !feature2) {
      toast.error("Please select both features.");
      return;
    }
    setLoading(true);
    try {
      const scatterData = await fetchScatterData(csvPath, feature1, feature2);
      console.log("Scatter Data:", scatterData); // Check what data is being returned
      if (scatterData) {
        setScatterData(scatterData);
        const histogramData = await fetchHistogramData(csvPath);
        setHistogramData(histogramData);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="step-text">
          <p>
            <b>Step 2:</b> Select features from the dropdown
          </p>
        </div>
        <div className="step-input">
          <select
            value={feature1}
            onChange={(e) => setFeature1(e.target.value)}
          >
            {features.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select
            value={feature2}
            onChange={(e) => setFeature2(e.target.value)}
          >
            {features.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <button className="iris-btn" onClick={handleFetchData}>
          Generate Graphs
        </button>
      </div>
    </div>
  );
};

export default IrisFeatureSelection;
