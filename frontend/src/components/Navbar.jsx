// Navbar.jsx
import React from "react";
import { BellIcon, UserCircleIcon, ChartBarIcon, DocumentTextIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 shadow-md h-20 flex items-center justify-between px-6">
      {/* Left: Sidebar toggle + Logo */}
      <div className="flex items-center space-x-6">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-md hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Middle: Search Box */}
      <div className="flex-1 mx-8">
        <div className="relative w-75">
          <input
            type="text"
            placeholder="Search Trips, Vehicles..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-sm"
          />
          <MagnifyingGlassIcon className="w-6 h-6 absolute left-4 top-3 text-gray-400" />
        </div>
      </div>

      {/* Right: Buttons + Notifications + Profile */}
      <div className="flex items-center space-x-6">
        {/* Reports Button */}
        <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition">
          <DocumentTextIcon className="w-5 h-5" />
          <span>Reports</span>
        </button>

        {/* Analytics Button */}
        <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition">
          <ChartBarIcon className="w-5 h-5" />
          <span>Analytics</span>
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button className="p-3 rounded-full hover:bg-gray-200 transition">
            <BellIcon className="w-7 h-7 text-gray-700" />
          </button>
          {/* Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
            3
          </span>
        </div>

        {/* User Profile */}
        <button className="flex items-center space-x-3 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
          <UserCircleIcon className="w-10 h-10 text-gray-700" />
          <span className="text-gray-800 font-medium text-sm">John Doe</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
