// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaBars, FaAngleDoubleLeft } from "react-icons/fa";
// import { MdDashboard } from 'react-icons/md';
// import {
//   FaHome,
//   FaBox,
//   FaShoppingCart,
//   FaClipboardList,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import logo from "../../assets/log.png";

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const Sidebar = ({ isVisible = false, onClose = () => {} }) => {
//   const navigate = useNavigate();
//   const [isExpanded, setIsExpanded] = useState(true); // Desktop expand/collapse

//   const handleLogout = async () => {
//     const token = localStorage.getItem("auth_token");
//     if (!token) return;

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/logout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           "API-Key": API_KEY,
//         },
//       });

//       if (response.ok) {
//         localStorage.removeItem("auth_token");
//         navigate("/");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isVisible && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-[#75833F] text-white z-50 shadow-md
//         transform transition-transform duration-300 ease-in-out
//         ${isVisible ? "translate-x-0" : "-translate-x-full"}
//         ${isExpanded ? "md:w-64" : "md:w-20"} 
//         w-64 md:translate-x-0`}
//       >
//         {/* Header */}
//         {/* <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700 "> */}
//         <div className="flex justify-between items-center px-4 py-4  ">
//             <Link to="/dashboard">
//           <img
//             src={logo}
//             alt="Logo"
//             className={`h-10 w-auto transition-all duration-200 ${
//               isExpanded ? "block" : "hidden bg-white"
//             }`}
//           />
// </Link>
//           {/* Desktop toggle button */}
//           {/* <button
//             onClick={() => setIsExpanded((prev) => !prev)}
//             className="hidden md:block text-white"
//           >
//             {isExpanded ? "<" : ">"}
//           </button> */}
// <button
//   onClick={() => setIsExpanded((prev) => !prev)}
//   className="hidden md:block text-white lg:mr-10" 
// >
//   {isExpanded ? <FaAngleDoubleLeft size={20} /> : <FaBars size={20} />}
// </button>

//           {/* Mobile close button */}
//           <button onClick={onClose} className="md:hidden text-white">
//             <FaSignOutAlt size={20} />
//           </button>
//         </div>

//         {/* Navigation */}
//         <ul className="mt-4 space-y-1 px-2">
//           <SidebarLink
//             icon={<MdDashboard />}
//             to="/dashboard"
//             label="Dashboard"
//             showText={isExpanded}
//           />
//           <SidebarLink
//             icon={<FaBox />}
//             to="/products"
//             label="Products"
//             showText={isExpanded}
//           />
//           <SidebarLink
//             icon={<FaShoppingCart />}
//             to="/cart"
//             label="Shopping Cart"
//             showText={isExpanded}
//           />
//           <SidebarLink
//             icon={<FaClipboardList />}
//             to="/order"
//             label="My Orders"
//             showText={isExpanded}
//           />
//           <SidebarLink
//             icon={<FaUserCircle />}
//             to="/profile"
//             label="My Profile"
//             showText={isExpanded}
//           />
         
//           <SidebarLink
//             icon={<FaCog />}
//             to="/setting"
//             label="Settings"
//             showText={isExpanded}
//           />
//            <li>
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-3 py-2 rounded-md text-sm text-red-400 hover:bg-[#2d3748] transition-colors"
//             >
//               <FaSignOutAlt className="mr-3 text-2xl text-red-400" />
//               {isExpanded && <span className="text-lg">Logout</span>}
//             </button>
//           </li>
//            <SidebarLink
//             icon={<FaHome />}
//             to="/"
//             label=" Return to Home"
//             showText={isExpanded}
//           />
//         </ul>
//       </div>
//     </>
//   );
// };

// // SidebarLink component with text toggle
// const SidebarLink = ({ icon, to, label, showText }) => (
//   <li>
//     <Link
//       to={to}
//       className="flex items-center px-3 py-2 rounded-md text-lg hover:bg-[#2d3748] transition-colors"
//     >
//       <span className="text-2xl mr-3">{icon}</span>
//       {showText && <span>{label}</span>}
//     </Link>
//   </li>
// );

// export default Sidebar;


// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { 
//   FaBars, 
//   FaAngleDoubleLeft, 
//   FaAngleDoubleRight,
//   FaHome, 
//   FaBox, 
//   FaShoppingCart, 
//   FaClipboardList, 
//   FaUserCircle, 
//   FaCog, 
//   FaSignOutAlt,
//   FaThLarge,
//   FaChartLine
// } from "react-icons/fa";
// import { MdDashboard, MdElectricBolt, MdOutlineSpaceDashboard } from "react-icons/md";
// import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineCog } from "react-icons/hi";
// import { FiPackage, FiShoppingCart, FiClipboard, FiHome } from "react-icons/fi";
// import { LuLayoutDashboard } from "react-icons/lu";
// import logo from "../../assets/log.png";

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const Sidebar = ({ isVisible = false, onClose = () => {} }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [hoveredItem, setHoveredItem] = useState(null);

//   const handleLogout = async () => {
//     const token = localStorage.getItem("auth_token");
//     if (!token) return;

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/logout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           "API-Key": API_KEY,
//         },
//       });

//       if (response.ok) {
//         localStorage.removeItem("auth_token");
//         navigate("/");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const menuItems = [
//     { icon: <LuLayoutDashboard />, to: "/dashboard", label: "Dashboard" },
//     { icon: <FiPackage />, to: "/products", label: "Products" },
//     { icon: <FiShoppingCart />, to: "/cart", label: "Shopping Cart" },
//     { icon: <FiClipboard />, to: "/order", label: "My Orders" },
//     { icon: <HiOutlineUser />, to: "/profile", label: "My Profile" },
//     { icon: <HiOutlineCog />, to: "/setting", label: "Settings" },
//   ];

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isVisible && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-gradient-to-br from-[#1a4d2e] to-[#0d331d] text-white z-50 shadow-2xl
//         transition-all duration-300 ease-in-out overflow-y-hidden
//         ${isVisible ? "translate-x-0" : "-translate-x-full"}
//         ${isExpanded ? "md:w-72" : "md:w-24"} 
//         w-72 md:translate-x-0
//         flex flex-col`}
//       >
//         {/* Decorative top gradient */}
//         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

//         {/* Header with Logo */}
//         <div className="relative px-5 py-6">
//           <div className="flex items-center justify-between">
//             <Link to="/dashboard" className="flex items-center gap-3 group">
//               <div className="relative">
//                 {/* Logo background glow */}
//                 <div className="absolute -inset-1 bg-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className={`h-11 w-auto transition-all duration-300 relative z-10 ${
//                     isExpanded ? "block" : "hidden"
//                   }`}
//                 />
//                 {!isExpanded && (
//                   <div className="w-11 h-11 bg-gradient-to-br from-white to-green-100 rounded-xl flex items-center justify-center shadow-lg relative z-10">
//                     <MdElectricBolt className="text-[#1a4d2e] text-2xl" />
//                   </div>
//                 )}
//               </div>
//               {isExpanded && (
//                 <div className="flex flex-col">
//                   <span className="text-xl font-bold bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">
//                     EV Charge
//                   </span>
//                   <span className="text-xs text-green-300/80">Electric Vehicle Solutions</span>
//                 </div>
//               )}
//             </Link>

//             {/* Toggle Button */}
//             <button
//               onClick={() => setIsExpanded((prev) => !prev)}
//               className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
//             >
//               {isExpanded ? (
//                 <FaAngleDoubleLeft className="text-white text-sm group-hover:rotate-12 transition-transform" />
//               ) : (
//                 <FaAngleDoubleRight className="text-white text-sm group-hover:-rotate-12 transition-transform" />
//               )}
//             </button>

//             {/* Mobile Close Button */}
//             <button
//               onClick={onClose}
//               className="md:hidden text-white/70 hover:text-white transition-colors"
//             >
//               <FaBars size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Welcome Section */}
//         {isExpanded && (
//           <div className="mx-4 mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <FaUserCircle className="text-white text-xl" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-white">Welcome Back!</p>
//                 <p className="text-xs text-green-300">Ready to charge?</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation Menu */}
//         <div className="flex-1 px-4 py-2">
//           <ul className="space-y-2">
//             {menuItems.map((item, index) => {
//               const active = isActive(item.to);
//               return (
//                 <li key={index}>
//                   <Link
//                     to={item.to}
//                     onMouseEnter={() => setHoveredItem(index)}
//                     onMouseLeave={() => setHoveredItem(null)}
//                     onClick={() => {
//                       if (window.innerWidth < 768) onClose();
//                     }}
//                     className={`
//                       group relative flex items-center gap-4 px-4 py-3 rounded-xl
//                       transition-all duration-300 ease-in-out
//                       ${active 
//                         ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30' 
//                         : 'text-white/80 hover:bg-white/10 hover:text-white'
//                       }
//                       ${!isExpanded && 'justify-center px-2'}
//                     `}
//                   >
//                     {/* Animated icon background */}
//                     {!active && (
//                       <div className={`absolute inset-0 rounded-xl bg-white/0 transition-all duration-300 ${hoveredItem === index ? 'bg-white/5' : ''}`} />
//                     )}
                    
//                     <span className={`relative text-xl transition-all duration-300 ${active ? 'text-white' : 'text-white/70 group-hover:text-white'} ${!isExpanded && 'text-2xl'}`}>
//                       {item.icon}
//                     </span>
                    
//                     {isExpanded && (
//                       <span className={`text-sm font-medium transition-all duration-300 ${active ? 'translate-x-1' : ''}`}>
//                         {item.label}
//                       </span>
//                     )}
                    
//                     {/* Active indicator dot */}
//                     {active && isExpanded && (
//                       <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full shadow-lg" />
//                     )}
                    
//                     {/* Tooltip for collapsed mode */}
//                     {!isExpanded && (
//                       <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10">
//                         {item.label}
//                         <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
//                       </div>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         {/* Bottom Section with Divider */}
//         <div className="relative">
//           {/* Decorative divider */}
//           <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
//           <div className="px-4 py-5">
//             <ul className="space-y-2">
//               {/* Return to Home */}
//               <li>
//                 <Link
//                   to="/"
//                   onClick={() => {
//                     if (window.innerWidth < 768) onClose();
//                   }}
//                   className={`
//                     flex items-center gap-4 px-4 py-3 rounded-xl
//                     transition-all duration-300 ease-in-out
//                     text-white/70 hover:bg-white/10 hover:text-white
//                     ${!isExpanded && 'justify-center px-2'}
//                   `}
//                 >
//                   <FiHome className="text-xl" />
//                   {isExpanded && <span className="text-sm font-medium">Return to Home</span>}
//                   {!isExpanded && (
//                     <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10">
//                       Return to Home
//                       <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
//                     </div>
//                   )}
//                 </Link>
//               </li>

//               {/* Logout Button */}
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className={`
//                     w-full flex items-center gap-4 px-4 py-3 rounded-xl
//                     transition-all duration-300 ease-in-out
//                     text-red-300/80 hover:bg-red-500/20 hover:text-red-200
//                     ${!isExpanded && 'justify-center px-2'}
//                   `}
//                 >
//                   <FaSignOutAlt className="text-xl" />
//                   {isExpanded && <span className="text-sm font-medium">Logout</span>}
//                   {!isExpanded && (
//                     <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10">
//                       Logout
//                       <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
//                     </div>
//                   )}
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Decorative bottom gradient */}
//         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaBars, 
  FaAngleDoubleLeft, 
  FaAngleDoubleRight,
  FaHome, 
  FaBox, 
  FaShoppingCart, 
  FaClipboardList, 
  FaUserCircle, 
  FaCog, 
  FaSignOutAlt,
  FaThLarge,
  FaChartLine
} from "react-icons/fa";
import { MdDashboard, MdElectricBolt, MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineCog } from "react-icons/hi";
import { FiPackage, FiShoppingCart, FiClipboard, FiHome } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import logo from "../../assets/log.png";

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const Sidebar = ({ isVisible = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

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

  const menuItems = [
    { icon: <LuLayoutDashboard />, to: "/dashboard", label: "Dashboard" },
    { icon: <FiPackage />, to: "/products", label: "Products" },
    { icon: <FiShoppingCart />, to: "/cart", label: "Shopping Cart" },
    { icon: <FiClipboard />, to: "/order", label: "My Orders" },
    { icon: <HiOutlineUser />, to: "/profile", label: "My Profile" },
    { icon: <HiOutlineCog />, to: "/setting", label: "Settings" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-br from-[#1a4d2e] to-[#0d331d] text-white z-50 shadow-2xl
        transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
        ${isExpanded ? "md:w-72" : "md:w-24"} 
        w-72 md:translate-x-0
        flex flex-col
        scrollbar-hide`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Hide scrollbar for Chrome/Safari */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {/* Header with Logo */}
        <div className="relative px-5 py-6">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Logo background glow */}
                <div className="absolute -inset-1 bg-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={logo}
                  alt="Logo"
                  className={`h-11 w-auto transition-all duration-300 relative z-10 ${
                    isExpanded ? "block" : "hidden"
                  }`}
                />
                {!isExpanded && (
                  <div className="w-11 h-11 bg-gradient-to-br from-white to-green-100 rounded-xl flex items-center justify-center shadow-lg relative z-10">
                    <MdElectricBolt className="text-[#1a4d2e] text-2xl" />
                  </div>
                )}
              </div>
              {isExpanded && (
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">
                    EV Charge
                  </span>
                  <span className="text-xs text-green-300/80">Electric Vehicle Solutions</span>
                </div>
              )}
            </Link>

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
            >
              {isExpanded ? (
                <FaAngleDoubleLeft className="text-white text-sm group-hover:rotate-12 transition-transform" />
              ) : (
                <FaAngleDoubleRight className="text-white text-sm group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="md:hidden text-white/70 hover:text-white transition-colors"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        {isExpanded && (
          <div className="mx-4 mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaUserCircle className="text-white text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Welcome Back!</p>
                <p className="text-xs text-green-300">Ready to charge?</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu - No scroll */}
        <div className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const active = isActive(item.to);
              return (
                <li key={index}>
                  <Link
                    to={item.to}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      if (window.innerWidth < 768) onClose();
                    }}
                    className={`
                      group relative flex items-center gap-4 px-4 py-3 rounded-xl
                      transition-all duration-300 ease-in-out
                      ${active 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }
                      ${!isExpanded && 'justify-center px-2'}
                    `}
                  >
                    {/* Animated icon background */}
                    {!active && (
                      <div className={`absolute inset-0 rounded-xl bg-white/0 transition-all duration-300 ${hoveredItem === index ? 'bg-white/5' : ''}`} />
                    )}
                    
                    <span className={`relative text-xl transition-all duration-300 ${active ? 'text-white' : 'text-white/70 group-hover:text-white'} ${!isExpanded && 'text-2xl'}`}>
                      {item.icon}
                    </span>
                    
                    {isExpanded && (
                      <span className={`text-sm font-medium transition-all duration-300 ${active ? 'translate-x-1' : ''}`}>
                        {item.label}
                      </span>
                    )}
                    
                    {/* Active indicator dot */}
                    {active && isExpanded && (
                      <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full shadow-lg" />
                    )}
                    
                    {/* Tooltip for collapsed mode */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Section with Divider - No scroll */}
        <div className="relative">
          {/* Decorative divider */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="px-4 py-5">
            <ul className="space-y-2">
              {/* Return to Home */}
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-xl
                    transition-all duration-300 ease-in-out
                    text-white/70 hover:bg-white/10 hover:text-white
                    ${!isExpanded && 'justify-center px-2'}
                    group relative
                  `}
                >
                  <FiHome className="text-xl" />
                  {isExpanded && <span className="text-sm font-medium">Return to Home</span>}
                  {!isExpanded && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10">
                      Return to Home
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  )}
                </Link>
              </li>

              {/* Logout Button */}
              <li>
                <button
                  onClick={handleLogout}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl
                    transition-all duration-300 ease-in-out
                    text-red-300/80 hover:bg-red-500/20 hover:text-red-200
                    ${!isExpanded && 'justify-center px-2'}
                    group relative
                  `}
                >
                  <FaSignOutAlt className="text-xl" />
                  {isExpanded && <span className="text-sm font-medium">Logout</span>}
                  {!isExpanded && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10">
                      Logout
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default Sidebar;