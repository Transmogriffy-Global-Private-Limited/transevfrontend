import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaTwitter, FaInstagram, FaFacebook, FaArrowRight, FaBolt, FaShieldAlt, FaWallet, FaMapMarkerAlt, FaClock, FaPlug, FaStar, FaCheckCircle, FaChargingStation, FaCar, FaLeaf, FaPhone, FaEnvelope, FaMapPin, FaInfoCircle, FaCalendarAlt, FaPercent, FaChargingStation as FaCharge } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo1 from '../assets/tv.png';
import Navbar from './Navbar';
import brandImage from '../assets/image (2).png';
import BhiringeeImage from '../assets/ev.png';

// ============================================================
// DATA – 5 Charging Stations
// ============================================================

const chargingStations = [
  {
    id: 1,
    name: 'Bhiringee EV Charging Hub',
    address: 'Bhiringee Main Road, Near Bus Stand',
    location: 'Bhiringee',
    city: 'Durgapur',
    state: 'West Bengal',
    pincode: '713212',
    latitude: 23.5204,
    longitude: 87.3119,
    type: 'Ultra-Fast',
    connectorTypes: ['CCS2', 'Type 2'],
    pricePerUnit: 20,
    available: 0,
    totalSlots: 8,
    isOpen: false,
    openingTime: 'Coming Shortly',
    closingTime: 'Coming Shortly',
    amenities: ['Café', 'WiFi', 'Restroom', 'Waiting Lounge', 'Food Court', 'Shopping Area'],
    rating: 4.8,
    totalReviews: 127,
    image: BhiringeeImage,
    distance: '0.5 km',
    estimatedTime: '20-30 min',
    power: '100 kW',
    paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'Wallet'],
    isFeatured: true,
    isVerified: true,
    region: 'Durgapur',
    locationIcon: '🏠',
    status: 'opening-shortly',
    progress: 90,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 2,
    name: 'Bhastara EV Charging Station',
    address: 'Bhastara Main Road, Near Post Office',
    location: 'Bhastara',
    city: 'Bhastara',
    state: 'West Bengal',
    pincode: '713212',
    latitude: 23.5404,
    longitude: 87.3219,
    type: 'Fast',
    connectorTypes: ['CCS2', 'Type 2'],
    pricePerUnit: 20.00,
    available: 0,
    totalSlots: 6,
    isOpen: false,
    openingTime: 'Opening Soon',
    closingTime: 'Opening Soon',
    amenities: ['Restroom', 'Mini Mart', 'Parking', 'Drinking Water'],
    rating: 4.5,
    totalReviews: 89,
    image: brandImage,
    distance: '1.2 km',
    estimatedTime: '35-45 min',
    power: '50 kW',
    paymentMethods: ['UPI', 'Credit Card', 'Google Pay'],
    isFeatured: false,
    isVerified: true,
    region: 'Bhastara',
    locationIcon: '🏡',
    status: 'opening-soon',
    progress: 45,
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 3,
    name: 'Uluberia EV Charging Hub',
    address: 'Uluberia Station Road, Near Railway Station',
    location: 'Uluberia',
    city: 'Uluberia',
    state: 'West Bengal',
    pincode: '711315',
    latitude: 22.4704,
    longitude: 88.1204,
    type: 'Ultra-Fast',
    connectorTypes: ['CCS2', 'Type 2'],
    pricePerUnit: 20.00,
    available: 0,
    totalSlots: 6,
    isOpen: false,
    openingTime: 'Opening Soon',
    closingTime: 'Opening Soon',
    amenities: ['Shopping Mall', 'Food Court', 'Restroom', 'Parking', 'WiFi', 'Kids Zone'],
    rating: 4.7,
    totalReviews: 156,
    image: brandImage,
    distance: '1.0 km',
    estimatedTime: '20-25 min',
    power: '120 kW',
    paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'Wallet'],
    isFeatured: false,
    isVerified: true,
    region: 'Uluberia',
    locationIcon: '🌆',
    status: 'opening-soon',
    progress: 55,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    name: 'Khaserbheri EV Charging Point',
    address: 'Khaserbheri Main Road, Near School',
    location: 'Khaserbheri',
    city: 'Khaserbheri',
    state: 'West Bengal',
    pincode: '713212',
    latitude: 23.5604,
    longitude: 87.3419,
    type: 'Fast',
    connectorTypes: ['Type 2', 'BS 1363'],
    pricePerUnit: 20.00,
    available: 0,
    totalSlots: 6,
    isOpen: false,
    openingTime: 'Opening Soon',
    closingTime: 'Opening Soon',
    amenities: ['Waiting Hall', 'Restroom', 'Parking', 'Mini Mart', 'Tea Stall'],
    rating: 4.3,
    totalReviews: 67,
    image: brandImage,
    distance: '2.0 km',
    estimatedTime: '1-2 hours',
    power: '22 kW',
    paymentMethods: ['UPI', 'Credit Card', 'Cash'],
    isFeatured: false,
    isVerified: true,
    region: 'Khaserbheri',
    locationIcon: '🏞️',
    status: 'opening-soon',
    progress: 35,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 5,
    name: 'Chanditala EV Charging Station',
    address: 'Chanditala Main Road, Near Bus Stand',
    location: 'Chanditala',
    city: 'Chanditala',
    state: 'West Bengal',
    pincode: '712304',
    latitude: 22.6904,
    longitude: 88.1904,
    type: 'Slow',
    connectorTypes: ['Type 2', 'BS 1363'],
    pricePerUnit: 20.00,
    available: 0,
    totalSlots: 4,
    isOpen: false,
    openingTime: 'Opening Soon',
    closingTime: 'Opening Soon',
    amenities: ['Restroom', 'Parking', 'WiFi', 'Drinking Water'],
    rating: 4.2,
    totalReviews: 45,
    image: brandImage,
    distance: '1.8 km',
    estimatedTime: '2-3 hours',
    power: '15 kW',
    paymentMethods: ['UPI', 'Credit Card'],
    isFeatured: false,
    isVerified: true,
    region: 'Chanditala',
    locationIcon: '🌾',
    status: 'opening-soon',
    progress: 25,
    gradient: 'from-rose-500 to-red-500',
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

