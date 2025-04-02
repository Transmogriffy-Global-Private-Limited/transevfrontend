import React, { useState } from 'react';
import Navbar from './Navbar';  
import logo from '../assets/transev logo.png';  

const ContactPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Form validation handler
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Validate the form
    const errors = {};
    const formElements = event.target.elements;

    // Check if all required fields are filled
    if (!formElements['first-name'].value) errors['first-name'] = 'First name is required';
    if (!formElements['last-name'].value) errors['last-name'] = 'Last name is required';
    if (!formElements['postcode'].value) errors['postcode'] = 'Postcode is required';
    if (!formElements['email'].value) errors['email'] = 'Email is required';
    if (!formElements['message'].value) errors['message'] = 'Message is required';
    if (!isChecked) errors['privacy'] = 'You must agree with the privacy statement';

    setFormErrors(errors);

    // If there are no errors, submit the form (for now, just log the success message)
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-white-50">
      {/* Navbar Section */}
      <Navbar />

      {/* Get in Touch Section */}
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-9xl font-aeonik text-gray-900 animate__animated animate__fadeIn animate__delay-1s mt-50 mr-250 whitespace-nowrap">
            Get in touch
          </h2>
        </div>
      </div>

      <section className="px-4 md:px-16 py-10 mt-50">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Section: If you have any questions and Contact Details */}
          <div className="md:w-1/2 flex flex-col justify-start items-start mb-10">
            <p className="text-5xl font-semibold text-gray-700 space-y-4 mb-10">
              <span>If you have any questions or you'd</span>
              <br />
              <span>like to find out more about our</span>
              <br />
              <span>services, please get in touch.</span>
            </p>

            <div className="text-xl mb-6">
              <h4 className="font-semibold text-xl mb-4 mt-15">Contact Details:</h4>
              <p className="font-semibold text-xl mb-4 text-gray-500">Office address:</p>
              <p className="font-semibold text-xl mb-4 text-gray-500">MANI CASADONA, UNIT - 10 ES06,IIF/04,STREET NO.372,ACTION AREA-11F NEWTOWN,RAJARHAT,KOLKATA - 700156, WEST BENGAL,INDIA</p>
              <p className="font-semibold text-xl mb-4 text-gray-500">Landmark address:</p>
              <p className="font-semibold text-xl mb-4 text-gray-500">OPPOSITE ECOSPACE BUSINESS PARK</p>
             
              <p className="font-semibold text-xl mb-4 text-gray-500 mt-15 inline-block border-b-2 border-gray-500">
                Tel: 033-4601 5366/ +91 79080 03488
              </p><br/>
              <p className="font-semibold text-xl mb-2 text-gray-500 mt-2 inline-block border-b-2 border-gray-500">
                Email: tgwbin@gimail.com
              </p>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-10">
                <label htmlFor="first-name" className="block text-black text-xl mb-5">First name*</label>
                <input
                  type="text"
                  id="first-name"
                  className={`w-full p-7 border ${formErrors['first-name'] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  required
                />
                {formErrors['first-name'] && <span className="text-red-500 text-sm">{formErrors['first-name']}</span>}
              </div>

              {/* Last Name */}
              <div className="mb-10">
                <label htmlFor="last-name" className="block text-black text-xl mb-5">Last name*</label>
                <input
                  type="text"
                  id="last-name"
                  className={`w-full p-7 border ${formErrors['last-name'] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  required
                />
                {formErrors['last-name'] && <span className="text-red-500 text-sm">{formErrors['last-name']}</span>}
              </div>

              {/* Company */}
              <div className="mb-10">
                <label htmlFor="company" className="block text-black text-xl mb-5">Company</label>
                <input
                  type="text"
                  id="company"
                  className="w-full p-7 border border-gray-300 rounded-md"
                />
              </div>

              {/* Dropdown Menu */}
              <div className="mb-10">
                <label htmlFor="dropdown" className="block text-black text-xl mb-5">Your site*</label>
                <select
                  id="dropdown"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="w-full p-7 border border-gray-300 rounded-md"
                >
                  <option value="residential-apartment">Residential Apartment</option>
                  <option value="hotel-leisure">Hotel & Leisure</option>
                  <option value="holiday-park">Holiday Park</option>
                  <option value="workplace">Workplace</option>
                </select>
              </div>

              {/* Address */}
              <div className="mb-10">
                <label htmlFor="address" className="block text-black text-xl mb-5">Address</label>
                <input
                  type="text"
                  id="address"
                  className="w-full p-7 border border-gray-300 rounded-md"
                />
              </div>

              {/* City */}
              <div className="mb-10">
                <label htmlFor="city" className="block text-black text-xl mb-5">City</label>
                <input
                  type="text"
                  id="city"
                  className="w-full p-7 border border-gray-300 rounded-md"
                />
              </div>

              {/* Postcode */}
              <div className="mb-10">
                <label htmlFor="postcode" className="block text-black text-xl mb-5">Postcode*</label>
                <input
                  type="text"
                  id="postcode"
                  className={`w-full p-7 border ${formErrors['postcode'] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  required
                />
                {formErrors['postcode'] && <span className="text-red-500 text-sm">{formErrors['postcode']}</span>}
              </div>

              {/* Email */}
              <div className="mb-10">
                <label htmlFor="email" className="block text-black text-xl mb-5">Email*</label>
                <input
                  type="email"
                  id="email"
                  className={`w-full p-7 border ${formErrors['email'] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  required
                />
                {formErrors['email'] && <span className="text-red-500 text-sm">{formErrors['email']}</span>}
              </div>

              {/* Telephone */}
              <div className="mb-10">
                <label htmlFor="telephone" className="block text-black text-xl mb-5">Telephone</label>
                <input
                  type="text"
                  id="telephone"
                  className="w-full p-7 border border-gray-300 rounded-md"
                />
              </div>

              {/* Message */}
              <div className="mb-10">
                <label htmlFor="message" className="block text-black text-xl mb-5">Please tell us a bit about your site</label>
                <textarea
                  id="message"
                  className={`w-full p-15 border ${formErrors['message'] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  rows="4"
                  required
                ></textarea>
                {formErrors['message'] && <span className="text-red-500 text-sm">{formErrors['message']}</span>}
              </div>

              {/* Privacy Agreement */}
              <div className="flex items-center mb-10">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 border-gray-300 rounded-md"
                />
                <label htmlFor="privacy" className="ml-4 text-black text-xl mb-2">
                  I agree with the privacy statement
                </label>
                {formErrors['privacy'] && <span className="text-red-500 text-sm">{formErrors['privacy']}</span>}
              </div>

              {/* Send Message Button */}
              <button
                type="submit"
                className="relative flex items-center justify-center w-35 h-12 bg-yellow-500 text-white rounded-full font-semibold group transition-all duration-300 ease-in-out overflow-hidden ml-100"
              >
                {/* Right Arrow Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white group-hover:opacity-0 group-hover:translate-x-10 transition-all duration-300 ease-in-out"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>

                {/* Expanded Button Text */}
                <span className="absolute left-0 w-0 group-hover:w-full group-hover:left-4 group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out text-white text-sm text-center">
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="mt-20 border-t-2 border-gray-300 mx-8 "></div>
      <div className="bg-white py-16 mt-10">
        <div className="container mx-auto flex justify-between items-center px-8">
          {/* Left Side: Logo */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Company Logo" className="w-32 h-32" />
          </div>

          {/* Right Side: Phone number and email */}
          <div className="text-right">
            <div className="text-5xl font-semibold text-gray-800 mb-4">
              <a href="tel:+02033453310" className="relative inline-block hover:text-black-500">
                <span className="hover:underline transition-all duration-300 mr-25">033-4601 5366</span>
              </a>
            </div>

            <div className="text-5xl font-semibold text-gray-800">
              <a href="mailto:enquiries@energy-park.co.uk" className="relative inline-block hover:text-black-500">
                <span className="hover:underline transition-all duration-300">tgwbin@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-gray-300 mx-8"></div>

        <footer className="bg-white text-black py-8 mt-20">
          <div className="container mx-auto flex justify-between">
            <div className="w-1/3">
              <h4 className="text-xl font-semibold mb-4">Experts in smart EV charging solutions <br/>for residential sites and businesses.</h4>
              <a href="/client-portal" className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black">
                <span>Client portal</span>
                <div className="ml-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="w-2/3 flex justify-between space-x-12">
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
                <h5 className="text-lg font-semibold mb-5">Legal</h5>
                <ul className="space-y-2">
                  <li><a href="/terms-conditions" className="text-gray hover:underline text-lg">Terms & Conditions</a></li>
                  <li><a href="/privacy-policy" className="text-gray hover:underline text-lg">Privacy Policy</a></li>
                  <li><a href="/modern-slavery-policy" className="text-gray hover:underline text-lg">Modern Slavery Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="container mx-auto text-center mt-10">
            <p className="text-gray-500 text-sm">&copy; 2025 Company Name. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;
