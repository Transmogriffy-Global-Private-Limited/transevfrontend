// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserSidebar from '../User/User_sidebar';
// import UserNavbar from '../User/User_Navbar';
// import background from "../../assets/ev_charger.jpg";
//  // adjust path as needed

// const Profile = () => {
//   const BASE_URL_AND_PORT = "https://api.static.ev.transev.site"; // Define the base URL and port
//   const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // API Key (for demonstration purposes)
//   const [user, setUser] = useState(null);
//   const [newImage, setNewImage] = useState(null); // Store the new uploaded image
//   const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
//   const [error, setError] = useState(''); // For displaying errors
//   const [successMessage, setSuccessMessage] = useState('');
//   const [imageFile, setImageFile] = useState(null); 
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [userAddresses, setUserAddresses] = useState([]);
 

//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [editingAddressData, setEditingAddressData] = useState(null);
//   const [editingAddressType, setEditingAddressType] = useState("");
//  // Handle edit button click
//  const handleEditButtonClick = (addressType, address) => {
//   setEditingAddressData(address);
//   setEditingAddressType(addressType);
//   setShowEditPopup(true);
// };

// // Handle input change in the edit popup
// const handleEditInputChange = (e) => {
//   const { name, value } = e.target;
//   setEditingAddressData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };


// // For displaying profile picture
//   const [formData, setFormData] = useState({
//     name: '',
//     about: '',
//     email: '',
//     phone_number: '',
//     role: '',
//     address: '',
//     email_verified: false, // To track email verification status
//   });
//   const [isUpdated, setIsUpdated] = useState(false); // To track if the data has been modified
//   const [isImageEditing, setIsImageEditing] = useState(false); // For controlling image editing modal visibility
//   const [showOtpPopup, setShowOtpPopup] = useState(false); // To show the OTP input popup
//   const [otp, setOtp] = useState(''); // Store OTP input by user
//   const [otpError, setOtpError] = useState(''); // For OTP validation errors
//   const navigate = useNavigate();

 
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('auth_token'); // Retrieve the token

//       if (!token) {
//         navigate('/login'); // Redirect if no token
//         return;
//       }

//       try {
//         const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'API-KEY': API_KEY, // Add the API key in headers
//           },
//         });

//         const data = await response.json();

  
//     if (response.ok) {
//               setUser(data.user_data);
//               fetchUserAddresses();
//               setFormData(data.user_data);
//               setSuccessMessage('');
//               setError('');
//               fetchProfilePicture(); // Fetch the profile picture after loading user data
//             } else {
//               setError(data.message || 'Failed to fetch user details');
//             }
//           } catch (error) {
//             console.error('Error fetching user details:', error);
//             setError('An error occurred while fetching user details.');
//           }
//         };
    
//         fetchUserData();
//       }, [navigate]);

   
//   // Fetch user addresses
//   const fetchUserAddresses = async () => {
//     const token = localStorage.getItem('auth_token');
  
//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/address`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'API-KEY': API_KEY,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       const data = await response.json();
//       if (response.ok && data?.length) {
//         setUserAddresses(data); // Store addresses
//       } else {
//         setUserAddresses([]); // No addresses available
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

  
//   const handleSetDefaultAddress = async (addressType, customTypeName = null) => {
//     const token = localStorage.getItem('auth_token');
  
//     let url;
//     if (addressType === 'Other' && customTypeName) {
//       url = `https://api.static.ev.transev.site/users/address/Other/set-default?custom_name=${customTypeName}`;
//     } else {
//       url = `https://api.static.ev.transev.site/users/address/${addressType}/set-default`;
//     }
  
//     try {
//       const response = await fetch(url, {
//         method: 'PATCH',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'API-KEY': API_KEY,
//         },
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         alert(`${addressType} address set as default.`);
//         fetchUserAddresses(); // Refresh list after change
//       } else {
//         alert('Failed to set default address: ' + (data.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Error setting default address:', error);
//       alert('An error occurred while setting default address.');
//     }
//   };
  
//   // Group addresses by type
//   const groupedAddresses = userAddresses.reduce((acc, address) => {
//     if (!acc[address.type]) {
//       acc[address.type] = [];
//     }
//     acc[address.type].push(address);
//     return acc;
//   }, {});

