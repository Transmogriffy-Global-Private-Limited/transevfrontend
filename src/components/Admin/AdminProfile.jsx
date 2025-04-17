// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
//   const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // API Key (for demonstration purposes)
//   const [user, setUser] = useState(null);
//   const [newImage, setNewImage] = useState(null); // Store the new uploaded image
//   const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
//   const [error, setError] = useState(''); // For displaying errors
//   const [successMessage, setSuccessMessage] = useState('');
//   const [imageFile, setImageFile] = useState(null); 
//   const [profilePicture, setProfilePicture] = useState(null);// For displaying profile picture
//   const [formData, setFormData] = useState({
//     name: '',
//     about: '',
//     email: '',
//     phone_number: '',
//     role: '',
//     address: '',
//     isEmailVerified: false, // To track email verification status
//   });
//   const [isUpdated, setIsUpdated] = useState(false); // To track if the data has been modified
//   const [isImageEditing, setIsImageEditing] = useState(false); // For controlling image editing modal visibility
//   const [showOtpPopup, setShowOtpPopup] = useState(false); // To show the OTP input popup
//   const [otp, setOtp] = useState(''); // Store OTP input by user
//   const [otpError, setOtpError] = useState(''); // For OTP validation errors
//   const navigate = useNavigate();

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('auth_token'); // Retrieve the token

//       if (!token) {
//         navigate('/login'); // Redirect if no token
//         return;
//       }

//       try {
//         const response = await fetch(`${BASE_URL_AND_PORT}/admin/profile`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'API-KEY': API_KEY, // Add the API key in headers
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUser(data.user_data);
//           setFormData(data.user_data);
//           setSuccessMessage('');
//           setError('');
//          // Fetch the profile picture after loading user data
//         } else {
//           setError(data.message || 'Failed to fetch user details');
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         setError('An error occurred while fetching user details.');
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   // Fetch profile picture from the server
  

//   // Handle image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewImage(reader.result);
//         setImageFile(file); // Store the selected image file for uploading
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Function to upload profile picture
  
//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setIsUpdated(true);
//   };

//   // Update user details
//   const handleUpdateDetails = async () => {
//     const token = localStorage.getItem('auth_token');
//     const dataToUpdate = {
//       name: formData.name,
//       email: formData.email,
//       phone_number: formData.phone_number,
//     };

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/admin/update`, {
//         method: 'PATCH',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'API-KEY': API_KEY, // Add the API key in headers
//         },
//         body: JSON.stringify(dataToUpdate),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUser(data.updatedUser); // Assuming the response contains the updated user data
//         setIsEditing(false);
//         setIsUpdated(false);
//         setSuccessMessage('User details updated successfully!');
//         setError('');
//       } else {
//         setError(data.message || 'Failed to update user details');
//         setSuccessMessage('');
//       }
//     } catch (error) {
//       console.error('Error updating details:', error);
//       setError('An error occurred while updating details.');
//       setSuccessMessage('');
//     }
//   };
//   // Send OTP for email verification
//   const handleVerifyEmail = async () => {
//     const token = localStorage.getItem('auth_token');
//     const requestData = {
//       email: formData.email,
//       otpType: 'EmailVerification',
//     };

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/auth/request-otp`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'API-KEY': API_KEY,
//         },
//         body: JSON.stringify(requestData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setShowOtpPopup(true);
//         setOtpError('');
//       } else {
//         setOtpError(data.message || 'Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       setOtpError('An error occurred while sending OTP.');
//     }
//   };

