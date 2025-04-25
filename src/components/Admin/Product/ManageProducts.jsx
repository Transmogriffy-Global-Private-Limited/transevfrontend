import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../Admin_navbar";
import AdminSidebar from "../Admin_sidebar";
import backgroundImage from "../../../assets/workplace.jpg";

const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const ManageProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // State to manage current image index for products with multiple images
  const [imageIndex, setImageIndex] = useState({});

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
        setProducts(response.data.slice(0, 8));
        setAllProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSeeAll = () => {
    setProducts(allProducts);
  };

  const handleProductView = (id) => {
    navigate(`/admin/product/view/${id}`);
  };

  const handleProductEdit = (id) => {
    navigate(`/admin/product/edit/${id}`);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleDelistedProducts = () => {
    navigate("/admin/delisted-products");
  };

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
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  // Functions to handle image sliding
  const goToNextImage = (productId) => {
    setImageIndex((prev) => {
      const currentIndex = prev[productId] || 0;
      const product = products.find((product) => product.id === productId);
      const nextIndex = (currentIndex + 1) % product.image_paths.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const goToPrevImage = (productId) => {
    setImageIndex((prev) => {
      const currentIndex = prev[productId] || 0;
      const product = products.find((product) => product.id === productId);
      const prevIndex = (currentIndex - 1 + product.image_paths.length) % product.image_paths.length;
      return { ...prev, [productId]: prevIndex };
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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

          {/* Action Buttons */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Add Product
            </button>
            <button
              onClick={handleDelistedProducts}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              View Delisted Products
            </button>
          </div>

          {/* Search Results */}
          {searchQuery && searchResults.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold">Search Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md">
                    <div className="w-full h-40 bg-gray-200 mb-4">
                      {product.image_paths?.length > 0 ? (
                        <img
                          src={product.image_paths[0]}
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product List */}
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md cursor-pointer">
                  <div className="relative w-full h-40 bg-gray-200 mb-4 overflow-hidden">
                    {/* Conditional Image Slider for Products with Multiple Images */}
                    {product.image_paths?.length > 1 ? (
                      <div className="flex transition-all duration-500 ease-in-out">
                        <img
                          src={product.image_paths[imageIndex[product.id] || 0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150';
                          }}
                        />
                      </div>
                    ) : (
                      <img
                        src={product.image_paths[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                    )}

                    {/* Navigation Buttons */}
                    {product.image_paths?.length > 1 && (
                      <>
                        <button
                          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                          onClick={() => goToPrevImage(product.id)}
                        >
                          &#10094;
                        </button>
                        <button
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                          onClick={() => goToNextImage(product.id)}
                        >
                          &#10095;
                        </button>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.model}</p>
                  <p className="text-gray-700 mt-2">₹{product.price}</p>

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
                    <button
                      onClick={() => handleToggleListing(product.id)}
                      className={`${
                        product.is_listed ? 'bg-red-500' : 'bg-green-500'
                      } text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
                    >
                      {product.is_listed ? 'Delist' : 'Show'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* See All Products */}
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
