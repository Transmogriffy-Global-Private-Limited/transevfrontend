
// import React, { useState, useEffect } from "react";
// import { FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../User/User_sidebar";
// import logo from '../../assets/log.png'
// import { Link } from "react-router-dom";
// import {  FaHome } from "react-icons/fa"; 

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const Navbar = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   // Toggle sidebar visibility
//   const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("auth_token");
//       if (!token) return;

//       try {
//         const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "API-KEY": API_KEY,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const blobUrl = convertBase64ToBlob(data.user_data.profile_picture);
//           setUserData({
//             ...data.user_data,
//             profile_picture: blobUrl,
//           });
//         } else {
//           console.error("❌ Failed to fetch user profile");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

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

//   const goToProfile = () => navigate("/profile");

//   return (
//     <div className="bg-[#75833F] font-sans shadow-md sticky top-0 z-50 w-full">
//       <header className="flex items-center justify-between px-4 py-3 md:px-6">
//         {/* Left Side: Logo and Sidebar Toggle */}
//         <div className="flex items-center gap-4">
//          <button onClick={toggleSidebar} className="text-white md:hidden">
//             <FaBars size={24} />
//           </button> 
       

//           <Link to="/dashboard">
//           <img
//             src={logo}
//             alt="TransEV Logo"
//             className="h-8 sm:h-10 ml-2 sm:ml-20"
//           />
//           </Link>
//         </div>
// <div className="flex justify-center items-center space-x-8 bg-[#75833F] py-3">
     
    
// {/* <div className="w-full flex justify-center md:justify-end">
//   <div className="w-full max-w-screen-xl px-4 flex justify-end">
//     <Link 
//       to="/" 
//       className="text-white text-lg flex items-center gap-2 hover:underline xl:ml-250 lg:mr-[-200] "
//     >
//       <FaHome size={20} />
//     </Link>
//   </div>
// </div> */}



//       </div>
//         {/* Right Side: User Info and Dropdown */}
//          <div className="flex items-center gap-3"> 
   

//           <span className="hidden md:inline-block text-white text-lg lg:text-xl">
//             Hello, {userData?.name || "User"}
//           </span>
//           <div className="relative">
//             <button
//               onClick={toggleDropdown}
//               className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
//             >
//               <img
//                 src={userData?.profile_picture || "https://via.placeholder.com/40"}
//                 alt="User"
//                 className="w-full h-full object-cover"
//               />
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
//                 <button
//                   onClick={goToProfile}
//                   className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
//                 >
//                   My Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-base text-red-500 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
         
//             )}
//           </div>
//         </div>
      
//       </header>

//       {/* Sidebar for Mobile */}
//       {sidebarVisible && (
//         <div className="md:hidden">
//           <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

// const convertBase64ToBlob = (base64String) => {
//   try {
//     const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
//     if (base64String.match(base64Regex)) {
//       base64String = base64String.replace(base64Regex, "");
//     }

//     const byteCharacters = atob(base64String);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
//       const slice = byteCharacters.slice(offset, offset + 1024);
//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }

//     const blob = new Blob(byteArrays, { type: "image/jpeg" });
//     return URL.createObjectURL(blob);
//   } catch (error) {
//     console.error("Error converting base64 to Blob:", error);
//     return "https://via.placeholder.com/150";
//   }
// };

// import React, { useState, useEffect } from "react";
// import { 
//   FaBars, 
//   FaHome, 
//   FaUserCircle, 
//   FaChevronDown, 
//   FaBell, 
//   FaSearch, 
//   FaTimes, 
//   FaUser, 
//   FaSignOutAlt, 
//   FaCog,
//   FaShoppingCart,
//   FaBox,
//   FaClipboardList
// } from "react-icons/fa";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import Sidebar from "../User/User_sidebar";
// import logo from '../../assets/log.png';

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const Navbar = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const toggleSearch = () => setSearchOpen(!searchOpen);
//   const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("auth_token");
//       if (!token) return;

//       try {
//         const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "API-KEY": API_KEY,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const blobUrl = convertBase64ToBlob(data.user_data.profile_picture);
//           setUserData({
//             ...data.user_data,
//             profile_picture: blobUrl,
//           });
//         } else {
//           console.error("Failed to fetch user profile");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

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

//   const goToProfile = () => navigate("/profile");
//   const goToCart = () => navigate("/cart");

