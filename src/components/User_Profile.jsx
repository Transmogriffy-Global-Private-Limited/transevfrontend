import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

  // Retrieve the auth token from localStorage (or cookie, context, etc.)
  const AUTH_TOKEN = localStorage.getItem("auth_token"); // Adjust according to your storage method

  useEffect(() => {
    if (!AUTH_TOKEN) {
      // If there is no token, navigate to login page
      navigate("/login"); // Replace with your login route
    } else {
      fetchProfileData();
      fetchProfilePicture();
    }
  }, [AUTH_TOKEN, navigate]);

  // Function to fetch profile data
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY,
          "Authorization": `Bearer ${AUTH_TOKEN}`, // Use the auth token here
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch profile picture
  const fetchProfilePicture = async () => {
    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/profile-picture`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY,
          "Authorization": `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.profile_picture);
      } else {
        console.error("Failed to fetch profile picture");
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  // Function to handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Function to upload profile picture
  const handleUploadProfilePicture = async () => {
    if (!imageFile) return; // If no image is selected, do nothing

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/profile-picture/upload`, {
        method: "POST",
        headers: {
          "API-Key": API_KEY,
          "Authorization": `Bearer ${AUTH_TOKEN}`, // Pass the auth token here
        },
        body: formData, // Sending the file as form data
      });

      if (response.ok) {
        fetchProfilePicture(); // Refresh the profile picture after successful upload
      } else {
        console.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('http://{{BASE_URL_AND_PORT}}/path/to/your/image.jpg')` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-1/2 lg:w-1/4">
        <h2 className="text-3xl font-bold text-center mb-4 bg-teal-500 text-white rounded-t-lg">
          My Profile
        </h2>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {/* Profile Image Section */}
            <div className="flex justify-center mb-4">
              <div
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 cursor-pointer"
                onClick={() => document.getElementById("image-upload").click()}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-gray-500">No Image</div>
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

            {/* Profile Information */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold">{profileData?.name}</h3>
              <p className="text-gray-600">{profileData?.email}</p>
            </div>

            {/* Button to upload profile picture */}
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

            {/* Edit Button to redirect to profile update page */}
            <div className="flex justify-center mb-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-lg"
                onClick={() => navigate("/edit-profile")} // Replace with your edit profile path
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
