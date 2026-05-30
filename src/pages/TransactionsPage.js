import React from 'react';
import { FaPlus } from 'react-icons/fa';
import DailyTrendChart from '../components/DailyTrendChart';

function TransactionsPage({
  transactions,
  loading,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction
}) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">All Transactions</h1>
        <button
          onClick={onAddTransaction}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <FaPlus className="mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Daily Trend Chart */}
      <div className="mb-6">
        <DailyTrendChart transactions={transactions} loading={loading} />
      </div>

      {/* Transaction List */}
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Transaction History</h3>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-slate-700 rounded animate-pulse"></div>
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-center text-slate-400 py-12">No transactions found</p>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'INCOME' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <span className={transaction.type === 'INCOME' ? 'text-green-400' : 'text-red-400'}>
                      {transaction.type === 'INCOME' ? '↑' : '↓'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-slate-400 mt-1">
                      <span className="px-2 py-1 bg-slate-600 rounded">{transaction.category}</span>
                      <span>•</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'INCOME' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditTransaction(transaction)}
                      className="p-2 text-blue-400 hover:bg-slate-600 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="p-2 text-red-400 hover:bg-slate-600 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionsPage;