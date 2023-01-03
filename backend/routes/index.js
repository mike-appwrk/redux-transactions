import express from "express";
import { getTransactions, createTransaction } from "../controller/transactionsController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

const router = express.Router();

router.get('/transactions', catchErrors(getTransactions));

router.post('/transactions/create', catchErrors(createTransaction));

export default router;
