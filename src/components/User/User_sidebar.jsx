
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaBox, FaShoppingCart, FaClipboardList, FaUserCircle,
  FaCog, FaBars, FaSignOutAlt
} from "react-icons/fa";
import logo from '../../assets/log.png'
const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "API-Key": API_KEY,
        },
      });

      if (response.ok) {
        localStorage.removeItem("auth_token");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const handleProfileClick = () => {
    const token = localStorage.getItem("auth_token");
    navigate(token ? "/profile" : "/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 
        ${isExpanded ? "w-64" : "w-20"} bg-[#006400] text-white shadow-lg z-50`}>

        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <button onClick={toggleSidebar}>
            <FaBars size={22} />
          </button>
          {/* {isExpanded && <h1 className="text-2xl font-bold text-[#fa9d1c]">TransEV</h1>} */}
          {isExpanded && (
  <img
    src={logo}
    alt="TransEV Logo"
    className="h-10 w-auto ml-2"
  />
)}

        </div>

        {/* Sidebar Links */}
        <ul className="mt-4 space-y-1 px-2">
          <SidebarLink icon={<FaHome />} to="/dashboard" label="Dashboard" isExpanded={isExpanded} />
          <SidebarLink icon={<FaBox />} to="/products" label="Products" isExpanded={isExpanded} />
          <SidebarLink icon={<FaShoppingCart />} to="/cart" label="Shopping Cart" isExpanded={isExpanded} />
          <SidebarLink icon={<FaClipboardList />} to="/order" label="My Orders" isExpanded={isExpanded} />
          
          <li>
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm hover:bg-[#2d3748] transition-colors"
            >
              <FaUserCircle className="mr-3 text-2xl" />
              {isExpanded && <span className=" text-lg">Profile</span>}
            </button>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm text-red-400 hover:bg-[#2d3748] transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-2xl text-red-400" />
              {isExpanded && <span className=" text-lg">Logout</span>}
            </button>
          </li>

          <SidebarLink icon={<FaCog />} to="/setting" label="Settings" isExpanded={isExpanded} />
        </ul>
      </div>

    
     
    </div>
  );
};

// Reusable sidebar link component
const SidebarLink = ({ icon, to, label, isExpanded }) => (
  <li>
    <Link
      to={to}
      className="flex items-center px-3 py-2 rounded-md text-lg hover:bg-[#2d3748] transition-colors"
    >
      <span className="text-2xl mr-3">{icon}</span>
      {isExpanded && <span>{label}</span>}
    </Link>
  </li>
);

export default Sidebar;
