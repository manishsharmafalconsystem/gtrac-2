import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Truck,
  ClipboardList,
  AlertCircle,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = ({ isCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (menuName) => {
    if (openDropdown === menuName) setOpenDropdown(null);
    else setOpenDropdown(menuName);
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/" },
    {
      name: "Drivers",
      icon: <Users />,
      subMenu: [
        { name: "All Drivers", path: "/drivers" },
        { name: "Add Driver", path: "/drivers/add" },
      ],
    },
    {
      name: "Fleet",
      icon: <Truck />,
      subMenu: [
        { name: "All Vehicles", path: "/fleet" },
        { name: "Maintenance", path: "/fleet/maintenance" },
      ],
    },
    {
      name: "Trips",
      icon: <ClipboardList />,
      subMenu: [
        { name: "All Trips", path: "/trips" },
        { name: "Add Trip", path: "/trips/add" },
      ],
    },
    { name: "Alerts", icon: <AlertCircle />, path: "/alerts" },
    { name: "Reports", icon: <BarChart2 />, path: "/reports" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <div
      className={`flex flex-col justify-between bg-gray-900 text-white h-screen shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="px-4 py-6">
        <h1
          className={`text-2xl font-bold mb-8 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          FleetManager
        </h1>
        <nav>
          {menuItems.map((item) => (
            <div key={item.name} className="mb-1">
              {item.subMenu ? (
                <div>
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
        >
          <Users size={20} />
          {!isCollapsed && <span>Profile</span>}
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
