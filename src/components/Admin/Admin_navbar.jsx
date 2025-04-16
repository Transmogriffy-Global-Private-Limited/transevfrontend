// import React, { useState } from "react";
// import { FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// import Sidebar from "../Admin/Admin_sidebar"; // Import Sidebar component

// const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

// const Navbar = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
//   const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
//   const navigate = useNavigate(); // Initialize navigate hook

//   // Toggle sidebar visibility
//   const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

//   // Toggle dropdown menu visibility
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   // Handle Logout (API call and navigation)
//   const handleLogout = async () => {
//     const token = localStorage.getItem("auth_token"); // Get the auth token from localStorage

//     if (!token) {
//       console.error("No token found, user is not authenticated.");
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/admin/logout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include the auth token in the header
//           "API-Key": API_KEY, // Include the API Key in the header
//         },
//       });

//       if (response.ok) {
//         // On successful logout, clear the token and navigate to login page
//         localStorage.removeItem("auth_token"); // Remove the token from localStorage
//         navigate("/login"); // Redirect to login page
//         console.log("User logged out successfully.");
//       } else {
//         console.error("Failed to log out. Try again.");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   // Navigate to user profile page
//   const goToProfile = () => {
//     navigate("/admin/profile"); // Navigate to the profile page
//   };

//   return (
//     <div className="bg-[#2c3e50] font-sans">
//       <header className="flex flex-col md:flex-row items-center justify-between p-4">
//         {/* Sidebar Toggle Button */}
//         <button onClick={toggleSidebar} className="text-white md:hidden">
//           <FaBars size={30} />
//         </button>

//         {/* User Navbar */}
//         <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-10">
//           <span className="text-white font-bold text-lg ml-20">Dashboard</span>

//           {/* Right Side: User Info and Dropdown */}
//           <div className="flex items-center space-x-4 ml-320"> {/* ml-auto to push items to the right */}
//             <div className="text-lg text-white">Hello, John Doe</div>
//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
//               >
//                 <img
//                   src="https://via.placeholder.com/40" // Replace this URL with actual profile picture URL
//                   alt="User"
//                   className="w-full h-full object-cover"
//                 />
//               </button>

//               {/* Dropdown Menu */}
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48 py-2">
//                   {/* My Profile Link */}
//                   <button
//                     onClick={goToProfile}
//                     className="block px-4 py-2 text-left text-teal-500 hover:bg-teal-100 w-full"
//                   >
//                     My Profile
//                   </button>
//                   {/* Logout Button */}
//                   <button
//                     onClick={handleLogout}
//                     className="block px-4 py-2 text-left text-teal-500 hover:bg-teal-100 w-full"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Sidebar Component */}
//       {sidebarVisible && <Sidebar />}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../User/User_sidebar";
import logo from '../../assets/log.png'
const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const Navbar = () => {
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

  const goToProfile = () => navigate("/profile");

  return (
    <div className="bg-[#006400] font-sans shadow-md sticky top-0 z-50 w-full">
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left Side: Logo and Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-white md:hidden">
            <FaBars size={24} />
          </button>
          {/* <span className="text-[#fa9d1c] font-bold text-xl sm:text-2xl ml-2 sm:ml-20">TransEV</span> */}
          <img
  src={logo}
  alt="TransEV Logo"
  className="h-8 sm:h-10 ml-2 sm:ml-20"
/>

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
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default Navbar;

// Convert base64 string to blob image
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
