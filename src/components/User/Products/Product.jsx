// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaShoppingCart } from 'react-icons/fa';
// import UserSidebar from '../User_sidebar';
// import UserNavbar from '../User_Navbar';
// import { Link, useNavigate } from "react-router-dom";
// import { FiSearch } from "react-icons/fi"; // Search icon
// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
// const token = localStorage.getItem('auth_token');

// const ProductPage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [filterType, setFilterType] = useState("ALL");

//   const [popupOpen, setPopupOpen] = useState(false);
//   const [popupContent, setPopupContent] = useState({});
//   const [popupImageIndex, setPopupImageIndex] = useState(0);

//   const [contactPopup, setContactPopup] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [hovered, setHovered] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [imageIndex, setImageIndex] = useState({});
// const [showDisclaimer, setShowDisclaimer] = useState(false);
// const navigate = useNavigate();

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await axios.get(`${BASE_URL_AND_PORT}/products/all`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'API-KEY': API_KEY,
//         },
//       });
//       setAllProducts(res.data);
//       setDisplayedProducts(res.data);
//       setLoading(false);
//     };
//     fetchProducts();
//   }, []);

//   /* 🔹 FILTER */
//   useEffect(() => {
//     if (filterType === "ALL") {
//       setDisplayedProducts(allProducts);
//     } else {
//       setDisplayedProducts(
//         allProducts.filter(p =>
//           p.name?.toUpperCase().includes(filterType) ||
//           p.model?.toUpperCase().includes(filterType)
//         )
//       );
//     }
//   }, [filterType, allProducts]);

//   const isAC = (product) =>
//     product.name?.toUpperCase().includes("AC") ||
//     product.model?.toUpperCase().includes("AC");

//   const handlePopupOpen = async (id) => {
//     const res = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'API-KEY': API_KEY,
//       },
//     });
//     setPopupContent(res.data);
//     setPopupImageIndex(0);
//     setPopupOpen(true);
//   };

//   const goToNextImage = (id) => {
//     setImageIndex(prev => {
//       const current = prev[id] || 0;
//       const product = allProducts.find(p => p.id === id);
//       return { ...prev, [id]: (current + 1) % product.image_paths.length };
//     });
//   };

//   const goToPrevImage = (id) => {
//     setImageIndex(prev => {
//       const current = prev[id] || 0;
//       const product = allProducts.find(p => p.id === id);
//       return { ...prev, [id]: (current - 1 + product.image_paths.length) % product.image_paths.length };
//     });
//   };

//   const handleAddToCart = async (id, price) => {
//     const userId = localStorage.getItem('user_id');
//     if (!userId) return alert("Please login first");

//     if (!cart.includes(id)) {
//       setCart([...cart, id]);
//       await axios.post(`${BASE_URL_AND_PORT}/cart/addtocart`, {
//         user_id: userId,
//         productid: id,
//         price: price.toString(),
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'API-KEY': API_KEY,
//         },
//       });
//       alert("Product added to cart");
//     }
//   };
//  useEffect(() => {
//     window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//   }, []);
//   /* ================= SEARCH ================= */

// const handleSearch = (e) => {
//   e.preventDefault();

//   if (!searchQuery.trim()) {
//     // If search input is empty, show all or filtered products
//     setDisplayedProducts(
//       filterType === "ALL"
//         ? allProducts
//         : allProducts.filter(
//             (p) =>
//               p.name?.toUpperCase().includes(filterType) ||
//               p.model?.toUpperCase().includes(filterType)
//           )
//     );
//     return;
//   }

//   const filtered = allProducts.filter((p) =>
//     p.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   setDisplayedProducts(filtered);
// };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <UserNavbar onToggleSidebar={toggleSidebar} />

//       <div className="flex">
//         <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//         <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full lg:ml-60">

//           {/* 🔹 HEADER */}
//           <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg shadow">
//             <h2 className="text-3xl font-bold text-white text-center flex-1">
//               See Our Products
//             </h2>

//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="bg-white px-4 py-2 rounded-md shadow font-semibold"
//             >
//               <option value="ALL">All Chargers</option>
//               <option value="AC">AC Charger</option>
//               <option value="DC">DC Charger</option>
//             </select>
//           </div>
//    {/* SEARCH */}
//          {/* SEARCH */}
// <div className="flex justify-center mb-4">
//   <form className="relative w-80" onSubmit={handleSearch}>
//     <input
//       type="text"
//       className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//       placeholder="Search by product name"
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//     />
//     <button
//       type="submit"
//       className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//     >
//       <FiSearch size={20} />
//     </button>
//   </form>
// </div>

// {/* PRODUCTS GRID */}
// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//   {loading ? (
//     <div className="col-span-full flex justify-center">
//       <div className="animate-spin w-16 h-16 border-t-4 border-green-500 rounded-full"></div>
//     </div>
//   ) : displayedProducts.length === 0 ? (
//     <div className="col-span-full text-center text-gray-500 py-20 text-lg font-semibold">
//       No products found
//     </div>
//   ) : (
//     displayedProducts.map((product, index) => (
//       <div key={product.id} className="flex flex-col items-center">
//         <div
//           className="relative bg-gray-200 p-4 rounded-lg w-[300px] h-[400px] hover:scale-105 transition"
//           onMouseEnter={() => setHovered(index)}
//           onMouseLeave={() => setHovered(null)}
//         >
//                     <img
//                       src={product.image_paths?.[imageIndex[product.id] || 0]}
//                       className="w-full h-full object-cover rounded-lg cursor-pointer"
//                       onClick={() => handlePopupOpen(product.id)}
//                     />

//                     {product.image_paths?.length > 1 && (
//                       <>
//                         <button onClick={() => goToPrevImage(product.id)}
//                           className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full">
//                           &#10094;
//                         </button>
//                         <button onClick={() => goToNextImage(product.id)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full">
//                           &#10095;
//                         </button>
//                       </>
//                     )}

//                     <div
//                       onClick={() => handlePopupOpen(product.id)}
//                       className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center cursor-pointer
//                         ${hovered === index ? 'opacity-100' : 'opacity-0'}`}
//                     >
//                       ➜
//                     </div>
//                   </div>

//                   <h3 className="mt-3 font-bold">{product.name}</h3>
//                   <p className="text-gray-600">{product.model}</p>

                 
//                   <div className="mt-4 text-center">
//    {isAC(product) ? (
//     product.quantity > 0 ? (
//       <button
//         onClick={() => handleAddToCart(product.id, product.price)}
//         className={`flex items-center justify-center px-4 py-2 rounded-md ${
//           cart.includes(product.id) ? 'bg-green-500' : 'bg-[#faa122]'
//         } text-white hover:${
//           cart.includes(product.id) ? 'bg-green-600' : 'bg-blue-600'
//         }`}
//       >
//         <FaShoppingCart className="mr-2" />
//         {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
       
//       </button>
//     ) : (
//       <div className="text-red-600 font-semibold">No Stock Available</div>
//     )
//   ) : (
//     <button
//       onClick={() => setContactPopup(true)}
//       className="bg-yellow-400 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
//     >
//       Contact Us
//     </button>
//   )} 
 

// </div>

//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 🔹 CONTACT POPUP */}
    
//       {contactPopup && (
//   <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]">
//     <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-[420px] max-w-[90%]">
      
//       <h3 className="text-2xl font-semibold text-gray-800 mb-3">
//         Contact Us
//       </h3>

//       <p className="text-gray-600 leading-relaxed">
//         For enquiries related to <span className="font-medium">DC Chargers</span>,
//         please reach out to our sales team.
//       </p>

//       <div className="mt-4 bg-gray-100 py-3 px-4 rounded-lg">
//         <p className="text-sm text-gray-500">Email us at</p>
//         {/* <p className="text-lg font-semibold text-blue-600">
//          tgwbin@gmail.com
//         </p> */}
//         <a
//   href="mailto:tgwbin@gmail.com"
//   className="text-lg font-semibold text-blue-600 hover:underline"
// >
//   tgwbin@gmail.com
// </a>

//       </div>

//       <button
//         onClick={() => setContactPopup(false)}
//         className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}


//       {/* 🔹 PRODUCT DETAILS POPUP */}
//       {popupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 sm:p-8 rounded-lg w-full sm:max-w-6xl max-w-full h-auto flex relative shadow-lg overflow-auto">

//             <button
//               className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-900"
//               onClick={() => setPopupOpen(false)}
//             >
//               &times;
//             </button>

//             <div className="flex flex-wrap sm:flex-nowrap max-w-full overflow-hidden">
//               {/* LEFT: IMAGES + BUTTON */}
//               <div className="w-full sm:w-1/2 p-4 relative">
//                 {popupContent.image_paths?.length > 0 ? (
//                   <div className="relative">
//                     <img
//                       src={popupContent.image_paths[popupImageIndex]}
//                       alt={popupContent.name}
//                       className="w-full h-auto object-contain rounded-lg shadow-md cursor-pointer"
//                       onClick={() => setPopupImageIndex((popupImageIndex + 1) % popupContent.image_paths.length)}
//                     />
//                     {popupContent.image_paths.length > 1 && (
//                       <>
//                         <button
//                           onClick={() => setPopupImageIndex((popupImageIndex - 1 + popupContent.image_paths.length) % popupContent.image_paths.length)}
//                           className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
//                         >&#60;</button>
//                         <button
//                           onClick={() => setPopupImageIndex((popupImageIndex + 1) % popupContent.image_paths.length)}
//                           className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
//                         >&#62;</button>
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt={popupContent.name}
//                     className="w-full h-auto object-contain rounded-lg shadow-md"
//                   />
//                 )}

//                 {/* 🔹 AC / DC BUTTON */}
//                 <div className="mt-4">
//                   {isAC(popupContent) ? (
//                     popupContent.quantity > 0 ? (
//                       <button
//                         onClick={() => handleAddToCart(popupContent.id, popupContent.price)}
//                         className={`flex items-center justify-center px-4 py-2 rounded-md w-full ${
//                           cart.includes(popupContent.id) ? 'bg-green-500' : 'bg-[#faa122]'
//                         } text-white hover:${
//                           cart.includes(popupContent.id) ? 'bg-green-600' : 'bg-blue-600'
//                         }`}
//                       >
//                         <FaShoppingCart className="mr-2" />
//                         {cart.includes(popupContent.id) ? 'Added to Cart' : 'Add to Cart'}
//                       </button>
//                     ) : (
//                       <div className="text-red-600 font-semibold">No Stock Available</div>
//                     )
//                   ) : (
//                     <button
//                       onClick={() => setContactPopup(true)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full"
//                     >
//                       Contact Us
//                     </button>
//                   )}
//                   {/* ✅ DISCLAIMER LINE */}
//            {/* 🔹 WARRANTY & DISCLAIMER */}
// <div className="mt-4 space-y-3 text-center">

//   {/* ✅ WARRANTY BOX */}
//   <div className="border border-green-300 rounded-lg px-4 py-3 bg-green-50">
//     <p className="text-sm sm:text-base text-green-700 font-semibold">
//       🛡️ Warranty:
//       <span className="ml-2 font-bold">12 Months</span>
//     </p>
//   </div>

  
//     <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3">
//       <p className="text-sm font-semibold text-red-700 sm:text-base">
//         ⚠️ Disclaimer:
//          <span className="ml-2">Cancellations & Refunds Policy</span>
//       </p>

//       {/* Read More Button (Direct Link) */}
//       {/* <Link
//         to="/cancellation-policy"
//         className="mt-2 inline-block text-sm text-red-600 underline transition hover:text-red-800"
//       >
//         Read more
//       </Link> */}
//       <button
//   onClick={() => {
//     window.scrollTo({ top: 0, left: 0, behavior: "instant" });
//     navigate("/cancellation-policy");
//   }}
//   className="mt-2 inline-block text-sm text-red-600 underline hover:text-red-800"
// >
//   Read more
// </button>

//     </div>

// </div>


//                 </div>
//               </div>

//               {/* RIGHT: Product Info */}
             
//                 <div className="w-full sm:w-1/2 p-4">
//   <h3 className="text-3xl font-semibold mb-4 text-blue-600">
//     Product Name: {popupContent.name}
//   </h3>

//   <h4 className="text-2xl font-semibold mb-4 text-green-600">
//     Model: {popupContent.model}
//   </h4>


// <div className="mb-4 flex items-end gap-4 flex-wrap">
//   <span className="text-2xl font-semibold text-gray-700">
//     Price:
//   </span>

  
//   {popupContent.mrp && popupContent.mrp > popupContent.price && (
//     <span className="text-2xl sm:text-3xl font-semibold text-gray-400 line-through">
//       ₹{popupContent.mrp}
//     </span>
//   )}


//   {/* <span className="text-3xl sm:text-4xl font-bold text-red-600">
//     ₹{popupContent.price}
//   </span> */}
//   <span className="text-3xl sm:text-4xl font-bold text-red-600">
//   ₹{popupContent.price}
// </span>

// {!isAC(popupContent) && (
//   <span className="text-sm sm:text-base text-gray-600 font-semibold ml-2">
//     + Extra GST
//   </span>
// )}

// </div>



//   <div className="flex items-center gap-3 mt-2">
//     <h4 className="text-xl font-semibold text-teal-600">
//       Product Color:
//     </h4>

//     <span className="text-lg font-medium capitalize">
//       {popupContent.product_color}
//     </span>

//     <div
//       className="w-6 h-6 rounded border border-gray-300"
//       style={{ backgroundColor: popupContent.product_color?.toLowerCase() }}
//     />
//   </div> 


//                 {popupContent.details?.additional_details && (
//                   <p className="text-lg mb-4">Features: {popupContent.details.additional_details}</p>
//                 )}
//                 <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6 max-h-[400px] overflow-y-auto">
//                   <table className="min-w-full table-auto">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="px-4 py-2 text-left text-sm font-semibold">Detail</th>
//                         <th className="px-4 py-2 text-left text-sm font-semibold">Value</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[
//                         ['phase', 'Phase'],
//                         ['cooling', 'Cooling'],
//                         ['rated_power', 'Rated Power'],
//                         ['ingress_protection', 'Ingress Protection'],
//                         ['current', 'Current'],
//                         ['display', 'Display'],
//                         ['gun_type', 'Gun Type'],
//                         ['gun_details', 'Gun Details'],
//                         ['material', 'Material'],
//                         ['frequency', 'Frequency'],
//                         ['dimensions', 'Dimensions'],
//                         ['protection', 'Protection'],
//                         ['fast_charger', 'Fast Charger'],
//                         ['communication', 'Communication'],
//                         ['cable_length', 'Cable Length'],
//                         ['mountingtype', 'Mounting Type'],
//                         ['input_voltage', 'Input Voltage'],
//                         ['ouput_voltage', 'Output Voltage'],
//                         ['operatingtemps', 'Operating Temperature'],
//                         ['ocpp_present','OCPP Present'],
//                         ['safetyregulation', 'Safety Regulation'],
//                         ['push_button', 'Push Button'],
//                         ['chargingoperation', 'Charging Operation'],
//                       ].map(([key, label], index) => {
//                         const value = popupContent.details?.[key];
//                         if (!value || value === 'N/A') return null;
//                         return (
//                           <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
//                             <td className="px-4 py-2 text-sm font-medium">{label}</td>
//                             <td className="px-4 py-2 text-sm">{value}</td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ProductPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaShoppingCart, FaHeart, FaRegHeart, FaShare, FaStar, FaStarHalfAlt, FaRegStar, FaEye } from 'react-icons/fa';
// import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight, FiInfo, FiZoomIn } from 'react-icons/fi';
// import { MdElectricBolt, MdSpeed, MdSecurity, MdVerified } from 'react-icons/md';
// import UserSidebar from '../User_sidebar';
// import UserNavbar from '../User_Navbar';
// import { Link, useNavigate } from "react-router-dom";

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
// const token = localStorage.getItem('auth_token');

// const ProductPage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [filterType, setFilterType] = useState("ALL");
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [popupContent, setPopupContent] = useState({});
//   const [popupImageIndex, setPopupImageIndex] = useState(0);
//   const [contactPopup, setContactPopup] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [imageIndex, setImageIndex] = useState({});
//   const [wishlist, setWishlist] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState([0, 500000]);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [toastMessage, setToastMessage] = useState(null);
//   const navigate = useNavigate();

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   // Show toast notification
//   const showToast = (message, type = 'success') => {
//     setToastMessage({ message, type });
//     setTimeout(() => setToastMessage(null), 3000);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL_AND_PORT}/products/all`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'API-KEY': API_KEY,
//           },
//         });
//         setAllProducts(res.data);
//         setDisplayedProducts(res.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();

//     const savedWishlist = localStorage.getItem('wishlist');
//     if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
//   }, []);

//   useEffect(() => {
//     let filtered = [...allProducts];
    
//     if (filterType !== "ALL") {
//       filtered = filtered.filter(p =>
//         p.name?.toUpperCase().includes(filterType) ||
//         p.model?.toUpperCase().includes(filterType)
//       );
//     }
    
//     if (searchQuery) {
//       filtered = filtered.filter(p =>
//         p.name?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
//     setDisplayedProducts(filtered);
//   }, [filterType, allProducts, searchQuery, priceRange]);

//   const isAC = (product) =>
//     product.name?.toUpperCase().includes("AC") ||
//     product.model?.toUpperCase().includes("AC");

//   const handlePopupOpen = async (id) => {
//     try {
//       const res = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'API-KEY': API_KEY,
//         },
//       });
//       setPopupContent(res.data);
//       setPopupImageIndex(0);
//       setPopupOpen(true);
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       showToast('Failed to load product details', 'error');
//     }
//   };

//   const goToNextImage = (id) => {
//     setImageIndex(prev => {
//       const current = prev[id] || 0;
//       const product = allProducts.find(p => p.id === id);
//       return { ...prev, [id]: (current + 1) % (product?.image_paths?.length || 1) };
//     });
//   };

//   const goToPrevImage = (id) => {
//     setImageIndex(prev => {
//       const current = prev[id] || 0;
//       const product = allProducts.find(p => p.id === id);
//       return { ...prev, [id]: (current - 1 + (product?.image_paths?.length || 1)) % (product?.image_paths?.length || 1) };
//     });
//   };

//   const handleAddToCart = async (id, price) => {
//     const userId = localStorage.getItem('user_id');
//     if (!userId) {
//       showToast("Please login first", 'error');
//       return;
//     }

//     if (!cart.includes(id)) {
//       setCart([...cart, id]);
//       try {
//         await axios.post(`${BASE_URL_AND_PORT}/cart/addtocart`, {
//           user_id: userId,
//           productid: id,
//           price: price.toString(),
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'API-KEY': API_KEY,
//           },
//         });
//         showToast("Product added to cart successfully!", 'success');
//       } catch (error) {
//         console.error('Error adding to cart:', error);
//         showToast("Failed to add to cart", 'error');
//       }
//     } else {
//       showToast("Product already in cart", 'info');
//     }
//   };

//   const toggleWishlist = (productId) => {
//     let newWishlist;
//     if (wishlist.includes(productId)) {
//       newWishlist = wishlist.filter(id => id !== productId);
//       showToast("Removed from wishlist", 'info');
//     } else {
//       newWishlist = [...wishlist, productId];
//       showToast("Added to wishlist", 'success');
//     }
//     setWishlist(newWishlist);
//     localStorage.setItem('wishlist', JSON.stringify(newWishlist));
//   };

//   const getRating = (product) => {
//     return 4.5;
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
//     }
//     while (stars.length < 5) {
//       stars.push(<FaRegStar key={stars.length} className="text-yellow-400" />);
//     }
//     return stars;
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <UserNavbar onToggleSidebar={toggleSidebar} />

//       <div className="flex relative">
//         <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//         <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full`}>
//           <div className="p-4 md:p-6 lg:p-8">
//             {/* Toast Notification */}
//             {toastMessage && (
//               <div className={`fixed top-20 right-4 z-50 animate-slideIn ${
//                 toastMessage.type === 'success' ? 'bg-green-500' : 
//                 toastMessage.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
//               } text-white px-6 py-3 rounded-lg shadow-lg`}>
//                 {toastMessage.message}
//               </div>
//             )}

//             {/* Hero Section */}
//             <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl mb-6 md:mb-8">
//               <div className="absolute inset-0 bg-black opacity-20"></div>
//               <div className="relative z-10 px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
//                 <div className="max-w-2xl">
//                   <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">Discover Our EV Chargers</h1>
//                   <p className="text-blue-100 text-sm md:text-base lg:text-lg mb-4 md:mb-6">High-performance charging solutions for every need. Fast, reliable, and future-ready.</p>
//                   <div className="flex gap-3 md:gap-4">
//                     <button className="bg-white text-blue-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base">Shop Now</button>
//                     <button className="border-2 border-white text-white px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-sm md:text-base">Learn More</button>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute right-0 bottom-0 opacity-10 hidden md:block">
//                 <MdElectricBolt size={200} className="text-white" />
//               </div>
//             </div>

//             {/* Controls Bar */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4 mb-6">
//               <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
//                 {/* Search */}
//                 <div className="relative w-full md:w-96">
//                   <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
//                     placeholder="Search by product name..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   {searchQuery && (
//                     <button
//                       onClick={() => setSearchQuery('')}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <FiX size={18} />
//                     </button>
//                   )}
//                 </div>

//                 <div className="flex gap-3 w-full md:w-auto">
//                   <select
//                     value={filterType}
//                     onChange={(e) => setFilterType(e.target.value)}
//                     className="flex-1 md:flex-none px-4 py-2.5 border border-gray-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
//                   >
//                     <option value="ALL">All Chargers</option>
//                     <option value="AC">AC Charger</option>
//                     <option value="DC">DC Charger</option>
//                   </select>

//                   <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className="flex-1 md:flex-none px-4 py-2.5 border border-gray-300 rounded-lg bg-white font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm md:text-base"
//                   >
//                     <FiFilter size={18} />
//                     Filters
//                   </button>
//                 </div>
//               </div>

//               {/* Expanded Filters */}
//               {showFilters && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="grid grid-cols-1 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</label>
//                       <input
//                         type="range"
//                         min="0"
//                         max="500000"
//                         step="5000"
//                         value={priceRange[1]}
//                         onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Products Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//               {loading ? (
//                 <div className="col-span-full flex justify-center py-20">
//                   <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-b-4 border-blue-600"></div>
//                 </div>
//               ) : displayedProducts.length === 0 ? (
//                 <div className="col-span-full text-center py-20">
//                   <div className="text-gray-400 text-5xl md:text-6xl mb-4">🔌</div>
//                   <p className="text-gray-500 text-base md:text-lg">No products found matching your criteria.</p>
//                   <button
//                     onClick={() => { setSearchQuery(''); setFilterType('ALL'); setPriceRange([0, 500000]); }}
//                     className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
//                   >
//                     Clear all filters
//                   </button>
//                 </div>
//               ) : (
//                 displayedProducts.map((product, index) => {
//                   const rating = getRating(product);
//                   return (
//                     <div
//                       key={product.id}
//                       className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
//                       onMouseEnter={() => setHoveredProduct(product.id)}
//                       onMouseLeave={() => setHoveredProduct(null)}
//                     >
//                       {/* Image Container */}
//                       <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-56 md:h-64 overflow-hidden cursor-pointer">
//                         <img
//                           src={product.image_paths?.[imageIndex[product.id] || 0] || 'https://via.placeholder.com/300'}
//                           alt={product.name}
//                           className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
//                           onClick={() => handlePopupOpen(product.id)}
//                         />
                        
//                         {/* Quick View Overlay */}
//                         {hoveredProduct === product.id && (
//                           <div 
//                             className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300"
//                             onClick={() => handlePopupOpen(product.id)}
//                           >
//                             <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 text-gray-800 font-semibold">
//                               <FiZoomIn size={18} />
//                               <span>Quick View</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {/* Wishlist Button */}
//                         <button
//                           onClick={() => toggleWishlist(product.id)}
//                           className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition z-10"
//                         >
//                           {wishlist.includes(product.id) ? (
//                             <FaHeart className="text-red-500" size={16} />
//                           ) : (
//                             <FaRegHeart className="text-gray-400 hover:text-red-500" size={16} />
//                           )}
//                         </button>

//                         {/* Image Navigation */}
//                         {product.image_paths?.length > 1 && (
//                           <>
//                             <button
//                               onClick={(e) => { e.stopPropagation(); goToPrevImage(product.id); }}
//                               className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition z-10"
//                             >
//                               <FiChevronLeft size={14} />
//                             </button>
//                             <button
//                               onClick={(e) => { e.stopPropagation(); goToNextImage(product.id); }}
//                               className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition z-10"
//                             >
//                               <FiChevronRight size={14} />
//                             </button>
//                           </>
//                         )}

//                         {/* Badge */}
//                         <div className="absolute top-3 left-3 z-10">
//                           <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isAC(product) ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
//                             {isAC(product) ? 'AC Charger' : 'DC Charger'}
//                           </span>
//                         </div>

//                         {/* Click indicator */}
//                         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//                           Click to view details
//                         </div>
//                       </div>

//                       {/* Product Info */}
//                       <div className="p-4">
//                         <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1 line-clamp-1">{product.name}</h3>
//                         <p className="text-gray-500 text-xs md:text-sm mb-2">{product.model}</p>
                        
//                         {/* Rating */}
//                         <div className="flex items-center gap-1 mb-2">
//                           {renderStars(rating)}
//                           <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 200) + 50})</span>
//                         </div>

//                         {/* Price */}
//                         <div className="mb-3">
//                           <span className="text-xl md:text-2xl font-bold text-blue-600">₹{product.price?.toLocaleString()}</span>
//                           {product.mrp && product.mrp > product.price && (
//                             <span className="text-xs md:text-sm text-gray-400 line-through ml-2">₹{product.mrp?.toLocaleString()}</span>
//                           )}
//                           {!isAC(product) && (
//                             <span className="text-xs text-gray-500 ml-2">+ GST</span>
//                           )}
//                         </div>

//                         {/* Stock Status */}
//                         {isAC(product) && (
//                           <div className="mb-3">
//                             {product.quantity > 0 ? (
//                               <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
//                             ) : (
//                               <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
//                             )}
//                           </div>
//                         )}

//                         {/* Action Buttons */}
//                         {isAC(product) ? (
//                           product.quantity > 0 ? (
//                             <button
//                               onClick={() => handleAddToCart(product.id, product.price)}
//                               className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-sm md:text-base ${cart.includes(product.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
//                             >
//                               <FaShoppingCart size={14} />
//                               {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
//                             </button>
//                           ) : (
//                             <button className="w-full py-2.5 rounded-lg font-semibold bg-gray-300 text-gray-500 cursor-not-allowed text-sm md:text-base">
//                               Out of Stock
//                             </button>
//                           )
//                         ) : (
//                           <button
//                             onClick={() => setContactPopup(true)}
//                             className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition text-sm md:text-base"
//                           >
//                             Contact Sales Team
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Contact Popup */}
//       {contactPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] animate-fadeIn p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
//             <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
//               <h3 className="text-xl font-bold text-white">Contact Sales Team</h3>
//             </div>
//             <div className="p-6">
//               <p className="text-gray-600 mb-4">
//                 For enquiries about <span className="font-semibold text-orange-600">DC Fast Chargers</span>, please reach out to our dedicated sales team.
//               </p>
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <p className="text-sm text-gray-500 mb-1">Email us at</p>
//                 <a
//                   href="mailto:tgwbin@gmail.com"
//                   className="text-lg font-semibold text-blue-600 hover:underline break-all"
//                 >
//                   tgwbin@gmail.com
//                 </a>
//               </div>
//               <button
//                 onClick={() => setContactPopup(false)}
//                 className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product Details Popup with Specifications */}
//       {popupOpen && popupContent.id && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999] p-4 animate-fadeIn overflow-y-auto">
//           <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
//             <button
//               className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
//               onClick={() => setPopupOpen(false)}
//             >
//               <FiX size={18} />
//             </button>