//   // Get first letter for avatar
//   const getInitial = () => {
//     if (userData?.name) {
//       return userData.name.charAt(0).toUpperCase();
//     }
//     return "U";
//   };

//   const navLinks = [
//     { path: "/dashboard", label: "Dashboard", icon: <FaHome size={16} /> },
//     { path: "/products", label: "Products", icon: <FaBox size={16} /> },
//     { path: "/cart", label: "Cart", icon: <FaShoppingCart size={16} /> },
//     { path: "/order", label: "Orders", icon: <FaClipboardList size={16} /> },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       <nav
//         className={`
//           fixed top-0 left-0 right-0 z-50 transition-all duration-500
//           ${scrolled 
//             ? 'bg-[#1a4d2e] shadow-2xl py-2' 
//             : 'bg-gradient-to-r from-[#1a4d2e] to-[#0d331d] py-4'
//           }
//         `}
//       >
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="flex items-center justify-between">
//             {/* Left Section - Logo & Mobile Menu */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={toggleSidebar}
//                 className="text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300 lg:hidden group"
//               >
//                 <FaBars size={20} className="group-hover:scale-110 transition-transform" />
//               </button>

//               <Link to="/dashboard" className="flex items-center gap-3 group">
//                 <div className="relative">
//                   <img
//                     src={logo}
//                     alt="TransEV Logo"
//                     className="h-9 sm:h-11 transition-all duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute -inset-1 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>
                
//               </Link>

//               {/* Desktop Navigation Links */}
//               <div className="hidden lg:flex items-center ml-6 space-x-1">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     className={`
//                       flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium
//                       ${isActive(link.path) 
//                         ? 'bg-white/20 text-white shadow-lg' 
//                         : 'text-white/80 hover:bg-white/10 hover:text-white'
//                       }
//                     `}
//                   >
//                     {link.icon}
//                     {link.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Right Section - User Info & Actions */}
//             <div className="flex items-center gap-1 md:gap-2">
//               {/* Search Button */}
//               <button
//                 onClick={toggleSearch}
//                 className="text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300"
//               >
//                 <FaSearch size={18} />
//               </button>

//               {/* Cart Button - Mobile */}
//               <button
//                 onClick={goToCart}
//                 className="relative text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300 lg:hidden"
//               >
//                 <FaShoppingCart size={18} />
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">
//                   0
//                 </span>
//               </button>

//               {/* Notification Bell */}
//               <button className="relative text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300">
//                 <FaBell size={18} />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//               </button>

//               {/* User Greeting - Desktop */}
//               <div className="hidden md:flex items-center gap-3 ml-2 pr-2 border-r border-white/20">
//                 <div className="text-right">
//                   <p className="text-white/60 text-xs">Welcome back,</p>
//                   <p className="text-white text-sm font-semibold">
//                     {userData?.name?.split(' ')[0] || "Guest"}
//                   </p>
//                 </div>
//               </div>

//               {/* User Avatar Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={toggleDropdown}
//                   className="flex items-center gap-2 focus:outline-none group"
//                 >
//                   <div className="relative">
//                     <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white transition-all duration-300 shadow-md">
//                       {userData?.profile_picture ? (
//                         <img
//                           src={userData.profile_picture}
//                           alt="User"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                           <span className="text-white font-bold text-sm">{getInitial()}</span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1a4d2e]"></div>
//                   </div>
//                   <FaChevronDown 
//                     className={`text-white/70 text-xs transition-all duration-300 ${
//                       dropdownOpen ? 'rotate-180' : ''
//                     }`}
//                   />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 animate-slideDown border border-gray-100">
//                     {/* User Info in Dropdown */}
//                     <div className="px-4 py-4 border-b border-gray-100">
//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-[#1a4d2e] to-[#0d331d] flex items-center justify-center">
//                           {userData?.profile_picture ? (
//                             <img
//                               src={userData.profile_picture}
//                               alt="User"
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-white font-bold text-lg">{getInitial()}</span>
//                           )}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-gray-800">
//                             {userData?.name || "User"}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-0.5">
//                             {userData?.email || "user@example.com"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Menu Items */}
//                     <button
//                       onClick={goToProfile}
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaUserCircle className="text-gray-400" size={18} />
//                       <span>My Profile</span>
//                     </button>
                    
//                     <Link
//                       to="/setting"
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaCog className="text-gray-400" size={18} />
//                       <span>Settings</span>
//                     </Link>
                    
