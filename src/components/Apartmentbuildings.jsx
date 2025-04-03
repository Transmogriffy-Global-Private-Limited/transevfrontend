import React, { useState,useRef} from 'react';
import Navbar from './Navbar';  
import logo from '../assets/transev logo.png'; // Use appropriate path for logo image
import background from '../assets/apartmnet.jpg';
import yourImage from '../assets/new.jpg';
import { useInView } from 'react-intersection-observer';
import car from '../assets/car1.jpg'
import charger1 from '../assets/charger7.png';
import charger2 from '../assets/charger2.png';
import charger3 from '../assets/charger1.png';
import last from '../assets/woman.jpg';
import ev from '../assets/ev_charger.jpg';
import { FaPlus, FaMinus } from "react-icons/fa"; 
import image from '../assets/imagee2.jpg';
import image2 from '../assets/image.png';
import image3 from '../assets/aboutbg.jpg';
import image4 from '../assets/car1.jpg';
import image5 from '../assets/ev.jpg';
import hotels from '../assets/hotels.jpg';
import image6 from '../assets/slide4.jpg';
import image7 from '../assets/slide1.jpg';
import image8 from '../assets/slide6.jpg';
import image9 from '../assets/slide5.jpg';

const ApartmentBuildingPage = () => {
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
      question: "What is the best solution for my building?",
      answer:
        "The best solution depends on the size of your building, number of residents, and available parking spaces. We offer customizable solutions to fit your needs.",
    },
    {
      question: "How many charge points do I need?",
      answer:
        "The number of charge points depends on the number of residents and the type of charging stations you wish to install. We recommend assessing the demand to determine the optimal number.",
    },
    {
      question: "What is the cost of installation?",
      answer:
        "The cost of installation varies depending on the type of charging station and the complexity of the installation. Contact us for a detailed quote.",
    },
    {
      question: "Do I need a special electrical connection?",
      answer:
        "Yes, depending on the charging station's power requirements, you may need to upgrade your electrical infrastructure. Our team will assess your needs during the consultation.",
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
          Funded solutions<br/> <span className="mr-30">for apartments</span>
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
            Future-proof your sites with <br/> our fully funded and <br/> managed EV charging <br/>solutions.
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
        backgroundImage: `url(${background})`,
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
          Cost-free installation <br/> and management
        </h2>

        {/* Ready to get started? Contact us */}
        <p className="text-xl font-semibold text-gray-700 mb-5 ml-10">
  <a
    href="/contact" // Link to your Contact Us page
    className="text-blue-600 hover:underline hover:text-blue-800 mt-30"
  >
    Ready to get started?
  </a>
</p>

    {/* Meet Growing Tenant Demand */}
        <div className="text-gray-400 ml-10 mt-50">
          <h3 className="text-xl font-semibold mb-1 text-black">Meet growing tenant demand</h3>
          <p className="text-xl font-semibold mt-10">
            With EV ownership on the rise, having access to reliable, low-cost EV <br/>charging at home is set to become an essential requirement for <br/> tenants. For property owners, preparing for this growing demand now <br/> will help to future-proof your sites, increase their marketability, and <br/>boost your sustainability credentials.
          </p>

          <h3 className="text-xl font-semibold mt-5 text-black">A funded solution</h3>
          <p className="text-xl font-semibold mt-10">
            We remove many of the financial and operational barriers to large-scale <br/> EV infrastructure investment for residential landlords by offering a fully <br/>funded, maintained, and managed EV charging solution.
          </p>

         
          <p className="text-xl font-semibold mt-10">
  <a 
    href="/contact" // Link to your Contact Us page
    className="text-gray-500 hover:underline hover:text-gray-500"
  >
    Contact us to find out more about our funded solutions.
  </a>
</p>

        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="w-1/2">
        <img
          src={yourImage} // Replace with your actual image path
          alt="EV Charging"
          className="w-full h-220 rounded-lg object-cover"
        />
      </div>
    </section>
    <section className="flex py-20 px-8">
  {/* Left Side */}
  <div className="w-1/2 pr-10">
    <h2 className="text-6xl font-semibold text-black mb-1 mr-30 mt-20">
      What our funded approach <br/> delivers:
    </h2>
  </div>

  {/* Right Side (Contact Us) */}
  <div className="w-1/2">
  <p className="text-xl font-semibold text-gray-700 mb-5 ml-150 mt-30">
  <a
    href="/contact" // Link to your Contact Us page
    className="text-black-600 hover:underline hover:text-blue-800 mt-60"
  >
    Ready to get started? Contact Us
  </a>
</p>
  </div>
</section>
<div className="border-t-2 border-gray-300 w-full mb-8 mt-10"></div>
<div className="flex flex-wrap justify-between">

  {/* Row 1 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
      <img
        src={image3} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>

    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center ml-100">
      <h3 className="text-5xl font-semibold  mr-100">01</h3>
      <div>
      <p className="text-5xl text-black-800 mt-3 whitespace-nowrap w-full">
  Cost-efficient solutions
</p>

        <p className="text-gray-500 mt-2 text-lg">
          We offer property owners fully funded solutions with no upfront capital required, ensuring cost-free installation for you and your residents.
        </p>
      </div>
      </div>
      </div>
  </div>
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 2 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={image4} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">02</h3>
      <div>
      <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">
  Proactive support
</p>

        <p className="text-gray-500 mt-2 ml-100 text-lg">
        We work closely with you throughout the entire process, offering expert guidance to ensure the EV charging infrastructure meets your unique needs and goals.
        </p>
      </div>
      </div>
      </div>
  </div>
   
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 3 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={image5} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">03</h3>
      <div>
        <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">A fully managed service</p>
        <p className="text-gray-500 mt-2 ml-100 text-lg">
        We take care of all ongoing operations, eliminating the need for you to manage day-to-day tasks or invest in additional resources.
        </p>
      </div>
      </div>
      </div>
  </div>
  
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 4 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={hotels} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">04</h3>
      <div>
        <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">Future-proof designs</p>
        <p className="text-gray-500 mt-2 ml-100 text-lg">
         TransEv installation is thoughtfully designed by our in-house design team to support rising EV ownership and evolving energy needs.
        </p>
      </div>
      </div>
      </div>
  </div>
  
   
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 5 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={image6} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">05</h3>
      <div>
        <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">Added value</p>
        <p className="text-gray-500 mt-2 ml-100 text-lg">
        Installing uniform EV charging infrastructure will add value to your sites and boost their appeal to future tenants.
        </p>
      </div>
      </div>
      </div>
  </div>
    
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 6 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={yourImage} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">06</h3>
      <div>
        <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">Guaranteed expertise</p>
        <p className="text-gray-500 mt-2 ml-100 text-lg">
        TransEv is backed by the UK Government's Charging Infrastructure Investment Fund (CIIF) and brings together a team of highly trained professionals to deliver best-in-class EV charging solutions.
        </p>
      </div>
      </div>
      </div>
  </div>
   
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>
</div>
<section className="flex py-20 px-8">
  {/* Left Side */}
  <div className="w-1/2 pr-10">
    <h2 className="text-6xl font-semibold text-black mb-1 mr-30 mt-20">
    The benefits for your <br/> residents:
    </h2>
  </div>

  {/* Right Side (Contact Us) */}
  <div className="w-1/2">
  <p className="text-xl font-semibold text-gray-700 mb-5 ml-150 mt-30">
  <a
    href="/contact" // Link to your Contact Us page
    className="text-black-600 hover:underline hover:text-blue-800 mt-60"
  >
    Ready to get started? Contact Us
  </a>
</p>
  </div>
</section>
<div className="border-t-2 border-gray-300 w-full mb-8 mt-10"></div>
<div className="flex flex-wrap justify-between">

  {/* Row 1 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
      <img
        src={image} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>

    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center ml-100">
      <h3 className="text-5xl font-semibold  mr-100">01</h3>
      <div>
      <p className="text-5xl text-black-800 mt-3 whitespace-nowrap w-full">
      Low-cost charging
</p>

        <p className="text-gray-500 mt-2 text-lg">
        Your residents will receive competitive home charging pricing without any costs for installation, maintenance or testing.
        </p>
      </div>
      </div>
      </div>
  </div>
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 2 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={yourImage} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">02</h3>
      <div>
      <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">
      Convenience and flexibility
</p>

        <p className="text-gray-500 mt-2 ml-100 text-lg">
        With EV charging on their doorstep, residents will have the freedom to charge their vehicle at home whenever they need to.
        </p>
      </div>
      </div>
      </div>
  </div>
   
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 3 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={image7} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">03</h3>
      <div>
        <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">Fast, efficient charging</p>
        <p className="text-gray-500 mt-2 ml-100 text-lg">
        With charging up to 22kW, residents can relax knowing that their vehicle will charge quickly and efficiently.
        </p>
      </div>
      </div>
      </div>
  </div>
  
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>

  {/* Row 4 */}
  <div className="w-full sm:w-1/2 flex mb-8 ml-20">
    {/* Left Side (Image) */}
    <div className="w-1/3 flex justify-center items-center">
    <img
        src={image8} // Replace with your actual image path
        alt="EV Charging"
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
    <div className="w-2/3 pl-6 flex items-center">
    <div className="flex items-center">
    <h3 className="text-5xl font-semibold  ml-100">04</h3>
      <div>
        <p className="text-5xl text-black-800 mt-3 ml-100 whitespace-nowrap">
        Good accessibility</p>
        <p className="text-gray-500 mt-2 ml-100 text-lg">
        Our charge points are proactively maintained with any faults detected and fixed quickly, keeping them accessible and ready to use.
        </p>
      </div>
      </div>
      </div>
  </div>
  
   
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>
 
  <section
  className="relative py-120 bg-cover bg-center rounded-lg mx-8 px-232 mt-50"
  style={{
    backgroundImage: `url(${car})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }}
>
  {/* Add additional content here */}
</section>

<section className="py-20 bg-white-100 mx-8 rounded-lg">
  <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
    {/* Left Side */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <h2 className="text-xl font-semibold mb-4">
        Take a look at the products we can <br /> install for your residents
      </h2>
    </div>

    {/* Right Side */}
    <h2 className="text-7xl font-semibold mb-1 ml-70 max-w-[80%] mt-25">
      <span className="block w-full">We offer a range of compatible</span>
      <span className="block w-full">charge points suitable for</span>
      <span className="block w-full">apartment buildings</span>
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
<section className="py-20 bg-white-100 mx-8 rounded-lg">
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
        className="w-180 h-100 object-cover rounded-xl shadow-lg ml-150" // Set a fixed height (e.g., h-64) and use object-cover to maintain aspect ratio
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
</div>
);
};

export default ApartmentBuildingPage;
