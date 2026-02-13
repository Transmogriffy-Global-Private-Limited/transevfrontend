// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminNavbar from "../Admin_navbar";
// import AdminSidebar from "../Admin_sidebar";
// import backgroundImage from "../../../assets/workplace.jpg";

// const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const ManageProductsPage = () => {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [allProducts, setAllProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // State to manage current image index for products with multiple images
//   const [imageIndex, setImageIndex] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const authToken = localStorage.getItem("auth_token");
//       try {
//         const response = await axios.get(`${BASE_URL_AND_PORT}/products/all`, {
//           headers: {
//             "Authorization": `Bearer ${authToken}`,
//             "API-KEY": API_KEY,
//           },
//         });
//         setProducts(response.data.slice(0, 8));
//         setAllProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSeeAll = () => {
//     setProducts(allProducts);
//   };

//   const handleProductView = (id) => {
//     navigate(`/admin/product/view/${id}`);
//   };

//   const handleProductEdit = (id) => {
//     navigate(`/admin/product/edit/${id}`);
//   };

//   const handleAddProduct = () => {
//     navigate("/add-product");
//   };

//   const handleDelistedProducts = () => {
//     navigate("/admin/delisted-products");
//   };

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     const authToken = localStorage.getItem("auth_token");
//     try {
//       const response = await axios.post(
//         `${BASE_URL_AND_PORT}/products/search`,
//         { query: searchQuery, limit: "1-100" },
//         {
//           headers: {
//             "Authorization": `Bearer ${authToken}`,
//             "API-KEY": API_KEY,
//           },
//         }
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error searching products:", error);
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleToggleListing = async (productId) => {
//     const authToken = localStorage.getItem("auth_token");
//     try {
//       const response = await axios.put(
//         `${BASE_URL_AND_PORT}/products/toggle-listing`,
//         { product_id: productId },
//         {
//           headers: {
//             "Authorization": `Bearer ${authToken}`,
//             "API-KEY": API_KEY,
//           },
//         }
//       );
//       if (response.status === 200) {
//         const updatedProducts = products.map((product) =>
//           product.id === productId
//             ? { ...product, is_listed: !product.is_listed }
//             : product
//         );
//         setProducts(updatedProducts);
//       }
//     } catch (error) {
//       console.error("Error toggling product listing:", error);
//     }
//   };

//   // Functions to handle image sliding
//   const goToNextImage = (productId) => {
//     setImageIndex((prev) => {
//       const currentIndex = prev[productId] || 0;
//       const product = products.find((product) => product.id === productId);
//       const nextIndex = (currentIndex + 1) % product.image_paths.length;
//       return { ...prev, [productId]: nextIndex };
//     });
//   };

//   const goToPrevImage = (productId) => {
//     setImageIndex((prev) => {
//       const currentIndex = prev[productId] || 0;
//       const product = products.find((product) => product.id === productId);
//       const prevIndex = (currentIndex - 1 + product.image_paths.length) % product.image_paths.length;
//       return { ...prev, [productId]: prevIndex };
//     });
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-r from-white-400 via-teal-100 to-white-700 bg-cover bg-center bg-fixed"
   
//     >
//       <AdminNavbar onToggleSidebar={toggleSidebar} />

//       <div className="flex flex-1">
//         <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//         {/* <div className="bg-white rounded-lg shadow-lg p-6 ml-70 mt-6 w-400"> */}
//          <div className="bg-white rounded-lg shadow-lg p-6 mt-6 sm:ml-0 lg:ml-65 lg:w-4/5 w-full mx-auto ">
//           <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

//           {/* Search Bar */}
//           <div className="flex justify-center mb-4">
//             <form onSubmit={handleSearch} className="flex space-x-2">
//               <input
//                 type="text"
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
//                 placeholder="Search Products"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//               >
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-center mb-6 space-x-4">
//             <button
//               onClick={handleAddProduct}
//               className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
//             >
//               Add Product
//             </button>
//             <button
//               onClick={handleDelistedProducts}
//               className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
//             >
//               View Delisted Products
//             </button>
//           </div>

//           {/* Search Results */}
//           {searchQuery && searchResults.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-2xl font-semibold">Search Results</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {searchResults.map((product) => (
//                   <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md">
//                     <div className="w-full h-40 bg-gray-200 mb-4">
//                       {product.image_paths?.length > 0 ? (
//                         <img
//                           src={product.image_paths[0]}
//                           alt={product.name}
//                           className="w-full h-full object-cover rounded-lg"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://via.placeholder.com/150';
//                           }}
//                         />
//                       ) : (
//                         <img
//                           src="https://via.placeholder.com/150"
//                           alt={product.name}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       )}
//                     </div>
//                     <h3 className="text-xl font-semibold">{product.name}</h3>
//                     <p className="text-gray-600">{product.model}</p>
//                     <p className="text-gray-700 mt-2">₹{product.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Product List */}
//           {loading ? (
//             <div className="text-center">Loading products...</div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.map((product) => (
              
//                 <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md cursor-pointer flex flex-col justify-between h-[400px] w-[300px]">
//   <div className="relative w-full h-[250px] bg-gray-200 mb-4 overflow-hidden">
//                     {/* Conditional Image Slider for Products with Multiple Images */}
//                     {product.image_paths?.length > 1 ? (
//                       <div className="flex transition-all duration-500 ease-in-out">
//                         <img
//                           src={product.image_paths[imageIndex[product.id] || 0]}
//                           alt={product.name}
//                           className="w-full h-full object-cover rounded-lg"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://via.placeholder.com/150';
//                           }}
//                         />
//                       </div>
//                     ) : (
//                       <img
//                         src={product.image_paths[0]}
//                         alt={product.name}
//                         className="w-full h-full object-cover rounded-lg"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = 'https://via.placeholder.com/150';
//                         }}
//                       />
//                     )}

//                     {/* Navigation Buttons */}
//                     {product.image_paths?.length > 1 && (
//                       <>
//                         <button
//                           className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
//                           onClick={() => goToPrevImage(product.id)}
//                         >
//                           &#10094;
//                         </button>
//                         <button
//                           className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
//                           onClick={() => goToNextImage(product.id)}
//                         >
//                           &#10095;
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   <h3 className="text-xl font-semibold">{product.name}</h3>
//                   <p className="text-gray-600">{product.model}</p>
//                   <p className="text-gray-700 mt-2">₹{product.price}</p>

//                   <div className="flex justify-between mt-4">
//                     <button
//                       onClick={() => handleProductView(product.id)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => handleProductEdit(product.id)}
//                       className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleToggleListing(product.id)}
//                       className={`${
//                         product.is_listed ? 'bg-red-500' : 'bg-green-500'
//                       } text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
//                     >
//                       {product.is_listed ? 'Delist' : 'Show'}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* See All Products */}
//           {products.length < allProducts.length && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleSeeAll}
//                 className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
//               >
//                 See All Products
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageProductsPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../Admin_navbar";
import AdminSidebar from "../Admin_sidebar";
import { FiSearch } from "react-icons/fi"; // Search icon

const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const ManageProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageIndex, setImageIndex] = useState({});
  const [filterType, setFilterType] = useState("ALL");
  const [showAll, setShowAll] = useState(false);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      const authToken = localStorage.getItem("auth_token");
      try {
        const response = await axios.get(
          `${BASE_URL_AND_PORT}/products/all`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "API-KEY": API_KEY,
            },
          }
        );
        setAllProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= FILTER PRODUCTS ================= */
  useEffect(() => {
    let filtered = allProducts;

    if (filterType !== "ALL") {
      filtered = allProducts.filter(
        (p) =>
          p.name?.toUpperCase().includes(filterType) ||
          p.model?.toUpperCase().includes(filterType)
      );
    }

    setProducts(showAll ? filtered : filtered.slice(0, 8));
  }, [filterType, allProducts, showAll]);

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filtered.slice(0, 8));
    setShowAll(false);
  };

  /* ================= NAVIGATION ================= */
  const handleProductView = (id) => navigate(`/admin/product/view/${id}`);
  const handleProductEdit = (id) => navigate(`/admin/product/edit/${id}`);
  const handleAddProduct = () => navigate("/add-product");
  const handleDelistedProducts = () => navigate("/admin/delisted-products");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  /* ================= TOGGLE LISTING ================= */
  const handleToggleListing = async (productId) => {
    const authToken = localStorage.getItem("auth_token");
    try {
      const response = await axios.put(
        `${BASE_URL_AND_PORT}/products/toggle-listing`,
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "API-KEY": API_KEY,
          },
        }
      );

      if (response.status === 200) {
        const updated = products.map((product) =>
          product.id === productId
            ? { ...product, is_listed: !product.is_listed }
            : product
        );
        setProducts(updated);
      }
    } catch (error) {
      console.error("Toggle listing error:", error);
    }
  };

  /* ================= IMAGE SLIDER ================= */
  const goToNextImage = (productId) => {
    setImageIndex((prev) => {
      const current = prev[productId] || 0;
      const product = products.find((p) => p.id === productId);
      const next = (current + 1) % product.image_paths.length;
      return { ...prev, [productId]: next };
    });
  };

  const goToPrevImage = (productId) => {
    setImageIndex((prev) => {
      const current = prev[productId] || 0;
      const product = products.find((p) => p.id === productId);
      const prevIndex =
        (current - 1 + product.image_paths.length) %
        product.image_paths.length;
      return { ...prev, [productId]: prevIndex };
    });
  };

  /* ================= SEE ALL ================= */
  const handleSeeAll = () => {
    setShowAll(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-teal-100 to-white bg-fixed">
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 lg:ml-64 w-full mx-auto">
          {/* HEADER + FILTER */}
          <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-lg shadow">
            <h2 className="text-3xl font-bold text-white">Manage Products</h2>

            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setShowAll(false);
              }}
              className="bg-white px-4 py-2 rounded-md shadow font-semibold"
            >
              <option value="ALL">All Chargers</option>
              <option value="AC">AC Charger</option>
              <option value="DC">DC Charger</option>
            </select>
          </div>

          {/* SEARCH */}
          <div className="flex justify-center mb-4">
            <form className="relative w-80" onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
              Add Product
            </button>

            <button
              onClick={handleDelistedProducts}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
            >
              View Delisted Products
            </button>
          </div>

          {/* PRODUCTS GRID */}
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg p-4 shadow-md flex flex-col justify-between h-[400px]"
                >
                  <div className="relative w-full h-[220px] bg-gray-200 mb-4 overflow-hidden">
                    <img
                      src={product.image_paths?.[imageIndex[product.id] || 0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {product.image_paths?.length > 1 && (
                      <>
                        <button
                          onClick={() => goToPrevImage(product.id)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        >
                          &#10094;
                        </button>
                        <button
                          onClick={() => goToNextImage(product.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        >
                          &#10095;
                        </button>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.model}</p>
                  <p className="text-gray-700">₹{product.price}</p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleProductView(product.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleProductEdit(product.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggleListing(product.id)}
                      className={`${
                        product.is_listed ? "bg-red-500" : "bg-green-500"
                      } text-white px-3 py-1 rounded-md`}
                    >
                      {product.is_listed ? "Delist" : "Show"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* See All Products */}
          {!showAll && products.length >= 8 && products.length < allProducts.length && (
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
