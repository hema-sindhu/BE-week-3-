// src/persistence/transactionRepository.js
const Transaction = require('../domain/transaction');

class TransactionRepository {
  async createTransaction(transactionData) {
    const transaction = new Transaction(transactionData);
    return transaction.save();
  }

  async getTransactionsByUserId(userId) {
    return Transaction.find({ userId });
  }
}

module.exports = new TransactionRepository();
