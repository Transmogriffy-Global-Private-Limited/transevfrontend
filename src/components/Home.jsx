// import React, { useState,useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import VideoBackground from '../components/Videobackground';  // Import VideoBackground component
// import evcharger from '../assets/ev.jpg';
// import image1 from '../assets/image1.png';
// import image2 from '../assets/imagee2.jpg';
//  import image3 from '../assets/image.png';
//  import Evimage from '../assets/hero.jpg';
// import charger1 from '../assets/charger1.png';
// import charger2 from '../assets/charger2.png';
// import charger3 from '../assets/charger3.jpg';
// import charger4 from '../assets/charger4.png';
// import charger5 from '../assets/charger5.png';
// import charger6 from '../assets/charger6.png';
// import charger7 from '../assets/charger7.png';
// import charger8 from '../assets/charger8.png';
// import slider1 from '../assets/slide1.jpg';
// import slider2 from '../assets/slide2.jpg';
// import slider3 from '../assets/slide3.jpg';
// import slider4 from '../assets/slide4.jpg';
// import slider5 from '../assets/slide5.jpg';
// import slider6 from '../assets/slide6.jpg';
// import eo from '../assets/eo.jpg';
// import easee from '../assets/easee.png';
// import ctek from '../assets/ctek.png';
// import garo from '../assets/garo.png';
// import schneider from '../assets/schneider.png';
// import slider from '../assets/slider.jpg';
// import zaptec from '../assets/zaptec.png';
// import newslide from '../assets/new.jpg'; 
// import logo from '../assets/transev logo.png';
// import woman from '../assets/woman.jpg';
// import car from '../assets/car.jpg';
// import mobile from '../assets/mobile.jpg';
// function HomePage() {
//   const navigate = useNavigate();
//   const [hovered, setHovered] = useState(null);
//   const [popupOpen, setPopupOpen] = useState(false);
   
//    const [boxNamesVisible, setBoxNamesVisible] = useState(true);
//    const [scrollPosition, setScrollPosition] = useState(0);
//    const [underlineWidth, setUnderlineWidth] = useState(0);
//    const [underlineColor, setUnderlineColor] = useState('gray'); // Set the initial color to gray
//    const [currentIndex, setCurrentIndex] = useState(0);
//   const [dragging, setDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [currentTranslate, setCurrentTranslate] = useState(0);
//   const [largeImage, setLargeImage] = useState(slider1); // large image to show when clicked
   
//   const [scrollLeft, setScrollLeft] = useState(0);
//  const [popupContent, setPopupContent] = useState({
//     image: '',
//     description: '',
//     features: ''
//   });

//   const handlePopupOpen = (image, description, features) => {
//     setPopupContent({ image, description, features });
//     setPopupOpen(true);
//   };

//   const handlePopupClose = () => {
//     setPopupOpen(false);
//   };

//   const handleBuyNowClick = () => {
//     // Handle login or any other logic for "Buy Now"
//     // Redirecting to login page for now (you can change this logic based on your app)
//     window.location.href = '/login'; // Redirect to login page
//   };
//   const containerRef = useRef(null);
//   // const imageSources = [slider1, slider2, slider3, slider4, slider5, slider6];
//   const sliderImages = [slider,slider2, slider5, newslide, slider4, slider1];
//   const smallImages = [eo,zaptec, easee, ctek, garo, schneider];
  
  
//     // Start dragging (detects the start of dragging action)
//     const startDrag = (e) => {
//       setDragging(true);
//       setStartX(e.pageX - containerRef.current.offsetLeft);
//       setScrollLeft(containerRef.current.scrollLeft);
//     };
  
//     // Stop dragging (ends the drag action)
//     const stopDrag = () => {
//       setDragging(false);
//     };
  
//     // While dragging (calculates the current scroll position)
//     const onDrag = (e) => {
//       if (!dragging) return;
//       const distance = e.pageX - startX;
//       containerRef.current.scrollLeft = scrollLeft - distance;
//     };
  
//     // Handle image click to set large image on the left side
//     const handleImageClick = (image) => {
//       setLargeImage(image);
//     };
  
   
//    const handleContactClick = () => {
//     // Get the button element by id
//     const button = document.getElementById('contact-btn');
    
//     // Add background color change on button click
//     button.classList.add('bg-yellow-500'); // Add a background color

//     // After a small delay (for animation), navigate to the contact page
//     setTimeout(() => {
//       navigate('/contact');  // Navigate to the Contact page
//     }, 500); // Delay to allow animation to complete
//   };
//    const handleArrowClick = (direction) => {
//      const container = document.getElementById('box-container');
//      const scrollAmount = direction === 'left' ? -350 : 350;
//      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//    };
 
//      const handleScroll = () => {
//       const container = document.getElementById('box-container');
//       const totalScrollWidth = container.scrollWidth - container.clientWidth;
//       const scrollPosition = container.scrollLeft;
//       setScrollPosition(scrollPosition);
  
//       // Calculate the width of the underline based on scroll position
//       const newWidth = (scrollPosition / totalScrollWidth) * 100;
//       setUnderlineWidth(newWidth);
  
//       // Gradually change underline color from gray to black based on scroll position
//       const newColor = scrollPosition > 0 ? 'black' : 'gray';
//       setUnderlineColor(newColor);
//     };
  
