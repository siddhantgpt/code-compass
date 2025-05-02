import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getDashboardData } from "../services/api";

interface DashboardData {
  problemsCompleted: number;
  totalProblems: number;
  topicsMastered: number;
  lastTopic: string | null;
  lastTopicCategory: string | null;
  lastTopicCompletionPercent: number;
  topicWiseCompletion: {
    topic: string;
    completed: number;
    total: number;
  }[];
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        const dashboard = res.data;

        // Filter out topics with no data
        dashboard.topicWiseCompletion = dashboard.topicWiseCompletion.filter(
          (entry: { total: number }) => entry.total > 0
        );

        setData(dashboard);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!data) return <div className="text-center mt-10">No data available.</div>;

  const progressPercent =
    data.totalProblems > 0
      ? Math.round((data.problemsCompleted / data.totalProblems) * 100)
      : 0;

  const barChartData = data.topicWiseCompletion.map((item) => ({
    topic: item.topic,
    completed: item.completed,
    remaining: item.total - item.completed,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
      <p className="mb-6 text-gray-600">
        Track your learning journey and progress
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Problems Completed</h2>
          <p className="text-2xl font-bold">
            {data.problemsCompleted} / {data.totalProblems}
          </p>
          <div className="mt-2 w-full h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Topics Mastered</h2>
          <p className="text-2xl font-bold">
            {data.topicsMastered} / {data.topicWiseCompletion.length}
          </p>
          <div className="mt-2 w-full h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-purple-600 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (data.topicsMastered / data.topicWiseCompletion.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Last Topic</h2>
          <p>
            {data.lastTopic} ({data.lastTopicCategory})
          </p>
          <p className="text-sm text-gray-600">
            {data.lastTopicCompletionPercent}% completed
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Topic-wise Progress</h2>
        {barChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              stackOffset={"sign"}
              barCategoryGap={"20%"}
              barGap={4}
            >
              <XAxis dataKey="topic" tick={{ fill: "#4B5563", fontSize: 12 }} />
              <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} problems`,
                  name,
                ]}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "#6B7280" }} />
              <Bar
                dataKey="completed"
                stackId="a"
                fill="#4F46E5"
                name="Completed"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
              />
              <Bar
                dataKey="remaining"
                stackId="a"
                fill="#F87171"
                name="Remaining"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No topic data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
