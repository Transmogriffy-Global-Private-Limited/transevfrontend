import React from 'react';
import Navbar from "../components/Navbar"; // Import the Navbar
import logo from '../assets/transev logo.png';
const TermsConditions = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
    <Navbar/>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6">Agreement to Terms</h1>
        <p className="text-lg text-gray-800 mb-6">
          These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and TRANSMOGRIFFY GLOBAL PRIVATE LIMITED (“we,” “us” or “our”), concerning your access to and use of our mobile application TRANSEV. You agree that by accessing the Application, you have read, understood, and agree to be bound by all of these Terms and Conditions Use.
        </p>

        <h2 className="text-3xl font-semibold text-green-800 mt-6 mb-4">Intellectual Property Rights</h2>
        <p className="text-lg text-gray-800 mb-6">
          Unless otherwise indicated, the Application is Numocity Technologies Pvt. Ltd proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Application (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the India, foreign jurisdictions, and international conventions. The Content and the Marks are provided on the Application “AS IS” for your information and personal use only.
        </p>

        <h2 className="text-3xl font-semibold text-red-800 mt-6 mb-4">User Representations</h2>
        <p className="text-lg text-gray-800 mb-6">
          By using the Application, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13; (5) not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Application through automated or non-human means, whether through a bot, script or otherwise; (7) you will not use the Application for any illegal or unauthorized purpose; and (8) your use of the Application will not violate any applicable law or regulation.
        </p>

        <h2 className="text-3xl font-semibold text-orange-800 mt-6 mb-4">Prohibited Activities</h2>
        <p className="text-lg text-gray-800 mb-6">
          You may not access or use the Application for any purpose other than that for which we make the Application available. The Application may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </p>

        <h2 className="text-3xl font-semibold text-yellow-800 mt-6 mb-4">Guidelines for Reviews</h2>
        <p className="text-lg text-gray-800 mb-6">
          We may provide you areas on the Application to leave reviews or ratings. When posting a review, you must comply with the following criteria: (1) you should have firsthand experience with the person/entity being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language; (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements.
        </p>

        <h2 className="text-3xl font-semibold text-teal-800 mt-6 mb-4">Mobile Application License</h2>
        <p className="text-lg text-gray-800 mb-6">
          If you access the Application via a mobile application, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the mobile application on wireless electronic devices owned or controlled by you, and to access and use the mobile application on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Terms of Use.
        </p>
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
       </div>
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
                     <li><a href="/careers" className="text-gray hover:underline text-lg">Careers</a></li>
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
  );
};

export default TermsConditions;
