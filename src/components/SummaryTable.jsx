import React from "react";

const SummaryTable = ({ data }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">Feedback Summary</h2>
    <div className="overflow-auto">
      <table className="w-full border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Roll No.</th>
            <th className="border px-4 py-2">Assignment Type</th>
            <th className="border px-4 py-2">Summary</th>
            <th className="border px-4 py-2">Strengths</th>
            <th className="border px-4 py-2">Areas of Improvement</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-sm">
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.roll}</td>
              <td className="border px-4 py-2">{row.type}</td>
              <td className="border px-4 py-2">{row.summary}</td>
              <td className="border px-4 py-2">{row.strengths}</td>
              <td className="border px-4 py-2">{row.improvements}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SummaryTable;