//             <div className="p-4 md:p-6 lg:p-8">
//               <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//                 {/* Left - Images */}
//                 <div className="lg:w-1/2">
//                   <div className="relative bg-gray-100 rounded-xl overflow-hidden">
//                     <img
//                       src={popupContent.image_paths?.[popupImageIndex] || 'https://via.placeholder.com/400'}
//                       alt={popupContent.name}
//                       className="w-full h-64 md:h-80 lg:h-96 object-contain p-4 cursor-pointer"
//                       onClick={() => setPopupImageIndex(prev => (prev + 1) % (popupContent.image_paths?.length || 1))}
//                     />
//                     {popupContent.image_paths?.length > 1 && (
//                       <>
//                         <button
//                           onClick={() => setPopupImageIndex(prev => (prev - 1 + popupContent.image_paths.length) % popupContent.image_paths.length)}
//                           className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
//                         >
//                           <FiChevronLeft size={18} />
//                         </button>
//                         <button
//                           onClick={() => setPopupImageIndex(prev => (prev + 1) % popupContent.image_paths.length)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
//                         >
//                           <FiChevronRight size={18} />
//                         </button>
//                       </>
//                     )}
//                     {/* Click indicator on image */}
//                     <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
//                       Click image to see next
//                     </div>
//                   </div>
                  
