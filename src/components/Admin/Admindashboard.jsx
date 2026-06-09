// import React, { useState, useEffect } from 'react';
// import AdminSidebar from './Admin_sidebar';
// import AdminNavbar from './Admin_navbar';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BASE_URL_AND_PORT = 'https://api.static.ev.transev.site';
// const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [productAnalytics, setProductAnalytics] = useState([]);
//   const [productStockAnalysis, setProductStockAnalysis] = useState([]);
//   const [totalSales, setTotalSales] = useState(0);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [totalChargers, setTotalChargers] = useState(131); // Hardcoded as per your provided value
// const [stockLoading, setStockLoading] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // Fetch Product Analytics and Total Sales
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch product analytics
//         const productAnalyticsResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/product_analytics`, {
//           method: 'GET',
//           headers: {
//             'API-Key': API_KEY,
//           },
//         });
//         const productAnalyticsData = await productAnalyticsResponse.json();
//         setProductAnalytics(productAnalyticsData.product_analytics);

//         // Fetch product stock analysis
//         const productStockAnalysisResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/product_stock_analysis`, {
//           method: 'GET',
//           headers: {
//             'API-Key': API_KEY,
//           },
//         });
//         // const productStockAnalysisData = await productStockAnalysisResponse.json();
//         // setProductStockAnalysis(productStockAnalysisData.product_stock_analysis);
//         const productStockAnalysisData = await productStockAnalysisResponse.json();
// setProductStockAnalysis(productStockAnalysisData.product_stock_analysis || []);
// setStockLoading(false); // ✅ stop loading once data arrives


//         // Fetch total sales
//         const totalSalesResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/total_sales`, {
//           method: 'GET',
//           headers: {
//             'API-Key': API_KEY,
//           },
//         });
//         const totalSalesData = await totalSalesResponse.json();
//         setTotalSales(totalSalesData.total_sales);

