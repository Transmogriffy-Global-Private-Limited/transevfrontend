
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaAngleDoubleLeft,
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaClipboardCheck,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";
import logo from "../../assets/log.png";

const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const AdminSidebar = ({ isVisible = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

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
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-[#75833F] text-white z-50 shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
        ${isExpanded ? "md:w-64" : "md:w-20"} 
        w-64 md:translate-x-0`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          <img
            src={logo}
            alt="Admin Logo"
            className={`h-10 w-auto transition-all duration-200 ${
              isExpanded ? "block" : "hidden"
            }`}
          />

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="hidden md:block text-white"
          >
            {isExpanded ? <FaAngleDoubleLeft size={20} /> : <FaBars size={20} />}
          </button>

          <button onClick={onClose} className="md:hidden text-white">
            <FaSignOutAlt size={20} />
          </button>
        </div>

        <ul className="mt-4 space-y-1 px-2">
          <SidebarLink
            icon={<FaTachometerAlt />}
            to="/admin/dashboard"
            label="Dashboard"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaUsers />}
            to="/admin/users"
            label="Manage Users"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaBoxOpen />}
            to="/manage/products"
            label="Manage Products"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaClipboardCheck />}
            to="/admin/orders"
            label="Manage Orders"
            showText={isExpanded}
          />
          <SidebarLink
            icon={<FaChartLine />}
            to="/admin/report"
            label="Analytics & Contacts"
            showText={isExpanded}
          />
            <SidebarLink
                      icon={<FaUserCircle />}
                      to="/admin/profile"
                      label="My Profile"
                      showText={isExpanded}
                    />
          <SidebarLink
            icon={<FaCog />}
            to="/admin/settings"
            label="Settings"
            showText={isExpanded}
          />
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm text-red-400 hover:bg-[#34495e] transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-2xl text-red-400" />
              {isExpanded && <span className="text-lg">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

// SidebarLink component
const SidebarLink = ({ icon, to, label, showText }) => (
  <li>
    <Link
      to={to}
      className="flex items-center px-3 py-2 rounded-md text-lg hover:bg-[#34495e] transition-colors"
    >
      <span className="text-2xl mr-3">{icon}</span>
      {showText && <span>{label}</span>}
    </Link>
  </li>
);

export default AdminSidebar;
