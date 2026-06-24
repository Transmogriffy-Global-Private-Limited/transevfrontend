// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
// import logo1 from '../assets/tv.png';
// import Navbar from './Navbar';

// // ============================================================
// // DATA – 5 Charging Stations
// // ============================================================

// const chargingStations = [
//   {
//     id: 1,
//     name: 'Bhiringi EV Charging Hub',
//     address: 'Bhiringi Main Road, Near Bus Stand',
//     location: 'Bhiringi',
//     city: 'Durgapur',
//     state: 'West Bengal',
//     pincode: '713212',
//     latitude: 23.5204,
//     longitude: 87.3119,
//     type: 'Ultra-Fast',
//     connectorTypes: ['CCS2', 'CHAdeMO', 'Type 2'],
//     pricePerUnit: 12.50,
//     available: 0,
//     totalSlots: 8,
//     isOpen: false,
//     openingTime: 'Coming Shortly',
//     closingTime: 'Coming Shortly',
//     amenities: ['Café', 'WiFi', 'Restroom', 'Waiting Lounge', 'Food Court', 'Shopping Area'],
//     rating: 0,
//     totalReviews: 0,
//     image: 'https://images.unsplash.com/photo-1593941707882-5a149525f90d?w=600&h=400&fit=crop',
//     distance: '0.5 km',
//     estimatedTime: '20-30 min',
//     power: '100 kW',
//     paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'Wallet'],
//     isFeatured: true,
//     isVerified: true,
//     region: 'Durgapur',
//     locationIcon: '🏠',
//     status: 'opening-shortly',
//     progress: 85,
//   },
//   {
//     id: 2,
//     name: 'Bhastara EV Charging Station',
//     address: 'Bhastara Main Road, Near Post Office',
//     location: 'Bhastara',
//     city: 'Bhastara',
//     state: 'West Bengal',
//     pincode: '713212',
//     latitude: 23.5404,
//     longitude: 87.3219,
//     type: 'Fast',
//     connectorTypes: ['CCS2', 'Type 2'],
//     pricePerUnit: 10.00,
//     available: 0,
//     totalSlots: 6,
//     isOpen: false,
//     openingTime: 'Opening Soon',
//     closingTime: 'Opening Soon',
//     amenities: ['Restroom', 'Mini Mart', 'Parking', 'Drinking Water'],
//     rating: 0,
//     totalReviews: 0,
//     image: 'https://images.unsplash.com/photo-1606220945770-b5b6a2a3f2b2?w=600&h=400&fit=crop',
//     distance: '1.2 km',
//     estimatedTime: '35-45 min',
//     power: '50 kW',
//     paymentMethods: ['UPI', 'Credit Card', 'Google Pay'],
//     isFeatured: false,
//     isVerified: true,
//     region: 'Bhastara',
//     locationIcon: '🏡',
//     status: 'opening-soon',
//     progress: 45,
//   },
//   {
//     id: 3,
//     name: 'Uluberia EV Charging Hub',
//     address: 'Uluberia Station Road, Near Railway Station',
//     location: 'Uluberia',
//     city: 'Uluberia',
//     state: 'West Bengal',
//     pincode: '711315',
//     latitude: 22.4704,
//     longitude: 88.1204,
//     type: 'Ultra-Fast',
//     connectorTypes: ['CCS2', 'Type 2'],
//     pricePerUnit: 13.50,
//     available: 0,
//     totalSlots: 6,
//     isOpen: false,
//     openingTime: 'Opening Soon',
//     closingTime: 'Opening Soon',
//     amenities: ['Shopping Mall', 'Food Court', 'Restroom', 'Parking', 'WiFi', 'Kids Zone'],
//     rating: 0,
//     totalReviews: 0,
//     image: 'https://images.unsplash.com/photo-1593941707882-5a149525f90d?w=600&h=400&fit=crop&1',
//     distance: '1.0 km',
//     estimatedTime: '20-25 min',
//     power: '120 kW',
//     paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'Wallet'],
//     isFeatured: false,
//     isVerified: true,
//     region: 'Uluberia',
//     locationIcon: '🌆',
//     status: 'opening-soon',
//     progress: 55,
//   },
//   {
//     id: 4,
//     name: 'Khaserbheri EV Charging Point',
//     address: 'Khaserbheri Main Road, Near School',
//     location: 'Khaserbheri',
//     city: 'Khaserbheri',
//     state: 'West Bengal',
//     pincode: '713212',
//     latitude: 23.5604,
//     longitude: 87.3419,
//     type: 'Slow',
//     connectorTypes: ['Type 2', 'BS 1363'],
//     pricePerUnit: 8.00,
//     available: 0,
//     totalSlots: 6,
//     isOpen: false,
//     openingTime: 'Opening Soon',
//     closingTime: 'Opening Soon',
//     amenities: ['Waiting Hall', 'Restroom', 'Parking', 'Mini Mart', 'Tea Stall'],
//     rating: 0,
//     totalReviews: 0,
//     image: 'https://images.unsplash.com/photo-1606220945770-b5b6a2a3f2b2?w=600&h=400&fit=crop&2',
//     distance: '2.0 km',
//     estimatedTime: '1-2 hours',
//     power: '22 kW',
//     paymentMethods: ['UPI', 'Credit Card', 'Cash'],
//     isFeatured: false,
//     isVerified: true,
//     region: 'Khaserbheri',
//     locationIcon: '🏞️',
//     status: 'opening-soon',
//     progress: 35,
//   },
//   {
//     id: 5,
//     name: 'Chanditala EV Charging Station',
//     address: 'Chanditala Main Road, Near Bus Stand',
//     location: 'Chanditala',
//     city: 'Chanditala',
//     state: 'West Bengal',
//     pincode: '712304',
//     latitude: 22.6904,
//     longitude: 88.1904,
//     type: 'Slow',
//     connectorTypes: ['Type 2', 'BS 1363'],
//     pricePerUnit: 7.50,
//     available: 0,
//     totalSlots: 4,
//     isOpen: false,
//     openingTime: 'Opening Soon',
//     closingTime: 'Opening Soon',
//     amenities: ['Restroom', 'Parking', 'WiFi', 'Drinking Water'],
//     rating: 0,
//     totalReviews: 0,
//     image: 'https://images.unsplash.com/photo-1626976812753-ae6bf6ab4a18?w=600&h=400&fit=crop&2',
//     distance: '1.8 km',
//     estimatedTime: '2-3 hours',
//     power: '15 kW',
//     paymentMethods: ['UPI', 'Credit Card'],
//     isFeatured: false,
//     isVerified: true,
//     region: 'Chanditala',
//     locationIcon: '🌾',
//     status: 'opening-soon',
//     progress: 25,
//   },
// ];

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// const ChargingStationLocator = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [selectedStation, setSelectedStation] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const filteredStations = chargingStations.filter((station) => {
//     const matchesSearch =
//       station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       station.address.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesType = filterType === 'all' || station.type === filterType;