//   // Fetch profile picture from the server
//   const fetchProfilePicture = async () => {
//     const token = localStorage.getItem('auth_token');
//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/profile-picture`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//           'API-Key': API_KEY,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setProfilePicture(data.profile_picture); // Set the profile picture URL
//       } else {
//         console.error('Failed to fetch profile picture');
//       }
//     } catch (error) {
//       console.error('Error fetching profile picture:', error);
//     }
//   };

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
//   const handleUploadProfilePicture = async () => {
//     if (!imageFile) return; // If no image is selected, do nothing
    
//     const formData = new FormData();
//     formData.append("file", imageFile);
    
//     const token = localStorage.getItem("auth_token");

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/profile-picture/upload`, {
//         method: "POST",
//         headers: {
//           "API-Key": API_KEY,
//           "Authorization": `Bearer ${token}`, // Pass the auth token here
//         },
//         body: formData, // Sending the file as form data
//       });

  
//    if (response.ok) {
//       fetchProfilePicture(); // Refresh the profile picture after successful upload
//       setSuccessMessage("Profile picture uploaded successfully!");
//       setError(""); // Clear any previous error
//     } else {
//       const data = await response.json();
//       // Show backend error if provided
//       if (data?.detail) {
//         setError(data.detail);
//       } else {
//         setError("Failed to upload profile picture.");
//       }
//       setSuccessMessage(""); // Clear success message if an error occurs
//     }
//   } catch (error) {
//     console.error("Error uploading profile picture:", error);
//     setError("An error occurred while uploading the profile picture.");
//     setSuccessMessage(""); // Clear success message if error occurs
//   }
// };

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
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/update`, {
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
//       purpose: 'Mail Verification',
//     };

//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/otp/generate`, {
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

  
//   const handleVerifyOtp = async () => {
//     const token = localStorage.getItem('auth_token');
  
//     // Use email from formData and include the purpose
//     const payload = {
//       email: formData.email,          // dynamically fetched email
//       otp_code: otp,                  // assuming you have setOtp/otp input state
//       purpose: "Mail Verification",   // fixed hidden field
//     };
  
//     try {
//       const response = await fetch(`${BASE_URL_AND_PORT}/users/otp/verify/email`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'API-KEY': API_KEY,
//         },
//         body: JSON.stringify(payload),
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
  
 
//    const [sidebarOpen, setSidebarOpen] = useState(true);
     
//       const toggleSidebar = () => {
//           setSidebarOpen(!sidebarOpen);
//       };
     
//       const handleDeleteAddress = async (addressType, customTypeName = null) => {
//         const token = localStorage.getItem('auth_token');
//         let url;
      
//         if (addressType === 'Other' && customTypeName) {
//           url = `https://api.static.ev.transev.site/users/address/Other?custom_name=${customTypeName}`;
//         } else {
//           url = `https://api.static.ev.transev.site/users/address/${addressType}`;
//         }
      
//         try {
//           const response = await fetch(url, {
//             method: 'DELETE',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'API-KEY': API_KEY,
//             },
//           });
      
//           if (response.ok) {
//             alert(`${addressType} address deleted successfully.`);
      
//             // ✅ Update the local state instead of re-fetching all
//             setUserAddresses(prevAddresses =>
//               prevAddresses.filter(addr =>
//                 addressType === 'Other'
//                   ? addr.custom_type_name !== customTypeName
//                   : addr.type !== addressType
//               )
//             );
//           } else {
//             const data = await response.json();
//             console.error("Delete failed:", data.message || "Unknown error");
//             alert("Failed to delete address: " + (data.message || "Unknown error"));
//           }
//         } catch (error) {
//           console.error("Error deleting address:", error);
//           alert("An error occurred while deleting the address.");
//         }
//       };
      
      
//       // Handle submit (Save Changes) for edited address
//   const handleSubmitEditedAddress = async () => {
//     const token = localStorage.getItem("auth_token");
//     const updatedData = { ...editingAddressData };

//     try {
//       // Update logic for "Other" address type
//       if (editingAddressType === "Other") {
//         const response = await fetch(
//           `https://api.static.ev.transev.site/users/address/Other?custom_name=${updatedData.custom_type_name}`,
//           {
//             method: "PATCH",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//               'API-KEY': API_KEY,
//             },
//             body: JSON.stringify(updatedData),
//           }
//         );
//         const data = await response.json();
//         if (response.ok) {
//           alert("Other address updated successfully.");
//           fetchUserAddresses();
//           setShowEditPopup(false);
//         } else {
//           alert("Failed to update address: " + (data.message || "Unknown error"));
//         }
//       } else {
//         // Handle other address types
//         const response = await fetch(
//           `https://api.static.ev.transev.site/users/address/${editingAddressType}`,
//           {
//             method: "PATCH",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//               'API-KEY': API_KEY,
//             },
//             body: JSON.stringify(updatedData),
//           }
//         );
//         const data = await response.json();
//         if (response.ok) {
//           alert(`${editingAddressType} address updated successfully.`);
//           fetchUserAddresses();
//           setShowEditPopup(false);
//         } else {
//           alert("Failed to update address: " + (data.message || "Unknown error"));
//         }
//       }
//     } catch (error) {
//       console.error("Error updating address:", error);
//       alert("An error occurred while updating the address.");
//     }
//   };

//   // Handle cancel edit popup
//   const handleCancelEdit = () => {
//     setShowEditPopup(false);
//   };

      
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-100 to-gray-50 bg-cover bg-center bg-fixed">
  
//     {/* User Navbar */}
//     <UserNavbar onToggleSidebar={toggleSidebar} />
    
//     {/* Main Container */}
//     <div className="flex flex-col md:flex-row">
      
//       {/* Sidebar */}
//       <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
  
//       {/* Main Content Area */}
//       {/* <div className="flex-1 p-6 bg-gray-100 shadow-xl rounded-xl mx-4 my-6 md:mx-12 md:my-8"> */}
//       <div className="w-full p-4 sm:p-6 bg-gray-100 shadow-xl rounded-xl mx-2 my-4 sm:mx-6 sm:my-6 md:mx-12 md:my-8">
//         {/* Profile Heading */}
//         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-teal-700 py-4 px-8 rounded-full shadow-md text-center">
//           My Profile
//         </h2>




//         {/* Profile Card */}
//         {/* <div className="bg-teal rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6 ml-130"> */}
//         <div className="bg-teal rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl space-y-6 mx-auto my-6">
//           <div className="flex flex-col items-center relative">
//             {user && (
//               <div className="flex justify-center mb-4">
//                 <div
//                   className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 cursor-pointer"
//                   onClick={() => document.getElementById("image-upload").click()}
//                 >
//                   {newImage || profilePicture ? (
//                     <img
//                       src={newImage || profilePicture}
//                       alt="Profile"
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <div className="flex justify-center items-center w-full h-full text-gray-500">
//                       No Image
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     id="image-upload"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </div>
//               </div>
//             )}
//             {imageFile && (
//               <div className="flex justify-center mb-4">
//                 <button
//                   className="bg-teal-500 text-white p-2 rounded-lg"
//                   onClick={handleUploadProfilePicture}
//                 >
//                   Upload Image
//                 </button>
//               </div>
//             )}
//           </div>

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
//               <label className="w-full sm:w-32 font-semibold text-gray-700">Email:</label>
//               <div className="mt-2 sm:mt-0 flex items-center w-full">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//                 />
//                 {!formData.email_verified ? (
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
//             {/* <div className="flex flex-col sm:flex-row items-center">
//               <label className="w-full sm:w-32 font-semibold text-gray-700">Role:</label>
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
//               />
//             </div> */}
//           </div>
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
//   onClick={() => setIsEditing(true)}
//   className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mx-auto block"
// >
//   Edit
// </button>

//             )}
//           </div>
//           <div className="flex flex-col sm:flex-row items-center">
//           <label className="w-full sm:w-32 font-semibold text-gray-700">Address:</label>
//            <div className="mt-2 sm:mt-0 w-full flex items-center">
            
//             <button
//               onClick={() => navigate('/address')}
//               className="ml-3 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
//             >
//               Create Address
//             </button>
//           </div>
//         </div>
//           {/* Addresses Section */}
//           <div>
//             {Object.keys(groupedAddresses).map((addressType) => (
//               <div key={addressType}>
//                 <h3 className="font-semibold text-xl text-gray-800">{addressType} Addresses:</h3>
//                 {groupedAddresses[addressType].map((address) => {
//                   // const fullAddress = `${address.house_building}, ${address.locality_street}, ${address.city}, ${address.state}, ${address.country}, ${address.pin}`;
//                   const fullAddress = (
//                     <div>
//                       <p><strong>House Building:</strong> {address.house_building}</p>
//                       <p><strong>Locality/Street:</strong> {address.locality_street}</p>
//                       <p><strong>Land Mark:</strong> {address.landmark}</p>
//                       <p><strong>City:</strong> {address.city}</p>
//                       <p><strong>PO/PS:</strong> {address.po_ps}</p>
//                       <p><strong>State:</strong> {address.state}</p>
//                       <p><strong>Country:</strong> {address.country}</p>
//                       <p><strong>Pin:</strong> {address.pin}</p>
//                     </div>
//                   );
//                   return (
//                     <div
//                       key={address.id}
//                       className={`border p-4 rounded-lg mb-4 shadow-md ${address.is_default ? 'bg-gray-100' : ''}`}
//                     >
//                       <p className="text-gray-600">{fullAddress}</p>
//                       {address.is_default && <span className="text-green-600 font-semibold">Default</span>}
                     
//                       <button
//   onClick={() =>
//     handleSetDefaultAddress(addressType, addressType === 'Other' ? address.custom_type_name : null)
//   }
//   className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600 transition-colors ml-10"
// >
//   Set as Default
// </button>

//                       <button
//                   onClick={() => handleEditButtonClick(addressType, address)}
//                   className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600 transition-colors lg:ml-10"
//                 >
//                   Edit Address
//                 </button>

                   
// <button
//   onClick={() =>
//     handleDeleteAddress(addressType, addressType === 'Other' ? address.custom_type_name : null)
//   }
//   className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors ml-10"
// >
//   Delete Address
// </button>




//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>

//           {/* Error and Success Messages */}
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

//           {/* OTP Popup */}
//           {showOtpPopup && (
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

//          {/* Edit Address Modal */}
//       {showEditPopup && (
//         <div
//         className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-30"
//         style={{
//           backgroundImage: `url(${background})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
//             <h2 className="text-xl font-semibold mb-4">Edit {editingAddressType} Address</h2>

//             {editingAddressData && (
//               <>
              
//  {editingAddressType === "Other" && (
//             <div className="mb-3">
//               <label className="block text-sm font-medium text-gray-700">Custom Type Name:</label>
//               {/* Display Custom Type Name as text, not an editable field */}
//               <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
//                 {editingAddressData.custom_type_name || "No custom name"}
//               </p>
//             </div>
//           )}
//                 {/* Address Fields */}
//                 {[
//                   "house_building",
//                   "locality_street",
//                   "landmark",
//                   "city",
//                   "po_ps",
//                   "district",
//                   "state",
//                   "pin",
//                   "country"
//                 ].map((field) => (
//                   <div key={field} className="mb-3">
//                     <label className="block text-sm font-medium text-gray-700 capitalize">
//                       {field.replace('_', ' ')}:
//                     </label>
//                     <input
//                       type="text"
//                       name={field}
//                       value={editingAddressData[field] || ''}
//                       onChange={handleEditInputChange}
//                       className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 ))}

//                 {/* Buttons */}
//                 <div className="flex justify-end space-x-3 mt-4">
//                   <button
//                     onClick={handleCancelEdit}
//                     className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSubmitEditedAddress}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </>
//             )}
//     </div>
//   </div>
// )}

//         </div>
//       </div>
//     </div>
//     </div>
   
//   );
// };

// export default Profile;
    

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  PencilIcon, 
  CheckCircleIcon,
  XCircleIcon,
  PlusCircleIcon,
  TrashIcon,
  HomeIcon,
  CameraIcon,
  ShieldCheckIcon
} from '@heroicons/react/outline';
import { 
  FaMapMarkerAlt, 
  FaUserCircle, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaTrash, 
  FaPlus, 
  FaCheck, 
  FaSpinner,
  FaBuilding,
  FaCity,
  FaFlag,
  FaHome,
  FaBriefcase,
  FaUserEdit,
  FaAddressCard
} from 'react-icons/fa';
import UserSidebar from '../User/User_sidebar';
import UserNavbar from '../User/User_Navbar';
import background from "../../assets/ev_charger.jpg";

