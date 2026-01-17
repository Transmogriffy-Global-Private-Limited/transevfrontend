import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin_sidebar";
import AdminNavbar from "../Admin_navbar";

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
const REFUND_BASE = `${BASE_URL_AND_PORT}/razorpay-refunds`;

const AdminRefunds = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [refundMap, setRefundMap] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  /* ---------------- FETCH CANCELED ORDERS ---------------- */
  useEffect(() => {
    const fetchOrdersAndRefunds = async () => {
      try {
        const res = await fetch(`${BASE_URL_AND_PORT}/order/allorderdata`, {
          headers: { "API-Key": API_KEY },
        });
        const data = await res.json();

        const canceledOrders = data.filter(
          (o) => o.order_status?.toLowerCase() === "canceled"
        );

        setOrders(canceledOrders);

        // 🔹 fetch refund details for each order
        for (const order of canceledOrders) {
          await fetchRefundDetails(order.order_id);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load refund data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndRefunds();
  }, []);

  /* ---------------- REFUND HELPERS ---------------- */
  const getRefundIdsByOrderId = async (orderId) => {
    const res = await fetch(`${REFUND_BASE}/get-all-refund-ids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
      body: JSON.stringify({ order_ids: [orderId] }),
    });
    return res.json();
  };

  const getRefundDetailsByRzpId = async (rzpRefundId) => {
    const res = await fetch(`${REFUND_BASE}/get-refund-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
      body: JSON.stringify({ razorpay_refund_id: rzpRefundId }),
    });
    return res.json();
  };

  const fetchRefundDetails = async (orderId) => {
    try {
      const ids = await getRefundIdsByOrderId(orderId);
      if (!ids.refund_ids?.length) return;

      const details = await getRefundDetailsByRzpId(ids.refund_ids[0]);

      setRefundMap((prev) => ({
        ...prev,
        [orderId]: details,
      }));
    } catch (err) {
      console.error("Refund fetch error:", err);
    }
  };

  const badge = (status) => {
    const map = {
      created: "bg-gray-200 text-gray-800",
      pending: "bg-yellow-200 text-yellow-800",
      processed: "bg-green-200 text-green-800",
      failed: "bg-red-200 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${map[status] || "bg-gray-100"}`}>
        {status || "N/A"}
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-indigo-700 text-center mb-8">
            Refund Management
          </h1>

          {loading ? (
            <p className="text-center">Loading refund data...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">
              No canceled orders found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => {
                const refund = refundMap[order.order_id];

                return (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-xl shadow border p-5"
                  >
                    <h3 className="font-semibold text-red-700 mb-1">
                      {order.product_name}
                    </h3>

                    <p className="text-sm">
                      <b>Order ID:</b> {order.order_id}
                    </p>

                    <p className="text-sm">
                      <b>Total:</b> ₹{order.total_amount}
                    </p>

                    <p className="text-sm">
                      <b>Cancel Reason:</b>{" "}
                      {order.reasonforcancel === "Admin Cancelled"
                        ? order.otherreasonforcancel || "Admin Cancelled"
                        : order.reasonforcancel}
                    </p>

                    {!refund ? (
                      <p className="mt-3 text-sm text-gray-400">
                        No refund record found
                      </p>
                    ) : (
                      <div className="mt-4 bg-indigo-50 rounded-lg p-4 text-sm space-y-2">
                        <div className="flex justify-between">
                          <span>Status</span>
                          {badge(refund.refund_status)}
                        </div>

                        <div className="flex justify-between">
                          <span>Refund Amount</span>
                          <span className="font-semibold">
                            ₹{refund.refund_amount_paise / 100}
                          </span>
                        </div>

                        <div className="text-xs">
                          <b>Refund ID:</b> {refund.rzp_refund_id}
                        </div>

                        <div className="text-xs">
                          <b>Payment ID:</b> {refund.rzp_payment_id}
                        </div>

                        <div className="text-xs">
                          <b>Created:</b>{" "}
                          {new Date(refund.created_at).toLocaleString("en-IN")}
                        </div>

                        {refund.failure_reason && (
                          <div className="bg-red-100 text-red-700 p-2 rounded text-xs">
                            Failure: {refund.failure_reason}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRefunds;
