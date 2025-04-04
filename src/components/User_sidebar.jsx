// src/components/UserSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className={`w-64 bg-teal-500 p-4 text-white ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
      {/* Hamburger icon for small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden mb-4 p-2 bg-teal-600 text-white rounded"
      >
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white"></span>
      </button>

      <div className="text-2xl font-bold mb-8 text-center">EV Charger Shop</div>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="block py-2 px-4 hover:bg-teal-600 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/orders" className="block py-2 px-4 hover:bg-teal-600 rounded">My Orders</Link>
        </li>
        <li>
          <Link to="/products" className="block py-2 px-4 hover:bg-teal-600 rounded">Products</Link>
        </li>
        <li>
          <Link to="/cart" className="block py-2 px-4 hover:bg-teal-600 rounded">Shopping Cart</Link>
        </li>
        <li>
          <Link to="/settings" className="block py-2 px-4 hover:bg-teal-600 rounded">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