//   const handleButtonClick = () => {
//     // Animate and navigate to the solutions page
//     document.getElementById('solutions-btn').classList.add('bg-yellow-500');
//     setTimeout(() => {
//       navigate('/solution');  // Navigate to the Solutions page
//     }, 500); // After animation, navigate to solutions page
//   };
//   const handleSectionClick = (section) => {
//     // Navigate to the corresponding page based on the section clicked
//     if (section === 'Home and Housing Societies') {
//       navigate('/solutions/home-and-housing-societies'); // Navigate to a specific route for Apartment buildings
//     } else if (section === 'Office and Workplace') {
//       navigate('/solutions/office-and-workplace');
//     } else if (section === 'Public Places') {
//       navigate('/solutions/public-places');
//     } else if (section === 'Fleet Organizations') {
//       navigate('/solutions/fleet-organization');
//     }
//   };
//   const images = [charger1 , charger2, charger3, charger4 , charger5 , charger6 , charger7 , charger8 ];
//  const imagezoom = [car,woman,mobile]

  
//   return (
//     <div className="relative w-full overflow-x-hidden">
      
//       <div className="relative w-full h-screen">
//         <VideoBackground /> 
//         <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div> 

        
//         <Navbar />

       
//          <div className="absolute top-1/4 right-160 transform -translate-x-1/6 text-white space-y-6 pr-16 w-full text-right">
//        <h1 className="font-aeonik text-9xl  leading-tight tracking-wide">
      
//             Unleash the Power, <br /> Charge Beyond Boundaries
//           </h1> 
 
//         <div className="relative inline-block">
//            <button
//             id="solutions-btn"
//             onClick={handleButtonClick}
//             className="flex items-center justify-center px-15 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-yellow-300 hover:text-white mr-100"
//           >
//             <span className="mr-10">Our Solutions</span>
//             <div className="w-15 h-15 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-12 group-hover:h-12 ml-4 ">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-1"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//     </svg>
//             </div>
//           </button>
//         </div>


          
//         <p class="text-5xl mr-55 mt-10">
//   <span class="block mr-25">Powering peace of mind</span>
//   <span class="block">through tailored EV charging</span>
//   <span class="block mr-105">solutions.</span>
//   <span class="ml-670 text-xl text-white cursor-pointer inline-flex items-center  ">
//   Explore
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     class="w-6 h-6 ml-3 text-white"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       stroke-width="2"
//       d="M19 15l-7 7-7-7"
//     />
//   </svg>
// </span>
// </p>
//        </div>
//       </div>

//       {/* Non-Video Content Section 1 */}
// <div className="flex justify-between p-16 mt-10 bg-white">
//   <div className="w-2/2 pr-8"> {/* Added padding-right for spacing */}
 

// <h2 className="text-7xl font-normal leading-tight max-w-screen-lg mx-auto">
//   Future-proof your residential <br />
//   site or business with our <br />
//   <span className="font-normal">scalable EV charging solutions.</span>
// </h2>




//   </div>
  
//   <div className="w-1/3 ">
//   {/* Image with padding and rounded corners */}
//   <img src={evcharger} alt="EV Charging" className="w-full h-auto rounded-xl" />
// </div>

// </div>

// <div className="p-16">
 
//   <h3 className="text-2xl font-bold text-left">
//     Charging solutions for
//   </h3>
// </div>
 
//     <div className="space-y-0 bg-white-100 pl-8 pr-8">
//       {['Home and Housing Societies', 'Office and Workplace', 'Public Places', 'Fleet Organizations'].map((section, index) => (
//         <div
//           key={index}
//           className={`relative flex justify-between p-16 transition-all duration-300
//             ${hovered === index ? 'bg-yellow-200' : ''} 
//             border-t border-gray-400 cursor-pointer`}  
//           onMouseEnter={() => setHovered(index)}
//           onMouseLeave={() => setHovered(null)}
//           onClick={() => handleSectionClick(section)} 
//         >
      
    
//           <div
//             className={`w-1/4 flex items-center space-x-4 transition-all duration-300 transform ${
//               hovered === index ? 'translate-x-10' : 'translate-x-0'
//             }`}
//           >
//             <span className="text-6xl font-aeonik text-black">{`0${index + 1}`}</span>
//           </div>

      
//           <div className="w-1/2 flex items-center justify-center">
//             <h2
//               className={`text-6xl font-aeonik transition-all duration-300 ${
//                 hovered === index ? 'text-black' : 'text-gray-800'
//               }`}
//             >
//               {section}
//             </h2>
//           </div>
//           <div className="w-1/4 flex items-center justify-end">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-20 h-20 text-black transition-transform duration-300"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 7l5 5m0 0l-5 5m5-5H6"
//               />
//             </svg>
//           </div>

       
//             <div
//             className={`absolute bottom-0 left-0 w-full h-0 bg-gray-300 transform transition-all duration-500
//               ${hovered === index ? 'scale-y-100 translate-y-0' : 'scale-y-0 translate-y-2'}`}
//           />
//         </div> 
         
//       ))}
//     </div>
 
   
// <>
//  <style>
//    {`
//   {/* Keyframes for fade in and fade out without sliding or zooming */}
//   @keyframes fadeInOut {
//     0% {
//       opacity: 0;
//     }
//     20% {
//       opacity: 1;
//     }
//     80% {
//       opacity: 1;
//     }
//     100% {
//       opacity: 0;
//     }
//   }

//   .image-slider-wrapper {
//     overflow: hidden;
//     position: relative;
//   }

//   .image-slider {
//     display: flex;
//     position: relative;
//   }

//   .image-slide {
//     flex: 0 0 100%; /* Each slide takes full width */
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     transition: opacity 1s ease;
//   }

