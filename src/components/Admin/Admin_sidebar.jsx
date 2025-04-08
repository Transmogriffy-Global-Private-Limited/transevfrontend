import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaBriefcase, FaEnvelope, FaClipboardList, FaCog, FaUserCircle, FaIdBadge, FaChartBar, FaBars } from "react-icons/fa";

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State to handle sidebar expansion
  const navigate = useNavigate(); // Hook for navigation

  // Sidebar toggle function
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); // Toggle sidebar state (expanded or collapsed)
  };

  // Handle profile navigation (check if token exists)
  const handleProfileClick = () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/admin/profile"); // Navigate to Admin Profile page if logged in
    } else {
      navigate("/admin/login"); // Redirect to login if no token is found
    }
  };

  // Handle logout API integration
  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token"); // Get the auth token from localStorage

    if (!token) {
      console.error("No token found, user is not authenticated.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the auth token in the header
          "API-Key": API_KEY, // Include the API Key in the header
        },
      });

      if (response.ok) {
        // On successful logout, clear the token and navigate to login page
        localStorage.removeItem("auth_token"); // Remove the token from localStorage
        navigate("/admin/login"); // Redirect to login page
        console.log("Admin logged out successfully.");
      } else {
        console.error("Failed to log out. Try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={`flex h-screen`}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transition-all duration-300 ${isExpanded ? "w-[250px]" : "w-[80px]"} bg-[#2c3e50] text-white z-50`}
      >
        {/* Sidebar Header */}
        <div className="p-3">
          {/* Sidebar Toggle Button */}
          <div className="cursor-pointer text-white" onClick={toggleSidebar}>
            <FaBars size={30} />
          </div>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-2 px-1 mt-6">
          {/* Dashboard */}
          <li className="flex items-center">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaHome className="mr-3 text-xl" />
              {isExpanded && <span>Dashboard</span>}
            </Link>
          </li>

          {/* Manage Users */}
          <li className="flex items-center">
            <Link
              to="/admin/users"
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaUsers className="mr-3 text-xl" />
              {isExpanded && <span>Manage Users</span>}
            </Link>
          </li>

          {/* Manage Products */}
          <li className="flex items-center">
            <Link
              to="/manage/products"
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaIdBadge className="mr-3 text-xl" />
              {isExpanded && <span>Manage Products</span>}
            </Link>
          </li>

          {/* Manage Orders */}
          <li className="flex items-center">
            <Link
              to="/admin/orders"
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaClipboardList className="mr-3 text-xl" />
              {isExpanded && <span>Manage Orders</span>}
            </Link>
          </li>

          {/* Reports */}
          <li className="flex items-center">
            <Link
              to="/admin/reports"
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaChartBar className="mr-3 text-xl" />
              {isExpanded && <span>Reports</span>}
            </Link>
          </li>

          {/* Profile */}
          <li className="flex items-center">
            <button
              onClick={handleProfileClick} // Handle click for profile
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaUserCircle className="mr-3 text-xl" />
              {isExpanded && <span>Profile</span>}
            </button>
          </li>

          {/* Settings */}
          <li className="flex items-center">
            <Link
              to="/admin/settings"
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaCog className="mr-3 text-xl" />
              {isExpanded && <span>Settings</span>}
            </Link>
          </li>

          {/* Logout */}
          <li className="flex items-center">
            <button
              onClick={handleLogout} // Handle logout click and logout API
              className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
            >
              <FaEnvelope className="mr-3 text-xl" />
              {isExpanded && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className={`flex-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 p-6`}>
        {/* You can place other content here */}
      </div>
    </div>
  );
};

export default AdminSidebar;