//         // Fetch order history based on user_id
//         const userId = "d6e4eff7-0ae9-4deb-8220-cd04be74f013"; // Use the actual user ID
//         const orderHistoryResponse = await fetch(`${BASE_URL_AND_PORT}/order/orderhistory`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'API-Key': API_KEY,
//           },
//           body: JSON.stringify({ user_id: userId }),
//         });
//         const orderHistoryData = await orderHistoryResponse.json();
//         setOrderHistory(orderHistoryData.orders);  // Assuming the API returns an `orders` array
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const calculateTotalOrders = () => {
//     return productAnalytics.reduce((total, product) => total + product.total_orders, 0);
//   };

//   const calculateTotalSalesFromAnalytics = () => {
//     return productAnalytics.reduce((total, product) => total + product.total_sales, 0);
//   };

//   const chartData = {
//     labels: productAnalytics.map((product) => product.product_name),
//     datasets: [
//       {
//         label: 'Total Orders',
//         data: productAnalytics.map((product) => product.total_orders),
//         backgroundColor: productAnalytics.map(() => {
//           const randomColor = `hsl(${Math.random() * 360}, 100%, 75%)`; 
//           return randomColor;
//         }),
//         borderColor: productAnalytics.map(() => '#000000'),
//         borderWidth: 1,
//       },
//     ],
//   };

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false, // ✅ REQUIRED for custom height
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         font: {
//           size: window.innerWidth < 640 ? 12 : 14,
//         },
//       },
//     },
//     x: {
//       ticks: {
//         font: {
//           size: window.innerWidth < 640 ? 11 : 14,
//           maxRotation: 45,
//           minRotation: 0,
//         },
//       },
//     },
//   },
//   plugins: {
//     legend: {
//       display: false, // cleaner on mobile
//     },
//     title: {
//       display: true,
//       text: 'Total Orders per Product',
//       font: {
//         size: window.innerWidth < 640 ? 14 : 18,
//       },
//       padding: {
//         top: 10,
//         bottom: 20,
//       },
//     },
//     tooltip: {
//       bodyFont: {
//         size: window.innerWidth < 640 ? 12 : 14,
//       },
//     },
//   },
// };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-gray-800">
//       {/* User Navbar */}
//       <AdminNavbar onToggleSidebar={toggleSidebar} />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-green-50 rounded-tl-3xl shadow-inner">
//        <div className="max-w-7xl mx-auto space-y-10">
//             {/* Section Title */}
//             <section>
//               <h2 className="text-2xl font-bold text-teal-700 mb-6">EV Chargers Dashboard</h2>

//               {/* Stat Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 <div className="p-6 rounded-lg shadow bg-blue-100 text-blue-700 transition-transform hover:scale-105">
//                   <h5 className="text-lg font-semibold">Total Chargers</h5>
//                   <h2 className="text-4xl font-bold mt-2">{productAnalytics.length}</h2>
//                 </div>
//                 <div className="p-6 rounded-lg shadow bg-green-100 text-green-700 transition-transform hover:scale-105">
//                   <h5 className="text-lg font-semibold">Total Orders</h5>
//                   <h2 className="text-4xl font-bold mt-2">{calculateTotalOrders()}</h2>
//                 </div>
//                 <div className="p-6 rounded-lg shadow bg-purple-100 text-purple-700 transition-transform hover:scale-105">
//                   <h5 className="text-lg font-semibold">Total Sales</h5>
//                   <h2 className="text-4xl font-bold mt-2">{totalSales}</h2>
//                 </div>
//               </div>

            
//           <div className="bg-white p-6 rounded-lg shadow mb-8">
//   <h5 className="text-2xl font-semibold text-gray-700 mb-6">
//     Charger Status Overview
//   </h5>

//   <div className="overflow-x-auto">
//     <table className="min-w-full divide-y divide-gray-200">
//       {/* ✅ TABLE HEAD — ALWAYS VISIBLE */}
//       <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
//         <tr>
//           <th className="px-6 py-3 text-left text-lg font-medium uppercase">
//             Product Name
//           </th>
//           <th className="px-6 py-3 text-left text-lg font-medium uppercase">
//             Initial Stock
//           </th>
//           <th className="px-6 py-3 text-left text-lg font-medium uppercase">
//             Remaining Stock
//           </th>
//           <th className="px-6 py-3 text-left text-lg font-medium uppercase">
//             Total Ordered
//           </th>
//         </tr>
//       </thead>

//       {/* 🔄 TABLE BODY */}
//       <tbody className="bg-white divide-y divide-gray-200">
//         {stockLoading ? (
//           <tr>
//             <td colSpan="4" className="py-16">
//               <div className="flex justify-center items-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-600"></div>
//               </div>
//             </td>
//           </tr>
//         ) : productStockAnalysis.length > 0 ? (
//           productStockAnalysis.map((product, index) => (
//             <tr key={index} className="hover:bg-teal-50">
//               <td className="px-6 py-4 text-m font-medium text-gray-900">
//                 {product.product_name}
//               </td>
//               <td className="px-6 py-4 text-m">
//                 {product.initial_stock}
//               </td>
//               <td className="px-6 py-4 text-m">
//                 {product.remaining_stock}
//               </td>
//               <td className="px-6 py-4 text-m">
//                 {product.total_ordered}
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="4" className="text-center text-gray-500 py-10">
//               No charger stock data available.
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>


//               {/* Performance Overview (Bar Chart) */}
// <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8">
//   <h5 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6 text-center sm:text-left">
//     Performance Overview
//   </h5>

//   {/* Responsive Chart Container */}
//   <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px]">
//     <Bar data={chartData} options={chartOptions} />
//   </div>
// </div>

//             </section>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import AdminSidebar from './Admin_sidebar';
import AdminNavbar from './Admin_navbar';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const BASE_URL_AND_PORT = 'https://api.static.ev.transev.site';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productAnalytics, setProductAnalytics] = useState([]);
  const [productStockAnalysis, setProductStockAnalysis] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalChargers, setTotalChargers] = useState(131);
  const [stockLoading, setStockLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [recentOrders, setRecentOrders] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product analytics
        const productAnalyticsResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/product_analytics`, {
          method: 'GET',
          headers: { 'API-Key': API_KEY },
        });
        const productAnalyticsData = await productAnalyticsResponse.json();
        setProductAnalytics(productAnalyticsData.product_analytics || []);

        // Fetch product stock analysis
        const productStockAnalysisResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/product_stock_analysis`, {
          method: 'GET',
          headers: { 'API-Key': API_KEY },
        });
        const productStockAnalysisData = await productStockAnalysisResponse.json();
        setProductStockAnalysis(productStockAnalysisData.product_stock_analysis || []);
        setStockLoading(false);

        // Fetch total sales
        const totalSalesResponse = await fetch(`${BASE_URL_AND_PORT}/analytics/total_sales`, {
          method: 'GET',
          headers: { 'API-Key': API_KEY },
        });
        const totalSalesData = await totalSalesResponse.json();
        setTotalSales(totalSalesData.total_sales || 0);

        // Fetch order history
        const userId = "d6e4eff7-0ae9-4deb-8220-cd04be74f013";
        const orderHistoryResponse = await fetch(`${BASE_URL_AND_PORT}/order/orderhistory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY,
          },
          body: JSON.stringify({ user_id: userId }),
        });
        const orderHistoryData = await orderHistoryResponse.json();
        const orders = orderHistoryData.orders || [];
        setOrderHistory(orders);
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalOrders = () => {
    return productAnalytics.reduce((total, product) => total + (product.total_orders || 0), 0);
  };

  const calculateLowStockItems = () => {
    return productStockAnalysis.filter(product => (product.remaining_stock || 0) < 10).length;
  };

  const calculateAverageOrderValue = () => {
    const total = calculateTotalSalesFromAnalytics();
    const orders = calculateTotalOrders();
    return orders > 0 ? (total / orders).toFixed(2) : 0;
  };

  const calculateTotalSalesFromAnalytics = () => {
    return productAnalytics.reduce((total, product) => total + (product.total_sales || 0), 0);
  };

  // Bar Chart Data
  const barChartData = {
    labels: productAnalytics.map((product) => product.product_name),
    datasets: [
      {
        label: 'Total Orders',
        data: productAnalytics.map((product) => product.total_orders),
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Doughnut Chart Data - Stock Distribution
  const totalStock = productStockAnalysis.reduce((sum, p) => sum + (p.initial_stock || 0), 0);
  const soldStock = productStockAnalysis.reduce((sum, p) => sum + (p.total_ordered || 0), 0);
  const remainingStock = totalStock - soldStock;

  const doughnutData = {
    labels: ['Sold Stock', 'Remaining Stock'],
    datasets: [
      {
        data: [soldStock, remainingStock],
        backgroundColor: ['#10b981', '#3b82f6'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  // Line Chart Data - Sales Trend (Mock data for demo)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales Trend',
        data: [4200, 5800, 7200, 6800, 9100, 11500, 14200, 13800, 15600, 18900, 21400, 24800],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1f2937', titleColor: '#fff', bodyColor: '#e5e7eb' },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#e5e7eb' }, ticks: { stepSize: 5 } },
      x: { ticks: { maxRotation: 45, minRotation: 0, font: { size: 11 } } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 12 }, usePointStyle: true } },
      tooltip: { backgroundColor: '#1f2937' },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12 } } },
      tooltip: { callbacks: { label: (ctx) => `$${ctx.raw.toLocaleString()}` } },
    },
    scales: {
      y: { ticks: { callback: (value) => `$${value.toLocaleString()}` } },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} p-4 md:p-6 lg:p-8`}>
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            
            {/* Header with Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 text-sm md:text-base mt-1">Welcome back! Here's what's happening with your EV chargers today.</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="daily">Today</option>
                  <option value="weekly">This Week</option>
                  <option value="monthly">This Month</option>
                  <option value="yearly">This Year</option>
                </select>
                <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Chargers</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{productAnalytics.length}</h3>
                    <span className="text-xs text-green-600 mt-2 inline-flex items-center gap-1">↑ 12% from last month</span>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{calculateTotalOrders()}</h3>
                    <span className="text-xs text-green-600 mt-2 inline-flex items-center gap-1">↑ 8% from last month</span>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Sales</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">₹{totalSales.toLocaleString()}</h3>
                    <span className="text-xs text-green-600 mt-2 inline-flex items-center gap-1">↑ 23% from last month</span>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Avg. Order Value</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">₹{calculateAverageOrderValue()}</h3>
                    <span className="text-xs text-gray-500 mt-2">From {calculateTotalOrders()} orders</span>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bar Chart - Performance Overview */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">Performance Overview</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-emerald-50 text-emerald-600 rounded-lg">Orders</button>
                    <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-50 rounded-lg">Revenue</button>
                  </div>
                </div>
                <div className="h-64 md:h-80">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </div>

              {/* Doughnut Chart - Stock Distribution */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Distribution</h3>
                <div className="h-48 md:h-56">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Sold Stock</p>
                    <p className="text-lg font-bold text-emerald-600">{soldStock}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className="text-lg font-bold text-blue-600">{remainingStock}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Trend & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Line Chart - Sales Trend */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Sales Trend</h3>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+28.4%</span>
                </div>
                <div className="h-64">
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
                </div>
                <div className="space-y-3">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-800">Order #{order.order_id?.slice(-6) || 'N/A'}</p>
                          <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">${order.total_amount || 0}</p>
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Completed</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center py-4">No recent orders</p>
                  )}
                </div>
              </div>
            </div>

            {/* Stock Status Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-800">Charger Stock Status</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="text-gray-500">Low Stock (&lt;10)</span>
                    </div>
                    <span className="text-sm text-gray-500">Total: {productStockAnalysis.length} items</span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initial Stock</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Stock</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Ordered</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stockLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : productStockAnalysis.length > 0 ? (
                      productStockAnalysis.map((product, index) => {
                        const isLowStock = (product.remaining_stock || 0) < 10;
                        return (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">{product.product_name}</td>
                            <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{product.initial_stock}</td>
                            <td className="px-4 md:px-6 py-4 text-sm">
                              <span className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                                {product.remaining_stock}
                              </span>
                            </td>
                            <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{product.total_ordered}</td>
                            <td className="px-4 md:px-6 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                                isLowStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                              }`}>
                                {isLowStock ? 'Low Stock' : 'In Stock'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">No stock data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;