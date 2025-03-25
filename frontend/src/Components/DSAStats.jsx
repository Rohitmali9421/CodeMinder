import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const DSAStats = ({ easy, medium, hard }) => {
  const total = easy + medium + hard;

  const data = [
    { name: "Easy", value: easy, color: "#22c55e" }, // Green
    { name: "Medium", value: medium, color: "#facc15" }, // Yellow
    { name: "Hard", value: hard, color: "#ef4444" }, // Red
  ];

  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-md">
      {/* Pie Chart */}
      <div className="relative">
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={45}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {total}
        </div>
      </div>

      {/* Problem Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-600">
          DSA Problems Solved
        </h3>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-green-600 font-medium">Easy</span>
            <span className="font-semibold">{easy}</span>
          </div>
          <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-yellow-600 font-medium">Medium</span>
            <span className="font-semibold">{medium}</span>
          </div>
          <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-red-600 font-medium">Hard</span>
            <span className="font-semibold">{hard}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAStats;
