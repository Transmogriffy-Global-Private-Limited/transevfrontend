// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHome, FaUsers, FaBriefcase, FaEnvelope, FaClipboardList, FaCog, FaUserCircle, FaIdBadge, FaChartBar, FaBars } from "react-icons/fa";

// const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

// const AdminSidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(true); // State to handle sidebar expansion
//   const navigate = useNavigate(); // Hook for navigation

//   // Sidebar toggle function
//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded); // Toggle sidebar state (expanded or collapsed)
//   };

//   // Handle profile navigation (check if token exists)
//   const handleProfileClick = () => {
//     const token = localStorage.getItem("auth_token");
//     if (token) {
//       navigate("/admin/profile"); // Navigate to Admin Profile page if logged in
//     } else {
//       navigate("/admin/login"); // Redirect to login if no token is found
//     }
//   };

//   // Handle logout API integration
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
//         navigate("/admin/login"); // Redirect to login page
//         console.log("Admin logged out successfully.");
//       } else {
//         console.error("Failed to log out. Try again.");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className={`flex h-screen`}>
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen transition-all duration-300 ${isExpanded ? "w-[250px]" : "w-[80px]"} bg-[#2c3e50] text-white z-50`}
//       >
//         {/* Sidebar Header */}
//         <div className="p-3">
//           {/* Sidebar Toggle Button */}
//           <div className="cursor-pointer text-white" onClick={toggleSidebar}>
//             <FaBars size={30} />
//           </div>
//         </div>

//         {/* Sidebar Links */}
//         <ul className="space-y-2 px-1 mt-6">
//           {/* Dashboard */}
//           <li className="flex items-center">
//             <Link
//               to="/admin/dashboard"
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaHome className="mr-3 text-xl" />
//               {isExpanded && <span>Dashboard</span>}
//             </Link>
//           </li>

//           {/* Manage Users */}
//           <li className="flex items-center">
//             <Link
//               to="/admin/users"
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaUsers className="mr-3 text-xl" />
//               {isExpanded && <span>Manage Users</span>}
//             </Link>
//           </li>

//           {/* Manage Products */}
//           <li className="flex items-center">
//             <Link
//               to="/manage/products"
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaIdBadge className="mr-3 text-xl" />
//               {isExpanded && <span>Manage Products</span>}
//             </Link>
//           </li>

//           {/* Manage Orders */}
//           <li className="flex items-center">
//             <Link
//               to="/admin/orders"
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaClipboardList className="mr-3 text-xl" />
//               {isExpanded && <span>Manage Orders</span>}
//             </Link>
//           </li>

//           {/* Reports */}
//           <li className="flex items-center">
//             <Link
//               to="/admin/reports"
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaChartBar className="mr-3 text-xl" />
//               {isExpanded && <span>Reports</span>}
//             </Link>
//           </li>

//           {/* Profile */}
//           <li className="flex items-center">
//             <button
//               onClick={handleProfileClick} // Handle click for profile
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaUserCircle className="mr-3 text-xl" />
//               {isExpanded && <span>Profile</span>}
//             </button>
//           </li>

//           {/* Settings */}
//           <li className="flex items-center">
//             <Link
//               to="/admin/settings"
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaCog className="mr-3 text-xl" />
//               {isExpanded && <span>Settings</span>}
//             </Link>
//           </li>

//           {/* Logout */}
//           <li className="flex items-center">
//             <button
//               onClick={handleLogout} // Handle logout click and logout API
//               className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//             >
//               <FaEnvelope className="mr-3 text-xl" />
//               {isExpanded && <span>Logout</span>}
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main content area */}
//       <div className={`flex-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 p-6`}>
//         {/* You can place other content here */}
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaBox, FaClipboardList, FaUserCircle,
  FaCog, FaBars, FaEnvelope,FaChartBar,FaUsers
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
        navigate("/admin/login");
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
    navigate(token ? "/admin/profile" : "/admin/login");
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
          <SidebarLink icon={<FaHome />} to="/admin/dashboard" label="Dashboard" isExpanded={isExpanded} />
          <SidebarLink icon={<FaUsers />} to="/admin/users" label="Manage Users" isExpanded={isExpanded} />
          <SidebarLink icon={<FaBox />} to="/manage/products" label="Manage Products" isExpanded={isExpanded} />
          <SidebarLink icon={<FaClipboardList />} to="/admin/orders" label="Manage Orders" isExpanded={isExpanded} />
          <SidebarLink icon={<FaChartBar />} to="/admin/report" label="Report" isExpanded={isExpanded} />
       
          
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
              <FaEnvelope className="mr-3 text-2xl text-red-400" />
              {isExpanded && <span className=" text-lg">Logout</span>}
            </button>
          </li>

          <SidebarLink icon={<FaCog />} to="/admin/settings" label="Settings" isExpanded={isExpanded} />
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
