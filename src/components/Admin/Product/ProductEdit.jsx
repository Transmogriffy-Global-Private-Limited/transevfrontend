
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin_navbar';
import AdminSidebar from "../Admin_sidebar";

const BASE_URL_AND_PORT = 'https://api.static.ev.transev.site';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedProductData, setUpdatedProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      const authToken = localStorage.getItem('auth_token');
      try {
        const res = await axios.get(
          `${BASE_URL_AND_PORT}/products/get_by_id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'API-KEY': API_KEY,
            },
          }
        );

        setUpdatedProductData({
          ...res.data,
          mrp: res.data.mrp ?? 0, // ✅ ensure mrp even if 0
          details: {
            ...res.data.details,
            ocpp_present: res.data.details?.ocpp_present || 'No',
          },
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  };

  /* ================= UPDATE PRODUCT ================= */
  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('auth_token');

    const payload = {
      ...updatedProductData,
      details: {
        ...updatedProductData.details,
        ocpp_present: updatedProductData.details.ocpp_present || 'No',
      },
    };

    const formData = new FormData();
    formData.append('product_data', JSON.stringify(payload));

    try {
      await axios.put(
        `${BASE_URL_AND_PORT}/products/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'API-KEY': API_KEY,
          },
        }
      );

      navigate('/manage/products');
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  if (loading || !updatedProductData) return <div>Loading...</div>;

  /* ================= JSX ================= */
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="container mx-auto p-6 bg-white mt-6 rounded shadow">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Back
          </button>

          <form onSubmit={handleProductUpdate}>
            {/* ================= BASIC INFO ================= */}
            {['name', 'model', 'mrp', 'price', 'quantity', 'product_color'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block font-medium">
                  {field.replace('_', ' ').toUpperCase()}
                </label>
                <input
                  type={
                    field === 'price' || field === 'mrp' || field === 'quantity'
                      ? 'number'
                      : 'text'
                  }
                  name={field}
                  value={
                    updatedProductData[field] !== undefined &&
                    updatedProductData[field] !== null
                      ? updatedProductData[field]
                      : ''
                  }
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
            ))}

            {/* ================= DETAILS ================= */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Product Details</h3>

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
              ocpp_present: 'OCPP Present',
            }).map(([key, label]) => (
              <div className="mb-4" key={key}>
                <label className="block font-medium">{label}</label>

                {key === 'ocpp_present' ? (
                  <select
                    name={key}
                    value={updatedProductData.details[key]}
                    onChange={handleDetailsChange}
                    className="border p-2 w-full"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={updatedProductData.details[key] || ''}
                    onChange={handleDetailsChange}
                    className="border p-2 w-full"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded mt-4"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
