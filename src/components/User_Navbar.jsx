// src/components/UserNavbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define your base URL for the backend
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define your API key for the request

const UserNavbar = ({ onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const navigate = useNavigate(); // Hook for navigation

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    onToggleSidebar(); // Notify the parent to toggle sidebar
  };

  // Logout handler
  const handleLogout = async () => {
    const token = localStorage.getItem('auth_token'); // Assuming the JWT token is stored in localStorage
    if (!token) {
      console.error('No token found, cannot logout');
      return;
    }

    try {
      // Send logout request to backend with Authorization and API-Key in headers
      const response = await fetch(`${BASE_URL_AND_PORT}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in Authorization header
          'API-Key': API_KEY, // Include the API key in headers
        },
        credentials: 'include', // Ensure that credentials are included for session management
      });

      console.log('Logout response:', response); // Debugging response

      if (response.ok) {
        // Clear user data from localStorage or sessionStorage
        localStorage.removeItem('auth_token'); // Remove the auth token from localStorage
        sessionStorage.removeItem('user'); // Optionally clear sessionStorage too

        // Redirect user to login page after logout
        navigate('/login'); // Ensure correct navigation after logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Go to profile page
  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="flex justify-between items-center mb-8 bg-teal-700 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="flex items-center">
        <button 
          className="lg:hidden p-2 bg-teal-600 rounded-lg" 
          onClick={handleSidebarToggle}
        >
          <span className="block w-6 h-1 bg-white mb-1"></span>
          <span className="block w-6 h-1 bg-white mb-1"></span>
          <span className="block w-6 h-1 bg-white"></span>
        </button>

        <span className="mr-4 text-lg">Hello, John Doe</span>
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
              <button
                onClick={goToProfile}
                className="block px-4 py-2 text-left text-teal-500 hover:bg-teal-100 w-full"
              >
                My Profile
              </button>
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
    </div>
  );
};

export default UserNavbar;
