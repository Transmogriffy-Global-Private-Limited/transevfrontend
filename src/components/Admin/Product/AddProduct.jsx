
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation after success
import AdminNavbar from '../Admin_navbar'; // Assuming you have a Navbar component
import AdminSidebar from "../Admin_sidebar"; // Assuming you have a Sidebar component
import backgroundImage from '../../../assets/workplace.jpg'; // Import the local image
const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

const AddProductPage = () => {
  const navigate = useNavigate(); // Hook to navigate to another page after product is added

  // State variables
  const [product, setProduct] = useState({
    name: "",
    model: "",
    price: "",
    quantity: "",
    details: {
      input_voltage: "230V",
      phase: "Single",
      current: "16A",
      frequency: "50Hz",
      rated_power: "250W",
      fast_charger: "yes",
      protection: "Overload, Short Circuit",
      communication: "Modbus, CAN",
      cooling: "Air cooled",
      ingress_protection: "IP65",
     
      dimensions: "W X D X H (310x220x90mm)",
      gun_details: "Two guns",
      gun_type: "CCS2",
      material: "Aluminum",
      ouput_voltage: "7.7 KW",
      display: "Yes",
      push_button: "Yes",
      operatingtemps: "-10°C to 50°C",
      chargingoperation: "Standard charging operation",
      safetyregulation: "IEC 61000-2-2",
      mountingtype: "Wall mounted",
      cable_length: "10m",
      additional_details: "This is a high-efficiency product for industrial use.",
    },
  });
  const [files, setFiles] = useState(null); // Files to upload
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message
  const [success, setSuccess] = useState(false); // Success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setProduct((prevProduct) => ({
        ...prevProduct,
        details: {
          ...prevProduct.details,
          [field]: value,
        },
      }));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during API call
    const formData = new FormData();

    // Append product data
    formData.append("product_data", JSON.stringify(product));

    // Append files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      const authToken = localStorage.getItem("auth_token");
      const response = await fetch(`${BASE_URL_AND_PORT}/products/add`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "API-KEY": API_KEY,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setError(null);
        setProduct({
          name: "",
          model: "",
          price: "",
          quantity: "",
          details: {
            input_voltage: "230V",
            phase: "Single",
            current: "16A",
            frequency: "50Hz",
            rated_power: "250W",
            fast_charger: "yes",
            protection: "Overload, Short Circuit",
            communication: "Modbus, CAN",
            cooling: "Air cooled",
            ingress_protection: "IP65",
          
            dimensions: "W X D X H (310x220x90mm)",
            gun_details: "Two guns",
            gun_type: "CCS2",
            material: "Aluminum",
            ouput_voltage: "7.7 KW",
            display: "Yes",
            push_button: "Yes",
            operatingtemps: "-10°C to 50°C",
            chargingoperation: "Standard charging operation",
            safetyregulation: "IEC 61000-2-2",
            mountingtype: "Wall mounted",
            cable_length: "10m",
            additional_details: "This is a high-efficiency product for industrial use.",
          },
        });
      } else {
        setError(result.message || "Something went wrong!");
      }
    } catch (err) {
      setError("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  const handleAllProduct = () => {
    navigate("/manage/products"); // Navigate to the Add Product page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 ml-70 w-200">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Add Product</h2>
            <div className="flex justify-center mb-6 space-x-4 ml-100">
              <button
                onClick={handleAllProduct}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                View Products
              </button>
            </div>

            {/* Success/Failure Messages */}
            {success && <div className="text-green-500 mb-4 text-center">Product added successfully!</div>}
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-gray-600" htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-2 w-full border rounded-md"
                />
              </div>

              {/* Product Model */}
              <div className="mb-4">
                <label className="block text-gray-600" htmlFor="model">Product Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={product.model}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-2 w-full border rounded-md"
                />
              </div>

              {/* Product Price */}
              <div className="mb-4">
                <label className="block text-gray-600" htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-2 w-full border rounded-md"
                />
              </div>

              {/* Product Quantity */}
              <div className="mb-4">
                <label className="block text-gray-600" htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  required
                  className="mt-2 px-4 py-2 w-full border rounded-md"
                />
              </div>

              {/* Details Inputs */}
              <div className="space-y-4">
                {/* Loop through each detail field */}
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block text-gray-600" htmlFor={key}>
                      {key.replace("_", " ").toUpperCase()}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={`details.${key}`}
                      value={value}
                      onChange={handleChange}
                      className="mt-2 px-4 py-2 w-full border rounded-md"
                    />
                  </div>
                ))}
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-gray-600" htmlFor="files">Upload Files</label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                  className="mt-2 px-4 py-2 w-full border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
