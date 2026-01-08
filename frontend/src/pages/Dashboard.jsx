import React from "react";
import {
  Truck,
  Users,
  ClipboardList,
  AlertCircle,
  BarChart2,
  Calendar,
  Activity,
  Settings,
} from "lucide-react";

/* ---------------- Fleet Manager Dashboard Component ---------------- */
const Dashboard = () => {
  // Sample data for overview cards
  const stats = [
    { title: "Total Vehicles", value: 25, icon: <Truck className="w-6 h-6 text-blue-600" />, bg: "bg-blue-100" },
    { title: "Active Trips", value: 8, icon: <ClipboardList className="w-6 h-6 text-green-600" />, bg: "bg-green-100" },
    { title: "Drivers", value: 12, icon: <Users className="w-6 h-6 text-yellow-600" />, bg: "bg-yellow-100" },
    { title: "Active Alerts", value: 5, icon: <AlertCircle className="w-6 h-6 text-red-600" />, bg: "bg-red-100" },
    { title: "Upcoming Maintenance", value: 3, icon: <Activity className="w-6 h-6 text-purple-600" />, bg: "bg-purple-100" },
    { title: "Reports Generated", value: 15, icon: <BarChart2 className="w-6 h-6 text-teal-600" />, bg: "bg-teal-100" },
  ];

  // Sample recent trips
  const recentTrips = [
    { vehicle: "V001", driver: "John Doe", status: "Completed", date: "2026-01-01" },
    { vehicle: "V005", driver: "Jane Smith", status: "In Progress", date: "2026-01-02" },
    { vehicle: "V003", driver: "Mark Lee", status: "Delayed", date: "2026-01-03" },
    { vehicle: "V004", driver: "Alice Brown", status: "Completed", date: "2026-01-04" },
  ];

  // Sample upcoming maintenance
  const maintenanceList = [
    { vehicle: "V002", type: "Oil Change", dueDate: "2026-01-10" },
    { vehicle: "V006", type: "Tire Replacement", dueDate: "2026-01-15" },
    { vehicle: "V008", type: "Brake Inspection", dueDate: "2026-01-20" },
  ];

  return (
    <div className="min-h-screen p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Fleet Manager Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl shadow-md ${stat.bg}`}>
            <div className="p-3 bg-white rounded-full">{stat.icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" /> Recent Trips
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-gray-600 text-sm">Vehicle</th>
                  <th className="px-3 py-2 text-gray-600 text-sm">Driver</th>
                  <th className="px-3 py-2 text-gray-600 text-sm">Status</th>
                  <th className="px-3 py-2 text-gray-600 text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTrips.map((trip, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-3 py-2">{trip.vehicle}</td>
                    <td className="px-3 py-2">{trip.driver}</td>
                    <td
                      className={`px-3 py-2 font-semibold ${
                        trip.status === "Completed"
                          ? "text-green-600"
                          : trip.status === "Delayed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {trip.status}
                    </td>
                    <td className="px-3 py-2">{trip.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" /> Upcoming Maintenance
          </h2>
          <ul className="flex flex-col gap-3">
            {maintenanceList.map((m, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{m.vehicle}</p>
                  <p className="text-gray-600 text-sm">{m.type}</p>
                </div>
                <p className="text-gray-700 font-medium">{m.dueDate}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reports & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Reports */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-teal-600" /> Reports Summary
          </h2>
          <p className="text-gray-600">
            Total Reports Generated: <span className="font-bold">15</span>
          </p>
          <p className="text-gray-600">
            Monthly Report: <span className="font-bold">5</span>
          </p>
          <p className="text-gray-600">
            Weekly Report: <span className="font-bold">2</span>
          </p>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" /> Active Alerts
          </h2>
          <ul className="flex flex-col gap-3">
            <li className="p-3 bg-red-100 rounded-lg">
              Vehicle <span className="font-semibold">V001</span> overspeed detected
            </li>
            <li className="p-3 bg-yellow-100 rounded-lg">
              Vehicle <span className="font-semibold">V002</span> delayed
            </li>
            <li className="p-3 bg-blue-100 rounded-lg">
              Vehicle <span className="font-semibold">V003</span> maintenance due
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
