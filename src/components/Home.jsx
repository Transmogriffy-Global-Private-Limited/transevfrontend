import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VideoBackground from '../components/Videobackground';  // Import VideoBackground component
import evcharger from '../assets/ev.jpg';
import image1 from '../assets/image1.png';
import image2 from '../assets/imagee2.jpg';
 import image3 from '../assets/image.png';
 import Evimage from '../assets/hero.jpg';
import charger1 from '../assets/charger1.png';
import charger2 from '../assets/charger2.png';
import charger3 from '../assets/charger3.jpg';
import charger4 from '../assets/charger4.png';
import charger5 from '../assets/charger5.png';
import charger6 from '../assets/charger6.png';
import charger7 from '../assets/charger7.png';
import charger8 from '../assets/charger8.png';
import slider1 from '../assets/slide1.jpg';
import slider2 from '../assets/slide2.jpg';
import slider3 from '../assets/slide3.jpg';
import slider4 from '../assets/slide4.jpg';
import slider5 from '../assets/slide5.jpg';
import slider6 from '../assets/slide6.jpg';
import eo from '../assets/eo.jpg';
import easee from '../assets/easee.png';
import ctek from '../assets/ctek.png';
import garo from '../assets/garo.png';
import schneider from '../assets/schneider.png';
import slider from '../assets/slider.jpg';
import zaptec from '../assets/zaptec.png';
import newslide from '../assets/new.jpg'; 
import logo from '../assets/transev logo.png';
import woman from '../assets/woman.jpg';
import car from '../assets/car.jpg';
import mobile from '../assets/mobile.jpg';
function HomePage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
   
   const [boxNamesVisible, setBoxNamesVisible] = useState(true);
   const [scrollPosition, setScrollPosition] = useState(0);
   const [underlineWidth, setUnderlineWidth] = useState(0);
   const [underlineColor, setUnderlineColor] = useState('gray'); // Set the initial color to gray
   const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [largeImage, setLargeImage] = useState(slider1); // large image to show when clicked
   
  const [scrollLeft, setScrollLeft] = useState(0);
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
  const containerRef = useRef(null);
  // const imageSources = [slider1, slider2, slider3, slider4, slider5, slider6];
  const sliderImages = [slider,slider2, slider5, newslide, slider4, slider1];
  const smallImages = [eo,zaptec, easee, ctek, garo, schneider];
  
  
    // Start dragging (detects the start of dragging action)
    const startDrag = (e) => {
      setDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    };
  
    // Stop dragging (ends the drag action)
    const stopDrag = () => {
      setDragging(false);
    };
  
    // While dragging (calculates the current scroll position)
    const onDrag = (e) => {
      if (!dragging) return;
      const distance = e.pageX - startX;
      containerRef.current.scrollLeft = scrollLeft - distance;
    };
  
    // Handle image click to set large image on the left side
    const handleImageClick = (image) => {
      setLargeImage(image);
    };
  
   
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
   const handleArrowClick = (direction) => {
     const container = document.getElementById('box-container');
     const scrollAmount = direction === 'left' ? -350 : 350;
     container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
   };
 
     const handleScroll = () => {
      const container = document.getElementById('box-container');
      const totalScrollWidth = container.scrollWidth - container.clientWidth;
      const scrollPosition = container.scrollLeft;
      setScrollPosition(scrollPosition);
  
      // Calculate the width of the underline based on scroll position
      const newWidth = (scrollPosition / totalScrollWidth) * 100;
      setUnderlineWidth(newWidth);
  
      // Gradually change underline color from gray to black based on scroll position
      const newColor = scrollPosition > 0 ? 'black' : 'gray';
      setUnderlineColor(newColor);
    };
  
  const handleButtonClick = () => {
    // Animate and navigate to the solutions page
    document.getElementById('solutions-btn').classList.add('bg-yellow-500');
    setTimeout(() => {
      navigate('/solutions');  // Navigate to the Solutions page
    }, 500); // After animation, navigate to solutions page
  };
  const handleSectionClick = (section) => {
    // Navigate to the corresponding page based on the section clicked
    if (section === 'Apartment buildings') {
      navigate('/apartment-buildings'); // Navigate to a specific route for Apartment buildings
    } else if (section === 'Holiday parks') {
      navigate('/holiday-parks');
    } else if (section === 'Hotels') {
      navigate('/hotels');
    } else if (section === 'Workplaces') {
      navigate('/workplaces');
    }
  };
  const images = [charger1 , charger2, charger3, charger4 , charger5 , charger6 , charger7 , charger8 ];
 const imagezoom = [car,woman,mobile]

  
  return (
    <div className="relative w-full overflow-x-hidden">
      
      <div className="relative w-full h-screen">
        <VideoBackground /> 
        <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div> 

        
        <Navbar />

       
         <div className="absolute top-1/4 right-160 transform -translate-x-1/6 text-white space-y-6 pr-16 w-full text-right">
       <h1 className="font-aeonik text-9xl  leading-tight tracking-wide">
      
            Get set for an <br /> electric future
          </h1> 
 
        <div className="relative inline-block">
           <button
            id="solutions-btn"
            onClick={handleButtonClick}
            className="flex items-center justify-center px-15 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-yellow-300 hover:text-white mr-100"
          >
            <span className="mr-10">Our Solutions</span>
            <div className="w-15 h-15 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-12 group-hover:h-12 ml-4 ">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
            </div>
          </button>
        </div>


          
        <p class="text-5xl mr-55 mt-10">
  <span class="block mr-25">Powering peace of mind</span>
  <span class="block">through tailored EV charging</span>
  <span class="block mr-105">solutions.</span>
  <span class="ml-670 text-xl text-white cursor-pointer inline-flex items-center  ">
  Explore
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6 ml-3 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 15l-7 7-7-7"
    />
  </svg>
</span>
</p>
       </div>
      </div>

      {/* Non-Video Content Section 1 */}
<div className="flex justify-between p-16 mt-10 bg-white">
  <div className="w-2/2 pr-8"> {/* Added padding-right for spacing */}
 

<h2 className="text-7xl font-normal leading-tight max-w-screen-lg mx-auto">
  Future-proof your residential <br />
  site or business with our <br />
  <span className="font-normal">scalable EV charging solutions.</span>
</h2>




  </div>
  
  <div className="w-1/3 ">
  {/* Image with padding and rounded corners */}
  <img src={evcharger} alt="EV Charging" className="w-full h-auto rounded-xl" />
</div>

</div>

<div className="p-16">
 
  <h3 className="text-2xl font-bold text-left">
    Charging solutions for
  </h3>
</div>
 
    <div className="space-y-0 bg-white-100 pl-8 pr-8">
      {['Apartment buildings', 'Holiday parks', 'Hotels', 'Workplaces'].map((section, index) => (
        <div
          key={index}
          className={`relative flex justify-between p-16 transition-all duration-300
            ${hovered === index ? 'bg-yellow-200' : ''} 
            border-t border-gray-400 cursor-pointer`}  
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleSectionClick(section)} 
        >
      
    
          <div
            className={`w-1/4 flex items-center space-x-4 transition-all duration-300 transform ${
              hovered === index ? 'translate-x-10' : 'translate-x-0'
            }`}
          >
            <span className="text-7xl font-aeonik text-black">{`0${index + 1}`}</span>
          </div>

      
          <div className="w-1/2 flex items-center justify-center">
            <h2
              className={`text-7xl font-aeonik transition-all duration-300 ${
                hovered === index ? 'text-black' : 'text-gray-800'
              }`}
            >
              {section}
            </h2>
          </div>
          <div className="w-1/4 flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-black transition-transform duration-300"
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

       
            <div
            className={`absolute bottom-0 left-0 w-full h-0 bg-gray-300 transform transition-all duration-500
              ${hovered === index ? 'scale-y-100 translate-y-0' : 'scale-y-0 translate-y-2'}`}
          />
        </div> 
         
      ))}
    </div>
 
   
