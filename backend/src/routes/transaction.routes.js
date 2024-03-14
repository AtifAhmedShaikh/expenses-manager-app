// routes/transactions.js
import express from "express";
import { isFinanceManager } from "../middlewares/authZ.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.route("/add").post(authenticateUser, isFinanceManager, addTransaction);
router.route("/edit").put(authenticateUser, isFinanceManager, editTransaction);
router.route("/delete").delete(authenticateUser, isFinanceManager, deleteTransaction);

// route to retrieve all transactions of current org
router.route("/");

export default router;
