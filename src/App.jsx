// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import AboutPage from './components/About';
import NewsPage from './components/News';
import Solution from './components/Solution';
import Contact  from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
