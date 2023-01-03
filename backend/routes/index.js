import express from "express";
import { getTransactions } from "../controller/transactionsController.js";
import { catchErrors } from "../handlers/errorHandlers.js";

const router = express.Router();

router.get('/transactions', catchErrors(getTransactions));

export default router;
