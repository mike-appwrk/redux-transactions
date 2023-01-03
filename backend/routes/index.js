import express from "express";
import { getTransactions, createTransaction, getTransaction } from "../controller/transactionsController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

const router = express.Router();

router.get('/transactions', catchErrors(getTransactions));

router.get('/transactions/:id', catchErrors(getTransaction));

router.post('/transactions/create', catchErrors(createTransaction));

export default router;
