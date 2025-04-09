import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from '../User_sidebar';
 import UserNavbar from '../User_Navbar';

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Your API key
const token = localStorage.getItem('auth_token'); // Retrieve the token

const ProductPage = () => {
  const [products, setProducts] = useState([]); // Products to display initially
  const [allProducts, setAllProducts] = useState([]); // All products fetched from API
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [hovered, setHovered] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]); // To manage products shown
 const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  useEffect(() => {
    // Fetch all products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL_AND_PORT}/products/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
          },
        });
        setAllProducts(response.data); // Store all products
        setDisplayedProducts(response.data.slice(0, 12)); // Initially show 12 products
        setProducts(response.data.slice(0, 12)); // Initially show 12 products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle popup open
  const handlePopupOpen = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });
      setPopupContent(response.data); // Set the popup content
      setPopupOpen(true); // Open the popup
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Handle popup close
  const handlePopupClose = () => {
    setPopupOpen(false);
    setPopupContent({});
  };

  // Function to handle See All Products click
  const handleSeeAll = () => {
    setDisplayedProducts(allProducts); // Display all products when clicked
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

  return (
<div className="flex flex-col h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://example.com/your-image.jpg")' }}>
      {/* User Navbar */}
      <UserNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 ml-50">
  {displayedProducts.map((product, index) => (
    <div key={index} className="flex flex-col items-center">
      <div
        className="box bg-gray-200 p-4 rounded-lg relative cursor-pointer hover:scale-105 transform transition-all duration-300 w-[300px] h-[400px]"
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="flex justify-center items-center w-full h-3/4">
          {product.image_paths && parseImagePaths(product.image_paths).length > 0 ? (
            <img
              src={convertBase64ToBlob(parseImagePaths(product.image_paths)[0]?.data)}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => handlePopupOpen(product.id)}
            />
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => handlePopupOpen(product.id)}
            />
          )}
        </div>

        <div
          className={`absolute top-4 right-4 bg-yellow-300 w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300 ${hovered === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-black transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => handlePopupOpen(product.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.model}</p>
      </div>
    </div>
  ))}
</div>


      {/* "See All Products" Button */}
      {displayedProducts.length < allProducts.length && (
        <div className=" justify-center mt-6">
          <button
            onClick={handleSeeAll}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            See All Products
          </button>
        </div>
      )}

      {/* Popup Modal */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-6xl w-full flex relative h-auto shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-900"
              onClick={handlePopupClose}
            >
              &times;
            </button>

            <div className="flex flex-wrap sm:flex-nowrap">
              {/* Left Section: Image */}
              <div className="w-full sm:w-1/2 p-4">
                {popupContent.image_paths && popupContent.image_paths.length > 0 ? (
                  <img
                    src={convertBase64ToBlob(popupContent.image_paths[0]?.data)}
                    alt={popupContent.name}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt={popupContent.name}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* Right Section: Product Details */}
              <div className="w-full sm:w-1/2 p-4">
                <h3 className="text-3xl font-semibold mb-4">{popupContent.name}</h3>
                <p className="text-lg mb-4">{popupContent.details?.additional_details}</p>

                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Model:</strong> {popupContent.model}</p>
                  <p><strong>Phase:</strong> {popupContent.details?.phase}</p>
                  <p><strong>Height:</strong> {popupContent.details?.height} meters</p>
                  <p><strong>Length:</strong> {popupContent.details?.length} meters</p>
                  <p><strong>Breadth:</strong> {popupContent.details?.breadth} meters</p>
                  <p><strong>Cooling:</strong> {popupContent.details?.cooling}</p>
                  <p><strong>Rated Power:</strong> {popupContent.details?.rated_power}</p>
                  <p><strong>Efficiency:</strong> {popupContent.details?.efficiency_in_percentage}%</p>
                  <p><strong>Protection:</strong> {popupContent.details?.protection}</p>
                  <p><strong>Price:</strong> ${popupContent.price}</p>
                </div>

                {/* Buy Now Button */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => alert('Redirect to Buy Now page')}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductPage;
