import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting to the login page

// Import image
import signupImage from "../../assets/holiday.jpg"; // Ensure the correct path to your image.

const BASE_URL_AND_PORT = "http://192.168.0.103:3000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

const SignupPage = () => {
  // Define the state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success"); // Default alert type
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Hook to redirect after successful signup

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    const requestBody = {
      name,
      email,
      password,
      phone_number: phoneNumber || null,
    };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${API_KEY}`, // Use the API key
        },
        body: JSON.stringify(requestBody),
      });

      setLoading(false); // Set loading to false after receiving a response

      if (response.ok) {
        const data = await response.json();
        setAlertMessage("Signup successful! Welcome to our website.");
        setAlertType("success");
        
        // Redirect to the login page after a successful signup
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds to let user see the success message
      } else {
        setAlertMessage("Signup failed! Please check the details and try again.");
        setAlertType("error");
      }
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      setAlertMessage("An error occurred. Please try again later.");
      setAlertType("error");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side image with background */}
      <div
        className="relative w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${signupImage})` }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg relative z-10 mx-auto my-auto">
        <h2 className="text-3xl font-bold text-center mb-6 p-4 bg-teal-500 text-white rounded-t-lg">
          Create Your Account
        </h2>

        {/* Alert Message */}
        {alertMessage && (
          <div
            className={`text-center py-2 mb-4 ${
              alertType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg font-medium mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number (optional)"
            />
          </div>

          {/* Responsive Sign Up Button */}
          <button
            type="submit"
            className="w-full sm:w-40 p-3 bg-teal-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
          >
            {loading ? (
              <svg
                className="animate-spin w-6 h-6 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login link below the button */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
