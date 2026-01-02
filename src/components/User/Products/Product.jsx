import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import UserSidebar from '../User_sidebar';
import UserNavbar from '../User_Navbar';

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
const token = localStorage.getItem('auth_token');

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filterType, setFilterType] = useState("ALL");

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [popupImageIndex, setPopupImageIndex] = useState(0);

  const [contactPopup, setContactPopup] = useState(false);

  const [hovered, setHovered] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState({});

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${BASE_URL_AND_PORT}/products/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });
      setAllProducts(res.data);
      setDisplayedProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  /* 🔹 FILTER */
  useEffect(() => {
    if (filterType === "ALL") {
      setDisplayedProducts(allProducts);
    } else {
      setDisplayedProducts(
        allProducts.filter(p =>
          p.name?.toUpperCase().includes(filterType) ||
          p.model?.toUpperCase().includes(filterType)
        )
      );
    }
  }, [filterType, allProducts]);

  const isAC = (product) =>
    product.name?.toUpperCase().includes("AC") ||
    product.model?.toUpperCase().includes("AC");

  const handlePopupOpen = async (id) => {
    const res = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': API_KEY,
      },
    });
    setPopupContent(res.data);
    setPopupImageIndex(0);
    setPopupOpen(true);
  };

  const goToNextImage = (id) => {
    setImageIndex(prev => {
      const current = prev[id] || 0;
      const product = allProducts.find(p => p.id === id);
      return { ...prev, [id]: (current + 1) % product.image_paths.length };
    });
  };

  const goToPrevImage = (id) => {
    setImageIndex(prev => {
      const current = prev[id] || 0;
      const product = allProducts.find(p => p.id === id);
      return { ...prev, [id]: (current - 1 + product.image_paths.length) % product.image_paths.length };
    });
  };

  const handleAddToCart = async (id, price) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return alert("Please login first");

    if (!cart.includes(id)) {
      setCart([...cart, id]);
      await axios.post(`${BASE_URL_AND_PORT}/cart/addtocart`, {
        user_id: userId,
        productid: id,
        price: price.toString(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });
      alert("Product added to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex">
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full lg:ml-60">

          {/* 🔹 HEADER */}
          <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg shadow">
            <h2 className="text-3xl font-bold text-white text-center flex-1">
              See Our Products
            </h2>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white px-4 py-2 rounded-md shadow font-semibold"
            >
              <option value="ALL">All Chargers</option>
              <option value="AC">AC Charger</option>
              <option value="DC">DC Charger</option>
            </select>
          </div>

          {/* 🔹 PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center">
                <div className="animate-spin w-16 h-16 border-t-4 border-green-500 rounded-full"></div>
              </div>
            ) : (
              displayedProducts.map((product, index) => (
                <div key={product.id} className="flex flex-col items-center">

                  <div
                    className="relative bg-gray-200 p-4 rounded-lg w-[300px] h-[400px] hover:scale-105 transition"
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <img
                      src={product.image_paths?.[imageIndex[product.id] || 0]}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      onClick={() => handlePopupOpen(product.id)}
                    />

                    {product.image_paths?.length > 1 && (
                      <>
                        <button onClick={() => goToPrevImage(product.id)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full">
                          &#10094;
                        </button>
                        <button onClick={() => goToNextImage(product.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full">
                          &#10095;
                        </button>
                      </>
                    )}

                    <div
                      onClick={() => handlePopupOpen(product.id)}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center cursor-pointer
                        ${hovered === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                      ➜
                    </div>
                  </div>

                  <h3 className="mt-3 font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.model}</p>

                 
                  <div className="mt-4 text-center">
  {isAC(product) ? (
    product.quantity > 0 ? (
      <button
        onClick={() => handleAddToCart(product.id, product.price)}
        className={`flex items-center justify-center px-4 py-2 rounded-md ${
          cart.includes(product.id) ? 'bg-green-500' : 'bg-[#faa122]'
        } text-white hover:${
          cart.includes(product.id) ? 'bg-green-600' : 'bg-blue-600'
        }`}
      >
        <FaShoppingCart className="mr-2" />
        {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
      </button>
    ) : (
      <div className="text-red-600 font-semibold">No Stock Available</div>
    )
  ) : (
    <button
      onClick={() => setContactPopup(true)}
      className="bg-yellow-400 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
    >
      Contact Us
    </button>
  )}
</div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🔹 CONTACT POPUP */}
    
      {contactPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]">
    <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-[420px] max-w-[90%]">
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
        Contact Us
      </h3>

      <p className="text-gray-600 leading-relaxed">
        For enquiries related to <span className="font-medium">DC Chargers</span>,
        please reach out to our sales team.
      </p>

      <div className="mt-4 bg-gray-100 py-3 px-4 rounded-lg">
        <p className="text-sm text-gray-500">Email us at</p>
        <p className="text-lg font-semibold text-blue-600">
         tgwbin@gmail.com
        </p>
      </div>

      <button
        onClick={() => setContactPopup(false)}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* 🔹 PRODUCT DETAILS POPUP */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-8 rounded-lg w-full sm:max-w-6xl max-w-full h-auto flex relative shadow-lg overflow-auto">

            <button
              className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-900"
              onClick={() => setPopupOpen(false)}
            >
              &times;
            </button>

            <div className="flex flex-wrap sm:flex-nowrap max-w-full overflow-hidden">
              {/* LEFT: IMAGES + BUTTON */}
              <div className="w-full sm:w-1/2 p-4 relative">
                {popupContent.image_paths?.length > 0 ? (
                  <div className="relative">
                    <img
                      src={popupContent.image_paths[popupImageIndex]}
                      alt={popupContent.name}
                      className="w-full h-auto object-contain rounded-lg shadow-md cursor-pointer"
                      onClick={() => setPopupImageIndex((popupImageIndex + 1) % popupContent.image_paths.length)}
                    />
                    {popupContent.image_paths.length > 1 && (
                      <>
                        <button
                          onClick={() => setPopupImageIndex((popupImageIndex - 1 + popupContent.image_paths.length) % popupContent.image_paths.length)}
                          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                        >&#60;</button>
                        <button
                          onClick={() => setPopupImageIndex((popupImageIndex + 1) % popupContent.image_paths.length)}
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                        >&#62;</button>
                      </>
                    )}
                  </div>
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt={popupContent.name}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                  />
                )}

                {/* 🔹 AC / DC BUTTON */}
                <div className="mt-4">
                  {isAC(popupContent) ? (
                    popupContent.quantity > 0 ? (
                      <button
                        onClick={() => handleAddToCart(popupContent.id, popupContent.price)}
                        className={`flex items-center justify-center px-4 py-2 rounded-md w-full ${
                          cart.includes(popupContent.id) ? 'bg-green-500' : 'bg-[#faa122]'
                        } text-white hover:${
                          cart.includes(popupContent.id) ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                      >
                        <FaShoppingCart className="mr-2" />
                        {cart.includes(popupContent.id) ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    ) : (
                      <div className="text-red-600 font-semibold">No Stock Available</div>
                    )
                  ) : (
                    <button
                      onClick={() => setContactPopup(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full"
                    >
                      Contact Us
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT: Product Info */}
              {/* <div className="w-full sm:w-1/2 p-4">
                <h3 className="text-3xl font-semibold mb-4 text-blue-600">Product Name: {popupContent.name}</h3>
                <h4 className="text-3xl font-semibold mb-4 text-green-600">Model: {popupContent.model}</h4>
                <h4 className="text-3xl font-semibold mb-4 text-red-600">Price: {popupContent.price}</h4>
                <h4 className="text-2xl font-semibold text-teal-600">Product Color: {popupContent.product_color}</h4>
                <div className={`w-6 h-6 rounded border border-gray-300`} style={{ backgroundColor: popupContent.product_color?.toLowerCase() }}></div> */}
                <div className="w-full sm:w-1/2 p-4">
  <h3 className="text-3xl font-semibold mb-4 text-blue-600">
    Product Name: {popupContent.name}
  </h3>

  <h4 className="text-2xl font-semibold mb-4 text-green-600">
    Model: {popupContent.model}
  </h4>


<div className="mb-4 flex items-end gap-4 flex-wrap">
  <span className="text-2xl font-semibold text-gray-700">
    Price:
  </span>

  
  {popupContent.mrp && popupContent.mrp > popupContent.price && (
    <span className="text-2xl sm:text-3xl font-semibold text-gray-400 line-through">
      ₹{popupContent.mrp}
    </span>
  )}


  <span className="text-3xl sm:text-4xl font-bold text-red-600">
    ₹{popupContent.price}
  </span>
</div>



  <div className="flex items-center gap-3 mt-2">
    <h4 className="text-xl font-semibold text-teal-600">
      Product Color:
    </h4>

    <span className="text-lg font-medium capitalize">
      {popupContent.product_color}
    </span>

    <div
      className="w-6 h-6 rounded border border-gray-300"
      style={{ backgroundColor: popupContent.product_color?.toLowerCase() }}
    />
  </div> 


                {popupContent.details?.additional_details && (
                  <p className="text-lg mb-4">Features: {popupContent.details.additional_details}</p>
                )}
                <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6 max-h-[400px] overflow-y-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold">Detail</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['phase', 'Phase'],
                        ['cooling', 'Cooling'],
                        ['rated_power', 'Rated Power'],
                        ['ingress_protection', 'Ingress Protection'],
                        ['current', 'Current'],
                        ['display', 'Display'],
                        ['gun_type', 'Gun Type'],
                        ['gun_details', 'Gun Details'],
                        ['material', 'Material'],
                        ['frequency', 'Frequency'],
                        ['dimensions', 'Dimensions'],
                        ['protection', 'Protection'],
                        ['fast_charger', 'Fast Charger'],
                        ['communication', 'Communication'],
                        ['cable_length', 'Cable Length'],
                        ['mountingtype', 'Mounting Type'],
                        ['input_voltage', 'Input Voltage'],
                        ['ouput_voltage', 'Output Voltage'],
                        ['operatingtemps', 'Operating Temperature'],
                        ['ocpp_present','OCPP Present'],
                        ['safetyregulation', 'Safety Regulation'],
                        ['push_button', 'Push Button'],
                        ['chargingoperation', 'Charging Operation'],
                      ].map(([key, label], index) => {
                        const value = popupContent.details?.[key];
                        if (!value || value === 'N/A') return null;
                        return (
                          <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="px-4 py-2 text-sm font-medium">{label}</td>
                            <td className="px-4 py-2 text-sm">{value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductPage;
