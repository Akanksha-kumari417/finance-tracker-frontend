import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function ExpensePieChart({ summary, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  const expensesByCategory = summary?.expensesByCategory || {};

  const data = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: parseFloat(amount)
  }));

  const COLORS = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#F97316', // Orange
  ];

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Expenses by Category</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <p>No expense data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Expenses by Category</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend with color boxes */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center">
            <div
              className="w-4 h-4 rounded mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-gray-600">
              {entry.name}: <span className="font-semibold">${entry.value.toFixed(2)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpensePieChart;