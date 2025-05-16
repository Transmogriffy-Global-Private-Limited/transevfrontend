import React, { useState,useRef} from 'react';
import { Link } from 'react-router-dom';
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
import AC01W from '../assets/AC01W3.png';
import AC02P from '../assets/AC02P3.png';
import AC02P7 from '../assets/AC02P7.4.png';
import AC02WCH from '../assets/AC02WC&H.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ApartmentBuildingPage = () => {
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
      question: "What are the benefits of installing an EV charger at housing societies & Workplaces?",
      answer:
        "Residential societies and workplaces are where cars are parked for the longest periods. Deploying a community charger (AC Charger) in these locations enables charging through shared infrastructure at optimal costs.",
    },
    {
      question: "What is the process for installing a Community EV charger?",
      answer:
        "The association at the housing society or the admin team at the workplace can raise a request on the Tata Power website. Tata Power installs compatible EV chargers. Various business models, including zero capex, are available for customers to choose from.",
    },
    {
      question: "How long does it take to charge an EV at home?",
      answer:
        "Charging time depends on the charger speed and battery size of the car. For example, a 30kWh vehicle with a 7.4kW charger generally takes 4 hours to charge..",
    },
    {
      question: "What are the costs associated with installing and using a Community EV charger?",
      answer:
        "The cost of the various models of offering community charges differs depending on the business model chosen. In the capex model, the customer procures the charger and related infrastructure. In the opex model, Tata Power incurs all expenses related to the charger and power infrastructure. .",
    },
    {
      question: "Can multiple residents in a housing society share EV charging stations?",
      answer:
        "Yes, community charging solutions are designed to optimize charging and power infrastructure.",
    },
    {
      question: "Are there any government incentives or subsidies for installing home EV chargers?",
      answer:
        "Some states offer different incentives, such as charger subsidies and subsidized power costs. Customers are advised to check their respective state government websites for details. ",
    },
    {
      question: "How do I monitor the electricity consumption of my Community EV charger?",
      answer:
        "All community EV chargers are hosted on the Tata Power EZ Charge App, and charging fees is automatically debited from the wallet..",
    },
    {
      question: "What safety measures should I take when charging my EV at home?",
      answer:
        "Tata Power ensures all necessary safety measures and compliance with state guidelines during deployment. ",
    },
    {
      question: "Who do I contact for support or maintenance of my Community EV charger?",
      answer:
        "Tata Power has a 24-hour call center. Customers can call 18008332233 for support or email for maintenance services.  ",
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
<section className="bg-white-100 py-16 sm:py-20 px-4 sm:px-8 lg:px-32">
  <h2 className="text-left text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-aeonik text-black-800 mt-10 lg:mt-20">
    Funded solutions<br />
    <span className="block mt-2">for Home and Housing Societies</span>
  </h2>

  <div className="relative mt-12 sm:mt-16 text-left">
    <button className="relative inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-orange-300 text-white font-semibold rounded-full group transition-all duration-300 ease-in-out">
      {/* "Contact us" text */}
      <Link to="/contact">
  <span className="transition-all duration-300 ease-in-out cursor-pointer">
    Contact us
  </span>
</Link>
      {/* Right arrow inside the circle */}
      <div className="ml-3 sm:ml-4 w-10 sm:w-12 h-10 sm:h-12 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:w-16 group-hover:ml-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 sm:w-8 h-6 text-white group-hover:opacity-0 group-hover:translate-x-6 transition-all duration-300 ease-in-out"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
      
    </button>

  </div>
</section>


      {/* Future-Proof Your Sites Section */}
      <section className="bg-white-100 px-4 sm:px-8 lg:px-16 py-16 sm:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0 mb-12">
  {/* Left Text Block */}
  <div className="w-full lg:w-1/2">
    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight">
      Future-proof your sites with <br />
      our fully funded and <br />
      managed EV charging <br />
      solutions.
    </h3>
  </div>

  {/* Right Explore Link */}
  <div className="w-full lg:w-1/2 text-left lg:text-right mt-8 lg:mt-20">
    <a
      href="#explore"
      className="text-xl sm:text-2xl font-semibold text-black-500 hover:underline inline-flex items-center"
    >
      Explore
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 sm:w-6 h-5 sm:h-6 text-black-500 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
  </div>
</section>


     
    <section
  className="relative rounded-lg bg-cover bg-center 
             mx-4 sm:mx-6 lg:mx-8 
             py-16 sm:py-24 lg:py-[120px] 
             min-h-[300px] sm:min-h-[400px] lg:min-h-[1020px]"
  style={{
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }}
>
  {/* Optional content or overlay can go here */}
</section>
<section className="flex flex-col lg:flex-row items-stretch py-16 sm:py-20 px-4 sm:px-8 lg:px-16 mt-10 sm:mt-20">
  {/* Left Side */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center min-h-[600px] lg:pr-10 mb-10 lg:mb-0">
    <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold text-black mb-6">
      Cost-free installation <br /> and management
    </h2>

    <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mb-6">
      <a
        href="/contact"
        className="text-blue-600 hover:underline hover:text-blue-800"
      >
        Ready to get started? Contact us
      </a>
    </p>

    <div className="text-gray-400">
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">
        Meet growing tenant demand
      </h3>
      <p className="text-base sm:text-lg lg:text-xl font-semibold mt-4">
        With EV ownership on the rise, having access to reliable, low-cost EV
        charging at home is set to become an essential requirement for tenants.
        For property owners, preparing for this growing demand now will help to
        future-proof your sites, increase their marketability, and boost your
        sustainability credentials.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-6 text-black">
        A funded solution
      </h3>
      <p className="text-base sm:text-lg lg:text-xl font-semibold mt-4">
        We remove many of the financial and operational barriers to large-scale
        EV infrastructure investment for residential landlords by offering a
        fully funded, maintained, and managed EV charging solution.
      </p>

      <p className="text-base sm:text-lg lg:text-xl font-semibold mt-6">
        <a
          href="/contact"
          className="text-gray-500 hover:underline hover:text-gray-700"
        >
          Contact us to find out more about our funded solutions.
        </a>
      </p>
    </div>
  </div>

  {/* Right Side (Image) */}
  <div className="w-full lg:w-1/2 flex items-center justify-center">
    <img
      src={yourImage} // Replace with your image path
      alt="EV Charging"
      className="w-full h-[400px] sm:h-[500px] lg:h-[700px] rounded-lg object-cover"
    />
  </div>
</section>


  <section className="flex flex-col lg:flex-row py-16 sm:py-20 px-4 sm:px-8 lg:px-16">
  {/* Left Side */}
  <div className="w-full lg:w-1/2 lg:pr-10 mb-8 lg:mb-0">
    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-black mt-6 sm:mt-10 lg:mt-20 mb-4">
      What our funded approach <br /> delivers:
    </h2>
  </div>

  {/* Right Side (Contact Us) */}
  <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-start lg:justify-end">
    <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mt-2 lg:mt-30">
      <a
        href="/contact"
        className="text-black hover:underline hover:text-blue-800"
      >
        Ready to get started? Contact Us
      </a>
    </p>
  </div>
</section>

<div className="border-t-2 border-gray-300 w-full mb-8 mt-10"></div>


<div>
{/* ROWS START */}
{[
  {
    number: "01",
    title: "Cost-efficient solutions ",
    desc: "We offer property owners fully funded solutions with no upfront capital required, ensuring cost-free installation for you and your residents.",
    img: image3,
  },
  {
    number: "02",
    title: "Proactive support ",
    desc: "We work closely with you throughout the entire process, offering expert guidance to ensure the EV charging infrastructure meets your unique needs and goals.",
    img: image4,
  },
  {
    number: "03",
    title: "A fully managed service ",
    desc: "We take care of all ongoing operations, eliminating the need for you to manage day-to-day tasks or invest in additional resources.",
    img: image5,
  },
  {
    number: "04",
    title: "Future-proof designs ",
    desc: "TransEv installation is thoughtfully designed by our in-house design team to support rising EV ownership and evolving energy needs.",
    img: hotels,
  },
  {
    number: "05",
    title: "Added value ",
    desc: "Installing uniform EV charging infrastructure will add value to your sites and boost their appeal to future tenants.",
    img: image6,
  },
  {
    number: "06",
    title: "Guaranteed expertise ",
    desc: "TransEv is backed by the UK Government's Charging Infrastructure Investment Fund (CIIF) and brings together a team of highly trained professionals to deliver best-in-class EV charging solutions.",
    img: yourImage,
  },
].map((item, index) => (
  <div key={index}>
    <div className="w-full flex flex-wrap items-start justify-center lg:justify-start mb-12 px-4 lg:px-20">
      {/* Left Side (Image) */}
      <div className="w-1/3 sm:w-1/4 lg:w-1/5 flex justify-center items-center mb-4 sm:mb-0">
        <img
          src={item.img}
          alt={`EV Charging ${item.number}`}
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-48 rounded-lg object-cover"
        />
      </div>

      {/* Right Side (Text) */}
      <div className="w-full sm:w-3/4 lg:w-4/5 flex items-center">
        <div className="flex flex-col sm:flex-row sm:items-start sm:pl-6 lg:pl-12">
          {/* Number */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-start mb-2 sm:mb-0 sm:mr-6 lg:ml-60">
            <h3 className="text-3xl sm:text-4xl font-semibold text-center sm:text-left lg:text-5xl">
              {item.number}
            </h3>
          </div>

          {/* Content */}
          <div className="text-center sm:text-left sm:pr-4 lg:pr-12 lg:ml-50">
            <p className="text-lg sm:text-2xl text-black font-semibold leading-snug mb-2 lg:text-5xl">
              {item.title}
            </p>
            <p className="text-gray-500 text-sm sm:text-base lg:text-xl">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t-2 border-gray-300 w-full mb-8 mt-10"></div>
  </div>
))}
<div/>

   

</div>
 
<section className="flex flex-col md:flex-row py-12 px-6 md:py-20 md:px-12 lg:px-20">
  {/* Left Side */}
  <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-10">
    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-black leading-tight">
      The benefits for your <br /> residents:
    </h2>
   
  </div>

  {/* Right Side (Contact Us) */}
  <div className="w-full md:w-1/2 flex items-start md:items-center justify-start md:justify-end">
    <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700">
      <a
        href="/contact"
        className="text-black hover:underline hover:text-blue-800"
      >
        Ready to get started? Contact Us
      </a>
    </p>
  </div>
</section>
 <div className="border-t-2 border-gray-300 w-full mb-8 mt-20"></div>
<div>
{/* ROWS START */}
{[
  {
    number: "01",
    title: "Low-cost charging ",
    desc: "  Your residents will receive competitive home charging pricing without any costs for installation, maintenance or testing.",
    img: image,
  },
  {
    number: "02",
    title: "Convenience and flexibility ",
    desc: "  With EV charging on their doorstep, residents will have the freedom to charge their vehicle at home whenever they need to.",
    img: yourImage,
  },
  {
    number: "03",
    title: "Fast, efficient charging",
    desc: " With charging up to 22kW, residents can relax knowing that their vehicle will charge quickly and efficiently.",
    img: image7,
  },
  {
    number: "04",
    title: " Good accessibility ",
    desc: " Our charge points are proactively maintained with any faults detected and fixed quickly, keeping them accessible and ready to use.",
    img: image8,
  },
  
].map((item, index) => (
  <div key={index}>
    <div className="w-full flex flex-wrap items-start justify-center lg:justify-start mb-12 px-4 lg:px-20">
      {/* Left Side (Image) */}
      <div className="w-1/3 sm:w-1/4 lg:w-1/5 flex justify-center items-center mb-4 sm:mb-0">
        <img
          src={item.img}
          alt={`EV Charging ${item.number}`}
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-48 rounded-lg object-cover"
        />
      </div>

      {/* Right Side (Text) */}
      <div className="w-full sm:w-3/4 lg:w-4/5 flex items-center">
        <div className="flex flex-col sm:flex-row sm:items-start sm:pl-6 lg:pl-12">
          {/* Number */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-start mb-2 sm:mb-0 sm:mr-6 lg:ml-60">
            <h3 className="text-3xl sm:text-4xl font-semibold text-center sm:text-left lg:text-5xl">
              {item.number}
            </h3>
          </div>

          {/* Content */}
          <div className="text-center sm:text-left sm:pr-4 lg:pr-12 lg:ml-50">
            <p className="text-lg sm:text-2xl text-black font-semibold leading-snug mb-2 lg:text-5xl">
              {item.title}
            </p>
            <p className="text-gray-500 text-sm sm:text-base lg:text-xl">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t-2 border-gray-300 w-full mb-8"></div>
  </div>
))}
<div/>
<section
  className="relative bg-cover bg-center rounded-lg 
             w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[97%] 
             h-[300px] sm:h-[450px] md:h-[550px] lg:h-[400px] xl:h-[750px] 
             mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mt-8 sm:mt-12 lg:mt-16 xl:mt-50"
  style={{
    backgroundImage: `url(${car})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',   // Ensures the image covers the container
    backgroundPosition: 'center',  // Centers the image
  }}
>
  {/* Add content here if needed */}
</section>

<section className="py-20 bg-white mx-4 sm:mx-8 rounded-lg">
  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-4 sm:px-6 lg:px-12">
    
    {/* Left Side */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <h2 className="text-xl font-semibold mb-4">
        Take a look at the products we can <br /> install for your residents
      </h2>
    </div>

    {/* Right Side */}
    <div className="w-full lg:w-2/3 xl:w-3/4">
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-6 text-center lg:text-left max-w-full mt-6 lg:mt-0 leading-tight">
    We offer a range of compatible charge points suitable for home and housing societies
  </h2>
</div>


    
  </div>
</section>



<div className="flex justify-center items-center mb-8">
  <div
    ref={containerRef}
    id="box-container"
    className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 py-6 px-4 sm:px-6 md:px-12 relative scroll-smooth no-scrollbar"
    style={{
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      overflowY: 'hidden',
    }}
    onScroll={handleScroll}
  >
    {[
      { name: 'AC01W', description: '3.3 kW', features: 'Model No:TE-AC-01W-3.3,Rating: 3.3 kW,Single Connector,GSM/Wi-Fi/BLE', image: AC01W,details: {
          'Dimensions':'WxDxH (310 mm x 220 mm x 90 mm)',
          'Rated Power': '3.3 kW',
          'Input Voltage': '200V - 265V AC',
          'Number of Output':'1',
          'Output Current':'16 A',
          'Output charging Outlet ':'IS/IEC 60309-1:2002',
          'Operating Temperature':'-5°C to +55°C',
          'Connectivity':'Wi-Fi, GSM,Bluetooth,LED Indication',
          'Charging Operation':'QR code based/Scan code / App based authentication',
          'Mechanical Protection':'IP54',
          'Safety':'CE',
         'Mounting': 'Wall Mounted',}},  
        
          { name: 'AC02P', description: '7.4 kW ', features: 'Model No:TE-AC-02P- 7.4,Rating: 3.7 kW,Portable Charger,Plug and Play', image: AC02P7,details: {
         'Dimensions':'WxDxH (85 mm x 55 mm x 200 mm)',
          'Rated Power': '3.7 kW',
          'Input Voltage': '230V AC(100-265V)',
          'Number of Output':'1',
          'Output Current':'8 A - 16 A',
          'Output charging Outlet ':'IEC/EN 62196-2,IP54',
          'Operating Temperature':'-30°C to +50°C',
          'Connectivity':'Plug In',
          'Charging Operation':'Plug and Play',
          'Mechanical Protection':'IP66',
          'Safety':'CE,UkCA',
         'Mounting': 'Portable',}},
          { name: 'AC02WH', description: ' 7.4kW ', features: 'Model No:TE-AC-02W-7.4 H,Rating: 7.4 kW,Single Connector,GSM/Wi-Fi/BLE/4G/Ethernet or Optional', image: AC02WCH ,details: {
         'Dimensions':'WxDxH (278 mm x 152 mm x 360 mm)',
          'Rated Power': '7.4 kW',
          'Input Voltage': '230V AC',
          'Number of Output':'1',
          'Output Current':'32 A',
          'Output charging Outlet ':'Type 2 Socket,IEC/EN 62196-2,IP54',
          'Operating Temperature':'-25°C to +55°C',
          'Connectivity':'Wi-Fi, 4 G, Bluetooth,DLB,Ethernet',
          'Charging Operation':'Plug and Play',
          'Mechanical Protection':'IP65',
          'Safety':'CE,UKCA,CB,RCM',
         'Mounting': 'Wall / Pole Mount',}},
    ].map((box, index) => (
      <div key={index} className="flex flex-col items-center flex-shrink-0">
        <div
          className="bg-gray-200 p-4 sm:p-6 md:p-10 rounded-lg relative cursor-pointer hover:scale-105 transition-all duration-300 
          w-[250px] sm:w-[300px] md:w-[400px] lg:w-[550px] 
          h-[350px] sm:h-[450px] md:h-[600px] lg:h-[600px]"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex justify-center items-center w-full h-3/4">
            <img
              src={box.image}
              alt={box.name}
              className="w-3/4 h-4/4 object-cover rounded-lg mt-10 cursor-pointer"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="text-center mt-4">
          <h2 className="text-lg sm:text-xl font-bold">{box.name}</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">{box.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Arrows + Underline Section */}
<div className="relative mt-8">
  {/* Underline */}
  <div
    className="absolute bottom-0 left-0 right-0 transition-all duration-500"
    style={{
      left: '0',
      height: '2px',
      width: `${underlineWidth}%`,
      backgroundColor: underlineColor,
      transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out',
    }}
  ></div>

  {/* Arrows */}
  <div className="flex justify-end w-full absolute bottom-2 right-4 px-4">
    <button
      className="text-xl p-2 rounded-full mx-2 bg-gray-200 hover:bg-gray-300"
      onClick={() => handleArrowClick('left')}
    >
      ←
    </button>
    <button
      className="text-xl p-2 rounded-full mx-2 bg-gray-200 hover:bg-gray-300"
      onClick={() => handleArrowClick('right')}
    >
      →
    </button>
  </div>
</div>


<div className="border-t-2 border-gray-300 w-full mb-8"></div>
<section className="py-12 sm:py-16 lg:py-20 bg-white-100 mx-4 sm:mx-6 lg:mx-8 rounded-lg">
  <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
    
    {/* Left Side - Text */}
    <div className="w-full lg:w-1/2 text-center lg:text-left px-4 sm:px-6 lg:px-0">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 sm:mb-8 ">
        Not sure about the best solution for you?
      </h2>
    </div>

    {/* Right Side - Image */}
    <div className="w-full lg:w-1/3 flex justify-center items-center px-4 sm:px-6 lg:px-0 lg:flex-row-reverse ">
  <img
    src={image} // Use your actual image path
    alt="Solution Image"
    className="w-full sm:w-[80%] md:w-[70%] lg:w-[90%] max-h-[300px] object-cover rounded-xl shadow-lg-ml-50"
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

            {/* Description */}
            <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-15 xl:mt-40 px-4 sm:px-6 lg:px-8">
  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-left">
    EV Charging Solutions for Residential Sites and Businesses
  </h3>
  <div className="mt-4 sm:mt-6">
    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
      We’ll listen to your needs, identify the best approach, and then create a bespoke
    </p>
    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
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
          <div className="container mx-auto flex flex-col sm:flex-row justify-between px-8">
            {/* First Section - Experts and Client Portal */}
            <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
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
                  <li><a href="/solution" className="text-gray hover:underline text-lg">Solutions</a></li>
                  <li><a href="/contact" className="text-gray hover:underline text-lg">Contact</a></li>
                  <li><a href="/about" className="text-gray hover:underline text-lg">About</a></li>
                  <li><a href="/solutions/home-and-housing-societies" className="text-gray hover:underline text-lg">Residents</a></li>
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

      {/* FAQ Popup */}
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
              {/* <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
              <p>{popupContent.description}</p> */}
              <h3 className="text-2xl font-semibold mb-4 mt-6">Features</h3>
              <div className="flex flex-col space-y-2 mt-2">
    {popupContent.features.split(',').map((feature, index) => (
      <div key={index} className="text-md text-gray-700">
        {feature.trim()}
      </div>
    ))}
    <h3 className="text-2xl font-semibold mt-6 mb-4">Technical Specifications</h3>

{popupContent.details && (
  <div className="w-full max-h-60 overflow-y-auto">
    <table className="min-w-full text-sm sm:text-base text-left text-gray-800 border border-gray-300">
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

  </div>
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

export default ApartmentBuildingPage;