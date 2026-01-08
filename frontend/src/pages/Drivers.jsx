import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

/* ---------------- Sample Driver Data ---------------- */
const sampleDrivers = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    status: "Active",
    vehicle: "V001",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+91 9876543211",
    status: "Inactive",
    vehicle: "V005",
  },
  {
    id: 3,
    name: "Mark Lee",
    email: "marklee@example.com",
    phone: "+91 9876543212",
    status: "Active",
    vehicle: "V003",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alicebrown@example.com",
    phone: "+91 9876543213",
    status: "Active",
    vehicle: "V004",
  },
];

/* ---------------- Drivers Page Component ---------------- */
const Drivers = () => {
  const [drivers, setDrivers] = useState(sampleDrivers);
  const [search, setSearch] = useState("");

  // Filter drivers based on search input
  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  // Delete driver
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers(drivers.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" /> Drivers
        </h1>

        {/* Search & Add Driver */}
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-10 pr-3 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <Plus className="w-4 h-4" /> Add Driver
          </button>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-600 text-sm">Name</th>
              <th className="px-4 py-3 text-gray-600 text-sm">Email</th>
              <th className="px-4 py-3 text-gray-600 text-sm">Phone</th>
              <th className="px-4 py-3 text-gray-600 text-sm">Vehicle</th>
              <th className="px-4 py-3 text-gray-600 text-sm">Status</th>
              <th className="px-4 py-3 text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver) => (
                <tr key={driver.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{driver.name}</td>
                  <td className="px-4 py-3">{driver.email}</td>
                  <td className="px-4 py-3">{driver.phone}</td>
                  <td className="px-4 py-3">{driver.vehicle}</td>
                  <td className="px-4 py-3">
                    {driver.status === "Active" ? (
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <CheckCircle className="w-4 h-4" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle className="w-4 h-4" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-sm transition">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(driver.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-sm transition"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No drivers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;
