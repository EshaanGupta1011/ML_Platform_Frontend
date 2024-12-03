import React from "react";
import { Scatter, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getScatterChartConfig,
  getHistogramChartConfig,
} from "./chartConfig.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IrisGraphs = ({ scatterData, histogramData, feature1, feature2 }) => {
  console.log("Feature 1: ", feature1); // Log feature1 to check its value
  console.log("Feature 2: ", feature2); // Log feature2 to check its value

  // Ensure that scatterData contains the correct feature data
  const feature1Data = scatterData?.[feature1] || [];
  const feature2Data = scatterData?.[feature2] || [];

  console.log("Feature 1 Data: ", feature1Data);
  console.log("Feature 2 Data: ", feature2Data);

  return (
    <div className="graphs-container">
      {scatterData && feature1Data.length && feature2Data.length && (
        <div>
          <h3>Scatter Plot</h3>
          <Scatter
            data={getScatterChartConfig({
              feature1: feature1Data,
              feature2: feature2Data,
            })}
          />
        </div>
      )}
      {histogramData && (
        <div>
          <h3>Histogram</h3>
          <Bar data={getHistogramChartConfig(histogramData)} />
        </div>
      )}
    </div>
  );
};

export default IrisGraphs;
