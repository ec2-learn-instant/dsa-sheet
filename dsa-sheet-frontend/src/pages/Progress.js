import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Progress = () => {
  const [difficultyData, setDifficultyData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const difficultyColors = ["#34D399", "#FBBF24", "#F87171"];
  const statusColors = ["#10B981", "#9CA3AF"];

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/progress");
        const data = await res.json();
        setDifficultyData(data.difficultyData);
        setStatusData(data.statusData);
      } catch (err) {
        console.error("Error fetching progress data:", err);
      }
    };

    fetchProgress();
  }, []);

  const renderLabel = ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`;

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Difficulty Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
            Difficulty Level Progress
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={renderLabel}
                >
                  {difficultyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={difficultyColors[index % difficultyColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
            Task Completion Status
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={renderLabel}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={statusColors[index % statusColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