const Profile = () => {
  const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingAddressData, setEditingAddressData] = useState(null);
  const [editingAddressType, setEditingAddressType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
   const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    email: '',
    phone_number: '',
    role: '',
    address: '',
    email_verified: false,
  });
  
  const [isUpdated, setIsUpdated] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsPageLoading(true);
      const token = localStorage.getItem('auth_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user_data);
          await fetchUserAddresses();
          setFormData(data.user_data);
          setSuccessMessage('');
          setError('');
          await fetchProfilePicture();
        } else {
          setError(data.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('An error occurred while fetching user details.');
      } finally {
        setTimeout(() => setIsPageLoading(false), 500);
      }
    };
    fetchUserData();
  }, [navigate]);

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
        setUserAddresses(data);
      } else {
        setUserAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

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
        setProfilePicture(data.profile_picture);
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

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

  const handleUploadProfilePicture = async () => {
    if (!imageFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/profile-picture/upload`, {
        method: "POST",
        headers: {
          "API-Key": API_KEY,
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchProfilePicture();
        setNewImage(null);
        setImageFile(null);
        setSuccessMessage("Profile picture uploaded successfully!");
        setError("");
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setError(data?.detail || "Failed to upload profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setError("An error occurred while uploading the profile picture.");
    } finally {
      setIsUploading(false);
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
      phone_number: formData.phone_number,
    };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/update`, {
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
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating details:', error);
      setError('An error occurred while updating details.');
    }
  };

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
    const payload = {
      email: formData.email,
      otp_code: otp,
      purpose: "Mail Verification",
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
          email_verified: true,
        }));
        setShowOtpPopup(false);
        setSuccessMessage('Email verified successfully!');
        setError('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('An error occurred while verifying OTP.');
    }
  };

  const handleSetDefaultAddress = async (addressType, customTypeName = null) => {
    const token = localStorage.getItem('auth_token');
    let url;
    if (addressType === 'Other' && customTypeName) {
      url = `${BASE_URL_AND_PORT}/users/address/Other/set-default?custom_name=${customTypeName}`;
    } else {
      url = `${BASE_URL_AND_PORT}/users/address/${addressType}/set-default`;
    }

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });
      if (response.ok) {
        setSuccessMessage(`${addressType} address set as default.`);
        fetchUserAddresses();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setError('Failed to set default address: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error setting default address:', error);
      setError('An error occurred while setting default address.');
    }
  };

  const handleDeleteAddress = async (addressType, customTypeName = null) => {
    const token = localStorage.getItem('auth_token');
    let url;
    if (addressType === 'Other' && customTypeName) {
      url = `${BASE_URL_AND_PORT}/users/address/Other?custom_name=${customTypeName}`;
    } else {
      url = `${BASE_URL_AND_PORT}/users/address/${addressType}`;
    }

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': API_KEY,
        },
      });

      if (response.ok) {
        setSuccessMessage(`${addressType} address deleted successfully.`);
        setUserAddresses(prevAddresses =>
          prevAddresses.filter(addr =>
            addressType === 'Other'
              ? addr.custom_type_name !== customTypeName
              : addr.type !== addressType
          )
        );
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setError("Failed to delete address: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      setError("An error occurred while deleting the address.");
    }
  };

  const handleEditButtonClick = (addressType, address) => {
    setEditingAddressData(address);
    setEditingAddressType(addressType);
    setShowEditPopup(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEditedAddress = async () => {
    const token = localStorage.getItem("auth_token");
    const updatedData = { ...editingAddressData };

    try {
      let response;
      if (editingAddressType === "Other") {
        response = await fetch(
          `${BASE_URL_AND_PORT}/users/address/Other?custom_name=${updatedData.custom_type_name}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              'API-KEY': API_KEY,
            },
            body: JSON.stringify(updatedData),
          }
        );
      } else {
        response = await fetch(
          `${BASE_URL_AND_PORT}/users/address/${editingAddressType}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              'API-KEY': API_KEY,
            },
            body: JSON.stringify(updatedData),
          }
        );
      }

      if (response.ok) {
        setSuccessMessage(`${editingAddressType} address updated successfully.`);
        fetchUserAddresses();
        setShowEditPopup(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setError("Failed to update address: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating address:", error);
      setError("An error occurred while updating the address.");
    }
  };

  const groupedAddresses = userAddresses.reduce((acc, address) => {
    if (!acc[address.type]) {
      acc[address.type] = [];
    }
    acc[address.type].push(address);
    return acc;
  }, {});

  const getAddressIcon = (type) => {
    switch(type) {
      case 'Home': return <FaHome className="h-5 w-5 text-blue-600" />;
      case 'Office': return <FaBriefcase className="h-5 w-5 text-purple-600" />;
      default: return <FaMapMarkerAlt className="h-5 w-5 text-orange-600" />;
    }
  };

  const getAddressBgColor = (type) => {
    switch(type) {
      case 'Home': return "bg-blue-50 border-blue-200";
      case 'Office': return "bg-purple-50 border-purple-200";
      default: return "bg-orange-50 border-orange-200";
    }
  };

  // Loading Component
  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <UserNavbar onToggleSidebar={toggleSidebar} />
        <div className="flex">
          <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaUserCircle className="h-8 w-8 text-blue-300 animate-pulse" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-700">Loading Profile...</h3>
              <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
 <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <UserNavbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content - Dynamic margin based on sidebar state */}
        <main 
          className={`
            flex-1 transition-all duration-300 ease-in-out w-full
            ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}
            ${isMobile && sidebarOpen ? 'overflow-hidden' : ''}
          `}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {/* Header with Breadcrumb */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="text-blue-600">Home</span>
                <span>/</span>
                <span className="text-gray-700 font-medium">My Profile</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                My Profile
              </h1>
              <p className="text-gray-500 mt-2 ml-2">Manage your personal information, addresses and preferences</p>
            </div>

            {/* Main Profile Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-24 transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                    <div className="relative">
                      <div 
                        className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden cursor-pointer mx-auto shadow-lg transition-transform duration-300 hover:scale-105"
                        onClick={() => document.getElementById("image-upload").click()}
                      >
                        {newImage || profilePicture ? (
                          <img
                            src={newImage || profilePicture}
                            alt="Profile"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
                            <FaUserCircle className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => document.getElementById("image-upload").click()}
                        className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                      >
                        <CameraIcon className="h-4 w-4 text-white" />
                      </button>
                      <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    <h2 className="text-white text-xl font-bold mt-4">{formData.name || "User"}</h2>
                    <p className="text-blue-100 text-sm mt-1">{formData.role || "Customer"}</p>
                    <div className="mt-3 inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-white">Active</span>
                    </div>
                  </div>

                  {imageFile && (
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <button
                        onClick={handleUploadProfilePicture}
                        disabled={isUploading}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                      >
                        {isUploading ? <FaSpinner className="animate-spin" /> : <CameraIcon className="h-4 w-4" />}
                        {isUploading ? "Uploading..." : "Upload New Picture"}
                      </button>
                    </div>
                  )}

                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm break-all flex-1">{formData.email}</span>
                      {formData.email_verified ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <button onClick={handleVerifyEmail} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full hover:bg-yellow-200 transition">
                          Verify
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">{formData.phone_number || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition">
                      <FaAddressCard className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">Member since: {new Date().getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Tabs Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1 flex gap-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      activeTab === 'profile' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FaUserEdit className="h-4 w-4" />
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      activeTab === 'addresses' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FaMapMarkerAlt className="h-4 w-4" />
                    Addresses
                  </button>
                </div>

                {/* Personal Information Tab */}
                {activeTab === 'profile' && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex justify-between items-center flex-wrap gap-3">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <FaUserEdit className="text-blue-600" />
                          Personal Information
                        </h3>
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md"
                          >
                            <PencilIcon className="h-4 w-4" />
                            Edit Profile
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={handleUpdateDetails}
                              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl text-sm font-medium transition-all duration-300"
                            >
                              <FaSave className="h-3 w-3" />
                              Save Changes
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-sm font-medium transition-all duration-300"
                            >
                              <FaTimes className="h-3 w-3" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6 space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex justify-between items-center flex-wrap gap-3">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-600" />
                          Saved Addresses
                        </h3>
                        <button
                          onClick={() => navigate('/address')}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md"
                        >
                          <PlusCircleIcon className="h-4 w-4" />
                          Add New Address
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      {Object.keys(groupedAddresses).length > 0 ? (
                        <div className="space-y-4">
                          {Object.keys(groupedAddresses).map((addressType) => (
                            <div key={addressType} className={`${getAddressBgColor(addressType)} rounded-xl p-4 border transition-all duration-300 hover:shadow-md`}>
                              <div className="flex items-center gap-2 mb-3">
                                {getAddressIcon(addressType)}
                                <h4 className="font-bold text-gray-800">{addressType}</h4>
                              </div>
                              <div className="space-y-3">
                                {groupedAddresses[addressType].map((address) => (
                                  <div key={address.id} className={`p-4 rounded-xl transition-all duration-300 ${address.is_default ? 'bg-white shadow-md border-2 border-green-300' : 'bg-white shadow-sm border border-gray-200'}`}>
                                    {address.is_default && (
                                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full mb-2">
                                        <CheckCircleIcon className="h-3 w-3" />
                                        Default Address
                                      </span>
                                    )}
                                    <div className="space-y-1 text-sm text-gray-600">
                                      <p><span className="font-medium">Building:</span> {address.house_building}</p>
                                      <p><span className="font-medium">Street:</span> {address.locality_street}</p>
                                      {address.landmark && <p><span className="font-medium">Landmark:</span> {address.landmark}</p>}
                                      <p><span className="font-medium">City:</span> {address.city}</p>
                                      <p><span className="font-medium">State:</span> {address.state}</p>
                                      <p><span className="font-medium">PIN Code:</span> {address.pin}</p>
                                      <p><span className="font-medium">Country:</span> {address.country}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                      {!address.is_default && (
                                        <button
                                          onClick={() => handleSetDefaultAddress(addressType, addressType === 'Other' ? address.custom_type_name : null)}
                                          className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-all duration-300 font-medium"
                                        >
                                          <CheckCircleIcon className="inline mr-1 h-3 w-3" />
                                          Set as Default
                                        </button>
                                      )}
                                      <button
                                        onClick={() => handleEditButtonClick(addressType, address)}
                                        className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg hover:bg-yellow-200 transition-all duration-300 font-medium"
                                      >
                                        <FaEdit className="inline mr-1 h-3 w-3" />
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDeleteAddress(addressType, addressType === 'Other' ? address.custom_type_name : null)}
                                        className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-all duration-300 font-medium"
                                      >
                                        <TrashIcon className="inline mr-1 h-3 w-3" />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaMapMarkerAlt className="h-10 w-10 text-gray-300" />
                          </div>
                          <p className="text-gray-500 font-medium">No addresses saved yet</p>
                          <p className="text-sm text-gray-400 mt-1">Add your first address for faster checkout</p>
                          <button
                            onClick={() => navigate('/address')}
                            className="mt-4 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                          >
                            <PlusCircleIcon className="h-4 w-4" />
                            Add Address
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slideIn z-50">
                <div className="flex items-center gap-2">
                  <XCircleIcon className="h-5 w-5" />
                  {error}
                </div>
              </div>
            )}
            {successMessage && (
              <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slideIn z-50">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5" />
                  {successMessage}
                </div>
              </div>
            )}

            {/* OTP Popup */}
            {showOtpPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Email Verification</h3>
                    <p className="text-sm text-gray-500 mt-1">Enter the OTP sent to your email</p>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                    maxLength="6"
                  />
                  {otpError && <p className="text-red-500 text-sm text-center mt-2">{otpError}</p>}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleVerifyOtp}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-xl font-semibold transition-all duration-300"
                    >
                      Verify OTP
                    </button>
                    <button
                      onClick={() => setShowOtpPopup(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-xl font-semibold transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Address Modal */}
            {showEditPopup && editingAddressData && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                  <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">Edit {editingAddressType} Address</h3>
                      <button onClick={() => setShowEditPopup(false)} className="text-white/80 hover:text-white transition-all duration-300">
                        <FaTimes className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    {editingAddressType === "Other" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Type Name</label>
                        <p className="p-2 bg-gray-100 rounded-lg text-gray-600">{editingAddressData.custom_type_name || "No custom name"}</p>
                      </div>
                    )}
                    {[
                      { field: "house_building", label: "House/Building", placeholder: "House number, building name" },
                      { field: "locality_street", label: "Locality/Street", placeholder: "Street address" },
                      { field: "landmark", label: "Landmark", placeholder: "Nearby landmark" },
                      { field: "city", label: "City", placeholder: "City name" },
                      { field: "po_ps", label: "PO/PS", placeholder: "Post office / Police station" },
                      { field: "district", label: "District", placeholder: "District name" },
                      { field: "state", label: "State", placeholder: "State name" },
                      { field: "pin", label: "PIN Code", placeholder: "Postal code" },
                      { field: "country", label: "Country", placeholder: "Country name" }
                    ].map(({ field, label, placeholder }) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{label}</label>
                        <input
                          type="text"
                          name={field}
                          value={editingAddressData[field] || ''}
                          onChange={handleEditInputChange}
                          placeholder={placeholder}
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    ))}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSubmitEditedAddress}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-xl font-semibold transition-all duration-300"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setShowEditPopup(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-xl font-semibold transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;