import Transaction from "../models/Transaction.js"

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200);
  res.json(transactions);
}
