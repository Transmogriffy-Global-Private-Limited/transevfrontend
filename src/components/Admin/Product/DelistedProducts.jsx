import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../assets/workplace.jpg';
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from "../Admin_sidebar";

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const DelistedProductsPage = () => {
  const navigate = useNavigate();

  const [delistedProducts, setDelistedProducts] = useState([]);
  const [allDelistedProducts, setAllDelistedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    const fetchDelistedProducts = async () => {
      const authToken = localStorage.getItem('auth_token');
      try {
        const response = await axios.get(
          `${BASE_URL_AND_PORT}/products/admin/get-delisted/${(currentPage - 1) * 50 + 1}-${currentPage * 50}`,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'API-KEY': API_KEY,
            },
          }
        );
        setDelistedProducts(response.data.products);
        setAllDelistedProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delisted products:', error);
        setLoading(false);
      }
    };

    fetchDelistedProducts();
  }, [currentPage]);

  const handleSeeAll = () => {
    setDelistedProducts(allDelistedProducts);
  };

  const handleNextImage = (productId) => {
    setImageIndexes((prev) => {
      const currentIndex = prev[productId] || 0;
      const nextIndex = (currentIndex + 1) % delistedProducts.find(product => product.id === productId).image_paths.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const handlePrevImage = (productId) => {
    setImageIndexes((prev) => {
      const currentIndex = prev[productId] || 0;
      const prevIndex = (currentIndex - 1 + delistedProducts.find(product => product.id === productId).image_paths.length) % delistedProducts.find(product => product.id === productId).image_paths.length;
      return { ...prev, [productId]: prevIndex };
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem('auth_token');
    try {
      const response = await axios.post(
        `${BASE_URL_AND_PORT}/products/search`,
        { query: searchQuery, limit: '1-100' },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'API-KEY': API_KEY,
          },
        }
      );
      setSearchResults(response.data.products);
    } catch (error) {
      console.error('Error searching delisted products:', error);
    }
  };

  const handleProductView = (id) => {
    navigate(`/admin/delistproduct/view/${id}`);
  };

  const handleProductEdit = (id) => {
    navigate(`/admin/product/edit/${id}`);
  };

  const handleToggleListing = async (productId) => {
    const authToken = localStorage.getItem('auth_token');
    try {
      const response = await axios.put(
        `${BASE_URL_AND_PORT}/products/toggle-listing`,
        { product_id: productId },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'API-KEY': API_KEY,
          },
        }
      );
      if (response.status === 200) {
        const updatedProducts = delistedProducts.map((product) =>
          product.id === productId
            ? { ...product, is_listed: !product.is_listed }
            : product
        );
        setDelistedProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Error toggling product listing:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 justify-center items-center p-6">
          <div className=" bg-white rounded-lg shadow-lg p-6 w-full md:w-4/5 lg:w-3/5">
            <h2 className="text-3xl font-bold text-center mb-6">Delisted Products</h2>

            {/* Search Bar */}
            <div className="flex justify-center mb-4">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
                  placeholder="Search Delisted Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Search Results */}
            {searchQuery && searchResults.length > 0 && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold">Search Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchResults.map((product) => (
                    <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md">
                      <div className="w-full h-40 bg-gray-200 mb-4">
                        <img
                          src={product.image_paths?.[0] || 'https://via.placeholder.com/150'}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150';
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-600">{product.model}</p>
                      <p className="text-gray-700 mt-2">₹{product.price}</p>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleProductView(product.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          View
                        </button>
                        {!product.is_listed && (
                          <button
                            onClick={() => handleToggleListing(product.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          >
                            Listing
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Product Display */}
            {loading ? (
              <div className="text-center">Loading delisted products...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {delistedProducts.map((product) => (
                  <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md cursor-pointer">
                    {/* Image Slider Section */}
                    <div className="relative w-full h-[190px] bg-gray-200 mb-6">
                      {product.image_paths?.length > 1 ? (
                        <>
                          <img
                            src={product.image_paths[imageIndexes[product.id] || 0]}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/500';
                            }}
                          />
                          <button
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                            onClick={() => handlePrevImage(product.id)}
                          >
                            &#10094;
                          </button>
                          <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                            onClick={() => handleNextImage(product.id)}
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
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.model}</p>
                    <p className="text-gray-700 mt-2">₹{product.price}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleProductView(product.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        View
                      </button>
                      {!product.is_listed && (
                        <button
                          onClick={() => handleToggleListing(product.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Listing
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* See All Button */}
            {delistedProducts.length < allDelistedProducts.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSeeAll}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  See All Delisted Products
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 ml-4"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelistedProductsPage;
