import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from '../Admin_sidebar';
import backgroundImage from '../../../assets/workplace.jpg';

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const DelistedProductViewPage = () => {
  const [delistedProducts, setDelistedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchDelistedProducts = async () => {
      const authToken = localStorage.getItem('auth_token');
      try {
        const response = await axios.get(
          `${BASE_URL_AND_PORT}/products/admin/get-delisted/${(currentPage - 1) * 50 + 1}-${currentPage * 50}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'API-KEY': API_KEY,
            },
          }
        );
        setDelistedProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delisted products:', error);
        setLoading(false);
      }
    };

    fetchDelistedProducts();
  }, [currentPage]);

  const handleNextImage = (productId) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[productId] || 0;
      const nextIndex =
        (currentIndex + 1) % delistedProducts.find((product) => product.id === productId).image_paths.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const handlePrevImage = (productId) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[productId] || 0;
      const prevIndex =
        (currentIndex - 1 + delistedProducts.find((product) => product.id === productId).image_paths.length) %
        delistedProducts.find((product) => product.id === productId).image_paths.length;
      return { ...prev, [productId]: prevIndex };
    });
  };

  if (loading) return <div className="text-center mt-10">Loading delisted products...</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-teal-50"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-64`}>
          <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content */}
        {/* <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white bg-opacity-90 mt-4 md:mt-8 rounded shadow-md w-full"> */}
  
 <div className="flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-6 md:mt-8 bg-white bg-opacity-90 rounded-2xl shadow-md w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
  
 

  


          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
            Delisted Products
          </h2>

          {delistedProducts.length === 0 ? (
            <p className="text-center text-gray-700">No delisted products found.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {delistedProducts.map((product) => (
                <div
                  key={product.id}
                  // className="border rounded-lg p-4 shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-200 w-200"
                  className="border rounded-xl p-4 shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-200 w-full sm:w-auto max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
 

               
                  <div className="relative w-full max-w-xl mx-auto aspect-[4/3] bg-gray-200 mb-4 overflow-hidden rounded">
                    {product.image_paths?.length > 1 ? (
                      <>
                        <img
                          src={product.image_paths[currentImageIndex[product.id] || 0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300';
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
                        src={product.image_paths?.[0] || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300';
                        }}
                      />
                    )}
                  </div>
                  <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">Model: {product.model}</p>
                  <p className="text-lg text-gray-700 mb-4">Price: ₹{product.price}</p>
                  {/* <p className="text-lg text-gray-700 mb-4">Quantity: {product.quantity}</p> */}

                  {/* Table Format for Product Details */}
                  <table className="w-full table-auto">
                    <tbody>
                      <tr>
                        <td className="font-semibold">Phase</td>
                        <td>{product.details.phase}</td>
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
                        <td className="font-semibold">Display</td>
                        <td>{product.details.display}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Gun Type</td>
                        <td>{product.details.gun_type}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Material</td>
                        <td>{product.details.material}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Frequency</td>
                        <td>{product.details.frequency}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Dimensions </td>
                        <td>{product.details.dimensions}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Protection</td>
                        <td>{product.details.protection}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Push Button</td>
                        <td>{product.details.push_button}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Rated Power</td>
                        <td>{product.details.rated_power}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Cable Length</td>
                        <td>{product.details.cable_length}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Mounting Type </td>
                        <td>{product.details.mountingtype}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Output Voltage </td>
                        <td>{product.details.ouput_voltage}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Operating Temps</td>
                        <td>{product.details.operatingtemps}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Safety Regulation</td>
                        <td>{product.details.safetyregulation}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Charging Operation</td>
                        <td>{product.details.chargingoperation}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Ingress Protection</td>
                        <td>{product.details.ingress_protection}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-medium text-gray-800">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelistedProductViewPage;
