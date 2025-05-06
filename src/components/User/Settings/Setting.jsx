import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../User/User_sidebar";
import UserNavbar from "../../User/User_Navbar";
import background from "../../../assets/slider.jpg";
import chargerImage from "../../../assets/tf13.png"; // ✅ Your charger image

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
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-center lg:ml-60">
            {/* Settings Content */}
            <div className="flex-1 text-gray-800 space-y-8">
  <h2 className="text-4xl font-extrabold text-teal-600">Account Settings</h2>

  {/* --- Security Settings Section --- */}
  <div className="bg-gray-100 rounded-xl p-6 shadow-md space-y-4 border border-teal-200">
    <h3 className="text-xl font-semibold text-teal-700 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-.34-.02-.67-.06-.99M9.25 20h5.5m.75-2.5h-7m4.53-8.74A6 6 0 0112 5V4a2 2 0 00-4 0v1m8 0V4a2 2 0 00-4 0v1a6.003 6.003 0 014.53 4.76z" />
      </svg>
      Security
    </h3>

    {/* 2FA Toggle */}
    <div className="flex justify-between items-center bg-white p-4 rounded-md border">
      <span className="text-base font-medium text-gray-700">
        Two-Factor Authentication
      </span>
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
    <p className="text-sm text-gray-500 ml-1">
      2FA is <strong>{is2FAEnabled ? "enabled ✅" : "disabled ❌"}</strong> for your account.
    </p>
  </div>

  {/* --- Password Section --- */}
  <div className="bg-gray-100 rounded-xl p-6 shadow-md space-y-4 border border-blue-200">
    <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m4-6a4 4 0 10-8 0v4h8v-4z" />
      </svg>
      Password
    </h3>
    <p className="text-sm text-gray-600">
      Make sure your password is long, unique, and hard to guess.
    </p>
    <button
      className="bg-purple-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
      onClick={() => setShowResetEmailModal(true)}
    >
      Reset Password
    </button>
  </div>

  {/* --- Danger Zone --- */}
  {/* <div className="bg-red-50 rounded-xl p-6 shadow-md border border-red-300">
    <h3 className="text-xl font-semibold text-red-700 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-6.364 6.364m0 0l-6.364 6.364M5.636 18.364l6.364-6.364m0 0l6.364-6.364" />
      </svg>
      Danger Zone
    </h3>
    <p className="text-sm text-red-600 mb-4">
      Deleting your account is permanent and cannot be undone.
    </p>
    <button
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
      onClick={handleDeleteAccount}
    >
      Delete My Account
    </button>
  </div> */}
</div>


            {/* Right-side Charger Image */}
            <div className="hidden lg:block w-full max-w-md">
              <img
                src={chargerImage}
                alt="EV Charger"
                className="rounded-xl shadow-lg w-full object-cover"
              />
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

// ✅ Reusable Modal Component
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
