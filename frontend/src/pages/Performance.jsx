import React from "react";
import {
  Activity,
  Truck,
  Fuel,
  AlertTriangle,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ---------------- KPI DATA ---------------- */
const kpis = [
  {
    title: "Fleet Utilization",
    value: "87%",
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50",
  },
  {
    title: "Active Vehicles",
    value: "42 / 50",
    icon: <Truck className="w-6 h-6 text-green-600" />,
    bg: "bg-green-50",
  },
  {
    title: "Fuel Mileage",
    value: "6.4 km/l",
    icon: <Fuel className="w-6 h-6 text-yellow-600" />,
    bg: "bg-yellow-50",
  },
  {
    title: "Open Alerts",
    value: "9",
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    bg: "bg-red-50",
  },
];

/* ---------------- CHART DATA ---------------- */
const tripsData = [
  { day: "Mon", trips: 32 },
  { day: "Tue", trips: 45 },
  { day: "Wed", trips: 38 },
  { day: "Thu", trips: 50 },
  { day: "Fri", trips: 47 },
  { day: "Sat", trips: 28 },
  { day: "Sun", trips: 20 },
];

const fuelData = [
  { vehicle: "V001", fuel: 65 },
  { vehicle: "V002", fuel: 58 },
  { vehicle: "V003", fuel: 72 },
  { vehicle: "V004", fuel: 61 },
  { vehicle: "V005", fuel: 55 },
];

const activityData = [
  { name: "Driving", value: 55 },
  { name: "Idle", value: 25 },
  { name: "Maintenance", value: 12 },
  { name: "Offline", value: 8 },
];

const COLORS = ["#2563eb", "#facc15", "#22c55e", "#ef4444"];

/* ---------------- PAGE ---------------- */
const Performance = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <Activity className="w-7 h-7 text-blue-600" />
        Fleet Performance Overview
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow bg-white flex items-center justify-between`}
          >
            <div>
              <p className="text-sm text-gray-500">{kpi.title}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${kpi.bg}`}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trips Trend */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Weekly Trips Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tripsData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="trips"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Consumption */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Fuel className="w-5 h-5 text-yellow-500" />
            Fuel Consumption by Vehicle
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fuelData}>
              <XAxis dataKey="vehicle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fuel" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fleet Activity Distribution */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            Fleet Activity Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {activityData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-4">
            Performance Insights
          </h2>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li>• Fleet utilization remains above industry average</li>
            <li>• Fuel efficiency improved by 6% this month</li>
            <li>• Alert frequency reduced compared to last week</li>
            <li>• Peak trip activity observed on Thursdays</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Performance;