//                   {/* Thumbnails */}
//                   {popupContent.image_paths?.length > 1 && (
//                     <div className="flex gap-2 mt-4 justify-center flex-wrap">
//                       {popupContent.image_paths.map((img, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setPopupImageIndex(idx)}
//                           className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition ${popupImageIndex === idx ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
//                         >
//                           <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Right - Details */}
//                 <div className="lg:w-1/2">
//                   <div className="mb-4">
//                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${isAC(popupContent) ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
//                       {isAC(popupContent) ? 'AC Charger' : 'DC Charger'}
//                     </span>
//                   </div>
                  
//                   <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{popupContent.name}</h2>
//                   <p className="text-gray-500 text-sm md:text-base mb-4">Model: {popupContent.model}</p>
                  
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="flex items-center gap-1">
//                       {renderStars(4.5)}
//                     </div>
//                     <span className="text-sm text-gray-500">(45 reviews)</span>
//                   </div>

//                   <div className="mb-4">
//                     <span className="text-2xl md:text-3xl font-bold text-blue-600">₹{popupContent.price?.toLocaleString()}</span>
//                     {popupContent.mrp && popupContent.mrp > popupContent.price && (
//                       <span className="text-gray-400 line-through ml-2">₹{popupContent.mrp?.toLocaleString()}</span>
//                     )}
//                   </div>

