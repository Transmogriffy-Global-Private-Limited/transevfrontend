// import React, { useState } from 'react';

// const JobLandingPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   const jobs = [
//     {
//       id: 1,
//       title: 'Frontend Developer',
//       company: 'TechCorp',
//       location: 'Remote',
//       salary: '₹50,000/month',
//       type: 'Full-Time',
//       description: 'Looking for a React developer with frontend experience.',
//     },
//     {
//       id: 2,
//       title: 'Backend Engineer',
//       company: 'CodeLabs',
//       location: 'Bangalore',
//       salary: '₹70,000/month',
//       type: 'Full-Time',
//       description: 'Node.js experience required.',
//     },
//     {
//       id: 3,
//       title: 'UI/UX Designer',
//       company: 'DesignCo',
//       location: 'Mumbai',
//       salary: '₹45,000/month',
//       type: 'Part-Time',
//       description: 'Creative designer with Figma skills.',
//     },
//   ];

//   const handleApplyClick = (job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedJob(null);
//   };

//   return (
//     <div className="bg-gray-50 text-gray-900 font-sans">
//       {/* Hero Section */}
//       <section className="bg-teal-600 text-white text-center py-20 px-4">
//         <h2 className="text-4xl sm:text-5xl font-bold mb-4">Find Your Dream Job</h2>
//         <p className="text-xl sm:text-2xl mb-6 max-w-2xl mx-auto">
//           Discover amazing job opportunities across various fields and apply directly through our platform.
//         </p>
//         <button
//           onClick={() => alert("Start Browsing Jobs")}
//           className="bg-yellow-400 text-teal-900 px-8 py-3 rounded-full text-xl hover:bg-yellow-500 transition-all"
//         >
//           Browse Jobs
//         </button>
//       </section>

//       {/* Job Search Section */}
//       <section className="py-20 px-4 sm:px-12 bg-white">
//         <h2 className="text-3xl font-semibold text-center text-teal-600 mb-12">Find Your Perfect Job</h2>
//         <div className="flex justify-center space-x-4 mb-8">
//           <input
//             type="text"
//             placeholder="Search by job title or company"
//             className="border border-gray-300 rounded px-4 py-2"
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             className="border border-gray-300 rounded px-4 py-2"
//           />
//           <select className="border border-gray-300 rounded px-4 py-2">
//             <option value="">Job Type</option>
//             <option value="Full-Time">Full-Time</option>
//             <option value="Part-Time">Part-Time</option>
//           </select>
//           <button
//             className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700"
//           >
//             Search
//           </button>
//         </div>
//       </section>

//       {/* Job Listings Section */}
//       <section className="py-20 px-4 sm:px-12 bg-white">
//         <h2 className="text-3xl font-semibold text-center text-teal-600 mb-12">Current Job Openings</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {jobs.map((job) => (
//             <div key={job.id} className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition-all">
//               <h3 className="text-xl font-bold text-teal-600">{job.title}</h3>
//               <p className="text-gray-800">{job.company}</p>
//               <p className="text-sm text-gray-500">{job.location} | {job.type}</p>
//               <p className="text-sm text-gray-700 mt-2">{job.description}</p>
//               <p className="font-semibold text-gray-700 mt-2">{job.salary}</p>
//               <button
//                 onClick={() => handleApplyClick(job)}
//                 className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition"
//               >
//                 Apply Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="bg-gray-100 py-20 px-4 sm:px-12">
//         <h2 className="text-3xl font-semibold text-center text-teal-600 mb-12">Why Choose Our Platform?</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           <div className="bg-white p-6 rounded-lg shadow text-center border hover:shadow-md transition-all">
//             <h3 className="text-xl font-semibold text-teal-600 mb-2">Easy Application Process</h3>
//             <p className="text-gray-700">Apply to jobs with a few clicks. Simple and quick.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow text-center border hover:shadow-md transition-all">
//             <h3 className="text-xl font-semibold text-teal-600 mb-2">Verified Employers</h3>
//             <p className="text-gray-700">All employers are verified to ensure safety and legitimacy.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow text-center border hover:shadow-md transition-all">
//             <h3 className="text-xl font-semibold text-teal-600 mb-2">Tailored Job Recommendations</h3>
//             <p className="text-gray-700">Get job recommendations based on your skills and experience.</p>
//           </div>
//         </div>
//       </section>

//       {/* Modal for Job Application */}
//       {isModalOpen && selectedJob && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-full max-w-md relative shadow-lg">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-500"
//             >
//               &times;
//             </button>
//             <h3 className="text-2xl font-semibold text-teal-600 mb-4">
//               Apply for {selectedJob.title} at {selectedJob.company}
//             </h3>
//             <form
//               className="space-y-4"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 alert("Application submitted!");
//                 closeModal();
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Your Full Name"
//                 required
//                 className="w-full border border-gray-300 rounded px-4 py-2"
//               />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 required
//                 className="w-full border border-gray-300 rounded px-4 py-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 required
//                 className="w-full border border-gray-300 rounded px-4 py-2"
//               />
//               <textarea
//                 placeholder="Why are you a good fit?"
//                 className="w-full border border-gray-300 rounded px-4 py-2"
//                 rows="4"
//               />
//               <button
//                 type="submit"
//                 className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 w-full"
//               >
//                 Submit Application
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Footer Section */}
//       <section className="bg-teal-600 text-white py-20 px-4 text-center">
//         <h2 className="text-3xl font-semibold mb-4">Looking for a Job?</h2>
//         <p className="text-lg mb-6 max-w-xl mx-auto">
//           If you want to explore more job listings or have any queries, feel free to contact us anytime.
//         </p>
//         <a
//           href="/contact"
//           className="bg-yellow-400 text-teal-900 px-8 py-3 rounded-full text-xl hover:bg-yellow-500 transition-all"
//         >
//           Contact Us
//         </a>
//       </section>
//     </div>
//   );
// };

