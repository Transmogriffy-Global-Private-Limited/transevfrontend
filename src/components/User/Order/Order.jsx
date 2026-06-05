// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ShoppingCartIcon } from "@heroicons/react/solid";
// import UserNavbar from "../User_Navbar";
// import UserSidebar from "../User_sidebar";
// import background from "../../../assets/new3.jpg";

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// function OrderHistoryPage() {
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [authReady, setAuthReady] = useState(false);
// const [cancelOrderId, setCancelOrderId] = useState(null);
// const [customReason, setCustomReason] = useState("");
//   // Wait for DOM to fully load before accessing localStorage
//   useEffect(() => {
//     const init = async () => {
//       const storedToken = localStorage.getItem("auth_token");
//       const storedUserId = localStorage.getItem("user_id");

//       if (!storedUserId || !storedToken) {
//         alert("Please login first");
//         return;
//       }

//       setAuthReady(true);
//     };

//     init();
//   }, []);

//   useEffect(() => {
//     if (!authReady) return;

//     const fetchOrderHistory = async () => {
//       const token = localStorage.getItem("auth_token");
//       const userId = localStorage.getItem("user_id");

//       if (!userId || !token) {
//         alert("Please login first");
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await axios.post(
//           `${BASE_URL_AND_PORT}/order/orderhistory`,
//           { user_id: userId },
//           {
//             headers: {
//               "API-KEY": API_KEY,
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // if (response.data && Array.isArray(response.data)) {
//         //   setOrderHistory(response.data);
//         // } 
//         if (response.data && Array.isArray(response.data)) {
//   const sortedOrders = [...response.data].sort(
//     (a, b) => new Date(b.purchase_time) - new Date(a.purchase_time)
//   );

//   setOrderHistory(sortedOrders);
// }

//         else {
//           console.warn("Unexpected response format:", response.data);
//           setOrderHistory([]);
//         }
//       } catch (error) {
//         console.error("Error fetching order history:", error);
//         alert("Failed to load order history. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderHistory();
//   }, [authReady]);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


// const handleCancelOrder = async () => {
//   const token = localStorage.getItem("auth_token");

//   const isOtherSelected = cancelReason === "Other";
//   const isCustomReasonValid = customReason.trim() !== "";

//   // Validate inputs
//   if (!token || !cancelOrderId || cancelReason === "" || (isOtherSelected && !isCustomReasonValid)) {
//     alert("Please select or enter a reason before submitting.");
//     return;
//   }

//   const payload = {
//     order_id: cancelOrderId,
//     reasonforcancel: isOtherSelected ? "other" : cancelReason,
//     otherreasonforcancel: isOtherSelected ? customReason.trim() : ""
//   };

//   try {
//     const response = await axios.post(
//       `${BASE_URL_AND_PORT}/order/cancelorder`,
//       payload,
//       {
//         headers: {
//           "API-KEY": API_KEY,
//           Authorization: `Bearer ${token}`,
//         }
//       }
//     );

//     // ✅ Success response
//     if (response.status === 200) {
//       alert("Order successfully canceled!");

//       // Update frontend order status
//       setOrderHistory((prevOrders) =>
//         prevOrders.map((order) =>
//           order.order_id === cancelOrderId
//             ? { ...order, order_status: "canceled" }
//             : order
//         )
//       );
//     }

//   } catch (error) {
//     console.error("Error canceling the order:", error);

//     // ✅ Handle already canceled message
//     if (error.response?.data?.message?.includes("already been canceled")) {
//       alert("This order has already been canceled.");

//       // Optionally update UI to reflect canceled status
//       setOrderHistory((prevOrders) =>
//         prevOrders.map((order) =>
//           order.order_id === cancelOrderId
//             ? { ...order, order_status: "canceled" }
//             : order
//         )
//       );
//     } else {
//       alert("Failed to cancel the order. Please try again.");
//     }
//   } finally {
//     // Always reset cancel form
//     setCancelOrderId(null);
//     setCancelReason("");
//     setCustomReason("");
//   }
// };


// const cancellationReasons = [
//     "Too much delay delivery",
//     "Found a better price elsewhere",
//     "Changed my mind",
//     "Other"
//   ];
//     const [cancelReason, setCancelReason] = useState("");
//   const [cancelFormVisible, setCancelFormVisible] = useState(false);
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-green-50 to-white-100 bg-cover bg-center bg-fixed">
//       <UserNavbar onToggleSidebar={toggleSidebar} />
//       <div className="flex flex-1">
//         <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//         <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pt-6 mt-10 bg-[#f0f0f0] rounded-lg lg:ml-80">
//           <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
//             Order History
//           </h2>

//           {/* Loading Spinner */}
//           {loading ? (
//             <div className="flex justify-center items-center py-10">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
//             </div>
//           ) : orderHistory.length > 0 ? (
//             orderHistory.map((order) => (
//               <div
//                 key={order.order_id}
//                 className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg shadow-lg mb-6 p-6 border-l-4 border-blue-400 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-2xl font-bold text-blue-800">{order.product_name}</h3>
//                     <p className="text-s text-gray-500 mt-1">Order ID: <span className="font-mono">{order.order_id}</span></p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xl font-semibold text-green-700">₹{order.total_amount}</p>
//                     <p className="text-sm text-gray-700">Qty: {order.quantity_ordered}</p>
//                   </div>
//                 </div>

//                 <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
//                   <p className="text-m text-gray-600">
//                     Payment Method: <span className="font-medium text-gray-800">{order.payment_option}</span>
//                   </p>
//                   <p className="text-m text-gray-600 mt-2 md:mt-0">
//                     Status:{" "}
//                     <span
//                       className={`inline-block px-3 py-1 text-s font-semibold rounded-full ${
//                         order.order_status === "null"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : order.order_status === "pending"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : order.order_status === "canceled"
//                           ? "bg-red-200 text-red-800"
//                           : "bg-green-200 text-green-800"
//                       }`}
//                     >
//                       {order.order_status === "null" ? "Order Placed" : order.order_status}
//                     </span>
//                   </p>
//                 </div>
//                 <p className="text-lg text-gray-600">
//                   Delivery Address: <span className="font-medium text-gray-800">{order.deliveryaddress}</span>
//                 </p>
//                 <p className="text-lg text-gray-600">
//                   Order Date:{" "}
//                   <span className="font-medium text-gray-800">
//                     {new Date(order.purchase_time).toLocaleString('en-IN', {
//                       dateStyle: 'medium',
//                       timeStyle: 'short',
//                       hour12: true,
//                     })}
//                   </span>
//                 </p>

//                 <button
//                   onClick={() => {
//                     document.getElementById(order.order_id)?.classList.toggle("hidden");
//                   }}
//                   className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
//                 >
//                   View Details
//                 </button>

//                 <div
//                   id={order.order_id}
//                   className="hidden mt-4 bg-white border rounded-lg p-4 shadow-inner"
//                 >
//                   <h4 className="text-lg font-semibold mb-3 text-gray-800">Product Details</h4>
//                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
//                     {Object.entries(order.product_details).map(([key, value]) => (
//                       <li key={key}>
//                         <strong className="capitalize text-gray-800">{key.replace(/_/g, " ")}:</strong> {value}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

          
//      {/* Cancel Section */}
// {["null", "pending"].includes(order.order_status) && (
//   <>
//     {/* Cancel Button */}
//     {cancelOrderId !== order.order_id && (
//       <button
//         onClick={() => setCancelOrderId(order.order_id)}
//         className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition ml-0 sm:ml-2"
//       >
//         Cancel Order
//       </button>
//     )}

//     {/* Cancel Popup Form */}
//     {cancelOrderId === order.order_id && (
//       <div className="mt-4 bg-white p-4 rounded-lg shadow-md relative w-full max-w-xl mx-auto sm:mx-0">
//         {/* Close button */}
//         <button
//           onClick={() => {
//             setCancelOrderId(null);
//             setCancelReason("");
//             setCustomReason("");
//           }}
//           className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
//           aria-label="Close"
//         >
//           &times;
//         </button>

//         <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
//           Please select a reason for cancellation:
//         </h4>

//         {/* Dropdown */}
//         <select
//           value={cancelReason}
//           onChange={(e) => setCancelReason(e.target.value)}
//           className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
//         >
//           <option value="">Select a reason</option>
//           {cancellationReasons.map((reason, index) => (
//             <option key={index} value={reason}>
//               {reason}
//             </option>
//           ))}
//         </select>

//         {/* Custom Reason Field */}
//         {cancelReason === "Other" && (
//           <div className="mt-3 w-full">
//             <label
//               htmlFor="customReason"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Custom Reason
//             </label>
//             <input
//               id="customReason"
//               type="text"
//               placeholder="Please specify your reason"
//               value={customReason}
//               onChange={(e) => setCustomReason(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           onClick={handleCancelOrder}
//           className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition w-full sm:w-auto"
//         >
//           Submit Cancellation
//         </button>
//       </div>
//     )}
//   </>
// )}

//     </div>
//   ))
// ) : (
//   <p className="text-center text-lg font-medium text-gray-600 py-10">
//     No orders found.
//   </p>
// )}
//  </div>
//       </div>
//     </div>
//   );
// }

// export default OrderHistoryPage;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ShoppingCartIcon } from "@heroicons/react/solid";
// import UserNavbar from "../User_Navbar";
// import UserSidebar from "../User_sidebar";
// import background from "../../../assets/new3.jpg";

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// function OrderHistoryPage() {
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [authReady, setAuthReady] = useState(false);
// const [cancelOrderId, setCancelOrderId] = useState(null);
// const [customReason, setCustomReason] = useState("");
//   // Wait for DOM to fully load before accessing localStorage
//   useEffect(() => {
//     const init = async () => {
//       const storedToken = localStorage.getItem("auth_token");
//       const storedUserId = localStorage.getItem("user_id");

//       if (!storedUserId || !storedToken) {
//         alert("Please login first");
//         return;
//       }

//       setAuthReady(true);
//     };

//     init();
//   }, []);

//   useEffect(() => {
//     if (!authReady) return;

//     const fetchOrderHistory = async () => {
//       const token = localStorage.getItem("auth_token");
//       const userId = localStorage.getItem("user_id");

//       if (!userId || !token) {
//         alert("Please login first");
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await axios.post(
//           `${BASE_URL_AND_PORT}/order/orderhistory`,
//           { user_id: userId },
//           {
//             headers: {
//               "API-KEY": API_KEY,
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // if (response.data && Array.isArray(response.data)) {
//         //   setOrderHistory(response.data);
//         // } 
//         if (response.data && Array.isArray(response.data)) {
//   const sortedOrders = [...response.data].sort(
//     (a, b) => new Date(b.purchase_time) - new Date(a.purchase_time)
//   );

//   setOrderHistory(sortedOrders);
// }

//         else {
//           console.warn("Unexpected response format:", response.data);
//           setOrderHistory([]);
//         }
//       } catch (error) {
//         console.error("Error fetching order history:", error);
//         alert("Failed to load order history. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderHistory();
//   }, [authReady]);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


// const handleCancelOrder = async () => {
//   const token = localStorage.getItem("auth_token");

//   const isOtherSelected = cancelReason === "Other";
//   const isCustomReasonValid = customReason.trim() !== "";

//   // Validate inputs
//   if (!token || !cancelOrderId || cancelReason === "" || (isOtherSelected && !isCustomReasonValid)) {
//     alert("Please select or enter a reason before submitting.");
//     return;
//   }

//   const payload = {
//     order_id: cancelOrderId,
//     reasonforcancel: isOtherSelected ? "other" : cancelReason,
//     otherreasonforcancel: isOtherSelected ? customReason.trim() : ""
//   };

//   try {
//     const response = await axios.post(
//       `${BASE_URL_AND_PORT}/order/cancelorder`,
//       payload,
//       {
//         headers: {
//           "API-KEY": API_KEY,
//           Authorization: `Bearer ${token}`,
//         }
//       }
//     );

//     // ✅ Success response
//     if (response.status === 200) {
//       alert("Order successfully canceled!");

//       // Update frontend order status
//       setOrderHistory((prevOrders) =>
//         prevOrders.map((order) =>
//           order.order_id === cancelOrderId
//             ? { ...order, order_status: "canceled" }
//             : order
//         )
//       );
//     }

//   } catch (error) {
//     console.error("Error canceling the order:", error);

//     // ✅ Handle already canceled message
//     if (error.response?.data?.message?.includes("already been canceled")) {
//       alert("This order has already been canceled.");

//       // Optionally update UI to reflect canceled status
//       setOrderHistory((prevOrders) =>
//         prevOrders.map((order) =>
//           order.order_id === cancelOrderId
//             ? { ...order, order_status: "canceled" }
//             : order
//         )
//       );
//     } else {
//       alert("Failed to cancel the order. Please try again.");
//     }
//   } finally {
//     // Always reset cancel form
//     setCancelOrderId(null);
//     setCancelReason("");
//     setCustomReason("");
//   }
// };


// const cancellationReasons = [
//     "Too much delay delivery",
//     "Found a better price elsewhere",
//     "Changed my mind",
//     "Other"
//   ];
//     const [cancelReason, setCancelReason] = useState("");
//   const [cancelFormVisible, setCancelFormVisible] = useState(false);
//   return (
//   <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-green-50 to-white-100 bg-cover bg-center bg-fixed">
//     <UserNavbar onToggleSidebar={toggleSidebar} />

//     <div className="flex flex-1">
//       <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pt-6 mt-10 bg-[#f0f0f0] rounded-lg lg:ml-80"> */}
//       <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pt-6 mt-10 
// bg-gradient-to-br from-gray-50 to-slate-100 
// rounded-xl shadow-sm lg:ml-80">

//         <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
//           Order History
//         </h2>

//         {/* Loading Spinner */}
//         {loading ? (
//           <div className="flex justify-center items-center py-10">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
//           </div>
//         ) : orderHistory.length > 0 ? (
//           orderHistory.map((order) => {
//             const isCancelled = order.order_status === "canceled";
//             const isAdminCancelled =
//               isCancelled && order.rfc === "Admin Cancelled";

//             return (
//               <div
//                 key={order.order_id}
//                 className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg shadow-lg mb-6 p-6 border-l-4 border-blue-400 hover:shadow-xl transition-shadow duration-300"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-2xl font-bold text-blue-800">
//                       {order.product_name}
//                     </h3>
//                     <p className="text-s text-gray-500 mt-1">
//                       Order ID:{" "}
//                       <span className="font-mono">{order.order_id}</span>
//                     </p>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-xl font-semibold text-green-700">
//                       ₹{order.total_amount}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       Qty: {order.quantity_ordered}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Payment + Status */}
//                 <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
//                   <p className="text-m text-gray-600">
//                     Payment Method:{" "}
//                     <span className="font-medium text-gray-800">
//                       {order.payment_option}
//                     </span>
//                   </p>

//                   <p className="text-m text-gray-600 mt-2 md:mt-0">
//                     Status:{" "}
//                     <span
//                       className={`inline-block px-3 py-1 text-s font-semibold rounded-full ${
//                         isCancelled
//                           ? "bg-red-200 text-red-800"
//                           : order.order_status === "pending" ||
//                             order.order_status === "null"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : "bg-green-200 text-green-800"
//                       }`}
//                     >
//                       {isCancelled
//                         ? "Cancelled"
//                         : order.order_status === "null"
//                         ? "Order Placed"
//                         : order.order_status}
//                     </span>

//               {isCancelled && (
//   <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
//     <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
//     {isAdminCancelled ? "Cancelled by Admin" : "Cancelled by You"}
//   </div>
// )}



//                   </p>
//                 </div>

//                 {/* Address & Date */}
//                 <p className="text-lg text-gray-600 mt-2">
//                   Delivery Address:{" "}
//                   <span className="font-medium text-gray-800">
//                     {order.deliveryaddress}
//                   </span>
//                 </p>

//                 <p className="text-lg text-gray-600">
//                   Order Date:{" "}
//                   <span className="font-medium text-gray-800">
//                     {new Date(order.purchase_time).toLocaleString("en-IN", {
//                       dateStyle: "medium",
//                       timeStyle: "short",
//                       hour12: true,
//                     })}
//                   </span>
//                 </p>

//                 {/* View Details */}
//                 <button
//                   onClick={() =>
//                     document
//                       .getElementById(order.order_id)
//                       ?.classList.toggle("hidden")
//                   }
//                   className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
//                 >
//                   View Details
//                 </button>

//                 {/* Product Details */}
//                 <div
//                   id={order.order_id}
//                   className="hidden mt-4 bg-white border rounded-lg p-4 shadow-inner"
//                 >
//                   <h4 className="text-lg font-semibold mb-3 text-gray-800">
//                     Product Details
//                   </h4>

//                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
//                     {Object.entries(order.product_details).map(
//                       ([key, value]) => (
//                         <li key={key}>
//                           <strong className="capitalize text-gray-800">
//                             {key.replace(/_/g, " ")}:
//                           </strong>{" "}
//                           {value}
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </div>

//                 {/* Cancel Section */}
//                 {["null", "pending"].includes(order.order_status) && (
//                   <>
//                     {cancelOrderId !== order.order_id && (
//                       <button
//                         onClick={() => setCancelOrderId(order.order_id)}
//                         className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition"
//                       >
//                         Cancel Order
//                       </button>
//                     )}

//                     {cancelOrderId === order.order_id && (
//                       <div className="mt-4 bg-white p-4 rounded-lg shadow-md relative max-w-xl">
//                         <button
//                           onClick={() => {
//                             setCancelOrderId(null);
//                             setCancelReason("");
//                             setCustomReason("");
//                           }}
//                           className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
//                         >
//                           &times;
//                         </button>

//                         <h4 className="text-lg font-semibold mb-3 text-gray-800">
//                           Please select a reason for cancellation:
//                         </h4>

//                         <select
//                           value={cancelReason}
//                           onChange={(e) =>
//                             setCancelReason(e.target.value)
//                           }
//                           className="w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                           <option value="">Select a reason</option>
//                           {cancellationReasons.map((reason, index) => (
//                             <option key={index} value={reason}>
//                               {reason}
//                             </option>
//                           ))}
//                         </select>

//                         {cancelReason === "Other" && (
//                           <input
//                             className="w-full p-3 border mt-3 rounded-md"
//                             placeholder="Custom reason"
//                             value={customReason}
//                             onChange={(e) =>
//                               setCustomReason(e.target.value)
//                             }
//                           />
//                         )}

//                         <button
//                           onClick={handleCancelOrder}
//                           className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold"
//                         >
//                           Submit Cancellation
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-lg font-medium text-gray-600 py-10">
//             No orders found.
//           </p>
//         )}
//       </div>
//     </div>
//   </div>
// );

// }

// export default OrderHistoryPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ShoppingCartIcon, 
  CalendarIcon, 
  CreditCardIcon,
  EyeIcon,
  XCircleIcon,
  TruckIcon
} from "@heroicons/react/solid";
import { 
  FaRupeeSign, 
  FaReceipt, 
  FaRegClock, 
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaPhoneAlt,
  FaUser,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import UserNavbar from "../User_Navbar";
import UserSidebar from "../User_sidebar";

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

function OrderHistoryPage() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("auth_token");
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId || !storedToken) {
        alert("Please login first");
        return;
      }
      setAuthReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!authReady) return;

    const fetchOrderHistory = async () => {
      const token = localStorage.getItem("auth_token");
      const userId = localStorage.getItem("user_id");

      if (!userId || !token) {
        alert("Please login first");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${BASE_URL_AND_PORT}/order/orderhistory`,
          { user_id: userId },
          {
            headers: {
              "API-KEY": API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          const sortedOrders = [...response.data].sort(
            (a, b) => new Date(b.purchase_time) - new Date(a.purchase_time)
          );
          setOrderHistory(sortedOrders);
        } else {
          setOrderHistory([]);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        alert("Failed to load order history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [authReady]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getStatusConfig = (status, isCancelled, rfc) => {
    if (isCancelled) {
      const isAdminCancelled = rfc === "Admin Cancelled";
      return {
        label: isAdminCancelled ? "Cancelled by Admin" : "Cancelled",
        icon: FaTimesCircle,
        color: "red",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        badgeColor: "bg-red-100 text-red-800",
        gradient: "from-red-50 to-red-100"
      };
    }
    
    switch(status) {
      case "delivered":
        return {
          label: "Delivered",
          icon: FaCheckCircle,
          color: "green",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200",
          badgeColor: "bg-green-100 text-green-800",
          gradient: "from-green-50 to-green-100"
        };
      case "shipped":
        return {
          label: "Shipped",
          icon: TruckIcon,
          color: "blue",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          badgeColor: "bg-blue-100 text-blue-800",
          gradient: "from-blue-50 to-blue-100"
        };
      case "processing":
        return {
          label: "Processing",
          icon: FaRegClock,
          color: "yellow",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200",
          badgeColor: "bg-yellow-100 text-yellow-800",
          gradient: "from-yellow-50 to-yellow-100"
        };
      default:
        return {
          label: "Order Placed",
          icon: FaRegClock,
          color: "purple",
          bgColor: "bg-purple-50",
          textColor: "text-purple-700",
          borderColor: "border-purple-200",
          badgeColor: "bg-purple-100 text-purple-800",
          gradient: "from-purple-50 to-purple-100"
        };
    }
  };

  const formatAddress = (address) => {
    if (!address) return "No address available";
    // Clean up the address string
    let formattedAddress = address.replace(/House:/g, '🏠')
      .replace(/Street:/g, '📍')
      .replace(/City:/g, '🏙️')
      .replace(/Landmark:/g, '🎯')
      .replace(/State:/g, '🗺️')
      .replace(/Pin:/g, '📮');
    return formattedAddress;
  };

  const filteredOrders = orderHistory.filter(order => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "active") return !(order.order_status === "canceled");
    if (selectedFilter === "cancelled") return order.order_status === "canceled";
    return true;
  });

  const cancellationReasons = [
    "Too much delay delivery",
    "Found a better price elsewhere",
    "Changed my mind",
    "Other"
  ];

  const handleCancelOrder = async () => {
    const token = localStorage.getItem("auth_token");
    const isOtherSelected = cancelReason === "Other";
    const isCustomReasonValid = customReason.trim() !== "";

    if (!token || !cancelOrderId || cancelReason === "" || (isOtherSelected && !isCustomReasonValid)) {
      alert("Please select or enter a reason before submitting.");
      return;
    }

    const payload = {
      order_id: cancelOrderId,
      reasonforcancel: isOtherSelected ? "other" : cancelReason,
      otherreasonforcancel: isOtherSelected ? customReason.trim() : ""
    };

    try {
      const response = await axios.post(
        `${BASE_URL_AND_PORT}/order/cancelorder`,
        payload,
        {
          headers: {
            "API-KEY": API_KEY,
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        alert("✅ Order successfully canceled!");
        setOrderHistory((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === cancelOrderId
              ? { ...order, order_status: "canceled" }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error canceling the order:", error);
      if (error.response?.data?.message?.includes("already been canceled")) {
        alert("This order has already been canceled.");
        setOrderHistory((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === cancelOrderId
              ? { ...order, order_status: "canceled" }
              : order
          )
        );
      } else {
        alert("Failed to cancel the order. Please try again.");
      }
    } finally {
      setCancelOrderId(null);
      setCancelReason("");
      setCustomReason("");
    }
  };

  const stats = {
    total: orderHistory.length,
    active: orderHistory.filter(o => o.order_status !== "canceled").length,
    cancelled: orderHistory.filter(o => o.order_status === "canceled").length,
    totalSpent: orderHistory.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <UserNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex">
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full`}>
          <div className="p-4 md:p-6 lg:p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FaReceipt className="text-blue-600" size={24} />
                </div>
                Order History
              </h1>
              <p className="text-gray-500 mt-2 ml-2">Track and manage all your orders</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Orders</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <TruckIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Cancelled Orders</p>
                    <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <XCircleIcon className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-purple-600">₹{stats.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaRupeeSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  selectedFilter === "all"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setSelectedFilter("active")}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  selectedFilter === "active"
                    ? "bg-green-600 text-white shadow-md shadow-green-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Active Orders
              </button>
              <button
                onClick={() => setSelectedFilter("cancelled")}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  selectedFilter === "cancelled"
                    ? "bg-red-600 text-white shadow-md shadow-red-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Cancelled Orders
              </button>
            </div>

            {/* Loading Spinner */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const isCancelled = order.order_status === "canceled";
                  const isAdminCancelled = isCancelled && order.rfc === "Admin Cancelled";
                  const statusConfig = getStatusConfig(order.order_status, isCancelled, order.rfc);
                  const StatusIcon = statusConfig.icon;
                  const isExpanded = expandedOrder === order.order_id;

                  return (
                    <div
                      key={order.order_id}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${statusConfig.borderColor} animate-fadeIn`}
                    >
                      {/* Order Header with Gradient */}
                      <div className={`bg-gradient-to-r ${statusConfig.gradient} p-6 border-b ${statusConfig.borderColor}`}>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-xl ${statusConfig.bgColor} flex items-center justify-center shadow-sm`}>
                              <StatusIcon className={`h-7 w-7 ${statusConfig.textColor}`} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{order.product_name}</h3>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm text-gray-500 font-mono">Order #{order.order_id}</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig.badgeColor}`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {statusConfig.label}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-left lg:text-right">
                            <p className="text-2xl font-bold text-blue-600">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Quantity: {order.quantity_ordered}</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Body */}
                      <div className="p-6">
                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                            <FaCreditCard className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase font-semibold">Payment Method</p>
                              <p className="font-semibold text-gray-800">{order.payment_option || "N/A"}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                            <FaCalendarAlt className="h-5 w-5 text-purple-500 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase font-semibold">Order Date</p>
                              <p className="font-semibold text-gray-800">
                                {new Date(order.purchase_time).toLocaleString("en-IN", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Delivery Address Section - Full Display */}
                        <div className="mb-5 p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs text-blue-600 uppercase font-semibold mb-2">Delivery Address</p>
                              <div className="space-y-1 text-sm text-gray-700">
                                {order.deliveryaddress && order.deliveryaddress.split(',').map((line, idx) => (
                                  <p key={idx} className="break-words">{line.trim()}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : order.order_id)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-all duration-200"
                          >
                            <EyeIcon className="h-4 w-4" />
                            {isExpanded ? "Hide Details" : "View Product Details"}
                            {isExpanded ? <FaChevronUp className="h-3 w-3" /> : <FaChevronDown className="h-3 w-3" />}
                          </button>

                          {["null", "pending", "processing"].includes(order.order_status) && !isCancelled && (
                            <button
                              onClick={() => setCancelOrderId(order.order_id)}
                              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-all duration-200"
                            >
                              <XCircleIcon className="h-4 w-4" />
                              Cancel Order
                            </button>
                          )}
                        </div>

                        {/* Expanded Product Details */}
                        {isExpanded && order.product_details && (
                          <div className="mt-6 pt-5 border-t border-gray-200 animate-slideDown">
                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <FaBoxOpen className="text-blue-500" />
                              Product Specifications
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {Object.entries(order.product_details).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition">
                                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{key.replace(/_/g, " ")}</p>
                                  <p className="text-sm font-medium text-gray-800 break-words">{value || "N/A"}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cancel Form */}
                        {cancelOrderId === order.order_id && (
                          <div className="mt-6 pt-5 border-t border-gray-200 animate-slideDown">
                            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-5">
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-red-800 flex items-center gap-2">
                                  <XCircleIcon className="h-5 w-5" />
                                  Cancel Order Confirmation
                                </h4>
                                <button
                                  onClick={() => {
                                    setCancelOrderId(null);
                                    setCancelReason("");
                                    setCustomReason("");
                                  }}
                                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                                >
                                  ✕
                                </button>
                              </div>

                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Please select a reason for cancellation:
                              </label>
                              <select
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                              >
                                <option value="">Select a reason</option>
                                {cancellationReasons.map((reason, index) => (
                                  <option key={index} value={reason}>{reason}</option>
                                ))}
                              </select>

                              {cancelReason === "Other" && (
                                <input
                                  className="w-full p-3 border border-gray-300 rounded-xl mt-3 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                                  placeholder="Please specify your reason..."
                                  value={customReason}
                                  onChange={(e) => setCustomReason(e.target.value)}
                                />
                              )}

                              <div className="flex gap-3 mt-5">
                                <button
                                  onClick={handleCancelOrder}
                                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200"
                                >
                                  Confirm Cancellation
                                </button>
                                <button
                                  onClick={() => {
                                    setCancelOrderId(null);
                                    setCancelReason("");
                                    setCustomReason("");
                                  }}
                                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-7xl mb-4">📦</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">No orders found</h2>
                <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
                <button
                  onClick={() => window.location.href = '/products'}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default OrderHistoryPage;