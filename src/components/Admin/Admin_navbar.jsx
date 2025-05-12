
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Admin/Admin_sidebar"; // 🔁 Make sure this is your admin sidebar component
import logo from "../../assets/log.png";

const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const AdminNavbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/admin/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": API_KEY,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("❌ Failed to fetch admin profile");
        }
      } catch (error) {
        console.error("❌ Error fetching admin profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/logout`, {
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

  const goToProfile = () => navigate("/admin/profile");

  return (
    <div className="bg-[#75833F] font-sans shadow-md sticky top-0 z-50 w-full">
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-white md:hidden">
            <FaBars size={24} />
          </button>
          <img src={logo} alt="Logo" className="h-8 sm:h-10 ml-2 sm:ml-20" />
        </div>

        {/* Right: Admin Name & Dropdown */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block text-white text-lg lg:text-xl">
            Hello, {userData?.name || "Admin"}
          </span>

          {/* <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
            >
              <img
                src={"https://via.placeholder.com/40"}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={goToProfile}
                  className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div> */}
        </div>
      </header>

      {/* Sidebar Toggle on Mobile */}
      {sidebarVisible && (
        <div className="md:hidden">
          <AdminSidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
