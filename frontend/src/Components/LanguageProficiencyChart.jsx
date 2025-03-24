"use client";

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { language: "JavaScript", value: 86, color: "#FACC15" }, // Yellow
  { language: "Java", value: 4, color: "#60A5FA" }, // Blue
  { language: "Python", value: 2, color: "#34D399" }, // Green
  { language: "CSS", value: 5, color: "#10B981" }, // Green (Different Shade)
  { language: "HTML", value: 3, color: "#EF4444" }, // Red
];

export default function StackedBarChart() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={50}>
          <BarChart layout="vertical" data={[{ name: "Languages", ...data.reduce((acc, cur) => ({ ...acc, [cur.language]: cur.value }), {}) }]}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip />
            {data.map((entry, index) => (
              <Bar key={index} dataKey={entry.language} stackId="1" barSize={20}>
                <Cell fill={entry.color} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-sm font-medium">{item.language}</span>
              <span className="text-sm text-gray-500">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
