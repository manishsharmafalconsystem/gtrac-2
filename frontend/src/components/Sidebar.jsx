import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineCar,
  AiOutlineFire,
  AiOutlineFileText,
  AiOutlineSetting,
  AiOutlineSwapRight,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import { assets } from "../assets/assets";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <AiOutlineDashboard /> },
  { name: "Alerts", path: "/alerts", icon: <AiOutlineBell /> },
  {
    name: "Drivers",
    icon: <AiOutlineUser />,
    submenu: [
      { name: "All Drivers", path: "/drivers" },
    ],
  },
  { name: "Fleet", path: "/fleet", icon: <AiOutlineCar /> },
  {
    name: "Fuel",
    icon: <AiOutlineFire />,
    submenu: [
      { name: "Fuel Logs", path: "/fuel/logs" },
      { name: "Add Fuel", path: "/fuel/add" },
    ],
  },
  {
    name: "Reports",
    icon: <AiOutlineFileText />,
    submenu: [
      { name: "Trip Reports", path: "/reports/trips" },
      { name: "Fuel Reports", path: "/reports/fuel" },
    ],
  },
  {
    name: "Trips",
    icon: <AiOutlineSwapRight />,
    submenu: [
      { name: "All Trips", path: "/trips" },
      { name: "Schedule Trip", path: "/trips/schedule" },
    ],
  },
  { name: "Documents Center", path: "/documents-center", icon: <AiOutlineSetting /> },
  { name: "Settings", path: "/settings", icon: <AiOutlineSetting /> },
];

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Automatically open dropdown if current route is in submenu
  useEffect(() => {
    const newDropdowns = {};
    menuItems.forEach((item) => {
      if (item.submenu) {
        newDropdowns[item.name] = item.submenu.some(sub => sub.path === location.pathname);
      }
    });
    setOpenDropdowns(newDropdowns);
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setOpenDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Check if a parent menu should be active
  const isParentActive = (submenu) => {
    return submenu.some(sub => sub.path === location.pathname);
  };

  return (
    <div className={`bg-white text-gray-800 h-screen shadow-lg transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 p-4">
        <span className={`transition-all duration-300 ${!isOpen && "scale-0"}`}>
          <img src={assets.logo} alt="logo" className="w-24 cursor-pointer" />
        </span>
      </div>

      {/* Menu */}
      <ul className="mt-4 flex flex-col gap-1">
        {menuItems.map((item) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const active = (item.path && location.pathname === item.path) || (hasSubmenu && isParentActive(item.submenu));

          return (
            <li key={item.name}>
              <div>
                {/* Main Link */}
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center justify-between w-full gap-4 px-6 py-3 rounded-lg mx-2 transition-all duration-200 text-sm font-medium
                      ${active ? "bg-blue-100 text-blue-700 shadow" : "hover:bg-gray-100 hover:text-blue-600"}`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-lg">{item.icon}</span>
                      <span className={`${!isOpen && "hidden"} transition-all duration-200`}>{item.name}</span>
                    </span>
                    {isOpen && <span>{openDropdowns[item.name] ? <AiOutlineUp /> : <AiOutlineDown />}</span>}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-6 py-3 rounded-lg mx-2 text-sm font-medium transition-all duration-200
                      ${location.pathname === item.path ? "bg-blue-100 text-blue-700 shadow" : "hover:bg-gray-100 hover:text-blue-600"}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                )}

                {/* Submenu */}
                {hasSubmenu && openDropdowns[item.name] && isOpen && (
                  <ul className="ml-12 mt-1 flex flex-col gap-1">
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          to={sub.path}
                          className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            ${location.pathname === sub.path ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 hover:text-blue-600"}`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Profile fixed at bottom */}
      <div className="absolute bottom-0 w-full mb-4">
        <Link
          to="/profile"
          className="flex items-center gap-4 px-6 py-3 rounded-lg mx-2 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
        >
          <AiOutlineUser className="text-lg" />
          <span className={`${!isOpen && "hidden"} transition-all duration-200`}>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
