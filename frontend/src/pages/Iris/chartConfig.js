export const getScatterChartConfig = ({ feature1, feature2 }) => {
  return {
    datasets: [
      {
        label: "Scatter Plot",
        data: feature1.map((x, i) => ({
          x: x, // X-axis = feature1 values
          y: feature2[i], // Y-axis = feature2 values
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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

export const getHistogramChartConfig = (histogramData) => ({
  labels: Object.keys(histogramData),
  datasets: [
    {
      label: "Histogram Data",
      data: Object.values(histogramData),
      backgroundColor: "rgba(255, 99, 132, 0.6)",
    },
  ],
});
