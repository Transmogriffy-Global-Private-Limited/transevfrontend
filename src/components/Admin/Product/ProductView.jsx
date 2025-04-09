import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin_navbar'; // Assuming you have a Navbar component
import AdminSidebar from "../Admin_sidebar"; // Assuming you have a Sidebar component
import backgroundImage from '../../../assets/workplace.jpg'; // Import the local image
const BASE_URL_AND_PORT = 'http://192.168.0.106:8000'; // Replace with your actual base URL
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf'; // Replace with your actual API key

const ProductViewPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null); // Store the product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch product details by ID from the API
  useEffect(() => {
    const fetchProduct = async () => {
      const authToken = localStorage.getItem('auth_token');
      try {
        const response = await axios.get(
          `${BASE_URL_AND_PORT}/products/get_by_id/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'API-KEY': API_KEY,
            },
          }
        );
        setProduct(response.data); // Set the fetched product data
        setLoading(false);
      } catch (error) {
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };
  // Function to convert base64 string to Blob and create an object URL for it
  const convertBase64ToBlob = (base64String) => {
    try {
      const base64Regex = /^data:image\/[a-zA-Z]*;base64,/;
      if (base64String.match(base64Regex)) {
        base64String = base64String.replace(base64Regex, ''); // Remove the data URI prefix
      }

      const byteCharacters = atob(base64String); // Decode the base64 string into bytes
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: 'image/jpeg' });
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    } catch (error) {
      console.error('Error converting base64 to Blob:', error);
      return 'https://via.placeholder.com/150'; // Fallback image URL
    }
  };

  // Function to parse image_paths string into JSON
  const parseImagePaths = (imagePathsString) => {
    try {
      const parsedJson = JSON.parse(imagePathsString.replace(/'/g, '"')); // Replace single quotes with double quotes to make it valid JSON
      return parsedJson;
    } catch (error) {
      console.error("Error parsing image paths:", error);
      return []; // Return an empty array if parsing fails
    }
  };

  // Loading or error state display
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
    className=" min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
      {/* User Navbar */}
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="product-view-page bg-white ml-80 w-200 mt-8">
      <div className="container mx-auto p-6"> 
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Back to Product List
        </button>

        {product && (
          <div className="product-details">
            {/* Product Image */}
            <div className="w-full h-96 bg-gray-200 mb-6">
              {product.image_paths && parseImagePaths(product.image_paths).length > 0 ? (
                <img
                  src={convertBase64ToBlob(parseImagePaths(product.image_paths)[0]?.data)}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/500"
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>

            {/* Product Information */}
            <h1 className="text-3xl font-semibold mb-4">Product Name: {product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">Model: {product.model}</p>
            <p className="text-lg text-gray-700 mb-4">Price: ₹{product.price}</p>
            <p className="text-lg text-gray-700 mb-4">Quantity: {product.quantity}</p>

            {/* Product Details */}
            <div className="product-details-table">
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold">Phase</td>
                    <td>{product.details.phase}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Height</td>
                    <td>{product.details.height} m</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Length</td>
                    <td>{product.details.length} m</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Breadth</td>
                    <td>{product.details.breadth} m</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Cooling</td>
                    <td>{product.details.cooling}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Current</td>
                    <td>{product.details.current}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Voltage</td>
                    <td>{product.details.voltage}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Frequency</td>
                    <td>{product.details.frequency}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Protection</td>
                    <td>{product.details.protection}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Noise Level</td>
                    <td>{product.details.noise_level}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Rated Power</td>
                    <td>{product.details.rated_power}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Fast Charger</td>
                    <td>{product.details.fast_charger}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Communication</td>
                    <td>{product.details.communication}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Weight</td>
                    <td>{product.details.weight_in_kgs} kg</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Ingress Protection</td>
                    <td>{product.details.ingress_protection}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Efficiency</td>
                    <td>{product.details.efficiency_in_percentage}%</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Max Operating Temp</td>
                    <td>{product.details.maximum_operating_temperature} °C</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Min Operating Temp</td>
                    <td>{product.details.minimum_operating_temperature} °C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductViewPage;