//   .image-slide img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: opacity 0.5s ease;
//     border-radius: 15px;
//   }
//      `}
// </style>
// <div className="flex justify-between p-16 space-x-8">
//       <div className="w-full space-y-4 relative overflow-hidden image-slider-wrapper">
//         {/* Image container with fade-in and fade-out effect */}
//         <div className="image-slider w-full h-[900px] relative">
//           {imagezoom.map((image, index) => (
//             <div
//               key={index}
//               className={`image-slide  flex-shrink-0 opacity-0 absolute transition-opacity duration-1000 ease-in-out`}
//               style={{
//                 animation: `fadeInOut 15s infinite ${index * 3}s`, // Adjust timing here
//               }}
//             >
//               <img
//                 src={image}
//                 alt={`Image ${index + 1}`}
//                 loading="lazy"
//                 decoding="async"
//                 draggable="false"
//                 className="w-full h-full object-cover transition-opacity duration-1000 ease-out"
//                 style={{
//                   borderRadius: '15px',
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
  
//   <div className="w-1/2 flex flex-col justify-start mr-30">

//   <h3 className="text-xl font-semibold mb-2">How we can help</h3>

 
//   <div className="space-y-6 mt-20">
 
//   {['Expertise', 'Guidance', 'Support'].map((item, index) => (
//     <div
//       key={index}
//       className="text-7xl font-aeonik text-gray-500 cursor-pointer group hover:text-black"
//     >
//       <span className="relative inline-block group">
//         {item}
     
//         <span
//           className="absolute bottom-0 left-0 w-0 h-[4px] bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:bg-black "
//         />
//       </span>
//     </div>
//   ))}


 

// <div className="flex justify-between items-center p-16 mt-50 mr-70">
//   <div className="w-1/2 relative">
//     {/* First h2 and p */}
//     <div className="pair pair-1 absolute top-0 left-0">
//       <h2 className="text-2xl font-bold animate-slide-up-text">A consultative approach</h2>
//       <p className="text-lg mt-4 animate-slide-up-text w-[600px]">
//         We work closely with you throughout the design and <br />
//         installation process to ensure the infrastructure meets your <br />
//         unique requirements.
//       </p>
//     </div>

//     {/* Second h2 and p */}
//     <div className="pair pair-2 absolute top-0 left-0">
//       <h2 className="text-2xl font-bold animate-slide-up-text">Ongoing management and maintenance</h2>
//       <p className="text-lg mt-4 animate-slide-up-text w-[600px]">
//         We can take care of all ongoing operations, including <br />
//         maintenance and customer service, so there's no need for your <br />
//         day-to-day involvement.
//       </p>
//     </div>

//     {/* Third h2 and p */}
//     <div className="pair pair-3 absolute top-0 left-0">
//       <h2 className="text-2xl font-bold animate-slide-up-text">Leaders in residential EV charging solutions</h2>
//       <p className="text-lg mt-4 animate-slide-up-text w-[600px]">
//         Backed by the UK Government's Charging Infrastructure <br />
//         Investment Fund (CIIF), Energy Park brings you a team of highly <br />
//         trained professionals.
//       </p>
//     </div>
//   </div>
// </div>

// <style>
//   {`
//     @keyframes slideUp {
//       0% {
//         opacity: 0;
//         transform: translateY(50px); /* Start from 50px below */
//       }
//       100% {
//         opacity: 1;
//         transform: translateY(0); /* End at the normal position */
//       }
//     }

//     .animate-slide-up-text {
//       animation: slideUp 1s ease-out;
//       opacity: 0;
//       animation-fill-mode: forwards; /* Keep the final state after animation ends */
//     }

//     .pair {
//       opacity: 0;
//       visibility: hidden;
//       animation: showText 9s ease-in-out infinite;
//     }

//     /* Show and hide the text pairs with different delays to create the cycle */
//     .pair-1 {
//       animation-delay: 0s;
//     }

//     .pair-2 {
//       animation-delay: 3s;
//     }

//     .pair-3 {
//       animation-delay: 6s;
//     }

//     /* Control visibility and position of the pairs */
//     @keyframes showText {
//       0%, 33.33% {
//         opacity: 1;
//         visibility: visible;
//         transform: translateY(0); /* Start at the normal position */
//       }
//       33.34%, 100% {
//         opacity: 0;
//         visibility: hidden;
//         transform: translateY(50px); /* Slide out to the bottom */
//       }
//     }
//   `}
// </style>
// </div>
// </div>
// </div>
// </>
// <div className="relative mt-16 rounded-xl overflow-hidden">
 
//     <div className="w-full h-220 relative rounded-xl overflow-hidden px-4">
//   <img 
//     src={Evimage} 
//     alt="Full Image" 
//     className="w-full h-full object-cover rounded-xl"
//   />


    
//     {/* Text & Button Section inside the Image */}
//     <div className="absolute top-70 left-0 w-full h-full flex items-center justify-between p-8 text-white ">
//       {/* Left Side Text */}
//     <div className="space-y-0 max-w-400 ml-4">
//   <h2 className="text-7xl font-aeonik leading-tight">Smart EV Charging Solutions</h2>
//   <h2 className="text-7xl font-aeonik mt-4">For residential sites and businesses</h2>


// </div> 
 


// {/* Right Side Button */}
//       <div className="flex items-center justify-center">
//         <button
//           id="solutions-btn"
//           onClick={handleButtonClick}
//           className="flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-yellow-300 hover:text-white"
//         >
//           <span className="mr-2">Our Solutions</span>
//           <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-8 group-hover:h-8 ml-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//             </svg>
//           </div>
//         </button>
//       </div>
//     </div>
//   </div>

 
//  <div className="mt-40 text-center p-8 ml-200 mb-10">
//   <h3 className="text-7xl font-aeonik">We Offer a range of charge</h3>
  
 
//     <p className="text-7xl font-aeonik mr-30">Points to choose from.</p>
//   </div>
// </div> 


