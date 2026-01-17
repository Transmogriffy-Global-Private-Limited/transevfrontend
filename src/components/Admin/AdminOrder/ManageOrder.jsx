// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../Admin_sidebar";
// import AdminNavbar from "../Admin_navbar";
// import { flushSync } from 'react-dom';
// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const ORDER_STATUS_OPTIONS = [
//   { value: "", label: "All Orders" },
//     { value: "null", label: "OrderPlaced" },
//      { value: "Accepted", label: "Accepted" },
//   { value: "Processing", label: "Processing" },
//   { value: "Shipped", label: "Shipped" },
//   { value: "Delivered", label: "Delivered" }
 
 

// ];

// const ManageOrders = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState({});
//   const [selectedStatus, setSelectedStatus] = useState("");
//  const [showCanceledOrders, setShowCanceledOrders] = useState(false);
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const statusColor = (status) => {
//     switch (status) {
//       case "Accepted":
//         return "bg-orange-100 text-red-800";
//       case "Processing":
//         return "bg-yellow-100 text-yellow-800";
//       case "Shipped":
//         return "bg-blue-100 text-blue-800";
//       case "Delivered":
//         return "bg-green-100 text-green-800";
      
//         case "Order Placed":
//         return "bg-green-100 text-green-800"; 
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetch(`${BASE_URL_AND_PORT}/order/allorderdata`, {
//       headers: {
//         "API-Key": API_KEY,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch orders");
//         return res.json();
//       })
//       .then((data) => {
//         setOrders(data);
//         setFilteredOrders(data);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Error fetching orders. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleStatusChange = (order_id, newStatus) => {
//     if (!newStatus) return;

//     setUpdating((prev) => ({ ...prev, [order_id]: true }));

//     fetch(`${BASE_URL_AND_PORT}/order/statusupdate`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "API-Key": API_KEY,
//       },
//       body: JSON.stringify({ orderid: order_id, orderstatus: newStatus }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update order status");
//         setOrders((prev) =>
//           prev.map((order) =>
//             order.order_id === order_id
//               ? { ...order, order_status: newStatus }
//               : order
//           )
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Error updating order status. Please try again.");
//       })
//       .finally(() => {
//         setUpdating((prev) => ({ ...prev, [order_id]: false }));
//       });
//   };






//   const handleCancelOrder = async (orderId) => {
//     setUpdating((prev) => ({ ...prev, [orderId]: true }));

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/order/cancel`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "API-Key": API_KEY,
//         },
//         body: JSON.stringify({ order_id: orderId }),
//       });

//       if (!response.ok) throw new Error("Failed to cancel order");

//       setOrders((prev) =>
//         prev.map((order) =>
//           order.order_id === orderId
//             ? { ...order, order_status: "canceled" }
//             : order
//         )
//       );
//     } catch (error) {
//       console.error(error);
//       alert("Error canceling order. Please try again.");
//     } finally {
//       setUpdating((prev) => ({ ...prev, [orderId]: false }));
//     }
//   };

  
// const filterOrdersByStatus = (status) => {
//   setSelectedStatus(status);

//   if (!status) {
//     // if status is empty or falsy, reset filter
//     setFilteredOrders(orders);
//   } else {
//     const lowerStatus = status.toLowerCase();
//     setFilteredOrders(
//       orders.filter(
//         (order) => order.order_status?.toLowerCase() === lowerStatus
//       )
//     );
//   }
// };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-gray-800">
//       <AdminNavbar onToggleSidebar={toggleSidebar} />
//       <div className="flex flex-1">
//         <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-2 sm:px-8 w-full">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-3xl font-bold mb-8 text-indigo-700 text-center">
//               Manage Orders
//             </h1>

//             <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4">
//               {ORDER_STATUS_OPTIONS.map((option) => (
//                 <button
//                   key={option.value}
//                   onClick={() => filterOrdersByStatus(option.value)}
//                   className={`px-4 py-2 rounded-md text-white ${
//                     selectedStatus === option.value
//                       ? "bg-indigo-700"
//                       : "bg-indigo-500"
//                   }`}
//                 >
//                   {option.label}
//                 </button>
//               ))}
//           <button
//             onClick={() => {
//               setShowCanceledOrders((prev) => !prev);
//               setSelectedStatus(""); // reset status filter if needed
//             }}
//             className={`px-4 py-2 rounded-md text-white ${
//               showCanceledOrders ? "bg-red-700" : "bg-red-500"
//             }`}
//           >
//             {showCanceledOrders ? "Hide Canceled Orders" : "Canceled Orders"}
//           </button>
             
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {loading ? (
//                 <div className="flex justify-center items-center col-span-full py-10">
//                   <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
//                 </div>
//               ) : filteredOrders.length === 0 ? (
//                 <p className="col-span-full text-center text-gray-500">
//                   No orders found for the selected status.
//                 </p>
//               ) : (
//                 filteredOrders.map((order) => {
//                   const displayStatus =
//                     !order.order_status || order.order_status === "null"
//                       ? "Order Placed"
//                       : order.order_status;

//                   return (
//                     <div
//                       key={order.order_id}
//                       className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between"
//                     >
//                       <div>
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="font-semibold text-lg text-indigo-800">
//                             {order.product_name} ({order.product_model})
//                           </span>
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs
//                             font-semibold ${statusColor(displayStatus)}`}
//                           >
//                             {displayStatus}
//                           </span>
//                         </div>

//                         <div className="text-sm text-gray-600 mb-2">
//                           <span className="font-medium">Order ID:</span>{" "}
//                           {order.order_id}
//                         </div>

//                         <div className="mb-2">
//                           <span className="font-medium text-gray-700">Customer:</span>{" "}
//                           {order.user_name}
//                           <br />
//                           Email: <span className="text-gray-500">{order.user_email}</span>
//                         </div>

//                         <div className="mb-2">
//                           <span className="font-medium text-gray-700">Phone:</span>{" "}
//                           {order.user_phonenumber}
//                         </div>

//                         <div className="mb-2">
//                           <span className="font-medium text-gray-700">Address:</span>{" "}
//                           {order.deliveryaddress || order.address}
//                         </div>

//                         <div className="mb-2">
//                           <span className="font-medium text-gray-700">Quantity:</span>{" "}
//                           {order.quantity_ordered}
//                         </div>

//                         <div className="mb-2">
//                           <span className="font-medium text-gray-700">Total:</span>{" "}
//                           <span className="text-indigo-700 font-bold">₹{order.total_amount}</span>
//                         </div>

//                         <div className="mb-2">
//                           <span className="font-medium text-gray-700">Payment:</span>{" "}
//                           {order.payment_option}
//                         </div>

//                         <div className="mb-2">
//                           <span className="font-medium text-gray-700">Order Date:</span>{" "}
//                           {new Date(order.purchase_time).toLocaleString("en-IN", {
//                             dateStyle: "medium",
//                             timeStyle: "short",
//                             hour12: true,
//                           })}
//                         </div>

//                         <details className="mb-2">
//                           <summary className="cursor-pointer text-m text-indigo-500 font-medium">
//                             Product Details
//                           </summary>
//                           <div className="text-m text-gray-500 mt-1 pl-2">
//                             {Object.entries(order.product_details || {}).map(([k, v]) => (
//                               <div key={k}>
//                                 <span className="capitalize">{k.replace(/_/g, " ")}:</span>{" "}
//                                 {String(v)}
//                               </div>
//                             ))}
//                           </div>
//                         </details>
//                       </div>

//                      {/* Show dropdown only if order is NOT canceled */}
// {order.order_status?.toLowerCase() !== "canceled" && (
//   <div className="mt-4 flex flex-wrap gap-2 items-center">
//     <select
//       className="border rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-300"
//       value={
//         !order.order_status || order.order_status === "null"
//           ? ""
//           : order.order_status
//       }
//       onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
//       disabled={updating[order.order_id]}
//     >
//       {ORDER_STATUS_OPTIONS.map((opt) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>

//     {updating[order.order_id] && (
//       <span className="text-sm text-gray-400 ml-2">Updating...</span>
//     )}
//   </div>
// )}

//                       </div>
                  
//                   );
//                 })
//               )}
//             </div> 
 
           
//           {/* Canceled Orders Section - show only if toggled */}
//         {showCanceledOrders && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-semibold text-red-700 mb-4 text-center">
//               Canceled Orders
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {orders.filter(
//                 (order) => order.order_status?.toLowerCase() === "canceled"
//               ).length === 0 ? (
//                 <p className="col-span-full text-center text-gray-500">
//                   No canceled orders.
//                 </p>
//               ) : (
//                 orders
//                   .filter((order) => order.order_status?.toLowerCase() === "canceled")
//                   .map((order) => (
//                     <div
//                       key={order.order_id}
//                       className="bg-white border border-red-200 rounded-xl shadow-lg p-6"
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <h3 className="text-lg font-semibold text-red-700">
//                           {order.product_name} ({order.product_model})
//                         </h3>
//                         <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
//                           Canceled
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-1">
//                         <strong>Order ID:</strong> {order.order_id}
//                       </p>
//                       <p className="text-sm text-gray-600 mb-1">
//                         <strong>Customer:</strong> {order.user_name}
//                       </p>
//                       <p className="text-sm text-gray-600 mb-1">
//                         <strong>Email:</strong> {order.user_email}
//                       </p>
//                       <p className="text-sm text-gray-600 mb-1">
//                         <strong>Total:</strong> ₹{order.total_amount}
//                       </p>

//                       {order.reasonforcancel && order.reasonforcancel !== "other" && (
//                         <p className="text-sm text-black-600 font-medium mt-3">
//                           <strong>Cancellation Reason:</strong> {order.reasonforcancel}
//                         </p>
//                       )}

//                       {order.reasonforcancel === "other" && order.otherreasonforcancel && (
//                         <>
//                           <p className="text-sm text-black-600 font-medium mt-3">
//                             <strong>Cancellation Reason:</strong> Other
//                           </p>
//                           <p className="text-sm text-gray-700 mt-1 ml-2 italic">
//                             &ldquo;{order.otherreasonforcancel}&rdquo;
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   ))
//               )}
//             </div>
//           </div>
//         )}
               
          
           
//               </div>
//             </div>
//           </div>
//         </div>
     
//   );
// };

// export default ManageOrders;


import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin_sidebar";
import AdminNavbar from "../Admin_navbar";

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const ORDER_STATUS_OPTIONS = [
  { value: "", label: "All Orders" },
  { value: "null", label: "Order Placed" },
  { value: "Accepted", label: "Accepted" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
];

const CANCEL_REASON_OPTIONS = [
  "Customer Request",
  "Out of Stock",
  "Payment Issue",
  "Other",
];

const ManageOrders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showCanceledOrders, setShowCanceledOrders] = useState(false);

  // Cancel Modal
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelOtherReason, setCancelOtherReason] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const statusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-orange-100 text-orange-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Order Placed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Fetch orders
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL_AND_PORT}/order/allorderdata`, {
      headers: { "API-Key": API_KEY },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.purchase_time) - new Date(a.purchase_time)
        );
        setOrders(sorted);
        setFilteredOrders(sorted);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching orders. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Update order status
  const handleStatusChange = (order_id, newStatus) => {
    if (!newStatus) return;
    setUpdating((prev) => ({ ...prev, [order_id]: true }));

    fetch(`${BASE_URL_AND_PORT}/order/statusupdate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "API-Key": API_KEY },
      body: JSON.stringify({ orderid: order_id, orderstatus: newStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update order status");
        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === order_id
              ? { ...order, order_status: newStatus }
              : order
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating order status. Please try again.");
      })
      .finally(() => setUpdating((prev) => ({ ...prev, [order_id]: false })));
  };

  // Open cancel modal
  const openCancelModal = (orderId) => {
    setCancelOrderId(orderId);
    setCancelOtherReason("");
    setCancelModalVisible(true);
  };

  // Admin Cancel Order
  const handleCancelOrder = async () => {
    const orderId = cancelOrderId;
    if (!orderId) return;

    const order = orders.find((o) => o.order_id === orderId);
    const displayStatus =
      !order.order_status || order.order_status === "null"
        ? "Order Placed"
        : order.order_status;

    if (displayStatus !== "Order Placed") {
      alert("You can only cancel orders that are in 'Order Placed' status.");
      setCancelModalVisible(false);
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setUpdating((prev) => ({ ...prev, [orderId]: true }));

    try {
      const res = await fetch(`${BASE_URL_AND_PORT}/order/cancelorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "API-Key": API_KEY },
        body: JSON.stringify({
          order_id: orderId,
          reasonforcancel: "Admin Cancelled", // fixed reason for admin
          otherreasonforcancel: cancelOtherReason || "", // admin types reason
        }),
      });

      if (!res.ok) throw new Error("Failed to cancel order");

      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderId
            ? {
                ...o,
                order_status: "canceled",
                admin_cancelled: true,
                reasonforcancel: "Admin Cancelled",
                otherreasonforcancel: cancelOtherReason || "",
                refund_status: null, // refund not done yet
              }
            : o
        )
      );

      alert("Order successfully canceled by admin.");
    } catch (err) {
      console.error(err);
      alert("Error canceling order. Please try again.");
    } finally {
      setUpdating((prev) => ({ ...prev, [orderId]: false }));
      setCancelModalVisible(false);
    }
  };

  // Refund for admin canceled orders
  const handleRefund = async (order) => {
    if (!window.confirm("Initiate refund for this order?")) return;

    setUpdating((prev) => ({ ...prev, [order.order_id]: true }));

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/razorpay-refunds/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "API-Key": API_KEY },
        body: JSON.stringify({
          order_id: order.order_id,
          refund_amount_paise: order.total_amount * 100,
          rzp_payment_id: order.payment_id,
          reason: "Admin canceled order refund",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Refund failed");

      alert(`Refund initiated. Status: ${data.refund_status}`);

      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === order.order_id ? { ...o, refund_status: data.refund_status } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Refund initiation failed. See console for details.");
    } finally {
      setUpdating((prev) => ({ ...prev, [order.order_id]: false }));
    }
  };

  // Filter orders
  const filterOrdersByStatus = (status) => {
    setSelectedStatus(status);
    if (!status) setFilteredOrders(orders);
    else
      setFilteredOrders(
        orders.filter(
          (order) => (order.order_status || "Order Placed").toLowerCase() === status.toLowerCase()
        )
      );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-gray-800">
      <AdminNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-2 sm:px-8 w-full">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-indigo-700 text-center">
              Manage Orders
            </h1>

            {/* Status Filter */}
            <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4">
              {ORDER_STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => filterOrdersByStatus(opt.value)}
                  className={`px-4 py-2 rounded-md text-white ${
                    selectedStatus === opt.value ? "bg-indigo-700" : "bg-indigo-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <button
                onClick={() => setShowCanceledOrders((prev) => !prev)}
                className={`px-4 py-2 rounded-md text-white ${
                  showCanceledOrders ? "bg-red-700" : "bg-red-500"
                }`}
              >
                {showCanceledOrders ? "Hide Canceled Orders" : "Show Canceled Orders"}
              </button>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="flex justify-center items-center col-span-full py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
                </div>
              ) : filteredOrders.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">No orders found.</p>
              ) : (
                filteredOrders.map((order) => {
                  const displayStatus =
                    !order.order_status || order.order_status === "null"
                      ? "Order Placed"
                      : order.order_status;

                  const canCancelByAdmin = displayStatus === "Order Placed";
                  const showRefundButton = order.admin_cancelled && !order.refund_status;

                  return (
                    <div
                      key={order.order_id}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-lg text-indigo-800">
                            {order.product_name} ({order.product_model})
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                              displayStatus
                            )}`}
                          >
                            {displayStatus}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Order ID:</strong> {order.order_id}
                        </div>
                        <div className="mb-2">
                          <strong>Customer:</strong> {order.user_name} <br />
                          Email: <span className="text-gray-500">{order.user_email}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Phone:</strong> {order.user_phonenumber}
                        </div>
                        <div className="mb-2">
                          <strong>Address:</strong> {order.deliveryaddress || order.address}
                        </div>
                        <div className="mb-2">
                          <strong>Quantity:</strong> {order.quantity_ordered}
                        </div>
                        <div className="mb-2">
                          <strong>Total:</strong>{" "}
                          <span className="text-indigo-700 font-bold">₹{order.total_amount}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Payment:</strong> {order.payment_option}
                        </div>
                        <div className="mb-2">
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.purchase_time).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                            hour12: true,
                          })}
                        </div>

                        {/* Refund Button for admin-canceled orders */}
                        {showRefundButton && (
                          <button
                            onClick={() => handleRefund(order)}
                            disabled={updating[order.order_id]}
                            className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                          >
                            {updating[order.order_id] ? "Processing Refund..." : "Refund"}
                          </button>
                        )}

                        {/* Cancellation Reason */}
                        {order.reasonforcancel && (
                          <p className="text-sm text-black-600 font-medium mt-3">
                            <strong>Cancellation Reason:</strong> {order.reasonforcancel === "other" ? order.otherreasonforcancel : order.reasonforcancel}
                          </p>
                        )}
                      </div>

                      {/* Cancel Button */}
                      {canCancelByAdmin && (
                        <button
                          onClick={() => openCancelModal(order.order_id)}
                          disabled={updating[order.order_id]}
                          className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                        >
                          {updating[order.order_id] ? "Cancelling..." : "Cancel Order"}
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
    {/* Canceled Orders Section */}
{showCanceledOrders && (
  <div className="mt-12">
    <h2 className="text-2xl font-semibold text-red-700 mb-4 text-center">
      Canceled Orders
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.filter(
        (order) => order.order_status?.toLowerCase() === "canceled"
      ).length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No canceled orders.
        </p>
      ) : (
        orders
          .filter((order) => order.order_status?.toLowerCase() === "canceled")
          .map((order) => (
            <div
              key={order.order_id}
              className="bg-white border border-red-200 rounded-xl shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-red-700">
                    {order.product_name} ({order.product_model})
                  </h3>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Canceled
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Order ID:</strong> {order.order_id}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Customer:</strong> {order.user_name}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {order.user_email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Total:</strong> ₹{order.total_amount}
                </p>

                {/* Refund Button for admin-canceled orders */}
                {order.reasonforcancel === "Admin Cancelled" && !order.refund_status && (
                  <button
                    onClick={() => handleRefund(order)}
                    disabled={updating[order.order_id]}
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                  >
                    {updating[order.order_id] ? "Processing Refund..." : "Refund"}
                  </button>
                )}

                {/* Cancellation Reason */}
                {/* {order.reasonforcancel && (
                  <p className="text-sm text-black-600 font-medium mt-3">
                    <strong>Cancellation Reason:</strong>{" "}
                    {order.reasonforcancel === "Admin Cancelled"
                      ? order.otherreasonforcancel
                        ? order.otherreasonforcancel
                        : "Admin Cancelled"
                      : order.reasonforcancel}
                  </p>
             

                )} */}
                {/* {order.reasonforcancel && (
  <div className="mt-3">
    <p className="text-sm text-black-600 font-medium">
      <strong>Cancellation Reason:</strong>{" "}
      {order.reasonforcancel === "Admin Cancelled"
        ? order.otherreasonforcancel
          ? order.otherreasonforcancel
          : "Admin Cancelled"
        : order.reasonforcancel}
    </p>

    {order.otherreasonforcancel && order.reasonforcancel !== "Admin Cancelled" && (
      <p className="text-sm text-gray-600 mt-1">
        <strong>Other Reason:</strong> {order.otherreasonforcancel}
      </p>
    )}
  </div>
)} */}

{order.reasonforcancel && (
  <div className="mt-3">
    {/* MAIN CANCELLATION REASON */}
    <p className="text-sm text-black-600 font-medium">
      <strong>Cancellation Reason:</strong>{" "}
      {order.reasonforcancel === "Admin Cancelled"
        ? order.otherreasonforcancel || "Admin Cancelled"
        : order.reasonforcancel === "other"
        ? "Other"
        : order.reasonforcancel}
    </p>

    {/* SHOW OTHER REASON TEXT */}
    {order.otherreasonforcancel && (
      <p className="text-sm text-gray-700 mt-1 ml-2 italic">
        &ldquo;{order.otherreasonforcancel}&rdquo;
      </p>
    )}
  </div>
)}

              </div>
            </div>
          ))
      )}
    </div>
  </div>
)}
            {/* Cancel Reason Modal */}
            {cancelModalVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Cancel Order (Admin)</h2>
                  <p className="mb-2 font-medium">Reason for cancellation:</p>
                  <input
                    type="text"
                    placeholder="Enter reason (admin notes)"
                    value={cancelOtherReason}
                    onChange={(e) => setCancelOtherReason(e.target.value)}
                    className="border rounded-md px-3 py-2 w-full mb-4"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setCancelModalVisible(false)}
                      className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCancelOrder}
                      className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
