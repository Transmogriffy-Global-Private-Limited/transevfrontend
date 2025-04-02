import React from 'react';
import Navbar from './Navbar';  
import logo from '../assets/transev logo.png';  
import newsImage1 from '../assets/image1.png';  
import newsImage2 from '../assets/imagee2.jpg';  
import newsImage3 from '../assets/slide6.jpg';  
import newsImage4 from '../assets/image1.png';  
import newsImage5 from '../assets/imagee2.jpg';  
import newsImage6 from '../assets/slide6.jpg';  
import newsImage7 from '../assets/image1.png';  
import newsImage8 from '../assets/imagee2.jpg';  
import newsImage9 from '../assets/slide6.jpg';  

const newsArticles = [
  {
    id: 1,
    title: "Energy Savers Week: How EV ownership can help you save energy and money",
    date: "April 2, 2025",
    description: "TransEv has launched a new renewable energy initiative, aiming to reduce carbon emissions and power thousands of homes with sustainable energy sources.",
    image: newsImage1,
    link: "/energy Savers Week: How EV ownership can help you save energy and money"
  },
  {
    id: 2,
    title: "EV charging explained: Everything you need to know to stay powered up",
    date: "March 28, 2025",
    description: "Scientists at Energy Park have developed a new solar technology that promises to boost the energy efficiency of solar panels by 20%, setting a new industry standard.",
    image: newsImage2,
    link: "/ev charging explained: Everything you need to know to stay powered up"
  },
  {
    id: 3,
    title: "3 tips for getting the most out of your EV during the festive period",
    date: "March 22, 2025",
    description: "A strategic partnership between Energy Park and GreenTech will expand the network of electric vehicle charging stations across the country.",
    image: newsImage3,
    link: "/3 tips for getting the most out of your EV during the festive period"
  },
  {
    id: 4,
    title: "The top 5 EV myths debunked",
    date: "March 15, 2025",
    description: "TransEv is exploring the possibility of constructing a large wind farm that could provide clean energy to thousands of homes.",
    image: newsImage4,
    link: "/the top 5 EV myths debunked"
  },
  {
    id: 5,
    title: "Making EV Charging Accessible for All: A Look at PAS 1899 and the Future of Inclusive EV Infrastructure ",
    date: "March 10, 2025",
    description: "TransEv has begun a new initiative to promote sustainable building practices in residential and commercial properties.",
    image: newsImage5,
    link: "/making EV Charging Accessible for All: A Look at PAS 1899 and the Future of Inclusive EV Infrastructure"
  },
  {
    id: 6,
    title: "What to Consider When Installing EV Charging at an Apartment Building",
    date: "March 5, 2025",
    description: "A new smart grid technology is being implemented by Energy Park, which promises to enhance the efficiency of power distribution across cities.",
    image: newsImage6,
    link: "/what to Consider When Installing EV Charging at an Apartment Building"
  },
  {
    id: 7,
    title: "5 Reasons to Install EV Charge Points at your Aparment Building",
    date: "February 25, 2025",
    description: "TransEv plans to expand its network of electric vehicle charging stations to 50 new locations nationwide.",
    image: newsImage7,
    link: "/5 Reasons to Install EV Charge Points at your Aparment Building"
  },
  {
    id: 8,
    title: "Solar Power Storage: The Future of Clean Energy",
    date: "February 20, 2025",
    description: "TransEv is working on a new solar power storage solution that will help store excess energy generated during the day for use at night.",
    image: newsImage8,
    link: "/solar Power Storage: The Future of Clean Energy"
  },
  {
    id: 9,
    title: "TransEv’s Commitment to Sustainability",
    date: "February 15, 2025",
    description: "TransEv  is continuing its efforts to reduce its environmental impact and promote sustainability across all its operations.",
    image: newsImage9,
    link: "/transEv’s Commitment to Sustainability"
  }
];

function NewsPage() {
  return (
    <div className="min-h-screen bg-white-50">
      {/* Navbar Section */}
      <Navbar />
      <div className="absolute top-0 w-full border-b-6 border-yellow-300 z-10"></div> 
      {/* Latest News Section */}
      <section className="py-16 px-4 md:px-16 ">
        <h1 className="text-9xl font- bold text-black mt-50">Latest news</h1>
        <p className="mt-15 text-2xl text-gray-500 ">All the latest news and articles from TransEv.</p>
      </section>
      <section className="px-4 md:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="zoom-image w-full h-80 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl text-gray-500 mt-2">{article.date}</h3>
                <h2 className="text-2xl font-semibold text-black mt-5">{article.title}</h2>
                <p className="mt-4 text-gray-700">{article.description}</p>
                <div className="flex justify-between items-center mt-6">
                  <a href={article.link} className="text-yellow-500 font-semibold">
                    Read More
                  </a>
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer">
                    <a href={article.link}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
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
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Custom CSS */}
      <style jsx>{`
        /* Zoom-In Effect for Images */
        .zoom-image {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .zoom-image:hover {
          transform: scale(1.1); /* Zoom-in effect */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Adds shadow to give the image a floating effect */
        }

        /* Optional: Adding click effect for zoom-in (scale on click) */
        .zoom-image:active {
          transform: scale(1.05); /* Slightly smaller zoom on click */
        }
      `}</style>


      <div className="mt-20 border-t-2 border-gray-300 mx-8 "></div>
      {/* Footer Section */}
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
                  <li><a href="/esg-policy" className="text-gray hover:underline text-lg">ESG Policy</a></li>
                  <li><a href="/sustainability-policy" className="text-gray hover:underline text-lg">Sustainability Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-lg mr-300">
            <p>&copy; Energy Park 2025. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default NewsPage;
