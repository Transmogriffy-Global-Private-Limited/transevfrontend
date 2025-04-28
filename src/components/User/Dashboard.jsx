import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import UserSidebar from '../User/User_sidebar';
import UserNavbar from '../User/User_Navbar';
import Ac_Charger from '../../assets/walmount.png'; // Imported AC Charger image
import DC_charger from '../../assets/portable.png'; // Imported DC Charger image
import newcharger from '../../assets/DC60.png'; // Imported new charger image

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0); // New state for total orders
  const [orders, setOrders] = useState([]);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch purchase summary and total orders
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in localStorage');
      setLoading(false);
      return;
    }

    const fetchPurchaseData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL_AND_PORT}/analytics/user_purchase_summary`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'API-Key': API_KEY,
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch purchase data');

        const data = await response.json();
        setPurchaseData(data.user_purchase_summary || []);
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };

    const fetchTotalOrders = async () => {
      try {
        const response = await fetch(
          `${BASE_URL_AND_PORT}/analytics/user_total_spent_and_orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'API-Key': API_KEY,
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch total orders');

        const data = await response.json();
        const summary = data.user_total_spent_and_orders || {};
        setTotalOrders(summary.total_orders || 0); // Update total orders state
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    Promise.all([fetchPurchaseData(), fetchTotalOrders()]).finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await axios.post(
          `${BASE_URL}/order/orderhistory`,
          { user_id: userId },
          {
            headers: {
              "Content-Type": "application/json",
              "API-Key": API_KEY,
            },
          }
        );

        setOrders(response.data.slice(0, 4)); // Get the first 4 orders
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  // Prepare chart data
  const chartData = {
    labels: purchaseData.map((item) => item.product_name),
    datasets: [
      {
        label: 'Chargers Purchased',
        data: purchaseData.map((item) => item.total_items_purchased),
        backgroundColor: [
          '#60a5fa', '#34d399', '#f87171', '#fbbf24', '#a78bfa', '#fb7185',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const totalChargers = purchaseData.reduce((sum, item) => sum + item.total_items_purchased, 0);
  const totalAmount = purchaseData.reduce((sum, item) => sum + item.total_purchase_amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-gray-800">
      <UserNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto bg-green rounded-tl-3xl shadow-inner">
         
           <div className="max-w-7xl mx-auto space-y-10">
           <section>
              <h2 className="text-xl font-bold text-teal-700 mb-4"> New Arrival EV Chargers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Portable EV Charger ',
                    type: 'Home Charger and Travel Ready',
                    color: 'green',
                    image: DC_charger,
                  },
                  {
                    name: 'Wall Mounting EV Charger',
                    type: 'Home and Commercial Charger',
                    color: 'blue',
                    image: Ac_Charger,
                  },
                  {
                    name: ' DC Fast Charger',
                    type: 'Commercial Charger',
                    color: 'red',
                    image: newcharger,
                  },
                ].map((charger, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <img
                      src={charger.image}
                      alt={charger.name}
                      className="rounded mb-4 w-full h-[450px] object-cover"
                    />
                    <h4 className="font-bold text-lg">{charger.name}</h4>
                    <p className={`text-${charger.color}-500 font-medium`}>{charger.type}</p>
                  </div>
                ))}
              </div>
            </section>

  {/* Top Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-teal-500">
      <h3 className="text-lg font-semibold">Total Product Order</h3>
      <p className="text-3xl font-bold">{totalChargers}</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-400">
      <h3 className="text-lg font-semibold">Total Spend</h3>
      <p className="text-3xl font-bold">₹{totalAmount}</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-pink-500">
      <h3 className="text-lg font-semibold">Total Order</h3>
      <p className="text-3xl font-bold">{totalOrders}</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-indigo-500">
      <h3 className="text-lg font-semibold">Avg. Usage</h3>
      <p className="text-3xl font-bold">876 kWh</p>
    </div>
  </div>
  {!loading && (
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold text-teal-600 mb-4">Purchase Summary</h2>
                <div className="w-full h-[300px]">
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: true, position: 'top' },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: { stepSize: 1 },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}



            {/* Your EV Chargers */}
           
            {/* Purchase Chart */}
           
            {/* Recent Activity */}
            <section>
              <h2 className="text-xl font-bold text-teal-700 mb-4">Recent Activity</h2>
              <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
                {[
                  'Charged 18kWh at Fast DC Charger – ₹215',
                  'Bought Portable Charger – ₹1200',
                  'Session completed at Wallbox – 9:30 PM',
                ].map((item, i) => (
                  <li key={i} className="px-4 py-3 hover:bg-gray-50">{item}</li>
                ))}
              </ul>
            </section>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
