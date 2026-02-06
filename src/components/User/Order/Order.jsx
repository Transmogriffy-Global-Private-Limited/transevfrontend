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


import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import UserNavbar from "../User_Navbar";
import UserSidebar from "../User_sidebar";
import background from "../../../assets/new3.jpg";

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

function OrderHistoryPage() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
const [cancelOrderId, setCancelOrderId] = useState(null);
const [customReason, setCustomReason] = useState("");
  // Wait for DOM to fully load before accessing localStorage
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

        // if (response.data && Array.isArray(response.data)) {
        //   setOrderHistory(response.data);
        // } 
        if (response.data && Array.isArray(response.data)) {
  const sortedOrders = [...response.data].sort(
    (a, b) => new Date(b.purchase_time) - new Date(a.purchase_time)
  );

  setOrderHistory(sortedOrders);
}

        else {
          console.warn("Unexpected response format:", response.data);
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


const handleCancelOrder = async () => {
  const token = localStorage.getItem("auth_token");

  const isOtherSelected = cancelReason === "Other";
  const isCustomReasonValid = customReason.trim() !== "";

  // Validate inputs
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

    // ✅ Success response
    if (response.status === 200) {
      alert("Order successfully canceled!");

      // Update frontend order status
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

    // ✅ Handle already canceled message
    if (error.response?.data?.message?.includes("already been canceled")) {
      alert("This order has already been canceled.");

      // Optionally update UI to reflect canceled status
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
    // Always reset cancel form
    setCancelOrderId(null);
    setCancelReason("");
    setCustomReason("");
  }
};


const cancellationReasons = [
    "Too much delay delivery",
    "Found a better price elsewhere",
    "Changed my mind",
    "Other"
  ];
    const [cancelReason, setCancelReason] = useState("");
  const [cancelFormVisible, setCancelFormVisible] = useState(false);
  return (
  <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-green-50 to-white-100 bg-cover bg-center bg-fixed">
    <UserNavbar onToggleSidebar={toggleSidebar} />

    <div className="flex flex-1">
      <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pt-6 mt-10 bg-[#f0f0f0] rounded-lg lg:ml-80"> */}
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pt-6 mt-10 
bg-gradient-to-br from-gray-50 to-slate-100 
rounded-xl shadow-sm lg:ml-80">

        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Order History
        </h2>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
          </div>
        ) : orderHistory.length > 0 ? (
          orderHistory.map((order) => {
            const isCancelled = order.order_status === "canceled";
            const isAdminCancelled =
              isCancelled && order.rfc === "Admin Cancelled";

            return (
              <div
                key={order.order_id}
                className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg shadow-lg mb-6 p-6 border-l-4 border-blue-400 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-800">
                      {order.product_name}
                    </h3>
                    <p className="text-s text-gray-500 mt-1">
                      Order ID:{" "}
                      <span className="font-mono">{order.order_id}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-semibold text-green-700">
                      ₹{order.total_amount}
                    </p>
                    <p className="text-sm text-gray-700">
                      Qty: {order.quantity_ordered}
                    </p>
                  </div>
                </div>

                {/* Payment + Status */}
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <p className="text-m text-gray-600">
                    Payment Method:{" "}
                    <span className="font-medium text-gray-800">
                      {order.payment_option}
                    </span>
                  </p>

                  <p className="text-m text-gray-600 mt-2 md:mt-0">
                    Status:{" "}
                    <span
                      className={`inline-block px-3 py-1 text-s font-semibold rounded-full ${
                        isCancelled
                          ? "bg-red-200 text-red-800"
                          : order.order_status === "pending" ||
                            order.order_status === "null"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {isCancelled
                        ? "Cancelled"
                        : order.order_status === "null"
                        ? "Order Placed"
                        : order.order_status}
                    </span>

              {isCancelled && (
  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
    {isAdminCancelled ? "Cancelled by Admin" : "Cancelled by You"}
  </div>
)}



                  </p>
                </div>

                {/* Address & Date */}
                <p className="text-lg text-gray-600 mt-2">
                  Delivery Address:{" "}
                  <span className="font-medium text-gray-800">
                    {order.deliveryaddress}
                  </span>
                </p>

                <p className="text-lg text-gray-600">
                  Order Date:{" "}
                  <span className="font-medium text-gray-800">
                    {new Date(order.purchase_time).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </span>
                </p>

                {/* View Details */}
                <button
                  onClick={() =>
                    document
                      .getElementById(order.order_id)
                      ?.classList.toggle("hidden")
                  }
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                  View Details
                </button>

                {/* Product Details */}
                <div
                  id={order.order_id}
                  className="hidden mt-4 bg-white border rounded-lg p-4 shadow-inner"
                >
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">
                    Product Details
                  </h4>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    {Object.entries(order.product_details).map(
                      ([key, value]) => (
                        <li key={key}>
                          <strong className="capitalize text-gray-800">
                            {key.replace(/_/g, " ")}:
                          </strong>{" "}
                          {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Cancel Section */}
                {["null", "pending"].includes(order.order_status) && (
                  <>
                    {cancelOrderId !== order.order_id && (
                      <button
                        onClick={() => setCancelOrderId(order.order_id)}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition"
                      >
                        Cancel Order
                      </button>
                    )}

                    {cancelOrderId === order.order_id && (
                      <div className="mt-4 bg-white p-4 rounded-lg shadow-md relative max-w-xl">
                        <button
                          onClick={() => {
                            setCancelOrderId(null);
                            setCancelReason("");
                            setCustomReason("");
                          }}
                          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                        >
                          &times;
                        </button>

                        <h4 className="text-lg font-semibold mb-3 text-gray-800">
                          Please select a reason for cancellation:
                        </h4>

                        <select
                          value={cancelReason}
                          onChange={(e) =>
                            setCancelReason(e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select a reason</option>
                          {cancellationReasons.map((reason, index) => (
                            <option key={index} value={reason}>
                              {reason}
                            </option>
                          ))}
                        </select>

                        {cancelReason === "Other" && (
                          <input
                            className="w-full p-3 border mt-3 rounded-md"
                            placeholder="Custom reason"
                            value={customReason}
                            onChange={(e) =>
                              setCustomReason(e.target.value)
                            }
                          />
                        )}

                        <button
                          onClick={handleCancelOrder}
                          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold"
                        >
                          Submit Cancellation
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-lg font-medium text-gray-600 py-10">
            No orders found.
          </p>
        )}
      </div>
    </div>
  </div>
);

}

export default OrderHistoryPage;