// <div className="flex justify-center items-center mb-8">
//   <div
//     id="box-container"
//     className="flex overflow-x-auto gap-8 py-8 pl-12 pr-16 relative"
//     style={{
//       scrollBehavior: 'smooth',
//       scrollbarWidth: 'none',
//       msOverflowStyle: 'none', 
//     }}
//     onScroll={handleScroll} 
//   >
//     {[
//       { name: 'Zaptec Go', description: 'Up to 7.4kW charging speed', features: 'Up to 22kW charging speed',image: charger1 },
//       { name: 'EO Mini Pro 3', description: 'Up to 7.4kW charging speed',features: 'Up to 22kW charging speed', image: charger2 },
//       { name: 'Easee One', description: 'Up to 7.4kW charging speed',features: 'Up to 22kW charging speed', image: charger7 },
//       { name: 'EO Genius 2', description: '7.2kW and 22kW variants',features: 'Up to 22kW charging speed', image: charger4 },
//       { name: 'Zaptec Pro', description: 'Up to 22kW charging speed',features: 'Up to 22kW charging speed', image: charger5 },
//       { name: 'Easee Charge', description: 'Up to 22kW charging speed',features: 'Up to 22kW charging speed', image: charger6},
//       { name: 'Garo Entity Pro', description: 'Up to 22kW charging speed',features: 'Up to 22kW charging speed', image: charger7 },
//       { name: 'Schneider EVlink Pro AC', description: '7.2kW, 11kW and 22kW variants',features: 'Up to 22kW charging speed', image: charger8 },
//     ].map((box, index) => (
//       <div key={index} className="flex flex-col items-center">
//         <div
//           className="box bg-gray-200 p-16 rounded-lg relative cursor-pointer hover:scale-105 transform transition-all duration-300 w-[550px] h-[800px]"
//           onMouseEnter={() => setHovered(index)}
//           onMouseLeave={() => setHovered(null)}
//         >
//           <div className="flex justify-center items-center w-full h-3/4">
//             <img
//               src={box.image} 
//               alt={box.name}
//               className="w-3/4 h-3/4 object-cover rounded-lg mt-20 cursor-pointer"
//               onClick={() => handlePopupOpen(box.image, box.description,box.features)}
//             />
//           </div>

//           <div
//             className={`absolute top-4 right-4 bg-yellow-300 w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300 ${hovered === index ? 'opacity-100' : 'opacity-0'}`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6 text-black transition-transform duration-300"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               onClick={() => handlePopupOpen(box.image, box.description,box.features)}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 7l5 5m0 0l-5 5m5-5H6"
//               />
//             </svg>
//           </div>
//         </div>

       
//         <div className="text-center mt-4">
//           <h2 className="text-xl font-bold">{box.name}</h2>
//           <p className="text-gray-600 mt-2">{box.description}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
  
       
//         <div className="relative mt-16">
  
//   <div
//     className="absolute bottom-0 left-0 right-0 transition-all duration-500"
//     style={{
//       left: '12%',
//       right: '16%',
//       height: '2px',
//       width: `${underlineWidth}%`, 
//       backgroundColor: underlineColor,
//       transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out',
//       paddingRight: '50px',
//     }}
//   ></div>

  
//   <div className="flex justify-between w-full absolute bottom-2 px-4">
//     <button
//       className="text-xl p-2 rounded-full mx-4 ml-430"
//       onClick={() => handleArrowClick('left')}
//     >
//       ←
//     </button>
//     <button
//       className="text-xl p-2 rounded-full mx-4 mr-30"
//       onClick={() => handleArrowClick('right')}
//     >
//       →
//     </button>
//   </div>
// </div>


// <div class="flex justify-between items-center p-5 mt-50">
//   <div class="text-xl font-aeonik  font-bold mr-10">
//     We partner with the best.
//   </div>
//   <div class="text-6xl mr-20 font-aeonik">
//   Working with leading <span class="block">equipment manufacturers gives</span> 
//   <span class="block"> us access to a wide range of</span> 
  
//   <span class="block">hardware solutions.</span>
// </div>

// </div>



   
//     <div className="relative w-full mt-15 ">
//         <div
//           ref={containerRef}
//           className="flex gap-4 overflow-x-scroll px-8 py-8 justify-start items-center cursor-grab scrollbar-none ml-10 "
//           onMouseDown={startDrag}
//           onMouseMove={onDrag}
//           onMouseUp={stopDrag}
//           onMouseLeave={stopDrag}
//           style={{ scrollBehavior: "smooth" }}
//         >
        
//           <div className="flex gap-8">
//             {sliderImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 w-[720px] h-[600px] relative rounded-lg overflow-hidden border-4 border-gray-300 hover:scale-105 transition-transform ease-in-out"
//               >
//                 <img
//                   src={image}
//                   alt={`Image ${index + 1}`}
//                   className="object-cover w-full h-full cursor-pointer"
//                   onClick={() => handleImageClick(image)}
//                 />
              
//                 <div className="absolute bottom-2 left-2 w-[220px] h-[100px] border-2 border-gray-300 overflow-hidden rounded-lg ml-5 mb-15">
//                   <img
//                     src={smallImages[index]}
//                     alt={`Small Image ${index + 1}`}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 pb-8">
//          <div className="flex justify-between">
//           <div className="text-xl font-semibold ml-12 font-aeonik">Drag Slider</div>
//           <div className="text-xl mr-140">
//           <h2 className="text-xl font-aeonik text-left font-semibold">
//   EV Charging Solutions for Residential Sites and Businesses
// </h2>

// </div>
// </div>
// <div className="mt-4 text-lg text-right mr-140 text-gray-500 font-aeonik">
//   We work with a select group of leading equipment manufacturers, <br />
//   so we have access to a wide range of hardware solutions. <br />
//   This means we can always find the best fit for your project.
// </div>
// </div>
// <div className="w-full h-screen bg-white flex justify-center items-center mt-30">
//   <div className="w-full h-full max-w-screen-3xl bg-gradient-to-r p-10"> 
//   <div className="w-full h-full bg-gradient-to-b from-yellow-200 via-yellow-200 to-red-300 rounded-3xl p-12 shadow-lg max-w-screen-3xl mx-auto">
     
