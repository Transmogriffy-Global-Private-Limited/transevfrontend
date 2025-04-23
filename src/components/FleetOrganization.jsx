
import React, { useState,useRef} from 'react';
import Navbar from './Navbar';  
import logo from '../assets/transev logo.png'; // Use appropriate path for logo image
import background from '../assets/apartmnet.jpg';
import yourImage from '../assets/new.jpg';
import { useInView } from 'react-intersection-observer';

import charger1 from '../assets/charger7.png';
import charger2 from '../assets/charger2.png';
import charger3 from '../assets/charger1.png';

import { FaPlus, FaMinus } from "react-icons/fa"; 
import image from '../assets/imagee2.jpg';

import holiday from '../assets/holiday.jpg';
import charger from '../assets/charge.jpg';
import residental from '../assets/residental.jpg';
import bg from '../assets/charger3.jpg';
const Holiday = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineColor, setUnderlineColor] = useState('gray');
  const [activeIndex, setActiveIndex] = useState(null);
  const handleContactClick = () => {
    // Get the button element by id
    const button = document.getElementById('contact-btn');
    
    // Add background color change on button click
    button.classList.add('bg-yellow-500'); // Add a background color

    // After a small delay (for animation), navigate to the contact page
    setTimeout(() => {
      navigate('/contact');  // Navigate to the Contact page
    }, 500); // Delay to allow animation to complete
  };
  // FAQ data
  const faqs = [
    {
      question: "Why should I consider electrifying my fleet?",
      answer:
        "Electrifying your fleet reduces transportation costs, improves productivity, helps meet sustainability targets, and aligns with corporate mandates for using electric vehicles. ",
    },
    {
      question: "What are the different types of EV charging solutions available for fleets?",
      answer:
        "Dedicated Hubs: Tata Power creates a dedicated hub at the fleet owner’s location or at a Tata Power location, offering charging as a service exclusively to the fleet customer Shared Hubs: Tata Power creates a common hub with chargers of different capacities, available to fleet customers based on their requirements Public Charging Solutions for Fleets: Tata Power’s extensive network of public EV chargers can be used by fleet customers for last-mile charging, reducing vehicle dry run",
    },
    {
      question: "What is the process for setting up fleet charging infrastructure?",
      answer:
        "TransEv offers end-to-end charging infrastructure services. The fleet operator shares their current and future requirements, signs the agreement, and Tata Power handles the rest. ",
    },
    {
      question: "How can I manage the charging schedule for my fleet to ensure operational efficiency?",
      answer:
        "TransEv’s charging management solution helps fleet operators improve charger and parking bay productivity, enhancing operational efficiency. ",
    },
    {
      question: "Are there specific EV chargers recommended for fleet operations?",
      answer:
        "Vehicle OEMs recommend charging protocols compatible with their vehicles. Tata Power deploys chargers that fulfil the vehicle's charging requirements, such as CCS2 (DC Fast) and Type-2 (AC) charging standards for most EV cars.  ",
    },
    {
      question: "What are the benefits of using a centralized charging management system for my fleet?",
      answer:
        "A charging management system optimizes the charging infrastructure and parking bays, resulting in improved efficiency and productivity. ",
    },
    {
      question: "How can fleet electrification contribute to my company's sustainability goals?",
      answer:
        "Electric vehicles offer cleaner, more efficient, and sustainable transportation solutions with zero tailpipe emissions, fuel cost savings, and rapid technological advancements. This transition aligns with environmental goals and provides economic advantages. . ",
    },
    {
      question: "What kind of maintenance is required for fleet EV charging stations?",
      answer:
        "EV charging infrastructure requires maintenance based on the hub's size. Tata Power provides end-to-end service, taking care of all maintenance requirements.  ",
    },
    {
      question: "How do I ensure the safety and reliability of my fleet's charging infrastructure?",
      answer:
        "TransEv follows all required central and state government safety guidelines while deploying and operating charging hubs. There is continuous and proactive maintenance to ensure reliability of the charging infrastructure . . ",
    },
    
  ];

  const [popupContent, setPopupContent] = useState({
    image: '',
    description: '',
    features: ''
  });

  const handlePopupOpen = (image, description, features) => {
    setPopupContent({ image, description, features });
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleBuyNowClick = () => {
    // Handle login or any other logic for "Buy Now"
    // Redirecting to login page for now (you can change this logic based on your app)
    window.location.href = '/login'; // Redirect to login page
  };
  const containerRef = useRef(null); // Ref to handle scrolling

  const handleArrowClick = (direction) => {
    const container = containerRef.current;
    if (direction === 'left') {
      container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    const scrollPosition = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const totalWidth = container.scrollWidth;

    // Update the underline width based on scroll position
    const scrollProgress = (scrollPosition / (totalWidth - containerWidth)) * 100;
    setUnderlineWidth(scrollProgress);
  };

    const { ref: sectionRef, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });
  
  return (
    <div className="min-h-screen bg-white-50">
      {/* Navbar Section */}
      <Navbar />
      <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div> 
      {/* Funded Solutions Section */}
      <section className="text-center py-20 bg-white-100">
        <h2 className="text-9xl font-aeonik text-black-800 mt-20 mr-180">
        <span className=" font-bold text-9xl "> Fleet Organization </span> <br/> <span className=" font-bold text-9xl ">charging solutions</span>
       
        </h2>
        
       <div className="relative">
  <button className="relative inline-flex items-center justify-center px-10 py-4 bg-yellow-300 text-white font-semibold rounded-full group transition-all duration-300 ease-in-out mt-20 mr-190">
    
    {/* "Contact us" text */}
    <span className="opacity-100 translate-x-0 transition-all duration-300 ease-in-out">
      Contact us
    </span>
    
    {/* Right arrow inside the circle */}
    <div className="ml-4 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:w-20 group-hover:ml-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-6 text-white group-hover:opacity-0 group-hover:translate-x-10 transition-all duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  </button>
</div>


      </section>

      {/* Future-Proof Your Sites Section */}
      <section className="px-16 py-20 bg-white-100 flex items-center justify-between mb-50  ">
        <div className="w-1/2">
          <h3 className="text-5xl font-semibold text-gray-800 ">
          Attract more drivers  <br/>   with fleet charge point facilities.<br/> 
          </h3>
        </div>
        <div className="w-1/2 text-right mt-20">
  <a href="#explore" className="text-2xl font-semibold text-black-500 hover:underline inline-flex items-center">
    Explore
    {/* Down Arrow Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </a>
</div>

      </section>

      {/* Background Image Section */}
      <section
      className="relative py-120 bg-cover bg-center rounded-lg mx-8"
      style={{
        backgroundImage: `url(${holiday})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* Add additional content here */}
    </section>
    <section className="flex py-20 px-8 mt-30">
      {/* Left Side */}
      <div className="w-1/2 pr-10">
        {/* Cost-free Installation and Management */}
        <h2 className="text-7xl font-semibold text-black mb-5 ml-10">
        Fast and reliable <br/>charging at your <br/>holiday park. 
        </h2>

        {/* Ready to get started? Contact us */}
        <p className="text-xl font-semibold text-gray-700 mb-5 ml-10">
  <a
    href="/contact" // Link to your Contact Us page
    className="text-black-600 hover:underline hover:text-blue-800 mt-50"
  >
    Ready to get started?Contact Us
  </a>
</p>

    {/* Meet Growing Tenant Demand */}
        <div className="text-gray-400 ml-10 mt-140">
        

          <h3 className="text-xl font-semibold mt-5 text-black">Cater for your guests' EV needs</h3>
          <p className="text-xl font-semibold mt-10">
          With the uptake of electric vehicles on the rise, increasing numbers of <br/> holidaymakers are going to require charge point facilities at their holiday <br/> home. Providing this facility is a great way to stand out from the <br/> competition and secure more bookings.
          </p>

         
        

        </div>
      </div>
      

      {/* Right Side (Image) */}
      <div className="w-1/2">
        <img
          src={charger} // Replace with your actual image path
          alt="EV Charging"
          className="w-full h-270 rounded-lg object-cover"
        />
      </div>
    </section>
    <section className="flex py-20 px-8 mt-30">
  {/* Left Side: Image with padding and rounded corners */}
  <div className="w-1/2 pr-10 p-4 rounded-lg overflow-hidden">  {/* Added padding (p-4) and rounded corners */}
    <img 
      src={residental} // Adjust the image source path
      alt="EV Charging Solution"
      className="w-full h-full object-cover rounded-lg" // Added rounded corners to the image
    />
  </div>

  {/* Right Side: Text Content */}
  <div className="w-1/2 pl-10 flex flex-col justify-between mt-20">
    {/* Cost-free Installation and Management */}
    <h2 className="text-7xl font-semibold text-black mb-5">
    Charge points  <br /> for holiday parks
    </h2>

    

    {/* Meet Growing Tenant Demand */}
    <div className="text-gray-400 mb-20">
    

      <h3 className="text-xl font-semibold mt-5 text-black">How it works</h3>
      <p className="text-xl font-semibold mt-10">
      When we manage your charge point installation, we can take care of <br/> everything on your behalf, from helping you choose the correct charge <br/>point for your needs, right through to installation and ongoing <br/> management.
      </p>
      <p className="text-xl font-semibold mt-10">
      As part of our service via our online management platform, we can set <br/> tariff rates for your guests which could also generate additional income <br/> for you, while covering your electricity costs.
      </p>
     
    </div>
  </div>
</section>

<section className="py-20 bg-white-100 mx-8 rounded-lg">
  <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
    {/* Left Side */}
    <div className="lg:w-1/2 text-center lg:text-left ">
      <h2 className="text-xl font-semibold mb-4 w-1000 mr-40">
      We offer a range of charge points suitable for  <br /> holiday parks
      </h2>
    </div>

    {/* Right Side */}
    <h2 className="text-7xl font-semibold mb-1 ml-[-30] max-w-[80%] mt-25">
      <span className="block w-1200 ">Choose a Charger that fits </span>
      <span className="block w-full"> the needs of your holiday </span>
      <span className="block w-full"> park best</span>
    </h2>
  </div>
</section>

<div className="flex justify-center items-center mb-8">
  <div
    ref={containerRef} // Attach the ref to the container
    id="box-container"
    className="flex overflow-x-auto gap-8 py-8 pl-12 pr-16 relative"
    style={{
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none', // Hide the scrollbar (works in Firefox)
      msOverflowStyle: 'none', // Hide the scrollbar (works in IE and Edge)
      overflowY: 'hidden', // Disable vertical scrollbar
    }}
    onScroll={handleScroll} // Handle the scroll event to update the underline width and color
  >
    {[
      { name: 'Zaptec Go', description: 'Up to 7.4kW charging speed', features: 'Up to 22kW charging speed', image: charger1 },
      { name: 'EO Mini Pro 3', description: 'Up to 7.4kW charging speed', features: 'Up to 22kW charging speed', image: charger2 },
      { name: 'Easee One', description: 'Up to 7.4kW charging speed',features: 'Up to 22kW charging speed', image: charger3 },
      { name: 'EO Genious 2', description: 'Up to 7.4kW charging speed',features: 'Up to 22kW charging speed', image: charger3 },
   
    ].map((box, index) => (
      <div key={index} className="flex flex-col items-center">
        <div
          className="box bg-gray-200 p-16 rounded-lg relative cursor-pointer hover:scale-105 transform transition-all duration-300 w-[550px] h-[800px]" // Adjust width of box to fit 3 per screen
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex justify-center items-center w-full h-3/4">
            <img
              src={box.image}
              alt={box.name}
              className="w-3/4 h-3/4 object-cover rounded-lg mt-20 cursor-pointer"
              onClick={() => handlePopupOpen(box.image, box.description, box.features)}
            />
          </div>

          <div
            className={`absolute top-4 right-4 bg-yellow-300 w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300 ${hovered === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => handlePopupOpen(box.image, box.description, box.features)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>

        {/* Box Name and Description */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">{box.name}</h2>
          <p className="text-gray-600 mt-2">{box.description}</p>
       
        </div>
      </div>
    ))}
  </div>
</div>

<div className="relative mt-16">
  {/* Underline Section */}
  <div
    className="absolute bottom-0 left-0 right-0 transition-all duration-500"
    style={{
      left: '0', // Set underline to start from the left side
      height: '2px',
      width: `${underlineWidth}%`, // Dynamically set the width based on scroll position
      backgroundColor: underlineColor, // Color changes based on scroll position
      transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out',
    }}
  ></div>

  {/* Arrow Buttons Section */}
  <div className="flex justify-end w-full absolute bottom-2 right-4 px-4">
    <button
      className="text-xl p-2 rounded-full mx-4"
      onClick={() => handleArrowClick('left')}
    >
      ←
    </button>
    <button
      className="text-xl p-2 rounded-full mx-4"
      onClick={() => handleArrowClick('right')}
    >
      →
    </button>
  </div>
</div>
<div className="border-t-2 border-gray-300 w-full mb-8"></div>
<section
  className="relative py-140 bg-cover bg-center rounded-lg mx-8 px-232 mt-50"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }}
>
  {/* Add additional content here */}
</section>



<section className="py-20 bg-white-100 mx-8 rounded-lg mr-50 mt-20">
  <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
    {/* Left Side - Text */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <h2 className="text-6xl font-semibold mb-4 ml-20">
        Not sure about the best <br /> solution for you?
      </h2>
    </div>

    {/* Right Side - Image */}
    <div className="lg:w-1/2 flex justify-center items-center">
      <img
        src={image} // Use the imported image here
        alt="Solution Image"
        className="w-150 h-100 object-cover rounded-xl shadow-lg ml-150" // Set a fixed height (e.g., h-64) and use object-cover to maintain aspect ratio
      />
    </div>
  </div>
</section>

<section className="py-20 bg-white-100 mx-8 rounded-lg">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-2xl font-semibold mb-4 mr-260">Frequently Asked Questions</h2>
        <div className="border-t-2 border-gray-300 w-full mb-10"></div>
      </div>

      <div className="space-y-6 ml-30">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b-2 border-gray-300 pb-4 mt-20"
          >
            {/* Question Section */}
            <div className="flex justify-between items-center">
              {/* Left side - Question Number and Question */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-semibold text-gray-800 ">{`0${index + 1}`}</span>
                <span className="text-5xl text-gray-800 ml-100">{faq.question}</span>
              </div>

              {/* Right side - Toggle Icon ( + or - ) */}
              <div
                className="flex items-center cursor-pointer ml-60"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index) // Toggle the active FAQ
                }
              >
                <div
                  className={`flex justify-center items-center w-8 h-8 rounded-full ${
                    activeIndex === index ? "bg-gray-300" : "bg-yellow-300"
                  }`}
                >
                  {activeIndex === index ? (
                    <FaMinus className="text-black" />
                  ) : (
                    <FaPlus className="text-black" />
                  )}
                </div>
              </div>
            </div>

            {/* Answer Section - Display when active */}
            {activeIndex === index && (
              <div className="mt-4 text-gray-600 text-xl ml-40">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    


      <div className="w-full h-screen bg-white flex justify-center items-center mt-30">
      <div className="w-full h-full max-w-screen-3xl bg-gradient-to-r p-10"> 
      <div className="w-full h-full bg-gradient-to-b from-yellow-200 via-yellow-200 to-red-300 rounded-3xl p-12 shadow-lg max-w-screen-3xl mx-auto">
          {/* Your content here */}
          <h2 className="text-9xl font-semibold text-gray-800 text-center font-aeonik">
      <span className="block mr-240">Ready to get</span>
      <span className="block mr-300">started?</span>
    </h2>
    <div className="flex items-center justify-center">
    
      <button
        id="contact-btn"
        onClick={handleContactClick}
        className="flex items-center justify-center px-12 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white w-auto h-auto mr-330 mt-20"
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
    <div className="mt-55 ">
      {/* Heading: Bold and left-aligned */}
      <h3 className="text-2xl font-bold text-left text-gray-800 ">
        EV Charging Solutions for Residential Sites and Businesses
      </h3>
    
      {/* Space between heading and description */}
      <div className="mt-4">
        {/* Description: Split into two lines */}
        <p className="text-lg text-gray-600 leading-relaxed">
          We’ll listen to your needs, identify the best approach,
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          and then create a bespoke smart EV charging solution that’s right for you.
        </p>
      </div>
    </div>
    
    
        </div>
      </div>
    </div>
    <div>
      {/* Contact Section */}
      <div className="bg-white-50 py-16">
        <div className="container mx-auto flex justify-between items-center px-8">
          {/* Left Side: Logo */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Company Logo" className="w-32 h-32 ml-20" />
          </div>

          {/* Right Side: Phone number and email */}
          <div className="text-right">
            {/* Phone number with hover underline animation */}
            <div className="text-5xl font-semibold text-gray-800 mb-4 mr-80 ml-150">
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
      </div>
      
        {/* Underline Section */}
      <div className="mt-10 border-t-2 border-gray-400 mx-8 ml-30"></div>

{/* Footer Section */}
<footer className="bg-white-800 text-black py-8 mt-20 ml-50"> {/* Add ml-4 to shift the footer a little to the right */}
  <div className="container mx-auto flex justify-between">
    <div className="w-1/3">
      <h4 className="text-xl font-semibold mb-4 mr-20">
        Experts in smart EV charging solutions <br /> for residential sites and businesses.
      </h4>

      {/* Client Portal Button */}
      <a
        href="/client-portal"
        className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105 mr-20 mt-10"
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
  <div className="text-center mt-8 text-lg mr-300">
    <p>&copy; TransEv 2025. All Rights Reserved.</p>
  </div>
  
</footer>

{/* Popup Modal */}
{popupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-6xl w-full flex relative h-auto">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-900"
        onClick={handlePopupClose}
      >
        &times; {/* "×" represents the close/cross icon */}
      </button>

      <div className="w-1/2 p-4">
        <img
          src={popupContent.image}
          alt="Popup"
          className="w-full h-auto object-contain rounded-lg"  // Ensuring the image stays contained and fully visible
        />
      </div>

      <div className="w-1/2 p-4">
        <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
        <p>{popupContent.description}</p>
        <h3 className="text-2xl font-semibold mb-4 mt-6">Features</h3>
        <p>{popupContent.features}</p>

        {/* Buy Now Button */}
        <button
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full"
          onClick={handleBuyNowClick}
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
)}
</div>
</div>

);
};

export default Holiday;