import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import VideoBackground from './Videobackground';
import ServicesSection from './servicessection';
import IndustriesSection from './IndustriesSection';
import CaseStudySection from './CseStudy';
import PartnerSection from './PartnerSection';
import MetaverseSection from './MetaverseSection';
import NewsSection from './NewsSection';
import Academy from './Academy';
import GetBox from './GetBox';
import Linkedin from './Linkedin';
import Footer from './Footer';
import BelowFooter from './BelowFooter';
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
import slider4 from '../assets/slide4.jpg';
import slider5 from '../assets/slide5.jpg';
import eo from '../assets/eo.jpg';
import easee from '../assets/easee.png';
import ctek from '../assets/ctek.png';
import garo from '../assets/garo.png';
import schneider from '../assets/schneider.png';
import slider from '../assets/slider.jpg';
import zaptec from '../assets/zaptec.png';
import newslide from '../assets/new.jpg';
import woman from '../assets/woman.jpg';
import car from '../assets/car.jpg';
import mobile from '../assets/mobile.jpg';
import who from '../assets/who.png';
import Testimonials from '../components/Testimonials';
import Tech from '../components/Tech';

// Import the new image for the replaced section
import middleImage from '../assets/Middleimage.png'; // Adjust path if necessary

function HomePage() {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [largeImage, setLargeImage] = useState(slider1);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [popupContent, setPopupContent] = useState({ image: '', description: '', features: '' });

  const containerRef = useRef(null);
  const sliderImages = [slider, slider2, slider5, newslide, slider4, slider1];
  const smallImages = [eo, zaptec, easee, ctek, garo, schneider];
  const images = [charger1, charger2, charger3, charger4, charger5, charger6, charger7, charger8];
  const imagezoom = [car, woman, mobile];

  const handlePopupOpen = (image, description, features) => {
    setPopupContent({ image, description, features });
    setPopupOpen(true);
  };

  const handlePopupClose = () => setPopupOpen(false);

  const handleBuyNowClick = () => navigate('/login');

  const startDrag = (e) => {
    setDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const stopDrag = () => setDragging(false);

  const onDrag = (e) => {
    if (!dragging) return;
    const distance = e.pageX - startX;
    containerRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleImageClick = (image) => setLargeImage(image);

  const handleContactClick = () => {
    const button = document.getElementById('contact-btn');
    button.classList.add('bg-yellow-500');
    setTimeout(() => navigate('/contact'), 500);
  };

  const handleArrowClick = (direction) => {
    const container = document.getElementById('box-container');
    const scrollAmount = direction === 'left' ? -350 : 350;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleButtonClick = () => {
    document.getElementById('solutions-btn').classList.add('bg-yellow-500');
    setTimeout(() => navigate('/solution'), 500);
  };

  const handleSectionClick = (section) => {
    const routes = {
      'Apartment buildings': '/solutions/apartment-buildings',
      'Holiday parks': '/solutions/holiday-parks',
      'Hotels': '/solutions/hotels',
      'Workplaces': '/solutions/workplace',
    };
    if (routes[section]) navigate(routes[section]);
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navbar and Hero Section */}
      <div className="relative w-full">
        <VideoBackground />
        <div className="absolute top-0 w-full h-1 bg-yellow-300 z-20" />
        <div className="absolute top-0 left-0 w-full z-30">
          <Navbar />
        </div>
      </div>

     {/* Who We Are Section */}
<div className="w-full bg-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row gap-12">
      {/* Left - Text */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black text-left">
          Who we are?
        </h1>
        <p className="text-gray-700 text-xl sm:text-2xl leading-tight font-serif text-left">
          Peregrinee is a new-age IT and digital transformation agency born from the 40+ year legacy of Ramkrishna Industries, a trusted name in Kolkata, India. We specialize in building AI-powered products, scalable software solutions, and transformative digital strategies tailored for global B2B brands. We serve clients globally, including countries like India, the USA, UAE, Saudi Arabia, Qatar, Oman, Egypt, the UK, Singapore, and Germany, and across industries such as manufacturing, healthcare, education, retail, logistics, real estate, and technology. Our diverse team includes Mobile Developers [iOS and Android], Frontend Web Developers, Backend Developers, Full Stack Developers, AI & Data Analytics Engineers, Gaming Developers, DevOps Engineers, UI/UX Designers, Researchers, QA Engineers, Business Analysts, Product Owners, Scrum Masters, Delivery Managers, and Copywriters/Content Managers — bringing a mix of expertise and experience to every project. Combining deep-rooted industry experience with cutting-edge technology, we empower businesses to evolve, grow, and lead in a rapidly changing digital world.
        </p>
      </div>

      {/* Right - Image */}
      <div className="md:w-1/2">
        <div className="w-full h-[600px] sm:h-[700px] md:h-[800px] lg:ml-60">
          <img
            src={who}
            alt="Eurisko Team"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div>
</div>

       {/* Removed Trust Score and Business Stats Section, replaced with Image */}
      <div className="w-full bg-white py-10 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="w-full max-w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
            <img
              src={middleImage} // Use the imported image here
              alt="Middle Image"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <ServicesSection />
      <MetaverseSection />
      <div className="h-20" />
      <IndustriesSection />
      <Tech />
      <PartnerSection />
      <CaseStudySection />
      <Testimonials />
      <NewsSection />
      <Academy />
      <GetBox />
      <Linkedin />
      <Footer />
      <BelowFooter />
    </div>
  );
}

export default HomePage;