//   // Verify OTP for email confirmation
//   const handleVerifyOtp = async () => {
//     const token = localStorage.getItem('auth_token');

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/auth/verify-email-otp`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'API-KEY': API_KEY,
//         },
//         body: JSON.stringify({ otp }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setFormData((prevData) => ({
//           ...prevData,
//           isEmailVerified: true,
//         }));
//         setShowOtpPopup(false);
//         setSuccessMessage('Email verified successfully!');
//         setError('');
//       } else {
//         setOtpError(data.message || 'Invalid OTP');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setOtpError('An error occurred while verifying OTP.');
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <div className="flex flex-col items-center justify-center flex-1 p-6">
//         {/* Profile Header */}
//         <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900 py-2 px-6 rounded-full shadow-lg">
//           My Profile
//         </h2>

//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
         
             
         
//           {/* Profile Details */}
//           <div className="space-y-5">
//             <div className="flex flex-col sm:flex-row items-center">
//               <label className="w-full sm:w-32 font-semibold text-gray-700">Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div className="flex flex-col sm:flex-row items-center">
//                <label className="w-full sm:w-32 font-semibold text-gray-700">Email:</label>
//                <div className="mt-2 sm:mt-0 flex items-center w-full">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//                 />
//                 {!formData.isEmailVerified ? (
//                   <button
//                     onClick={handleVerifyEmail}
//                     className="ml-3 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors whitespace-nowrap"
//                   >
//                     Verify Email
//                   </button>
//                 ) : (
//                   <span className="ml-3 text-green-600 font-bold">Verified</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row items-center">
//               <label className="w-full sm:w-32 font-semibold text-gray-700">Phone Number:</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//               />
//             </div>
//             <div className="flex flex-col sm:flex-row items-center">
//               <label className="w-full sm:w-32 font-semibold text-gray-700">Role:</label>
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* Error and Success Messages */}
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
//   {/* OTP Popup */}
//             {showOtpPopup && (
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
//               <div className="bg-white rounded-lg p-6 max-w-xs w-full">
//                 <h3 className="text-xl font-semibold text-center">Enter OTP</h3>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="mt-4 p-3 border border-gray-300 rounded-lg w-full"
//                   maxLength="6"
//                 />
//                 {otpError && <p className="text-red-500 text-center">{otpError}</p>}
//                 <button
//                   onClick={handleVerifyOtp}
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
//                 >
//                   Verify OTP
//                 </button>
//                 <button
//                   onClick={() => setShowOtpPopup(false)}
//                   className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-2 hover:bg-gray-400 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Update/Cancel */}
//           <div className="flex justify-between">
//             {isEditing ? (
//               <div>
//                 <button
//                   onClick={handleUpdateDetails}
//                   className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-green-600 transition-colors"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="w-full sm:w-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${BASE_URL_AND_PORT}/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user_data);
          setFormData(data.user_data);
          setError('');
          setSuccessMessage('');
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsUpdated(true);
  };

  const handleUpdateDetails = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/update`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.updatedUser);
        setFormData(data.updatedUser);
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        setIsUpdated(false);
        setError('');
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating details.');
    }
  };

  const handleVerifyEmail = async () => {
    const token = localStorage.getItem('auth_token');

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/auth/request-otp`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({
          email: formData.email,
          otpType: 'EmailVerification',
        }),
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
        setFormData((prev) => ({
          ...prev,
          isEmailVerified: true,
        }));
        setShowOtpPopup(false);
        setSuccessMessage('Email verified successfully!');
        setOtpError('');
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      setOtpError('An error occurred while verifying OTP.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load profile data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h2>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <div className="flex items-center space-x-2">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-2 border rounded"
            />
            {!formData.isEmailVerified ? (
              <button
                onClick={handleVerifyEmail}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                Verify
              </button>
            ) : (
              <span className="text-green-600 font-medium">Verified</span>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700">Phone Number</label>
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium text-gray-700">Role</label>
          <input
            name="role"
            value={formData.role}
            disabled
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Buttons */}
        {isEditing ? (
          <div className="flex space-x-4">
            <button
              onClick={handleUpdateDetails}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}

        {/* Messages */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
      </div>

      {/* OTP Modal */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
            <h3 className="text-xl font-semibold text-center">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded"
              maxLength="6"
            />
            {otpError && <p className="text-red-500 text-sm text-center">{otpError}</p>}
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Verify OTP
            </button>
            <button
              onClick={() => setShowOtpPopup(false)}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
