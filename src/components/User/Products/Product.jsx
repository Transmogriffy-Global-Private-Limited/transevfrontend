import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; // Import the Cart Icon
import UserSidebar from '../User_sidebar';
import UserNavbar from '../User_Navbar';
import background from "../../../assets/new3.jpg";
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
  const [cart, setCart] = useState([]); // Track products added to the cart
  const [loading, setLoading] = useState(true); // Manage loading state

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
        setLoading(false); // Set loading to false after fetching products
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false in case of an error
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

  // Function to handle Add to Cart
  const handleAddToCart = async (productId, price) => {
    const userId = localStorage.getItem('user_id'); // Get user ID from local storage
    if (!userId) {
      alert('Please login first');
      return;
    }

    const data = {
      user_id: userId, // Use user ID from local storage
      productid: productId,
      price: price.toString(), // Convert price to string before sending
    };

    try {
      // Add the product to the cart if it's not already there
      if (!cart.includes(productId)) {
        setCart([...cart, productId]); // Add product to cart state
        await axios.post(`${BASE_URL_AND_PORT}/cart/addtocart`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
          },
        });
        alert('Product added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div
       className=" min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
       style={{ background: `url(${background})` }}
     >
      {/* User Navbar */}
      <UserNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="bg-white rounded-lg shadow-lg p-6 ml-50 mt-6 w-400">
        <h2 className="text-3xl font-bold text-center mb-6">See Our Products</h2>
        {displayedProducts.length < allProducts.length && (
          <div className="justify-center mt-6 ">
            <button
              onClick={handleSeeAll}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              See All Products
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 ml-5">
          {loading ? (
            <div className="flex justify-center items-center col-span-full h-96">
              <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
            </div>
          ) : (
            displayedProducts.map((product, index) => (
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
                  {/* Add to Cart Button */}
                  {/* <button
                    onClick={() => handleAddToCart(product.id, product.price)}
                    className={`mt-4 flex items-center justify-center px-4 py-2 rounded-md ${cart.includes(product.id) ? 'bg-green-500' : 'bg-pink-500'} text-white hover:${cart.includes(product.id) ? 'bg-green-600' : 'bg-blue-600'}`}
                  >
                    <FaShoppingCart className="mr-2" />
                    {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button> */}
                  {product.quantity > 0 ? (
  <button
    onClick={() => handleAddToCart(product.id, product.price)}
    className={`mt-4 flex items-center justify-center px-4 py-2 rounded-md ${
      cart.includes(product.id) ? 'bg-green-500' : 'bg-pink-500'
    } text-white hover:${
      cart.includes(product.id) ? 'bg-green-600' : 'bg-blue-600'
    }`}
  >
    <FaShoppingCart className="mr-2" />
    {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
  </button>
) : (
  <div className="mt-4 text-red-600 font-semibold">No Stock Available</div>
)}

                </div>
              </div>
            ))
          )}
        </div>

        {/* "See All Products" Button */}
        {displayedProducts.length < allProducts.length && (
          <div className="justify-center mt-6 ">
            <button
              onClick={handleSeeAll}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              See All Products
            </button>
          </div>
        )}

        
      {popupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-6xl w-full flex relative h-auto shadow-lg overflow-hidden">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-900"
        onClick={handlePopupClose}
      >
        &times;
      </button>

     
         <div className="flex flex-wrap sm:flex-nowrap max-w-full overflow-hidden">
        <div className="w-full sm:w-1/2 p-4">
  {popupContent.image_paths && popupContent.image_paths.length > 0 ? (
    <img
      src={parseImagePaths(popupContent.image_paths)[0].data}  // Use the base64 data from popupContent
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

  {/* Add to Cart Button */}
  {/* <button
    onClick={() => handleAddToCart(popupContent.id, popupContent.price)}
    className={`mt-4 flex items-center justify-center px-4 py-2 rounded-md ${cart.includes(popupContent.id) ? 'bg-green-500' : 'bg-pink-500'} text-white hover:${cart.includes(popupContent.id) ? 'bg-green-600' : 'bg-blue-600'}`}
  >
    <FaShoppingCart className="mr-2" />
    {cart.includes(popupContent.id) ? 'Added to Cart' : 'Add to Cart'}
  </button>

</div> */}
{popupContent.quantity > 0 ? (
  <button
    onClick={() => handleAddToCart(popupContent.id, popupContent.price)}
    className={`mt-4 flex items-center justify-center px-4 py-2 rounded-md ${cart.includes(popupContent.id) ? 'bg-green-500' : 'bg-pink-500'} text-white hover:${cart.includes(popupContent.id) ? 'bg-green-600' : 'bg-blue-600'}`}
  >
    <FaShoppingCart className="mr-2" />
    {cart.includes(popupContent.id) ? 'Added to Cart' : 'Add to Cart'}
  </button>
) : (
  <div className="mt-4 text-red-600 font-semibold">No Stock Available</div>
)}

</div>

        {/* Right Section: Product Details */}
        <div className="w-full sm:w-1/2 p-4">
        <h3 className="text-3xl font-semibold mb-4 text-blue-600">Product Name: {popupContent.name}</h3>
<h4 className="text-3xl font-semibold mb-4 text-green-600">Model: {popupContent.model}</h4>
<h4 className="text-3xl font-semibold mb-4 text-red-600">Price: {popupContent.price}</h4>
<p className="text-lg mb-4">Features: {popupContent.details?.additional_details}</p>

          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6 max-h-[400px] overflow-y-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-sm font-semibold">Detail</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Phase:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.phase}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Height:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.height} meters</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Length:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.length} meters</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Breadth:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.breadth} meters</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Cooling:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.cooling}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Rated Power:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.rated_power}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Efficiency:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.efficiency_in_percentage}%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Protection:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.protection}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Current:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.current}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Voltage:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.voltage}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Frequency:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.frequency}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Noise Level:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.noise_level}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Fast Charger:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.fast_charger}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Communication:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.communication}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Weight (in kgs):</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.weight_in_kgs}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Ingress Protection:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.ingress_protection}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium">Max Operating Temp:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.maximum_operating_temperature} °C</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium">Min Operating Temp:</td>
                  <td className="px-4 py-2 text-sm">{popupContent.details?.minimum_operating_temperature} °C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
)}



      </div>
    </div>
    </div>
  );
};

export default ProductPage;
