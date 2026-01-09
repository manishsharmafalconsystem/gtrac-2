import React from "react";
import {
  Truck,
  Users,
  AlertTriangle,
  Fuel,
  Calendar,
  MapPin,
} from "lucide-react";

/* ---------------- Sample Data ---------------- */
const fleetSummary = {
  totalVehicles: 50,
  activeVehicles: 42,
  maintenanceDue: 6,
  totalDrivers: 18,
  fuelAverage: "6.4 km/l",
  alerts: 9,
};

const vehicleStatus = [
  { vehicle: "V001", status: "Active", location: "Delhi" },
  { vehicle: "V002", status: "Maintenance", location: "Mumbai" },
  { vehicle: "V003", status: "Active", location: "Bangalore" },
  { vehicle: "V004", status: "Idle", location: "Pune" },
  { vehicle: "V005", status: "Active", location: "Hyderabad" },
];

const recentAlerts = [
  { message: "Vehicle V001 overspeed detected", type: "Critical" },
  { message: "Fuel low on V004", type: "Warning" },
  { message: "Maintenance due for V002", type: "Info" },
  { message: "Vehicle V005 delayed", type: "Warning" },
];

/* ---------------- Fleet Summary Page ---------------- */
const FleetSummary = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Fleet Summary</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Truck className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Vehicles</p>
            <p className="text-xl font-bold">{fleetSummary.totalVehicles}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Truck className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Active Vehicles</p>
            <p className="text-xl font-bold">{fleetSummary.activeVehicles}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Calendar className="w-8 h-8 text-yellow-600" />
          <div>
            <p className="text-gray-500 text-sm">Maintenance Due</p>
            <p className="text-xl font-bold">{fleetSummary.maintenanceDue}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Users className="w-8 h-8 text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Drivers</p>
            <p className="text-xl font-bold">{fleetSummary.totalDrivers}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Fuel className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Fuel Avg.</p>
            <p className="text-xl font-bold">{fleetSummary.fuelAverage}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <div>
            <p className="text-gray-500 text-sm">Alerts</p>
            <p className="text-xl font-bold">{fleetSummary.alerts}</p>
          </div>
        </div>
      </div>

      {/* Vehicles Status Table */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Vehicle Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Vehicle</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Location</th>
              </tr>
            </thead>
            <tbody>
              {vehicleStatus.map((v, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{v.vehicle}</td>
                  <td
                    className={`px-4 py-2 border-b font-semibold ${
                      v.status === "Active"
                        ? "text-green-600"
                        : v.status === "Maintenance"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {v.status}
                  </td>
                  <td className="px-4 py-2 border-b flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {v.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        <ul className="space-y-3 text-gray-700">
          {recentAlerts.map((alert, idx) => (
            <li
              key={idx}
              className={`p-3 rounded-lg flex items-center gap-3 ${
                alert.type === "Critical"
                  ? "bg-red-50 text-red-600"
                  : alert.type === "Warning"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              {alert.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FleetSummary;
