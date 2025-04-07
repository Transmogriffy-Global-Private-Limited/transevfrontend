
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect after successful reset

// Import image for the background
import ForgetPassword from "../../assets/hero.jpg"; // Ensure the correct path to your image

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Define the API key

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(""); // State for the email input
  const [otpCode, setOtpCode] = useState(""); // State for the OTP input
  const [newPassword, setNewPassword] = useState(""); // State for the new password input
  const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
  const [alertType, setAlertType] = useState("success"); // Default alert type
  const [loading, setLoading] = useState(false); // State to track loading
  const [step, setStep] = useState(1); // Step 1 - Email submission, Step 2 - OTP and password
  const navigate = useNavigate(); // Hook to navigate after successful reset

  // Handle the first step (request OTP)
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    const requestBody = { email };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/password-reset/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${API_KEY}`, // Use the API key
        },
        body: JSON.stringify(requestBody),
      });

      setLoading(false); // Set loading to false after receiving a response

      if (response.ok) {
        setAlertMessage("OTP sent to your email!");
        setAlertType("success");
        setStep(2); // Move to the OTP confirmation step
      } else {
        setAlertMessage("Failed to send OTP. Please check your email.");
        setAlertType("error");
      }
    } catch (error) {
      setLoading(false);
      setAlertMessage("An error occurred. Please try again later.");
      setAlertType("error");
    }
  };

  // Handle the second step (confirm OTP and reset password)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    const requestBody = {
      email,
      new_password: newPassword,
      otp_code: otpCode,
    };

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/admin/password-reset/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${API_KEY}`, // Use the API key
        },
        body: JSON.stringify(requestBody),
      });

      setLoading(false); // Set loading to false after receiving a response

      if (response.ok) {
        setAlertMessage("Password reset successful!");
        setAlertType("success");

        // Redirect to login after password reset
        setTimeout(() => {
          navigate("/admin/login");
        }, 2000); // Redirect after 2 seconds to let user see the success message
      } else {
        setAlertMessage("Invalid OTP or failed to reset password.");
        setAlertType("error");
      }
    } catch (error) {
      setLoading(false);
      setAlertMessage("An error occurred. Please try again later.");
      setAlertType("error");
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${ForgetPassword})` }}
    >
    

      {/* Responsive form container */}
      <div className="w-full max-w-sm sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white p-6 rounded-lg shadow-lg mx-auto my-auto z-10 mt-20 sm:mt-32">
        <h2 className="text-3xl font-bold text-center mb-4 p-4 bg-teal-500 text-white rounded-t-lg">
          Forgot Password
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

        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Enter your email:
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
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-lg font-medium mb-2">
                Enter OTP:
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="new_password" className="block text-lg font-medium mb-2">
                New Password:
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                required
              />
            </div>

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
                "Reset Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
