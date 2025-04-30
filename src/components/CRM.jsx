import React from "react";
import { FaUsers, FaChartLine, FaDatabase, FaPhoneAlt, FaFileInvoice, FaTasks, FaComments, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CRMPage = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Build Your Own CRM System</h1>
        <p className="text-lg mb-6">
          A powerful CRM system that helps manage relationships, track leads, and boost your business growth.
        </p>
        <button
          onClick={handleContactClick}
          className="bg-white text-teal-800 px-6 py-3 rounded-full text-xl hover:bg-teal-800 hover:text-white transition-all"
        >
          Contact Us for Custom Development
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-600 mb-12">CRM Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          <FeatureCard
            icon={<FaUsers className="text-4xl text-teal-600" />}
            title="Customer Management"
            description="Manage and store detailed customer information, including contacts, demographics, and interaction history."
          />
          <FeatureCard
            icon={<FaChartLine className="text-4xl text-teal-600" />}
            title="Sales Analytics"
            description="Track sales performance, identify trends, and generate reports to make data-driven decisions."
          />
          <FeatureCard
            icon={<FaDatabase className="text-4xl text-teal-600" />}
            title="Lead Management"
            description="Manage leads through the sales funnel, track their progress, and optimize conversion strategies."
          />
          <FeatureCard
            icon={<FaPhoneAlt className="text-4xl text-teal-600" />}
            title="Communication Tools"
            description="Integrate email, phone, and messaging for seamless communication with your customers."
          />
          <FeatureCard
            icon={<FaFileInvoice className="text-4xl text-teal-600" />}
            title="Invoice & Billing"
            description="Create, manage, and send invoices to your customers with built-in billing tools."
          />
          <FeatureCard
            icon={<FaTasks className="text-4xl text-teal-600" />}
            title="Task Management"
            description="Assign tasks, track deadlines, and manage workflows within your CRM."
          />
          <FeatureCard
            icon={<FaComments className="text-4xl text-teal-600" />}
            title="Customer Support"
            description="Offer live chat, ticketing, and support tracking to resolve customer queries quickly."
          />
          <FeatureCard
            icon={<FaUserCog className="text-4xl text-teal-600" />}
            title="User Access Control"
            description="Define different access levels and permissions for your team members within the CRM."
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20 px-4 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-teal-600 mb-12">Why Choose Us for Your CRM System?</h2>
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            We provide a fully customizable CRM solution tailored to your business needs, helping you build stronger relationships with customers and grow your sales pipeline.
          </p>
          <button
            onClick={handleContactClick}
            className="bg-teal-600 text-white px-6 py-3 rounded-full text-xl hover:bg-teal-800 transition-all"
          >
            Get a Free Consultation
          </button>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-teal-600 text-white text-center py-20">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Ready to Transform Your Business with CRM?</h2>
        <p className="text-lg mb-6">
          Let’s create a custom CRM solution that fits your needs and scales with your business growth.
        </p>
        <button
          onClick={handleContactClick}
          className="bg-white text-teal-800 px-6 py-3 rounded-full text-xl hover:bg-teal-800 hover:text-white transition-all"
        >
          Contact Us Now
        </button>
      </section>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-teal-100 transition-all">
    <div className="mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-teal-600 mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default CRMPage;