// export default JobLandingPage;

import React from "react";
import { FaBriefcase, FaBullhorn, FaUsers, FaSearch, FaCogs } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobPortalServicesPage = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact"); // Navigate to contact page where clients can inquire about services.
  };

  return (
    <div className="bg-gray-100">

      {/* Hero Section */}
      <section className="bg-teal-500 text-white text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Build Your Custom Job Portal with Us</h1>
        <p className="text-lg mb-6">
          Empower your recruitment process with a tailored job portal that fits your company's needs. 
          Let us create a seamless, scalable, and efficient solution for your hiring.
        </p>
        <button 
          onClick={handleContactClick}
          className="bg-yellow-500 text-teal-900 px-6 py-3 rounded-full text-xl hover:bg-yellow-600 transition-all">
          Contact Us Today
        </button>
      </section>

      {/* Portal Features Section */}
      <section className="py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-12">
          Features of Our Job Portal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <FeatureCard 
            icon={<FaBriefcase className="text-4xl text-teal-500" />} 
            title="Custom Job Listings" 
            description="Post tailored job openings with specific fields and job descriptions."
          />
          <FeatureCard 
            icon={<FaBullhorn className="text-4xl text-teal-500" />} 
            title="Automatic Job Distribution" 
            description="Automatically distribute job listings to major job boards and social media."
          />
          <FeatureCard 
            icon={<FaUsers className="text-4xl text-teal-500" />} 
            title="Manage Candidates" 
            description="Easily track and manage applicants with an intuitive dashboard."
          />
        </div>
      </section>

      {/* Custom Portal Solutions */}
      <section className="bg-white py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-12">
          Tailored Solutions for Your Company
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <SolutionCard 
            title="Personalized Portal Design"
            description="Custom branding and design to match your company’s identity."
            actionText="Get a Custom Quote"
          />
          <SolutionCard 
            title="Advanced Reporting & Analytics"
            description="Track application trends, candidate performance, and more with powerful reports."
            actionText="Request a Demo"
          />
          <SolutionCard 
            title="Seamless Integrations"
            description="Integrate with HR tools, applicant tracking systems, and more."
            actionText="Explore Integrations"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-12 bg-teal-100">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-12">
          How Our Job Portal Works for Employers
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <HowItWorksCard
            step="Step 1"
            title="Create Your Account"
            description="Sign up for a personalized account to start customizing your portal."
          />
          <HowItWorksCard
            step="Step 2"
            title="Post Job Listings"
            description="Post your available job openings and configure them to your requirements."
          />
          <HowItWorksCard
            step="Step 3"
            title="Review & Manage Applications"
            description="Track and manage candidates using an easy-to-use dashboard."
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-teal-100 py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-12">
          What Our Clients Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Testimonial
            name="Michael Lee"
            position="CEO"
            company="Tech Innovators"
            feedback="The job portal we received has transformed our recruitment process, making it faster and more efficient."
          />
          <Testimonial
            name="Sara Blake"
            position="HR Director"
            company="Global Solutions"
            feedback="The ease of managing applications and the customization options made it the perfect tool for our team."
          />
        </div>
      </section>

      {/* Contact/Inquiry Section */}
      <section className="py-20 px-4 sm:px-12 bg-teal-500 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Get Started Today</h2>
        <p className="text-lg mb-6">
          Interested in building a custom job portal for your organization? Let’s talk and make it happen!
        </p>
        <button
          onClick={handleContactClick}
          className="bg-yellow-500 text-teal-900 px-6 py-3 rounded-full text-xl hover:bg-yellow-600 transition-all"
        >
          Contact Us
        </button>
      </section>

    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-teal-100 transition-all">
    <div className="mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-teal-500 mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

// Reusable Solution Card Component
const SolutionCard = ({ title, description, actionText }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-teal-100 transition-all">
    <h3 className="text-2xl font-semibold text-teal-500 mb-2">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <button className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg hover:bg-teal-600 transition-all">{actionText}</button>
  </div>
);

// Reusable How It Works Card Component
const HowItWorksCard = ({ step, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-teal-100 transition-all">
    <h3 className="text-2xl font-semibold text-teal-500 mb-2">{step}: {title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

// Reusable Testimonial Component
const Testimonial = ({ name, position, company, feedback }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
    <p className="text-xl italic text-gray-700 mb-4">"{feedback}"</p>
    <p className="font-semibold text-teal-500">{name}</p>
    <p className="text-sm text-gray-500">{position} at {company}</p>
  </div>
);

export default JobPortalServicesPage;
