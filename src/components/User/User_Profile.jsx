import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../User/User_sidebar';
import UserNavbar from '../User/User_Navbar';
import background from "../../assets/new3.jpg";
const Profile = () => {
  const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // API Key (for demonstration purposes)
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null); // Store the new uploaded image
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const [error, setError] = useState(''); // For displaying errors
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [profilePicture, setProfilePicture] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
// For displaying profile picture
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    email: '',
    phone_number: '',
    role: '',
    address: '',
    emailVerified: false, // To track email verification status
  });
  const [isUpdated, setIsUpdated] = useState(false); // To track if the data has been modified
  const [isImageEditing, setIsImageEditing] = useState(false); // For controlling image editing modal visibility
  const [showOtpPopup, setShowOtpPopup] = useState(false); // To show the OTP input popup
  const [otp, setOtp] = useState(''); // Store OTP input by user
  const [otpError, setOtpError] = useState(''); // For OTP validation errors
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('auth_token'); // Retrieve the token

      if (!token) {
        navigate('/login'); // Redirect if no token
        return;
      }

      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY, // Add the API key in headers
          },
        });

        const data = await response.json();

  
    if (response.ok) {
              setUser(data.user_data);
              fetchUserAddresses();
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

   
  // Fetch user addresses
  const fetchUserAddresses = async () => {
    const token = localStorage.getItem('auth_token');
  
    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/address`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (response.ok && data?.length) {
        setUserAddresses(data); // Store addresses
      } else {
        setUserAddresses([]); // No addresses available
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Set address as default based on type ('Home', 'Work', 'Other')
  const handleSetDefaultAddress = async (addressType) => {
    const token = localStorage.getItem('auth_token');
    const updatedAddress = { is_default: true };

    try {
        const response = await fetch(`${BASE_URL_AND_PORT}/users/address/${addressType}/set-default`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAddress),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`${addressType} Address set as default successfully!`);
            fetchUserAddresses(); // Re-fetch updated addresses
        } else {
            console.error("Failed to set default address:", data);
        }
    } catch (error) {
        console.error("Error setting default address:", error);
    }
  };

  // Group addresses by type
  const groupedAddresses = userAddresses.reduce((acc, address) => {
    if (!acc[address.type]) {
      acc[address.type] = [];
    }
    acc[address.type].push(address);
    return acc;
  }, {});

  // Fetch profile picture from the server
  const fetchProfilePicture = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/profile-picture`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'API-Key': API_KEY,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.profile_picture); // Set the profile picture URL
      } else {
        console.error('Failed to fetch profile picture');
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

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
  const handleUploadProfilePicture = async () => {
    if (!imageFile) return; // If no image is selected, do nothing
    
    const formData = new FormData();
    formData.append("file", imageFile);
    
    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/profile-picture/upload`, {
        method: "POST",
        headers: {
          "API-Key": API_KEY,
          "Authorization": `Bearer ${token}`, // Pass the auth token here
        },
        body: formData, // Sending the file as form data
      });

      if (response.ok) {
        fetchProfilePicture(); // Refresh the profile picture after successful upload
        setSuccessMessage("Profile picture uploaded successfully!"); // Display success message
        setError(""); // Clear any previous errors
      } else {
        setError("Failed to upload profile picture");
        setSuccessMessage(""); // Clear success message if error occurs
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setError("An error occurred while uploading the profile picture.");
      setSuccessMessage(""); // Clear success message if error occurs
    }
  };

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
      const response = await fetch(`${BASE_URL_AND_PORT}/users/update`, {
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
      purpose: 'Mail Verification',
    };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/otp/generate`, {
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
      const response = await fetch(`${BASE_URL_AND_PORT}/users/otp/verify/email`, {
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
  
 
   const [sidebarOpen, setSidebarOpen] = useState(true);
     
      const toggleSidebar = () => {
          setSidebarOpen(!sidebarOpen);
      };
      const handleDeleteAddress = async (addressType) => {
        const token = localStorage.getItem('auth_token');
      
        try {
          const response = await fetch(`${BASE_URL_AND_PORT}/users/address/${addressType}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'API-KEY': API_KEY,
            },
          });
      
          if (response.ok) {
            alert(`${addressType} address deleted successfully.`);
            fetchUserAddresses(); // Refresh address list
          } else {
            const data = await response.json();
            console.error("Delete failed:", data.message || "Unknown error");
            alert("Failed to delete address: " + (data.message || "Unknown error"));
          }
        } catch (error) {
          console.error("Error deleting address:", error);
          alert("Error occurred while deleting the address.");
        }
      };
      
  return (
    <div
           className=" min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
           style={{ background: `url(${background})` }}
         >
      {/* User Navbar */}
      <UserNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    {/* <div className="min-h-screen bg-gray-50 flex flex-col"> */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
      
    <div className=" p-4 shadow-lg rounded-md max-w-full">
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-teal-500 py-2 px-6 rounded-full shadow-lg text-center">
    My Profile
  </h2>
</div>


        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
          <div className="flex flex-col items-center relative">
            {user && (
              <div className="flex justify-center mb-4">
                <div
                  className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 cursor-pointer"
                  onClick={() => document.getElementById("image-upload").click()}
                >
                  {newImage || profilePicture ? (
                    <img
                      src={newImage || profilePicture}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full text-gray-500">
                      No Image
                    </div>
                  )}
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            )}
            {imageFile && (
              <div className="flex justify-center mb-4">
                <button
                  className="bg-teal-500 text-white p-2 rounded-lg"
                  onClick={handleUploadProfilePicture}
                >
                  Upload Image
                </button>
              </div>
            )}
          </div>

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
                {!formData.email_verified ? (
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
  className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mx-auto block"
>
  Edit
</button>

            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center">
          <label className="w-full sm:w-32 font-semibold text-gray-700">Address:</label>
           <div className="mt-2 sm:mt-0 w-full flex items-center">
            
            <button
              onClick={() => navigate('/address')}
              className="ml-3 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Create Address
            </button>
          </div>
        </div>
          {/* Addresses Section */}
          <div>
            {Object.keys(groupedAddresses).map((addressType) => (
              <div key={addressType}>
                <h3 className="font-semibold text-xl text-gray-800">{addressType} Addresses:</h3>
                {groupedAddresses[addressType].map((address) => {
                  // const fullAddress = `${address.house_building}, ${address.locality_street}, ${address.city}, ${address.state}, ${address.country}, ${address.pin}`;
                  const fullAddress = (
                    <div>
                      <p><strong>House Building:</strong> {address.house_building}</p>
                      <p><strong>Locality/Street:</strong> {address.locality_street}</p>
                      <p><strong>Land Mark:</strong> {address.landmark}</p>
                      <p><strong>City:</strong> {address.city}</p>
                      <p><strong>PO/PS:</strong> {address.po_ps}</p>
                      <p><strong>State:</strong> {address.state}</p>
                      <p><strong>Country:</strong> {address.country}</p>
                      <p><strong>Pin:</strong> {address.pin}</p>
                    </div>
                  );
                  return (
                    <div
                      key={address.id}
                      className={`border p-4 rounded-lg mb-4 shadow-md ${address.is_default ? 'bg-gray-100' : ''}`}
                    >
                      <p className="text-gray-600">{fullAddress}</p>
                      {address.is_default && <span className="text-green-600 font-semibold">Default</span>}
                      <button
                        onClick={() => handleSetDefaultAddress(addressType)} // Pass the address type to set it as default
                        className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600 transition-colors ml-10"
                      >
                        Set {addressType} as Default
                      </button>
                      <button
  onClick={() => handleDeleteAddress(addressType)}
  className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors ml-20"
>
  Delete {addressType} Address
</button>

                    </div>
                  );
                })}
              </div>
            ))}
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
        
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Profile;
    

