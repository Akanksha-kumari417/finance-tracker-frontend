import api from './api';

const transactionService = {
  // Get all transactions
  getAllTransactions: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },

  // Create transaction
  createTransaction: async (transactionData) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  // Update transaction
  updateTransaction: async (id, transactionData) => {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

  // Get monthly summary
  getMonthlySummary: async (year, month) => {
    const response = await api.get(`/transactions/summary?year=${year}&month=${month}`);
    return response.data;
  }
};

export default transactionService;