//                   {/* Features Section */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <MdVerified className="text-green-600" size={18} />
//                       <span>12 Months Warranty</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <MdSecurity className="text-blue-600" size={18} />
//                       <span>Safety Certified</span>
//                     </div>
//                     {popupContent.details?.cable_length && (
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <MdSpeed className="text-orange-600" size={18} />
//                         <span>Cable: {popupContent.details.cable_length}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="space-y-3">
//                     {isAC(popupContent) ? (
//                       popupContent.quantity > 0 ? (
//                         <button
//                           onClick={() => handleAddToCart(popupContent.id, popupContent.price)}
//                           className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${cart.includes(popupContent.id) ? 'bg-green-500' : 'bg-blue-600'} text-white hover:opacity-90`}
//                         >
//                           <FaShoppingCart size={18} />
//                           {cart.includes(popupContent.id) ? 'Added to Cart' : 'Add to Cart'}
//                         </button>
//                       ) : (
//                         <button className="w-full py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed">
//                           Out of Stock
//                         </button>
//                       )
//                     ) : (
//                       <button
//                         onClick={() => {
//                           setContactPopup(true);
//                           setPopupOpen(false);
//                         }}
//                         className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition"
//                       >
//                         Request Quote
//                       </button>
//                     )}
                    
//                     <button
//                       onClick={() => toggleWishlist(popupContent.id)}
//                       className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border transition ${wishlist.includes(popupContent.id) ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
//                     >
//                       {wishlist.includes(popupContent.id) ? <FaHeart /> : <FaRegHeart />}
//                       {wishlist.includes(popupContent.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
//                     </button>
//                   </div>

