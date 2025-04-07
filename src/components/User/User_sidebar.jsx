
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaHome, FaUsers, FaBriefcase, FaEnvelope, FaClipboardList, FaCog, FaUserCircle, FaIdBadge } from "react-icons/fa";
// import { FaBars } from "react-icons/fa";

// const Sidebar = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(true); // State to handle sidebar expansion

//   const fetchProfileImage = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('No token found');
//       setIsLoading(false);
//       return;
//     }
//     try {
//       const response = await fetch('http://192.168.0.106:7000/auth/profile-picture', {
//         method: 'GET',
//         headers: {
//           Authorization: ` ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setProfileImage(data.profilePicture);
//       } else {
//         console.error('Failed to fetch profile picture');
//       }
//     } catch (error) {
//       console.error('Error fetching profile picture:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileImage();
//   }, []);

//   // Sidebar toggle function
//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded); // Toggle sidebar state (expanded or collapsed)
//   };

//   return (
//     <div className={`flex h-screen`}>
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen transition-all duration-300 ${isExpanded ? 'w-[250px]' : 'w-[80px]'} bg-[#2c3e50] text-white z-50`}
//       >
//         {/* Sidebar Links */}
//         <div className="p-3">
//           {/* Profile Image & Name */}
//           <div className="flex items-center justify-between">
            
//             <div className="cursor-pointer text-white" onClick={toggleSidebar}>
//               <FaBars size={30} />
//             </div>
//           </div>

//           {/* Sidebar Links */}
//           <ul className="space-y-2 px-1 mt-6">
//             <li className="flex items-center">
//               <Link
//                 to="/dashboard"
//                 className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//               >
//                 <FaUserCircle className="mr-3 text-xl" />
//                 {isExpanded && <span>Dashboard</span>}
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <Link
//                 to="/products"
//                 className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//               >
//                 <FaIdBadge className="mr-3 text-xl" />
//                 {isExpanded && <span>Products</span>}
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <Link
//                 to="/order"
//                 className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//               >
//                 <FaUsers className="mr-3 text-xl" />
//                 {isExpanded && <span>My Orders</span>}
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <Link
//                 to="/cart"
//                 className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//               >
//                 <FaBriefcase className="mr-3 text-xl" />
//                 {isExpanded && <span>Shopping Cart</span>}
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <Link
//                 to="/profile"
//                 className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//               >
//                 <FaClipboardList className="mr-3 text-xl" />
//                 {isExpanded && <span>Profile</span>}
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <Link
//                 to="/login"
//                 className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//               >
//                 <FaEnvelope className="mr-3 text-xl" />
//                 {isExpanded && <span>Logout</span>}
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <Link
//                 to="/setting"
//                 className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
//               >
//                 <FaCog className="mr-3 text-xl" />
//                 {isExpanded && <span>Settings</span>}
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className={`flex-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 p-6`}>
//         {/* You can place other content here */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaBriefcase, FaEnvelope, FaClipboardList, FaCog, FaUserCircle, FaIdBadge } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true); // State to handle sidebar expansion
  const navigate = useNavigate(); // Hook for navigation

  const fetchProfileImage = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.log("No token found");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("http://192.168.0.106:7000/auth/profile-picture", {
        method: "GET",
        headers: {
          Authorization: ` ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.profilePicture);
      } else {
        console.error("Failed to fetch profile picture");
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  // Sidebar toggle function
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); // Toggle sidebar state (expanded or collapsed)
  };

  // Handle profile navigation (check if token exists)
  const handleProfileClick = () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/profile"); // Navigate to Profile page if user is logged in
    } else {
      navigate("/login"); // Redirect to login if no token is found
    }
  };

  return (
    <div className={`flex h-screen`}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transition-all duration-300 ${isExpanded ? "w-[250px]" : "w-[80px]"} bg-[#2c3e50] text-white z-50`}
      >
        {/* Sidebar Links */}
        <div className="p-3">
          {/* Profile Image & Name */}
          <div className="flex items-center justify-between">
            <div className="cursor-pointer text-white" onClick={toggleSidebar}>
              <FaBars size={30} />
            </div>
          </div>

          {/* Sidebar Links */}
          <ul className="space-y-2 px-1 mt-6">
            <li className="flex items-center">
              <Link
                to="/dashboard"
                className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
              >
                <FaUserCircle className="mr-3 text-xl" />
                {isExpanded && <span>Dashboard</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/products"
                className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
              >
                <FaIdBadge className="mr-3 text-xl" />
                {isExpanded && <span>Products</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/order"
                className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
              >
                <FaUsers className="mr-3 text-xl" />
                {isExpanded && <span>My Orders</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/cart"
                className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
              >
                <FaBriefcase className="mr-3 text-xl" />
                {isExpanded && <span>Shopping Cart</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <button
                onClick={handleProfileClick} // Handle click for profile
                className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
              >
                <FaClipboardList className="mr-3 text-xl" />
                {isExpanded && <span>Profile</span>}
              </button>
            </li>
            <li className="flex items-center">
              <Link
                to="/login"
                className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
              >
                <FaEnvelope className="mr-3 text-xl" />
                {isExpanded && <span>Logout</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/setting"
                className="flex items-center px-1 py-2 hover:bg-[#34495e] transition-colors"
              >
                <FaCog className="mr-3 text-xl" />
                {isExpanded && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content area */}
      <div className={`flex-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 p-6`}>
        {/* You can place other content here */}
      </div>
    </div>
  );
};

export default Sidebar;
