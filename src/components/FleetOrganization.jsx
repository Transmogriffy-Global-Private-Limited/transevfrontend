
import React, { useState,useRef} from 'react';
import Navbar from './Navbar';  
import logo from '../assets/TransEV logo.png'; // Use appropriate path for logo image
import background from '../assets/apartmnet.jpg';
import yourImage from '../assets/new.jpg';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import charger1 from '../assets/charger7.png';
import charger2 from '../assets/charger2.png';
import charger3 from '../assets/charger1.png';
 import { useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa"; 
import image from '../assets/imagee2.jpg';

import holiday from '../assets/holiday.jpg';
import charger from '../assets/charge.jpg';
import residental from '../assets/residental.jpg';
import bg from '../assets/charger3.jpg';
import AC01W from '../assets/AC01W3.png';
import AC02P from '../assets/AC02P3.png';
import AC02P7 from '../assets/AC02P7.4.png';
import AC02WCH from '../assets/AC02WC&H.png';
import AC03W7 from '../assets/AC03W7.png';
import AC03W22 from '../assets/AC03W22.png';
import DC04W from '../assets/DC04W.png';
import DC04G60 from '../assets/DC04G60.png';
import DC04G150 from '../assets/DC04G150.png';
import { useNavigate } from 'react-router-dom';
import logos from '../assets/up.png';
import logo1 from '../assets/tv.png';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
const Fleet = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineColor, setUnderlineColor] = useState('gray');
  const [activeIndex, setActiveIndex] = useState(null);
     const navigate = useNavigate();
  
   const handleContactClick = () => {
    navigate('/contact');
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
        "Dedicated Hubs: TransEV creates a dedicated hub at the fleet owner’s location or at a TransEV location, offering charging as a service exclusively to the fleet customer Shared Hubs: TransEV creates a common hub with chargers of different capacities, available to fleet customers based on their requirements Public Charging Solutions for Fleets: TransEV’s extensive network of public EV chargers can be used by fleet customers for last-mile charging, reducing vehicle dry run",
    },
    {
      question: "What is the process for setting up fleet charging infrastructure?",
      answer:
        "TransEV offers end-to-end charging infrastructure services. The fleet operator shares their current and future requirements, signs the agreement, and TransEV handles the rest. ",
    },
    {
      question: "How can I manage the charging schedule for my fleet to ensure operational efficiency?",
      answer:
        "TransEv’s charging management solution helps fleet operators improve charger and parking bay productivity, enhancing operational efficiency. ",
    },
    {
      question: "Are there specific EV chargers recommended for fleet operations?",
      answer:
        "Vehicle OEMs recommend charging protocols compatible with their vehicles. TransEV deploys chargers that fulfil the vehicle's charging requirements, such as CCS2 (DC Fast) and Type-2 (AC) charging standards for most EV cars.  ",
    },
    {
      question: "What are the benefits of using a centralized charging management system for my fleet?",
      answer:
        "A charging management system optimizes the charging infrastructure and parking bays, resulting in improved efficiency and productivity. ",
    },
    {
      question: "How can fleet electrification contribute to my company's sustainability goals?",
      answer:
        "Electric vehicles offer cleaner, more efficient, and sustainable transportation solutions with zero tailpipe emissions, fuel cost savings, and rapid technological advancements. This transition aligns with environmental goals and provides economic advantages. ",
    },
    {
      question: "What kind of maintenance is required for fleet EV charging stations?",
      answer:
        "EV charging infrastructure requires maintenance based on the hub's size. TransEV provides end-to-end service, taking care of all maintenance requirements.  ",
    },
    {
      question: "How do I ensure the safety and reliability of my fleet's charging infrastructure?",
      answer:
        "TransEV follows all required central and state government safety guidelines while deploying and operating charging hubs. There is continuous and proactive maintenance to ensure reliability of the charging infrastructure . ",
    },
    
  ];

  const [popupContent, setPopupContent] = useState({
         image: '',
         description: '',
         details: {},
         features: ''
       });
       
       const handlePopupOpen = (image, description, features, details) => {
         setPopupContent({ image, description, details, features });
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
  useEffect(() => {
     window.scrollTo(0, 0); // Ensures the page scrolls to the top whenever the page is loaded
   }, []);
  return (
    <div className="min-h-screen bg-white-50">
      {/* Navbar Section */}
      <Navbar />
      <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div> 
      {/* Funded Solutions Section */}
      <section className="text-center py-16 sm:py-20 bg-white">
<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-aeonik text-black-800 mt-10 sm:mt-16 lg:mt-20 px-4 sm:px-10 lg:px-32 xl:px-40 text-center lg:text-left">
 

    Charging Solutions <br />
    <span className="inline-block">for Fleets</span>
  </h2>

  <div className="flex justify-center lg:justify-start mt-12 sm:mt-16 px-4 sm:px-10 lg:px-32 xl:px-40">
  <button className="relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-yellow-300 text-white font-semibold rounded-full group transition-all duration-300 ease-in-out">
  <Link to="/contact">
  <span className="transition-all duration-300 ease-in-out cursor-pointer">
    Contact us
  </span>
</Link>

    <div className="ml-3 sm:ml-4 w-10 h-10 sm:w-12 sm:h-12 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:w-16 group-hover:ml-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:opacity-0 group-hover:translate-x-10 transition-all duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  </button>
</div>

</section>


     
<section className="px-4 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 bg-white flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 mb-12">
  
{/* Left side - Heading */}
<div className="w-full lg:w-1/2 text-center lg:text-left">
<h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-6 leading-tight">
  Attract more drivers  <br />
  with fleet charge point  <br />facilities.
 
</h3>
</div>


{/* Right side - Explore Link */}
{/* <div className="w-full lg:w-1/2 text-center lg:text-right mt-6 lg:mt-20">
  <a href="#explore" className="text-lg sm:text-xl lg:text-2xl font-semibold text-black-500 hover:underline inline-flex items-center justify-center lg:justify-end">
    Explore
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-black-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </a>
</div> */}

</section>
    

      {/* Background Image Section */}
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
    
     <section className="flex flex-col lg:flex-row py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 gap-10 lg:gap-0 mt-10 lg:mt-30">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-black mb-6">
            Fast and reliable<br /> charging for your<br />  fleet operations.
            </h2>
        
           
            {/* Content Sections */}
            <div className="text-gray-400 space-y-10 mb-20">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-black mt-80">
                Support your fleet’s EV transition
                </h3>
                <p className="text-base sm:text-lg font-semibold">
                With electric vehicle adoption accelerating, fleet operators need reliable, scalable charging infrastructure to keep vehicles on the road and operations running smoothly. Installing dedicated EV charge points ensures your fleet is always ready, helps reduce downtime, and positions your business at the forefront of sustainable transportation.
                </p>
             
              </div>
         <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-6 mt-20">
              <a
                href="/contact"
                className="text-blue-900 hover:underline hover:text-green-800 "
              >
                Ready to get started? Contact us
              </a>
            </p>
        
             
            </div>
          </div>
        
          {/* Right Side (Image) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
      <img
        src={charger} // Replace with actual image
        alt="EV Charging"
        className="w-full sm:w-[90%] md:w-[85%] lg:w-full h-auto lg:h-[1000px] object-cover rounded-lg"
      />
    </div>
    
  </section>

  
<section className="flex flex-col lg:flex-row py-20 px-8 mt-30">
  {/* Left Side: Image with padding and rounded corners */}
  <div className="w-full lg:w-1/2 pr-0 lg:pr-10 p-4 rounded-lg overflow-hidden">
    <img 
      src={residental} // Adjust the image source path
      alt="EV Charging Solution"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>

  {/* Right Side: Text Content */}
  <div className="w-full lg:w-1/2 pl-0 lg:pl-10 mt-10 lg:mt-0 flex flex-col justify-between">
    {/* EV Charging Solutions for Fleets */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-black mb-5">
      EV Charging Solutions  <br/> for Fleets
    </h2>

    {/* How it Works */}
    <div className="text-gray-400 mb-100">
      <h3 className="text-xl sm:text-2xl font-semibold mt-5 text-black">How it works</h3>
      <p className="text-lg sm:text-xl font-semibold mt-10">
        When we manage your fleet charging infrastructure, we handle everything end-to-end —<br /> 
        from recommending the right charge points for your fleet's needs, <br /> 
        to full installation and ongoing operational support.
      </p>
      <p className="text-lg sm:text-xl font-semibold mt-10">
        Through our online management platform, you can monitor usage, schedule charging, and <br /> 
        set custom tariff rates. This helps optimize fleet efficiency, reduce operational costs, <br /> 
        and ensure your vehicles are always ready when you need them.
      </p>
    </div>
  </div>
</section>

  <section className="py-12 sm:py-16 lg:py-20 bg-white mx-4 sm:mx-6 lg:mx-8 rounded-lg">
  <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 mr-80">
    
 
    <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
      We offer a range of charge points suitable for  <br /> fleet organization
      </h2>
    </div> 

 <div className="w-full lg:w-1/2 text-center lg:text-left px-4 max-w-2xl">
  <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-snug">
    Choose a Charger that fits the needs of your fleet best
  </h2>
</div>



    
  </div>
</section>


<div className="flex justify-center items-center mb-8 px-4 sm:px-8 lg:px-16">
  <div
    ref={containerRef}
    id="box-container"
    className="flex overflow-x-auto gap-8 py-8 px-4 sm:px-6 lg:px-10 relative"
    style={{
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      overflowY: 'hidden',
    }}
    onScroll={handleScroll}
  >
    {[ 
       { name: 'DC04W', description: '30 kW', features: 'Model No:TE-DC-04W-30,Rating:30 kW,Single Gun,Ethernet | Wi-fi|4G', image: DC04W,details: {
         'Dimensions':'WxDxH (459 mm x 346 mm x 734 mm)',
          'Rated Power': '30 kW',
          'Input Voltage': '304-456V AC',
          'Number of Output':'1',
          'Output Current':'100 A',
          'Output charging Outlet ':'Single output ccs1/ccs2 connector',
          'Operating Temperature':'-20°C to +60°C',
          'Connectivity':'Ethernet,4G,Wireless Network',
          'Charging Operation':'RFID card,Scan QR code,Mobile App',
          'Mechanical Protection':'IP54',
          'Safety':'CE',
         'Mounting': 'Wall Mount,Stand column,Portable wheeled',}}, 
            { name: 'DC04G', description: ' 60 kW ', features: 'Model No:TE-DC-04G-60,Rating:60 kW,High Speed Charging,OCPP1.6J Or Latest | RFID', image: DC04G60 ,details: {
          'Dimensions':'WxDxH (730 mm x 500 mm x 1500 mm)',
          'Rated Power': '60 kW',
          'Input Voltage': '304V - 456V AC',
          'Number of Output':'2',
          'Output Current':'200 A',
          'Output charging Outlet ':'ccs2 DC connectors,BS EN 62196,IP55',
          'Operating Temperature':'-20°C to +60°C',
          'Connectivity':'Ethernet,4G,Wireless Network',
          'Charging Operation':'RFID card,Scan QR code,Mobile App',
          'Mechanical Protection':'IP54',
          'Safety':'CE',
         'Mounting': 'Ground/Floor Mounting',}},
            { name: 'DC04G', description: '150 kW', features: 'Model No:TE-DC-04G-150,Rating:150 kW,High Speed Charging,OCPP1.6J Or Latest | RFID', image: DC04G150,details: {
           'Dimensions':'WxDxH (1150 mm x 625 mm x 2000 mm)',
          'Rated Power': '150 kW',
          'Input Voltage': '304V - 456V AC',
          'Number of Output':'2 or 3',
          'Output Current':'250 A',
          'Output charging Outlet ':'ccs2 DC connectors,BS EN 62196,IP55',
          'Operating Temperature':'-35°C to +60°C',
          'Connectivity':'Wi-Fi, GSM,Bluetooth,LED Indication',
          'Charging Operation':'QR code based/Scan code / App based authentication',
          'Mechanical Protection':'IP54',
          'Safety':'CE',
         'Mounting': 'Wall Mounted',}},
    ].map((box, index) => (
      <div key={index} className="flex flex-col items-center">
        <div
          className="box bg-gray-200 p-6 sm:p-8 lg:p-16 rounded-lg relative cursor-pointer hover:scale-105 transform transition-all duration-300 w-[300px] sm:w-[400px] lg:w-[550px] h-[500px] sm:h-[650px] lg:h-[600px]"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex justify-center items-center w-full h-3/4">
            <img
              src={box.image}
              alt={box.name}
              className="w-3/4 h-4/4 object-cover rounded-lg mt-20 cursor-pointer"
              onClick={() => handlePopupOpen(box.image, box.description, box.features,box.details)}
            />
          </div>

          <div
            className={`absolute top-4 right-4 bg-yellow-300 w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300 ${
              hovered === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => handlePopupOpen(box.image, box.description, box.features,box.details)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">{box.name}</h2>
          <p className="text-gray-600 mt-2">{box.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

<div className="relative mt-16 px-4 sm:px-8 lg:px-16">
  {/* Underline Section with margin on both sides */}
  <div
    className="transition-all duration-500"
    style={{
      height: '2px',
      width: `${underlineWidth}%`,
      backgroundColor: underlineColor,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  ></div>



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

<div className="border-t-2 border-gray-300 w-full mb-4"></div>
<section
  className="relative py-32 sm:py-40 lg:py-140 bg-cover bg-center rounded-lg mx-8 px-4 sm:px-8 lg:px-32 mt-12 sm:mt-16 lg:mt-50"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }}
>
  {/* Your content */}
</section>


<section className="py-12 sm:py-16 lg:py-20 bg-white mx-4 sm:mx-6 lg:mx-8 rounded-lg">
  <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-10">

    {/* Left Side - Text */}
    <div className="w-full lg:w-1/2 text-center lg:text-left px-4 sm:px-6 lg:px-0">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 sm:mb-8">
        Not sure about the best solution for you?
      </h2>
    </div>

    {/* Right Side - Image */}
    <div className="w-full lg:w-1/3 flex justify-center items-center px-4 sm:px-6 lg:px-0 lg:flex-row-reverse">
      <img
        src={image} // Use your actual image path
        alt="Solution Image"
        className="w-full sm:w-[80%] md:w-[70%] lg:w-[90%] max-h-[300px] object-cover rounded-xl shadow-lg"
      />
    </div>

  </div>
</section>

<section className="py-12 sm:py-16 lg:py-20 bg-white-100 w-full px-6 lg:px-20">
  <div className="container mx-auto text-left mb-10">
    <h2 className="text-2xl sm:text-xl lg:text-2xl font-semibold mb-4">
      Frequently Asked Questions
    </h2>
    <div className="border-t-2 border-gray-300 w-full mb-10"></div>
  </div>

  <div className="space-y-6">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className="border-b-2 border-gray-300 pb-4 mt-8 sm:mt-10 lg:mt-12"
      >
        {/* Question Section */}
        <div className="flex justify-between items-start ">
          {/* Left side - Question Number */}
          <div className="flex items-center gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
              {`0${index + 1}`}
            </span>
          </div>

          {/* Right side - Question Text */}
          <div className="flex-1 ml-20">
            <span className="text-xl sm:text-2xl lg:text-3xl text-gray-800">
              {faq.question}
            </span>
          </div>

          {/* Right side - Toggle Icon ( + or - ) */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)} // Toggle the active FAQ
          >
            <div
              className={`flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full ${
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
          <div className="mt-4 text-gray-600 text-lg sm:text-xl lg:text-2xl ml-4 sm:ml-8 lg:ml-16">
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    ))}
  </div>
</section>
    

<div className="w-full h-[500px] sm:h-screen bg-white flex justify-center items-center mt-10 sm:mt-20 md:mt-30 lg:mt-40">
                  <div className="w-full h-full max-w-screen-3xl bg-gradient-to-r p-6 sm:p-8 md:p-10 lg:p-12">
                    <div className="w-full h-full bg-gradient-to-b from-yellow-200 via-yellow-200 to-red-300 rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 shadow-lg max-w-screen-3xl mx-auto">
                   
                      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold text-gray-800 text-left font-aeonik">
                        <span className="mr-10 sm:mr-20 md:mr-40 lg:inline-block lg:mr-80">Ready to get</span><br />
                        <span className="sm:mr-10 md:mr-20 lg:mr-0 lg:inline-block">Started ?</span>
                      </h2>
          
                 
                      <div className="flex items-center justify-start mt-10 sm:mt-12 md:mt-14 lg:mt-20">
                        <button
                          id="contact-btn"
                          onClick={handleContactClick}
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
          

</div>
</div>
</div>  


          
                {/* Footer */}
                <div className="bg-white-50 py-16 ml-20">
                  <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-8">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4 mb-6 sm:mb-0">
                      <img src={logo1} alt="Company Logo" className="w-32 h-32" />
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
                          href="mailto:tgwbin@gmail.com"
                          className="relative inline-block hover:text-black-500"
                        >
                          <span className="hover:underline transition-all duration-300 mt-2">tgwbin@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
          
                  <div className="mt-10 border-t-2 border-gray-300 mx-8"></div>
                  <footer className="bg-white text-black py-8 mt-20">
                    <div className="container mx-auto flex flex-col sm:flex-row justify-between px-8">
                      {/* First Section - Experts and Client Portal */}
                      <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                        <h4 className="text-xl sm:text-xl font-semibold mb-4">
                          Pioneers in smart EV charging solutions <br />
                         
                        </h4>
          
                        <a
                          href="#"
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
                            <li><a href="/solution" className="text-gray hover:underline text-lg">Solutions</a></li>
                            <li><a href="/contact" className="text-gray hover:underline text-lg">Contact</a></li>
                            <li><a href="/about" className="text-gray hover:underline text-lg">About</a></li>
                          
                          </ul>
                        </div>
          
                        {/* Follow Us Links */}
                        <div className="mb-8 sm:mb-0">
                          <h5 className="text-lg font-semibold mb-5">Follow us</h5>
                          <ul className="space-y-2">
                               <li>
                              <a
                                href="https://x.com/transevIN?t=yJ30BdH5D7TME1ZZQiQisw&s=09"
                                className="text-gray hover:underline text-lg"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  width="28"
                                  height="28"
                                >
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </svg>
                              </a>
                            </li>
                                      <li><a href="https://www.instagram.com/__transmogrify__?igsh=MWRzY25tc2wzMnk1ag==" className="text-gray hover:underline text-lg"> <FaInstagram color="#E1306C" size={28} /></a></li>
                                      <li><a href="https://www.facebook.com/share/1NvgEQvwxG/" className="text-gray hover:underline text-lg"> <FaFacebook color="#1877F2" size={28} /></a></li>
                          </ul>
                        </div>
          
                        {/* Legal Links */}
                        <div>
                          <h5 className="text-lg font-semibold mb-5">Legal</h5>
                          <ul className="space-y-2">
                            <li><a href="/terms-conditions" className="text-gray hover:underline text-lg">Terms & Conditions</a></li>
                            <li><a href="/privacy-policy" className="text-gray hover:underline text-lg">Privacy Policy</a></li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
          
                    {/* Footer Bottom Section */}
                    <div className="text-center mt-8 text-lg lg:mr-300">
                      <p>&copy; TransEV 2025. All Rights Reserved.</p>
                    </div>
                  </footer>
                </div>
          
                {/* FAQ Popup */}
                {popupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                  {/* <div className="bg-white p-4 sm:p-8 rounded-lg max-w-6xl w-full flex flex-col sm:flex-row relative h-auto max-h-[90vh] overflow-y-auto"> */}
                    <div className="bg-white p-4 sm:p-8 rounded-lg max-w-6xl w-full flex flex-col sm:flex-row relative h-auto max-h-[90vh] lg:max-h-[95vh] overflow-y-auto">
              
                    {/* Close Button */}
                    <button
                      className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-900"
                      onClick={handlePopupClose}
                    >
                      &times;
                    </button>
              
                    {/* Image Section */}
                    <div className="w-full sm:w-1/2 p-2 sm:p-4">
                      <img
                        src={popupContent.image}
                        alt="Popup"
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
              
                    {/* Content Section */}
                    <div className="w-full sm:w-1/2 p-2 sm:p-4">
                      <h3 className="text-2xl font-semibold mb-4 mt-4 sm:mt-6">Features</h3>
                      <div className="flex flex-col space-y-2">
                        {popupContent.features.split(',').map((feature, index) => (
                          <div key={index} className="text-md text-gray-700">
                            {feature.trim()}
                          </div>
                        ))}
                      </div>
              
                      {/* Technical Specifications Table */}
                      <h3 className="text-2xl font-semibold mt-6 mb-4">Technical Specifications</h3>
                      {popupContent.details && (
                        <div className="w-full overflow-x-auto mx-auto">
                          <table className="min-w-[300px] text-sm sm:text-base text-left text-gray-800 border border-gray-300 mx-auto">
                            <tbody>
                              {Object.entries(popupContent.details).map(([key, value], index) => (
                                <tr key={index} className="border-b border-gray-200">
                                  <td className="py-2 px-4 font-medium bg-gray-100 whitespace-nowrap">{key}</td>
                                  <td className="py-2 px-4">{value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
              
                      {/* Buy Now Button */}
                      <button
                        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full"
                        onClick={handleBuyNowClick}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
              </div>
          
            );
          };
          
          export default Fleet;