//     return matchesSearch && matchesType;
//   });

//   const openingShortlyStation = chargingStations.find((s) => s.status === 'opening-shortly');
//   const openingSoonStations = chargingStations.filter((s) => s.status === 'opening-soon');

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'Ultra-Fast': return 'from-violet-500 to-fuchsia-500';
//       case 'Fast': return 'from-emerald-500 to-teal-500';
//       case 'Slow': return 'from-amber-500 to-orange-500';
//       default: return 'from-gray-500 to-gray-500';
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case 'Ultra-Fast': return '⚡';
//       case 'Fast': return '🔋';
//       case 'Slow': return '🐢';
//       default: return '🔌';
//     }
//   };

//   const formatPrice = (price) => {
//     return `₹${price.toFixed(2)}`;
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedStation(null);
//   };

//   // Location colors for cards
//   const locationColors = {
//     'Bhiringi': 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
//     'Bastara': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
//     'Uluberia': 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
//     'Khaserbheri': 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
//     'Chanditala': 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
//   };

//   const locationBadgeColors = {
//     'Bhiringi': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
//     'Bastara': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
//     'Uluberia': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
//     'Khaserbheri': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
//     'Chanditala': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//       <Helmet>
//         <title>EV Charging Stations | TransEV Network</title>
//         <meta
//           name="description"
//           content="Find EV charging stations across West Bengal. Bhiringi opening shortly, Bastara, Uluberia, Khaserbheri, and Chanditala coming soon."
//         />
//         <meta name="robots" content="index, follow" />
//         <meta property="og:title" content="EV Charging Stations | TransEV Network" />
//         <meta property="og:description" content="Find EV charging stations across West Bengal." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://transev.site/blog" />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Helmet>

//       <Navbar />

//       {/* ============================================================
//           SPACER - Gap between Navbar and Content
//           ============================================================ */}
//       <div className="h-8"></div>

//       {/* ============================================================
//           HERO SECTION - BHIRINGI (White Background)
//           ============================================================ */}
//       {openingShortlyStation && (
//         <section className="relative overflow-hidden bg-white">
//           <div className="absolute inset-0">
//             <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
//             <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-3xl"></div>
//           </div>
          
//           <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               {/* Image */}
//               <div className="order-2 lg:order-1">
//                 <div className="relative group">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
//                   <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                     <img
//                       src={openingShortlyStation.image}
//                       alt={openingShortlyStation.name}
//                       className="w-full h-80 object-cover"
//                       onError={(e) => {
//                         e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23e5e7eb"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="white" text-anchor="middle"%3EBhiringi EV Hub%3C/text%3E%3C/svg%3E';
//                       }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
//                     <div className="absolute top-4 left-4 flex gap-2">
//                       <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-lg">
//                         ⭐ Featured
//                       </span>
//                       <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30">
//                         {openingShortlyStation.type}
//                       </span>
//                     </div>
//                     <div className="absolute bottom-4 right-4">
//                       <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-lg animate-pulse">
//                         🚀 Opening Shortly
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="order-1 lg:order-2">
//                 <div className="inline-flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full mb-4 border border-rose-200">
//                   <span className="animate-pulse text-lg">🚀</span>
//                   <span className="text-sm font-medium text-rose-600">Coming Soon • {openingShortlyStation.location}</span>
//                 </div>
//                 <h2 className="text-4xl md:text-5xl font-bold leading-tight">
//                   <span className="bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
//                     {openingShortlyStation.name}
//                   </span>
//                 </h2>
//                 <p className="text-gray-600 text-lg mt-3">
//                   {openingShortlyStation.address}, {openingShortlyStation.city}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-3 mt-4">
//                   <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
//                     <span className="text-xl">⚡</span>
//                     <span className="font-medium text-gray-700">{openingShortlyStation.power}</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
//                     <span className="text-xl">🔌</span>
//                     <span className="font-medium text-gray-700">{openingShortlyStation.connectorTypes.join(', ')}</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
//                     <span className="text-xl">💰</span>
//                     <span className="font-medium text-gray-700">{formatPrice(openingShortlyStation.pricePerUnit)}/unit</span>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="mt-5">
//                   <div className="flex justify-between items-center mb-1">
//                     <span className="text-sm text-gray-600">Construction Progress</span>
//                     <span className="text-sm font-bold text-fuchsia-600">{openingShortlyStation.progress}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div 
//                       className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 h-2.5 rounded-full transition-all duration-1000"
//                       style={{ width: `${openingShortlyStation.progress}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-gray-500 text-xs mt-1">🔧 Almost ready! Launching very soon.</p>
//                 </div>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {openingShortlyStation.amenities.slice(0, 4).map((amenity) => (
//                     <span key={amenity} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
//                       {amenity}
//                     </span>
//                   ))}
//                   {openingShortlyStation.amenities.length > 4 && (
//                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-400">
//                       +{openingShortlyStation.amenities.length - 4}
//                     </span>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => {
//                     setSelectedStation(openingShortlyStation);
//                     setShowModal(true);
//                   }}
//                   className="mt-5 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 flex items-center gap-2"
//                 >
//                   View Details →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ============================================================
//           STATS SECTION - White Background
//           ============================================================ */}
//       <section className="bg-white border-y border-gray-200 py-6 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-wrap justify-center gap-8 md:gap-12">
//             <div className="text-center">
//               <p className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
//                 {chargingStations.length}
//               </p>
//               <p className="text-sm text-gray-500">Total Stations</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
//                 1
//               </p>
//               <p className="text-sm text-gray-500">Opening Shortly</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
//                 {openingSoonStations.length}
//               </p>
//               <p className="text-sm text-gray-500">Opening Soon</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
//                 ⚡ 5
//               </p>
//               <p className="text-sm text-gray-500">Charging Points</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//           MAIN CONTENT - White Background
//           ============================================================ */}
//       <main className="max-w-7xl mx-auto px-4 py-8 bg-white">
//         {/* Search & Filter */}
//         <div className="mb-8 space-y-3">
//           <div className="relative">
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search by station name or location..."
//               className="w-full pl-10 pr-4 py-4 bg-gray-50 text-gray-800 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-300 text-sm placeholder:text-gray-400"
//             />
//           </div>

