import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const validationRules = [
  body('description', 'Please enter a description').trim().not().isEmpty(),
  body('type', 'You must select a  type!').trim().isIn(['credit', 'debit']),
  body('date', 'Please select a date').trim().not().isEmpty(),
  body('amount', 'Please enter an amount greater than 0').trim().custom(value => parseInt(value) > 0)
];

export const handleValidationErrors = (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length) {
    res.status(400);
    return res.json({ errors });
  }
  next();
}

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200);
  res.json(transactions);
}

export const createTransaction = async (req, res) => {
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

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { description, type, amount, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No transaction with id: ${id}`);

  const transaction = { description, type, amount, date, _id: id }
  await Transaction.findByIdAndUpdate(id, transaction);
  console.log({ transaction });
  res.status(201);
  res.json(transaction);
}

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No transaction with id: ${id}`);
  
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    res.json({ id });
  } catch (error) {
    res.status(409);
    console.log({ message: error.message });
  }

}

export const deleteMultipleTransactions = async (req, res) => {
  const { ids: idsStrings } = req.query;
  const ids = idsStrings.split(',')
  console.log({ ids });

  // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No transaction with id: ${id}`);
  
  try {
    const response = await Transaction.deleteMany({ _id: { $in: ids }});
    res.status(200);
    res.json(response);
  } catch (error) {
    res.status(409);
    console.log({ message: error.message });
  }

}