//       <h2 className="text-9xl font-semibold text-gray-800 text-center font-aeonik">
//   <span className="block mr-240">Ready to get</span>
//   <span className="block mr-300">started?</span>
// </h2>
// <div className="flex items-center justify-center">

//   <button
//     id="contact-btn"
//     onClick={handleContactClick}
//     className="flex items-center justify-center px-12 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white w-auto h-auto mr-330 mt-20"
//   >
   

//   <span className="mr-20 text-lg" >Contact Us</span>
//   <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white ml-4">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-6 h-6 text-white transition-transform duration-300 group-hover:text-black group-hover:translate-x-1"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//     </svg>
//   </div>
// </button>

// </div>
// <div className="mt-55">
  
//   <h3 className="text-2xl font-bold text-left text-gray-800">
//     EV Charging Solutions for Residential Sites and Businesses
//   </h3>

 
//   <div className="mt-4">
   
//     <p className="text-lg text-gray-600 leading-relaxed">
//       We’ll listen to your needs, identify the best approach,
//     </p>
//     <p className="text-lg text-gray-600 leading-relaxed">
//       and then create a bespoke smart EV charging solution that’s right for you.
//     </p>
//   </div>
// </div>


//     </div>
//   </div>
// </div>

//     <div className="bg-white-50 py-16">
    
//       <div className="container mx-auto flex justify-between items-center px-8">
      
//         <div className="flex items-center space-x-4">
//           <img src={logo} alt="Company Logo" className="w-32 h-32" />
         
//         </div>

       
//         <div className="text-right">
         
//           <div className="text-5xl font-semibold text-gray-800 mb-4 mr-80">
//             <a
//               href="tel:+02033453310"
//               className="relative inline-block hover:text-black-500"
//             >
//               <span className="hover:underline transition-all duration-300">033-4601 5366</span>
//             </a>
//           </div>

        
//           <div className="text-5xl font-semibold text-gray-800">
//             <a
//               href="mailto:enquiries@energy-park.co.uk"
//               className="relative inline-block hover:text-black-500"
//             >
//               <span className="hover:underline transition-all duration-300 mt-2 mr-60">tgwbin@gmail.com</span>
//             </a>
//           </div>
//         </div>
//       </div>

      
//       <div className="mt-10 border-t-2 border-gray-300 mx-8"></div>


   
//          <footer className="bg-white-800 text-black py-8 mt-20">
//             <div className="container mx-auto flex justify-between">
//               <div className="w-1/3">
//                 <h4 className="text-xl font-semibold mb-4 mr-20">
//                   Experts in smart EV charging solutions <br/>for residential sites and businesses.
//                 </h4>

              
//                 <a
//                   href="/client-portal"
//                   className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105 mr-20 mt-10"
//                 >
//                   <span>Client portal</span>
                
//                   <div className="ml-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-10 group-hover:h-10">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 7l5 5m0 0l-5 5m5-5H6"
//                       />
//                     </svg>
//                   </div>
//                 </a>
//               </div>

             
//               <div className="w-2/3 flex justify-between space-x-12 mt-10">
                
//                 <div>
//                   <h5 className="text-lg font-semibold text-color-black mb-5">Navigation</h5>
//                   <ul className="space-y-2">
//                     <li><a href="/solutions" className="text-gray hover:underline text-lg">Solutions</a></li>
//                     <li><a href="/contact" className="text-gray hover:underline text-lg">Contact</a></li>
//                     <li><a href="/careers" className="text-gray hover:underline text-lg">Careers</a></li>
//                     <li><a href="/residents" className="text-gray hover:underline text-lg">Residents</a></li>
//                   </ul>
//                 </div>

             
//                 <div>
//                   <h5 className="text-lg font-semibold mb-5">Follow us</h5>
//                   <ul className="space-y-2">
//                     <li><a href="/linkedin" className="text-gray hover:underline text-lg">LinkedIn</a></li>
//                     <li><a href="/instagram" className="text-gray hover:underline text-lg">Instagram</a></li>
//                     <li><a href="/facebook" className="text-gray hover:underline text-lg">Facebook</a></li>
//                   </ul>
//                 </div>

               
//                 <div>
//                   <h5 className="text-lg font-semibold mb-5">Legal</h5>
//                   <ul className="space-y-2">
//                     <li><a href="/terms-conditions" className="text-gray hover:underline text-lg">Terms & Conditions</a></li>
//                     <li><a href="/privacy-policy" className="text-gray hover:underline text-lg">Privacy Policy</a></li>
//                     <li><a href="/modern-slavery-policy" className="text-gray hover:underline text-lg">Modern Slavery Policy</a></li>
//                     <li><a href="/esg-policy" className="text-gray hover:underline text-lg">ESG Policy</a></li>
//                     <li><a href="/sustainability-policy" className="text-gray hover:underline text-lg">Sustainability Policy</a></li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

            
//             <div className="text-center mt-8 text-lg mr-310">
//               <p>&copy; TransEv 2025. All Rights Reserved.</p>
//             </div>
//           </footer>
//     </div>

     
//      {popupOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white p-8 rounded-lg max-w-6xl w-full flex relative h-auto">
//       {/* Close Button */}
//       <button
//         className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-900"
//         onClick={handlePopupClose}
//       >
//         &times; {/* "×" represents the close/cross icon */}
//       </button>

//       <div className="w-1/2 p-4">
//         <img
//           src={popupContent.image}
//           alt="Popup"
//           className="w-full h-auto object-contain rounded-lg"  // Ensuring the image stays contained and fully visible
//         />
//       </div>

