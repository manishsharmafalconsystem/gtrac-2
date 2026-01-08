import React, { useState } from "react";
import {
  Truck,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

/* ---------------- Dummy Vehicle Data ---------------- */
const initialVehicles = [
  {
    id: 1,
    vehicleId: "VH-001",
    type: "Truck",
    number: "MH12 AB 2345",
    driver: "John Doe",
    status: "Active",
    lastService: "2025-01-02",
  },
  {
    id: 2,
    vehicleId: "VH-002",
    type: "Van",
    number: "DL05 CD 1123",
    driver: "Mark Lee",
    status: "Maintenance",
    lastService: "2024-12-20",
  },
  {
    id: 3,
    vehicleId: "VH-003",
    type: "Trailer",
    number: "KA09 EF 7789",
    driver: "Alice Brown",
    status: "Inactive",
    lastService: "2024-11-15",
  },
  {
    id: 4,
    vehicleId: "VH-004",
    type: "Truck",
    number: "RJ14 GH 9900",
    driver: "Jane Smith",
    status: "Active",
    lastService: "2025-01-05",
  },
];

/* ---------------- Vehicles Component ---------------- */
const Vehicles = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState("");

  /* -------- Filter Logic -------- */
  const filteredVehicles = vehicles.filter(
    (v) =>
      v.vehicleId.toLowerCase().includes(search.toLowerCase()) ||
      v.number.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase())
  );

  /* -------- Delete Vehicle -------- */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((v) => v.id !== id));
    }
  };

  /* -------- Status Badge -------- */
  const renderStatus = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <CheckCircle size={16} /> Active
          </span>
        );
      case "Maintenance":
        return (
          <span className="flex items-center gap-1 text-yellow-600 font-semibold">
            <AlertTriangle size={16} /> Maintenance
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-red-600 font-semibold">
            <XCircle size={16} /> Inactive
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Truck className="text-blue-600" /> Fleet Vehicles
        </h1>

        <div className="flex gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by vehicle ID, number, driver"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-9 pr-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add Vehicle */}
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <Plus size={16} /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Vehicle ID</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Vehicle No</th>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Last Service</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((v) => (
                <tr
                  key={v.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{v.vehicleId}</td>
                  <td className="px-4 py-3">{v.type}</td>
                  <td className="px-4 py-3">{v.number}</td>
                  <td className="px-4 py-3">{v.driver}</td>
                  <td className="px-4 py-3">{v.lastService}</td>
                  <td className="px-4 py-3">{renderStatus(v.status)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs">
                      <Eye size={14} /> View
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-xs">
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicles;
