import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const VehicleDetails = ({ allAlerts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = allAlerts.find((v) => v.vehicle === id);

  if (!vehicle) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Vehicle not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{vehicle.vehicle}</h1>
      <p>
        <strong>Driver:</strong> {vehicle.driver}
      </p>
      <p>
        <strong>Location:</strong> {vehicle.location}
      </p>
      <p>
        <strong>Speed:</strong> {vehicle.speed}
      </p>
      <p>
        <strong>Alert Type:</strong> {vehicle.type}
      </p>
      <p>
        <strong>Date:</strong> {vehicle.date}
      </p>
    </div>
  );
};

export default VehicleDetails;
