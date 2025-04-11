import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../User_sidebar';
import UserNavbar from '../User_Navbar';
import background from '../../../assets/new3.jpg';

const BASE_URL_AND_PORT = 'http://192.168.0.106:8000';
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const Settings = () => {
  const [settings, setSettings] = useState({
    privateProfile: false,
    searchableProfile: true,
    allowMessagesfromStrangers: true,
    twoFaEnabled: false,
    companyPageWriteAccess: false,
    lookingToApply: true,
    lookingToRecruit: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [passwordForDeletion, setPasswordForDeletion] = useState('');
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'x-api-key': API_KEY,
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchSettings = async () => {
      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/user-settings`, {
          method: 'GET',
          headers,
        });

        const data = await response.json();
        if (response.ok) {
          setSettings(data);
        } else {
          setError(data.message || 'Failed to fetch settings');
        }
      } catch (err) {
        console.error('Fetch settings error:', err);
        setError('An error occurred while fetching settings.');
      }
    };

    fetchSettings();
  }, [navigate]);

  const handleToggleChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'lookingToApply' && checked) {
      setSettings((prev) => ({
        ...prev,
        lookingToApply: true,
        lookingToRecruit: false,
      }));
    } else if (name === 'lookingToRecruit' && checked) {
      setSettings((prev) => ({
        ...prev,
        lookingToRecruit: true,
        lookingToApply: false,
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) return setError('Please login to update settings.');

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/user-settings`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(settings),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Settings updated successfully!');
        setError('');
      } else {
        setError(data.message || 'Failed to update settings');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('Update settings error:', err);
      setError('An error occurred while updating settings.');
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) return setError('Please fill in all fields.');
    if (newPassword !== confirmNewPassword) return setError('New passwords do not match.');

    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/auth/change-password`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Password changed successfully!');
        setError('');
        setShowChangePasswordModal(false);
      } else {
        setError(data.message || 'Failed to change password');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('Change password error:', err);
      setError('An error occurred while changing password.');
      setSuccessMessage('');
    }
  };

  const handleToggle2FA = async () => {
    try {
      const response = await fetch(`${BASE_URL_AND_PORT}/auth/toggle-2fa`, {
        method: 'POST',
        headers,
      });

      const data = await response.json();
      if (response.ok) {
        setSettings((prev) => ({
          ...prev,
          twoFaEnabled: !prev.twoFaEnabled,
        }));
        setSuccessMessage(data.message || '2FA toggled successfully.');
        setError('');
      } else {
        setError(data.message || 'Failed to toggle 2FA');
      }
    } catch (err) {
      console.error('Toggle 2FA error:', err);
      setError('An error occurred while toggling 2FA.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!passwordForDeletion) return setError('Enter your password to confirm deletion.');

    if (window.confirm('Are you sure you want to delete your account? This action is permanent.')) {
      try {
        const response = await fetch(`${BASE_URL_AND_PORT}/auth/delete`, {
          method: 'DELETE',
          headers,
          body: JSON.stringify({ password: passwordForDeletion }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.removeItem('token');
          setSuccessMessage('Account deleted successfully.');
          navigate('/login');
        } else {
          setError(data.message || 'Failed to delete account');
        }
      } catch (err) {
        console.error('Delete account error:', err);
        setError('An error occurred while deleting your account.');
      }
    }
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <UserNavbar toggleSidebar={toggleSidebar} />
      <div
        className="flex flex-1"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <UserSidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-6 md:ml-80 max-w-4xl w-full mx-auto mt-20 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg">
            Account Settings
          </h2>
         

            {/* 2FA toggle */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-700 font-medium">Two-Factor Authentication (2FA)</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="twoFaEnabled"
                  checked={settings.twoFaEnabled}
                  onChange={handleToggle2FA}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>

           

          {error && <div className="mt-4 bg-red-500 text-white text-center p-2 rounded">{error}</div>}
          {successMessage && <div className="mt-4 bg-green-500 text-white text-center p-2 rounded">{successMessage}</div>}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setShowDeleteAccountModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete Account
            </button>
            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-2 text-center">Confirm Account Deletion</h3>
            <p className="text-sm text-center mb-4">This action cannot be undone.</p>
            <input
              type="password"
              value={passwordForDeletion}
              onChange={(e) => setPasswordForDeletion(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowDeleteAccountModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Change
                </button>
                <button type="button" onClick={() => setShowChangePasswordModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
