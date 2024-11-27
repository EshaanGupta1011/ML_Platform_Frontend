import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter, Bar } from "react-chartjs-2";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./Iris.css";
import irisImg from "../../assets/photos/iris-img.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Iris = () => {
  const [scatterData, setScatterData] = useState(null);
  const [histogramData, setHistogramData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // For displaying the selected file name
  const [csvPath, setCsvPath] = useState("");
  const [feature1, setFeature1] = useState("sepal_length");
  const [feature2, setFeature2] = useState("sepal_width");
  const [showScatter, setShowScatter] = useState(false);
  const [showHistogram, setShowHistogram] = useState(false);

  const uploadCSV = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/upload_csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload CSV file");
      }

      const data = await response.json();
      setCsvPath(data.file_path);
      toast.success(data.message); // Toast notification for success
    } catch (err) {
      setError(err.message);
      toast.error("Error uploading file."); // Toast notification for error
    } finally {
      setLoading(false);
    }
  };

  const fetchScatterData = async () => {
    if (!csvPath || !feature1 || !feature2) {
      setError("Please provide the CSV path and features.");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/scatter_plot?csv_file=${encodeURIComponent(
          csvPath
        )}&feature1=${encodeURIComponent(
          feature1
        )}&feature2=${encodeURIComponent(feature2)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch scatter plot data");
      }

      const data = await response.json();
      setScatterData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchHistogramData = async () => {
    if (!csvPath) {
      setError("Please provide the CSV path.");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/histogram_plot?csv_file=${encodeURIComponent(
          csvPath
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch histogram plot data");
      }

      const data = await response.json();
      setHistogramData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (showScatter) {
        await fetchScatterData();
      }
      if (showHistogram) {
        await fetchHistogramData();
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error generating graphs."); // Toast notification for error
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Update the file name
    } else {
      setFile(null);
      setFileName(""); // Clear the file name
    }
  };

  const scatterChartData = scatterData
    ? {
        datasets: [
          {
            label: `${feature1} vs ${feature2}`,
            data: scatterData[feature1].map((x, i) => ({
              x: x,
              y: scatterData[feature2][i],
            })),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
    : null;

  const histogramChartData = histogramData
    ? {
        labels: Object.keys(histogramData),
        datasets: [
          {
            label: "Histogram Data",
            data: Object.values(histogramData).map((val) => val.length),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      }
    : null;

  return (
    <div className="Iris">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="iris-grid">
        <div className="iris-text-container">
          <h1 className="iris-text-heading">IRIS</h1>
          <p className="iris-text-subtext">
            The Iris dataset is a classic dataset in machine learning,
            consisting of 150 samples of iris flowers with three species:
            Setosa, Versicolor, and Virginica. Each sample has four features:
            sepal length, sepal width, petal length, and petal width, all
            measured in centimeters. It is widely used for classification tasks
            and benchmarking algorithms.
          </p>
        </div>
        <div className="iris-img-container">
          <img src={irisImg} alt="" className="iris-img" />
        </div>
      </div>
      <h1 className="steps-heading">It is as easy as it can get !</h1>
      <div className="grid">
        <div className="row">
          <div className="step-text">
            <p>
              <b>Step 1:</b> Select a data .csv file
            </p>
          </div>
          <div className="step-input">
            <div className="upload-container">
              <input
                type="file"
                accept=".csv"
                className="csv-input"
                style={{ display: "none" }}
                id="file-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="file-upload-label">
                {fileName || "Click here to select a CSV file"}
              </label>
              <button className="iris-btn" onClick={uploadCSV}>
                Upload CSV
              </button>
            </div>
          </div>
        </div>
        {csvPath && (
          <>
            <div className="row">
              <div className="step-text">
                <p>
                  <b>Step 2:</b> Select features from the drop-down menu
                </p>
              </div>
              <div className="step-input">
                <div className="iris-inputs-select-field">
                  <select
                    value={feature1}
                    onChange={(e) => setFeature1(e.target.value)}
                  >
                    <option value="sepal_length">Sepal Length</option>
                    <option value="sepal_width">Sepal Width</option>
                    <option value="petal_length">Petal Length</option>
                    <option value="petal_width">Petal Width</option>
                  </select>
                  <select
                    value={feature2}
                    onChange={(e) => setFeature2(e.target.value)}
                  >
                    <option value="sepal_length">Sepal Length</option>
                    <option value="sepal_width">Sepal Width</option>
                    <option value="petal_length">Petal Length</option>
                    <option value="petal_width">Petal Width</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="step-text">
                <p>
                  <b>Step 3:</b> Choose the graph(s) to display
                </p>
              </div>
              <div className="step-input">
                <div className="checkboxes-container">
                  <label>
                    <input
                      type="checkbox"
                      checked={showScatter}
                      onChange={(e) => setShowScatter(e.target.checked)}
                    />
                    Scatter Plot
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={showHistogram}
                      onChange={(e) => setShowHistogram(e.target.checked)}
                    />
                    Histogram Plot
                  </label>
                  <div className="generate-btn-container">
                    <button className="iris-btn" onClick={handleFetchData}>
                      Generate Graphs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="graphs-container">
        {scatterData && (
          <div className="scatter-container">
            <h3 className="graph-heading">Scatter Plot</h3>
            <Scatter data={scatterChartData} />
          </div>
        )}
        {histogramData && (
          <div className="histogram-container">
            <h3 className="graph-heading">Histogram</h3>
            <Bar data={histogramChartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Iris;
