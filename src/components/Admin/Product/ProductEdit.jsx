// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import AdminNavbar from '../Admin_navbar';
// import AdminSidebar from "../Admin_sidebar";
// import backgroundImage from '../../../assets/workplace.jpg';

// const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
// const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

// const ProductEditPage = () => {
//   const { id } = useParams(); // Get product ID from URL params
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updatedProductData, setUpdatedProductData] = useState(null);
//   const [removedImages, setRemovedImages] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [imageIndex, setImageIndex] = useState(0); // For image slider
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // Fetch product data from the API
//   useEffect(() => {
//     const fetchProduct = async () => {
//       const authToken = localStorage.getItem('auth_token');
//       try {
//         const response = await axios.get(
//           `${BASE_URL_AND_PORT}/products/get_by_id/${id}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${authToken}`,
//               'API-KEY': API_KEY,
//             },
//           }
//         );
//         setProduct(response.data);
//         setUpdatedProductData(response.data);  // Initialize the form with current product data
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to load product details.');
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedProductData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedProductData((prevData) => ({
//       ...prevData,
//       details: {
//         ...prevData.details,
//         [name]: value,
//       },
//     }));
//   };

//   const handleImageChange = (e) => {
//     setFiles(e.target.files); // Handling file input
//   };

//   const handleRemovedImagesChange = (e) => {
//     setRemovedImages(e.target.value.split(',')); // Assuming the input is comma-separated
//   };

//   const handleProductUpdate = async (e) => {
//     e.preventDefault();
//     const authToken = localStorage.getItem('auth_token');

//     const formData = new FormData();
//     formData.append('product_data', JSON.stringify(updatedProductData));  // Append the updated product data
//     for (let i = 0; i < files.length; i++) {
//       formData.append('images', files[i]);  // Append each file
//     }
//     formData.append('removed_images', removedImages.join(',')); // Join removed images

//     try {
//       const response = await axios.put(
//         `${BASE_URL_AND_PORT}/products/update`,
//         formData,
//         {
//           headers: {
//             'Authorization': `Bearer ${authToken}`,
//             'API-KEY': API_KEY,
//           },
//         }
//       );
//       navigate(`/manage/products`);
//     } catch (error) {
//       console.error('Failed to update product:', error);
//     }
//   };

//   // Helper function to parse image paths from a JSON string
//   const parseImagePaths = (imagePathsString) => {
//     try {
//       const parsedJson = JSON.parse(imagePathsString.replace(/'/g, '"')); // Replace single quotes with double quotes to make it valid JSON
//       return parsedJson;
//     } catch (error) {
//       console.error("Error parsing image paths:", error);
//       return []; // Return an empty array if parsing fails
//     }
//   };

//   const handleNextImage = () => {
//     if (product && product.image_paths) {
//       const nextIndex = (imageIndex + 1) % product.image_paths.length;
//       setImageIndex(nextIndex);
//     }
//   };

//   const handlePrevImage = () => {
//     if (product && product.image_paths) {
//       const prevIndex = (imageIndex - 1 + product.image_paths.length) % product.image_paths.length;
//       setImageIndex(prevIndex);
//     }
//   };

//   const handleImageClickToRemove = (filename) => {
//     // Add the image filename to removedImages array
//     setRemovedImages((prev) => [...prev, filename]);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <AdminNavbar onToggleSidebar={toggleSidebar} />
//       <div className="flex flex-1">
//         <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//         <div className="product-edit-page bg-white ml-80 w-200 mt-8">
//           <div className="container mx-auto p-6">
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
//             >
//               Back to Product List
//             </button>
//             <form onSubmit={handleProductUpdate}>
//               <div className="form-group">
//                 <label>Product ID</label>
//                 <input
//                   type="text"
//                   name="product_id"
//                   value={updatedProductData.id}  // Automatically populated from API response
//                   onChange={handleInputChange}  // Make the product_id editable
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Product Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={updatedProductData.name}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Model</label>
//                 <input
//                   type="text"
//                   name="model"
//                   value={updatedProductData.model}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={updatedProductData.price}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Quantity</label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={updatedProductData.quantity}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               {/* Details Section */}
//               <h3 className="text-xl font-semibold mt-4">Product Details</h3>
              
//               <div className="form-group">
//                 <label>Input Voltage</label>
//                 <input
//                   type="text"
//                   name="voltage"
//                   value={updatedProductData.details.input_voltage}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Phase</label>
//                 <input
//                   type="text"
//                   name="phase"
//                   value={updatedProductData.details.phase}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Current</label>
//                 <input
//                   type="text"
//                   name="current"
//                   value={updatedProductData.details.current}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Frequency</label>
//                 <input
//                   type="text"
//                   name="frequency"
//                   value={updatedProductData.details.frequency}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Protection</label>
//                 <input
//                   type="text"
//                   name="protection"
//                   value={updatedProductData.details.protection}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//   <label>Dimensions</label>
//   <input
//     type="text"
//     name="dimensions"
//     value={updatedProductData.details.dimensions}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>
// <div className="form-group mb-4">
//   <label>Display</label>
//   <input
//     type="text"
//     name="display"
//     value={updatedProductData.details.display}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>

// <div className="form-group mb-4">
//   <label>Gun Type</label>
//   <input
//     type="text"
//     name="gun_type"
//     value={updatedProductData.details.gun_type}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>
// <div className="form-group mb-4">
//   <label>Gun Details</label>
//   <input
//     type="text"
//     name="gun_details"
//     value={updatedProductData.details.gun_details}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>

// <div className="form-group mb-4">
//   <label>Material</label>
//   <input
//     type="text"
//     name="material"
//     value={updatedProductData.details.material}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>


//               <div className="form-group">
//                 <label>Rated Power</label>
//                 <input
//                   type="text"
//                   name="rated_power"
//                   value={updatedProductData.details.rated_power}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Fast Charger</label>
//                 <input
//                   type="text"
//                   name="fast_charger"
//                   value={updatedProductData.details.fast_charger}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Communication</label>
//                 <input
//                   type="text"
//                   name="communication"
//                   value={updatedProductData.details.communication}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Cooling</label>
//                 <input
//                   type="text"
//                   name="cooling"
//                   value={updatedProductData.details.cooling}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

             

//               <div className="form-group">
//                 <label>Ingress Protection</label>
//                 <input
//                   type="text"
//                   name="ingress_protection"
//                   value={updatedProductData.details.ingress_protection}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>

           
//             <div className="form-group mb-4">
//   <label>Push Button</label>
//   <input
//     type="text"
//     name="push_button"
//     value={updatedProductData.details.push_button}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>
// <div className="form-group mb-4">
//   <label>Cable Length</label>
//   <input
//     type="text"
//     name="cable_length"
//     value={updatedProductData.details.cable_length}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>

// <div className="form-group mb-4">
//   <label>Mounting Type</label>
//   <input
//     type="text"
//     name="mountingtype"
//     value={updatedProductData.details.mountingtype}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>

// <div className="form-group mb-4">
//   <label>Output Voltage</label>
//   <input
//     type="text"
//     name="ouput_voltage"
//     value={updatedProductData.details.ouput_voltage}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>

// <div className="form-group mb-4">
//   <label>Operating Temperature</label>
//   <input
//     type="text"
//     name="operatingtemps"
//     value={updatedProductData.details.operatingtemps}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>

// <div className="form-group mb-4">
//   <label>Safety Regulation</label>
//   <input
//     type="text"
//     name="safetyregulation"
//     value={updatedProductData.details.safetyregulation}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>

// <div className="form-group mb-4">
//   <label>Charging Operation</label>
//   <input
//     type="text"
//     name="chargingoperation"
//     value={updatedProductData.details.chargingoperation}
//     onChange={handleDetailsChange}
//     className="border p-2 w-full"
//   />
// </div>



             
//               <div className="form-group">
//                 <label>Additional Details</label>
//                 <textarea
//                   name="additional_details"
//                   value={updatedProductData.details.additional_details}
//                   onChange={handleDetailsChange}
//                   className="border p-2 w-full"
//                 />
//               </div>
             
//                {/* <div className="form-group">
//                  <label>Removed Images</label>
//                  <input
//                   type="text"
//                   value={removedImages.join(',')} // Display removed images as comma-separated list
//                   onChange={handleRemovedImagesChange}
//                   className="border p-2 w-full"
//                   readOnly
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Upload New Images</label>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleImageChange}
//                   className="border p-2 w-full"
//                 />
//               </div> */}

              

//               <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
//                 Update Product
//               </button>
//               {/* Display current images */}
//               {/* Image Slider */}
//               <div className="relative w-full max-w-xl mx-auto aspect-[4/3] bg-gray-200 mb-6">
//               {product.image_paths?.length > 0 ? (
//                 <>
//                   <img
//                     src={product.image_paths[imageIndex]}
//                     alt={product.name}
//                     className="w-full h-full object-cover rounded-lg"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://via.placeholder.com/500';
//                     }}
//                   />
//                   <button
//                     className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
//                     onClick={handlePrevImage}
//                   >
//                     &#10094;
//                   </button>
//                   <button
//                     className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
//                     onClick={handleNextImage}
//                   >
//                     &#10095;
//                   </button>
//                 </>
//               ) : (
//                 <img
//                   src={product.image_paths?.[0] || 'https://via.placeholder.com/500'}
//                   alt={product.name}
//                   className="w-full h-full object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/500';
//                   }}
//                 />
//               )}
//             </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductEditPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from "../Admin_sidebar";
import backgroundImage from '../../../assets/workplace.jpg';

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        setUpdatedProductData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const convertEmptyToNull = (value) => {
    return value === '' ? null : value;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [name]: convertEmptyToNull(value),
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: convertEmptyToNull(value),
      },
    }));
  };

  const handleImageChange = (e) => {
    setFiles(e.target.files);
  };

  const handleRemovedImagesChange = (e) => {
    setRemovedImages(e.target.value.split(','));
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('auth_token');

    const formData = new FormData();
    formData.append('product_data', JSON.stringify(updatedProductData));
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('removed_images', removedImages.join(','));

    try {
      await axios.put(
        `${BASE_URL_AND_PORT}/products/update`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'API-KEY': API_KEY,
          },
        }
      );
      navigate(`/manage/products`);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleNextImage = () => {
    if (product?.image_paths) {
      const nextIndex = (imageIndex + 1) % product.image_paths.length;
      setImageIndex(nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (product?.image_paths) {
      const prevIndex = (imageIndex - 1 + product.image_paths.length) % product.image_paths.length;
      setImageIndex(prevIndex);
    }
  };

  const handleImageClickToRemove = (filename) => {
    setRemovedImages((prev) => [...prev, filename]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // ... JSX stays the same for the form

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-white-100 via-white-500 to-white-700 bg-cover bg-center bg-fixed"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        {/* <div className="product-edit-page bg-white ml-80 w-200 mt-8"> */}
        {/* <div className="product-edit-page bg-white ml-0 sm:ml-4 md:ml-8 lg:ml-16 xl:ml-20 w-full sm:w-auto md:w-[400px] lg:w-[500px] mt-8 "> */}
  <div className="flex justify-center w-200 mt-8 bg-white lg:ml-150">
      {/* <div className="product-edit-page bg-white w-full sm:w-auto md:w-[400px] lg:w-[500px] px-6 py-8 rounded shadow-md"></div> */}
          <div className="container mx-auto p-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            >
              Back to Product List
            </button>
            <form onSubmit={handleProductUpdate}>
              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  name="product_id"
                  value={updatedProductData?.id || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
  
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedProductData?.name || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
  
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  name="model"
                  value={updatedProductData?.model || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
  
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedProductData?.price || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
  
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedProductData?.quantity || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="form-group mt-4">
  <label>Color</label>
  <input
    type="text"
    name="product_color"
    value={updatedProductData?.product_color || ''}
    onChange={handleInputChange}
    className="border p-2 w-full"
  />
</div>

              <h3 className="text-xl font-semibold mt-4">Product Details</h3>
  
              {Object.entries({
                input_voltage: 'Input Voltage',
                phase: 'Phase',
                current: 'Current',
                frequency: 'Frequency',
                protection: 'Protection',
                dimensions: 'Dimensions',
                display: 'Display',
                gun_type: 'Gun Type',
                gun_details: 'Gun Details',
                material: 'Material',
                rated_power: 'Rated Power',
                fast_charger: 'Fast Charger',
                communication: 'Communication',
                cooling: 'Cooling',
                ingress_protection: 'Ingress Protection',
                push_button: 'Push Button',
                cable_length: 'Cable Length',
                mountingtype: 'Mounting Type',
                ouput_voltage: 'Output Voltage',
                operatingtemps: 'Operating Temperature',
                safetyregulation: 'Safety Regulation',
                chargingoperation: 'Charging Operation',
                additional_details: 'Additional Details',
              }).map(([key, label]) => (
                <div className="form-group mb-4" key={key}>
                  <label>{label}</label>
                  <input
                    type={key === 'additional_details' ? 'textarea' : 'text'}
                    name={key}
                    value={updatedProductData?.details?.[key] || ''}
                    onChange={handleDetailsChange}
                    className="border p-2 w-full"
                  />
                </div>
              ))}
  
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                Update Product
              </button>
  
              <div className="relative w-full max-w-xl mx-auto aspect-[4/3] bg-gray-200 mb-6 mt-6">
                {product.image_paths?.length > 0 ? (
                  <>
                    <img
                      src={product.image_paths[imageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/500';
                      }}
                    />
                    <button
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                      onClick={handlePrevImage}
                    >
                      &#10094;
                    </button>
                    <button
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
                      onClick={handleNextImage}
                    >
                      &#10095;
                    </button>
                  </>
                ) : (
                  <img
                    src="https://via.placeholder.com/500"
                    alt="Placeholder"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default ProductEditPage;
