import React from "react";

const ProgressBar = ({ value }) => (
  <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
    <div
      className="bg-blue-500 h-4 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

export default ProgressBar;
