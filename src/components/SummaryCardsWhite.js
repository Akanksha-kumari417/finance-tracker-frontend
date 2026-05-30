import React from 'react';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';

function SummaryCardsWhite({ summary, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Income',
      amount: summary?.totalIncome || 0,
      icon: FaArrowUp,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-50'
    },
    {
      title: 'Total Expenses',
      amount: summary?.totalExpenses || 0,
      icon: FaArrowDown,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-50'
    },
    {
      title: 'Balance',
      amount: summary?.balance || 0,
      icon: FaWallet,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800">
                  ${card.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className={`${card.iconBg} p-4 rounded-full`}>
                <Icon className={`text-2xl ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCardsWhite;