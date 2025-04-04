
import React, { useState } from 'react';
import UserSidebar from '../components/User_sidebar';
 import UserNavbar from '../components/User_Navbar';


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://example.com/your-image.jpg")' }}>
      {/* User Navbar */}
      <UserNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-red-300 p-6 rounded-lg shadow-md hover:bg-teal-50 transition duration-300">
              <h3 className="text-xl font-medium text-teal-500">Total Chargers Purchased</h3>
              <p className="text-2xl font-semibold mt-2">5</p>
            </div>
            <div className="bg-yellow-200 p-6 rounded-lg shadow-md hover:bg-teal-50 transition duration-300">
              <h3 className="text-xl font-medium text-teal-500">Pending Orders</h3>
              <p className="text-2xl font-semibold mt-2">2</p>
            </div>
            <div className="bg-purple-400 p-6 rounded-lg shadow-md hover:bg-teal-50 transition duration-300">
              <h3 className="text-xl font-medium text-teal-500">Total Spending</h3>
              <p className="text-2xl font-semibold mt-2">₹3,500</p>
            </div>
          </div>

          {/* New Section: User Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium text-teal-500 mb-4">User Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Total Purchases</h4>
                <p className="text-xl">15</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Total Savings</h4>
                <p className="text-xl">₹450</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-600">Order Completion Rate</h4>
                <p className="text-xl">98%</p>
              </div>
            </div>
          </div>

          {/* New Section: New Arrivals */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium text-teal-500 mb-4">New Arrivals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example product card */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <img src="https://via.placeholder.com/150" alt="Product 1" className="w-full h-32 object-cover rounded-lg mb-4" />
                <h4 className="text-xl font-semibold">Smart Charger V2</h4>
                <p className="text-teal-500">₹150</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <img src="https://via.placeholder.com/150" alt="Product 2" className="w-full h-32 object-cover rounded-lg mb-4" />
                <h4 className="text-xl font-semibold">Portable Charger</h4>
                <p className="text-teal-500">₹120</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <img src="https://via.placeholder.com/150" alt="Product 3" className="w-full h-32 object-cover rounded-lg mb-4" />
                <h4 className="text-xl font-semibold">Solar Charger</h4>
                <p className="text-teal-500">₹200</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-teal-500 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">Buy New Charger</button>
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">View Promotions</button>
              <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">Check Order Status</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
