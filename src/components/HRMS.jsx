import React from "react";
import { FaPhoneAlt, FaEnvelope, FaUserShield, FaRegLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HRMSPage = () => {
  const navigate = useNavigate();
  const handleContactClick = () => {
    
    navigate("/contact");
  };
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-teal-500 text-white text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Our HRMS Solutions</h1>
        <p className="text-lg mb-6">Empowering organizations with seamless HR management. Get started today!</p>
        <button className="bg-yellow-500 text-teal-900 px-6 py-3 rounded-full text-xl hover:bg-yellow-600 transition-all">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaUserShield className="text-4xl text-teal-500" />}
            title="Employee Management"
            description="Streamline employee records, performance, and tracking."
          />
          <FeatureCard
            icon={<FaRegLightbulb className="text-4xl text-teal-500" />}
            title="Payroll Management"
            description="Simplify payroll calculations and ensure compliance."
          />
          <FeatureCard
            icon={<FaPhoneAlt className="text-4xl text-teal-500" />}
            title="Attendance Tracking"
            description="Monitor attendance, working hours, and leaves effortlessly."
          />
        </div>
      </section>

      {/* Solutions and Services Section */}
      <section className="bg-white py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-12">Our Solutions & Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <SolutionCard
            title="Custom HR Solutions"
            description="We provide tailored HR solutions according to your company’s needs."
            actionText="Request Customization"
          />
          <SolutionCard
            title="Employee Benefits Management"
            description="Managing employee benefits made easy, including insurance and incentives."
            actionText="Learn More"
          />
          <SolutionCard
            title="Recruitment & Onboarding"
            description="Automate and streamline recruitment and onboarding processes."
            actionText="Start Now"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-teal-100 py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-500 mb-12">What Our Clients Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Testimonial
            name="John Doe"
            position="HR Manager"
            company="TechCorp"
            feedback="This HRMS has completely revolutionized how we manage employee records. It's easy to use, efficient, and has saved us hours every week."
          />
          <Testimonial
            name="Jane Smith"
            position="CEO"
            company="FinanceCo"
            feedback="The custom HR solutions helped us streamline our processes and improve employee satisfaction. Great service and great results!"
          />
        </div>
      </section>

      {/* Contact/Inquiry Section */}
      <section className="py-20 px-4 sm:px-12 bg-teal-500 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-lg mb-6">Have questions or need a custom solution? Contact us and let’s discuss how we can help!</p>
        <div className="space-x-4">
          {/* <button className="bg-yellow-500 text-teal-900 px-6 py-3 rounded-full text-xl hover:bg-yellow-600 transition-all">Contact Us</button> */}
           <button
      onClick={handleContactClick}
      className="bg-yellow-500 text-teal-900 px-6 py-3 rounded-full text-xl hover:bg-yellow-600 transition-all"
    >
      Contact Us
    </button>
          <button className="bg-teal-700 px-6 py-3 rounded-full text-xl hover:bg-teal-600 transition-all">Request a Demo</button>
        </div>
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

// Reusable Testimonial Component
const Testimonial = ({ name, position, company, feedback }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
    <p className="text-xl italic text-gray-700 mb-4">"{feedback}"</p>
    <p className="font-semibold text-teal-500">{name}</p>
    <p className="text-sm text-gray-500">{position} at {company}</p>
  </div>
  
);

export default HRMSPage;