//                     <Link
//                       to="/order"
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaClipboardList className="text-gray-400" size={18} />
//                       <span>My Orders</span>
//                     </Link>
                    
//                     <div className="border-t border-gray-100 my-1"></div>
                    
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaSignOutAlt className="text-red-400" size={18} />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300"
//               >
//                 <FaHome size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Modal */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md animate-fadeIn lg:hidden">
//           <div className="p-4">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-white text-lg font-semibold">Menu</h3>
//               <button
//                 onClick={toggleMobileMenu}
//                 className="text-white/70 hover:text-white p-2 rounded-lg"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>
//             <div className="space-y-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={toggleMobileMenu}
//                   className={`
//                     flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
//                     ${isActive(link.path) 
//                       ? 'bg-white/20 text-white' 
//                       : 'text-white/80 hover:bg-white/10'
//                     }
//                   `}
//                 >
//                   {link.icon}
//                   <span>{link.label}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Search Modal */}
//       {searchOpen && (
//         <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md animate-fadeIn">
//           <div className="p-4">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-white text-lg font-semibold">Search</h3>
//               <button
//                 onClick={toggleSearch}
//                 className="text-white/70 hover:text-white p-2 rounded-lg"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>
//             <div className="flex items-center bg-white/10 rounded-full px-4 py-3">
//               <FaSearch className="text-white/60 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Search products, orders..."
//                 className="bg-transparent border-none outline-none text-white placeholder-white/50 text-base ml-3 w-full"
//                 autoFocus
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sidebar for Mobile */}
//       {sidebarVisible && (
//         <div className="lg:hidden">
//           <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
//         </div>
//       )}

//       {/* Spacer */}
//       <div className="h-16 md:h-18 lg:h-20"></div>

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-15px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.25s ease-out;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;

// const convertBase64ToBlob = (base64String) => {
//   try {
//     const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
//     let cleanBase64 = base64String;
//     if (base64String.match(base64Regex)) {
//       cleanBase64 = base64String.replace(base64Regex, "");
//     }

//     const byteCharacters = atob(cleanBase64);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
//       const slice = byteCharacters.slice(offset, offset + 1024);
//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }

//     const blob = new Blob(byteArrays, { type: "image/jpeg" });
//     return URL.createObjectURL(blob);
//   } catch (error) {
//     console.error("Error converting base64 to Blob:", error);
//     return "https://via.placeholder.com/150";
//   }
// };

// import React, { useState, useEffect } from "react";
// import { 
//   FaBars, 
//   FaHome, 
//   FaUserCircle, 
//   FaChevronDown, 
//   FaBell, 
//   FaTimes, 
//   FaUser, 
//   FaSignOutAlt, 
//   FaCog,
//   FaShoppingCart,
//   FaBox,
//   FaClipboardList,
//   FaBolt
// } from "react-icons/fa";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import Sidebar from "../User/User_sidebar";
// import logo from '../../assets/log.png';

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const Navbar = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Get user ID from localStorage
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("user_id");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }
//   }, []);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("auth_token");
//       if (!token) return;

//       try {
//         const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "API-KEY": API_KEY,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const blobUrl = convertBase64ToBlob(data.user_data.profile_picture);
//           setUserData({
//             ...data.user_data,
//             profile_picture: blobUrl,
//           });
//           // Store user_id if not already stored
//           if (data.user_data.id && !localStorage.getItem("user_id")) {
//             localStorage.setItem("user_id", data.user_data.id);
//             setUserId(data.user_data.id);
//           }
//         } else {
//           console.error("Failed to fetch user profile");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Fetch cart count
//   const fetchCartCount = async () => {
//     if (!userId) return;

