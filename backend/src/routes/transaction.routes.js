import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  restrictedToFinanceManager,
  attachCurrentUserOrganization,
} from "../middlewares/authZ.middleware.js";
import {
  getOrganizationTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

// apply authentication middleware
router.use(authenticateUser);
//apply middleware to attach organization of current user
router.use(attachCurrentUserOrganization);

// index route to retrieve all transactions of current organization
router.route("/").get(getOrganizationTransactions);

// secure route of finance manager
router.route("/add").post(restrictedToFinanceManager, addTransaction);
router.route("/update/:transactionId").put(restrictedToFinanceManager, editTransaction);
router.route("/delete/:transactionId").delete(restrictedToFinanceManager, deleteTransaction);

export default router;
