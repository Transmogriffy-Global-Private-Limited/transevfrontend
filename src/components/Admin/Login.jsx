import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import loginImage from "../../assets/new3.jpg";

const BASE_URL = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otpData, setOtpData] = useState({ otp_code: "" });
  const [error, setError] = useState(null);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const decodeAndStoreUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded?.user_id) {
        localStorage.setItem("user_id", decoded.user_id);
        console.log("Decoded user ID:", decoded.user_id);
      } else {
        console.warn("User ID not found in token.");
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otp_code") {
      setOtpData({ ...otpData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY,
        },
        body: JSON.stringify(formData),
      });

      const authorizationHeader = response.headers.get("Authorization");

      if (authorizationHeader?.startsWith("Bearer ")) {
        const token = authorizationHeader.substring(7);
        localStorage.setItem("auth_token", token);
        setAuthToken(token);
        decodeAndStoreUser(token);
      }

      if (response.status === 308) {
        setUserEmail(formData.email);
        setShowOtpForm(true);
      } else if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        const data = await response.json();
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${BASE_URL}/admin/2fa/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "API-Key": API_KEY,
        },
        body: JSON.stringify({
          email: userEmail,
          otp_code: otpData.otp_code,
        }),
      });

      const authorizationHeader = response.headers.get("Authorization");

      if (authorizationHeader?.startsWith("Bearer ")) {
        const newToken = authorizationHeader.substring(7);
        localStorage.setItem("auth_token", newToken);
        setAuthToken(newToken);
        decodeAndStoreUser(newToken);
      }

      if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        const data = await response.json();
        setError(data.message || "OTP verification failed.");
      }
    } catch (err) {
      console.error("OTP error:", err);
      setError("An error occurred during OTP verification.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <div className="bg-teal-600 text-white py-4 mb-6 rounded-t-lg">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          {showSuccessPopup && (
        
          <div className="bg-white p-2 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-600">Login Successful!</h2>
          
          </div>
       
      )}
        </div>

        {!showOtpForm ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                "Login"
              )}
            </button>
            <div className="text-center mt-4">
              <p>
                Don’t have an account?{" "}
                <Link to="/admin/signup" className="text-teal-600">
                  Sign Up
                </Link>
              </p>
              <p className="mt-2">
                <Link to="/admin/forgot-password" className="text-teal-600">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <h3 className="text-xl font-semibold mb-4 text-center">Enter OTP</h3>
            <div className="mb-4">
              <label className="block text-gray-700">OTP</label>
              <input
                type="text"
                name="otp_code"
                value={otpData.otp_code}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                className="w-full p-3 border border-gray-300 rounded"
                maxLength={6}
                required
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        )}
      </div>

    
     
    </div>
  );
};

export default LoginPage;
