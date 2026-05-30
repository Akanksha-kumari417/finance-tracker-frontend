import React from 'react';
import ExpenseDonutChart from '../components/ExpenseDonutChart';
import { FaDownload, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function ReportsPage({ summary, transactions, loading }) {
  const handleExport = () => {
    alert('Export feature coming soon!');
  };

  const categoryData = Object.entries(summary?.expensesByCategory || {}).map(([category, amount]) => ({
    category,
    amount: parseFloat(amount),
    percentage: ((parseFloat(amount) / (summary?.totalExpenses || 1)) * 100).toFixed(1)
  })).sort((a, b) => b.amount - a.amount);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Financial Reports</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <FaDownload className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl shadow-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Total Transactions</p>
          <p className="text-3xl font-bold text-white">{summary?.transactionCount || 0}</p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Avg. Transaction</p>
          <p className="text-3xl font-bold text-blue-400">
            ${((summary?.totalIncome + summary?.totalExpenses) / (summary?.transactionCount || 1)).toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Largest Expense</p>
          <p className="text-3xl font-bold text-red-400">
            ${Math.max(...Object.values(summary?.expensesByCategory || {0: 0})).toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Savings Rate</p>
          <p className="text-3xl font-bold text-green-400">
            {((summary?.balance / (summary?.totalIncome || 1)) * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donut Chart */}
        <ExpenseDonutChart summary={summary} loading={loading} />

        {/* Category Breakdown Table */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Category Rankings</h3>

          {categoryData.length === 0 ? (
            <p className="text-slate-400 text-center py-12">No expense data available</p>
          ) : (
            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-white font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-white font-bold">${item.amount.toFixed(2)}</p>
                      <p className="text-slate-400 text-sm">{item.percentage}%</p>
                    </div>
                    {item.percentage > 30 ? (
                      <FaArrowUp className="text-red-400" />
                    ) : (
                      <FaArrowDown className="text-green-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Spending Categories Summary */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Spending Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Highest Spending</p>
            <p className="text-xl font-bold text-red-400">{categoryData[0]?.category || 'N/A'}</p>
            <p className="text-slate-300 text-sm">${categoryData[0]?.amount.toFixed(2) || '0.00'}</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Categories Count</p>
            <p className="text-xl font-bold text-blue-400">{categoryData.length}</p>
            <p className="text-slate-300 text-sm">Active categories</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Recommendation</p>
            <p className="text-sm text-green-400">
              {categoryData[0]?.percentage > 40 ?
                `Reduce ${categoryData[0]?.category} spending` :
                'Spending looks balanced'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;