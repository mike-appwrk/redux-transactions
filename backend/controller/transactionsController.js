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
  console.log(newTransaction)
  res.status(201);
  res.json(newTransaction);
}
