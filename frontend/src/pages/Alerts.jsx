import React, { useState } from "react";
import { FaExclamationTriangle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const sampleAlerts = [
  { id: 1, type: "Critical", message: "Vehicle V003 overspeed detected", time: "2 mins ago" },
  { id: 2, type: "Warning", message: "Fuel low on V008", time: "15 mins ago" },
  { id: 3, type: "Info", message: "Vehicle V005 completed its route successfully", time: "30 mins ago" },
  { id: 4, type: "Critical", message: "Maintenance overdue for V012", time: "1 hour ago" },
  { id: 5, type: "Warning", message: "Tire pressure low on V004", time: "2 hours ago" },
  { id: 6, type: "Info", message: "Driver John completed all assigned trips", time: "3 hours ago" },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(sampleAlerts);

  const getAlertStyle = (type) => {
    switch (type) {
      case "Critical":
        return "bg-red-50 border-red-400 text-red-700";
      case "Warning":
        return "bg-yellow-50 border-yellow-400 text-yellow-700";
      case "Info":
        return "bg-green-50 border-green-400 text-green-700";
      default:
        return "bg-gray-50 border-gray-300 text-gray-700";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "Critical":
        return <FaExclamationTriangle className="text-red-600 w-5 h-5" />;
      case "Warning":
        return <FaExclamationCircle className="text-yellow-600 w-5 h-5" />;
      case "Info":
        return <FaCheckCircle className="text-green-600 w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Alerts</h1>
        <p className="text-gray-600 mt-1">Real-time notifications and fleet alerts</p>
      </header>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Critical", "Warning", "Info"].map((type) => (
          <button
            key={type}
            onClick={() =>
              setAlerts(type === "All" ? sampleAlerts : sampleAlerts.filter((a) => a.type === type))
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                type === "Critical"
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : type === "Warning"
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : type === "Info"
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No alerts to display
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition ${getAlertStyle(
                alert.type
              )}`}
            >
              <div className="mt-1">{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <p className="font-semibold">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;
