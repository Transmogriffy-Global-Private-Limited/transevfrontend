import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // API Key (for demonstration purposes)
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null); // Store the new uploaded image
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const [error, setError] = useState(''); // For displaying errors
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [profilePicture, setProfilePicture] = useState(null);// For displaying profile picture
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    email: '',
    phone_number: '',
    role: '',
    address: '',
    isEmailVerified: false, // To track email verification status
  });
  const [isUpdated, setIsUpdated] = useState(false); // To track if the data has been modified
  const [isImageEditing, setIsImageEditing] = useState(false); // For controlling image editing modal visibility
  const [showOtpPopup, setShowOtpPopup] = useState(false); // To show the OTP input popup
  const [otp, setOtp] = useState(''); // Store OTP input by user
  const [otpError, setOtpError] = useState(''); // For OTP validation errors
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('auth_token'); // Retrieve the token

      if (!token) {
        navigate('/login'); // Redirect if no token
        return;
      }

      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/admin/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY, // Add the API key in headers
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user_data);
          setFormData(data.user_data);
          setSuccessMessage('');
          setError('');
          fetchProfilePicture(); // Fetch the profile picture after loading user data
        } else {
          setError(data.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('An error occurred while fetching user details.');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fetch profile picture from the server
  

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
        setImageFile(file); // Store the selected image file for uploading
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to upload profile picture
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsUpdated(true);
  };

  // Update user details
  const handleUpdateDetails = async () => {
    const token = localStorage.getItem('auth_token');
    const dataToUpdate = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
    };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/update`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY, // Add the API key in headers
        },
        body: JSON.stringify(dataToUpdate),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.updatedUser); // Assuming the response contains the updated user data
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
  // Send OTP for email verification
  const handleVerifyEmail = async () => {
    const token = localStorage.getItem('auth_token');
    const requestData = {
      email: formData.email,
      otpType: 'EmailVerification',
    };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/auth/request-otp`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify(requestData),
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

  // Verify OTP for email confirmation
  const handleVerifyOtp = async () => {
    const token = localStorage.getItem('auth_token');

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/auth/verify-email-otp`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          isEmailVerified: true,
        }));
        setShowOtpPopup(false);
        setSuccessMessage('Email verified successfully!');
        setError('');
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('An error occurred while verifying OTP.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {/* Profile Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900 py-2 px-6 rounded-full shadow-lg">
          My Profile
        </h2>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
         
             
         
          {/* Profile Details */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-center">
              <label className="w-full sm:w-32 font-semibold text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center">
               <label className="w-full sm:w-32 font-semibold text-gray-700">Email:</label>
               <div className="mt-2 sm:mt-0 flex items-center w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
                {!formData.isEmailVerified ? (
                  <button
                    onClick={handleVerifyEmail}
                    className="ml-3 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors whitespace-nowrap"
                  >
                    Verify Email
                  </button>
                ) : (
                  <span className="ml-3 text-green-600 font-bold">Verified</span>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center">
              <label className="w-full sm:w-32 font-semibold text-gray-700">Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center">
              <label className="w-full sm:w-32 font-semibold text-gray-700">Role:</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Error and Success Messages */}
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
                  className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => setShowOtpPopup(false)}
                  className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-2 hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Update/Cancel */}
          <div className="flex justify-between">
            {isEditing ? (
              <div>
                <button
                  onClick={handleUpdateDetails}
                  className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

