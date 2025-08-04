import React from "react";

const TextAreaInput = ({ label, onChange }) => (
  <div className="space-y-1">
    <label className="font-medium text-[#115ac7]">{label}</label>
    <textarea
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded mt-1 "
      rows={3}
    ></textarea>
  </div>
);

export default TextAreaInput;
