import Transaction from "../models/Transaction.js"

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200);
  res.json(transactions);
}

export const createTransaction = async (req, res) => {
  console.log({body: req.body})
  const { description, type, amount, date } = req.body;
  const newTransaction = new Transaction({
    description, type, amount, date
  });
  await newTransaction.save();
  res.status(201);
  res.json(newTransaction);
}

export const getTransaction = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  res.status(200);
  res.json(transaction);
}
