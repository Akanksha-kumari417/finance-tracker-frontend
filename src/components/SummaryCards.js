import React from 'react';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';

function SummaryCards({ summary, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
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
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Total Expenses',
      amount: summary?.totalExpenses || 0,
      icon: FaArrowDown,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      iconBg: 'bg-red-100'
    },
    {
      title: 'Balance',
      amount: summary?.balance || 0,
      icon: FaWallet,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className={`${card.bgColor} rounded-lg shadow-md p-6 border border-${card.color}-100`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  ${card.amount.toFixed(2)}
                </p>
              </div>
              <div className={`${card.iconBg} p-3 rounded-full`}>
                <Icon className={`text-2xl ${card.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;