//                   {/* Disclaimer */}
//                   <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
//                     <p className="text-sm text-red-700">
//                       <strong>⚠️ Disclaimer:</strong> Cancellations & Refunds Policy applies.
//                       <button
//                         onClick={() => navigate("/cancellation-policy")}
//                         className="ml-2 text-red-600 underline hover:text-red-800"
//                       >
//                         Read more
//                       </button>
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Specifications Table */}
//               {popupContent.details && Object.keys(popupContent.details).filter(k => popupContent.details[k] && popupContent.details[k] !== 'N/A').length > 0 && (
//                 <div className="mt-8">
//                   <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Technical Specifications</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {Object.entries(popupContent.details).map(([key, value]) => {
//                       if (!value || value === 'N/A') return null;
//                       const labels = {
//                         phase: 'Phase', cooling: 'Cooling', rated_power: 'Rated Power',
//                         ingress_protection: 'Ingress Protection', current: 'Current',
//                         display: 'Display', gun_type: 'Gun Type', material: 'Material',
//                         dimensions: 'Dimensions', protection: 'Protection',
//                         communication: 'Communication', cable_length: 'Cable Length',
//                         input_voltage: 'Input Voltage', ouput_voltage: 'Output Voltage',
//                         operatingtemps: 'Operating Temperature', ocpp_present: 'OCPP Present'
//                       };
//                       return (
//                         <div key={key} className="flex justify-between py-2 border-b border-gray-100">
//                           <span className="font-medium text-gray-600 text-sm md:text-base">{labels[key] || key.replace(/_/g, ' ')}</span>
//                           <span className="text-gray-800 text-sm md:text-base">{value}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideIn {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';
import { MdElectricBolt, MdSpeed, MdSecurity, MdVerified, MdFlashOn } from 'react-icons/md';
import UserSidebar from '../User_sidebar';
import UserNavbar from '../User_Navbar';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [popupImageIndex, setPopupImageIndex] = useState(0);
  const [contactPopup, setContactPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [powerRange, setPowerRange] = useState([0, 200]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Function to refresh cart count in navbar
  const refreshCartCount = () => {
    // Dispatch a custom event that the navbar can listen to
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await axios.get(`${BASE_URL_AND_PORT}/products/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
          },
        });
        setAllProducts(res.data);
        setDisplayedProducts(res.data);
        console.log('All products loaded:', res.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    
    // Load cart items from localStorage or API
    const loadCart = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const token = localStorage.getItem('auth_token');
          const response = await axios.post(`${BASE_URL_AND_PORT}/cart/getcartdetails`, {
            user_id: userId
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'API-KEY': API_KEY,
            },
          });
          if (response.data && response.data.cart_items) {
            const cartProductIds = response.data.cart_items.map(item => item.productid);
            setCart(cartProductIds);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    };
    loadCart();
  }, []);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      // Refresh cart when event is triggered
      const refreshCart = async () => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
          try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.post(`${BASE_URL_AND_PORT}/cart/getcartdetails`, {
              user_id: userId
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': API_KEY,
              },
            });
            if (response.data && response.data.cart_items) {
              const cartProductIds = response.data.cart_items.map(item => item.productid);
              setCart(cartProductIds);
            }
          } catch (error) {
            console.error('Error refreshing cart:', error);
          }
        }
      };
      refreshCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];
    
    if (filterType !== "ALL") {
      filtered = filtered.filter(p => {
        const nameUpper = p.name?.toUpperCase() || '';
        const modelUpper = p.model?.toUpperCase() || '';
        
        if (filterType === "DC") {
          return nameUpper.includes("DC") || 
                 modelUpper.includes("DC") ||
                 nameUpper.includes("60KW") ||
                 nameUpper.includes("120KW") ||
                 modelUpper.includes("60KW") ||
                 modelUpper.includes("120KW");
        } else if (filterType === "AC") {
          return nameUpper.includes("AC") || modelUpper.includes("AC");
        }
        return true;
      });
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.model?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    if (powerRange[1] < 200) {
      filtered = filtered.filter(p => {
        const power = getChargerPower(p);
        return power >= powerRange[0] && power <= powerRange[1];
      });
    }
    
    setDisplayedProducts(filtered);
  }, [filterType, allProducts, searchQuery, priceRange, powerRange]);

  const getChargerPower = (product) => {
    const name = product.name?.toUpperCase() || '';
    const model = product.model?.toUpperCase() || '';
    
    if (name.includes("120KW") || model.includes("120KW")) return 120;
    if (name.includes("60KW") || model.includes("60KW")) return 60;
    if (name.includes("30KW") || model.includes("30KW")) return 30;
    if (name.includes("22KW") || model.includes("22KW")) return 22;
    if (name.includes("7KW") || model.includes("7KW")) return 7;
    
    return isAC(product) ? 7 : 60;
  };

  const isAC = (product) => {
    const name = product.name?.toUpperCase() || '';
    const model = product.model?.toUpperCase() || '';
    return name.includes("AC") || model.includes("AC");
  };

  const isDC60KW = (product) => {
    const name = product.name?.toUpperCase() || '';
    const model = product.model?.toUpperCase() || '';
    return (name.includes("60KW") || model.includes("60KW")) && !isAC(product);
  };

  const isDC120KW = (product) => {
    const name = product.name?.toUpperCase() || '';
    const model = product.model?.toUpperCase() || '';
    return (name.includes("120KW") || model.includes("120KW")) && !isAC(product);
  };

  const getChargerBadge = (product) => {
    if (isDC120KW(product)) return { text: '⚡ 120kW Ultra Fast', color: 'bg-red-100 text-red-700', icon: '🔥' };
    if (isDC60KW(product)) return { text: '⚡ 60kW Fast Charger', color: 'bg-purple-100 text-purple-700', icon: '🚀' };
    if (!isAC(product)) return { text: 'DC Fast Charger', color: 'bg-blue-100 text-blue-700', icon: '⚡' };
    const power = getChargerPower(product);
    if (power >= 22) return { text: `AC ${power}kW`, color: 'bg-green-100 text-green-700', icon: '🔌' };
    return { text: 'AC Charger', color: 'bg-green-100 text-green-700', icon: '🔌' };
  };

  const handlePopupOpen = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });
      setPopupContent(res.data);
      setPopupImageIndex(0);
      setPopupOpen(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      showToast('Failed to load product details', 'error');
    }
  };

  const goToNextImage = (id) => {
    setImageIndex(prev => {
      const current = prev[id] || 0;
      const product = allProducts.find(p => p.id === id);
      return { ...prev, [id]: (current + 1) % (product?.image_paths?.length || 1) };
    });
  };

  const goToPrevImage = (id) => {
    setImageIndex(prev => {
      const current = prev[id] || 0;
      const product = allProducts.find(p => p.id === id);
      return { ...prev, [id]: (current - 1 + (product?.image_paths?.length || 1)) % (product?.image_paths?.length || 1) };
    });
  };

  const handleAddToCart = async (id, price) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      showToast("Please login first", 'error');
      return;
    }

    if (!cart.includes(id)) {
      setCart([...cart, id]);
      try {
        const token = localStorage.getItem('auth_token');
        await axios.post(`${BASE_URL_AND_PORT}/cart/addtocart`, {
          user_id: userId,
          productid: id,
          price: price.toString(),
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
          },
        });
        showToast("Product added to cart successfully!", 'success');
        // Refresh cart count in navbar
        refreshCartCount();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast("Failed to add to cart", 'error');
        // Revert cart state if API call fails
        setCart(cart.filter(cartId => cartId !== id));
      }
    } else {
      showToast("Product already in cart", 'info');
    }
  };

  const handleRemoveFromCart = async (id) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    setCart(cart.filter(cartId => cartId !== id));
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(`${BASE_URL_AND_PORT}/cart/removefromcart`, {
        user_id: userId,
        productid: id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });
      showToast("Product removed from cart", 'info');
      // Refresh cart count in navbar
      refreshCartCount();
    } catch (error) {
      console.error('Error removing from cart:', error);
      showToast("Failed to remove from cart", 'error');
      // Revert cart state
      const response = await axios.post(`${BASE_URL_AND_PORT}/cart/getcartdetails`, {
        user_id: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });
      if (response.data && response.data.cart_items) {
        const cartProductIds = response.data.cart_items.map(item => item.productid);
        setCart(cartProductIds);
      }
    }
  };

  const toggleWishlist = (productId) => {
    let newWishlist;
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter(id => id !== productId);
      showToast("Removed from wishlist", 'info');
    } else {
      newWishlist = [...wishlist, productId];
      showToast("Added to wishlist", 'success');
    }
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const getRating = (product) => {
    if (isDC120KW(product)) return 4.9;
    if (isDC60KW(product)) return 4.8;
    return 4.5;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-yellow-400" />);
    }
    return stars;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
 // Handle responsive sidebar state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
     <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <UserNavbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content - Dynamic margin based on sidebar state */}
        <main 
          className={`
            flex-1 transition-all duration-300 ease-in-out w-full
            ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}
            ${isMobile && sidebarOpen ? 'overflow-hidden' : ''}
          `}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {/* Toast Notification */}
            {toastMessage && (
              <div className={`fixed top-20 right-4 z-50 animate-slideIn ${
                toastMessage.type === 'success' ? 'bg-green-500' : 
                toastMessage.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
              } text-white px-6 py-3 rounded-lg shadow-lg`}>
                {toastMessage.message}
              </div>
            )}

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl mb-6 md:mb-8">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="relative z-10 px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
                <div className="max-w-2xl">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">Discover Our EV Chargers</h1>
                  <p className="text-blue-100 text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                    From 7kW home chargers to 120kW ultra-fast DC chargers. Find the perfect charging solution for your needs.
                  </p>
                  <div className="flex gap-3 md:gap-4 flex-wrap">
                    <button className="bg-white text-blue-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base">Shop Now</button>
<Link to="/about">
  <button className="border-2 border-white text-white px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-sm md:text-base">
    Learn More
  </button>
</Link>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 hidden md:block">
                <MdElectricBolt size={200} className="text-white" />
              </div>
            </div>

            {/* Quick Category Filters */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => { setFilterType('ALL'); setSearchQuery(''); setPowerRange([0, 200]); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${filterType === 'ALL' && !searchQuery ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                All Products
              </button>
              <button
                onClick={() => { setFilterType('AC'); setSearchQuery(''); setPowerRange([0, 200]); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${filterType === 'AC' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                🔌 AC Chargers
              </button>
              <button
                onClick={() => { setFilterType('DC'); setSearchQuery(''); setPowerRange([0, 200]); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${filterType === 'DC' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                ⚡ All DC Chargers
              </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
                <div className="relative w-full md:w-96">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Search by name or power (e.g., 60kW, 120kW)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="flex-1 md:flex-none px-4 py-2.5 border border-gray-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  >
                    <option value="ALL">All Chargers</option>
                    <option value="AC">AC Charger (7kW-22kW)</option>
                    <option value="DC">DC Fast Charger (30kW-120kW)</option>
                  </select>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex-1 md:flex-none px-4 py-2.5 border border-gray-300 rounded-lg bg-white font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm md:text-base"
                  >
                    <FiFilter size={18} />
                    Filters
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</label>
                      <input
                        type="range"
                        min="0"
                        max="2000000"
                        step="10000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Power Range: {powerRange[0]}kW - {powerRange[1]}kW</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        value={powerRange[1]}
                        onChange={(e) => setPowerRange([powerRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>7kW</span>
                        <span>22kW</span>
                        <span>30kW</span>
                        <span>60kW</span>
                        <span>120kW</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {loading ? (
                <div className="col-span-full flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-b-4 border-blue-600"></div>
                </div>
              ) : displayedProducts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="text-gray-400 text-5xl md:text-6xl mb-4">🔌</div>
                  <p className="text-gray-500 text-base md:text-lg">No products found matching your criteria.</p>
                  <p className="text-gray-400 text-sm mt-2">Try searching for "60kW" or "120kW" to find DC fast chargers.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setFilterType('ALL'); setPriceRange([0, 2000000]); setPowerRange([0, 200]); }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                displayedProducts.map((product) => {
                  const rating = getRating(product);
                  const chargerPower = getChargerPower(product);
                  const badge = getChargerBadge(product);
                  const isDCProduct = !isAC(product);
                  
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-56 md:h-64 overflow-hidden cursor-pointer">
                        <img
                          src={product.image_paths?.[imageIndex[product.id] || 0] || 'https://via.placeholder.com/300'}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          onClick={() => handlePopupOpen(product.id)}
                        />
                        
                        {/* Power Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badge.color}`}>
                            {badge.icon} {badge.text}
                          </span>
                        </div>

                        {/* Special Badge for 60kW and 120kW */}
                        {(isDC60KW(product) || isDC120KW(product)) && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${isDC120KW(product) ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                              {isDC120KW(product) ? 'ULTRA FAST' : 'FAST CHARGE'}
                            </span>
                          </div>
                        )}

                        {/* {hoveredProduct === product.id && (
                          <div 
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300"
                            onClick={() => handlePopupOpen(product.id)}
                          >
                            <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 text-gray-800 font-semibold">
                              <FiZoomIn size={18} />
                              <span>Quick View</span>
                            </div>
                          </div>
                        )} */}
    {hoveredProduct === product.id && (
  <div 
    className="absolute bottom-4 left-0 right-0 flex items-center justify-center transition-all duration-300 cursor-pointer"
    onClick={() => handlePopupOpen(product.id)}
  >
    <button className="bg-black/40 backdrop-blur-sm border-2 border-emerald-400 rounded-full px-4 py-2 flex items-center gap-2 text-emerald-400 text-sm font-bold shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-black/60 hover:border-emerald-300 hover:text-emerald-300 active:scale-95">
      <FiZoomIn size={14} />
      <span>Quick View</span>
    </button>
  </div>
)}          <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition z-10"
                        >
                          {wishlist.includes(product.id) ? (
                            <FaHeart className="text-red-500" size={16} />
                          ) : (
                            <FaRegHeart className="text-gray-400 hover:text-red-500" size={16} />
                          )}
                        </button>

                        {product.image_paths?.length > 1 && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); goToPrevImage(product.id); }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition z-10"
                            >
                              <FiChevronLeft size={14} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); goToNextImage(product.id); }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition z-10"
                            >
                              <FiChevronRight size={14} />
                            </button>
                          </>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-800 text-base md:text-lg line-clamp-1">{product.name}</h3>
                          {isDCProduct && <MdFlashOn className="text-purple-500" size={18} />}
                        </div>
                        <p className="text-gray-500 text-xs md:text-sm mb-2">{product.model}</p>
                        
                        {/* Power Indicator Bar */}
                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Power</span>
                            <span className="font-semibold">{chargerPower} kW</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${chargerPower >= 100 ? 'bg-red-500' : chargerPower >= 50 ? 'bg-purple-500' : chargerPower >= 22 ? 'bg-green-500' : 'bg-blue-500'}`}
                              style={{ width: `${Math.min(chargerPower / 120 * 100, 100)}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(rating)}
                          <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 200) + 50})</span>
                        </div>

                        <div className="mb-3">
                          <span className="text-xl md:text-2xl font-bold text-blue-600">₹{product.price?.toLocaleString()}</span>
                          {product.mrp && product.mrp > product.price && (
                            <span className="text-xs md:text-sm text-gray-400 line-through ml-2">₹{product.mrp?.toLocaleString()}</span>
                          )}
                          {isDCProduct && (
                            <span className="text-xs text-gray-500 ml-2">+ GST</span>
                          )}
                        </div>

                        {isAC(product) ? (
                          product.quantity > 0 ? (
                            <button
                              onClick={() => handleAddToCart(product.id, product.price)}
                              className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-sm md:text-base ${cart.includes(product.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                            >
                              <FaShoppingCart size={14} />
                              {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                          ) : (
                            <button className="w-full py-2.5 rounded-lg font-semibold bg-gray-300 text-gray-500 cursor-not-allowed text-sm md:text-base">
                              Out of Stock
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => setContactPopup(true)}
                            className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition text-sm md:text-base"
                          >
                            {isDC60KW(product) ? 'Get Quote for 60kW' : isDC120KW(product) ? 'Get Quote for 120kW' : 'Contact Sales Team'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Contact Popup */}
      {contactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] animate-fadeIn p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Contact Sales Team</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                For enquiries about <span className="font-semibold text-orange-600">DC Fast Chargers (60kW, 120kW)</span>, please reach out to our dedicated sales team.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Email us at</p>
                <a
                  href="mailto:tgwbin@gmail.com"
                  className="text-lg font-semibold text-blue-600 hover:underline break-all"
                >
                  tgwbin@gmail.com
                </a>
              </div>
              <button
                onClick={() => setContactPopup(false)}
                className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Popup */}
      {popupOpen && popupContent.id && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999] p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover:scale-110"
              onClick={() => setPopupOpen(false)}
            >
              <FiX size={18} />
            </button>

            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Left - Image Gallery */}
                <div className="lg:w-1/2">
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={popupContent.image_paths?.[popupImageIndex] || 'https://via.placeholder.com/400'}
                      alt={popupContent.name}
                      className="w-full h-64 md:h-80 lg:h-96 object-contain p-4 cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => setPopupImageIndex(prev => (prev + 1) % (popupContent.image_paths?.length || 1))}
                    />
                    {popupContent.image_paths?.length > 1 && (
                      <>
                        <button
                          onClick={() => setPopupImageIndex(prev => (prev - 1 + popupContent.image_paths.length) % popupContent.image_paths.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                        >
                          <FiChevronLeft size={18} />
                        </button>
                        <button
                          onClick={() => setPopupImageIndex(prev => (prev + 1) % popupContent.image_paths.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                        >
                          <FiChevronRight size={18} />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      Click image to see next
                    </div>
                  </div>
                  
                  {/* Thumbnails */}
                  {popupContent.image_paths?.length > 1 && (
                    <div className="flex gap-2 mt-4 justify-center flex-wrap">
                      {popupContent.image_paths.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPopupImageIndex(idx)}
                          className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                            popupImageIndex === idx 
                              ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right - Product Details */}
                <div className="lg:w-1/2">
                  {/* Badges */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      isAC(popupContent) 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {isAC(popupContent) ? '🔌 AC Charger' : `⚡ DC Fast Charger ${getChargerPower(popupContent)}kW`}
                    </span>
                    {(isDC60KW(popupContent) || isDC120KW(popupContent)) && (
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        isDC120KW(popupContent) 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {isDC120KW(popupContent) ? '🔥 Ultra Fast Charging' : '🚀 Fast Charge Technology'}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{popupContent.name}</h2>
                  <p className="text-gray-500 text-sm md:text-base mb-4">Model: {popupContent.model}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(getRating(popupContent))}
                    </div>
                    <span className="text-sm text-gray-500">(45 customer reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-blue-600">₹{popupContent.price?.toLocaleString()}</span>
                    {popupContent.mrp && popupContent.mrp > popupContent.price && (
                      <span className="text-gray-400 line-through ml-2 text-lg">₹{popupContent.mrp?.toLocaleString()}</span>
                    )}
                    {!isAC(popupContent) && (
                      <span className="text-sm text-gray-500 ml-2">+ GST</span>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                      <MdVerified className="text-green-600" size={18} />
                      <span>12 Months Warranty</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                      <MdSecurity className="text-blue-600" size={18} />
                      <span>Safety Certified</span>
                    </div>
                    {popupContent.details?.cable_length && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                        <MdSpeed className="text-orange-600" size={18} />
                        <span>Cable: {popupContent.details.cable_length}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {isAC(popupContent) ? (
                      popupContent.quantity > 0 ? (
                        <button
                          onClick={() => handleAddToCart(popupContent.id, popupContent.price)}
                          className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                            cart.includes(popupContent.id) 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          } text-white shadow-md hover:shadow-lg`}
                        >
                          <FaShoppingCart size={18} />
                          {cart.includes(popupContent.id) ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      ) : (
                        <button className="w-full py-3.5 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed">
                          Out of Stock
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          setContactPopup(true);
                          setPopupOpen(false);
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Request Quote for {getChargerPower(popupContent)}kW DC Charger
                      </button>
                    )}
                    
                    <button
                      onClick={() => toggleWishlist(popupContent.id)}
                      className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 border-2 transition-all duration-300 ${
                        wishlist.includes(popupContent.id) 
                          ? 'border-red-500 text-red-500 bg-red-50' 
                          : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {wishlist.includes(popupContent.id) ? <FaHeart /> : <FaRegHeart />}
                      {wishlist.includes(popupContent.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>

                  {/* Disclaimer */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                    <p className="text-sm text-red-700">
                      <strong>⚠️ Disclaimer:</strong> Cancellations & Refunds Policy applies.
                      <button
                        onClick={() => navigate("/cancellation-policy")}
                        className="ml-2 text-red-600 underline hover:text-red-800 font-medium"
                      >
                        Read more →
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              {popupContent.details && Object.keys(popupContent.details).filter(k => popupContent.details[k] && popupContent.details[k] !== 'N/A').length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Technical Specifications</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Complete technical details and specifications</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                      {Object.entries(popupContent.details).filter(([_, v]) => v && v !== 'N/A').length} Specifications
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(popupContent.details).map(([key, value]) => {
                      if (!value || value === 'N/A') return null;
                      
                      const labels = {
                        phase: 'Phase', cooling: 'Cooling Type', rated_power: 'Rated Power',
                        ingress_protection: 'IP Rating', current: 'Current Rating',
                        display: 'Display Type', gun_type: 'Gun Type', material: 'Material',
                        dimensions: 'Dimensions', protection: 'Protection Features',
                        communication: 'Communication', cable_length: 'Cable Length',
                        input_voltage: 'Input Voltage', ouput_voltage: 'Output Voltage',
                        operatingtemps: 'Operating Temperature', ocpp_present: 'OCPP Support',
                        efficiency: 'Efficiency', warranty: 'Warranty', weight: 'Weight',
                        frequency: 'Frequency', mountingtype: 'Mounting Type'
                      };
                      
                      const getIcon = (key) => {
                        const icons = {
                          rated_power: '⚡', current: '🔌', efficiency: '📊', warranty: '🛡️',
                          weight: '⚖️', dimensions: '📏', operatingtemps: '🌡️', phase: '🔄',
                          cooling: '❄️', ingress_protection: '💧', display: '🖥️',
                          gun_type: '🔫', material: '🏗️', protection: '🛡️',
                          communication: '📡', cable_length: '📏', input_voltage: '⚡',
                          ouput_voltage: '⚡', ocpp_present: '🌐', frequency: '📶',
                          mountingtype: '🔧'
                        };
                        return icons[key] || '🔧';
                      };
                      
                      const getBadgeColor = (key, value) => {
                        if (key === 'rated_power' && value.toString().includes('kW')) {
                          return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
                        }
                        if (key === 'efficiency' && value.toString().includes('%')) {
                          return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
                        }
                        if (key === 'warranty') {
                          return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
                        }
                        if (key === 'operatingtemps') {
                          return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200';
                        }
                        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
                      };
                      
                      const formatValue = (value) => {
                        if (typeof value === 'boolean') {
                          return value ? (
                            <span className="inline-flex items-center gap-1 text-green-600">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Supported
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-gray-400">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Not Supported
                            </span>
                          );
                        }
                        if (key === 'rated_power' && value) return `${value} kW`;
                        if (key === 'current' && value) return `${value} A`;
                        if (key === 'cable_length' && value) return `${value} m`;
                        if (key === 'dimensions' && value) return value.replace(/x/gi, ' × ');
                        if (key === 'operatingtemps' && value) return `${value}°C`;
                        if (key === 'frequency' && value) return `${value} Hz`;
                        return value;
                      };
                      
                      return (
                        <div 
                          key={key} 
                          className={`group rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${getBadgeColor(key, value)} border`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{getIcon(key)}</div>
                            <div className="flex-1">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                {labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                              <div className="font-bold text-gray-800 break-words text-base">
                                {formatValue(value)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
   
  );
};

export default ProductPage;