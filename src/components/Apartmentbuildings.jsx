

import React, { useState } from 'react';
import Navbar from './Navbar';  
import logo from '../assets/transev logo.png'; // Use appropriate path for logo image
import background from '../assets/apartmnet.jpg';
import yourImage from '../assets/new.jpg';
import { useInView } from 'react-intersection-observer';
import car from '../assets/car1.jpg'


const ApartmentBuildingPage = () => {
  const [isChecked, setIsChecked] = useState(false);
 
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
      <section className="px-16 py-20 bg-white-100 flex items-center justify-between  ">
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
        src={yourImage} // Replace with your actual image path
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
        src={yourImage} // Replace with your actual image path
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
        src={yourImage} // Replace with your actual image path
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
        Every Energy Park installation is thoughtfully designed by our in-house design team to support rising EV ownership and evolving energy needs.
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
        src={yourImage} // Replace with your actual image path
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
        Energy Park is backed by the UK Government's Charging Infrastructure Investment Fund (CIIF) and brings together a team of highly trained professionals to deliver best-in-class EV charging solutions.
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
        src={yourImage} // Replace with your actual image path
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
        src={yourImage} // Replace with your actual image path
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
        src={yourImage} // Replace with your actual image path
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

  
   
  <div className="border-t-2 border-gray-300 w-full mb-8"></div>
</div>
      {/* Footer Section */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <img src={logo} alt="Company Logo" className="w-32 h-32 mx-auto" />
          </div>
          <div className="text-lg">
            <p>&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApartmentBuildingPage;

