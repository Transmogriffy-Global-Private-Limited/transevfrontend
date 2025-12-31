import React, { useState } from "react";
import UserSidebar from '../User/User_sidebar';
import UserNavbar from '../User/User_Navbar';
import background from "../../assets/new3.jpg";
import { useNavigate } from "react-router-dom";
const BASE_URL_AND_PORT = "https://api.static.ev.transev.site"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Your API key
const token = localStorage.getItem("auth_token"); // Retrieve the token

const AddAddressForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    custom_type_name: "",
    house_building: "",
    locality_street: "",
    landmark: "",
    city: "",
    po_ps: "",
    district: "",
    state: "",
    pin: "",
    country: "",
    is_default: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL_AND_PORT}/users/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-KEY": API_KEY,
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Successfully added the address
      alert("Address added successfully!");
      navigate("/profile");
    } else {
      // There was an error
      alert("Error occurred.");
    }
  };
 const [sidebarOpen, setSidebarOpen] = useState(true);
     
      const toggleSidebar = () => {
          setSidebarOpen(!sidebarOpen);
      };
  return (
    <div
           className=" min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
           style={{ background: `url(${background})` }}
         >
      {/* User Navbar */}
      <UserNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        {/* <div className="w-[40%] mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg"> */}
        <div className="w-[40%] mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg relative">
        <button
  type="button"
  onClick={() => navigate("/profile")}
  className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
  title="Close"
>
  &times;
</button>
      <h2 className="text-2xl font-semibold text-center mb-6">Add Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Address Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {formData.type === "Other" && (
          <div>
            <label htmlFor="custom_type_name" className="block text-sm font-medium text-gray-700">
              Custom Type Name
            </label>
            <input
              type="text"
              id="custom_type_name"
              name="custom_type_name"
              value={formData.custom_type_name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <div>
          <label htmlFor="house_building" className="block text-sm font-medium text-gray-700">
            House/Building Number
          </label>
          <input
            type="text"
            id="house_building"
            name="house_building"
            value={formData.house_building}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="locality_street" className="block text-sm font-medium text-gray-700">
            Locality/Street
          </label>
          <input
            type="text"
            id="locality_street"
            name="locality_street"
            value={formData.locality_street}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="po_ps" className="block text-sm font-medium text-gray-700">
            Post Office/Police Station
          </label>
          <input
            type="text"
            id="po_ps"
            name="po_ps"
            value={formData.po_ps}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
            PIN Code
          </label>
          <input
            type="text"
            id="pin"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="is_default" className="block text-sm font-medium text-gray-700">
            Set as Default
          </label>
          <input
            type="checkbox"
            id="is_default"
            name="is_default"
            checked={formData.is_default}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
          >
            Add Address
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddAddressForm;
