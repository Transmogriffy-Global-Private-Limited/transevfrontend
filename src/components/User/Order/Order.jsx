
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import UserNavbar from "../User_Navbar";
import UserSidebar from "../User_sidebar";
import background from "../../../assets/new3.jpg";

const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
const token = localStorage.getItem("auth_token");
const userId = localStorage.getItem("user_id");

function OrderHistoryPage() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      alert("Please login first");
      return;
    }
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
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
      setOrderHistory(response.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
      alert("Failed to load order history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-yellow-100 via-green-200 to-teal-200 bg-cover bg-center bg-fixed"
      // style={{ background: `url(${background})` }}
    >
      <UserNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        {/* <div className="container mx-auto p-6 pt-6 mt-10 bg-[#f0f0f0] rounded-lg ml-70"> */}
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pt-6 mt-10 bg-[#f0f0f0] rounded-lg lg:ml-80">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
            Order History
          </h2>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
            </div>
          ) : orderHistory.length > 0 ? (
            orderHistory.map((order) => (
              <div
                key={order.order_id}
                className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg shadow-lg mb-6 p-6 border-l-4 border-blue-400 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-800">{order.product_name}</h3>
                    <p className="text-s text-gray-500 mt-1">Order ID: <span className="font-mono">{order.order_id}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-green-700">₹{order.total_amount}</p>
                    <p className="text-sm text-gray-700">Qty: {order.quantity_ordered}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <p className="text-m text-gray-600">
                    Payment Method: <span className="font-medium text-gray-800">{order.payment_option}</span>
                  </p>
                  
                 
                 

                  <p className="text-m text-gray-600 mt-2 md:mt-0">
                    Status:{" "}
                    <span
                      className={`inline-block px-3 py-1 text-s font-semibold rounded-full ${
                        order.order_status === "null"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {order.order_status === "null" ? "Order Confirm" : order.order_status}
                    </span>
                  </p>
                </div>
                <p className="text-lg text-gray-600">
                    Delivery Address: <span className="font-medium text-gray-800">{order.deliveryaddress}</span>
                  </p> 
                <button
                  onClick={() => {
                    document.getElementById(order.order_id)?.classList.toggle("hidden");
                  }}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                  View Details
                </button>

                <div
                  id={order.order_id}
                  className="hidden mt-4 bg-white border rounded-lg p-4 shadow-inner"
                >
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Product Details</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    {Object.entries(order.product_details).map(([key, value]) => (
                      <li key={key}>
                        <strong className="capitalize text-gray-800">{key.replace(/_/g, " ")}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-medium text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryPage;
