import React, { useState } from "react";
import {
  AlertTriangle,
  Info,
  Bell,
  Truck,
  MapPin,
  Users,
  Clock,
  X,
} from "lucide-react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

/* ---------------- Sample Alert Data with Coordinates ---------------- */
const allAlerts = [
  {
    id: 1,
    message: "Vehicle V001 overspeed detected",
    type: "Critical",
    date: "2026-01-01",
    vehicle: "V001",
    driver: "John Doe",
    location: "Delhi",
    speed: "120 km/h",
    coordinates: { lat: 28.6139, lng: 77.209 },
  },
  {
    id: 2,
    message: "Fuel low on V005",
    type: "Warning",
    date: "2026-01-02",
    vehicle: "V005",
    driver: "Jane Smith",
    location: "Mumbai",
    speed: "60 km/h",
    coordinates: { lat: 19.076, lng: 72.8777 },
  },
  {
    id: 3,
    message: "Maintenance due for V003",
    type: "Info",
    date: "2026-01-03",
    vehicle: "V003",
    driver: "Mark Lee",
    location: "Bangalore",
    speed: "0 km/h",
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 4,
    message: "Vehicle V002 delayed",
    type: "Warning",
    date: "2026-01-04",
    vehicle: "V002",
    driver: "Alice Brown",
    location: "Chennai",
    speed: "45 km/h",
    coordinates: { lat: 13.0827, lng: 80.2707 },
  },
  {
    id: 5,
    message: "New driver added: John Doe",
    type: "Info",
    date: "2026-01-05",
    vehicle: "V006",
    driver: "John Doe",
    location: "Kolkata",
    speed: "0 km/h",
    coordinates: { lat: 22.5726, lng: 88.3639 },
  },
  {
    id: 6,
    message: "Vehicle V004 overspeed detected",
    type: "Critical",
    date: "2026-01-06",
    vehicle: "V004",
    driver: "Jane Smith",
    location: "Pune",
    speed: "110 km/h",
    coordinates: { lat: 18.5204, lng: 73.8567 },
  },
  {
    id: 7,
    message: "Fuel low on V007",
    type: "Warning",
    date: "2026-01-07",
    vehicle: "V007",
    driver: "Mark Lee",
    location: "Hyderabad",
    speed: "55 km/h",
    coordinates: { lat: 17.385, lng: 78.4867 },
  },
  {
    id: 8,
    message: "Maintenance due for V010",
    type: "Info",
    date: "2026-01-08",
    vehicle: "V010",
    driver: "Alice Brown",
    location: "Jaipur",
    speed: "0 km/h",
    coordinates: { lat: 26.9124, lng: 75.7873 },
  },
  {
    id: 9,
    message: "Vehicle V008 delayed",
    type: "Warning",
    date: "2026-01-09",
    vehicle: "V008",
    driver: "John Doe",
    location: "Lucknow",
    speed: "40 km/h",
    coordinates: { lat: 26.8467, lng: 80.9462 },
  },
  {
    id: 10,
    message: "New route assigned to V006",
    type: "Info",
    date: "2026-01-10",
    vehicle: "V006",
    driver: "Jane Smith",
    location: "Ahmedabad",
    speed: "0 km/h",
    coordinates: { lat: 23.0225, lng: 72.5714 },
  },
];

/* ---------------- Alert Page Component ---------------- */
const Alerts = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState(null); // For modal
  const alertsPerPage = 5;

  // Filter alerts
  const filteredAlerts =
    filter === "All" ? allAlerts : allAlerts.filter((a) => a.type === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);
  const indexOfLast = currentPage * alertsPerPage;
  const indexOfFirst = indexOfLast - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirst, indexOfLast);

  // Color and Icon mapping
  const typeStyle = {
    Critical: { color: "red", icon: <AlertTriangle className="w-5 h-5" /> },
    Warning: { color: "yellow", icon: <Bell className="w-5 h-5" /> },
    Info: { color: "blue", icon: <Info className="w-5 h-5" /> },
  };

  const mapContainerStyle = { width: "100%", height: "300px" };

  return (
    <div className="min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Fleet Alerts</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {["All", "Critical", "Warning", "Info"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setFilter(t);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border font-semibold text-sm transition ${
              filter === t
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Full Width Alerts - Each in full row */}
      <div className="flex flex-col gap-4">
        {currentAlerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => setSelectedAlert(alert)}
            className={`w-full bg-white p-4 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition border-l-4 border-${typeStyle[alert.type].color}-500`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-${typeStyle[alert.type].color}-600`}>
                {typeStyle[alert.type].icon}
              </span>
              <h2 className="font-semibold text-lg">{alert.message}</h2>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Vehicle:</strong> {alert.vehicle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Driver:</strong> {alert.driver}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Location:</strong> {alert.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Speed:</strong> {alert.speed}
                </span>
              </div>
              <div className="text-gray-400 mt-1 text-xs">Date: {alert.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirst + 1} -{" "}
          {indexOfLast > filteredAlerts.length ? filteredAlerts.length : indexOfLast} of{" "}
          {filteredAlerts.length} alerts
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* ---------------- Modal with Google Map ---------------- */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative shadow-lg">
            <button
              onClick={() => setSelectedAlert(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">{selectedAlert.message}</h2>
            <div className="flex flex-col gap-2 text-gray-700 mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Vehicle:</strong> {selectedAlert.vehicle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Driver:</strong> {selectedAlert.driver}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Location:</strong> {selectedAlert.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Speed:</strong> {selectedAlert.speed}
                </span>
              </div>
              <div className="text-gray-500 mt-2">
                <strong>Alert Type:</strong>{" "}
                <span className={`text-${typeStyle[selectedAlert.type].color}-600`}>
                  {selectedAlert.type}
                </span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Date: {selectedAlert.date}</div>
            </div>

            {/* Google Map */}
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={selectedAlert.coordinates}
                zoom={12}
              >
                <Marker position={selectedAlert.coordinates}>
                  <InfoWindow>
                    <div>
                      {selectedAlert.vehicle} - {selectedAlert.location}
                    </div>
                  </InfoWindow>
                </Marker>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