//       <div className="w-1/2 p-4">
//         <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
//         <p>{popupContent.description}</p>
//         <h3 className="text-2xl font-semibold mb-4 mt-6">Features</h3>
//         <p>{popupContent.features}</p>

//         {/* Buy Now Button */}
//         <button
//           className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full"
//           onClick={handleBuyNowClick}
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default HomePage;

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
import AC01W from '../assets/AC01W3.png';
import AC02P from '../assets/AC02P3.png';
import AC02P7 from '../assets/AC02P7.4.png';
import AC02WCH from '../assets/AC02WC&H.png';
import AC03W7 from '../assets/AC03W7.png';
import AC03W22 from '../assets/AC03W22.png';
import DC04W from '../assets/DC04W.png';
import DC04G60 from '../assets/DC04G60.png';
import DC04G150 from '../assets/DC04G150.png';
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
   
  // const [scrollLeft, setScrollLeft] = useState(0);
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
  // const containerRef = useRef(null);
  // const imageSources = [slider1, slider2, slider3, slider4, slider5, slider6];
  const sliderImages = [slider,slider2, slider5, newslide, slider4, slider1];
  const smallImages = [eo,zaptec, easee, ctek, garo, schneider];
  
  
    // Start dragging (detects the start of dragging action)
    
  
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
      navigate('/solution');  // Navigate to the Solutions page
    }, 500); // After animation, navigate to solutions page
  };
  const handleSectionClick = (section) => {
    // Navigate to the corresponding page based on the section clicked
    if (section === 'Home and Housing Societies') {
      navigate('/solutions/home-and-housing-societies'); // Navigate to a specific route for Apartment buildings
    } else if (section === 'Office and Workplace') {
      navigate('/solutions/office-and-workplace');
    } else if (section === 'Public Places') {
      navigate('/solutions/public-places');
    } else if (section === 'Fleet Organizations') {
      navigate('/solutions/fleet-organization');
    }
  };
  const images = [charger1 , charger2, charger3, charger4 , charger5 , charger6 , charger7 , charger8 ];
 const imagezoom = [car,woman,mobile]
 const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -400,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 400,
      behavior: 'smooth'
    });
  };
  const [isDragging, setIsDragging] = useState(false);
  
  // Mouse drag events
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // drag speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  // Arrow scroll
  const scrollLeftBtn = () => {
    containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRightBtn = () => {
    containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

 return (
  <div className="relative w-full overflow-x-hidden">
    <div className="relative w-full h-screen">
      <VideoBackground />
      <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div>
      <Navbar />
      
      <div className="absolute top-1/4 w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 text-white text-left space-y-6">
        
        <h1 className="font-aeonik text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight tracking-wide">
          <div>
            <span>Unleash the Power,</span>{' '}
            <span className="text-green-500">Charge</span>
          </div>
          <div className="pl-[0.1em]">
            <span className="text-orange-300">Beyond</span> Boundaries
          </div>
        </h1>

        {/* Button */}
        <div className="relative inline-block mt-8">
        <button
  id="solutions-btn"
  onClick={handleButtonClick}
  className="flex items-center justify-center px-10 py-6 w-full sm:w-auto md:w-[350px] lg:w-[400px] xl:w-[400px] bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-yellow-300 hover:text-white"
>
  <span className="mr-4 text-lg sm:text-xl md:text-2xl">Our Solutions</span>
  <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-11 group-hover:h-11 ml-2">
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

        {/* Paragraph */}
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl text-white mt-8 text-center sm:text-left">
          <span className="block mb-2 sm:mb-4">Powering peace of mind</span>
          <span className="block mb-2 sm:mb-4">through tailored EV charging</span>
          <span className="block mb-4 sm:mb-8">solutions.</span>
          <span className="text-xl text-white cursor-pointer inline-flex items-center mt-4 sm:mt-0 ml-670 sm:ml-8 md:ml-670 lg:ml-400 justify-end">
    Explore
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 ml-3 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 15l-7 7-7-7"
      />
    </svg>
  </span>

        </p>
      </div>
    </div>
 


      {/* Non-Video Content Section 1 */}

<div className="flex flex-col lg:flex-row justify-between p-8 sm:p-16 mt-10 bg-white">
  <div className="w-full lg:w-2/3 pr-8 mb-8 lg:mb-0"> {/* Added padding-right and margin-bottom for spacing */}
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight max-w-screen-lg mx-auto">
      Future-proof your residential <br />
      site or business with our <br />
      <span className="font-normal">scalable EV charging solutions.</span>
    </h2>
  </div>
  
  <div className="w-full lg:w-1/4">
    {/* Image with padding and rounded corners */}
    <img src={evcharger} alt="EV Charging" className="w-full h-auto rounded-xl" />
  </div>
</div>


<div className="p-16">
 
  <h3 className="text-2xl font-bold text-left">
    Charging solutions for
  </h3>
</div>
 
 <div className="space-y-0 bg-white pl-4 pr-4 sm:pl-8 sm:pr-8">
  {[
    'Home and Housing Societies',
    'Office and Workplace',
    'Public Places',
    'Fleet Organizations',
  ].map((section, index) => (
    <div
      key={index}
      className={`relative flex flex-col sm:flex-row justify-between items-center sm:items-stretch gap-6 sm:gap-0 py-8 sm:p-16 transition-all duration-300 
        ${hovered === index ? 'bg-yellow-200' : ''} 
        border-t border-gray-300 cursor-pointer`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => handleSectionClick(section)}
    >
      {/* Left Side Number */}
      <div
        className={`w-full sm:w-1/4 flex justify-center sm:justify-start items-center transition-all duration-300 transform ${
          hovered === index ? 'translate-x-4 sm:translate-x-10' : 'translate-x-0'
        }`}
      >
        <span className="text-4xl sm:text-6xl font-aeonik text-black">{`0${index + 1}`}</span>
      </div>

      {/* Middle Title */}
      <div className="w-full sm:w-1/2 flex items-center justify-center text-center sm:text-left">
        <h2
          className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-aeonik transition-all duration-300 ${
            hovered === index ? 'text-black' : 'text-gray-800'
          }`}
        >
          {section}
        </h2>
      </div>

      {/* Right Arrow */}
      <div className="w-full sm:w-1/4 flex justify-center sm:justify-end items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-black transition-transform duration-300"
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

      {/* Hover line effect */}
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 transform transition-all duration-500 ${
          hovered === index ? 'scale-y-100 translate-y-0' : 'scale-y-0 translate-y-2'
        }`}
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

<div className="flex flex-col lg:flex-row justify-between items-start p-4 sm:p-8 lg:p-16 space-y-8 lg:space-y-0 lg:space-x-8">
  {/* Left: Image Slider */}
  <div className="w-full lg:w-1/2 space-y-4 relative overflow-hidden image-slider-wrapper">
    <div className="image-slider w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] relative">
      {imagezoom.map((image, index) => (
        <div
          key={index}
          className={`image-slide flex-shrink-0 opacity-0 absolute transition-opacity duration-1000 ease-in-out`}
          style={{
            animation: `fadeInOut 15s infinite ${index * 3}s`,
          }}
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="w-full h-full object-cover transition-opacity duration-1000 ease-out rounded-xl"
          />
        </div>
      ))}
    </div>
  </div>

  {/* Right: Text Content */}
  <div className="w-full lg:w-1/2 flex flex-col justify-start">
    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 lg:mb-8 text-gray-700">
      How we can help
    </h3>

    <div className="space-y-6 mt-6 sm:mt-10 md:mt-16 lg:mt-20">
      {['Expertise', 'Guidance', 'Support'].map((item, index) => (
        <div
          key={index}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-aeonik text-gray-500 cursor-pointer group hover:text-black"
        >
          <span className="relative inline-block group">
            {item}
            <span
              className="absolute bottom-0 left-0 w-0 h-[4px] bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:bg-black"
            />
          </span>
        </div>
      ))}
    

 

    <div className="flex flex-col lg:flex-row justify-between items-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-20 lg:mt-40 xl:mt-52 2xl:mt-64 space-y-10 lg:space-y-0">
  <div className="w-full lg:w-3/5 xl:w-2/3 relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px]">
    
    {/* Pair 1 */}
    <div className="pair pair-1 absolute top-0 left-0">
      <h2 className="text-xl sm:text-xl md:text-xl font-bold animate-slide-up-text">
        A consultative approach
      </h2>
      <p className="text-base sm:text-lg md:text-lg mt-4 animate-slide-up-text max-w-full md:max-w-[95%] xl:max-w-[700px]">
        We work closely with you throughout the design and <br />
        installation process to ensure the infrastructure meets your 
        unique requirements.
      </p>
    </div>

    {/* Pair 2 */}
    <div className="pair pair-2 absolute top-0 left-0">
      <h2 className="text-xl sm:text-xl md:text-xl font-bold animate-slide-up-text">
        Ongoing management and maintenance
      </h2>
      <p className="text-base sm:text-lg md:text-lg mt-4 animate-slide-up-text max-w-full md:max-w-[95%] xl:max-w-[700px]">
        We can take care of all ongoing operations, including <br />
        maintenance and customer service, so there's no need for your 
        day-to-day involvement.
      </p>
    </div>

    {/* Pair 3 */}
    <div className="pair pair-3 absolute top-0 left-0">
      <h2 className="text-xl sm:text-xl md:text-xl font-bold animate-slide-up-text">
        Leaders in residential EV charging solutions
      </h2>
      <p className="text-base sm:text-lg md:text-lg mt-4 animate-slide-up-text max-w-full md:max-w-[95%] xl:max-w-[700px]">
        Backed by the UK Government's Charging Infrastructure <br />
        Investment Fund (CIIF), Energy Park brings you a team of highly 
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
<div className="relative mt-[-10] rounded-xl overflow-hidden">
 
    <div className="w-full h-220 relative rounded-xl overflow-hidden px-4">
  <img 
    src={Evimage} 
    alt="Full Image" 
    className="w-full h-full object-cover rounded-xl"
  /> 

<div className="absolute top-70 left-0 w-full h-full flex items-center justify-between p-8 text-white ">
     
    <div className="space-y-0 max-w-400 ml-4">
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-aeonik leading-tight">
  Smart EV Charging Solutions
</h2>
<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-aeonik mt-2 lg:mt-4">
  For residential sites and businesses
</h2>



</div> 
 



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

 
 
<div className="mt-20 sm:mt-32 lg:mt-40 text-right px-4 sm:px-8 md:px-16 mb-10">
  <div>
    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-aeonik leading-tight">
      We Offer a range of charge
    </h3>
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-aeonik mt-2 sm:mt-4 mr-35">
      Points to choose from.
    </h3>
  </div>
</div>


</div>


<div className="flex justify-center items-center mb-8 ">
  <div
    id="box-container"
    className="flex overflow-x-auto gap-8 py-8 px-4 sm:px-8 md:px-12 lg:px-16 relative"
    style={{
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none', 
    }}
    onScroll={handleScroll}
  >
    {[
      { name: 'AC01W', description: '3.3 kW', features: 'Up to 22kW charging speed', image: AC01W  },
      { name: 'AC02P', description: '3.7 kW ', features: 'Up to 22kW charging speed', image:AC02P  },
      { name: 'AC02P', description: '7.4 kW ', features: 'Up to 22kW charging speed', image: AC02P7 },
      { name: 'AC02W C & H', description: ' 7.4kW ', features: 'Up to 22kW charging speed', image: AC02WCH },
      { name: 'AC03W', description: '7.4 kW', features: 'Up to 22kW charging speed', image: AC03W7 },
      { name: 'AC03W', description: ' 22 kW', features: 'Up to 22kW charging speed', image: AC03W22 },
      { name: 'DC04W', description: '30 kW', features: 'Up to 22kW charging speed', image: DC04W },
      { name: 'DC04G', description: ' 60 kW ', features: 'Up to 22kW charging speed', image: DC04G60 },
      { name: 'DC04G', description: '150 kW', features: 'Up to 22kW charging speed', image: DC04G150 },
    ].map((box, index) => (
      <div key={index} className="flex flex-col items-center">
        <div
          className="box bg-gray-200 p-6 sm:p-8 md:p-10 rounded-lg relative cursor-pointer hover:scale-105 transform transition-all duration-300 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[550px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px]"
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

        <div className="text-center mt-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold">{box.name}</h2>
          <p className="text-gray-600 mt-2">{box.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

<div className="relative mt-16">
  
  <div
    className="absolute bottom-0 left-0 right-0 transition-all duration-500"
    style={{
      left: '12%',
      right: '16%',
      height: '2px',
      width: `${underlineWidth}%`,
      backgroundColor: underlineColor,
      transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out',
      paddingRight: '50px',
    }}
  ></div>

  {/* Arrows Container */}
  <div className="flex justify-center items-center absolute bottom-2 w-full px-4 space-x-4 sm:space-x-6 md:space-x-8 ml-4 sm:ml-8 md:ml-16 lg:ml-32">
    {/* Left Arrow Button */}
    <button
      className="text-xl p-2 rounded-full mx-4 sm:mx-6 md:mx-8"
      onClick={() => handleArrowClick('left')}
    >
      ←
    </button>
    {/* Right Arrow Button */}
    <button
      className="text-xl p-2 rounded-full mx-4 sm:mx-6 md:mx-8"
      onClick={() => handleArrowClick('right')}
    >
      →
    </button>
  </div>
</div>




<div class="flex flex-col sm:flex-row justify-between items-center p-5 mt-16 sm:mt-32">

  <div class="text-xl sm:text-2xl md:text-3xl lg:text-xl font-aeonik font-bold mb-4 sm:mb-0 mr-10 text-center sm:text-left">
    We partner with the best.
  </div>

 
  <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-aeonik text-center sm:text-left">
    Working with leading
    <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">equipment manufacturers gives</span>
    <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">us access to a wide range of</span>
    <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">hardware solutions.</span>
  </div>
</div>



    

      {/* Scrollable Images */}
      <div className="relative w-full mt-16">
      {/* Image Slider */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-scroll px-4 py-6 cursor-grab scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={(e) => startDrag(e.touches[0])}
        onTouchMove={(e) => onDrag(e.touches[0])}
        onTouchEnd={stopDrag}
      >
        <div className="flex gap-6">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[720px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden border-4 border-gray-300 hover:scale-105 transition-transform ease-in-out"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer"
                onClick={() => handleImageClick(image)}
              />
              <div className="absolute bottom-2 left-2 w-[120px] sm:w-[180px] lg:w-[220px] h-[60px] sm:h-[80px] lg:h-[100px] border-2 border-gray-300 overflow-hidden rounded-lg ml-2 mb-2">
                <img
                  src={smallImages[index]}
                  alt={`Small ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Buttons below the image slider */}
      <div className="flex justify-center items-center px-4 mb-4 mt-6">
        <button
          onClick={scrollLeftBtn}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full mx-2"
        >
          ←
        </button>
        <button
          onClick={scrollRightBtn}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full mx-2"
        >
          →
        </button>
      </div>

      {/* Hide scrollbar (optional fallback) */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
    
    

<div className="mt-6 pb-8">
  <div className="flex flex-wrap justify-between px-4">
    {/* Left Section */}
    <div className="text-xl font-semibold ml-0 sm:ml-12 font-aeonik">
      Slider
    </div>

    {/* Right Section */}
   <div className="mt-6 pb-8 px-4">
  {/* Heading Section */}
  <div className="flex flex-wrap justify-between">
    
    <div className="text-xl sm:text-2xl lg:text-2xl font-aeonik text-left font-semibold mr-0 sm:mr-40 lg:mr-140">
      <h2>
        EV Charging Solutions for Residential Sites and Businesses
      </h2>
    </div>
  </div>

  {/* Description Section */}
  <div className="mt-4 sm:mt-6 lg:mt-8 text-xl text-right sm:text-center lg:text-right mr-0 sm:mr-4 md:mr-12 lg:mr-140 text-gray-500 font-aeonik">
    We work with a select group of leading equipment manufacturers, <br />
    so we have access to a wide range of hardware solutions. <br />
    This means we can always find the best fit for your project.
  </div>
</div>
</div>
</div>


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
      <div className="mt-20 sm:mt-20 md:mt-30 lg:mt-50">
  <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold text-left text-gray-800">
    EV Charging Solutions for Residential Sites and Businesses
  </h3>
  <div className="mt-4 sm:mt-6">
    <p className="text-lg text-gray-600 leading-relaxed">
      We’ll listen to your needs, identify the best approach, and then create a bespoke
    </p>
    <p className="text-lg text-gray-600 leading-relaxed">
      smart EV charging solution that’s right for you.
    </p>
  </div>
</div>


    </div>
  </div>
</div>

  
       <div className="bg-white-50 py-16">
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
          <span className="hover:underline transition-all duration-300 mt-2 ">tgwbin@gmail.com</span>
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

