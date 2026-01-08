import React from "react";
import {
  Bell,
  User,
  BarChart2,
  FileText,
  Search,
  ChevronLeft,
} from "lucide-react";

const Navbar = ({ toggleSidebar, isSidebarCollapsed }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 shadow-md h-20 flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        {/* Collapse/Expand Sidebar Button with rotation */}
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-md hover:bg-gray-200 transition cursor-pointer"
        >
          <ChevronLeft
            className={`h-7 w-7 text-gray-700 transition-transform duration-300 ${
              isSidebarCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 cursor-pointer">
          Dashboard
        </h1>
      </div>

      {/* Search Box */}
      <div className="flex-1 mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Trips, Vehicles..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-sm"
          />
          <Search className="w-6 h-6 absolute left-4 top-3 text-gray-400" />
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center space-x-6">
        {/* Reports */}
        <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition cursor-pointer">
          <FileText className="w-5 h-5" />
          <span>Reports</span>
        </button>

        {/* Analytics */}
        <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition cursor-pointer">
          <BarChart2 className="w-5 h-5" />
          <span>Analytics</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-3 rounded-full hover:bg-gray-200 transition cursor-pointer">
            <Bell className="w-7 h-7 text-gray-700" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
            3
          </span>
        </div>

        {/* User Profile */}
        <button className="flex items-center space-x-3 hover:bg-gray-200 px-4 py-2 rounded-lg transition cursor-pointer">
          <User className="w-10 h-10 text-gray-700" />
          <span className="text-gray-800 font-medium text-sm">John Doe</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
