import React from 'react';
import { FaHome, FaChartBar, FaExchangeAlt, FaBullseye, FaCog, FaBars, FaTimes } from 'react-icons/fa';

function Sidebar({ currentPage, onPageChange, isOpen, onToggle }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome },
    { id: 'reports', label: 'Reports', icon: FaChartBar },
    { id: 'transactions', label: 'Transactions', icon: FaExchangeAlt },
    { id: 'goals', label: 'Goals', icon: FaBullseye },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  return (
    <>
      {/* Hamburger Menu Button - Fixed */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-3 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay for when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        ></div>
      )}

      {/* Sidebar - Slides over content */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white w-64 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo/Brand */}
        <div className="p-6 pt-20 border-b border-slate-700">
          <h1 className="text-2xl font-bold">💰 FinanceTracker</h1>
          <p className="text-slate-400 text-sm mt-1">Manage Your Money</p>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onToggle(); // Close sidebar after selecting
                }}
                className={`w-full flex items-center px-6 py-4 transition-all ${
                  isActive
                    ? 'bg-slate-700 border-l-4 border-blue-500 text-white'
                    : 'hover:bg-slate-700/50 border-l-4 border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="text-xl" />
                <span className="ml-4 font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
          <p className="text-xs text-slate-400">Version 1.0.0</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;