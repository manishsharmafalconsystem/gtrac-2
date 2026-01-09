import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Truck,
  ClipboardList,
  AlertCircle,
  BarChart2,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { assets } from "../assets/assets";

const Sidebar = ({ isCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const handleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const menuItems = [
    { name: "Overview", icon: <Home />, path: "/" },
    {
      name: "Drivers",
      icon: <Users />,
      subMenu: [
        { name: "All Drivers", path: "/drivers" },
      ],
    },
    {
      name: "Fleet",
      icon: <Truck />,
      subMenu: [
        { name: "All Vehicles", path: "/vehicles" },
        { name: "Maintenance", path: "/maintaince" },
      ],
    },
    {
      name: "Trips",
      icon: <ClipboardList />,
      subMenu: [
        { name: "All Trips", path: "/trips" },
      ],
    },
    {
      name: "Reports",
      icon: <BarChart2 />,
      subMenu: [
        { name: "Performance", path: "/performance" },
        { name: "Fleet Summary", path: "/fleet-summary" },
      ],
    },
    { name: "Alerts", icon: <AlertCircle />, path: "/alerts" },

    {
      name: "Help & Supprots",
      icon: <FileText />,
      path: "documents-center"
    },

    { name: "Settings", icon: <Settings />, path: "/none" },
  ];

  return (
    <div
      className={`flex flex-col justify-between bg-gray-900 text-white h-screen shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="px-4 py-6">
        {/* Logo */}
        <h1
          className={`mb-8 transition-opacity duration-300 flex items-center justify-center ${
            isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <img src={assets.logo} alt="logo" className="w-28 cursor-pointer" />
        </h1>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item) => (
            <div key={item.name} className="mb-1">
              {item.subMenu ? (
                <div>
                  {/* Menu with Submenu */}
                  <button
                    className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded cursor-pointer"
                    onClick={() => handleDropdown(item.name)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span
                        className={`transition-opacity duration-300 ${
                          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    {!isCollapsed &&
                      (openDropdown === item.name ? <ChevronUp /> : <ChevronDown />)}
                  </button>
                  {/* Submenu */}
                  {openDropdown === item.name && !isCollapsed && (
                    <div className="ml-8 mt-1 flex flex-col gap-1 transition-all duration-300">
                      {item.subMenu.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className={({ isActive }) =>
                            `p-2 rounded hover:bg-gray-700 cursor-pointer ${
                              isActive ? "bg-gray-700" : ""
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path || "#"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  {item.icon}
                  <span
                    className={`transition-opacity duration-300 ${
                      isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div className="px-4 py-6 border-t border-gray-700">
        <div
          className={`flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded transition-opacity duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
          onClick={() => navigate("/settings")}
        >
          <Users size={20} />
          {!isCollapsed && <span>Account</span>}
        </div>
        <div
          className={`flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded mt-2 transition-opacity duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
