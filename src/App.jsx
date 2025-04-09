// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import AboutPage from './components/About';
import NewsPage from './components/News';
import Solution from './components/Solution';
import Contact  from './components/Contact';
import ApartmentBuildings from './components/Apartmentbuildings';
import Holiday from './components/Holiday';
import Hotels from './components/Hotels';
import Workplace from './components/Workplace';
import Work from './components/work';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import ForgotPasswordPage from './components/User/ForgetPassword';
import UserProfile from './components/User/User_Profile';
import UserNavbar from './components/User/User_Navbar';
import UserSidebar from './components/User/User_sidebar';
import Dashboard from './components/User/Dashboard';
import AdminSignup from './components/Admin/Signup';
import AdminLogin from './components/Admin/Login';
import AdminForgetPassword from './components/Admin/ForgetPassword';
import AdminDashboard from './components/Admin/Admindashboard';
import AdminProfile from './components/Admin/AdminProfile';
import AddProduct from './components/Admin/Product/AddProduct';
import ManageProducts from './components/Admin/Product/ManageProducts';
import DelistedProducts from './components/Admin/Product/DelistedProducts';
import ProductView from './components/Admin/Product/ProductView';
import ProductEdit from './components/Admin/Product/ProductEdit';
import Product from './components/User/Products/Product';
import Cart from './components/User/Cart/Cart';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions/apartment-buildings" element={<ApartmentBuildings />} />
        <Route path="/solutions/holiday-parks" element={<Holiday />} />
        <Route path="/solutions/hotels" element={<Hotels />} />
        <Route path="/solutions/workplace" element={<Workplace />} />
        <Route path="/how-we-work" element={<Work />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/usernavbar" element={<UserNavbar />} />
        <Route path="/usersidebar" element={<UserSidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/signup" element={<AdminSignup/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgetPassword />} /> 
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
        <Route path="/admin/profile" element={<AdminProfile />} /> 
        <Route path="/add-product" element={<AddProduct />} /> 
        <Route path="/manage/products" element={<ManageProducts />} /> 
        <Route path="/admin/delisted-products" element={<DelistedProducts />} /> 
        <Route path="/admin/product/view/:id" element={<ProductView />} /> {/* Product View Page */}
        <Route path="/admin/product/edit/:id" element={<ProductEdit />} /> {/* Product Edit Page */}
        <Route path="/products" element={<Product />} /> 
        <Route path="/cart" element={<Cart />} /> 
      </Routes>
    </Router>
  );
}

export default App;


