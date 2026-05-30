import React from 'react';
import { FaPlus } from 'react-icons/fa';
import SummaryCardsWhite from '../components/SummaryCardsWhite';
import ExpensePieChart from '../components/ExpensePieChart';
import TransactionListWithSearch from '../components/TransactionListWithSearch';

function DashboardPage({
  summary,
  transactions,
  loading,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={onAddTransaction}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <FaPlus className="mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <SummaryCardsWhite summary={summary} loading={loading} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <ExpensePieChart summary={summary} loading={loading} />

        {/* Transaction List */}
        <TransactionListWithSearch
          transactions={transactions}
          loading={loading}
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
        />
      </div>
    </div>
  );
}

export default DashboardPage;