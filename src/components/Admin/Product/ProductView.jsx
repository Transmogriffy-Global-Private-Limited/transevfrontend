import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from "../Admin_sidebar";
import backgroundImage from '../../../assets/workplace.jpg';

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const ProductViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [imageIndex, setImageIndex] = useState(0); // State to manage current image index for product

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleNextImage = () => {
    if (product && product.image_paths) {
      const nextIndex = (imageIndex + 1) % product.image_paths.length;
      setImageIndex(nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (product && product.image_paths) {
      const prevIndex = (imageIndex - 1 + product.image_paths.length) % product.image_paths.length;
      setImageIndex(prevIndex);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="product-view-page bg-white ml-80 w-200 mt-8">
          <div className="container mx-auto p-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            >
              Back to Product List
            </button>

            {product && (
              <div className="product-details">
                <div className="relative w-full h-96 bg-gray-200 mb-6">
                  {/* Image Slider */}
                  {product.image_paths?.length > 1 ? (
                    <>
                      <img
                        src={product.image_paths[imageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/500';
                        }}
                      />
                      {/* Prev and Next Buttons */}
                      <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                        onClick={handlePrevImage}
                      >
                        &#10094;
                      </button>
                      <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                        onClick={handleNextImage}
                      >
                        &#10095;
                      </button>
                    </>
                  ) : (
                    <img
                      src={product.image_paths?.[0] || 'https://via.placeholder.com/500'}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/500';
                      }}
                    />
                  )}
                </div>

                <h1 className="text-3xl font-semibold mb-4">Product Name: {product.name}</h1>
                <p className="text-xl text-gray-600 mb-4">Model: {product.model}</p>
                <p className="text-lg text-gray-700 mb-4">Price: ₹{product.price}</p>
                <p className="text-lg text-gray-700 mb-4">Quantity: {product.quantity}</p>

                <div className="product-details-table">
                  <table className="table-auto w-full">
                    <tbody>
                      <tr><td className="font-semibold">Phase</td><td>{product.details.phase}</td></tr>
                      <tr><td className="font-semibold">Height</td><td>{product.details.height} m</td></tr>
                      <tr><td className="font-semibold">Length</td><td>{product.details.length} m</td></tr>
                      <tr><td className="font-semibold">Breadth</td><td>{product.details.breadth} m</td></tr>
                      <tr><td className="font-semibold">Cooling</td><td>{product.details.cooling}</td></tr>
                      <tr><td className="font-semibold">Current</td><td>{product.details.current}</td></tr>
                      <tr><td className="font-semibold">Voltage</td><td>{product.details.voltage}</td></tr>
                      <tr><td className="font-semibold">Frequency</td><td>{product.details.frequency}</td></tr>
                      <tr><td className="font-semibold">Protection</td><td>{product.details.protection}</td></tr>
                      <tr><td className="font-semibold">Noise Level</td><td>{product.details.noise_level}</td></tr>
                      <tr><td className="font-semibold">Rated Power</td><td>{product.details.rated_power}</td></tr>
                      <tr><td className="font-semibold">Fast Charger</td><td>{product.details.fast_charger}</td></tr>
                      <tr><td className="font-semibold">Communication</td><td>{product.details.communication}</td></tr>
                      <tr><td className="font-semibold">Weight</td><td>{product.details.weight_in_kgs} kg</td></tr>
                      <tr><td className="font-semibold">Ingress Protection</td><td>{product.details.ingress_protection}</td></tr>
                      <tr><td className="font-semibold">Efficiency</td><td>{product.details.efficiency_in_percentage}%</td></tr>
                      <tr><td className="font-semibold">Max Operating Temp</td><td>{product.details.maximum_operating_temperature} °C</td></tr>
                      <tr><td className="font-semibold">Min Operating Temp</td><td>{product.details.minimum_operating_temperature} °C</td></tr>
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
