import React, { useEffect } from "react";
import {
  fetchScatterData,
  fetchHistogramData,
  fetchLinePlotData,
  fetchCorrelationMatrixData,
  fetchBoxPlotData,
} from "../../ApiCalls/fetchData.js";
import { toast } from "react-toastify";

const IrisFeatureSelection = ({
  features,
  feature1,
  setFeature1,
  feature2,
  setFeature2,
  setScatterData,
  setHistogramData,
  setLinePlotData,
  setCorrelationMatrixData,
  setBoxPlotData,
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
      if (scatterData) {
        setScatterData(scatterData);
      }

      const boxPlotData = await fetchBoxPlotData(csvPath, feature1);
      if (boxPlotData) {
        setBoxPlotData(boxPlotData);
        console.log(boxPlotData);
      }

      const histogramData = await fetchHistogramData(csvPath);
      setHistogramData(histogramData);
      if (histogramData) {
        setHistogramData(histogramData);
      }

      const correlationMatrixData = await fetchCorrelationMatrixData(csvPath);
      setCorrelationMatrixData(correlationMatrixData);
      if (correlationMatrixData) {
        setCorrelationMatrixData(correlationMatrixData);
        console.log(correlationMatrixData);
      }

      const linePlotData = await fetchLinePlotData(csvPath);
      if (linePlotData) {
        setLinePlotData(linePlotData);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-feature-selection">
      <div className="feature-selection-container">
        <div className="step-text">
          <p>
            <b>Step 2:</b> Select features from the dropdown
          </p>
        </div>
        <div className="feature-input">
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
      <div className="graph-btn-container">
        <button className="graph-btn" onClick={handleFetchData}>
          Generate Graphs
        </button>
      </div>
    </div>
  );
};

export default IrisFeatureSelection;
