// components/FileUploader.jsx

import React, { useState } from "react";

export default function FileUploader({
  label,
  multiple = false,
  files = [],
  onChange,
  onDelete,
  className = "",
}) {
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (newFiles) => {
    const fileList = Array.from(newFiles);
    if (onChange) {
      onChange(fileList);
    }
  };

  const handleDelete = (indexToDelete) => {
    if (onDelete) {
      onDelete(indexToDelete);
    }
  };

  // These handlers are now connected to the JSX below
  const handleFileChange = (event) => processFiles(event.target.files);
  const handleDragOver = (event) => event.preventDefault();
  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  };

  const boxClasses = `mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-300 ${
    isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
  }`;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-purple-700  mb-2">
        {label}
      </label>

      {/* ▼▼▼ THIS IS THE JSX FOR THE UPLOADER BOX ▼▼▼ */}
      <div
        className={boxClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={label} // Use label to link to the input
              className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
            >
              <span>Upload {multiple ? "files" : "a file"}</span>
              <input
                id={label} // Use label to ensure clicking the text opens the file dialog
                name={label}
                type="file"
                className="sr-only"
                multiple={multiple}
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PDF, DOCX, PNG, JPG up to 10MB</p>
        </div>
      </div>
      {/* ▲▲▲ END OF UPLOADER BOX JSX ▲▲▲ */}

      {/* This preview section correctly uses the `files` prop */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-600">Selected Files:</h4>
          <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
            {files.map((file, index) => (
              <li
                key={index}
                className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
              >
                <div className="w-0 flex-1 flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a3 3 0 003 3h4a3 3 0 003-3V7a3 3 0 00-3-3H8zm0 2h4a1 1 0 011 1v4a1 1 0 01-1 1H8a1 1 0 01-1-1V7a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}