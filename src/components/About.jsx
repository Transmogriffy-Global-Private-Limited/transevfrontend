// src/pages/AboutPage.js
import React from 'react';
import Navbar from '../components/Navbar';

function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-amber-300 text-3xl">About Us</h1>
        <p className="mt-4 text-white">
          This is the About Us page. You can add information about your company or team here.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
