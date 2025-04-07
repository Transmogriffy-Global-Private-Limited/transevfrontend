import React, { useState } from 'react';
import AdminSidebar from './Admin_sidebar';
 import AdminNavbar from './Admin_navbar'


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://example.com/your-image.jpg")' }}>
      {/* User Navbar */}
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <div className="mt-10 ml-100">
          {/* Charger Inventory Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-red-300 p-6 rounded-lg shadow-md hover:bg-teal-50 transition duration-300">
              <h3 className="text-xl font-medium text-teal-500">Total Chargers Available</h3>
              <p className="text-2xl font-semibold mt-2">150</p>
            </div>
            <div className="bg-yellow-200 p-6 rounded-lg shadow-md hover:bg-teal-50 transition duration-300">
              <h3 className="text-xl font-medium text-teal-500">Low Stock Chargers</h3>
              <p className="text-2xl font-semibold mt-2">12</p>
            </div>
            <div className="bg-purple-400 p-6 rounded-lg shadow-md hover:bg-teal-50 transition duration-300">
              <h3 className="text-xl font-medium text-teal-500">Total Charger Sales</h3>
              <p className="text-2xl font-semibold mt-2">₹45,000</p>
            </div>
          </div>

          {/* Charger Orders Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium text-teal-500 mb-4">Charger Orders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Pending Orders</h4>
                <p className="text-xl">10</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Shipped Orders</h4>
                <p className="text-xl">85</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Completed Orders</h4>
                <p className="text-xl">55</p>
              </div>
            </div>
          </div>

          {/* Sales Stats Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium text-teal-500 mb-4">Sales Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Total Sales Today</h4>
                <p className="text-xl">₹5000</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Total Sales This Month</h4>
                <p className="text-xl">₹45,000</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Total Chargers Sold</h4>
                <p className="text-xl">150</p>
              </div>
            </div>
          </div>

          {/* New Charger Management Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium text-teal-500 mb-4">Manage Chargers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">Add New Charger</button>
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">Edit Charger</button>
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">Remove Charger</button>
            </div>
          </div>

          {/* Charger Promotions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium text-teal-500 mb-4">Charger Promotions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">Add Promotion</button>
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">View Active Promotions</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-teal-500 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">View Charger Inventory</button>
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">Manage Orders</button>
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">View Sales Reports</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

export default Dashboard;

