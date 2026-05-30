import React, { useState } from 'react';
import { FaUser, FaBell, FaLock, FaPalette } from 'react-icons/fa';
import authService from '../services/authService';

function SettingsSection() {
  const user = authService.getCurrentUser();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      {/* Profile Settings */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FaUser className="text-blue-400 text-xl" />
          <h3 className="text-lg font-bold text-white">Profile Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg"
              disabled
            />
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Update Profile
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FaBell className="text-green-400 text-xl" />
          <h3 className="text-lg font-bold text-white">Notifications</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Email Notifications</p>
            <p className="text-sm text-slate-400">Receive updates about your transactions</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-blue-600' : 'bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FaLock className="text-red-400 text-xl" />
          <h3 className="text-lg font-bold text-white">Security</h3>
        </div>

        <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Change Password
        </button>
      </div>

      {/* Appearance */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FaPalette className="text-purple-400 text-xl" />
          <h3 className="text-lg font-bold text-white">Appearance</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Dark Mode</p>
            <p className="text-sm text-slate-400">Currently enabled</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsSection;