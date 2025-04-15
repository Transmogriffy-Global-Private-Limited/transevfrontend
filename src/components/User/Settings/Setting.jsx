import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../User/User_sidebar";
import UserNavbar from "../../User/User_Navbar";
import background from "../../../assets/new3.jpg";

const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const api = axios.create({
  baseURL: BASE_URL_AND_PORT,
  headers: {
    "api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAPassword, setTwoFAPassword] = useState("");

  const [showResetEmailModal, setShowResetEmailModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetch2FAStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await api.get("/users/2fa/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const message = res.data.status.message;
      setIs2FAEnabled(message.includes("enabled"));
    } catch (err) {
      alert("Failed to load 2FA status");
    }
  };

  const submit2FAToggle = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await api.patch(
        "/users/2fa/toggle",
        { entered_password: twoFAPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      setIs2FAEnabled((prev) => !prev);
      setShow2FAModal(false);
      setTwoFAPassword("");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to toggle 2FA");
    }
  };

  const sendOTP = async () => {
    try {
      await api.post(
        "/users/password-reset/request",
        { email: resetEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      alert("OTP sent to your email.");
      setShowResetEmailModal(false);
      setShowResetConfirmModal(true);
    } catch (err) {
      alert("Failed to send OTP.");
    }
  };

  const confirmReset = async () => {
    try {
      await api.post(
        "/users/password-reset/confirm",
        {
          email: resetEmail,
          new_password: newPassword,
          otp_code: otpCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      alert("Password reset successful.");
      setShowResetConfirmModal(false);
      setNewPassword("");
      setOtpCode("");
    } catch (err) {
      alert("Password reset failed.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await api.delete("/users/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      alert("Account deleted.");
      localStorage.removeItem("auth_token");
      window.location.href = "/";
    } catch (err) {
      alert("Failed to delete account.");
    }
  };

  useEffect(() => {
    fetch2FAStatus();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${background})` }}
    >
      <UserNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-green-600 via-green-500 to-orange-500 shadow-lg rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            {/* 2FA Toggle */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Two-Factor Authentication</span>
                <div
                  onClick={() => setShow2FAModal(true)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 cursor-pointer flex items-center px-1 ${
                    is2FAEnabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`h-4 w-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                      is2FAEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                2FA is {is2FAEnabled ? "enabled ✅" : "disabled ❌"}
              </p>
            </div>

            {/* Password Reset */}
            <div className="mb-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setShowResetEmailModal(true)}
              >
                Reset Password
              </button>
            </div>

            {/* Delete Account */}
            <div className="mt-8">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleDeleteAccount}
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {show2FAModal && (
        <Modal onClose={() => setShow2FAModal(false)}>
          <h3 className="text-lg font-bold mb-2">Enter your password to toggle 2FA</h3>
          <input
            type="password"
            className="border p-2 w-full rounded mb-4"
            value={twoFAPassword}
            onChange={(e) => setTwoFAPassword(e.target.value)}
            placeholder="Your password"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={submit2FAToggle}
          >
            Submit
          </button>
        </Modal>
      )}

      {showResetEmailModal && (
        <Modal onClose={() => setShowResetEmailModal(false)}>
          <h3 className="text-lg font-bold mb-2">Enter your email</h3>
          <input
            type="email"
            className="border p-2 w-full rounded mb-4"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={sendOTP}
          >
            Send OTP
          </button>
        </Modal>
      )}

      {showResetConfirmModal && (
        <Modal onClose={() => setShowResetConfirmModal(false)}>
          <h3 className="text-lg font-bold mb-2">Reset Your Password</h3>
          <input
            type="password"
            className="border p-2 w-full rounded mb-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
          />
          <input
            type="text"
            className="border p-2 w-full rounded mb-4"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="Enter OTP"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={confirmReset}
          >
            Confirm Reset
          </button>
        </Modal>
      )}
    </div>
  );
};

// ✅ Reusable Modal
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        className="absolute top-2 right-3 text-gray-600 text-xl"
        onClick={onClose}
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

export default Settings;
