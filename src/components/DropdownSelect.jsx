import React from "react";

const DropdownSelect = ({ label, options, onChange }) => (
  <div className="space-y-1 ">
    <label className="font-medium text-[#115ac7]">{label}</label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className=" mt-1 w-full border rounded p-2 "
      defaultValue=""
    >
      <option  value="" disabled>Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default DropdownSelect;
