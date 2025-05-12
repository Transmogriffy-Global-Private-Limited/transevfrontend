import React, { useState, useEffect } from 'react';
import AdminSidebar from './Admin_sidebar';
import AdminNavbar from './Admin_navbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productAnalytics, setProductAnalytics] = useState([]);
  const [productStockAnalysis, setProductStockAnalysis] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalChargers, setTotalChargers] = useState(131); // Hardcoded as per your provided value

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch Product Analytics and Total Sales
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product analytics
        const productAnalyticsResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/product_analytics`, {
          method: 'GET',
          headers: {
            'API-Key': API_KEY,
          },
        });
        const productAnalyticsData = await productAnalyticsResponse.json();
        setProductAnalytics(productAnalyticsData.product_analytics);

        // Fetch product stock analysis
        const productStockAnalysisResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/product_stock_analysis`, {
          method: 'GET',
          headers: {
            'API-Key': API_KEY,
          },
        });
        const productStockAnalysisData = await productStockAnalysisResponse.json();
        setProductStockAnalysis(productStockAnalysisData.product_stock_analysis);

        // Fetch total sales
        const totalSalesResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/total_sales`, {
          method: 'GET',
          headers: {
            'API-Key': API_KEY,
          },
        });
        const totalSalesData = await totalSalesResponse.json();
        setTotalSales(totalSalesData.total_sales);

        // Fetch order history based on user_id
        const userId = "d6e4eff7-0ae9-4deb-8220-cd04be74f013"; // Use the actual user ID
        const orderHistoryResponse = await fetch(`${BASE_URL_AND_PORT}/order/orderhistory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY,
          },
          body: JSON.stringify({ user_id: userId }),
        });
        const orderHistoryData = await orderHistoryResponse.json();
        setOrderHistory(orderHistoryData.orders);  // Assuming the API returns an `orders` array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalOrders = () => {
    return productAnalytics.reduce((total, product) => total + product.total_orders, 0);
  };

  const calculateTotalSalesFromAnalytics = () => {
    return productAnalytics.reduce((total, product) => total + product.total_sales, 0);
  };

  const chartData = {
    labels: productAnalytics.map((product) => product.product_name),
    datasets: [
      {
        label: 'Total Orders',
        data: productAnalytics.map((product) => product.total_orders),
        backgroundColor: productAnalytics.map(() => {
          const randomColor = `hsl(${Math.random() * 360}, 100%, 75%)`; 
          return randomColor;
        }),
        borderColor: productAnalytics.map(() => '#000000'),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Performance Overview of Total Orders per Product',
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Orders: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-gray-800">
      {/* User Navbar */}
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-green-50 rounded-tl-3xl shadow-inner">
       <div className="max-w-7xl mx-auto space-y-10">
            {/* Section Title */}
            <section>
              <h2 className="text-2xl font-bold text-teal-700 mb-6">EV Chargers Dashboard</h2>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 rounded-lg shadow bg-blue-100 text-blue-700 transition-transform hover:scale-105">
                  <h5 className="text-lg font-semibold">Total Chargers</h5>
                  <h2 className="text-4xl font-bold mt-2">{productAnalytics.length}</h2>
                </div>
                <div className="p-6 rounded-lg shadow bg-green-100 text-green-700 transition-transform hover:scale-105">
                  <h5 className="text-lg font-semibold">Total Orders</h5>
                  <h2 className="text-4xl font-bold mt-2">{calculateTotalOrders()}</h2>
                </div>
                <div className="p-6 rounded-lg shadow bg-purple-100 text-purple-700 transition-transform hover:scale-105">
                  <h5 className="text-lg font-semibold">Total Sales</h5>
                  <h2 className="text-4xl font-bold mt-2">{totalSales}</h2>
                </div>
              </div>

              {/* Charger Status Table */}
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h5 className="text-2xl font-semibold text-gray-700 mb-6">Charger Status Overview</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
                      <tr>
                        <th className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase">Product Name</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase">Initial Stock</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-white--500 uppercase">Remaining Stock</th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-white--500 uppercase">Total Ordered</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productStockAnalysis.map((product, index) => (
                        <tr key={index} className="hover:bg-teal-50">
                          <td className="px-6 py-4 text-m font-medium text-gray-900">{product.product_name}</td>
                          <td className="px-6 py-4 text-m text-white-700">{product.initial_stock}</td>
                          <td className="px-6 py-4 text-m text-white-700">{product.remaining_stock}</td>
                          <td className="px-6 py-4 text-m text--700">{product.total_ordered}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Performance Overview (Bar Chart) */}
              <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h5 className="text-2xl font-semibold text-gray-700 mb-6">Performance Overview</h5>
                <div className="h-100 flex items-center justify-center">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
