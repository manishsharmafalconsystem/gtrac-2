import React, { useState } from "react";
import {
  Truck,
  Users,
  ClipboardList,
  AlertCircle,
  BarChart2,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ---------------- Sample Data ---------------- */
const kpiData = [
  {
    title: "Total Vehicles",
    value: 25,
    change: "+3",
    icon: <Truck className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50",
    detail: "5 vehicles added this month",
  },
  {
    title: "Active Trips",
    value: 8,
    change: "-1",
    icon: <ClipboardList className="w-6 h-6 text-green-600" />,
    bg: "bg-green-50",
    detail: "1 trip delayed today",
  },
  {
    title: "Drivers",
    value: 12,
    change: "+2",
    icon: <Users className="w-6 h-6 text-yellow-600" />,
    bg: "bg-yellow-50",
    detail: "2 new drivers onboarded",
  },
  {
    title: "Active Alerts",
    value: 5,
    change: "+2",
    icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    bg: "bg-red-50",
    detail: "Speed alerts increased",
  },
  {
    title: "Upcoming Maintenance",
    value: 3,
    change: "0",
    icon: <Activity className="w-6 h-6 text-purple-600" />,
    bg: "bg-purple-50",
    detail: "Oil change scheduled for 2 vehicles",
  },
];

const lineChartData = [
  { name: "Mon", trips: 4 },
  { name: "Tue", trips: 6 },
  { name: "Wed", trips: 3 },
  { name: "Thu", trips: 5 },
  { name: "Fri", trips: 7 },
  { name: "Sat", trips: 4 },
  { name: "Sun", trips: 6 },
];

const barChartData = [
  { name: "V001", maintenance: 2 },
  { name: "V002", maintenance: 1 },
  { name: "V003", maintenance: 3 },
  { name: "V004", maintenance: 1 },
];

const pieChartData = [
  { name: "Completed", value: 12, color: "#22c55e" },
  { name: "In Progress", value: 5, color: "#facc15" },
  { name: "Delayed", value: 3, color: "#ef4444" },
];

const recentTrips = [
  { vehicle: "V001", driver: "John Doe", status: "Completed", date: "2026-01-01" },
  { vehicle: "V005", driver: "Jane Smith", status: "In Progress", date: "2026-01-02" },
  { vehicle: "V003", driver: "Mark Lee", status: "Delayed", date: "2026-01-03" },
  { vehicle: "V004", driver: "Alice Brown", status: "Completed", date: "2026-01-04" },
];

const alertsList = [
  { vehicle: "V001", message: "Overspeed detected", severity: "high" },
  { vehicle: "V002", message: "Delayed trip", severity: "medium" },
  { vehicle: "V003", message: "Maintenance due", severity: "low" },
];

/* ---------------- Dashboard Component ---------------- */
const Dashboard = () => {
  const [tripData, setTripData] = useState(recentTrips);

  const sortTrips = () => {
    const sorted = [...tripData].sort((a, b) => a.status.localeCompare(b.status));
    setTripData(sorted);
  };

  return (
    <div className="min-h-screen p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Fleet Manager Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {kpiData.map((kpi, idx) => (
          <div
            key={idx}
            className={`flex flex-col p-4 rounded-xl shadow-md ${kpi.bg} hover:shadow-xl transition cursor-pointer`}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-white rounded-full">{kpi.icon}</div>
              <h3 className="text-gray-700 font-semibold text-sm">{kpi.title}</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
            <p
              className={`text-xs mt-1 ${
                kpi.change.startsWith("+")
                  ? "text-green-600"
                  : kpi.change.startsWith("-")
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {kpi.change} change
            </p>
            <p className="text-gray-500 text-xs mt-1">{kpi.detail}</p>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Line Chart - Weekly Trips */}
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" /> Weekly Trips
          </h2>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={lineChartData}>
              <Line type="monotone" dataKey="trips" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 4 }} />
              <Tooltip />
              <Legend verticalAlign="top" height={20} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Vehicle Maintenance */}
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" /> Maintenance Status
          </h2>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={barChartData}>
              <Bar dataKey="maintenance" fill="#8b5cf6" barSize={16} />
              <Tooltip />
              <Legend verticalAlign="top" height={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Trip Status */}
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-teal-600" /> Trip Status
          </h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                innerRadius={25}
                outerRadius={55}
                paddingAngle={5}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="top" height={20} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Trips & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" /> Recent Trips
            <button
              onClick={sortTrips}
              className="ml-auto text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded cursor-pointer"
            >
              Sort by Status
            </button>
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-gray-600">Vehicle</th>
                  <th className="px-2 py-1 text-gray-600">Driver</th>
                  <th className="px-2 py-1 text-gray-600">Status</th>
                  <th className="px-2 py-1 text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {tripData.map((trip, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50 cursor-pointer transition">
                    <td className="px-2 py-1">{trip.vehicle}</td>
                    <td className="px-2 py-1">{trip.driver}</td>
                    <td
                      className={`px-2 py-1 font-semibold ${
                        trip.status === "Completed"
                          ? "text-green-600"
                          : trip.status === "Delayed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {trip.status}
                    </td>
                    <td className="px-2 py-1">{trip.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" /> Active Alerts
          </h2>
          <ul className="flex flex-col gap-2">
            {alertsList.map((alert, idx) => (
              <li
                key={idx}
                className={`p-2 rounded-lg cursor-pointer hover:opacity-90 transition text-xs ${
                  alert.severity === "high"
                    ? "bg-red-100 text-red-800"
                    : alert.severity === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                Vehicle <span className="font-semibold">{alert.vehicle}</span>: {alert.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