const ChargingStationLocator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredStations = chargingStations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const openingShortlyStation = chargingStations.find((s) => s.status === 'opening-shortly');
  const openingSoonStations = chargingStations.filter((s) => s.status === 'opening-soon');

  const getTypeColor = (type) => {
    switch (type) {
      case 'Ultra-Fast': return 'from-emerald-500 to-teal-500';
      case 'Fast': return 'from-orange-500 to-amber-500';
      case 'Slow': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Ultra-Fast': return '⚡';
      case 'Fast': return '🔋';
      case 'Slow': return '🐢';
      default: return '🔌';
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStation(null);
  };

  const locationColors = {
    'Bhiringi': 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    'Bhastara': 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
    'Uluberia': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'Khaserbheri': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'Chanditala': 'from-rose-500/20 to-red-500/20 border-rose-500/30',
  };

  const locationBadgeColors = {
    'Bhiringi': 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
    'Bhastara': 'bg-orange-500/20 text-orange-600 border-orange-500/30',
    'Uluberia': 'bg-purple-500/20 text-purple-600 border-purple-500/30',
    'Khaserbheri': 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    'Chanditala': 'bg-rose-500/20 text-rose-600 border-rose-500/30',
  };

  const featuredStations = chargingStations.filter(s => s.isFeatured);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Helmet>
        <title>EV Charging Stations | TransEV Network</title>
        <meta
          name="description"
          content="Find EV charging stations across West Bengal. Bhiringi opening shortly, Bastara, Uluberia, Khaserbheri, and Chanditala coming soon."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="EV Charging Stations | TransEV Network" />
        <meta property="og:description" content="Find EV charging stations across West Bengal." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://transev.site/blog" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Navbar />

      {/* ============================================================
          SECTION 1: FULL WIDTH POSTER - ONLY IMAGE
          ============================================================ */}
      {openingShortlyStation && (
        <section className="relative w-full overflow-hidden">
          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[550px] lg:h-[700px]">
            <img
              src={openingShortlyStation.image}
              alt="EV Charging Station"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="700"%3E%3Crect width="1920" height="700" fill="%231a202c"/%3E%3Ctext x="960" y="350" font-family="Arial" font-size="48" fill="white" text-anchor="middle"%3ETransEV%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 shadow-2xl">
                <span className="animate-pulse text-xl sm:text-2xl">🚀</span>
                <span className="text-xs sm:text-sm font-medium text-white">Coming Soon • {openingShortlyStation.location}</span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-500/80 rounded-full text-white text-[10px] sm:text-xs font-bold">Opening Shortly</span>
              </div>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 sm:gap-4 w-[95%] sm:w-auto">
              <div className="bg-white/20 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 shadow-xl flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🔋</span>
                <span className="text-xs sm:text-sm text-white font-medium">Green Energy</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 shadow-xl flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">⚡</span>
                <span className="text-xs sm:text-sm text-white font-medium">Ultra-Fast</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 shadow-xl flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🛡️</span>
                <span className="text-xs sm:text-sm text-white font-medium">24/7 Security</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 2: STATION DETAILS WITH ALL TEXT BELOW
          ============================================================ */}
      {openingShortlyStation && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 -mt-8 sm:-mt-2 relative z-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <span className="text-3xl sm:text-4xl">🏠</span>
                    <span className="text-lg sm:text-xl md:text-2xl">{openingShortlyStation.name}</span>
                  </h2>
                  <p className="text-emerald-100 mt-1 flex items-center gap-2 text-xs sm:text-sm">
                    <FaMapPin className="text-yellow-300" />
                    <span>{openingShortlyStation.address}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-300 text-[10px] sm:text-sm" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm sm:text-base">{openingShortlyStation.rating}</span>
                  <span className="text-emerald-100 text-[10px] sm:text-sm">({openingShortlyStation.totalReviews})</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-emerald-200">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⚡</div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Power</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-lg">{openingShortlyStation.power}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-blue-200">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⏱️</div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Time</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-lg">{openingShortlyStation.estimatedTime}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-purple-200">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔌</div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Slots</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-lg">{openingShortlyStation.totalSlots}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-orange-200">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💰</div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Price Per Unit</p>
                  <p className="font-bold text-emerald-600 text-sm sm:text-lg">{formatPrice(openingShortlyStation.pricePerUnit)}</p>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  <FaPlug className="text-emerald-600" />
                  Connector Types
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {openingShortlyStation.connectorTypes.map((connector) => (
                    <span key={connector} className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-2 border-emerald-200 shadow-md flex items-center gap-1 sm:gap-2">
                      <FaPlug className="text-xs sm:text-sm" /> {connector}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-6 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  <FaPercent className="text-emerald-600" />
                  Construction Progress
                </h3>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm text-gray-600">Overall Progress</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">{openingShortlyStation.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-3 sm:h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${openingShortlyStation.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 flex items-center gap-2">
                  <span className="text-lg sm:text-xl">🔧</span>
                  Almost ready! Launching very soon.
                </p>
              </div>

              {/* <div className="mb-4 sm:mb-6">
                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">🎯</span>
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {openingShortlyStation.amenities.map((amenity) => (
                    <span key={amenity} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-gray-50 to-white text-gray-700 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium border border-gray-200 shadow-sm flex items-center gap-1 sm:gap-2 hover:shadow-md transition-shadow">
                      <span className="text-emerald-500 text-xs sm:text-sm">✓</span>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div> */}

              <div className="mb-4 sm:mb-6">
                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  <FaWallet className="text-emerald-600" />
                  Payment Methods
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {openingShortlyStation.paymentMethods.map((method) => (
                    <span key={method} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium border border-purple-200 shadow-sm flex items-center gap-1 sm:gap-2">
                      <span className="text-base sm:text-lg">💳</span>
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4 sm:pt-6 border-t-2 border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedStation(openingShortlyStation);
                    setShowModal(true);
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-6 sm:px-12 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <FaInfoCircle className="text-lg sm:text-xl" />
                  <span className="text-sm sm:text-base">View Complete Station Details</span>
                  <FaArrowRight />
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          QUICK STATS BAR
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl sm:rounded-3xl shadow-2xl py-6 sm:py-8 px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              { number: chargingStations.length, label: 'Total Stations', icon: '🔌' },
              { number: '1', label: 'Opening Shortly', icon: '🚀' },
              { number: openingSoonStations.length, label: 'Opening Soon', icon: '⏳' },
              { number: '5', label: 'Charging Points', icon: '⚡' },
              { number: chargingStations.filter(s => s.isVerified).length, label: 'Verified', icon: '✅' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">{stat.icon}</div>
                <p className="text-xl sm:text-3xl font-bold">{stat.number}</p>
                <p className="text-[10px] sm:text-sm text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY CHOOSE TRANSEV - ENHANCED DESIGN
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-12 sm:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-orange-200/50 mb-4">
            <span className="text-lg sm:text-xl">⚡</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Why Choose Us</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Why Choose <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-500 bg-clip-text text-transparent">TransEV</span>
            <span className="block text-lg sm:text-xl font-normal text-gray-500 mt-2 sm:mt-3">
              Your Trusted EV Charging Station Partner
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-lg max-w-2xl mx-auto">
            Experience the future of EV charging with our premium services designed for your convenience
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { 
              icon: '⚡', 
              title: 'Ultra-Fast Charging', 
              desc: 'Up to 120 kW power output for quick charging', 
              gradient: 'from-emerald-500 to-teal-600',
              bgGradient: 'from-emerald-50 to-teal-50',
              border: 'border-emerald-200',
              hover: 'hover:border-emerald-400',
              iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
              iconColor: 'text-emerald-600',
              stat: '100 kW+',
              statLabel: 'Average Output'
            },
            { 
              icon: '🔌', 
              title: 'Multiple Connectors', 
              desc: 'CCS2 & Type 2 available for all EV models', 
              gradient: 'from-orange-500 to-amber-600',
              bgGradient: 'from-orange-50 to-amber-50',
              border: 'border-orange-200',
              hover: 'hover:border-orange-400',
              iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
              iconColor: 'text-orange-600',
              stat: '3+ Types',
              statLabel: 'Connectors'
            },
            { 
              icon: '🛡️', 
              title: '24/7 Security', 
              desc: 'CCTV surveillance & trained security personnel', 
              gradient: 'from-blue-500 to-indigo-600',
              bgGradient: 'from-blue-50 to-indigo-50',
              border: 'border-blue-200',
              hover: 'hover:border-blue-400',
              iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
              iconColor: 'text-blue-600',
              stat: '24/7',
              statLabel: 'Monitoring'
            },
            { 
              icon: '💰', 
              title: 'Affordable Pricing', 
              desc: 'Competitive rates starting at just ₹20/unit', 
              gradient: 'from-purple-500 to-pink-600',
              bgGradient: 'from-purple-50 to-pink-50',
              border: 'border-purple-200',
              hover: 'hover:border-purple-400',
              iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
              iconColor: 'text-purple-600',
              stat: '₹20/unit',
              statLabel: 'Starting Price'
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                boxShadow: "0 25px 50px rgba(0,0,0,0.12)"
              }}
              className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border-2 ${item.border} ${item.hover} transition-all duration-300 shadow-lg cursor-pointer group relative overflow-hidden`}
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 ${item.iconBg} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className={`absolute -bottom-10 -left-10 w-24 h-24 ${item.iconBg} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className={`w-16 h-16 sm:w-24 sm:h-24 ${item.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10`}>
                <span className="text-3xl sm:text-5xl">{item.icon}</span>
              </div>
              
              <h3 className={`font-bold text-gray-800 text-base sm:text-xl mb-1 sm:mb-2 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent relative z-10`}>
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed relative z-10">{item.desc}</p>
              
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 relative z-10">
                <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gray-200 shadow-sm">
                  <span className={`font-bold text-xs sm:text-sm ${item.iconColor}`}>{item.stat}</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500 ml-1">{item.statLabel}</span>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 w-10 sm:w-12 h-1 mx-auto bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full group-hover:w-16 sm:group-hover:w-20 transition-all duration-300 relative z-10"></div>
              
              <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                <span className="text-[10px] sm:text-xs font-medium text-gray-500 flex items-center justify-center gap-1">
                  Learn More <FaArrowRight className="text-[8px] sm:text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-orange-50 via-amber-50 to-green-50 rounded-3xl p-6 sm:p-8 border-2 border-orange-200/50 shadow-lg"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">500+</p>
              <p className="text-xs sm:text-sm text-gray-500">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">1000+</p>
              <p className="text-xs sm:text-sm text-gray-500">Charging Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">4.8★</p>
              <p className="text-xs sm:text-sm text-gray-500">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">98%</p>
              <p className="text-xs sm:text-sm text-gray-500">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================
          FEATURED STATIONS - MODERN DESIGN
          ============================================================ */}
      {featuredStations.length > 0 && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-3xl sm:text-4xl">⭐</span> 
                Featured Stations
                <span className="text-xs sm:text-sm font-normal text-gray-400 bg-gray-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  Premium
                </span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">Handpicked premium charging locations for you</p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {featuredStations.length} Stations Available
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredStations.map((station, index) => {
              const cardColors = [
                { border: 'border-emerald-200 hover:border-emerald-400', gradient: 'from-emerald-500/10 to-teal-500/10', shadow: 'shadow-emerald-500/20' },
                { border: 'border-purple-200 hover:border-purple-400', gradient: 'from-purple-500/10 to-pink-500/10', shadow: 'shadow-purple-500/20' },
                { border: 'border-blue-200 hover:border-blue-400', gradient: 'from-blue-500/10 to-cyan-500/10', shadow: 'shadow-blue-500/20' },
              ];
              const color = cardColors[index % cardColors.length];
              
              return (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  onClick={() => {
                    setSelectedStation(station);
                    setShowModal(true);
                  }}
                  className={`group bg-white rounded-3xl border-2 ${color.border} transition-all duration-500 cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl ${color.shadow}`}
                >
                  <div className="relative p-4 sm:p-5 pb-0">
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/9] sm:aspect-[16/10]">
                      <img
                        src={station.image}
                        alt={station.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="gray" text-anchor="middle"%3ETransEV%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10">
                        <span className="text-sm sm:text-base">{station.locationIcon}</span>
                        <span className="text-white text-[9px] sm:text-xs font-medium">{station.location}</span>
                      </div>
                      
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10">
                        <span className="text-white text-[9px] sm:text-xs font-medium flex items-center gap-1">
                          <span>📍</span> {station.distance}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-xl flex items-center gap-1">
                          <span>⭐</span> Featured
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-20 sm:right-24">
                        <span className="flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[8px] sm:text-[10px] font-medium">
                          <FaCheckCircle className="text-[8px] sm:text-[10px]" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-3 sm:pt-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors truncate">
                          {station.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate flex items-center gap-1">
                          <span>📍</span> {station.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200 flex-shrink-0">
                        <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
                        <span className="text-[10px] sm:text-xs font-bold text-gray-700">{station.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                      <div className={`bg-gradient-to-br ${color.gradient} rounded-xl p-1.5 sm:p-2 text-center border border-gray-100`}>
                        <p className="text-[10px] sm:text-xs font-bold text-gray-700">{station.power}</p>
                        <p className="text-[6px] sm:text-[8px] text-gray-400 uppercase font-medium">Power</p>
                      </div>
                      <div className={`bg-gradient-to-br ${color.gradient} rounded-xl p-1.5 sm:p-2 text-center border border-gray-100`}>
                        <p className="text-[10px] sm:text-xs font-bold text-gray-700">{station.estimatedTime}</p>
                        <p className="text-[6px] sm:text-[8px] text-gray-400 uppercase font-medium">Time</p>
                      </div>
                      <div className={`bg-gradient-to-br ${color.gradient} rounded-xl p-1.5 sm:p-2 text-center border border-gray-100`}>
                        <p className="text-[10px] sm:text-xs font-bold text-emerald-600">{formatPrice(station.pricePerUnit)}</p>
                        <p className="text-[6px] sm:text-[8px] text-gray-400 uppercase font-medium">Price</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                      {station.connectorTypes.slice(0, 2).map((connector) => (
                        <span key={connector} className="px-1.5 sm:px-2 py-0.5 bg-gray-100 rounded-lg text-[7px] sm:text-[9px] text-gray-600 font-medium border border-gray-200">
                          <FaPlug className="inline mr-0.5 sm:mr-1 text-[6px] sm:text-[8px] text-emerald-500" /> 
                          {connector}
                        </span>
                      ))}
                      {station.connectorTypes.length > 2 && (
                        <span className="px-1.5 sm:px-2 py-0.5 bg-gray-100 rounded-lg text-[7px] sm:text-[9px] text-gray-500">+{station.connectorTypes.length - 2}</span>
                      )}
                    </div>

                    <div className="mt-3 sm:mt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${color.gradient.replace('/10', '')} text-gray-700 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all duration-300 border border-gray-200 hover:border-transparent hover:shadow-lg flex items-center justify-center gap-1 sm:gap-2 group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white`}
                      >
                        <span>View Details</span>
                        <FaArrowRight className="text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ============================================================
          ALL STATIONS SECTION
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">📍 All Charging Stations</h2>
            <p className="text-sm text-gray-500">Find the perfect charging spot near you</p>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl blur opacity-20"></div>
            <div className="relative">
              <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl">🔍</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by station name or location..."
                className="w-full pl-10 sm:pl-14 pr-4 sm:pr-5 py-4 sm:py-5 bg-white text-gray-800 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-sm sm:text-base placeholder:text-gray-400 shadow-xl"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            <span className="font-bold text-gray-800">{filteredStations.length}</span> stations found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredStations.map((station) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              onClick={() => {
                setSelectedStation(station);
                setShowModal(true);
              }}
              className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-400 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={station.image}
                  alt={station.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="gray" text-anchor="middle"%3ETransEV%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                  <span className="text-base sm:text-lg">{station.locationIcon}</span>
                  <span className="text-white text-[10px] sm:text-xs font-medium">{station.location}</span>
                </div>
                <div className={`absolute top-3 right-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(station.type)} shadow-xl`}>
                  {getTypeIcon(station.type)} {station.type}
                </div>
                {station.isVerified && (
                  <div className="absolute bottom-3 left-3 bg-emerald-500/90 backdrop-blur-md px-2 sm:px-4 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-xl">
                    <FaCheckCircle className="text-white text-[8px] sm:text-xs" />
                    <span className="text-white text-[8px] sm:text-xs font-medium">Verified</span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3">
                  <span className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-xs font-bold shadow-xl ${
                    station.status === 'opening-shortly' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  }`}>
                    {station.status === 'opening-shortly' ? '🚀 Opening Shortly' : '⏳ Opening Soon'}
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-5">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors">
                  {station.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <FaMapMarkerAlt className="text-emerald-500" />
                  {station.address}
                </p>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 text-center">
                    <p className="text-xs sm:text-sm font-bold text-gray-700">{station.power}</p>
                    <p className="text-[6px] sm:text-[8px] text-gray-400 uppercase font-medium">Power</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 text-center">
                    <p className="text-xs sm:text-sm font-bold text-gray-700">{station.estimatedTime}</p>
                    <p className="text-[6px] sm:text-[8px] text-gray-400 uppercase font-medium">Time</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 text-center">
                    <p className="text-xs sm:text-sm font-bold text-emerald-600">{formatPrice(station.pricePerUnit)}</p>
                    <p className="text-[6px] sm:text-[8px] text-gray-400 uppercase font-medium">Price</p>
                  </div>
                </div>

                <div className="mt-2 sm:mt-3">
                  <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                    <span className="text-[6px] sm:text-[8px] text-gray-400 font-medium">Progress</span>
                    <span className={`text-[6px] sm:text-[8px] font-bold ${
                      station.location === 'Bhiringi' ? 'text-emerald-600' : 
                      station.location === 'Bhastara' ? 'text-orange-600' : 
                      station.location === 'Uluberia' ? 'text-purple-600' : 
                      station.location === 'Khaserbheri' ? 'text-blue-600' : 
                      'text-rose-600'
                    }`}>
                      {station.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                    <motion.div 
                      className={`bg-gradient-to-r ${
                        station.location === 'Bhiringi' ? 'from-emerald-500 to-teal-500' : 
                        station.location === 'Bhastara' ? 'from-orange-500 to-amber-500' : 
                        station.location === 'Uluberia' ? 'from-purple-500 to-pink-500' : 
                        station.location === 'Khaserbheri' ? 'from-blue-500 to-cyan-500' : 
                        'from-rose-500 to-red-500'
                      } h-1.5 sm:h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${station.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>

                <div className="mt-2 sm:mt-3 flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs text-gray-500">{station.city}</span>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <FaStar className="text-yellow-400 text-[8px] sm:text-[10px]" />
                    <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">{station.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12 sm:py-20 bg-white rounded-3xl shadow-xl border-2 border-gray-200">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-3 sm:mb-5 shadow-2xl">
              <span className="text-3xl sm:text-5xl">🔌</span>
            </div>
            <p className="text-gray-500 font-medium text-lg sm:text-xl">No stations found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search</p>
          </div>
        )}
      </section>

      {/* ============================================================
          LOCATIONS MAP SECTION
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 sm:px-8 py-4 sm:py-6 border-b-2 border-gray-200">
            <h3 className="text-gray-800 font-bold text-xl sm:text-3xl flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-3xl sm:text-4xl">🗺️</span> Our Locations
              <span className="text-xs sm:text-sm font-normal text-gray-500">— Expanding Across West Bengal</span>
            </h3>
          </div>
          <div className="p-4 sm:p-8">
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
              We are building a comprehensive EV charging network across West Bengal. 
              Our stations are strategically located to serve you better. 
              <span className="block text-[10px] sm:text-xs text-gray-400 mt-2">
                🚀 {chargingStations.length} locations • 1 opening shortly • 4 opening soon
              </span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
              {chargingStations.map((station) => (
                <motion.div
                  key={station.id}
                  whileHover={{ 
                    scale: 1.08,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  className={`rounded-2xl p-4 sm:p-6 text-center border-2 transition-all duration-300 cursor-pointer bg-gradient-to-br ${locationColors[station.location] || 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'}`}
                  onClick={() => {
                    setSelectedStation(station);
                    setShowModal(true);
                  }}
                >
                  <span className="text-3xl sm:text-5xl block">{station.locationIcon}</span>
                  <p className="font-bold text-gray-800 text-sm sm:text-base mt-2 sm:mt-3">{station.location}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{station.city}</p>
                  <div className="mt-2 sm:mt-3">
                    <span className={`inline-block px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold shadow-xl ${
                      station.status === 'opening-shortly'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                    }`}>
                      {station.status === 'opening-shortly' ? '🚀 Opening Shortly' : '⏳ Opening Soon'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER SECTION
          ============================================================ */}
      <div className="bg-white-50 py-16 mx-auto sm:ml-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-8">
          <div className="flex items-center space-x-4 mb-6 sm:mb-0">
            <img src={logo1} alt="Company Logo" className="w-32 h-32" />
          </div>

          <div className="text-center sm:text-right">
            <div className="text-3xl sm:text-5xl font-semibold text-gray-800 mb-4">
              <a href="tel:+02033453310" className="relative inline-block hover:text-black-500">
                <span className="hover:underline transition-all duration-300">033-4601 5366</span>
              </a>
            </div>
            <div className="text-3xl sm:text-5xl font-semibold text-gray-800">
              <a href="mailto:tgwbin@gmail.com" className="relative inline-block hover:text-black-500">
                <span className="hover:underline transition-all duration-300 mt-2">tgwbin@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-gray-300 mx-8"></div>
        <footer className="bg-white text-black py-8 mt-20">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between px-8">
            <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
              <h4 className="text-xl sm:text-xl font-semibold mb-4">
                Pioneers in smart EV charging solutions <br />
              </h4>
              <a href="#" className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-105">
                <span>Client portal</span>
                <div className="ml-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-10 group-hover:h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="w-full sm:w-2/3 flex flex-col sm:flex-row justify-between sm:space-x-12 mt-10 sm:mt-0">
              <div className="mb-8 sm:mb-0">
                <h5 className="text-lg font-semibold mb-5">Navigation</h5>
                <ul className="space-y-2">
                  <li><a href="/solution" className="text-gray hover:underline text-lg">Solutions</a></li>
                  <li><a href="/contact" className="text-gray hover:underline text-lg">Contact</a></li>
                  <li><a href="/about" className="text-gray hover:underline text-lg">About</a></li>
                </ul>
              </div>

              <div className="mb-8 sm:mb-0">
                <h5 className="text-lg font-semibold mb-5">Follow us</h5>
                <ul className="space-y-2">
                  <li>
                    <a href="https://x.com/transevIN?t=yJ30BdH5D7TME1ZZQiQisw&s=09" className="text-gray hover:underline text-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </svg>
                    </a>
                  </li>
                  <li><a href="https://www.instagram.com/__transmogrify__?igsh=MWRzY25tc2wzMnk1ag==" className="text-gray hover:underline text-lg"> <FaInstagram color="#E1306C" size={28} /></a></li>
                  <li><a href="https://www.facebook.com/share/1NvgEQvwxG/" className="text-gray hover:underline text-lg"> <FaFacebook color="#1877F2" size={28} /></a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold mb-5">Legal</h5>
                <ul className="space-y-2">
                  <li><a href="/terms-conditions" className="text-gray hover:underline text-lg">Terms & Conditions</a></li>
                  <li><a href="/privacy-policy" className="text-gray hover:underline text-lg">Privacy Policy</a></li>
                  <li><a href="/shipping-policy" className="text-gray hover:underline text-lg">Shipping Policy</a></li>
                  <li><a href="/cancellation-policy" className="text-gray hover:underline text-lg">Cancellations and Refunds</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-lg lg:mr-300">
            <p>&copy; TransEV 2025. All Rights Reserved.</p>
          </div>
        </footer>
      </div>

      {/* ============================================================
          DETAIL MODAL
          ============================================================ */}
      <AnimatePresence>
        {showModal && selectedStation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`sticky top-0 z-10 text-white rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-r ${
                selectedStation.status === 'opening-shortly'
                  ? 'from-emerald-500 via-teal-500 to-cyan-500'
                  : 'from-emerald-500 to-teal-500'
              }`}>
                <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl">{selectedStation.locationIcon}</span>
                    <h2 className="text-white font-bold text-sm sm:text-lg">{selectedStation.name}</h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white text-lg sm:text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedStation.image}
                    alt={selectedStation.name}
                    className="w-full h-48 sm:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="gray" text-anchor="middle"%3ETransEV%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2 sm:gap-3">
                    <span className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(selectedStation.type)} shadow-xl`}>
                      {getTypeIcon(selectedStation.type)} {selectedStation.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                    <span className={`px-3 sm:px-5 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold text-white shadow-2xl ${
                      selectedStation.status === 'opening-shortly'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    }`}>
                      {selectedStation.status === 'opening-shortly' ? '🚀 Opening Shortly' : '⏳ Opening Soon'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <span className="text-white/90 text-[10px] sm:text-sm bg-black/50 backdrop-blur-md px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                      📍 {selectedStation.distance} away
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800">{selectedStation.name}</h2>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                    <FaMapMarkerAlt className="text-emerald-500" />
                    <span>{selectedStation.address}, {selectedStation.location}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 mt-2">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
                      ))}
                      <span className="text-gray-700 font-bold ml-1 sm:ml-2 text-sm sm:text-base">{selectedStation.rating}</span>
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm">({selectedStation.totalReviews} reviews)</span>
                  </div>
                </div>

                <div className={`mt-4 sm:mt-6 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 ${
                  selectedStation.status === 'opening-shortly'
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-3xl sm:text-5xl">{selectedStation.status === 'opening-shortly' ? '🚀' : '⏳'}</span>
                    <div>
                      <p className={`font-bold text-lg sm:text-2xl ${
                        selectedStation.status === 'opening-shortly' ? 'text-emerald-600' : 'text-orange-600'
                      }`}>
                        {selectedStation.status === 'opening-shortly' ? 'Opening Shortly!' : 'Opening Soon!'}
                      </p>
                      <p className={`text-xs sm:text-sm ${
                        selectedStation.status === 'opening-shortly' ? 'text-emerald-500' : 'text-orange-500'
                      }`}>
                        {selectedStation.status === 'opening-shortly' 
                          ? 'This station is almost ready! Launching very soon.' 
                          : 'This station is under construction and will be available soon.'}
                      </p>
                      <div className="mt-2 sm:mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] sm:text-xs text-gray-500">Progress</span>
                          <span className={`text-[10px] sm:text-xs font-bold ${selectedStation.status === 'opening-shortly' ? 'text-emerald-600' : 'text-orange-600'}`}>
                            {selectedStation.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                          <motion.div 
                            className={`h-2 sm:h-3 rounded-full ${
                              selectedStation.status === 'opening-shortly'
                                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedStation.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200">
                    <p className="text-[8px] sm:text-xs text-gray-500 font-medium">Price per unit</p>
                    <p className="text-lg sm:text-3xl font-bold text-emerald-600">{formatPrice(selectedStation.pricePerUnit)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200">
                    <p className="text-[8px] sm:text-xs text-gray-500 font-medium">Total Slots</p>
                    <p className="text-lg sm:text-3xl font-bold text-blue-600">{selectedStation.totalSlots}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200">
                    <p className="text-[8px] sm:text-xs text-gray-500 font-medium">Charging Time</p>
                    <p className="text-lg sm:text-3xl font-bold text-purple-600">{selectedStation.estimatedTime}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-200">
                    <p className="text-[8px] sm:text-xs text-gray-500 font-medium">Power Output</p>
                    <p className="text-lg sm:text-3xl font-bold text-orange-600">{selectedStation.power}</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h4 className="font-bold text-gray-700 text-base sm:text-lg mb-2 sm:mb-3">Connector Types</h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedStation.connectorTypes.map((connector) => (
                      <span key={connector} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-2 border-blue-200 shadow-md">
                        <FaPlug className="inline mr-1 sm:mr-2 text-xs sm:text-sm" /> {connector}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-gray-200">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-xl sm:text-2xl">🗺️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-700 text-sm sm:text-base">Location</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {selectedStation.address}, {selectedStation.city}, {selectedStation.state} - {selectedStation.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChargingStationLocator;