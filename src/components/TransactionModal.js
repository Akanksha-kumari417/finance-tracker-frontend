import React, { useState, useEffect, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';

const defaultCategories = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Healthcare',
  'Education',
  'Salary',
  'Freelance',
  'Investment',
  'Other'
];

function TransactionModal({ isOpen, onClose, onSubmit, transaction, loading }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'EXPENSE',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [customCategory, setCustomCategory] = useState('');
  const [customCategories, setCustomCategories] = useState(() => {
    const savedCategories = localStorage.getItem('customCategories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const categories = useMemo(
    () => [...new Set([...defaultCategories, ...customCategories])],
    [customCategories]
  );

  // If editing, populate form
  useEffect(() => {
    if (transaction) {
      const existingCategory = transaction.category || '';
      const isKnownCategory = categories.includes(existingCategory);

      setFormData({
        description: transaction.description,
        amount: transaction.amount,
        category: isKnownCategory ? existingCategory : 'custom',
        type: transaction.type,
        date: transaction.date
      });
      setCustomCategory(isKnownCategory ? '' : existingCategory);
    } else {
      // Reset form when adding new
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        type: 'EXPENSE',
        date: new Date().toISOString().split('T')[0]
      });
      setCustomCategory('');
    }
  }, [transaction, isOpen, categories]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
    if (errors.category) {
      setErrors({ ...errors, category: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (formData.category === 'custom' && !customCategory.trim()) {
      newErrors.category = 'Custom category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const category = formData.category === 'custom'
        ? customCategory.trim()
        : formData.category;

      if (formData.category === 'custom' && !customCategories.includes(category)) {
        const updatedCategories = [...customCategories, category];
        setCustomCategories(updatedCategories);
        localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
      }

      const dataToSubmit = {
        ...formData,
        category,
        amount: parseFloat(formData.amount)
      };
      onSubmit(dataToSubmit);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., Grocery shopping"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($) *
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.amount
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'EXPENSE' })}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  formData.type === 'EXPENSE'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'INCOME' })}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  formData.type === 'INCOME'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.category
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="custom">Add custom category...</option>
            </select>
            {formData.category === 'custom' && (
              <input
                type="text"
                name="customCategory"
                value={customCategory}
                onChange={handleCustomCategoryChange}
                className={`w-full mt-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.category
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your category"
              />
            )}
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.date
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : transaction ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;
