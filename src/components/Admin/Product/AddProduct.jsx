
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from "../Admin_sidebar";
import backgroundImage from '../../../assets/workplace.jpg';
const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    model: "",
    mrp: "",  
    price: "",
    quantity: "",
    product_color: "",
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
      ocpp_present: "Yes", // UPDATED FIELD
    },
  });

  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("product_data", JSON.stringify(product));
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
          mrp: "",  
          price: "",
          quantity: "",
          product_color: "",
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
            ocpp_present: "Yes",
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
    navigate("/manage/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-green-60 to-green-80 bg-cover bg-center bg-fixed">
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 md:p-8 lg:p-12 ml-0 sm:ml-10 md:ml-20 lg:ml-70 w-full sm:w-3/4 md:w-1/2 lg:w-200">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Add Product</h2>
            <div className="flex justify-center mb-6 space-x-4">
              <button
                onClick={handleAllProduct}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                View Products
              </button>
            </div>

            {success && <div className="text-green-500 mb-4 text-center">Product added successfully!</div>}
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              {["name", "model", "mrp","price", "quantity", "product_color"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-600" htmlFor={field}>{field.replace("_", " ").toUpperCase()}</label>
                  <input
                   type={field === "price" || field === "mrp" || field === "quantity" ? "number" : "text"}
                    id={field}
                    name={field}
                    value={product[field]}
                    onChange={handleChange}
                    required
                    className="mt-2 px-4 py-2 w-full border rounded-md"
                  />
                </div>
              ))}

              <div className="space-y-4">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block text-gray-600" htmlFor={key}>{key.replace("_", " ").toUpperCase()}</label>

                    {/* OCPP Dropdown */}
                    {key === "ocpp_present" ? (
                      <select
                        id={key}
                        name={`details.${key}`}
                        value={value}
                        onChange={handleChange}
                        className="mt-2 px-4 py-2 w-full border rounded-md"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        id={key}
                        name={`details.${key}`}
                        value={value}
                        onChange={handleChange}
                        className="mt-2 px-4 py-2 w-full border rounded-md"
                      />
                    )}
                  </div>
                ))}
              </div>

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
