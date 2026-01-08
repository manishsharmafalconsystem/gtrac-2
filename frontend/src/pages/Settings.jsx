import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaCar,
  FaBell,
  FaPlug,
  FaUsersCog,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [security, setSecurity] = useState({
    twoFA: false,
    recentActivity: [
      { action: "Logged in", date: "2026-01-01 10:00" },
      { action: "Password changed", date: "2026-01-05 14:30" },
    ],
  });

  const [fleetPrefs, setFleetPrefs] = useState({
    defaultVehicle: "Truck",
    fuelUnit: "Liters",
    autoTrip: true,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
    frequency: "Daily",
  });

  const [integrations, setIntegrations] = useState({
    gps: true,
    fuelMonitoring: false,
    reporting: true,
  });

  const [roles, setRoles] = useState([
    { role: "Admin", access: "Full Access" },
    { role: "Manager", access: "Limited Access" },
    { role: "Driver", access: "Read Only" },
  ]);

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleSecurityChange = (e) =>
    setSecurity({ ...security, [e.target.name]: e.target.checked });

  const handleFleetChange = (e) =>
    setFleetPrefs({
      ...fleetPrefs,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const handleNotificationChange = (e) =>
    setNotifications({
      ...notifications,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const handleIntegrationChange = (e) =>
    setIntegrations({ ...integrations, [e.target.name]: e.target.checked });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const tabs = [
    { name: "Profile", icon: <FaUser /> },
    { name: "Security", icon: <FaLock /> },
    { name: "Fleet Preferences", icon: <FaCar /> },
    { name: "Notifications", icon: <FaBell /> },
    { name: "Integrations", icon: <FaPlug /> },
    { name: "Roles & Permissions", icon: <FaUsersCog /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
              activeTab === tab.name
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Profile */}
          {activeTab === "Profile" && (
            <Card title="Profile Settings" icon={<FaUser />}>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Full Name"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Email Address"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none mt-3"
              />
              <SaveButton onClick={handleSave} label="Save Profile" />
            </Card>
          )}

          {/* Security */}
          {activeTab === "Security" && (
            <Card title="Security Settings" icon={<FaLock />}>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none mt-3"
              />
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                placeholder="Confirm New Password"
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none mt-3"
              />
              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  name="twoFA"
                  checked={security.twoFA}
                  onChange={handleSecurityChange}
                  className="h-4 w-4 accent-blue-500"
                />
                Enable Two-Factor Authentication
              </label>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <ul className="text-sm">
                  {security.recentActivity.map((item, idx) => (
                    <li key={idx} className="py-1 border-b border-gray-200">
                      {item.action} - {item.date}
                    </li>
                  ))}
                </ul>
              </div>

              <SaveButton onClick={handleSave} label="Save Security" />
            </Card>
          )}

          {/* Fleet Preferences */}
          {activeTab === "Fleet Preferences" && (
            <Card title="Fleet Preferences" icon={<FaCar />}>
              <label className="flex flex-col font-medium text-gray-700">
                Default Vehicle
                <select
                  name="defaultVehicle"
                  value={fleetPrefs.defaultVehicle}
                  onChange={handleFleetChange}
                  className="border rounded-lg px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Truck</option>
                  <option>Van</option>
                  <option>Car</option>
                </select>
              </label>

              <label className="flex flex-col font-medium text-gray-700 mt-3">
                Fuel Units
                <select
                  name="fuelUnit"
                  value={fleetPrefs.fuelUnit}
                  onChange={handleFleetChange}
                  className="border rounded-lg px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Liters</option>
                  <option>Gallons</option>
                </select>
              </label>

              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  name="autoTrip"
                  checked={fleetPrefs.autoTrip}
                  onChange={handleFleetChange}
                  className="h-4 w-4 accent-blue-500"
                />
                Enable Auto Trip Scheduling
              </label>

              <SaveButton onClick={handleSave} label="Save Preferences" />
            </Card>
          )}

          {/* Notifications */}
          {activeTab === "Notifications" && (
            <Card title="Notification Settings" icon={<FaBell />}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 accent-blue-500"
                />
                Email Notifications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 accent-blue-500"
                />
                SMS Notifications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="app"
                  checked={notifications.app}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 accent-blue-500"
                />
                App Notifications
              </label>

              <label className="flex flex-col mt-2 font-medium">
                Frequency
                <select
                  name="frequency"
                  value={notifications.frequency}
                  onChange={handleNotificationChange}
                  className="border rounded-lg px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Immediate</option>
                  <option>Hourly</option>
                  <option>Daily</option>
                </select>
              </label>

              <SaveButton onClick={handleSave} label="Save Notifications" />
            </Card>
          )}

          {/* Integrations */}
          {activeTab === "Integrations" && (
            <Card title="Integrations" icon={<FaPlug />}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="gps"
                  checked={integrations.gps}
                  onChange={handleIntegrationChange}
                  className="h-4 w-4 accent-blue-500"
                />
                GPS Integration
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="fuelMonitoring"
                  checked={integrations.fuelMonitoring}
                  onChange={handleIntegrationChange}
                  className="h-4 w-4 accent-blue-500"
                />
                Fuel Monitoring
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="reporting"
                  checked={integrations.reporting}
                  onChange={handleIntegrationChange}
                  className="h-4 w-4 accent-blue-500"
                />
                Reporting Tools
              </label>

              <SaveButton onClick={handleSave} label="Save Integrations" />
            </Card>
          )}

          {/* Roles & Permissions */}
          {activeTab === "Roles & Permissions" && (
            <Card title="Roles & Permissions" icon={<FaUsersCog />}>
              <table className="w-full text-left border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Access Level</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="px-4 py-2">{r.role}</td>
                      <td className="px-4 py-2">{r.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <SaveButton onClick={handleSave} label="Save Roles" />
            </Card>
          )}
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-1 sticky top-6">
          <Card title="Settings Summary">
            <ul className="text-sm flex flex-col gap-2">
              <li>
                <span className="font-semibold">Profile:</span> {profile.name},{" "}
                {profile.email}
              </li>
              <li>
                <span className="font-semibold">Two-Factor Auth:</span>{" "}
                {security.twoFA ? "Enabled" : "Disabled"}
              </li>
              <li>
                <span className="font-semibold">Default Vehicle:</span>{" "}
                {fleetPrefs.defaultVehicle}
              </li>
              <li>
                <span className="font-semibold">Fuel Unit:</span>{" "}
                {fleetPrefs.fuelUnit}
              </li>
              <li>
                <span className="font-semibold">Notifications:</span>{" "}
                {Object.keys(notifications)
                  .filter((k) => k !== "frequency" && notifications[k])
                  .join(", ")}{" "}
                ({notifications.frequency})
              </li>
              <li>
                <span className="font-semibold">Integrations:</span>{" "}
                {Object.keys(integrations)
                  .filter((k) => integrations[k])
                  .join(", ")}
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Reusable Card
const Card = ({ title, icon, children }) => (
  <div className="bg-white shadow-md rounded-xl p-6">
    {title && (
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
    )}
    {children}
  </div>
);

// Save Button
const SaveButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
  >
    <FaSave /> {label}
  </button>
);

export default Settings;
