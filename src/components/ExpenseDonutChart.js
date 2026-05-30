import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function ExpenseDonutChart({ summary, loading }) {
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-80 bg-slate-700 rounded animate-pulse"></div>
      </div>
    );
  }

  const expensesByCategory = summary?.expensesByCategory || {};

  // Prepare data for donut chart
  const data = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: parseFloat(amount),
    percentage: ((parseFloat(amount) / (summary?.totalExpenses || 1)) * 100).toFixed(1)
  })).sort((a, b) => b.value - a.value);

  // Color palette: Mint Green, Coral/Orange, Dark Teal
  const COLORS = [
    '#10B981', // Mint Green
    '#FF6B6B', // Coral/Orange
    '#0D9488', // Dark Teal
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#F59E0B', // Amber
    '#EC4899', // Pink
    '#06B6D4', // Cyan
  ];

  if (data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Expense Distribution</h3>
        <div className="h-80 flex items-center justify-center text-slate-400">
          <p>No expense data available</p>
        </div>
      </div>
    );
  }

  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Expense Distribution</h3>

      <div className="flex items-center justify-between">
        {/* Left: Donut Chart */}
        <div className="relative" style={{ width: '300px', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-4xl font-bold">${total.toFixed(0)}</p>
            <p className="text-slate-400 text-sm mt-1">Total Expenses</p>
          </div>
        </div>

        {/* Right: Category List */}
        <div className="flex-1 ml-8 space-y-3">
          {data.slice(0, 6).map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-white font-medium text-sm">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold text-sm">${item.value.toFixed(2)}</p>
                <p className="text-slate-400 text-xs">{item.percentage}%</p>
              </div>
            </div>
          ))}

          {data.length > 6 && (
            <p className="text-slate-500 text-xs text-center mt-4">
              +{data.length - 6} more categories
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseDonutChart;