import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import transactionService from '../services/transactionService';
import Sidebar from '../components/Sidebar';
import TransactionModal from '../components/TransactionModal';
import DashboardPage from './DashboardPage';
import TransactionsPage from './TransactionsPage';
import ReportsPage from './ReportsPage';
import GoalsPage from './GoalsPage';
import SettingsPage from './SettingsPage';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed to false
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const transactionsData = await transactionService.getAllTransactions();
      setTransactions(transactionsData);

      const now = new Date();
      const summaryData = await transactionService.getMonthlySummary(
        now.getFullYear(),
        now.getMonth() + 1
      );
      setSummary(summaryData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingTransaction) {
        await transactionService.updateTransaction(editingTransaction.id, formData);
      } else {
        await transactionService.createTransaction(formData);
      }
      await fetchData();
      setModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert(error.response?.data || 'Failed to save transaction.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.deleteTransaction(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Failed to delete transaction.');
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const renderPage = () => {
    const pageProps = {
      summary,
      transactions,
      loading,
      onAddTransaction: handleAddTransaction,
      onEditTransaction: handleEditTransaction,
      onDeleteTransaction: handleDeleteTransaction
    };

    // Dashboard keeps white background, others use dark
    const bgClass = currentPage === 'dashboard' ? 'bg-gray-50' : 'bg-[#1E293B]';

    return (
      <div className={`min-h-screen ${bgClass} p-8`}>
        {(() => {
          switch (currentPage) {
            case 'dashboard':
              return <DashboardPage {...pageProps} />;
            case 'transactions':
              return <TransactionsPage {...pageProps} />;
            case 'reports':
              return <ReportsPage {...pageProps} />;
            case 'goals':
              return <GoalsPage summary={summary} />;
            case 'settings':
              return <SettingsPage />;
            default:
              return <DashboardPage {...pageProps} />;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - slides over content */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content - no margin shift */}
      <div className="flex-1 w-full">
        {/* Top Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 ml-16">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaUser className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Welcome back,</p>
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        {renderPage()}
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleModalSubmit}
        transaction={editingTransaction}
        loading={submitting}
      />
    </div>
  );
}

export default Dashboard;