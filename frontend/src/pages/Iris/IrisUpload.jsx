import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadCSVFile, extractFeatures } from "../../ApiCalls/fetchData.js";

const IrisUpload = ({
  setCsvPath,
  setFeatures,
  setFeature1,
  setFeature2,
  setLoading,
}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }
    setLoading(true);
    try {
      const csvPath = await uploadCSVFile(file);
      setCsvPath(csvPath);
      const featureColumns = await extractFeatures(csvPath);
      if (Array.isArray(featureColumns) && featureColumns.length >= 2) {
        setFeatures(featureColumns); // Ensure features are set here
        setFeature1(featureColumns[0]); // Optionally, set the default feature1
        setFeature2(featureColumns[1] || featureColumns[0]); // Optionally, set feature2 as feature1 if only one feature exists
      } else {
        toast.error("The feature columns are not in the correct format.");
      }
      toast.success("CSV uploaded and features extracted successfully!");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-upload">
      <div className="step-text">
        <p>
          <b>Step 1:</b> Select a data .csv file
        </p>
      </div>
      <div className="step-input">
        <input
          type="file"
          accept=".csv"
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="file-upload-label">
          {fileName || "Click here to select a CSV file"}
        </label>
        <button className="iris-btn" onClick={handleUpload}>
          Upload CSV
        </button>
      </div>
    </div>
  );
};

export default IrisUpload;
