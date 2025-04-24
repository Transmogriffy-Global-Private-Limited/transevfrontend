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
import mission from '../assets/mission.png';
import vision from '../assets/vission.png';
import value from '../assets/value.png';
import { FaBolt, FaCheckCircle, FaLeaf, FaHandHoldingHeart } from 'react-icons/fa';
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
      <section className="text-center mt-[100px] sm:mt-[80px] md:mt-[100px] lg:mt-[160px] px-6 sm:px-8 md:px-12 lg:px-[50px]">
   
    
<h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-aeonik text-black-800 mt-10 sm:mt-16 lg:mt-20 px-4 sm:px-10 lg:px-32 xl:px-40 text-center lg:text-left ">
 

Facilitating fairer, <br />
 <span className="inline-block">more accessible</span>
 <span className="inline-block">EV charging</span>
</h1>
<h4 
  className="text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px] font-aeonik mt-[40px] sm:mt-[60px] md:mt-[80px] lg:mt-[120px] leading-tight text-center sm:text-left"
>
  <span className="inline-block sm:mr-2 lg:mr-4">Setting the standard for</span><br />
  <span className="inline-block">EV charging in residential</span><br />
  <span className="inline-block sm:mr-2 lg:mr-12">locations.</span>
</h4>




<div className="text-center sm:text-right mt-8 flex items-center justify-center sm:justify-end mb-10">
  <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mr-2">Explore</span>
  <FaArrowDown className="text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] text-gray-800 animate-bounce" />
