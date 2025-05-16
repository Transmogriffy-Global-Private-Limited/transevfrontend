// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import slide1 from '../assets/slide2.jpg';
// import slide2 from '../assets/ev_charger.jpg';
// import slide3 from '../assets/slide1.jpg';
// import slide4 from '../assets/slide5.jpg';
// import about1 from '../assets/slide4.jpg';
// import about2 from '../assets/slide1.jpg';
// import logos from '../assets/up.png';

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [popupType, setPopupType] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [contactHovered, setContactHovered] = useState(false);
//   const [contactClicked, setContactClicked] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleContactClick = () => {
//     setContactClicked(true);
//     setTimeout(() => navigate('/contact'), 500);
//   };

//   const solutionCaptions = ['Home and Housing Societies', 'Office and Workplace', 'Public Places', 'Fleet Organization'];
//   const aboutCaptions = ['Who we are', 'How we work'];

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 100);  // Check for scroll
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (location.pathname.includes('solution')) setPopupType('solutions');
//     else if (location.pathname.includes('about')) setPopupType('about');
//     else setPopupType(null);
//   }, [location]);

//   const isHomePage = location.pathname === '/';

//   const handleImageClick = (caption) => {
//     const formattedCaption = caption.toLowerCase().replace(/\s+/g, '-');
//     if (popupType === 'solutions') navigate(`/solutions/${formattedCaption}`);
//     else if (caption === 'Who we are') navigate('/about');
//     else if (caption === 'How we work') navigate('/how-we-work');
//   };

//   return (
//     <nav
//       className={`top-0 left-0 w-full transition-all duration-300 z-10 ${isScrolled || !isHomePage || popupType ? 'bg-white text-black' : 'bg-transparent text-white'} ${
//         isScrolled ? 'fixed' : 'absolute'
//       }`}
//       onMouseLeave={() => setPopupType(null)}
//     >
//       {/* Top Section */}
//       <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-10 py-4 md:py-6 w-full">
//         <Link to="/">
//           <img src={logos} alt="Logo" className="w-20 sm:w-24 md:w-28 lg:w-32" />
//         </Link>

//         {/* Hamburger Menu Toggle */}
//         <div className="md:hidden flex items-center">
//           <button
//             className="text-black focus:outline-none"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-8 h-8"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Main Menu */}
//         <div className="hidden md:flex w-full md:w-auto justify-start md:justify-start">
//           <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 font-semibold text-sm sm:text-base md:text-xl ">
//             <div onMouseEnter={() => setPopupType('solutions')}>
//               <Link
//                 to="/solution"
//                 className={`hover:underline ${popupType === 'solutions' ? 'underline' : ''} transition duration-300`}
//               >
//                 Solutions
//               </Link>
//             </div>

//             <div onMouseEnter={() => setPopupType('about')}>
//               <Link
//                 to="/about"
//                 className={`hover:underline ${popupType === 'about' ? 'underline' : ''} transition duration-300`}
//               >
//                 About Us
//               </Link>
//             </div>

