import React, { useState } from "react";
import {
  Truck,
  MapPin,
  User,
  Calendar,
  Clock,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  PlayCircle,
} from "lucide-react";

/* ---------------- Trips Data ---------------- */
const tripsData = [
  {
    id: 1,
    tripId: "TRP-1001",
    vehicle: "V001",
    driver: "John Doe",
    from: "Delhi",
    to: "Jaipur",
    startDate: "2026-01-05",
    endDate: "2026-01-05",
    duration: "6h",
    status: "Completed",
  },
  {
    id: 2,
    tripId: "TRP-1002",
    vehicle: "V002",
    driver: "Jane Smith",
    from: "Mumbai",
    to: "Pune",
    startDate: "2026-01-08",
    endDate: "-",
    duration: "Ongoing",
    status: "Ongoing",
  },
  {
    id: 3,
    tripId: "TRP-1003",
    vehicle: "V003",
    driver: "Mark Lee",
    from: "Bangalore",
    to: "Chennai",
    startDate: "2026-01-06",
    endDate: "2026-01-06",
    duration: "8h",
    status: "Delayed",
  },
  {
    id: 4,
    tripId: "TRP-1004",
    vehicle: "V004",
    driver: "Alice Brown",
    from: "Ahmedabad",
    to: "Surat",
    startDate: "2026-01-09",
    endDate: "-",
    duration: "Ongoing",
    status: "Ongoing",
  },
  {
    id: 5,
    tripId: "TRP-1005",
    vehicle: "V005",
    driver: "John Doe",
    from: "Kolkata",
    to: "Durgapur",
    startDate: "2026-01-03",
    endDate: "2026-01-03",
    duration: "4h",
    status: "Completed",
  },
];

/* ---------------- Status Styles ---------------- */
const statusConfig = {
  Completed: {
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  Ongoing: {
    color: "bg-blue-100 text-blue-700",
    icon: <PlayCircle className="w-4 h-4" />,
  },
  Delayed: {
    color: "bg-red-100 text-red-700",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
};

/* ---------------- Trips Page ---------------- */
const Trips = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTrips = tripsData.filter((trip) => {
    const matchesSearch =
      trip.tripId.toLowerCase().includes(search.toLowerCase()) ||
      trip.vehicle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || trip.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Truck className="w-7 h-7 text-blue-600" />
          Trips Management
        </h1>

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search trip or vehicle..."
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
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Trip ID</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-left">Start</th>
              <th className="p-4 text-left">End</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredTrips.map((trip) => (
              <tr
                key={trip.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{trip.tripId}</td>
                <td className="p-4 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  {trip.vehicle}
                </td>
                <td className="p-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  {trip.driver}
                </td>
                <td className="p-4 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {trip.from} → {trip.to}
                </td>
                <td className="p-4 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {trip.startDate}
                </td>
                <td className="p-4">{trip.endDate}</td>
                <td className="p-4 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {trip.duration}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[trip.status].color}`}
                  >
                    {statusConfig[trip.status].icon}
                    {trip.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredTrips.length === 0 && (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No trips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trips;
