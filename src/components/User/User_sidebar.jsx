import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaAngleDoubleLeft } from "react-icons/fa";
import { MdDashboard } from 'react-icons/md';
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaClipboardList,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../assets/log.png";

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const Sidebar = ({ isVisible = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true); // Desktop expand/collapse

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
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#75833F] text-white z-50 shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
        ${isExpanded ? "md:w-64" : "md:w-20"} 
        w-64 md:translate-x-0`}
      >
        {/* Header */}
        {/* <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700 "> */}
        <div className="flex justify-between items-center px-4 py-4  ">
            <Link to="/dashboard">
          <img
            src={logo}
            alt="Logo"
            className={`h-10 w-auto transition-all duration-200 ${
              isExpanded ? "block" : "hidden bg-white"
            }`}
          />
</Link>
          {/* Desktop toggle button */}
          {/* <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="hidden md:block text-white"
          >
            {isExpanded ? "<" : ">"}
          </button> */}
<button
  onClick={() => setIsExpanded((prev) => !prev)}
  className="hidden md:block text-white lg:mr-10" 
>
  {isExpanded ? <FaAngleDoubleLeft size={20} /> : <FaBars size={20} />}
</button>

          {/* Mobile close button */}
          <button onClick={onClose} className="md:hidden text-white">
            <FaSignOutAlt size={20} />
          </button>
        </div>

        {/* Navigation */}
        <ul className="mt-4 space-y-1 px-2">
          <SidebarLink
            icon={<MdDashboard />}
            to="/dashboard"
            label="Dashboard"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaBox />}
            to="/products"
            label="Products"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaShoppingCart />}
            to="/cart"
            label="Shopping Cart"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaClipboardList />}
            to="/order"
            label="My Orders"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaUserCircle />}
            to="/profile"
            label="My Profile"
            showText={isExpanded}
          />
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm text-red-400 hover:bg-[#2d3748] transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-2xl text-red-400" />
              {isExpanded && <span className="text-lg">Logout</span>}
            </button>
          </li>
          <SidebarLink
            icon={<FaCog />}
            to="/setting"
            label="Settings"
            showText={isExpanded}
          />
           <SidebarLink
            icon={<FaHome />}
            to="/"
            label=" Return to Home"
            showText={isExpanded}
          />
        </ul>
      </div>
    </>
  );
};

// SidebarLink component with text toggle
const SidebarLink = ({ icon, to, label, showText }) => (
  <li>
    <Link
      to={to}
      className="flex items-center px-3 py-2 rounded-md text-lg hover:bg-[#2d3748] transition-colors"
    >
      <span className="text-2xl mr-3">{icon}</span>
      {showText && <span>{label}</span>}
    </Link>
  </li>
);

export default Sidebar;
