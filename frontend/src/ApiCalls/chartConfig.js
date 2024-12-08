export const getScatterChartConfig = ({ feature1, feature2 }) => {
  return {
    datasets: [
      {
        label: "Scatter Plot",
        data: feature1.map((x, i) => ({
          x: x, // X-axis = feature1 values
          y: feature2[i], // Y-axis = feature2 values
        })),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
    options: {
      scales: {
        x: {
          type: "linear", // Linear scale for feature1 values
          position: "bottom",
        },
        y: {
          type: "linear", // Linear scale for feature2 values
        },
      },
    },
  };
};

export const getHistogramChartConfig = (histogramData) => {
  // Create datasets for each feature
  const datasets = Object.keys(histogramData).map((key) => ({
    label: key,
    data: histogramData[key], // Assuming histogramData[key] is an array
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
  }));

  return {
    labels: Object.keys(histogramData), // Assuming keys are the labels
    datasets: datasets,
  };
};

// Updated getLinePlotConfig to generate line plots dynamically for all features
export const getLinePlotConfig = (data) => {
  const datasets = Object.keys(data).map((feature) => {
    const values = data[feature] || [];
    const labels = values.map((_, index) => index + 1); // Use index for X-axis labels

    return {
      label: feature, // Feature name as the label
      data: values, // Y-axis values (feature values)
      borderColor: `rgb(
        ${Math.floor(Math.random() * 128 + 128)}, 
        ${Math.floor(Math.random() * 128 + 128)}, 
        ${Math.floor(Math.random() * 128 + 128)}
      )`, // Bright random color for each line

      borderWidth: 1,
      fill: false, // Don't fill the area under the line
    };
  });

  return {
    labels:
      Object.keys(data).length > 0
        ? data[Object.keys(data)[0]].map((_, index) => index + 1) // X-axis labels based on the first feature
        : [],
    datasets, // Dynamically generated datasets for each feature
  };
};
