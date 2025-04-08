import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // For navigation and accessing product ID from URL
import AdminNavbar from "../Admin_navbar"; // Assuming you have this component
import AdminSidebar from "../Admin_sidebar"; // Assuming you have this component

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define your base URL
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // API key for authorization

const ProductEditPage = () => {
  const { productId } = useParams(); // Get the productId from URL params
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState([]); // Store selected image files
  const [removedImages, setRemovedImages] = useState([]); // Store removed images
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
    quantity: "",
    details: {
      voltage: "",
      phase: "",
      current: "",
      frequency: "",
      rated_power: "",
      fast_charger: "",
      protection: "",
      communication: "",
      maximum_operating_temperature: "",
      minimum_operating_temperature: "",
      cooling: "",
      ingress_protection: "",
      length: "",
      breadth: "",
      height: "",
      weight_in_kgs: "",
      noise_level: "",
      efficiency_in_percentage: "",
      additional_details: "",
    },
  });

  // Fetch the product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      const authToken = localStorage.getItem("auth_token");
      try {
        const response = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${productId}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "API-KEY": API_KEY,
          },
        });
        setProduct(response.data);
        setFormData({
          ...formData,
          name: response.data.name,
          model: response.data.model,
          price: response.data.price,
          quantity: response.data.quantity,
          details: response.data.details,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change in product details
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: value,
      },
    }));
  };

  // Handle file input (image upload)
  const handleFileChange = (e) => {
    const files = e.target.files;
    setImageFiles(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("auth_token");
    const data = new FormData();

    // Append the product data to FormData
    data.append("product_data", JSON.stringify({
      product_id: productId,
      name: formData.name,
      model: formData.model,
      price: formData.price,
      quantity: formData.quantity,
      details: formData.details,
      removed_images: removedImages,
    }));

    // Append image files to FormData
    for (let i = 0; i < imageFiles.length; i++) {
      data.append("files", imageFiles[i]);
    }

    try {
      const response = await axios.put(`${BASE_URL_AND_PORT}/products/update`, data, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "API-KEY": API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/admin/manage-products"); // Redirect to the manage products page after successful update
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Loading state while fetching product data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 bg-white rounded-lg shadow-lg ml-50">
          <h2 className="text-3xl font-bold text-center mb-6">Edit Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="name">Product Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Product Model */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="model">Product Model</label>
                <input
                  id="model"
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="price">Price (₹)</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Product Details */}
              <h3 className="text-xl font-semibold mt-4">Product Details</h3>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="voltage">Voltage</label>
                <input
                  id="voltage"
                  type="text"
                  name="voltage"
                  value={formData.details.voltage}
                  onChange={handleDetailsChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="phase">Phase</label>
                <input
                  id="phase"
                  type="text"
                  name="phase"
                  value={formData.details.phase}
                  onChange={handleDetailsChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="current">Current</label>
                <input
                  id="current"
                  type="text"
                  name="current"
                  value={formData.details.current}
                  onChange={handleDetailsChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="frequency">Frequency</label>
                <input
                  id="frequency"
                  type="text"
                  name="frequency"
                  value={formData.details.frequency}
                  onChange={handleDetailsChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="rated_power">Rated Power</label>
                <input
                  id="rated_power"
                  type="text"
                  name="rated_power"
                  value={formData.details.rated_power}
                  onChange={handleDetailsChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* More Product Details fields... */}

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="images">Upload Images</label>
                <input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  multiple
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
