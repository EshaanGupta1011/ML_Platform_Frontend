import React, { useRef } from "react";
import { Scatter, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import {
  getScatterChartConfig,
  getHistogramChartConfig,
  getLinePlotConfig,
} from "../../ApiCalls/chartConfig.js";
import { saveAs } from "file-saver";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IrisGraphs = ({
  scatterData,
  histogramData,
  linePlotData,
  correlationMatrixData,
  feature1,
  feature2,
}) => {
  const feature1Data = scatterData?.[feature1] || [];
  const feature2Data = scatterData?.[feature2] || [];

  // Create refs for each chart type
  const scatterChartRef = useRef(null);
  const histogramChartRef = useRef(null);
  const lineChartRefs = useRef({}); // Use an object for dynamic refs
  const combinedLineChartRef = useRef(null);

  // Function to download the chart as PNG
  const saveCanvas = (chartRef, filename) => {
    if (chartRef?.current) {
      const canvas = chartRef.current.canvas; // Access the canvas element directly
      if (canvas) {
        canvas.toBlob((blob) => {
          saveAs(blob, filename); // Save the canvas as PNG using file-saver
        });
      } else {
        console.error("Canvas not found.");
      }
    } else {
      console.error("Chart reference not available.");
    }
  };

  return (
    <div className="graphs-container">
      {/* Scatter Plot */}
      {scatterData && feature1Data.length && feature2Data.length && (
        <div className="scatter-plot">
          <h3>Scatter Plot</h3>
          <Scatter
            data={getScatterChartConfig({
              feature1: feature1Data,
              feature2: feature2Data,
            })}
            ref={scatterChartRef}
          />
          <button
            className="download-button"
            onClick={() => saveCanvas(scatterChartRef, "scatter-plot.png")}
          >
            Download Scatter Plot as PNG
          </button>
        </div>
      )}

      {/* Histogram */}
      {histogramData && (
        <div className="histogram-plot">
          <h3>Histogram</h3>
          <Bar
            data={getHistogramChartConfig(histogramData)}
            ref={histogramChartRef}
          />
          <button
            className="download-button"
            onClick={() => saveCanvas(histogramChartRef, "histogram-plot.png")}
          >
            Download Histogram as PNG
          </button>
        </div>
      )}

      {/* Line Plots for Each Feature */}
      {linePlotData && (
        <div className="line-container">
          {Object.keys(linePlotData).map((feature, index) => {
            const featureData = linePlotData[feature];

            // Safeguard to ensure valid data
            if (!featureData || !Array.isArray(featureData)) {
              console.warn(
                `Feature data for ${feature} is invalid or missing.`
              );
              return null;
            }

            return (
              <div key={index} className="lineplot-graph">
                <h3>{feature} Line Plot</h3>
                <Line
                  ref={(el) => {
                    lineChartRefs.current[feature] = el;
                  }}
                  data={getLinePlotConfig({ [feature]: featureData })}
                />
                <button
                  className="download-button"
                  onClick={() =>
                    saveCanvas(
                      lineChartRefs.current[feature],
                      `${feature}-line-plot.png`
                    )
                  }
                >
                  Download {feature} Line Plot as PNG
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Combined Line Plot */}
      {linePlotData && typeof linePlotData === "object" && (
        <div className="combined-line-container">
          <h3>Combined Line Plot</h3>
          <Line
            ref={combinedLineChartRef}
            data={getLinePlotConfig(linePlotData)}
          />
          <button
            className="download-button"
            onClick={() =>
              saveCanvas(combinedLineChartRef, "combined-line-plot.png")
            }
          >
            Download Combined Line Plot as PNG
          </button>
        </div>
      )}
    </div>
  );
};

export default IrisGraphs;
