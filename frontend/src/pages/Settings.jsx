import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Key,
  Edit,
  Save,
  CalendarCheck,
  Truck,
  ClipboardList,
  Camera
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    location: "Delhi, India",
    role: "Fleet Manager",
    photo: null
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success("Profile updated successfully!");
    console.log("Profile saved:", profile);
    // API call can be added here
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 font-sans">
      <Toaster position="top-right" />
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      {/* Overview Summary */}
      <div className="bg-white shadow rounded-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-3xl font-bold overflow-hidden">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            )}
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer hover:bg-gray-300">
                <Camera className="w-4 h-4 text-gray-700" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600">{profile.role}</p>
            <p className="text-gray-500 text-sm">{profile.location}</p>
          </div>
        </div>

        {/* Updated Overview Cards */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="bg-blue-100 p-4 rounded-xl text-center flex-1 md:flex-none w-full md:w-40">
            <div className="flex justify-center mb-1">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm">Active Vehicles</p>
            <p className="text-xl font-bold text-blue-600 mt-1">18</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl text-center flex-1 md:flex-none w-full md:w-40">
            <div className="flex justify-center mb-1">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Pending Tasks</p>
            <p className="text-xl font-bold text-green-600 mt-1">5</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl text-center flex-1 md:flex-none w-full md:w-40">
            <div className="flex justify-center mb-1">
              <CalendarCheck className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-gray-600 text-sm">Routes Managed</p>
            <p className="text-xl font-bold text-yellow-600 mt-1">12</p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button
            onClick={() => {
              if (editMode) handleSave();
              else setEditMode(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {editMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              disabled={!editMode}
              onChange={handleChange}
              className={`border rounded-lg px-3 py-2 ${
                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled={!editMode}
              onChange={handleChange}
              className={`border rounded-lg px-3 py-2 ${
                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              disabled={!editMode}
              onChange={handleChange}
              className={`border rounded-lg px-3 py-2 ${
                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location}
              disabled={!editMode}
              onChange={handleChange}
              className={`border rounded-lg px-3 py-2 ${
                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 flex items-center gap-2">
                <Key className="w-4 h-4" /> New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="border rounded-lg px-3 py-2 bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 flex items-center gap-2">
                <Key className="w-4 h-4" /> Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="border rounded-lg px-3 py-2 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