<>
 <style>
   {`
  {/* Keyframes for fade in and fade out without sliding or zooming */}
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .image-slider-wrapper {
    overflow: hidden;
    position: relative;
  }

  .image-slider {
    display: flex;
    position: relative;
  }

  .image-slide {
    flex: 0 0 100%; /* Each slide takes full width */
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 1s ease;
  }

  .image-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease;
    border-radius: 15px;
  }
     `}
</style>
<div className="flex justify-between p-16 space-x-8">
      <div className="w-full space-y-4 relative overflow-hidden image-slider-wrapper">
        {/* Image container with fade-in and fade-out effect */}
        <div className="image-slider w-full h-[900px] relative">
          {imagezoom.map((image, index) => (
            <div
              key={index}
              className={`image-slide  flex-shrink-0 opacity-0 absolute transition-opacity duration-1000 ease-in-out`}
              style={{
                animation: `fadeInOut 15s infinite ${index * 3}s`, // Adjust timing here
              }}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="w-full h-full object-cover transition-opacity duration-1000 ease-out"
                style={{
                  borderRadius: '15px',
                }}
              />
            </div>
          ))}
        </div>
      </div>
  
  <div className="w-1/2 flex flex-col justify-start mr-30">

  <h3 className="text-xl font-semibold mb-2">How we can help</h3>

 
  <div className="space-y-6 mt-20">
 
  {['Expertise', 'Guidance', 'Support'].map((item, index) => (
    <div
      key={index}
      className="text-7xl font-aeonik text-gray-500 cursor-pointer group hover:text-black"
    >
      <span className="relative inline-block group">
        {item}
     
        <span
          className="absolute bottom-0 left-0 w-0 h-[4px] bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:bg-black "
        />
      </span>
    </div>
  ))}


 

