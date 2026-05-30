import React from 'react';
import { FaBullseye, FaPiggyBank, FaChartLine } from 'react-icons/fa';

function GoalsSection({ summary }) {
  const monthlyIncomeTarget = 6000;
  const savingsTarget = 2000;
  const currentIncome = summary?.totalIncome || 0;
  const currentSavings = summary?.balance || 0;

  const goals = [
    {
      title: 'Monthly Income Target',
      icon: FaBullseye,
      current: currentIncome,
      target: monthlyIncomeTarget,
      progress: Math.min((currentIncome / monthlyIncomeTarget) * 100, 100),
      gradient: 'from-orange-400 to-teal-400',
      dueDate: 'Mar 31, 2024'
    },
    {
      title: 'Savings Goal',
      icon: FaPiggyBank,
      current: currentSavings,
      target: savingsTarget,
      progress: Math.min((currentSavings / savingsTarget) * 100, 100),
      gradient: 'from-orange-500 to-green-500',
      dueDate: 'Jun 30, 2024'
    },
    {
      title: 'Expense Control',
      icon: FaChartLine,
      current: summary?.totalExpenses || 0,
      target: 4000,
      progress: Math.min(((summary?.totalExpenses || 0) / 4000) * 100, 100),
      gradient: 'from-red-400 to-yellow-400',
      dueDate: 'Mar 31, 2024'
    }
  ];

  const getMilestoneBlocks = (progress) => {
    const blocks = 5;
    const completedBlocks = Math.floor((progress / 100) * blocks);
    return Array.from({ length: blocks }, (_, i) => i < completedBlocks);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Financial Goals</h2>

      {goals.map((goal, index) => {
        const Icon = goal.icon;
        const milestones = getMilestoneBlocks(goal.progress);

        return (
          <div key={index} className="bg-slate-800 rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-700 p-3 rounded-lg">
                  <Icon className="text-blue-400 text-xl" />
                </div>
                <h3 className="font-bold text-white text-lg">{goal.title}</h3>
              </div>
            </div>

            {/* Progress Bar with Gradient */}
            <div className="mb-3">
              <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 bg-gradient-to-r ${goal.gradient} transition-all duration-500 rounded-full`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Footer with Milestones, Percentage, and Due Date */}
            <div className="flex items-center justify-between">
              {/* Left: Amount Progress */}
              <div className="text-sm text-slate-300">
                ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
              </div>

              {/* Center: Milestone Blocks */}
              <div className="flex space-x-1">
                {milestones.map((completed, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm transition-colors ${
                      completed ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                  ></div>
                ))}
              </div>

              {/* Center-Right: Percentage */}
              <div className="text-lg font-bold text-blue-400">
                {goal.progress.toFixed(0)}%
              </div>

              {/* Right: Due Date */}
              <div className="text-sm text-slate-400">
                Due: {goal.dueDate}
              </div>
            </div>

            {/* Achievement Badge */}
            {goal.progress >= 100 && (
              <div className="mt-3 text-center">
                <span className="inline-block px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full">
                  🎉 Goal Achieved!
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GoalsSection;