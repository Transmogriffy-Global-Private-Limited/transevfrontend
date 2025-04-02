import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar component
import about1 from '../assets/aboutbg.jpg'; // Replace with actual image paths
import about2 from '../assets/slide1.jpg';
import logo from '../assets/transev logo.png';
import { FaArrowDown } from 'react-icons/fa';
import holiday from '../assets/holiday.jpg';
import hero from '../assets/heroabout.jpg';
function AboutUs() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // Get the button element by id
    const button = document.getElementById('contact-btn');
    
    // Add background color change on button click
    button.classList.add('bg-yellow-500'); // Add a background color

    // After a small delay (for animation), navigate to the contact page
    setTimeout(() => {
      navigate('/contact');  // Navigate to the Contact page
    }, 500); // Delay to allow animation to complete
  };
  return (
   <>
      {/* Include Navbar here */}
      <Navbar />
      <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div> 
      <section className="text-center mt-[100px] px-[50px]">
        {/* Charging Solutions Title */}
        <h1 
  className="text-[150px] font-aeonik mt-[160px] mr-[600px] leading-tight" 
 
>
  <span className="inline-block">Facilitating fairer,</span><br />
  <span className="inline-block mr-17">more accessible</span><br />
  <span className="inline-block mr-82">EV charging</span>
</h1>
<h4 
  className="text-[40px] font-aeonik mt-[100px] mr-[1300px] leading-tight" 

>
  <span className="inline-block mr-4">Setting the standard for</span><br />
  <span className="inline-block">EV charging in residential</span><br />
  <span className="inline-block mr-70"> locations.</span>
</h4>

{/* Down Arrow */}
<div className="text-right mt-8">
<span className="text-[20px] ">Explore</span>
  <FaArrowDown className="text-[20px] text-gray-800 animate-bounce ml-448 mt-[-15px] " />
</div>
<section className="relative h-screen mt-10">
  <div className="absolute inset-0 p-0">
    <img 
      src={about1}  // Using the imported image
      alt="Full Screen Background" 
      className="object-cover rounded-lg"
      style={{ width: '200%', height: '100%' }} // Make image width larger and set height to 100%
    />
  </div>
</section>

<section className="flex items-center justify-between py-20 px-10 mt-30">
  {/* Left Side - Text */}
  <div className="w-1/2 text-left">
    <h2 className="text-7xl font-aeonik text-gray-800 mb-90">
      <span>We want to make EV</span><br />
      <span>ownership an option</span><br />
      <span>for everyone.</span>
    </h2>
    <p className="text-xl mb-20 text-gray-500">
  At TransEv, we believe EV ownership should be an option for<br/> everyone, regardless of where you live.
</p>
<p className="text-xl mb-20 text-gray-500">
  But today, due to the challenges of getting EV charging infrastructure<br/> into communal car parks, residents of apartment buildings often have<br/> no access to EV charging facilities at home, or they’re paying higher<br/> public charging rates.
</p>
<p className="text-xl mb-20 text-gray-500">
  So, we’re on a mission to change things by rolling out our funded EV <br/> charging solutions in the communal car parks of apartment buildings <br/> across the UK.
</p>
<p className="text-xl mb-20 text-gray-500">
  And if you own an EV, we think you should also have access to reliable <br/> EV charging facilities when you’re staying away from home, so we also <br/> want to improve charge point access at holiday parks and hotels.
</p>

  </div>

  {/* Right Side - Image */}
  <div className="w-1/2 ml-10">
  <img
  src={hero} // Use the image you want
  alt="EV Ownership"
  className="w-full object-cover rounded-2xl" // Set width to 100% and maintain aspect ratio
  style={{ height: '1200px', padding: '20px', marginRight: '20px' }} // Fixed height with padding and right margin
/>






  </div>
</section>
<section className="flex flex-col lg:flex-row items-center justify-between py-20 px-10 mt-30">
  {/* Left Side - Image */}
  <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
    <img
      src={holiday} // Use the image you want
      alt="Best EV Charging Solutions"
      className="w-full h-[600px] lg:h-[1200px] object-cover rounded-2xl" // Adjust image height for smaller screens
      style={{ padding: '20px' }} // Image padding
    />
  </div>

  {/* Right Side - Text */}
  <div className="w-full lg:w-1/2 text-center ml-10"> {/* Center-align text for larger screens */}
    {/* Main Heading */}
    <h2 className="text-4xl lg:text-7xl font-semibold text-gray-700 mb-40 text-center"> {/* Center-align the whole heading */}
  We'll help you find the <br /> best solution for your{' '}
  <span className="text-left inline-block mr-140">site.</span> {/* Align 'site' to the left */}
</h2>


    {/* Subheading */}
    {/* Underlined Heading with Always Visible Underline and Redirection */}
    <Link to="/your-target-page">
      <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-40 group cursor-pointer inline-block">
        How we do it
        <span className="block h-[2px] bg-gray-800 mt-2 w-full"></span> {/* Always visible underline */}
      </h4>
    </Link>
   
   <p className="text-xl text-gray-500 mb-6">
  <span className="font-medium text-gray-500">For  <span className="font-medium text-black"> residential landlords</span>, we remove many of the financial and</span> <br />
  <span className="font-medium text-gray-500 ml-5">operational barriers to large-scale EV infrastructure investment by</span> <br />
  <span className="font-medium text-gray-500 ml-18">offering a fully funded, maintained, and managed EV charging solution.</span>
</p>

{/* Paragraph 2 */}
<p className="text-xl text-gray-700 mb-6">
  <span className="font-medium text-gray-500 ">Our funded solutions are financed by the Charging Infrastructure</span> <br />
  <span className="font-medium text-gray-500 ml-5">Investment Fund (CIIF), which is sponsored by the UK Government.</span>
</p>

{/* Paragraph 3 */}
<p className="text-xl text-gray-700 ml-4">
  <span className="font-medium text-gray-500 ml-2">For <span className="font-medium text-black"> destination operators</span>, we offer smart EV charging solutions that</span> <br />
  <span className="font-medium text-gray-500 ml-5">meet the growing demand for reliable EV charging facilities at hotels</span> <br />
  <span className="font-medium text-gray-500 mr-110">and holiday parks.</span>
</p>


  </div>
</section>
<section className="py-20 px-10 bg-gradient-to-r from-blue-100 via-blue-50 to-white">

<h2 className="text-4xl font-semibold text-gray-800 text-center mb-12">Our Projects</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

  {/* Project 1: HRMS */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://hrms-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="HRMS">👨‍💼</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">HRMS Website</h3>
      <p className="text-gray-500 mt-2">Human Resource Management System</p>
    </a>
  </div>

  {/* Project 2: Education Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://education-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Education">🎓</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Education Website</h3>
      <p className="text-gray-500 mt-2">Online Learning Platform</p>
    </a>
  </div>

  {/* Project 3: Medical Care Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://medical-care-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Medical Care">🩺</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Medical Care Website</h3>
      <p className="text-gray-500 mt-2">Health Services and Resources</p>
    </a>
  </div>

  {/* Project 4: Job Application Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://job-application-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Job Application">💼</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Job Application Website</h3>
      <p className="text-gray-500 mt-2">Job Listings and Applications</p>
    </a>
  </div>

  {/* Project 5: CMS Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://cms-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="CMS">📄</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">CMS Website</h3>
      <p className="text-gray-500 mt-2">Content Management System</p>
    </a>
  </div>

  {/* Project 6: E-commerce Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://ecommerce-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="E-commerce">🛒</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">E-commerce Website</h3>
      <p className="text-gray-500 mt-2">Online Store Platform</p>
    </a>
  </div>

  {/* Project 7: Parking Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://parking-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Parking">🚗</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Parking Website</h3>
      <p className="text-gray-500 mt-2">Parking Space Management</p>
    </a>
  </div>

  {/* Project 8: Food Application Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://food-application-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Food Application">🍔</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Food Application Website</h3>
      <p className="text-gray-500 mt-2">Food Delivery & Ordering</p>
    </a>
  </div>

  {/* Project 9: CRM Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <a href="https://crm-website.com" target="_blank" rel="noopener noreferrer" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="CRM">📊</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">CRM Website</h3>
      <p className="text-gray-500 mt-2">Customer Relationship Management System</p>
    </a>
  </div>

</div>
</section>

<div className="w-full h-[105vh] bg-white flex justify-center items-center mt-30">
  <div className="w-full h-full max-w-screen-3xl bg-gradient-to-r p-10"> 
    <div className="w-full h-full bg-gradient-to-b from-yellow-200 via-yellow-200 to-red-300 rounded-3xl p-12 shadow-lg max-w-screen-3xl mx-auto">
      {/* Your content here */}
      <h2 className="text-9xl font-semibold text-gray-800 text-center font-aeonik mr-200">
        <span className="block">Ready to get</span>
        <span className="block mr-60">started?</span>
      </h2>
   

      <div className="flex items-center justify-center">
        <button
          id="contact-btn"
          onClick={handleButtonClick}
          className="flex items-center justify-center px-10 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white w-auto h-auto mr-300 mt-20"
        >
          <span className="mr-20 text-lg" >Contact Us</span>
  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white ml-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-white transition-transform duration-300 group-hover:text-black group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </div>
</button>
      </div>
      <div className="mt-55">
        <h3 className="text-2xl font-bold text-left text-gray-800">
          EV Charging Solutions for Residential Sites and Businesses
        </h3>

        <div className="mt-10 mr-260">
          <p className="text-lg text-gray-600 leading-relaxed">
            We’ll listen to your needs, identify the best approach,and then create a 
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mr-30">
          bespoke smart EV charging solution that’s right for you.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="bg-white-50 py-16 mt-10">
        <div className="container mx-auto flex justify-between items-center px-8">
          {/* Left Side: Logo */}
          <div className="flex items-center space-x-4">
             <img src={logo} alt="Company Logo" className="w-32 h-32" />
          </div>

          {/* Right Side: Phone number and email */}
          <div className="text-right">
            {/* Phone number with hover underline animation */}
            <div className="text-5xl font-semibold text-gray-800 mb-4">
              <a
                href="tel:+02033453310"
                className="relative inline-block hover:text-black-500"
              >
                <span className="hover:underline transition-all duration-300 mr-50">033-4601 5366</span>
              </a>
            </div>

            {/* Email with hover underline animation */}
            <div className="text-5xl font-semibold text-gray-800">
              <a
                href="mailto:enquiries@energy-park.co.uk"
                className="relative inline-block hover:text-black-500"
              >
                <span className="hover:underline transition-all duration-300 mr-30">tgwbin@gmail.com</span>
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
              <h4 className="text-xl font-semibold mb-4 mr-40">
                Experts in smart EV charging solutions <br/>for residential sites and businesses.
              </h4>

              {/* Client Portal Button */}
              <a
                href="/client-portal"
                className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105 mr-70 mt-10"
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
                <h5 className="text-lg font-semibold text-gray-800 mb-5">Navigation</h5>
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
                <h5 className="text-lg font-semibold mb-5 ">Legal</h5>
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

export default AboutUs;

