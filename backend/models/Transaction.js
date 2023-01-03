import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  description: {
    type: String,
    trim: true,
    required: 'Please enter a description!'
  }
})

const Transaction = new mongoose.model('Transaction', transactionSchema);

export default Transaction;