<div className="flex justify-between items-center p-16 mt-50 mr-70">
  <div className="w-1/2 relative">
    {/* First h2 and p */}
    <div className="pair pair-1 absolute top-0 left-0">
      <h2 className="text-2xl font-bold animate-slide-up-text">A consultative approach</h2>
      <p className="text-lg mt-4 animate-slide-up-text w-[600px]">
        We work closely with you throughout the design and <br />
        installation process to ensure the infrastructure meets your <br />
        unique requirements.
      </p>
    </div>

    {/* Second h2 and p */}
    <div className="pair pair-2 absolute top-0 left-0">
      <h2 className="text-2xl font-bold animate-slide-up-text">Ongoing management and maintenance</h2>
      <p className="text-lg mt-4 animate-slide-up-text w-[600px]">
        We can take care of all ongoing operations, including <br />
        maintenance and customer service, so there's no need for your <br />
        day-to-day involvement.
      </p>
    </div>

    {/* Third h2 and p */}
    <div className="pair pair-3 absolute top-0 left-0">
      <h2 className="text-2xl font-bold animate-slide-up-text">Leaders in residential EV charging solutions</h2>
      <p className="text-lg mt-4 animate-slide-up-text w-[600px]">
        Backed by the UK Government's Charging Infrastructure <br />
        Investment Fund (CIIF), Energy Park brings you a team of highly <br />
        trained professionals.
      </p>
    </div>
  </div>
</div>

<style>
  {`
    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(50px); /* Start from 50px below */
      }
      100% {
        opacity: 1;
        transform: translateY(0); /* End at the normal position */
      }
    }

    .animate-slide-up-text {
      animation: slideUp 1s ease-out;
      opacity: 0;
      animation-fill-mode: forwards; /* Keep the final state after animation ends */
    }

    .pair {
      opacity: 0;
      visibility: hidden;
      animation: showText 9s ease-in-out infinite;
    }

    /* Show and hide the text pairs with different delays to create the cycle */
    .pair-1 {
      animation-delay: 0s;
    }

    .pair-2 {
      animation-delay: 3s;
    }

    .pair-3 {
      animation-delay: 6s;
    }

    /* Control visibility and position of the pairs */
    @keyframes showText {
      0%, 33.33% {
        opacity: 1;
        visibility: visible;
        transform: translateY(0); /* Start at the normal position */
      }
      33.34%, 100% {
        opacity: 0;
        visibility: hidden;
        transform: translateY(50px); /* Slide out to the bottom */
      }
    }
  `}
</style>
</div>
</div>
</div>
</>
<div className="relative mt-16 rounded-xl overflow-hidden">
 
    <div className="w-full h-220 relative rounded-xl overflow-hidden px-4">
  <img 
    src={Evimage} 
    alt="Full Image" 
    className="w-full h-full object-cover rounded-xl"
  />


    
    {/* Text & Button Section inside the Image */}
    <div className="absolute top-70 left-0 w-full h-full flex items-center justify-between p-8 text-white ">
      {/* Left Side Text */}
    <div className="space-y-0 max-w-400 ml-4">
  <h2 className="text-7xl font-aeonik leading-tight">Smart EV Charging Solutions</h2>
  <h2 className="text-7xl font-aeonik mt-4">For residential sites and businesses</h2>


</div> 
 


{/* Right Side Button */}
      <div className="flex items-center justify-center">
        <button
          id="solutions-btn"
          onClick={handleButtonClick}
          className="flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-yellow-300 hover:text-white"
        >
          <span className="mr-2">Our Solutions</span>
          <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-8 group-hover:h-8 ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-1"
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

 
 <div className="mt-40 text-center p-8 ml-200 mb-10">
  <h3 className="text-7xl font-aeonik">We Offer a range of charge</h3>
  
 
    <p className="text-7xl font-aeonik mr-30">Points to choose from.</p>
  </div>
</div> 


