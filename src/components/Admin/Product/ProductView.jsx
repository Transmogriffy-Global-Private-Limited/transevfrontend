import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from "../Admin_sidebar";
import backgroundImage from '../../../assets/workplace.jpg';

const BASE_URL_AND_PORT = 'http://192.168.0.103:3000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const ProductViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

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
    if (product?.image_paths?.length > 1) {
      const nextIndex = (imageIndex + 1) % product.image_paths.length;
      setImageIndex(nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (product?.image_paths?.length > 1) {
      const prevIndex = (imageIndex - 1 + product.image_paths.length) % product.image_paths.length;
      setImageIndex(prevIndex);
    }
  };

  if (loading) return <div className="text-center text-white p-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-10">{error}</div>;

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-white-100 via-white-100 to-white-50 bg-fixed bg-cover bg-center"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col sm:flex-row">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="bg-white w-full px-4 py-8 sm:ml-80">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
            >
              Back to Product List
            </button>

            {product && (
              <div>
                {/* Image Display */}
                <div className="relative w-full max-w-xl mx-auto aspect-[4/3] bg-gray-200 mb-8 rounded-lg overflow-hidden shadow-lg">
                  {product.image_paths?.length > 1 ? (
                    <>
                      <img
                        src={product.image_paths[imageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/500';
                        }}
                      />
                      <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                        onClick={handlePrevImage}
                      >
                        &#10094;
                      </button>
                      <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                        onClick={handleNextImage}
                      >
                        &#10095;
                      </button>
                    </>
                  ) : (
                    <img
                      src={product.image_paths?.[0] || 'https://via.placeholder.com/500'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/500';
                      }}
                    />
                  )}
                </div>

                {/* Basic Info */}
                <div className="mb-6 text-center sm:text-left">
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-xl text-gray-600 mb-1">Model: {product.model}</p>
                  <p className="text-lg text-gray-700 mb-1">Price: ₹{product.price}</p>
                  <p className="text-lg text-gray-700">Quantity: {product.quantity}</p>
                </div>

                {/* Details Table */}
                <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow">
                  <table className="table-auto w-full border-collapse">
                    <tbody>
                      {product.details && Object.entries(product.details).map(([key, value]) => {
                        if (value && value.trim() !== "") {
                          return (
                            <tr key={key} className="border-b border-gray-200">
                              <td className="font-semibold py-2 pr-4 capitalize text-gray-800">
                                {key.replace(/_/g, " ")}
                              </td>
                              <td className="py-2 text-gray-700">{value}</td>
                            </tr>
                          );
                        }
                        return null;
                      })}
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
