import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect after login
import { Link } from "react-router-dom"; // Import Link for navigation

// Import image for the background
import loginImage from "../assets/new3.jpg"; // Ensure the correct path to your image

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

const LoginPage = () => {
  // Define the state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success"); // Default alert type
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Hook to redirect to dashboard after successful login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/users/login`, {
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
        const authorizationHeader = response.headers.get("Authorization");

        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
            const token = authorizationHeader.substring(7); // Extract everything after "Bearer "
            localStorage.setItem("auth_token", token); // Store the token in localStorage
        } else {
            console.error("Authorization header is missing or improperly formatted");
        }
        setAlertMessage("Login successful!");
        setAlertType("success");



        // Redirect to the dashboard page after login
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // Redirect after 2 seconds to let user see the success message
      } else {
        setAlertMessage("Login failed! Please check your credentials.");
        setAlertType("error");
      }
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      setAlertMessage("An error occurred. Please try again later.");
      setAlertType("error");
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      {/* Overlay for better text visibility */}
  
      {/* Right side form */}
      <div className="w-full sm:w-96 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-white p-6 rounded-lg shadow-lg mx-auto my-auto z-10 ml-60">
        <h2 className="text-3xl font-bold text-center mb-4 p-4 bg-teal-500 text-white rounded-t-lg">
          Login
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

          {/* Responsive Login Button */}
          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              "Login"
            )}
          </button>
        </form>

        {/* Signup link below the button */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          {/* Forgot Password link */}
          <p className="text-sm mt-2">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
