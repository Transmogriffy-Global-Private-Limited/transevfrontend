import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import useCase1 from '../assets/apartmnet.jpg'; 
import useCase2 from '../assets/holiday.jpg'; 
import useCase3 from '../assets/hotels.jpg'; 
import useCase4 from '../assets/workplace.jpg'; 
import logo from '../assets/transev logo.png'; // Assuming you have a logo image

function SolutionsPage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null); // Track which image is hovered
  const [hoveredCircle, setHoveredCircle] = useState(null); // Track hover state of the yellow circle

  // Captions for the use cases
  const solutionCaptions = [
    "Apartment Buildings",
    "Holiday Parks",
    "Hotels",
    "Workplace"
  ];

  // Define the links for each image to navigate to based on their captions
  const caseLinks = {
    "Apartment Buildings": "/solutions/apartment-buildings",
    "Holiday Parks": "/solutions/holiday-parks",
    "Hotels": "/solutions/hotels",
    "Workplace": "/solutions/workplace",
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleImageClick = (link) => {
    navigate(link);
  };

  return (
    <>
    
      {/* Navbar Component */}
      <Navbar />
      <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div> 

      {/* Main Content Section */}
      <section className="text-center mt-[100px] px-[50px]">
        {/* Charging Solutions Title */}
        <h1 className="text-[150px] font-aeonik mt-[130px] mr-[400px]">Charging Solutions</h1>

        {/* Pick Your Use Case Section */}
        <h2 className="text-[20px] font-semibold mt-[250px] mr-[1500px]">Pick Your Use Case</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[30px] justify-center">
          {/* First row with larger images */}
          {[useCase1, useCase2].map((image, index) => (
            <div key={index} className="relative flex flex-col items-center mx-auto mt-[50px] group">
              <img
                src={image}
                alt={`Use Case ${index + 1}`}
                className="w-[900px] h-[600px] rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
                onClick={() => handleImageClick(caseLinks[solutionCaptions[index]])} // Clicking image navigates to a page based on caption
                onMouseEnter={() => setHovered(index)} // Hover effect
                onMouseLeave={() => setHovered(null)} // Reset hover state
              />
              <span className="mt-[10px] text-3xl font-semibold">{solutionCaptions[index]}</span>

              {/* Hovered Right Arrow Icon (Yellow Circle) */}
              <div
                className={`absolute bottom-20 right-10 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-300 w-12 h-12 rounded-full flex justify-center items-center transition-opacity duration-300 ${
                  hovered === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                onClick={() => handleImageClick(caseLinks[solutionCaptions[index]])} // Clicking the circle navigates to a page based on caption
                onMouseEnter={() => setHoveredCircle(index)} // Handle hover on circle
                onMouseLeave={() => setHoveredCircle(null)} // Reset hover state
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-black transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Second row with smaller images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[30px] justify-center mt-[50px]">
          {[useCase3, useCase4].map((image, index) => (
            <div key={index + 2} className="relative flex flex-col items-center mx-auto mt-[50px] group">
              <img
                src={image}
                alt={`Use Case ${index + 3}`}
                className="w-[900px] h-[600px] rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
                onClick={() => handleImageClick(caseLinks[solutionCaptions[index + 2]])} // Clicking image navigates to a page based on caption
                onMouseEnter={() => setHovered(index + 2)} // Hover effect
                onMouseLeave={() => setHovered(null)} // Reset hover state
              />
              <span className="mt-[10px] text-3xl font-semibold">{solutionCaptions[index + 2]}</span>

              {/* Hovered Right Arrow Icon (Yellow Circle) */}
              <div
                className={`absolute bottom-20 right-10 transform translate-x-1/2 translate-y-1/2 bg-yellow-300 w-12 h-12 rounded-full flex justify-center items-center transition-opacity duration-300 ${
                  hovered === index + 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                onClick={() => handleImageClick(caseLinks[solutionCaptions[index + 2]])} // Clicking the circle navigates to a page based on caption
                onMouseEnter={() => setHoveredCircle(index + 2)} // Handle hover on circle
                onMouseLeave={() => setHoveredCircle(null)} // Reset hover state
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-black transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white-50 py-16 mt-10">
          <div className="container mx-auto flex justify-between items-center px-8">
            {/* Left Side: Logo */}
            <div className="flex items-center space-x-4">
              <img src={logo} alt="Company Logo" className="w-32 h-32" />
            </div>

            {/* Right Side: Phone number and email */}
            <div className="text-right">
              {/* Phone number with hover underline animation */}
              <div className="text-5xl font-semibold text-gray-800 mb-4 mr-80">
                <a
                  href="tel:+02033453310"
                  className="relative inline-block hover:text-black-500"
                >
                  <span className="hover:underline transition-all duration-300">033-4601 5366</span>
                </a>
              </div>

              {/* Email with hover underline animation */}
              <div className="text-5xl font-semibold text-gray-800">
                <a
                  href="mailto:enquiries@energy-park.co.uk"
                  className="relative inline-block hover:text-black-500"
                >
                  <span className="hover:underline transition-all duration-300 mt-2 mr-60">tgwbin@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Underline Section */}
          <div className="mt-10 border-t-2 border-gray-300 mx-8"></div>

          {/* Footer Section */}
          <footer className="bg-white-800 text-black py-8 mt-20">
            <div className="container mx-auto flex justify-between">
              <div className="w-1/3">
                <h4 className="text-xl font-semibold mb-4 mr-20">
                  Experts in smart EV charging solutions <br/>for residential sites and businesses.
                </h4>

                {/* Client Portal Button */}
                <a
                  href="/client-portal"
                  className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105 mr-40 mt-10"
                >
                  <span>Client portal</span>
                  {/* Right Arrow Circle */}
                  <div className="ml-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-10 group-hover:h-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Flex container for Navigation, Follow us, and Legal sections */}
              <div className="w-2/3 flex justify-between space-x-12 mt-10">
                {/* Navigation Section */}
                <div>
                  <h5 className="text-lg font-semibold text-color-black mb-5">Navigation</h5>
                  <ul className="space-y-2">
                    <li><a href="/solutions" className="text-gray hover:underline text-lg">Solutions</a></li>
                    <li><a href="/contact" className="text-gray hover:underline text-lg">Contact</a></li>
                    <li><a href="/careers" className="text-gray hover:underline text-lg">Careers</a></li>
                    <li><a href="/residents" className="text-gray hover:underline text-lg">Residents</a></li>
                  </ul>
                </div>

                {/* Follow Us Section */}
                <div>
                  <h5 className="text-lg font-semibold mb-5">Follow us</h5>
                  <ul className="space-y-2">
                    <li><a href="/linkedin" className="text-gray hover:underline text-lg">LinkedIn</a></li>
                    <li><a href="/instagram" className="text-gray hover:underline text-lg">Instagram</a></li>
                    <li><a href="/facebook" className="text-gray hover:underline text-lg">Facebook</a></li>
                  </ul>
                </div>

                {/* Legal Section */}
                <div>
                  <h5 className="text-lg font-semibold mb-5">Legal</h5>
                  <ul className="space-y-2">
                    <li><a href="/terms-conditions" className="text-gray hover:underline text-lg">Terms & Conditions</a></li>
                    <li><a href="/privacy-policy" className="text-gray hover:underline text-lg">Privacy Policy</a></li>
                    <li><a href="/modern-slavery-policy" className="text-gray hover:underline text-lg">Modern Slavery Policy</a></li>
                    <li><a href="/esg-policy" className="text-gray hover:underline text-lg">ESG Policy</a></li>
                    <li><a href="/sustainability-policy" className="text-gray hover:underline text-lg">Sustainability Policy</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="text mt-8 text-lg mr-300">
              <p>&copy; TransEv 2025. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}

export default SolutionsPage;
