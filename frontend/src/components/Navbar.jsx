import React from "react";
import {
  Bell,
  User,
  BarChart2,
  FileText,
  Search,
  Menu,
  PanelsLeftBottom,
} from "lucide-react";

const Navbar = ({ toggleSidebar, isSidebarCollapsed }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 shadow-md h-20 flex items-center justify-between px-6">
      {/* Left Section: Toggle + Title */}
      <div className="flex items-center space-x-4">
        {/* Collapse/Expand Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center cursor-pointer"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? (
            <Menu className="w-5 h-5 text-gray-700" />
          ) : (
            <PanelsLeftBottom className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Center Section: Search */}
      <div className="flex-1 mx-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Trips, Vehicles..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-700 text-sm shadow-sm"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Reports */}
        <button className="flex items-center space-x-1 bg-[#003350] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition shadow-sm cursor-pointer">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Reports</span>
        </button>

        {/* Analytics */}
        <button className="flex items-center space-x-1 bg-[#003350] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition shadow-sm cursor-pointer">
          <BarChart2 className="w-4 h-4" />
          <span className="hidden sm:inline">Analytics</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
            3
          </span>
        </div>

        {/* User Profile */}
        <button className="flex items-center space-x-1 hover:bg-gray-200 px-2 py-3 rounded-lg transition cursor-pointer">
          <User className="w-8 h-5 text-gray-700" />
          <span className="text-gray-900 font-medium text-sm hidden sm:inline">
               Fleet Manager           
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
