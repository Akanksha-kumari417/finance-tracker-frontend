import React from 'react';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function TransactionList({ transactions, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-500 text-lg">No transactions yet</p>
        <p className="text-gray-400 text-sm mt-2">Click "Add Transaction" to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
      </div>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              {/* Left side - Transaction info */}
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'INCOME' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'INCOME' ? (
                    <FaArrowUp className="text-green-600" />
                  ) : (
                    <FaArrowDown className="text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{transaction.description}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-500">{transaction.category}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Amount and actions */}
              <div className="flex items-center space-x-4">
                <p className={`text-xl font-bold ${
                  transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;