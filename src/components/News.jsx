// src/pages/NewsPage.js
import React from 'react';
import Navbar from '../components/Navbar';

function NewsPage() {
  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-amber-300 text-3xl">News</h1>
        <p className="mt-4 text-white">
          This is the News page. You can add the latest news and updates here.
        </p>
      </div>
    </div>
  );
}

export default NewsPage;