<div className="flex justify-center items-center mb-8">
  <div
    id="box-container"
    className="flex overflow-x-auto gap-8 py-8 pl-12 pr-16 relative"
    style={{
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none', // Hide the scrollbar (works in Firefox)
      msOverflowStyle: 'none', // Hide the scrollbar (works in IE and Edge)
    }}
    onScroll={handleScroll} // Handle the scroll event to update the underline width and color
  >
    {[
      { name: 'Zaptec Go', description: 'Up to 7.4kW charging speed', features: 'Up to 22kW charging speed',image: charger1 },
      { name: 'EO Mini Pro 3', description: 'Up to 7.4kW charging speed',features: 'Up to 22kW charging speed', image: charger2 },
      { name: 'Easee One', description: 'Up to 7.4kW charging speed',features: 'Up to 22kW charging speed', image: charger7 },
      { name: 'EO Genius 2', description: '7.2kW and 22kW variants',features: 'Up to 22kW charging speed', image: charger4 },
      { name: 'Zaptec Pro', description: 'Up to 22kW charging speed',features: 'Up to 22kW charging speed', image: charger5 },
      { name: 'Easee Charge', description: 'Up to 22kW charging speed',features: 'Up to 22kW charging speed', image: charger6},
      { name: 'Garo Entity Pro', description: 'Up to 22kW charging speed',features: 'Up to 22kW charging speed', image: charger7 },
      { name: 'Schneider EVlink Pro AC', description: '7.2kW, 11kW and 22kW variants',features: 'Up to 22kW charging speed', image: charger8 },
    ].map((box, index) => (
      <div key={index} className="flex flex-col items-center">
        <div
          className="box bg-gray-200 p-16 rounded-lg relative cursor-pointer hover:scale-105 transform transition-all duration-300 w-[550px] h-[800px]"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex justify-center items-center w-full h-3/4">
            <img
              src={box.image} // Dynamically assign images from the array
              alt={box.name}
              className="w-3/4 h-3/4 object-cover rounded-lg mt-20 cursor-pointer"
              onClick={() => handlePopupOpen(box.image, box.description,box.features)}
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
              onClick={() => handlePopupOpen(box.image, box.description,box.features)}
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
  
        {/* Always Visible Underline Below Boxes */}
        <div className="relative mt-16">
  {/* Underline Section */}
  <div
    className="absolute bottom-0 left-0 right-0 transition-all duration-500"
    style={{
      left: '12%',
      right: '16%',
      height: '2px',
      width: `${underlineWidth}%`, // Dynamically set the width based on scroll position
      backgroundColor: underlineColor, // Color changes based on scroll position
      transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out',
      paddingRight: '50px',
    }}
  ></div>

  {/* Arrow Buttons Section */}
  <div className="flex justify-between w-full absolute bottom-2 px-4">
    <button
      className="text-xl p-2 rounded-full mx-4 ml-430"
      onClick={() => handleArrowClick('left')}
    >
      ←
    </button>
    <button
      className="text-xl p-2 rounded-full mx-4 mr-30"
      onClick={() => handleArrowClick('right')}
    >
      →
    </button>
  </div>
</div>

{/* Next Section */}
<div class="flex justify-between items-center p-5 mt-50">
  <div class="text-xl font-aeonik  font-bold mr-10">
    We partner with the best.
  </div>
  <div class="text-6xl mr-20 font-aeonik">
  Working with leading <span class="block">equipment manufacturers gives</span> 
  <span class="block"> us access to a wide range of</span> 
  
  <span class="block">hardware solutions.</span>
</div>

</div>



    {/* Image Carousel Section */}
    <div className="relative w-full mt-15 ">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-scroll px-8 py-8 justify-start items-center cursor-grab scrollbar-none ml-10 "
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Image Container for Carousel */}
          <div className="flex gap-8">
            {sliderImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[720px] h-[600px] relative rounded-lg overflow-hidden border-4 border-gray-300 hover:scale-105 transition-transform ease-in-out"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
                {/* Smaller Image inside the large image */}
                <div className="absolute bottom-2 left-2 w-[220px] h-[100px] border-2 border-gray-300 overflow-hidden rounded-lg ml-5 mb-15">
                  <img
                    src={smallImages[index]}
                    alt={`Small Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 pb-8">
         <div className="flex justify-between">
          <div className="text-xl font-semibold ml-12 font-aeonik">Drag Slider</div>
          <div className="text-xl mr-140">
          <h2 className="text-xl font-aeonik text-left font-semibold">
  EV Charging Solutions for Residential Sites and Businesses
</h2>

</div>
</div>
<div className="mt-4 text-lg text-right mr-140 text-gray-500 font-aeonik">
  We work with a select group of leading equipment manufacturers, <br />
  so we have access to a wide range of hardware solutions. <br />
  This means we can always find the best fit for your project.
</div>
</div>
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
<div className="mt-55">
  {/* Heading: Bold and left-aligned */}
  <h3 className="text-2xl font-bold text-left text-gray-800">
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

    <div className="bg-white-50 py-16">
      {/* Contact Section */}
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
            <div className="text-center mt-8 text-lg mr-310">
              <p>&copy; TransEv 2025. All Rights Reserved.</p>
            </div>
          </footer>
    </div>

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
  );
};

export default HomePage;