//             <div onMouseEnter={() => setPopupType(null)}>
//               <Link to="/news" className="hover:underline">
//                 News
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Contact & Login */}
//         <div className="flex gap-4 items-center mt-4 md:mt-0">
//           <Link to="/login" className="hover:underline font-medium text-base">
//             Login
//           </Link>
//           <button
//             onClick={handleContactClick}
//             onMouseEnter={() => setContactHovered(true)}
//             onMouseLeave={() => setContactHovered(false)}
//             className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
//           >
//             Contact
//             {(contactHovered || contactClicked) && (
//               <div className="ml-2 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center transition-all">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 sm:w-6 h-4 sm:h-6 text-black"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </div>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Popup Images Section */}
//       {popupType && (
//         <div className="w-full px-4 md:px-10 pb-6">
//           <div className="border-t border-gray-300 py-4">
//             <h2 className="text-lg font-semibold">
//               {popupType === 'solutions' ? 'Solutions' : 'About Us'}
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {(popupType === 'solutions' ? [slide1, slide2, slide3, slide4] : [about1, about2]).map((img, i) => (
//               <div
//                 key={i}
//                 className="relative group cursor-pointer"
//                 onClick={() =>
//                   handleImageClick(popupType === 'solutions' ? solutionCaptions[i] : aboutCaptions[i])
//                 }
//               >
//                 <img
//                   src={img}
//                   alt="popup item"
//                   className="w-full h-[220px] sm:h-[280px] md:h-[300px] object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
//                 />
//                 <span className="block mt-2 text-sm sm:text-base font-medium text-center">
//                   {popupType === 'solutions' ? solutionCaptions[i] : aboutCaptions[i]}
//                 </span>
//                 <div className="absolute top-0 left-0 w-full h-full bg-opacity-0 group-hover:bg-opacity-10 transition">
//                   <div className="absolute bottom-10 right-4 bg-yellow-300 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5 text-black"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu (Hamburger) */}
//       <div
//   className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white text-black px-4 py-6 absolute top-0 left-0 w-full min-h-[20vh] z-20`}
// >
//   {/* Close Button */}
//   <div className="flex justify-end">
//     <button
//       onClick={() => setIsMenuOpen(false)}
//       className="text-black text-3xl font-bold focus:outline-none"
//     >
//       &times;
//     </button>
//   </div>

//   {/* Menu Items in one row */}
//   <div
//   className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white text-black px-4 py-6 absolute top-0 left-0 w-full min-h-[20vh] z-20`}
// >
//   {/* Close Button */}
//   <div className="flex justify-end">
//     <button
//       onClick={() => setIsMenuOpen(false)}
//       className="text-black text-3xl font-bold focus:outline-none"
//     >
//       &times;
//     </button>
//   </div>

//   {/* Menu Items in one row */}
//   <div className="flex flex-wrap items-center gap-6 text-base font-semibold mt-6 justify-center">
//     <div onClick={() => setPopupType('solutions')}>
//       <Link to="/solution" className="hover:underline">
//         Solutions
//       </Link>
//     </div>
//     <div onClick={() => setPopupType('about')}>
//       <Link to="/about" className="hover:underline">
//         About Us
//       </Link>
//     </div>
//     <div onClick={() => setPopupType(null)}>
//       <Link to="/news" className="hover:underline">
//         News
//       </Link>
//     </div>
//     <Link
//       to="/login"
//       onClick={() => setIsMenuOpen(false)}
//       className="hover:underline text-base"
//     >
//       Login
//     </Link>
//     <button
//       onClick={() => {
//         setIsMenuOpen(false);
//         handleContactClick();
//       }}
//       className="flex items-center px-3 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition text-sm"
//     >
//       Contact
//     </button>
//   </div>
// </div>
// </div>

//     </nav>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import slide1 from '../assets/slide2.jpg';
import slide2 from '../assets/ev_charger.jpg';
import slide3 from '../assets/slide1.jpg';
import slide4 from '../assets/slide5.jpg';
import about1 from '../assets/slide4.jpg';
import about2 from '../assets/slide1.jpg';
import logos from '../assets/up.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [popupType, setPopupType] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobilePopupType, setMobilePopupType] = useState(null);

  const solutionCaptions = ['Home and Housing Societies', 'Office and Workplace', 'Public Places', 'Fleet Organization'];
  const aboutCaptions = ['Who we are', 'How we work'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);  // Check for scroll
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname.includes('solution')) setPopupType('solutions');
    else if (location.pathname.includes('about')) setPopupType('about');
    else setPopupType(null);
  }, [location]);

  const isHomePage = location.pathname === '/';

  const handleImageClick = (caption) => {
    const formattedCaption = caption.toLowerCase().replace(/\s+/g, '-');
    if (popupType === 'solutions') navigate(`/solutions/${formattedCaption}`);
    else if (caption === 'Who we are') navigate('/about');
    else if (caption === 'How we work') navigate('/how-we-work');
  };

  // Function to handle mobile popup click and navigation
  const handleMobilePopupClick = (section, caption) => {
    const formattedCaption = caption.toLowerCase().replace(/\s+/g, '-');
    setMobilePopupType(null); // Close popup after selecting item
    if (section === 'solutions') {
      navigate(`/solutions/${formattedCaption}`);
    } else if (section === 'about') {
      if (caption === 'Who we are') {
        navigate('/about');
      } else if (caption === 'How we work') {
        navigate('/how-we-work');
      }
    }
  };

  const handleContactClick = () => {
    setContactClicked(true);
    setTimeout(() => navigate('/contact'), 500);
  };

  return (
    <nav
      className={`top-0 left-0 w-full transition-all duration-300 z-10 ${isScrolled || !isHomePage || popupType ? 'bg-white text-black' : 'bg-transparent text-white'} ${
        isScrolled ? 'fixed' : 'absolute'
      }`}
      onMouseLeave={() => setPopupType(null)}
    >
      {/* Top Section */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-10 py-4 md:py-6 w-full">
        <Link to="/">
          <img src={logos} alt="Logo" className="w-20 sm:w-24 md:w-28 lg:w-32" />
        </Link>

        {/* Hamburger Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            className="text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Main Menu */}
        <div className="hidden md:flex w-full md:w-auto justify-start md:justify-start">
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 font-semibold text-sm sm:text-base md:text-xl ">
            <div onMouseEnter={() => setPopupType('solutions')}>
              <Link
                to="/solution"
                className={`hover:underline ${popupType === 'solutions' ? 'underline' : ''} transition duration-300`}
              >
                Solutions
              </Link>
            </div>

            <div onMouseEnter={() => setPopupType('about')}>
              <Link
                to="/about"
                className={`hover:underline ${popupType === 'about' ? 'underline' : ''} transition duration-300`}
              >
                About Us
              </Link>
            </div>
<div onMouseEnter={() => setPopupType(null)}>
              <Link to="/industrialsupport" className="hover:underline">
              Industrial Support
              </Link>
            </div>
            <div onMouseEnter={() => setPopupType(null)}>
              <Link to="/news" className="hover:underline">
                News
              </Link>
            </div>
          </div>
        </div>

        {/* Contact & Login */}
        <div className="flex gap-4 items-center mt-4 md:mt-0">
          <Link to="/login" className="hover:underline font-medium text-base">
            Login
          </Link>
          <button
            onClick={handleContactClick}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Contact
            {(contactHovered || contactClicked) && (
              <div className="ml-2 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 sm:w-6 h-4 sm:h-6 text-black"
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
  {/* Popup Images Section */}
         {/* {popupType && (
        <div className="w-full px-4 md:px-10 pb-6">
          <div className="border-t border-gray-300 py-4">
            <h2 className="text-lg font-semibold">
              {popupType === 'solutions' ? 'Solutions' : 'About Us'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {(popupType === 'solutions' ? [slide1, slide2, slide3, slide4] : [about1, about2]).map((img, i) => (
              <div
                key={i}
                className="relative group cursor-pointer"
                onClick={() =>
                  handleImageClick(popupType === 'solutions' ? solutionCaptions[i] : aboutCaptions[i])
                }
              >
                <img
                  src={img}
                  alt="popup item"
                  className="w-full h-[220px] sm:h-[280px] md:h-[300px] object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
                />
                <span className="block mt-2 text-sm sm:text-base font-medium text-center">
                  {popupType === 'solutions' ? solutionCaptions[i] : aboutCaptions[i]}
                </span>
                <div className="absolute top-0 left-0 w-full h-full bg-opacity-0 group-hover:bg-opacity-10 transition">
                  <div className="absolute bottom-10 right-4 bg-yellow-300 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-black"
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
        </div>
      )} */}
      {popupType && (
  <div className="w-full px-4 md:px-10 pb-6 hidden md:block"> {/* Hidden on mobile, shown on medium screens and above */}
    <div className="border-t border-gray-300 py-4">
      <h2 className="text-lg font-semibold">
        {popupType === 'solutions' ? 'Solutions' : 'About Us'}
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {(popupType === 'solutions' ? [slide1, slide2, slide3, slide4] : [about1, about2]).map((img, i) => (
        <div
          key={i}
          className="relative group cursor-pointer"
          onClick={() =>
            handleImageClick(popupType === 'solutions' ? solutionCaptions[i] : aboutCaptions[i])
          }
        >
          <img
            src={img}
            alt="popup item"
            className="w-full h-[220px] sm:h-[280px] md:h-[300px] object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
          />
          <span className="block mt-2 text-sm sm:text-base font-medium text-center">
            {popupType === 'solutions' ? solutionCaptions[i] : aboutCaptions[i]}
          </span>
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-0 group-hover:bg-opacity-10 transition">
            <div className="absolute bottom-10 right-4 bg-yellow-300 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-black"
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
  </div>
)}

      {/* Mobile Menu (Hamburger) */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white text-black px-4 py-6 absolute top-0 left-0 w-full min-h-[20vh] z-20`}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-black text-3xl font-bold focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-wrap items-center gap-6 text-base font-semibold mt-6 justify-center">
          <div
            onClick={() => setMobilePopupType('solutions')}
            className="cursor-pointer hover:underline"
          >
            Solutions
          </div>
          <div
            onClick={() => setMobilePopupType('about')}
            className="cursor-pointer hover:underline"
          >
            About Us
          </div>
          <Link to="/news" className="hover:underline">
            News
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="hover:underline text-base"
          >
            Login
          </Link>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleContactClick();
            }}
            className="flex items-center px-3 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition text-sm"
          >
            Contact
          </button>
        </div>

        {/* Mobile Popup for Solutions & About */}
        {mobilePopupType && (
          <div className="w-full px-4 py-4 mt-4 bg-white">
            <h3 className="text-lg font-semibold text-center">{mobilePopupType === 'solutions' ? 'Solutions' : 'About Us'}</h3>
            <div className="grid grid-cols-2 gap-4">
              {(mobilePopupType === 'solutions' ? solutionCaptions : aboutCaptions).map((caption, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleMobilePopupClick(mobilePopupType, caption)}
                >
                  <span className="text-center text-sm">{caption}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
