import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    email: '',
    phone_number: '',
    role: '',
    address: '',
    isEmailVerified: false,
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('auth_token');

      if (!token) {
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
        console.log("✅ Profile response:", data);

        if (response.ok) {
          const userData = data.user_data || data; // fallback
          setUser(userData);
          setFormData({
            ...formData,
            ...userData,
          });
          setSuccessMessage('');
          setError('');
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
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

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
    const dataToUpdate = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
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

 // Send OTP for email verification
 const handleVerifyEmail = async () => {
  const token = localStorage.getItem('auth_token');
  const requestData = {
    email: formData.email,
    purpose: 'Mail Verification',
  };

  try {
    const response = await fetch(`${BASE_URL_AND_PORT}/admin/otp/generate`, {
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


const handleVerifyOtp = async () => {
  const token = localStorage.getItem('auth_token');

  // Use email from formData and include the purpose
  const payload = {
    email: formData.email,          // dynamically fetched email
    otp_code: otp,                  // assuming you have setOtp/otp input state
    purpose: "Mail Verification",   // fixed hidden field
  };

  try {
    const response = await fetch(`${BASE_URL_AND_PORT}/admin/otp/verify/email`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'API-KEY': API_KEY,
      },
      body: JSON.stringify(payload),
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


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  if (!formData || typeof formData !== 'object' || !('name' in formData)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load profile data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900 py-2 px-6 rounded-full shadow-lg mb-3">
          My Profile
        </h2>

        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
          <div className="space-y-5">
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
                {!formData.isEmailVerified ? (
                  <button
                    onClick={handleVerifyEmail}
                    className="ml-3 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                  >
                    Verify Email
                  </button>
                ) : (
                  <span className="ml-3 text-green-600 font-bold">Verified</span>
                )}
              </div>
            </div>
            {/* <div className="flex flex-col sm:flex-row items-center">
              <label className="w-full sm:w-32 font-semibold text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full disabled:bg-gray-100"
              />
              
            </div> */}
            <div className="flex flex-col sm:flex-row items-center">
  <label className="w-full sm:w-32 font-semibold text-gray-700">Password:</label>
  <input
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    disabled={!isEditing}
    className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full disabled:bg-gray-100"
    placeholder="Leave blank to keep current"
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
                className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full disabled:bg-gray-100"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

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

          <div className="flex justify-between">
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
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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
