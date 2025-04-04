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
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPasswordPage from './components/ForgetPassword';
import UserProfile from './components/User_Profile';
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
      </Routes>
    </Router>
  );
}

export default App;

