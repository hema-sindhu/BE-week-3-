// src/application/transactionService.js
const TransactionRepository = require('../persistence/transactionRepository');

class TransactionService {
  async createTransaction(userId, amount, type) {
    if (!['credit', 'debit'].includes(type)) {
      throw new Error('Invalid transaction type');
    }
    return TransactionRepository.createTransaction({ userId, amount, type });
  }

  async getTransactions(userId) {
    return TransactionRepository.getTransactionsByUserId(userId);
  }
}

module.exports = new TransactionService();
