const BASE_URL = import.meta.env.VITE_BASE_URL;

export const uploadCSVFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/csv_file/upload_csv`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload CSV file");
  const data = await response.json();
  return data.absolute_file_path;
};

export const extractFeatures = async (csvPath) => {
  const response = await fetch(
    `${BASE_URL}/csv_file/extract_features?csv_file=${csvPath}`
  );
  if (!response.ok) throw new Error("Failed to extract features");
  const data = await response.json();
  return data.feature_columns; // Extracting only 'feature_columns'
};

export const fetchScatterData = async (csvPath, feature1, feature2) => {
  try {
    const response = await fetch(
      `${BASE_URL}/data_science/scatter_plot?csv_file=${csvPath}&feature1=${feature1}&feature2=${feature2}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch scatter data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching scatter data:", error);
    return null;
  }
};

export const fetchHistogramData = async (csvPath) => {
  const response = await fetch(
    `${BASE_URL}/data_science/histogram_plot?csv_file=${csvPath}`
  );
  if (!response.ok) throw new Error("Failed to fetch histogram data");
  return await response.json();
};

export const fetchLinePlotData = async (csvPath) => {
  const response = await fetch(
    `${BASE_URL}/data_science/line_plot?csv_file=${csvPath}`
  );
  if (!response.ok) throw new Error("Failed to fetch line plot data");
  return await response.json();
};

export const fetchCorrelationMatrixData = async (csvPath) => {
  const response = await fetch(
    `${BASE_URL}/data_science/correlation_matrix?csv_file=${csvPath}`
  );
  if (!response.ok) throw new Error("Failed to fetch correlation data");
  return await response.json();
};

export const fetchBoxPlotData = async (csvPath, feature1) => {
  const response = await fetch(
    `${BASE_URL}/data_science/box_plot?csv_file=${csvPath}&feature1=${feature1}`
  );
  if (!response.ok) throw new Error("Failed to fetch Box Plot Data");
  return await response.json();
};
