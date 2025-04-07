import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Sidebar from "../Admin/Admin_sidebar"; // Import Sidebar component

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate(); // Initialize navigate hook

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  // Toggle dropdown menu visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle Logout (API call and navigation)
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
        navigate("/login"); // Redirect to login page
        console.log("User logged out successfully.");
      } else {
        console.error("Failed to log out. Try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Navigate to user profile page
  const goToProfile = () => {
    navigate("/admin/profile"); // Navigate to the profile page
  };

  return (
    <div className="bg-[#2c3e50] font-sans">
      <header className="flex flex-col md:flex-row items-center justify-between p-4">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="text-white md:hidden">
          <FaBars size={30} />
        </button>

        {/* User Navbar */}
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-10">
          <span className="text-white font-bold text-lg ml-20">Dashboard</span>

          {/* Right Side: User Info and Dropdown */}
          <div className="flex items-center space-x-4 ml-320"> {/* ml-auto to push items to the right */}
            <div className="text-lg text-white">Hello, John Doe</div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
              >
                <img
                  src="https://via.placeholder.com/40" // Replace this URL with actual profile picture URL
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48 py-2">
                  {/* My Profile Link */}
                  <button
                    onClick={goToProfile}
                    className="block px-4 py-2 text-left text-teal-500 hover:bg-teal-100 w-full"
                  >
                    My Profile
                  </button>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-left text-teal-500 hover:bg-teal-100 w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar Component */}
      {sidebarVisible && <Sidebar />}
    </div>
  );
};

export default Navbar;
