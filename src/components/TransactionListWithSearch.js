import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function TransactionListWithSearch({ transactions, loading, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {searchTerm ? 'No transactions found' : 'No transactions yet'}
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'INCOME' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'INCOME' ? (
                    <FaArrowUp className="text-green-600" />
                  ) : (
                    <FaArrowDown className="text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <span className="px-2 py-1 bg-gray-100 rounded">{transaction.category}</span>
                    <span>•</span>
                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <p className={`text-lg font-bold ${
                  transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionListWithSearch;