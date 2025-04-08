import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation after actions
import axios from "axios"; // To handle HTTP requests
import AdminNavbar from '../Admin_navbar'; // Assuming you have a Navbar component
import AdminSidebar from "../Admin_sidebar"; // Assuming you have a Sidebar component
import backgroundImage from '../../../assets/workplace.jpg'; // Import the local image
const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // API key for authorization

const ManageProductsPage = () => {
  const navigate = useNavigate(); // Hook to navigate to the update page

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchResults, setSearchResults] = useState([]); // Search results state

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const authToken = localStorage.getItem("auth_token");
      try {
        const response = await axios.get(`${BASE_URL_AND_PORT}/products/all`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "API-KEY": API_KEY,
          },
        });
        setProducts(response.data.slice(0, 8)); // Show only the first 8 products initially
        setAllProducts(response.data); // Store all products for further use
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle "See All Products" button click
  const handleSeeAll = () => {
    setProducts(allProducts); // Display all products
  };

  // Handle product click to view
  const handleProductView = (id) => {
    navigate(`/admin/product/view/${id}`); // Navigate to the product details page (View)
  };

  // Handle product click to edit
  const handleProductEdit = (id) => {
    navigate(`/admin/product/edit/${id}`); // Navigate to the product edit page
  };

  // Handle Add Product button click
  const handleAddProduct = () => {
    navigate("/add-product"); // Navigate to the Add Product page
  };

  // Handle Delisted Products Button
  const handleDelistedProducts = () => {
    navigate("/admin/delisted-products"); // Navigate to the delisted products page
  };

  // Search Products based on the query
  const handleSearch = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");
    try {
      const response = await axios.post(
        `${BASE_URL_AND_PORT}/products/search`,
        { query: searchQuery, limit: "1-100" },
        {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "API-KEY": API_KEY,
          },
        }
      );
      setSearchResults(response.data); // Set the search results to state
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  // Function to convert base64 string to Blob and create an object URL for it
  const convertBase64ToBlob = (base64String) => {
    try {
      // Ensure the base64 string is valid by removing data URI scheme if present
      const base64Regex = /^data:image\/[a-zA-Z]*;base64,/;
      if (base64String.match(base64Regex)) {
        base64String = base64String.replace(base64Regex, ''); // Remove the data URI prefix
      }

      const byteCharacters = atob(base64String); // Decode the base64 string into bytes
      const byteArrays = [];

      // Convert the decoded string into binary data
      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: 'image/jpeg' });
      const blobUrl = URL.createObjectURL(blob); // Create a URL for the image blob
      return blobUrl; // Return the object URL for the image
    } catch (error) {
      console.error("Error converting base64 to Blob:", error);
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

  // Function to handle toggle product listing status
  const handleToggleListing = async (productId) => {
    const authToken = localStorage.getItem("auth_token");
    try {
      const response = await axios.put(
        `${BASE_URL_AND_PORT}/products/toggle-listing`,
        { product_id: productId },
        {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "API-KEY": API_KEY,
          },
        }
      );
      if (response.status === 200) {
        const updatedProducts = products.map((product) =>
          product.id === productId
            ? { ...product, is_listed: !product.is_listed }
            : product
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error toggling product listing:", error);
    }
  };

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

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 ml-50 mt-6 w-400">
          <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

          {/* Search Bar */}
          <div className="flex justify-center mb-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
                placeholder="Search Products"
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

        
          <div className="flex justify-center mb-6 space-x-4">
  {/* Add Product Button */}
  <button
    onClick={handleAddProduct}
    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
  >
    Add Product
  </button>

  {/* View Delisted Products Button */}
  <button
    onClick={handleDelistedProducts}
    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
  >
    View Delisted Products
  </button>
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
                      {product.image_paths && parseImagePaths(product.image_paths).length > 0 ? (
                        <img
                          src={convertBase64ToBlob(parseImagePaths(product.image_paths)[0]?.data)}
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
            <div className="text-center">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md cursor-pointer">
                  <div className="w-full h-40 bg-gray-200 mb-4">
                    {/* Display product image */}
                    {product.image_paths && parseImagePaths(product.image_paths).length > 0 ? (
                      <img
                        src={convertBase64ToBlob(parseImagePaths(product.image_paths)[0]?.data)}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
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
                  
                  {/* Action buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleProductView(product.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleProductEdit(product.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    {/* Toggle Listing button */}
                    <button
                      onClick={() => handleToggleListing(product.id)}
                      className={`${
                        product.is_listed ? 'bg-red-500' : 'bg-green-500'
                      } text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
                    >
                      {product.is_listed ? 'Delisted' : 'Show'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* See All Products Button */}
          {products.length < allProducts.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSeeAll}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                See All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProductsPage;
