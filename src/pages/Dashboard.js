import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Finance Tracker</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 You're Logged In!
          </h2>
          <p className="text-gray-600 mb-4">
            Authentication is working perfectly with your backend!
          </p>
          <p className="text-sm text-gray-500">
            Connected to: <code className="bg-gray-100 px-2 py-1 rounded">
              https://finance-tracker-backend-segu.onrender.com
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;