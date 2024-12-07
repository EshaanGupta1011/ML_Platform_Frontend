import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import html2canvas from "html2canvas"; // Import html2canvas
import "./boxPlot.css";

const BoxPlot = ({ data }) => {
  const boxPlotRef = useRef(null);

  useEffect(() => {
    // Check if data is available and is an array of features
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
      console.error("Invalid data for box plots");
      return;
    }

    // Clear previous content
    const svg = d3.select(boxPlotRef.current);
    svg.selectAll("*").remove();

    // Set margins and size for the box plot
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create a group element for each feature's box plot
    Object.keys(data).forEach((feature, index) => {
      const featureData = data[feature];

      if (!Array.isArray(featureData) || featureData.length === 0) return;

      const sortedData = featureData.sort(d3.ascending);
      const min = d3.min(sortedData);
      const max = d3.max(sortedData);
      const q1 = d3.quantile(sortedData, 0.25);
      const median = d3.quantile(sortedData, 0.5);
      const q3 = d3.quantile(sortedData, 0.75);
      const iqr = q3 - q1;
      const lowerBound = Math.max(min, q1 - 1.5 * iqr);
      const upperBound = Math.min(max, q3 + 1.5 * iqr);

      const g = svg
        .attr("width", width + margin.left + margin.right)
        .attr(
          "height",
          (height + margin.top + margin.bottom) * Object.keys(data).length
        )
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left},${
            margin.top + index * (height + margin.top + margin.bottom)
          })`
        );

      // Scale for X and Y axis
      const x = d3.scaleBand().range([0, width]).domain([feature]).padding(0.5);
      const y = d3
        .scaleLinear()
        .domain([min - 1, max + 1])
        .range([height, 0]);

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
      g.append("g").call(d3.axisLeft(y));

      // Box
      g.append("rect")
        .attr("x", x(feature))
        .attr("y", y(q3))
        .attr("width", x.bandwidth())
        .attr("height", y(q1) - y(q3))
        .attr("fill", "#69b3a2");

      // Median Line
      g.append("line")
        .attr("x1", x(feature))
        .attr("x2", x(feature) + x.bandwidth())
        .attr("y1", y(median))
        .attr("y2", y(median))
        .attr("stroke", "white");

      // Whiskers (lines from Q1 to Min and Q3 to Max)
      g.append("line")
        .attr("x1", x(feature) + x.bandwidth() / 2)
        .attr("x2", x(feature) + x.bandwidth() / 2)
        .attr("y1", y(lowerBound))
        .attr("y2", y(q1))
        .attr("stroke", "white");

      g.append("line")
        .attr("x1", x(feature) + x.bandwidth() / 2)
        .attr("x2", x(feature) + x.bandwidth() / 2)
        .attr("y1", y(upperBound))
        .attr("y2", y(q3))
        .attr("stroke", "white");

      // Outliers
      sortedData.forEach((d) => {
        if (d < lowerBound || d > upperBound) {
          g.append("circle")
            .attr("cx", x(feature) + x.bandwidth() / 2)
            .attr("cy", y(d))
            .attr("r", 3)
            .attr("fill", "orange");
        }
      });
    });
  }, [data]);

  // Function to download the SVG as a PNG using html2canvas
  const downloadBoxPlot = () => {
    const svgElement = boxPlotRef.current;

    // Create a canvas element to draw the SVG onto
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Get the SVG's bounding box to set the canvas size
    const boundingBox = svgElement.getBoundingClientRect();
    canvas.width = boundingBox.width;
    canvas.height = boundingBox.height;

    // Create an SVG to Image converter using D3 and draw it onto the canvas
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();

    // Convert the SVG string into a data URL
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Draw the image onto the canvas once it has loaded
      context.drawImage(img, 0, 0);

      // Convert the canvas content to a PNG data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "box-plots.png";
      link.click();
    };

    // Set the image source to the SVG data URL
    img.src = url;
  };

  return (
    <div>
      <h3>Box Plots for All Features</h3>
      <div className="box-plot-container">
        <svg ref={boxPlotRef}></svg>
      </div>
      <button className="download-button" onClick={downloadBoxPlot}>
        Download Box Plots as PNG
      </button>
    </div>
  );
};

export default BoxPlot;
