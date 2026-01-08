import React, { useState, useMemo } from "react";
import { FaEdit, FaEye, FaToggleOn, FaToggleOff, FaPlus, FaTimes } from "react-icons/fa";

// Sample driver data
const initialDrivers = [
  { id: 1, name: "John Doe", phone: "123-456-7890", status: "Active", trips: 50 },
  { id: 2, name: "Jane Smith", phone: "234-567-8901", status: "Active", trips: 45 },
  { id: 3, name: "Mark Lee", phone: "345-678-9012", status: "Inactive", trips: 40 },
  { id: 4, name: "Emily Clark", phone: "456-789-0123", status: "Active", trips: 60 },
  { id: 5, name: "Michael Brown", phone: "567-890-1234", status: "Inactive", trips: 30 },
  { id: 6, name: "Sarah Johnson", phone: "678-901-2345", status: "Active", trips: 55 },
];

const Drivers = () => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: "", phone: "", status: "Active", trips: 0 });
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const itemsPerPage = 5;

  // Sorting function
  const sortedDrivers = useMemo(() => {
    let sortableDrivers = [...drivers];
    if (sortConfig.key) {
      sortableDrivers.sort((a, b) => {
        if (typeof a[sortConfig.key] === "string") {
          return sortConfig.direction === "asc"
            ? a[sortConfig.key].localeCompare(b[sortConfig.key])
            : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        } else {
          return sortConfig.direction === "asc"
            ? a[sortConfig.key] - b[sortConfig.key]
            : b[sortConfig.key] - a[sortConfig.key];
        }
      });
    }
    return sortableDrivers;
  }, [drivers, sortConfig]);

  // Filter & search
  const filteredDrivers = useMemo(() => {
    return sortedDrivers.filter((driver) => {
      const matchesSearch =
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.phone.includes(search);
      const matchesStatus = statusFilter === "All" || driver.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [sortedDrivers, search, statusFilter]);

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sorting handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const toggleDriverStatus = (id) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d))
    );
  };

  const toggleSelectDriver = (id) => {
    setSelectedDrivers((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const bulkToggleStatus = () => {
    setDrivers((prev) =>
      prev.map((d) =>
        selectedDrivers.includes(d.id) ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d
      )
    );
    setSelectedDrivers([]);
  };

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone) return alert("Please fill all fields");
    const newId = drivers.length ? Math.max(...drivers.map((d) => d.id)) + 1 : 1;
    setDrivers([...drivers, { id: newId, ...newDriver }]);
    setNewDriver({ name: "", phone: "", status: "Active", trips: 0 });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Drivers</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all drivers in your fleet</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Driver
        </button>
      </header>

      {/* Filters & Bulk Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        {selectedDrivers.length > 0 && (
          <button
            onClick={bulkToggleStatus}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Toggle Status ({selectedDrivers.length})
          </button>
        )}
      </div>

      {/* Drivers Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedDrivers.length === paginatedDrivers.length && paginatedDrivers.length > 0}
                  onChange={() =>
                    paginatedDrivers.length &&
                    setSelectedDrivers(
                      selectedDrivers.length === paginatedDrivers.length
                        ? []
                        : paginatedDrivers.map((d) => d.id)
                    )
                  }
                />
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                onClick={() => requestSort("phone")}
              >
                Phone
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                onClick={() => requestSort("trips")}
              >
                Trips
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                onClick={() => requestSort("status")}
              >
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedDrivers.includes(driver.id)}
                    onChange={() => toggleSelectDriver(driver.id)}
                  />
                </td>
                <td className="px-6 py-4">{driver.name}</td>
                <td className="px-6 py-4">{driver.phone}</td>
                <td className="px-6 py-4">{driver.trips}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      driver.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
                    <FaEye />
                  </button>
                  <button className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition">
                    <FaEdit />
                  </button>
                  <button
                    className={`p-2 rounded-full ${
                      driver.status === "Active"
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    } transition`}
                    onClick={() => toggleDriverStatus(driver.id)}
                  >
                    {driver.status === "Active" ? <FaToggleOff /> : <FaToggleOn />}
                  </button>
                </td>
              </tr>
            ))}
            {paginatedDrivers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {/* Add Driver Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-lg z-10">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Driver</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newDriver.name}
                onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newDriver.phone}
                onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newDriver.status}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, status: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                onClick={handleAddDriver}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;
