
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../User/User_sidebar";
import logo from '../../assets/log.png'
import { Link } from "react-router-dom";
import {  FaHome } from "react-icons/fa"; 

const BASE_URL_AND_PORT = "http://192.168.0.103:3000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": API_KEY,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const blobUrl = convertBase64ToBlob(data.user_data.profile_picture);
          setUserData({
            ...data.user_data,
            profile_picture: blobUrl,
          });
        } else {
          console.error("❌ Failed to fetch user profile");
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

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

  const goToProfile = () => navigate("/profile");

  return (
    <div className="bg-[#75833F] font-sans shadow-md sticky top-0 z-50 w-full">
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left Side: Logo and Sidebar Toggle */}
        <div className="flex items-center gap-4">
         <button onClick={toggleSidebar} className="text-white md:hidden">
            <FaBars size={24} />
          </button> 
       

          <Link to="/dashboard">
          <img
            src={logo}
            alt="TransEV Logo"
            className="h-8 sm:h-10 ml-2 sm:ml-20"
          />
          </Link>
        </div>
<div className="flex justify-center items-center space-x-8 bg-[#75833F] py-3">
     
    
{/* <div className="w-full flex justify-center md:justify-end">
  <div className="w-full max-w-screen-xl px-4 flex justify-end">
    <Link 
      to="/" 
      className="text-white text-lg flex items-center gap-2 hover:underline xl:ml-250 lg:mr-[-200] "
    >
      <FaHome size={20} />
    </Link>
  </div>
</div> */}



      </div>
        {/* Right Side: User Info and Dropdown */}
         <div className="flex items-center gap-3"> 
   

          <span className="hidden md:inline-block text-white text-lg lg:text-xl">
            Hello, {userData?.name || "User"}
          </span>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
            >
              <img
                src={userData?.profile_picture || "https://via.placeholder.com/40"}
                alt="User"
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
          </div>
        </div>
      
      </header>

      {/* Sidebar for Mobile */}
      {sidebarVisible && (
        <div className="md:hidden">
          <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;

const convertBase64ToBlob = (base64String) => {
  try {
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
    if (base64String.match(base64Regex)) {
      base64String = base64String.replace(base64Regex, "");
    }

    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    const blob = new Blob(byteArrays, { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error converting base64 to Blob:", error);
    return "https://via.placeholder.com/150";
  }
};

