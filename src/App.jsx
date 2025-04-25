// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import AboutPage from './components/About';
import NewsPage from './components/News';
import Solution from './components/Solution';
import Contact  from './components/Contact';
import ApartmentBuildings from './components/Apartmentbuildings';
import Workplace from './components/Workplace';
import PublicPlace from './components/PublicPlaces';
import FleetOrganization from './components/FleetOrganization';
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
import UserOrder from './components/User/Order/Order';
import Address from './components/User/Address';
import Setting from './components/User/Settings/Setting';
import ManageUser from './components/Admin/Users/ViewUser';
import ManageOrder from './components/Admin/AdminOrder/ManageOrder';
import Adminsetting from './components/Admin/Settings/Adminsetting';
import AdminReports from './components/Admin/Report/Report';
import ViewDelistedProduct from './components/Admin/Product/ViewDelistedProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions/home-and-housing-societies" element={<ApartmentBuildings />} />
        <Route path="/solutions/office-and-workplace" element={<Workplace />} />
        <Route path="/solutions/public-places" element={<PublicPlace />} />
        <Route path="/solutions/fleet-organization" element={<FleetOrganization />} />
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
        <Route path="/order" element={<UserOrder />} /> 
        <Route path="/address" element={<Address />} /> 
        <Route path="/setting" element={<Setting />} /> 
        <Route path="/admin/users" element={<ManageUser />} /> 
        <Route path="/admin/orders" element={<ManageOrder />} /> 
        <Route path="/admin/settings" element={<Adminsetting />} /> 
        <Route path="/admin/report" element={<AdminReports />} /> 
        <Route path="/admin/delistproduct/view/:id" element={<ViewDelistedProduct />} /> 
     
       
       
      </Routes>
    </Router>
  );
}

export default App;


