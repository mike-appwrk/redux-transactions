import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({

  description: {
    type: String,
    trim: true,
    required: 'Please enter a description!'
  },
  type: {
    type: String,
    trim: true,
    enum: ['debit', 'credit'],
    required: 'Please select the type of transaction!'
  },
  amount: {
    type: Number,
    required: 'Please enter the amount!'
  },
  date: {
    type: Date,
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
