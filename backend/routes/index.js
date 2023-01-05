import express from "express";
import { getTransactions, createTransaction, getTransaction, updateTransaction, deleteTransaction, validationRules, handleValidationErrors, deleteMultipleTransactions } from "../controller/transactionsController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

const router = express.Router();

router.get('/transactions', catchErrors(getTransactions));

router.get('/transactions/:id', catchErrors(getTransaction));

router.post('/transactions/create', validationRules, handleValidationErrors, catchErrors(createTransaction));

router.patch('/transactions/update/:id', validationRules, handleValidationErrors, catchErrors(updateTransaction));

router.delete('/transactions/delete/:id', catchErrors(deleteTransaction));

router.delete('/transactions/delete/', catchErrors(deleteMultipleTransactions));

export default router;
