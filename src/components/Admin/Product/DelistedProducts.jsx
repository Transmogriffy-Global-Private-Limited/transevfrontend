import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../assets/workplace.jpg'; // Import your background image

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000'; // Replace with your actual base URL
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf'; // Replace with your actual API key

const DelistedProductsPage = () => {
  const navigate = useNavigate();
  
  const [delistedProducts, setDelistedProducts] = useState([]); // Store delisted products
  const [allDelistedProducts, setAllDelistedProducts] = useState([]); // Store all delisted products
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [searchResults, setSearchResults] = useState([]); // Search results state

  // Fetch delisted products from the API
  useEffect(() => {
    const fetchDelistedProducts = async () => {
      const authToken = localStorage.getItem('auth_token');
      try {
        const response = await axios.get(
          `${BASE_URL_AND_PORT}/products/admin/get-delisted/1-8`,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'API-KEY': API_KEY,
            },
          }
        );
        setDelistedProducts(response.data.slice(0, 8)); // Show only the first 8 delisted products initially
        setAllDelistedProducts(response.data); // Store all delisted products for further use
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delisted products:', error);
        setLoading(false);
      }
    };

    fetchDelistedProducts();
  }, []);

  // Handle "See All Delisted Products" button click
  const handleSeeAll = () => {
    setDelistedProducts(allDelistedProducts); // Display all delisted products
  };

  // Handle search query submission
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
      setSearchResults(response.data); // Set the search results to state
    } catch (error) {
      console.error('Error searching delisted products:', error);
    }
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

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center p-6">
        {/* Container for the page */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-4/5 lg:w-3/5">
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

          {/* Display search results */}
          {searchQuery && searchResults.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold">Search Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md">
                    <div className="w-full h-40 bg-gray-200 mb-4">
                      {/* Display product image */}
                      {product.image_paths && product.image_paths.length > 0 ? (
                        <img
                          src={convertBase64ToBlob(product.image_paths[0]?.data)}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          src="https://via.placeholder.com/150"
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.model}</p>
                    <p className="text-gray-700 mt-2">₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display loading state */}
          {loading ? (
            <div className="text-center">Loading delisted products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {delistedProducts.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md cursor-pointer">
                  <div className="w-full h-40 bg-gray-200 mb-4">
                    {/* Display product image */}
                    {product.image_paths && product.image_paths.length > 0 ? (
                      <img
                        src={convertBase64ToBlob(product.image_paths[0]?.data)}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/150"
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.model}</p>
                  <p className="text-gray-700 mt-2">₹{product.price}</p>
                </div>
              ))}
            </div>
          )}

          {/* Button to see all delisted products */}
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
        </div>
      </div>
    </div>
  );
};

export default DelistedProductsPage;
