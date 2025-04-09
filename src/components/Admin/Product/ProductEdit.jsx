import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from "../Admin_sidebar";
import backgroundImage from '../../../assets/workplace.jpg';

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const ProductEditPage = () => {
  const { id } = useParams();  // Get product ID from URL params
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch product data from the API
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
        setUpdatedProductData(response.data);  // Initialize the form with current product data
        setLoading(false);
      } catch (error) {
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    setFiles(e.target.files); // Handling file input
  };

  const handleRemovedImagesChange = (e) => {
    setRemovedImages(e.target.value.split(',')); // Assuming the input is comma-separated
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('auth_token');

    const formData = new FormData();
    formData.append('product_data', JSON.stringify(updatedProductData));  // Append the updated product data
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);  // Append each file
    }
    formData.append('removed_images', removedImages.join(',')); // Join removed images

    try {
      const response = await axios.put(
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
 //Helper function to convert base64 string to Blob
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
      return 'https://picsum.photos/150/150'; // Fallback image URL
    }
  };

  const parseImagePaths = (imagePathsString) => {
    try {
      const parsedJson = JSON.parse(imagePathsString.replace(/'/g, '"')); // Replace single quotes with double quotes to make it valid JSON
      return parsedJson;
    } catch (error) {
      console.error("Error parsing image paths:", error);
      return []; // Return an empty array if parsing fails
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="product-edit-page bg-white ml-80 w-200 mt-8">
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
                  value={updatedProductData.id}  // Automatically populated from API response
                  onChange={handleInputChange}  // Make the product_id editable
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedProductData.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  name="model"
                  value={updatedProductData.model}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedProductData.price}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedProductData.quantity}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* Details Section */}
              <h3 className="text-xl font-semibold mt-4">Product Details</h3>
              
              <div className="form-group">
                <label>Voltage</label>
                <input
                  type="text"
                  name="voltage"
                  value={updatedProductData.details.voltage}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Phase</label>
                <input
                  type="text"
                  name="phase"
                  value={updatedProductData.details.phase}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Current</label>
                <input
                  type="text"
                  name="current"
                  value={updatedProductData.details.current}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Frequency</label>
                <input
                  type="text"
                  name="frequency"
                  value={updatedProductData.details.frequency}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Protection</label>
                <input
                  type="text"
                  name="protection"
                  value={updatedProductData.details.protection}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Noise Level</label>
                <input
                  type="text"
                  name="noise_level"
                  value={updatedProductData.details.noise_level}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Rated Power</label>
                <input
                  type="text"
                  name="rated_power"
                  value={updatedProductData.details.rated_power}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Fast Charger</label>
                <input
                  type="text"
                  name="fast_charger"
                  value={updatedProductData.details.fast_charger}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Communication</label>
                <input
                  type="text"
                  name="communication"
                  value={updatedProductData.details.communication}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="form-group">
                <label>Cooling</label>
                <input
                  type="text"
                  name="cooling"
                  value={updatedProductData.details.cooling}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Weight in Kgs</label>
                <input
                  type="text"
                  name="weight_in_kgs"
                  value={updatedProductData.details.weight_in_kgs}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Ingress Protection</label>
                <input
                  type="text"
                  name="ingress_protection"
                  value={updatedProductData.details.ingress_protection}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* <div className="form-group">
                <label>Efficiency in Percentage</label>
                <input
                  type="text"
                  name="efficiency_in_percentage"
                  value={updatedProductData.details.effiiency_in_percentage}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div> */}
              <div className="form-group">
  <label>Efficiency in Percentage</label>
  <input
    type="text"
    name="efficiency_in_percentage"
    value={updatedProductData.details.efficiency_in_percentage}  
    onChange={handleDetailsChange}  
    className="border p-2 w-full"
  />
</div>


              <div className="form-group">
                <label>Max Operating Temperature</label>
                <input
                  type="text"
                  name="maximum_operating_temperature"
                  value={updatedProductData.details.maximum_operating_temperature}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Min Operating Temperature</label>
                <input
                  type="text"
                  name="minimum_operating_temperature"
                  value={updatedProductData.details.minimum_operating_temperature}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Length</label>
                <input
                  type="text"
                  name="length"
                  value={updatedProductData.details.length}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Height</label>
                <input
                  type="text"
                  name="height"
                  value={updatedProductData.details.height}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="form-group">
                <label>Breadth</label>
                <input
                  type="text"
                  name="breadth"
                  value={updatedProductData.details.breadth}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="form-group">
                <label>Additional Details</label>
                <textarea
                  name="additional_details"
                  value={updatedProductData.details.additional_details}
                  onChange={handleDetailsChange}
                  className="border p-2 w-full"
                />
              </div>
             
               {/* <div className="form-group">
                 <label>Removed Images</label>
                 <input
                  type="text"
                  value={removedImages.join(',')} // Display removed images as comma-separated list
                  onChange={handleRemovedImagesChange}
                  className="border p-2 w-full"
                  readOnly
                />
              </div>
              
              <div className="form-group">
                <label>Upload New Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
              </div> */}

              

              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                Update Product
              </button>
              {/* Display current images */}
               <div className="w-full h-96 bg-gray-200 mb-6">
              {product.image_paths && parseImagePaths(product.image_paths).length > 0 ? (
                  parseImagePaths(product.image_paths).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={convertBase64ToBlob(image.data)}
                        alt={image.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageClickToRemove(image.filename)}  // Remove image on click
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        Remove
                      </button>
                      {/* Display the filename */}
                      <div className="text-sm text-gray-600">{image.filename}</div>
                    </div>
                  ))
                ) : (
                  null
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