//           <div className="flex gap-1.5 bg-gray-50 rounded-2xl p-1.5 border border-gray-200 overflow-x-auto">
//             {['all', 'Ultra-Fast', 'Fast', 'Slow'].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setFilterType(type)}
//                 className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
//                   filterType === type
//                     ? 'bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 text-white shadow-lg shadow-rose-500/30'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {type === 'all' ? 'All Stations' : type === 'Ultra-Fast' ? '⚡ Ultra-Fast' : type === 'Fast' ? '🔋 Fast' : '🐢 Slow'}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Results */}
//         <div className="flex items-center justify-between mb-6">
//           <p className="text-sm text-gray-500 font-medium">
//             <span className="font-bold text-gray-800">{filteredStations.length}</span> stations found
//           </p>
//         </div>

//         {/* ===== OPENING SOON STATIONS ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredStations
//             .filter((s) => s.status === 'opening-soon')
//             .map((station) => (
//               <div
//                 key={station.id}
//                 onClick={() => {
//                   setSelectedStation(station);
//                   setShowModal(true);
//                 }}
//                 className={`group bg-white rounded-2xl border border-gray-200 hover:border-${station.location === 'Bastara' ? 'blue' : station.location === 'Uluberia' ? 'emerald' : station.location === 'Khaserbheri' ? 'amber' : 'purple'}-300 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-${station.location === 'Bastara' ? 'blue' : station.location === 'Uluberia' ? 'emerald' : station.location === 'Khaserbheri' ? 'amber' : 'purple'}-500/10 overflow-hidden`}
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={station.image}
//                     alt={station.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     onError={(e) => {
//                       e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="gray" text-anchor="middle"%3EEV Station%3C/text%3E%3C/svg%3E';
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                   <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                     <span className="text-lg">{station.locationIcon}</span>
//                     <span className="text-white text-xs font-medium">{station.location}</span>
//                   </div>
//                   <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-gradient-to-r ${getTypeColor(station.type)}`}>
//                     {getTypeIcon(station.type)} {station.type}
//                   </div>
//                   <div className="absolute bottom-3 right-3">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${locationBadgeColors[station.location] || 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'}`}>
//                       ⏳ Opening Soon
//                     </span>
//                   </div>
//                   <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                     <span className="text-white text-xs font-medium">📍 {station.distance}</span>
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-bold text-gray-800 text-sm group-hover:text-fuchsia-600 transition-colors truncate">
//                         {station.name}
//                       </h3>
//                       <p className="text-xs text-gray-500 truncate">{station.address}</p>
//                     </div>
//                     <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border ${locationBadgeColors[station.location] || 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'} flex-shrink-0 ml-2`}>
//                       <span className="text-xs">⏳</span>
//                       <span className="font-bold text-[10px]">Soon</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-1 mt-2">
//                     {station.connectorTypes.slice(0, 2).map((connector) => (
//                       <span key={connector} className="px-2 py-0.5 bg-gray-100 rounded-lg text-[10px] text-gray-600">
//                         🔌 {connector}
//                       </span>
//                     ))}
//                     {station.connectorTypes.length > 2 && (
//                       <span className="px-2 py-0.5 bg-gray-100 rounded-lg text-[10px] text-gray-500">+{station.connectorTypes.length - 2}</span>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-3 gap-1.5 mt-3">
//                     <div className="bg-gray-50 rounded-xl p-1.5 text-center">
//                       <p className="text-xs font-bold text-gray-700">{station.power}</p>
//                       <p className="text-[8px] text-gray-400 uppercase">Power</p>
//                     </div>
//                     <div className="bg-gray-50 rounded-xl p-1.5 text-center">
//                       <p className="text-xs font-bold text-gray-700">{station.estimatedTime}</p>
//                       <p className="text-[8px] text-gray-400 uppercase">Time</p>
//                     </div>
//                     <div className="bg-gray-50 rounded-xl p-1.5 text-center">
//                       <p className="text-xs font-bold text-fuchsia-600">{formatPrice(station.pricePerUnit)}</p>
//                       <p className="text-[8px] text-gray-400 uppercase">Price</p>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="mt-2">
//                     <div className="flex justify-between items-center mb-0.5">
//                       <span className="text-[8px] text-gray-400">Progress</span>
//                       <span className={`text-[8px] font-bold ${station.location === 'Bhiringi' ? 'text-rose-500' : station.location === 'Bastara' ? 'text-blue-500' : station.location === 'Uluberia' ? 'text-emerald-500' : station.location === 'Khaserbheri' ? 'text-amber-500' : 'text-purple-500'}`}>
//                         {station.progress}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-1.5">
//                       <div 
//                         className={`bg-gradient-to-r ${station.location === 'Bhiringi' ? 'from-rose-400 to-fuchsia-400' : station.location === 'Bastara' ? 'from-blue-400 to-cyan-400' : station.location === 'Uluberia' ? 'from-emerald-400 to-teal-400' : station.location === 'Khaserbheri' ? 'from-amber-400 to-orange-400' : 'from-purple-400 to-violet-400'} h-1.5 rounded-full transition-all duration-1000`}
//                         style={{ width: `${station.progress}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between">
//                     <div className="flex items-center gap-1">
//                       <span className="text-[10px] text-gray-400">🚧</span>
//                       <span className="text-[10px] text-gray-500">{station.city}</span>
//                     </div>
//                     <span className={`text-[10px] font-medium ${station.location === 'Bhiringi' ? 'text-rose-500' : station.location === 'Bastara' ? 'text-blue-500' : station.location === 'Uluberia' ? 'text-emerald-500' : station.location === 'Khaserbheri' ? 'text-amber-500' : 'text-purple-500'}`}>
//                       ⏳ Opening Soon
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {filteredStations.filter((s) => s.status === 'opening-soon').length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
//               <span className="text-4xl">🔌</span>
//             </div>
//             <p className="text-gray-500 font-medium">No stations found</p>
//             <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
//           </div>
//         )}

//         {/* ============================================================
//             OUR LOCATIONS SECTION - White Background
//             ============================================================ */}
//         <div className="mt-16 bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
//           <div className="bg-gradient-to-r from-rose-500/10 via-fuchsia-500/10 to-violet-500/10 px-6 py-5 border-b border-gray-200">
//             <h3 className="text-gray-800 font-bold text-2xl flex items-center gap-3">
//               <span>🗺️</span> Our Locations
//               <span className="text-sm font-normal text-gray-500 ml-2">— Expanding Across West Bengal</span>
//             </h3>
//           </div>
//           <div className="p-6">
//             <p className="text-gray-600 text-sm mb-6">
//               We are building a comprehensive EV charging network across West Bengal. 
//               Our stations are strategically located to serve you better. 
//               <span className="block text-xs text-gray-400 mt-1">
//                 🚀 {chargingStations.length} locations • 1 opening shortly • 4 opening soon
//               </span>
//             </p>

//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {chargingStations.map((station) => (
//                 <div
//                   key={station.id}
//                   className={`rounded-2xl p-5 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-gradient-to-br ${locationColors[station.location] || 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20'}`}
//                   onClick={() => {
//                     setSelectedStation(station);
//                     setShowModal(true);
//                   }}
//                 >
//                   <span className="text-4xl block">{station.locationIcon}</span>
//                   <p className="font-bold text-gray-800 text-sm mt-2">{station.location}</p>
//                   <p className="text-[10px] text-gray-500">{station.city}</p>
//                   <div className="mt-2 flex flex-col items-center gap-1">
//                     <span className={`inline-block px-3 py-0.5 rounded-full text-[8px] font-bold ${locationBadgeColors[station.location] || 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>
//                       {station.status === 'opening-shortly' ? '🚀 Opening Shortly' : '⏳ Opening Soon'}
//                     </span>
//                     <span className="text-[8px] text-gray-500">Progress: {station.progress}%</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* What We Offer */}
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
//               <div className="flex items-center gap-3 bg-gradient-to-br from-rose-500/10 to-fuchsia-500/10 rounded-xl p-3 border border-gray-200">
//                 <span className="text-2xl">⚡</span>
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">Ultra-Fast Charging</p>
//                   <p className="text-xs text-gray-500">Up to 120 kW power output</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-3 border border-gray-200">
//                 <span className="text-2xl">🔌</span>
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">Multiple Connectors</p>
//                   <p className="text-xs text-gray-500">CCS2, CHAdeMO, Type 2</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-3 border border-gray-200">
//                 <span className="text-2xl">🛡️</span>
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">24/7 Security</p>
//                   <p className="text-xs text-gray-500">CCTV & Security personnel</p>
//                 </div>
//               </div>
//             </div>

//             {/* Expansion Plan */}
//             <div className="mt-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
//               <div className="flex items-start gap-3">
//                 <span className="text-2xl">🚀</span>
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">Our Expansion Plan</p>
//                   <p className="text-xs text-gray-600">
//                     We are expanding our network to cover more cities across West Bengal. 
//                     Bhiringi is opening shortly, followed by Bastara, Uluberia, Khaserbheri, and Chanditala.
//                     <span className="block text-amber-600 font-medium mt-1">
//                       🌟 Stay tuned for more locations coming soon!
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* ============================================================
//           FOOTER SECTION
//           ============================================================ */}
//       <div className="bg-white py-16 mt-15 border-t border-gray-200">
//         <div className="container mx-auto px-8">
//           <div className="flex flex-col lg:flex-row justify-between items-center">
//             <div className="flex items-center space-x-4 mb-8 lg:mb-0">
//               <img src={logo1} alt="Company Logo" className="w-32 h-32" />
//             </div>

//             <div className="text-center lg:text-right">
//               <div className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
//                 <a href="tel:+02033453310" className="hover:underline transition duration-300">
//                   033-4601 5366
//                 </a>
//               </div>
//               <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
//                 <a href="mailto:tgwbin@gmail.com" className="hover:underline transition duration-300">
//                   tgwbin@gmail.com
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="mt-10 border-t-2 border-gray-300"></div>
    
//           <footer className="text-black py-10">
//             <div className="flex flex-col lg:flex-row justify-between gap-12">
//               <div className="lg:w-1/3">
//                 <h4 className="text-lg sm:text-xl font-semibold mb-4">
//                   Pioneers in smart EV charging solutions
//                 </h4>
//                 <a
//                   href="#"
//                   className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 mt-6"
//                 >
//                   <span>Client portal</span>
//                   <div className="ml-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </div>
//                 </a>
//               </div>

//               <div className="lg:w-2/3 flex flex-col sm:flex-row justify-between gap-10">
//                 <div>
//                   <h5 className="text-base sm:text-lg font-semibold mb-4">Navigation</h5>
//                   <ul className="space-y-2 text-sm sm:text-base">
//                     <li><a href="/solution" className="hover:underline">Solutions</a></li>
//                     <li><a href="/contact" className="hover:underline">Contact</a></li>
//                     <li><a href="/about" className="hover:underline">About</a></li>
//                   </ul>
//                 </div>

//                 <div>
//                   <h5 className="text-base sm:text-lg font-semibold mb-4">Follow us</h5>
//                   <ul className="space-y-2 text-sm sm:text-base">
//                     <li>
//                       <a href="https://x.com/transevIN?t=yJ30BdH5D7TME1ZZQiQisw&s=09" className="text-gray-600 hover:text-gray-900 transition-colors">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
//                           <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
//                         </svg>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="https://www.instagram.com/__transmogrify__?igsh=MWRzY25tc2wzMnk1ag==" className="text-gray-600 hover:text-gray-900 transition-colors">
//                         <FaInstagram color="#E1306C" size={28} />
//                       </a>
//                     </li>
//                     <li>
//                       <a href="https://www.facebook.com/share/1NvgEQvwxG/" className="text-gray-600 hover:text-gray-900 transition-colors">
//                         <FaFacebook color="#1877F2" size={28} />
//                       </a>
//                     </li>
//                   </ul>
//                 </div>

//                 <div>
//                   <h5 className="text-base sm:text-lg font-semibold mb-4">Legal</h5>
//                   <ul className="space-y-2 text-sm sm:text-base">
//                     <li><a href="/terms-conditions" className="hover:underline">Terms & Conditions</a></li>
//                     <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
//                     <li><a href="/shipping-policy" className="hover:underline">Shipping Policy</a></li>
//                     <li><a href="/cancellation-policy" className="hover:underline">Cancellations and Refunds</a></li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-10 text-center text-gray-500 text-sm sm:text-base">
//               <p>&copy; TransEV 2025. All Rights Reserved.</p>
//             </div>
//           </footer>
//         </div>
//       </div>

//       {/* ============================================================
//           DETAIL MODAL
//           ============================================================ */}
//       {showModal && selectedStation && (
//         <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
//           <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
//             <div className={`sticky top-0 z-10 text-white rounded-t-3xl ${
//               selectedStation.status === 'opening-shortly'
//                 ? 'bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500'
//                 : 'bg-gradient-to-r from-cyan-500 to-blue-500'
//             }`}>
//               <div className="flex items-center justify-between px-6 py-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl">{selectedStation.locationIcon}</span>
//                   <h2 className="text-white font-bold text-sm">{selectedStation.name}</h2>
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src={selectedStation.image}
//                   alt={selectedStation.name}
//                   className="w-full h-64 object-cover"
//                   onError={(e) => {
//                     e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="gray" text-anchor="middle"%3EEV Station%3C/text%3E%3C/svg%3E';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                 <div className="absolute top-4 left-4 flex gap-2">
//                   <span className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(selectedStation.type)}`}>
//                     {getTypeIcon(selectedStation.type)} {selectedStation.type}
//                   </span>
//                   {selectedStation.isVerified && (
//                     <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-white shadow-lg flex items-center gap-1">
//                       ✅ Verified
//                     </span>
//                   )}
//                 </div>
//                 <div className="absolute bottom-4 right-4">
//                   <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg ${
//                     selectedStation.status === 'opening-shortly'
//                       ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black'
//                       : 'bg-gradient-to-r from-cyan-400 to-blue-400'
//                   }`}>
//                     {selectedStation.status === 'opening-shortly' ? '🚀 Opening Shortly' : '⏳ Opening Soon'}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-4 left-4">
//                   <span className="text-white/90 text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
//                     📍 {selectedStation.distance} away
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-5">
//                 <h2 className="text-2xl font-bold text-gray-800">{selectedStation.name}</h2>
//                 <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
//                   <span>📍</span>
//                   <span>{selectedStation.address}, {selectedStation.location}</span>
//                 </div>
//               </div>

//               <div className={`mt-4 rounded-2xl p-6 border ${
//                 selectedStation.status === 'opening-shortly'
//                   ? 'bg-rose-50 border-rose-200'
//                   : 'bg-cyan-50 border-cyan-200'
//               }`}>
//                 <div className="flex items-center gap-3">
//                   <span className="text-4xl">{selectedStation.status === 'opening-shortly' ? '🚀' : '⏳'}</span>
//                   <div>
//                     <p className={`font-bold text-lg ${
//                       selectedStation.status === 'opening-shortly' ? 'text-rose-600' : 'text-cyan-600'
//                     }`}>
//                       {selectedStation.status === 'opening-shortly' ? 'Opening Shortly!' : 'Opening Soon!'}
//                     </p>
//                     <p className={`text-sm ${
//                       selectedStation.status === 'opening-shortly' ? 'text-rose-500' : 'text-cyan-500'
//                     }`}>
//                       {selectedStation.status === 'opening-shortly' 
//                         ? 'This station is almost ready! Launching very soon.' 
//                         : 'This station is under construction and will be available soon.'}
//                     </p>
//                     <div className="mt-2">
//                       <div className="flex justify-between items-center mb-0.5">
//                         <span className="text-xs text-gray-500">Progress</span>
//                         <span className={`text-xs font-bold ${selectedStation.status === 'opening-shortly' ? 'text-rose-600' : 'text-cyan-600'}`}>
//                           {selectedStation.progress}%
//                         </span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2.5">
//                         <div 
//                           className={`h-2.5 rounded-full transition-all duration-1000 ${
//                             selectedStation.status === 'opening-shortly'
//                               ? 'bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400'
//                               : 'bg-gradient-to-r from-cyan-400 to-blue-400'
//                           }`}
//                           style={{ width: `${selectedStation.progress}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mt-4">
//                 <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
//                   <p className="text-xs text-gray-500 font-medium">Price per unit</p>
//                   <p className="text-2xl font-bold text-emerald-600">{formatPrice(selectedStation.pricePerUnit)}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
//                   <p className="text-xs text-gray-500 font-medium">Total Slots</p>
//                   <p className="text-2xl font-bold text-blue-600">{selectedStation.totalSlots}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
//                   <p className="text-xs text-gray-500 font-medium">Charging Time</p>
//                   <p className="text-2xl font-bold text-purple-600">{selectedStation.estimatedTime}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
//                   <p className="text-xs text-gray-500 font-medium">Power Output</p>
//                   <p className="text-2xl font-bold text-orange-600">{selectedStation.power}</p>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <h4 className="font-bold text-gray-700 mb-2">Amenities</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedStation.amenities.map((amenity) => (
//                     <span key={amenity} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium border border-gray-200">
//                       {amenity}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <h4 className="font-bold text-gray-700 mb-2">Connector Types</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedStation.connectorTypes.map((connector) => (
//                     <span key={connector} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200">
//                       🔌 {connector}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <h4 className="font-bold text-gray-700 mb-2">Payment Methods</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedStation.paymentMethods.map((method) => (
//                     <span key={method} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium border border-purple-200">
//                       {method}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-200">
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                     <span>🗺️</span>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-semibold text-gray-700">Location</p>
//                     <p className="text-sm text-gray-500 truncate">
//                       {selectedStation.address}, {selectedStation.city}, {selectedStation.state} - {selectedStation.pincode}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px) scale(0.95); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.6; }
//         }
//         .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//         .animate-slideUp { animation: slideUp 0.3s ease-out; }
//         .animate-pulse { animation: pulse 1.5s infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default ChargingStationLocator;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import logo1 from '../assets/tv.png';
import Navbar from './Navbar';
import brandImage from '../assets/image (2).png'; // Your TransEV poster image
import BhiringeeImage from '../assets/image (3).png';
// ============================================================
// DATA – 5 Charging Stations
// ============================================================

const chargingStations = [
  {
    id: 1,
    name: 'Bhiringi EV Charging Hub',
    address: 'Bhiringi Main Road, Near Bus Stand',
    location: 'Bhiringi',
    city: 'Durgapur',
    state: 'West Bengal',
    pincode: '713212',
    latitude: 23.5204,
    longitude: 87.3119,
    type: 'Ultra-Fast',
    connectorTypes: ['CCS2', 'CHAdeMO', 'Type 2'],
    pricePerUnit: 20,
    available: 0,
    totalSlots: 8,
    isOpen: false,
    openingTime: 'Coming Shortly',
    closingTime: 'Coming Shortly',
    amenities: ['Café', 'WiFi', 'Restroom', 'Waiting Lounge', 'Food Court', 'Shopping Area'],
    rating: 0,
    totalReviews: 0,
    image: BhiringeeImage, // Using Bhiringee image
    distance: '0.5 km',
    estimatedTime: '20-30 min',
    power: '100 kW',
    paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'Wallet'],
    isFeatured: true,
    isVerified: true,
    region: 'Durgapur',
    locationIcon: '🏠',
    status: 'opening-shortly',
    progress: 85,
  },
  {
    id: 2,
    name: 'Bhastara EV Charging Station',
    address: 'Bhastara Main Road, Near Post Office',
    location: 'Bastara',
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
    rating: 0,
    totalReviews: 0,
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
    rating: 0,
    totalReviews: 0,
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
    type: 'Slow',
    connectorTypes: ['Type 2', 'BS 1363'],
    pricePerUnit: 20.00,
    available: 0,
    totalSlots: 6,
    isOpen: false,
    openingTime: 'Opening Soon',
    closingTime: 'Opening Soon',
    amenities: ['Waiting Hall', 'Restroom', 'Parking', 'Mini Mart', 'Tea Stall'],
    rating: 0,
    totalReviews: 0,
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
    rating: 0,
    totalReviews: 0,
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
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

const ChargingStationLocator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedStation, setSelectedStation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredStations = chargingStations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || station.type === filterType;

    return matchesSearch && matchesType;
  });

  const openingShortlyStation = chargingStations.find((s) => s.status === 'opening-shortly');
  const openingSoonStations = chargingStations.filter((s) => s.status === 'opening-soon');

  const getTypeColor = (type) => {
    switch (type) {
      case 'Ultra-Fast': return 'from-green-500 to-emerald-500';
      case 'Fast': return 'from-orange-500 to-amber-500';
      case 'Slow': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-500';
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

  // Location colors for cards - Green & Orange theme
  const locationColors = {
    'Bhiringi': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    'Bhastara': 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
    'Uluberia': 'from-green-500/20 to-teal-500/20 border-green-500/30',
    'Khaserbheri': 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
    'Chanditala': 'from-emerald-500/20 to-green-500/20 border-emerald-500/30',
  };

  const locationBadgeColors = {
    'Bhiringi': 'bg-green-500/20 text-green-600 border-green-500/30',
    'Bhastara': 'bg-orange-500/20 text-orange-600 border-orange-500/30',
    'Uluberia': 'bg-green-500/20 text-green-600 border-green-500/30',
    'Khaserbheri': 'bg-orange-500/20 text-orange-600 border-orange-500/30',
    'Chanditala': 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
  };

  return (
    <div className="min-h-screen bg-white">
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
          SPACER - Gap between Navbar and Content
          ============================================================ */}
      <div className="h-8"></div>

      {/* ============================================================
          HERO SECTION - BHIRINGI (Green & Orange Theme)
          ============================================================ */}
      {openingShortlyStation && (
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={openingShortlyStation.image}
                      alt={openingShortlyStation.name}
                      className="w-full h-95 object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23e5e7eb"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="white" text-anchor="middle"%3ETransEV%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-400 to-amber-400 text-black shadow-lg">
                        ⭐ Featured
                      </span>
                      {/* <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                        {openingShortlyStation.type}
                      </span> */}
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg animate-pulse">
                        🚀 Opening Shortly
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-4 border border-green-200">
                  <span className="animate-pulse text-lg">🚀</span>
                  <span className="text-sm font-medium text-green-600">Coming Soon • {openingShortlyStation.location}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-orange-600 bg-clip-text text-transparent">
                    {openingShortlyStation.name}
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mt-3">
                  {openingShortlyStation.address}, {openingShortlyStation.city}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <span className="text-xl">⚡</span>
                    <span className="font-medium text-gray-700">{openingShortlyStation.power}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <span className="text-xl">🔌</span>
                    <span className="font-medium text-gray-700">{openingShortlyStation.connectorTypes.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <span className="text-xl">💰</span>
                    <span className="font-medium text-gray-700">{formatPrice(openingShortlyStation.pricePerUnit)}/unit</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Construction Progress</span>
                    <span className="text-sm font-bold text-green-600">{openingShortlyStation.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 via-emerald-500 to-orange-500 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: `${openingShortlyStation.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">🔧 Almost ready! Launching very soon.</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {openingShortlyStation.amenities.slice(0, 4).map((amenity) => (
                    <span key={amenity} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                      {amenity}
                    </span>
                  ))}
                  {openingShortlyStation.amenities.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-400">
                      +{openingShortlyStation.amenities.length - 4}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedStation(openingShortlyStation);
                    setShowModal(true);
                  }}
                  className="mt-5 bg-gradient-to-r from-green-500 via-emerald-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 flex items-center gap-2"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          STATS SECTION - White Background
          ============================================================ */}
      <section className="bg-white border-y border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {chargingStations.length}
              </p>
              <p className="text-sm text-gray-500">Total Stations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                1
              </p>
              <p className="text-sm text-gray-500">Opening Shortly</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                {openingSoonStations.length}
              </p>
              <p className="text-sm text-gray-500">Opening Soon</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                ⚡ 5
              </p>
              <p className="text-sm text-gray-500">Charging Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT - White Background
          ============================================================ */}
      <main className="max-w-7xl mx-auto px-4 py-8 bg-white">
        {/* Search & Filter */}
        <div className="mb-8 space-y-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by station name or location..."
              className="w-full pl-10 pr-4 py-4 bg-gray-50 text-gray-800 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-1.5 bg-gray-50 rounded-2xl p-1.5 border border-gray-200 overflow-x-auto">
            {['all', 'Ultra-Fast', 'Fast', 'Slow'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  filterType === type
                    ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-orange-500 text-white shadow-lg shadow-green-500/30'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type === 'all' ? 'All Stations' : type === 'Ultra-Fast' ? '⚡ Ultra-Fast' : type === 'Fast' ? '🔋 Fast' : '🐢 Slow'}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 font-medium">
            <span className="font-bold text-gray-800">{filteredStations.length}</span> stations found
          </p>
        </div>

        {/* ===== OPENING SOON STATIONS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStations
            .filter((s) => s.status === 'opening-soon')
            .map((station) => (
              <div
                key={station.id}
                onClick={() => {
                  setSelectedStation(station);
                  setShowModal(true);
                }}
                className={`group bg-white rounded-2xl border border-gray-200 hover:border-${station.location === 'Bastara' ? 'orange' : station.location === 'Uluberia' ? 'green' : station.location === 'Khaserbheri' ? 'orange' : 'green'}-300 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-${station.location === 'Bastara' ? 'orange' : station.location === 'Uluberia' ? 'green' : station.location === 'Khaserbheri' ? 'orange' : 'green'}-500/10 overflow-hidden`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={station.image}
                    alt={station.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="gray" text-anchor="middle"%3ETransEV%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-lg">{station.locationIcon}</span>
                    <span className="text-white text-xs font-medium">{station.location}</span>
                  </div>
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-gradient-to-r ${getTypeColor(station.type)}`}>
                    {getTypeIcon(station.type)} {station.type}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${locationBadgeColors[station.location] || 'bg-green-500/20 text-green-600 border-green-500/30'}`}>
                      ⏳ Opening Soon
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-white text-xs font-medium">📍 {station.distance}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm group-hover:text-green-600 transition-colors truncate">
                        {station.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{station.address}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border ${locationBadgeColors[station.location] || 'bg-green-500/20 text-green-600 border-green-500/30'} flex-shrink-0 ml-2`}>
                      <span className="text-xs">⏳</span>
                      <span className="font-bold text-[10px]">Soon</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {station.connectorTypes.slice(0, 2).map((connector) => (
                      <span key={connector} className="px-2 py-0.5 bg-gray-100 rounded-lg text-[10px] text-gray-600">
                        🔌 {connector}
                      </span>
                    ))}
                    {station.connectorTypes.length > 2 && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded-lg text-[10px] text-gray-500">+{station.connectorTypes.length - 2}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mt-3">
                    <div className="bg-gray-50 rounded-xl p-1.5 text-center">
                      <p className="text-xs font-bold text-gray-700">{station.power}</p>
                      <p className="text-[8px] text-gray-400 uppercase">Power</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-1.5 text-center">
                      <p className="text-xs font-bold text-gray-700">{station.estimatedTime}</p>
                      <p className="text-[8px] text-gray-400 uppercase">Time</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-1.5 text-center">
                      <p className="text-xs font-bold text-green-600">{formatPrice(station.pricePerUnit)}</p>
                      <p className="text-[8px] text-gray-400 uppercase">Price</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[8px] text-gray-400">Progress</span>
                      <span className={`text-[8px] font-bold ${station.location === 'Bhiringi' ? 'text-green-600' : station.location === 'Bastara' ? 'text-orange-600' : station.location === 'Uluberia' ? 'text-green-600' : station.location === 'Khaserbheri' ? 'text-orange-600' : 'text-emerald-600'}`}>
                        {station.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-gradient-to-r ${station.location === 'Bhiringi' ? 'from-green-400 to-emerald-400' : station.location === 'Bastara' ? 'from-orange-400 to-amber-400' : station.location === 'Uluberia' ? 'from-green-400 to-teal-400' : station.location === 'Khaserbheri' ? 'from-orange-400 to-yellow-400' : 'from-emerald-400 to-green-400'} h-1.5 rounded-full transition-all duration-1000`}
                        style={{ width: `${station.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400">🚧</span>
                      <span className="text-[10px] text-gray-500">{station.city}</span>
                    </div>
                    <span className={`text-[10px] font-medium ${station.location === 'Bhiringi' ? 'text-green-600' : station.location === 'Bastara' ? 'text-orange-600' : station.location === 'Uluberia' ? 'text-green-600' : station.location === 'Khaserbheri' ? 'text-orange-600' : 'text-emerald-600'}`}>
                      ⏳ Opening Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredStations.filter((s) => s.status === 'opening-soon').length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔌</span>
            </div>
            <p className="text-gray-500 font-medium">No stations found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* ============================================================
            OUR LOCATIONS SECTION - White Background
            ============================================================ */}
        <div className="mt-16 bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-orange-500/10 px-6 py-5 border-b border-gray-200">
            <h3 className="text-gray-800 font-bold text-2xl flex items-center gap-3">
              <span>🗺️</span> Our Locations
              <span className="text-sm font-normal text-gray-500 ml-2">— Expanding Across West Bengal</span>
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-6">
              We are building a comprehensive EV charging network across West Bengal. 
              Our stations are strategically located to serve you better. 
              <span className="block text-xs text-gray-400 mt-1">
                🚀 {chargingStations.length} locations • 1 opening shortly • 4 opening soon
              </span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {chargingStations.map((station) => (
                <div
                  key={station.id}
                  className={`rounded-2xl p-5 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-gradient-to-br ${locationColors[station.location] || 'from-green-500/10 to-emerald-500/10 border-green-500/20'}`}
                  onClick={() => {
                    setSelectedStation(station);
                    setShowModal(true);
                  }}
                >
                  <span className="text-4xl block">{station.locationIcon}</span>
                  <p className="font-bold text-gray-800 text-sm mt-2">{station.location}</p>
                  <p className="text-[10px] text-gray-500">{station.city}</p>
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-[8px] font-bold ${locationBadgeColors[station.location] || 'bg-green-500/20 text-green-600 border border-green-500/30'}`}>
                      {station.status === 'opening-shortly' ? '🚀 Opening Shortly' : '⏳ Opening Soon'}
                    </span>
                    <span className="text-[8px] text-gray-500">Progress: {station.progress}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* What We Offer - Green & Orange */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 border border-green-200">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Ultra-Fast Charging</p>
                  <p className="text-xs text-gray-500">Up to 120 kW power output</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl p-3 border border-orange-200">
                <span className="text-2xl">🔌</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Multiple Connectors</p>
                  <p className="text-xs text-gray-500">CCS2, CHAdeMO, Type 2</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl p-3 border border-green-200">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">24/7 Security</p>
                  <p className="text-xs text-gray-500">CCTV & Security personnel</p>
                </div>
              </div>
            </div>

            {/* Expansion Plan - Green & Orange */}
            <div className="mt-4 bg-gradient-to-r from-green-500/10 to-orange-500/10 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Our Expansion Plan</p>
                  <p className="text-xs text-gray-600">
                    We are expanding our network to cover more cities across West Bengal. 
                    Bhiringi is opening shortly, followed by Bastara, Uluberia, Khaserbheri, and Chanditala.
                    <span className="block text-green-600 font-medium mt-1">
                      🌟 Stay tuned for more locations coming soon!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================
          FOOTER SECTION
          ============================================================ */}
      <div className="bg-white py-16 mt-15 border-t border-gray-200">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-8 lg:mb-0">
              <img src={logo1} alt="Company Logo" className="w-32 h-32" />
            </div>

            <div className="text-center lg:text-right">
              <div className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
                <a href="tel:+02033453310" className="hover:underline transition duration-300">
                  033-4601 5366
                </a>
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
                <a href="mailto:tgwbin@gmail.com" className="hover:underline transition duration-300">
                  tgwbin@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t-2 border-gray-300"></div>
    
          <footer className="text-black py-10">
            <div className="flex flex-col lg:flex-row justify-between gap-12">
              <div className="lg:w-1/3">
                <h4 className="text-lg sm:text-xl font-semibold mb-4">
                  Pioneers in smart EV charging solutions
                </h4>
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 mt-6"
                >
                  <span>Client portal</span>
                  <div className="ml-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="lg:w-2/3 flex flex-col sm:flex-row justify-between gap-10">
                <div>
                  <h5 className="text-base sm:text-lg font-semibold mb-4">Navigation</h5>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li><a href="/solution" className="hover:underline">Solutions</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-base sm:text-lg font-semibold mb-4">Follow us</h5>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li>
                      <a href="https://x.com/transevIN?t=yJ30BdH5D7TME1ZZQiQisw&s=09" className="text-gray-600 hover:text-gray-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/__transmogrify__?igsh=MWRzY25tc2wzMnk1ag==" className="text-gray-600 hover:text-gray-900 transition-colors">
                        <FaInstagram color="#E1306C" size={28} />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/share/1NvgEQvwxG/" className="text-gray-600 hover:text-gray-900 transition-colors">
                        <FaFacebook color="#1877F2" size={28} />
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-base sm:text-lg font-semibold mb-4">Legal</h5>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li><a href="/terms-conditions" className="hover:underline">Terms & Conditions</a></li>
                    <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                    <li><a href="/shipping-policy" className="hover:underline">Shipping Policy</a></li>
                    <li><a href="/cancellation-policy" className="hover:underline">Cancellations and Refunds</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-gray-500 text-sm sm:text-base">
              <p>&copy; TransEV 2025. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </div>

      {/* ============================================================
          DETAIL MODAL
          ============================================================ */}
      {showModal && selectedStation && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            <div className={`sticky top-0 z-10 text-white rounded-t-3xl ${
              selectedStation.status === 'opening-shortly'
                ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-orange-500'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedStation.locationIcon}</span>
                  <h2 className="text-white font-bold text-sm">{selectedStation.name}</h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedStation.image}
                  alt={selectedStation.name}
                  className="w-full h-99 object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="24" fill="gray" text-anchor="middle"%3ETransEV%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(selectedStation.type)}`}>
                    {getTypeIcon(selectedStation.type)} {selectedStation.type}
                  </span>
                 
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg ${
                    selectedStation.status === 'opening-shortly'
                      ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-black'
                      : 'bg-gradient-to-r from-green-400 to-emerald-400'
                  }`}>
                    {selectedStation.status === 'opening-shortly' ? '🚀 Opening Shortly' : '⏳ Opening Soon'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-white/90 text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    📍 {selectedStation.distance} away
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-2xl font-bold text-gray-800">{selectedStation.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                  <span>📍</span>
                  <span>{selectedStation.address}, {selectedStation.location}</span>
                </div>
              </div>

              <div className={`mt-4 rounded-2xl p-6 border ${
                selectedStation.status === 'opening-shortly'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedStation.status === 'opening-shortly' ? '🚀' : '⏳'}</span>
                  <div>
                    <p className={`font-bold text-lg ${
                      selectedStation.status === 'opening-shortly' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {selectedStation.status === 'opening-shortly' ? 'Opening Shortly!' : 'Opening Soon!'}
                    </p>
                    <p className={`text-sm ${
                      selectedStation.status === 'opening-shortly' ? 'text-green-500' : 'text-orange-500'
                    }`}>
                      {selectedStation.status === 'opening-shortly' 
                        ? 'This station is almost ready! Launching very soon.' 
                        : 'This station is under construction and will be available soon.'}
                    </p>
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className={`text-xs font-bold ${selectedStation.status === 'opening-shortly' ? 'text-green-600' : 'text-orange-600'}`}>
                          {selectedStation.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-1000 ${
                            selectedStation.status === 'opening-shortly'
                              ? 'bg-gradient-to-r from-green-400 via-emerald-400 to-orange-400'
                              : 'bg-gradient-to-r from-green-400 to-emerald-400'
                          }`}
                          style={{ width: `${selectedStation.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">Price per unit</p>
                  <p className="text-2xl font-bold text-green-600">{formatPrice(selectedStation.pricePerUnit)}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">Total Slots</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedStation.totalSlots}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">Charging Time</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedStation.estimatedTime}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">Power Output</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedStation.power}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-bold text-gray-700 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStation.amenities.map((amenity) => (
                    <span key={amenity} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium border border-gray-200">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-bold text-gray-700 mb-2">Connector Types</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStation.connectorTypes.map((connector) => (
                    <span key={connector} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200">
                      🔌 {connector}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-bold text-gray-700 mb-2">Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStation.paymentMethods.map((method) => (
                    <span key={method} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium border border-purple-200">
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span>🗺️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-700">Location</p>
                    <p className="text-sm text-gray-500 truncate">
                      {selectedStation.address}, {selectedStation.city}, {selectedStation.state} - {selectedStation.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-pulse { animation: pulse 1.5s infinite; }
      `}</style>
    </div>
  );
};

export default ChargingStationLocator;