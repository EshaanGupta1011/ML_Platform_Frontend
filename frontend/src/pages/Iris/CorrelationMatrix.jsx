import React, { useRef } from "react";
import html2canvas from "html2canvas";
import "./CorrelationMatrix.css";

const CorrelationMatrix = ({ data }) => {
  const matrixRef = useRef(null);

  if (!data || Object.keys(data).length === 0) {
    return <p>No data available.</p>;
  }

  const features = Object.keys(data);
  const matrix = features.map((key) => data[key]);

  const downloadMatrixAsImage = async () => {
    if (matrixRef.current) {
      const canvas = await html2canvas(matrixRef.current);
      const link = document.createElement("a");
      link.download = "correlation-matrix.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="correlation-matrix-container">
      <h2>Correlation Matrix</h2>
      <table className="correlation-matrix" ref={matrixRef}>
        <thead>
          <tr>
            <th></th>
            {features.map((feature, index) => (
              <th key={`header-${index}`}>{feature}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td>{feature}</td>
              {matrix[rowIndex].map((value, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={{
                    backgroundColor: getColorForValue(value),
                    color: Math.abs(value) > 0.5 ? "white" : "black",
                  }}
                >
                  {value.toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="download-button"
        onClick={downloadMatrixAsImage}
        style={{ marginBottom: "10px" }}
      >
        Download Correlation Matrix as PNG
      </button>
    </div>
  );
};

const getColorForValue = (value) => {
  const red = Math.round((1 - value) * 500); // Reduced the maximum intensity for darker shades
  const green = Math.round(value * 150); // Reduced the maximum intensity for darker shades
  const blue = 100; // Added a fixed blue component for depth
  return `rgb(${red}, ${green}, ${blue})`;
};

export default CorrelationMatrix;
