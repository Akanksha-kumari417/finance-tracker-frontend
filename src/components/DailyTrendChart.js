import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

function DailyTrendChart({ transactions, loading }) {
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-64 bg-slate-700 rounded animate-pulse"></div>
      </div>
    );
  }

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const dailyData = daysInMonth.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayTransactions = transactions.filter(t => t.date === dayStr);

    const total = dayTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return {
      date: format(day, 'dd'),
      amount: total,
      // Assign colors based on amount ranges
      fill: total > 1000 ? '#10B981' : total > 500 ? '#06B6D4' : '#3B82F6'
    };
  });

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Daily Transaction Volume</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyData} barCategoryGap="10%">
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            stroke="#475569"
          />
          <YAxis
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            stroke="#475569"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
          />
          <Bar
            dataKey="amount"
            radius={[0, 0, 0, 0]}
          >
            {dailyData.map((entry, index) => (
              <Bar key={index} dataKey="amount" fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#10B981] mr-2"></div>
          <span className="text-sm text-slate-300">High (&gt;$1000)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#06B6D4] mr-2"></div>
          <span className="text-sm text-slate-300">Medium ($500-$1000)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#3B82F6] mr-2"></div>
          <span className="text-sm text-slate-300">Low (&lt;$500)</span>
        </div>
      </div>
    </div>
  );
}

export default DailyTrendChart;