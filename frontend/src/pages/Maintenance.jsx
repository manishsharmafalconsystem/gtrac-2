import React, { useState } from "react";
import {
  Wrench,
  Truck,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";

/* ---------------- Maintenance Data ---------------- */
const maintenanceData = [
  {
    id: 1,
    vehicle: "V001",
    type: "Engine Service",
    lastService: "2025-11-10",
    nextService: "2026-01-15",
    status: "Overdue",
    cost: "₹12,000",
  },
  {
    id: 2,
    vehicle: "V002",
    type: "Brake Check",
    lastService: "2025-12-05",
    nextService: "2026-02-05",
    status: "Due",
    cost: "₹4,500",
  },
  {
    id: 3,
    vehicle: "V003",
    type: "Oil Change",
    lastService: "2025-12-20",
    nextService: "2026-03-20",
    status: "Completed",
    cost: "₹2,000",
  },
  {
    id: 4,
    vehicle: "V004",
    type: "Tire Replacement",
    lastService: "2025-10-01",
    nextService: "2026-01-01",
    status: "Overdue",
    cost: "₹18,000",
  },
  {
    id: 5,
    vehicle: "V005",
    type: "Battery Check",
    lastService: "2025-12-15",
    nextService: "2026-02-15",
    status: "Due",
    cost: "₹3,000",
  },
];

/* ---------------- Status Config ---------------- */
const statusConfig = {
  Overdue: {
    color: "text-red-600 bg-red-100",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  Due: {
    color: "text-yellow-600 bg-yellow-100",
    icon: <Wrench className="w-4 h-4" />,
  },
  Completed: {
    color: "text-green-600 bg-green-100",
    icon: <CheckCircle className="w-4 h-4" />,
  },
};

/* ---------------- Maintenance Page ---------------- */
const Maintenance = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredData = maintenanceData.filter((item) => {
    const matchesSearch = item.vehicle
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="w-7 h-7 text-blue-600" />
          Vehicle Maintenance
        </h1>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search vehicle..."
              className="outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Filter className="w-4 h-4 text-gray-400 mr-2" />
            <select
              className="outline-none text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Overdue">Overdue</option>
              <option value="Due">Due</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Maintenance Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Service Type</th>
              <th className="p-4 text-left">Last Service</th>
              <th className="p-4 text-left">Next Service</th>
              <th className="p-4 text-left">Cost</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  {item.vehicle}
                </td>
                <td className="p-4">{item.type}</td>
                <td className="p-4 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {item.lastService}
                </td>
                <td className="p-4 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {item.nextService}
                </td>
                <td className="p-4 font-medium">{item.cost}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[item.status].color}`}
                  >
                    {statusConfig[item.status].icon}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No maintenance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maintenance;
