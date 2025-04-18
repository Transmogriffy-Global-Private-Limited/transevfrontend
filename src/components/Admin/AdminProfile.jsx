import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './Admin_sidebar';
import AdminNavbar from './Admin_navbar';

const Profile = () => {
  const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    email: '',
    phone_number: '',
    role: '',
    address: '',
    email_verified: false,
    password: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('user_id');

      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/admin/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
          },
        });

        const data = await response.json();
        if (response.ok) {
          const userData = data.user_data || data;
          setUser(userData);
          setFormData({ ...formData, ...userData });
        } else {
          setError(data.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('An error occurred while fetching user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsUpdated(true);
  };

  const handleUpdateDetails = async () => {
    const token = localStorage.getItem('auth_token');
  
    // Ensure password is included, even if unchanged, it will be an empty string
    const dataToUpdate = {
      name: formData.name,
      email: formData.email,
      password: formData.password || '', // Only send an empty string if no password change
    };
  
    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/update`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify(dataToUpdate),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUser(data.updatedUser);
        setIsEditing(false);
        setIsUpdated(false);
        setSuccessMessage('User details updated successfully!');
        setError('');
      } else {
        setError(data.message || 'Failed to update user details');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating details:', error);
      setError('An error occurred while updating details.');
      setSuccessMessage('');
    }
  };
  

  const handleVerifyEmail = async () => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id');

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/otp/generate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({ id: userId, purpose: 'Mail Verification' }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpPopup(true);
        setOtpError('');
      } else {
        setOtpError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError('An error occurred while sending OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    const token = localStorage.getItem('auth_token');

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/otp/verify/email`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({
          email: formData.email,
          otp_code: otp,
          purpose: 'Mail Verification',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          email_verified: true,
        }));
        setShowOtpPopup(false);
        setSuccessMessage('Email verified successfully!');
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('An error occurred while verifying OTP.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-green-50 to-blue-50 text-gray-800">
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-grow p-6">
          {/* <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6"> */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-white to-blue-300 rounded-2xl shadow-xl p-8 space-y- mt-30">
 

            <h2 className="text-3xl font-bold text-center text-green-700">Admin Profile</h2>

            <div className="space-y-5">
              {/* Name */}
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full disabled:bg-gray-100"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">Email:</label>
                <div className="mt-2 sm:mt-0 flex items-center w-full">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="p-3 border border-gray-300 rounded-lg w-full disabled:bg-gray-100"
                  />
                  {!formData.email_verified ? (
                    <button
                      onClick={handleVerifyEmail}
                      className="ml-3 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Verify
                    </button>
                  ) : (
                    <span className="ml-3 text-green-600 font-bold">Verified</span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full disabled:bg-gray-100"
                  placeholder="Leave blank to keep current"
                />
              </div>

              {/* Role */}
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">Role:</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!isEditing}
                
                  className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full disabled:bg-gray-100"/>
              </div>

              {/* Error or Success Message */}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

              {/* OTP Popup */}
              {showOtpPopup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
                  <div className="bg-white rounded-lg p-6 max-w-xs w-full">
                    <h3 className="text-xl font-semibold text-center">Enter OTP</h3>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mt-4 p-3 border border-gray-300 rounded-lg w-full"
                      maxLength="6"
                    />
                    {otpError && <p className="text-red-500 text-center">{otpError}</p>}
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
                    >
                      Verify OTP
                    </button>
                    <button
                      onClick={() => setShowOtpPopup(false)}
                      className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-2 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Edit/Save and Cancel Buttons */}
              <div className="flex justify-between mt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdateDetails}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ml-90"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
