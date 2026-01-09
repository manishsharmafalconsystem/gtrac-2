import React from "react";
import { Truck, Fuel, BarChart2, Calendar, MapPin } from "lucide-react";

/* ---------------- Sample Fuel Data ---------------- */
const fuelOverview = {
  totalFuelConsumed: "1200 L",
  averageConsumption: "6.5 km/L",
  highestConsumptionVehicle: "V004",
  lowestConsumptionVehicle: "V002",
};

const vehicleFuelStats = [
  { vehicle: "V001", fuelConsumed: "120 L", efficiency: "6.2 km/L", location: "Delhi" },
  { vehicle: "V002", fuelConsumed: "90 L", efficiency: "7.0 km/L", location: "Mumbai" },
  { vehicle: "V003", fuelConsumed: "150 L", efficiency: "6.0 km/L", location: "Bangalore" },
  { vehicle: "V004", fuelConsumed: "200 L", efficiency: "5.8 km/L", location: "Pune" },
  { vehicle: "V005", fuelConsumed: "180 L", efficiency: "6.8 km/L", location: "Hyderabad" },
];

/* ---------------- Fuel Management Page ---------------- */
const FuelManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Fuel Management</h1>

      {/* Fuel KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Fuel className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Fuel Consumed</p>
            <p className="text-xl font-bold">{fuelOverview.totalFuelConsumed}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <BarChart2 className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Avg. Fuel Mileage</p>
            <p className="text-xl font-bold">{fuelOverview.averageConsumption}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Truck className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Highest Consumption Vehicle</p>
            <p className="text-xl font-bold">{fuelOverview.highestConsumptionVehicle}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Truck className="w-8 h-8 text-red-500" />
          <div>
            <p className="text-gray-500 text-sm">Lowest Consumption Vehicle</p>
            <p className="text-xl font-bold">{fuelOverview.lowestConsumptionVehicle}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Fuel Stats Table */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Vehicle Fuel Stats</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Vehicle</th>
                <th className="px-4 py-2 border-b">Fuel Consumed</th>
                <th className="px-4 py-2 border-b">Efficiency</th>
                <th className="px-4 py-2 border-b">Location</th>
              </tr>
            </thead>
            <tbody>
              {vehicleFuelStats.map((v, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{v.vehicle}</td>
                  <td className="px-4 py-2 border-b font-semibold">{v.fuelConsumed}</td>
                  <td className="px-4 py-2 border-b">{v.efficiency}</td>
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
    </div>
  );
};

export default FuelManagement;