//     try {
//       const token = localStorage.getItem("auth_token");
//       const response = await fetch(`${BASE_URL_AND_PORT}/cart/getcartdetails`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "API-KEY": API_KEY,
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({ user_id: userId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // Calculate total quantity of items in cart
//         if (data.cart_items && Array.isArray(data.cart_items)) {
//           const totalCount = data.cart_items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//           setCartCount(totalCount);
//         } else if (data.items && Array.isArray(data.items)) {
//           const totalCount = data.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
//           setCartCount(totalCount);
//         } else if (data.total_quantity) {
//           setCartCount(data.total_quantity);
//         } else if (data.count) {
//           setCartCount(data.count);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching cart count:", error);
//     }
//   };

//   // Fetch cart count when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchCartCount();
//       // Refresh cart count every 30 seconds
//       const interval = setInterval(fetchCartCount, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [userId]);

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
//         localStorage.removeItem("user_id");
//         navigate("/");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const goToProfile = () => navigate("/profile");
//   const goToCart = () => navigate("/cart");

//   // Get first letter for avatar
//   const getInitial = () => {
//     if (userData?.name) {
//       return userData.name.charAt(0).toUpperCase();
//     }
//     return "U";
//   };

//   const navLinks = [
//     { path: "/dashboard", label: "Dashboard", icon: <FaHome size={16} /> },
//     { path: "/products", label: "Products", icon: <FaBox size={16} /> },
//     { path: "/order", label: "Orders", icon: <FaClipboardList size={16} /> },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       <nav
//         className={`
//           fixed top-0 left-0 right-0 z-50 transition-all duration-500
//           ${scrolled 
//             ? 'bg-gradient-to-r from-[#0a2a1a] to-[#0d331d] shadow-2xl py-2' 
//             : 'bg-gradient-to-r from-[#1a4d2e] to-[#0d331d] py-4'
//           }
//         `}
//       >
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="flex items-center justify-between">
//             {/* Left Section - Logo & Mobile Menu */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={toggleSidebar}
//                 className="text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300 lg:hidden group"
//               >
//                 <FaBars size={20} className="group-hover:scale-110 transition-transform" />
//               </button>

//               <Link to="/dashboard" className="flex items-center gap-3 group">
//                 <div className="relative">
//                   <img
//                     src={logo}
//                     alt="TransEV Logo"
//                     className="h-9 sm:h-11 transition-all duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute -inset-1 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>
              
//               </Link>

//               {/* Desktop Navigation Links */}
//               <div className="hidden lg:flex items-center ml-6 space-x-1">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     className={`
//                       flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium
//                       ${isActive(link.path) 
//                         ? 'bg-white/20 text-white shadow-lg' 
//                         : 'text-white/80 hover:bg-white/10 hover:text-white'
//                       }
//                     `}
//                   >
//                     {link.icon}
//                     {link.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Right Section - User Info & Actions */}
//             <div className="flex items-center gap-1 md:gap-2">
//               {/* Cart Icon with Badge */}
//               <button
//                 onClick={goToCart}
//                 className="relative text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300 group"
//               >
//                 <FaShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1 shadow-lg animate-pulse">
//                     {cartCount > 99 ? '99+' : cartCount}
//                   </span>
//                 )}
//               </button>

//               {/* User Greeting - Desktop */}
//               <div className="hidden md:flex items-center gap-3 ml-2 pr-2 border-r border-white/20">
//                 <div className="text-right">
//                   <p className="text-white/60 text-xs">Welcome back,</p>
//                   <p className="text-white text-sm font-semibold">
//                     {userData?.name?.split(' ')[0] || "Guest"}
//                   </p>
//                 </div>
//               </div>

//               {/* User Avatar Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={toggleDropdown}
//                   className="flex items-center gap-2 focus:outline-none group"
//                 >
//                   <div className="relative">
//                     <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white transition-all duration-300 shadow-md">
//                       {userData?.profile_picture ? (
//                         <img
//                           src={userData.profile_picture}
//                           alt="User"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
//                           <span className="text-white font-bold text-sm">{getInitial()}</span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1a4d2e]"></div>
//                   </div>
//                   <FaChevronDown 
//                     className={`text-white/70 text-xs transition-all duration-300 ${
//                       dropdownOpen ? 'rotate-180' : ''
//                     }`}
//                   />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 animate-slideDown border border-gray-100">
//                     {/* User Info in Dropdown */}
//                     <div className="px-4 py-4 border-b border-gray-100">
//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
//                           {userData?.profile_picture ? (
//                             <img
//                               src={userData.profile_picture}
//                               alt="User"
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-white font-bold text-lg">{getInitial()}</span>
//                           )}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-gray-800">
//                             {userData?.name || "User"}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-0.5">
//                             {userData?.email || "user@example.com"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Menu Items */}
//                     <button
//                       onClick={goToProfile}
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaUserCircle className="text-gray-400" size={18} />
//                       <span>My Profile</span>
//                     </button>
                    
//                     <button
//                       onClick={goToCart}
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaShoppingCart className="text-gray-400" size={18} />
//                       <span>My Cart {cartCount > 0 && `(${cartCount})`}</span>
//                     </button>
                    
//                     <Link
//                       to="/order"
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaClipboardList className="text-gray-400" size={18} />
//                       <span>My Orders</span>
//                     </Link>
                    
//                     <Link
//                       to="/setting"
//                       className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaCog className="text-gray-400" size={18} />
//                       <span>Settings</span>
//                     </Link>
                    
//                     <div className="border-t border-gray-100 my-1"></div>
                    
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
//                     >
//                       <FaSignOutAlt className="text-red-400" size={18} />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300"
//               >
//                 <FaBars size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Modal */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md animate-fadeIn lg:hidden">
//           <div className="p-4">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <img src={logo} alt="Logo" className="h-8" />
//                 <span className="text-white font-bold text-lg">TransEV</span>
//               </div>
//               <button
//                 onClick={toggleMobileMenu}
//                 className="text-white/70 hover:text-white p-2 rounded-lg"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>
            
//             {/* User Info in Mobile Menu */}
//             <div className="flex items-center gap-3 mb-6 p-4 bg-white/10 rounded-2xl">
//               <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
//                 {userData?.profile_picture ? (
//                   <img src={userData.profile_picture} alt="User" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-white font-bold text-lg">{getInitial()}</span>
//                 )}
//               </div>
//               <div>
//                 <p className="text-white font-semibold">{userData?.name || "Guest"}</p>
//                 <p className="text-white/60 text-sm">{userData?.email || ""}</p>
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={toggleMobileMenu}
//                   className={`
//                     flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
//                     ${isActive(link.path) 
//                       ? 'bg-white/20 text-white' 
//                       : 'text-white/80 hover:bg-white/10'
//                     }
//                   `}
//                 >
//                   {link.icon}
//                   <span>{link.label}</span>
//                 </Link>
//               ))}
              
//               <button
//                 onClick={() => {
//                   goToCart();
//                   toggleMobileMenu();
//                 }}
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-white/80 hover:bg-white/10 w-full"
//               >
//                 <FaShoppingCart size={16} />
//                 <span>My Cart {cartCount > 0 && `(${cartCount})`}</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sidebar for Mobile */}
//       {sidebarVisible && (
//         <div className="lg:hidden">
//           <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
//         </div>
//       )}

//       {/* Spacer */}
//       <div className="h-16 md:h-18 lg:h-20"></div>

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-15px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.25s ease-out;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;

// const convertBase64ToBlob = (base64String) => {
//   try {
//     const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
//     let cleanBase64 = base64String;
//     if (base64String.match(base64Regex)) {
//       cleanBase64 = base64String.replace(base64Regex, "");
//     }

//     const byteCharacters = atob(cleanBase64);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
//       const slice = byteCharacters.slice(offset, offset + 1024);
//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }

//     const blob = new Blob(byteArrays, { type: "image/jpeg" });
//     return URL.createObjectURL(blob);
//   } catch (error) {
//     console.error("Error converting base64 to Blob:", error);
//     return "https://via.placeholder.com/150";
//   }
// };

import React, { useState, useEffect, useRef } from "react";
import { 
  FaBars, 
  FaHome, 
  FaUserCircle, 
  FaChevronDown, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt, 
  FaCog,
  FaShoppingCart,
  FaBox,
  FaClipboardList,
  FaBolt
} from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Sidebar from "../User/User_sidebar";
import logo from '../../assets/log.png';

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Refs for dropdown and avatar button
  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside dropdown and outside avatar button
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      if (userId) {
        fetchCartCount();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [userId]);

  // Fetch user profile
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
          if (data.user_data.id && !localStorage.getItem("user_id")) {
            localStorage.setItem("user_id", data.user_data.id);
            setUserId(data.user_data.id);
          }
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch cart count
  const fetchCartCount = async () => {
    if (!userId) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`${BASE_URL_AND_PORT}/cart/getcartdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-KEY": API_KEY,
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cart_items && Array.isArray(data.cart_items)) {
          const totalCount = data.cart_items.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(totalCount);
        } else if (data.items && Array.isArray(data.items)) {
          const totalCount = data.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(totalCount);
        } else if (data.total_quantity) {
          setCartCount(data.total_quantity);
        } else if (data.count) {
          setCartCount(data.count);
        }
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Fetch cart count when userId changes
  useEffect(() => {
    if (userId) {
      fetchCartCount();
      const interval = setInterval(fetchCartCount, 30000);
      return () => clearInterval(interval);
    }
  }, [userId]);

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
        localStorage.removeItem("user_id");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const goToProfile = () => navigate("/profile");
  const goToCart = () => navigate("/cart");

  const getInitial = () => {
    if (userData?.name) {
      return userData.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <FaHome size={16} /> },
    { path: "/products", label: "Products", icon: <FaBox size={16} /> },
    { path: "/order", label: "Orders", icon: <FaClipboardList size={16} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled 
            ? 'bg-gradient-to-r from-[#0a2a1a] to-[#0d331d] shadow-2xl py-2' 
            : 'bg-gradient-to-r from-[#1a4d2e] to-[#0d331d] py-4'
          }
        `}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo & Mobile Menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300 lg:hidden group"
              >
                <FaBars size={20} className="group-hover:scale-110 transition-transform" />
              </button>

              <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src={logo}
                    alt="TransEV Logo"
                    className="h-9 sm:h-11 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -inset-1 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center ml-6 space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium
                      ${isActive(link.path) 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section - User Info & Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Cart Icon with Badge */}
              <button
                onClick={goToCart}
                className="relative text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300 group"
              >
                <FaShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1 shadow-lg animate-pulse">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* User Greeting - Desktop */}
              <div className="hidden md:flex items-center gap-3 ml-2 pr-2 border-r border-white/20">
                <div className="text-right">
                  <p className="text-white/60 text-xs">Welcome back,</p>
                  <p className="text-white text-sm font-semibold">
                    {userData?.name?.split(' ')[0] || "Guest"}
                  </p>
                </div>
              </div>

              {/* User Avatar Dropdown */}
              <div className="relative">
                <button
                  ref={avatarButtonRef}
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white transition-all duration-300 shadow-md">
                      {userData?.profile_picture ? (
                        <img
                          src={userData.profile_picture}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{getInitial()}</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1a4d2e]"></div>
                  </div>
                  <FaChevronDown 
                    className={`text-white/70 text-xs transition-all duration-300 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 animate-slideDown border border-gray-100"
                  >
                    {/* User Info in Dropdown */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
                          {userData?.profile_picture ? (
                            <img
                              src={userData.profile_picture}
                              alt="User"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-lg">{getInitial()}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            {userData?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[150px]">
                            {userData?.email || "user@example.com"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        goToProfile();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <FaUserCircle className="text-gray-400" size={18} />
                      <span>My Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        goToCart();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <FaShoppingCart className="text-gray-400" size={18} />
                      <span>My Cart {cartCount > 0 && `(${cartCount})`}</span>
                    </button>
                    
                    <Link
                      to="/order"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <FaClipboardList className="text-gray-400" size={18} />
                      <span>My Orders</span>
                    </Link>
                    
                    <Link
                      to="/setting"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <FaCog className="text-gray-400" size={18} />
                      <span>Settings</span>
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <FaSignOutAlt className="text-red-400" size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-white hover:bg-white/10 p-2.5 rounded-xl transition-all duration-300"
              >
                <FaBars size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md animate-fadeIn lg:hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-8" />
                <span className="text-white font-bold text-lg">TransEV</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-white/70 hover:text-white p-2 rounded-lg"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            {/* User Info in Mobile Menu */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-white/10 rounded-2xl">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                {userData?.profile_picture ? (
                  <img src={userData.profile_picture} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-lg">{getInitial()}</span>
                )}
              </div>
              <div>
                <p className="text-white font-semibold">{userData?.name || "Guest"}</p>
                <p className="text-white/60 text-sm">{userData?.email || ""}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive(link.path) 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10'
                    }
                  `}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <button
                onClick={() => {
                  goToCart();
                  toggleMobileMenu();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-white/80 hover:bg-white/10 w-full"
              >
                <FaShoppingCart size={16} />
                <span>My Cart {cartCount > 0 && `(${cartCount})`}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar for Mobile */}
      {sidebarVisible && (
        <div className="lg:hidden">
          <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
        </div>
      )}

      {/* Spacer */}
      <div className="h-16 md:h-18 lg:h-20"></div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;

const convertBase64ToBlob = (base64String) => {
  try {
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
    let cleanBase64 = base64String;
    if (base64String.match(base64Regex)) {
      cleanBase64 = base64String.replace(base64Regex, "");
    }

    const byteCharacters = atob(cleanBase64);
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