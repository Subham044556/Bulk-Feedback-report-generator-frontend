// App.js

import React, { useState } from "react";
import axios from "axios";

// Import custom components
import FileUploader from "./components/FileUploader.jsx";
import DropdownSelect from "./components/DropdownSelect.jsx";
import TextAreaInput from "./components/TextAreaInput.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import SummaryTable from "./components/SummaryTable.jsx";

const API_URL = "http://127.0.0.1:8000/upload/";

export default function App() {
  const [studentFiles, setStudentFiles] = useState([]);
  const [assignmentBrief, setAssignmentBrief] = useState(null);
  const [assignmentType, setAssignmentType] = useState("Essay");
  const [gradingIntensity, setGradingIntensity] = useState("Balanced");
  const [customCategories, setCustomCategories] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [outputFormat, setOutputFormat] = useState("PDF");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    setProgress(0);
    setSummary([]);
    setError("");

    const formData = new FormData();
    studentFiles.forEach((file) => formData.append("student_files", file));
    formData.append("assignment_brief", assignmentBrief);
    formData.append("assignment_type", assignmentType);
    formData.append("grading_intensity", gradingIntensity);
    formData.append("custom_categories", customCategories);
    formData.append("additional_notes", additionalNotes);
    formData.append("output_format", outputFormat);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      setSummary(response.data.summary);
    } catch (err) {
      console.error("Error uploading files:", err);
      setError(
        "Failed to upload files. Please check the server and try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleStudentFilesChange = (newFiles) => {
    setStudentFiles((prevFiles) => {
      const allFiles = [...prevFiles, ...newFiles];
      const uniqueFilesMap = new Map();
      allFiles.forEach((file) => uniqueFilesMap.set(file.name, file));
      return Array.from(uniqueFilesMap.values());
    });
  };

  // Handler for deleting a student file by its index
  const handleStudentFileDelete = (indexToDelete) => {
    setStudentFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };

  // Handler for the assignment brief (it's simpler)
  const handleBriefChange = (newFiles) => {
    // Take only the first file if multiple are dropped
    setAssignmentBrief(newFiles.length > 0 ? newFiles[0] : null);
  };

  const handleBriefDelete = () => {
    setAssignmentBrief(null);
  };


  return (
    // Responsive container for the whole page
    <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center p-4  sm:p-6 lg:p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6 "
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-8 top-name">
          Bulk Feedback Report Generator
        </h1>

        <FileUploader
          label="Upload Student Submissions"
          multiple
          files={studentFiles} // <-- Pass state down
          onChange={handleStudentFilesChange} // <-- Use new add handler
          onDelete={handleStudentFileDelete} // <-- Use new delete handler
          className="mb-3"
          labelClassName="text-purple-700 font-bold"
        />

        <FileUploader
          label="Upload Assignment Brief / Prompt"
          // We pass an array so the uploader can always use .map()
          files={assignmentBrief ? [assignmentBrief] : []} // <-- Pass state down
          onChange={handleBriefChange} // <-- Use new add handler
          onDelete={handleBriefDelete} // <-- Use new delete handler
          className="mb-3"
          labelClassName="text-purple-700 font-bold"
        />

        {/* Grid for smaller inputs to sit side-by-side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DropdownSelect
            label="Assignment Type"
            options={[
              "Essay",
              "Worksheet",
              "Creative Writing",
              "Science Lab Report",
              "Math Problem Solving",
            ]}
            value={assignmentType}
            onChange={(val) => setAssignmentType(val)}
          />
          <DropdownSelect
            label="Grading Intensity"
            options={["Light", "Balanced", "In-Depth"]}
            value={gradingIntensity}
            onChange={(val) => setGradingIntensity(val)}
          />
        </div>

        <TextAreaInput
          label="Custom Evaluation Categories (Optional)"
          value={customCategories}
          onChange={(val) => setCustomCategories(val)}
        />

        <TextAreaInput
          label="Additional Notes for Evaluator (Optional)"
          value={additionalNotes}
          onChange={(val) => setAdditionalNotes(val)}
        />

        <DropdownSelect
          label="Output Format"
          options={["PDF", "Word"]}
          value={outputFormat}
          onChange={(val) => setOutputFormat(val)}
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full text-lg font-semibold py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:bg-blue-300"
        >
          {uploading
            ? `Processing... ${progress}%`
            : "Start Feedback Generation"}
        </button>

        {uploading && (
          <div className="pt-2">
            <ProgressBar value={progress} />
          </div>
        )}
        {error && (
          <p className="text-red-500 text-center font-medium pt-2">{error}</p>
        )}
        {!uploading && summary.length > 0 && (
          <div className="pt-4">
            <SummaryTable data={summary} />
          </div>
        )}
      </form>
    </div>
  );
}