</div>

 <section
        className="relative rounded-lg bg-cover bg-center 
                   mx-4 sm:mx-6 lg:mx-8 
                   py-16 sm:py-24 lg:py-[120px] 
                   min-h-[300px] sm:min-h-[400px] lg:min-h-[1020px]"
        style={{
          backgroundImage: `url(${holiday})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></section>



<section className="flex flex-col lg:flex-row items-center justify-between py-12 px-6 sm:px-10 lg:px-20 gap-10 mt-10 lg:mt-20">
  {/* Left Side - Text */}
  <div className="w-full lg:w-1/2 text-left">
  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-aeonik text-gray-800 mb-16 sm:mb-20 md:mb-30 lg:mb-70">
  <span>We want to make EV</span><br />
  <span>ownership an option</span><br />
  <span>for everyone.</span>
</h2>


    <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 lg:mb-12">
      At TransEv, we believe EV ownership should be an option for everyone, regardless of where you live.
    </p>
    <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 lg:mb-12">
      But today, due to the challenges of getting EV charging infrastructure into communal car parks, residents of apartment buildings often have no access to EV charging facilities at home, or they’re paying higher public charging rates.
    </p>
    <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 lg:mb-12">
      So, we’re on a mission to change things by rolling out our funded EV charging solutions in the communal car parks of apartment buildings across the UK.
    </p>
    <p className="text-base sm:text-lg md:text-xl text-gray-500 lg:mb-12">
      And if you own an EV, we think you should also have access to reliable EV charging facilities when you’re staying away from home, so we also want to improve charge point access at holiday parks and hotels.
    </p>
  </div>

  {/* Right Side - Image */}
  <div className="w-full lg:w-1/2 flex justify-center items-center">
    <img
      src={hero} // Replace with actual image
      alt="EV Charging"
      className="w-full sm:w-[90%] md:w-[85%] lg:w-full h-auto lg:h-[800px] xl:h-[1000px] object-cover rounded-lg"
    />
  </div>
</section>

  

<section className="flex flex-col lg:flex-row items-center justify-between py-20 px-10 mt-30">
  
  {/* Left Side - Image */}
  <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
    <img
      src={holiday} 
      alt="Best EV Charging Solutions"
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[1200px] object-cover rounded-2xl"  // Adjust image height for different screen sizes
      style={{ padding: '20px' }} 
    />
  </div>

  {/* Right Side - Text */}
  <div className="w-full lg:w-1/2 text-center lg:text-left ml-10">  {/* Center-align text for smaller screens and left-align for large screens */}
   
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-700 mb-10 sm:mb-20 lg:mb-40">
      We'll help you find the <br /> best solution for your{' '}
      <span className="text-left inline-block">site.</span>
    </h2>

    <Link to="/your-target-page">
      <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-10 lg:mb-20 group cursor-pointer inline-block lg:ml-60">
        How we do it
        <span className="block h-[2px] bg-gray-800 mt-2 w-full"></span>
      </h4>
    </Link>
   
    {/* Paragraph 1 */}
    <p className="text-xl text-gray-500 mb-6 sm:mb-8 lg:ml-20">
      <span className="font-medium text-gray-500">For <span className="font-medium text-black">residential landlords</span>, we remove many of the financial and</span> <br />
      <span className="font-medium text-gray-500 ">operational barriers to large-scale EV infrastructure investment by</span> <br />
      <span className="font-medium text-gray-500 ">offering a fully funded, maintained, and managed EV charging solution.</span>
    </p>

    {/* Paragraph 2 */}
    <p className="text-xl text-gray-700 mb-6 sm:mb-8 lg:ml-20">
      <span className="font-medium text-gray-500 ">Our funded solutions are financed by the Charging Infrastructure</span> <br />
      <span className="font-medium text-gray-500 ">Investment Fund (CIIF), which is sponsored by the UK Government.</span>
    </p>

    {/* Paragraph 3 */}
    <p className="text-xl text-gray-700 ml-4 sm:ml-8 lg:ml-20 ">
      <span className="font-medium text-gray-500 ml-2">For <span className="font-medium text-black">destination operators</span>, we offer smart EV charging solutions that</span> <br />
      <span className="font-medium text-gray-500 ">meet the growing demand for reliable EV charging facilities at hotels</span> <br />
      <span className="font-medium text-gray-500 mr-10"> and holiday parks.</span>
    </p>

  </div>
</section>

<section className="py-16 px-4 md:px-16 bg-white">
  {/* Our Mission Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div className="text-left">
      <h2 className="text-3xl font-bold text- mb-4">Our Mission</h2>
      <p className="text-lg text-gray-700">
        Promoting the adoption of green technology and contributing to the growth of society by providing sustainable energy solutions. Also, it aspires to play an instrumental role in reducing pollution in the country by encouraging the use of Electric Vehicles.
      </p>
    </div>
    <div className="flex justify-center">
      <img
        src={mission} // Replace with the path to your image
        alt="Our Mission"
        className="w-full h-auto rounded-lg shadow-lg object-cover"
      />
    </div>
  </div>

  {/* Our Vision Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
    <div className="text-left md:order-2">
      <h2 className="text-3xl font-bold text-black mb-4">Our Vision</h2>
      <p className="text-lg text-gray-700">
        A good time to think beyond proof-of-concept solutions and to make intelligent choices for the next generation of electric drive technologies that give electric vehicles their rightful place in the transportation market.
      </p>
    </div>
    <div className="flex justify-center md:order-1">
      <img
        src={vision} // Replace with the path to your image
        alt="Our Vision"
        className="w-full h-auto rounded-lg shadow-lg object-cover"
      />
    </div>
  </div>

  {/* Our Values Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
    <div className="text-left">
      <h2 className="text-3xl font-bold text-black mb-4">Our Values</h2>
      <ul className="list-disc pl-5 text-lg text-gray-700">
        <li><strong>Innovation:</strong> Driving technology for a greener tomorrow.</li>
        <li><strong>Sustainability:</strong> Empowering eco-friendly energy solutions.</li>
        <li><strong>Accessibility:</strong> Making EV charging hassle-free for all.</li>
        <li><strong>Customer-centric:</strong> Prioritizing user needs and satisfaction.</li>
        <li><strong>Environmental commitment:</strong> Reducing pollution through EV promotion.</li>
      </ul>
    </div>
    <div className="flex justify-center">
      <img
        src={value} // Replace with the path to your image
        alt="Our Values"
        className="w-full h-auto rounded-lg shadow-lg object-cover"
      />
    </div>
  </div>
</section>
<section className="py-16 px-4 md:px-16 bg-white">
      {/* Our Vision and Why People Love Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Our Vision */}
        <div className="text-left">
        <h2 className="text-3xl font-bold text-black mb-4">
  Our vision is to create a <br/><span className="text-green-500">sustainable future</span>.
</h2>

        
        </div>

        {/* Right Side - Why People Love Us */}
        <div className="text-left">
          <h3 className="text-6xl font-bold text-black mb-8">Why People Love Us</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <FaBolt className="text-yellow-500 text-3xl" />
              <span className="text-lg text-gray-700">Fast Charging</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="text-green-500 text-3xl" />
              <span className="text-lg text-gray-700">Reliable</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaLeaf className="text-green-700 text-3xl" />
              <span className="text-lg text-gray-700">Sustainable</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaHandHoldingHeart className="text-pink-500 text-3xl" />
              <span className="text-lg text-gray-700">Convenient</span>
            </div>
          </div>
        </div>
      </div>
    </section>

<section className="py-20 px-10 bg-gradient-to-r from-blue-100 via-blue-50 to-white">

<h2 className="text-4xl font-semibold text-gray-800 text-center mb-12"> We provide solutions for industries</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

  {/* Project 1: HRMS */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/hrms" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="HRMS">👨‍💼</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">HRMS Solutions for Modern Workforces</h3>
      <p className="text-gray-500 mt-2">Human Resource Management System</p>
    </Link>
  </div>

  {/* Project 2: Education Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/education" className="block">
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Education">🎓</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Smart Administrative Platform for Educational Institutions</h3>
      <p className="text-gray-500 mt-2">Online Learning Platform</p>
    </Link>
  </div>

  {/* Project 3: Medical Care Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/health" className="block"> 
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Medical Care">🩺</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">  Elevating Patient Care with Integrated Hospital Management</h3>
      <p className="text-gray-500 mt-2">Health Services and Resources</p>
    </Link>
  </div>

  {/* Project 4: Job Application Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
    <Link to="/job" className="block"> 
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Job Application">💼</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">CareerConnect Platform</h3>
      <p className="text-gray-500 mt-2">Job Listings and Applications</p>
    </Link>
  </div>

  {/* Project 5: CMS Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/charger" className="block"> 
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="CMS">📄</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">PowerFlow Management</h3>
      <p className="text-gray-500 mt-2">Charging Management System</p>
    </Link>
  </div>

  {/* Project 6: E-commerce Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/e-com" className="block"> 
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="E-commerce">🛒</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">E-Shopper</h3>
      <p className="text-gray-500 mt-2">Online Store Platform</p>
    </Link>
  </div>

  {/* Project 7: Parking Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/park" className="block"> 
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Parking">🚗</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">ParkEase</h3>
      <p className="text-gray-500 mt-2">Parking Space Management</p>
    </Link>
  </div>

  {/* Project 8: Food Application Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/food" className="block"> 
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="Food Application">🍔</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Food Application Platform</h3>
      <p className="text-gray-500 mt-2">Food Delivery & Ordering</p>
    </Link>
  </div>

  {/* Project 9: CRM Website */}
  <div className="project-card group text-center bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-2xl hover:bg-blue-50">
  <Link to="/crm" className="block"> 
      <div className="text-6xl mb-4 text-gray-700">
        <span role="img" aria-label="CRM">📊</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">Customer Onboarding</h3>
      <p className="text-gray-500 mt-2">Customer Relationship Management System</p>
    </Link>
  </div>

</div>
</section>

<div className="w-full h-screen bg-white flex justify-center items-center mt-10 sm:mt-20 md:mt-30 lg:mt-40">
                  <div className="w-full h-full max-w-screen-3xl bg-gradient-to-r p-6 sm:p-8 md:p-10 lg:p-12">
                    <div className="w-full h-full bg-gradient-to-b from-yellow-200 via-yellow-200 to-red-300 rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 shadow-lg max-w-screen-3xl mx-auto">
                      {/* Heading */}
                      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold text-gray-800 text-left font-aeonik">
                        <span className="mr-10 sm:mr-20 md:mr-40 lg:inline-block lg:mr-80">Ready to get</span><br />
                        <span className="sm:mr-10 md:mr-20 lg:mr-0 lg:inline-block">Started ?</span>
                      </h2>
          
                      {/* Contact Button */}
                      <div className="flex items-center justify-start mt-10 sm:mt-12 md:mt-14 lg:mt-20">
                        <button
                          id="contact-btn"
                          onClick={handleButtonClick}
                          className="flex items-center justify-center px-8 sm:px-10 md:px-12 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white w-auto h-auto"
                        >
                          <span className="mr-4 sm:mr-6 text-lg">Contact Us</span>
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 sm:w-6 h-5 sm:h-6 text-white transition-transform duration-300 group-hover:text-black group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </button>
                      </div>
          
                      {/* Description */}
                      <div className="mt-20 sm:mt-20 md:mt-30 lg:mt-50 ml-5">
                        <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold text-left text-gray-800">
                          EV Charging Solutions for Residential Sites and Businesses
                        </h3>
                        <div className="mt-4 sm:mt-6 lg:mr-230">
                          <p className="text-lg text-gray-600 leading-relaxed ">
                            We’ll listen to your needs, identify the best approach, and then create a bespoke
                          </p>
                          <p className="text-lg text-gray-600 leading-relaxed lg:mr-60">
                            smart EV charging solution that’s right for you.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  {/* Footer */}
                <div className="bg-white-50 py-16 ml-20">
                  <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-8">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4 mb-6 sm:mb-0">
                      <img src={logo} alt="Company Logo" className="w-32 h-32" />
                    </div>
          
                    {/* Contact Section */}
                    <div className="text-center sm:text-right">
                      <div className="text-3xl sm:text-5xl font-semibold text-gray-800 mb-4">
                        <a
                          href="tel:+02033453310"
                          className="relative inline-block hover:text-black-500"
                        >
                          <span className="hover:underline transition-all duration-300">033-4601 5366</span>
                        </a>
                      </div>
          
                      <div className="text-3xl sm:text-5xl font-semibold text-gray-800">
                        <a
                          href="mailto:enquiries@energy-park.co.uk"
                          className="relative inline-block hover:text-black-500"
                        >
                          <span className="hover:underline transition-all duration-300 mt-2">tgwbin@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
          
                  <div className="mt-10 border-t-2 border-gray-300 mx-8"></div>
                  <footer className="bg-white text-black py-8 mt-20">
                    <div className="container mx-auto flex flex-col sm:flex-row justify-between px-8 lg:mr-80">
                      {/* First Section - Experts and Client Portal */}
                      <div className="w-full sm:w-1/3 mb-8 sm:mb-0 ">
                        <h4 className="text-xl sm:text-xl font-semibold mb-4">
                          Experts in smart EV charging solutions <br />
                          for residential sites and businesses.
                        </h4>
          
                        <a
                          href="/client-portal"
                          className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105"
                        >
                          <span>Client portal</span>
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
          
                      {/* Second Section - Navigation, Social Media, Legal Links */}
                      <div className="w-full sm:w-2/3 flex flex-col sm:flex-row justify-between sm:space-x-12 mt-10 sm:mt-0">
                        {/* Navigation Links */}
                        <div className="mb-8 sm:mb-0">
                          <h5 className="text-lg font-semibold mb-5">Navigation</h5>
                          <ul className="space-y-2">
                            <li><a href="/solutions" className="text-gray hover:underline text-lg">Solutions</a></li>
                            <li><a href="/contact" className="text-gray hover:underline text-lg">Contact</a></li>
                            <li><a href="/careers" className="text-gray hover:underline text-lg">Careers</a></li>
                            <li><a href="/residents" className="text-gray hover:underline text-lg">Residents</a></li>
                          </ul>
                        </div>
          
                        {/* Follow Us Links */}
                        <div className="mb-8 sm:mb-0">
                          <h5 className="text-lg font-semibold mb-5">Follow us</h5>
                          <ul className="space-y-2">
                            <li><a href="/linkedin" className="text-gray hover:underline text-lg">LinkedIn</a></li>
                            <li><a href="/instagram" className="text-gray hover:underline text-lg">Instagram</a></li>
                            <li><a href="/facebook" className="text-gray hover:underline text-lg">Facebook</a></li>
                          </ul>
                        </div>
          
                        {/* Legal Links */}
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
          
                    {/* Footer Bottom Section */}
                    <div className="text-center mt-8 text-lg lg:mr-300">
                      <p>&copy; TransEv 2025. All Rights Reserved.</p>
                    </div>
                  </footer>
                </div>
          
        
     </section>
    
    </>
  );
}

export default AboutUs;

