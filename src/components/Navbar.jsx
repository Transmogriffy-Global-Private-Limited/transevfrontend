import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/transev logo.png'; // Logo import
import slide1 from '../assets/slide2.jpg'; // Replace with actual image paths
import slide2 from '../assets/ev_charger.jpg';
import slide3 from '../assets/slide1.jpg';
import slide4 from '../assets/slide5.jpg';
import about1 from '../assets/slide4.jpg';
import about2 from '../assets/slide1.jpg';
import logos from '../assets/up.png';
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [popupType, setPopupType] = useState(null); // Tracks whether "Solutions" or "About Us" is hovered
  const [isScrolled, setIsScrolled] = useState(false); // Track if the page is scrolled
  const [contactHovered, setContactHovered] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);

  // Handle navigation and animations
  const handleContactClick = () => {
    setContactClicked(true); // Show the arrow animation on contact click
    setTimeout(() => {
      navigate('/contact'); // Redirect to contact page after animation
    }, 500); // Wait for animation before redirect
  };

  // Captions for Solutions and About Us
  const solutionCaptions = [
    'Apartment Buildings',
    'Holiday Parks',
    'Hotels',
    'Workplace',
  ];

  const aboutCaptions = ['Who we are', 'How we work'];

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Detect if we're on the "solution" or "about" page to trigger the popup
  useEffect(() => {
    if (location.pathname.includes('solution')) {
      setPopupType('solutions');
    } else if (location.pathname.includes('about')) {
      setPopupType('about');
    } else {
      setPopupType(null);
    }
  }, [location]);

  // Check if we are on the home page
  const isHomePage = location.pathname === '/';

  // Handle Image Click for Solutions and About Us
  const handleImageClick = (caption) => {
    const formattedCaption = caption.toLowerCase().replace(/\s+/g, '-'); // Convert to lowercase and replace spaces with hyphens
    if (popupType === 'solutions') {
      navigate(`/solutions/${formattedCaption}`);
    } else if (popupType === 'about') {
      if (caption === 'Who we are') {
        navigate(`/about`);
      } else if (caption === 'How we work') {
        navigate(`/how-we-work`);
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`absolute top-0 left-0 w-full transition-all duration-300 ${
          isHomePage && !popupType
            ? 'bg-transparent text-white'
            : 'bg-white text-black'
        } flex flex-col items-center justify-start z-10 ${
          isScrolled ? 'fixed' : 'absolute'
        }`}
        style={{ position: isScrolled ? 'sticky' : 'absolute' }}
        onMouseLeave={() => setPopupType(null)} // Close popup when mouse leaves navbar
      >
        {/* Top Section of Navbar */}
        <div className="flex items-center justify-between w-full px-10 py-6">
          {/* Company Logo */}
          <div className="flex items-center mr-8">
            <Link to="/">
              <img src={logos} alt="Company Logo" className="w-32 h-32" />
            </Link>
          </div>
          {/* Navbar Links */}
          <div className="flex space-x-12 text-xl font-bold ml-40">
            <div onMouseEnter={() => setPopupType('solutions')} className="relative">
              <Link
                to="/solution"
                className={`transition duration-300 ${popupType === 'solutions' ? 'underline' : ''}`}
              >
                Solutions
              </Link>
            </div>

            <div onMouseEnter={() => setPopupType('about')} className="relative">
              <Link
                to="/about"
                className={`transition duration-300 ${popupType === 'about' ? 'underline' : ''}`}
              >
                About Us
              </Link>
            </div>

            <div onMouseEnter={() => setPopupType(null)} className="relative">
              <Link to="/news" className="hover:underline">
                News
              </Link>
            </div>
          </div>

          {/* Login and Contact Buttons */}
          <div className="flex items-center space-x-12 ml-auto">
            <Link to="/login" className="hover:underline text-lg font-semibold">
              Login
            </Link>
            <button
              onClick={handleContactClick}
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
              className="flex items-center px-8 py-3 bg-black text-white font-semibold rounded-full transition duration-300 hover:bg-gray-800"
            >
              Contact
              {(contactHovered || contactClicked) && (
                <div className="ml-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300">
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
              )}
            </button>
          </div>
        </div>

        {/* Expanded Section with Images */}
        {popupType && (
          <div className="flex flex-wrap justify-center items-center w-full mt-6">
            <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div>
            <div className="border-t border-gray-400 w-full mb-15 transform -translate-y-1">
              <h2 className="text-xl font-bold mt-6 ml-10">{popupType === 'solutions' ? 'Solutions' : 'About Us'}</h2>
            </div>

            {/* Solutions Images */}
            {popupType === 'solutions' &&
              [slide1, slide2, slide3, slide4].map((image, index) => (
                <div key={index} className="relative flex flex-col items-center mx-4 mb-4 group">
                  <img
                    src={image} // Use the imported image directly
                    alt={`Solution ${index + 1}`}
                    className="w-[400px] h-[300px] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                  />
                  <span className="mt-2 font-semibold">{solutionCaptions[index]}</span>
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out"
                    onClick={() => handleImageClick(solutionCaptions[index])} // Navigate to dynamic solution page based on caption
                  >
                    <div className="bg-yellow-300 w-12 h-12 rounded-full flex justify-center items-center ml-60 mt-40">
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
                </div>
              ))}

            {/* About Us Images */}
            {popupType === 'about' &&
              [about1, about2].map((image, index) => (
                <div key={index} className="relative flex flex-col items-center mx-4 mb-4 group">
                  <img
                    src={image} // Use the imported image directly
                    alt={`About ${index + 1}`}
                    className="w-[400px] h-[300px] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                  />
                  <span className="mt-2">{aboutCaptions[index]}</span>
                  {/* Yellow Circle on Hover (centered in the image) */}
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out"
                    onClick={() => handleImageClick(aboutCaptions[index])} // Navigate to dynamic about page based on caption
                  >
                    <div className="bg-yellow-300 w-12 h-12 rounded-full flex justify-center items-center ml-60 mt-40">
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
                </div>
              ))}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
