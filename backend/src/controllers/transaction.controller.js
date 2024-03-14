import { OUTGOING_TRANSACTION } from "../constants/index.js";
import { TransactionModel } from "../models/Transaction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTransaction = asyncHandler(async (req, res) => {
  const { type, amount, reason, source } = req.body;

  if (type === OUTGOING_TRANSACTION) {
    const createdTransaction = await TransactionModel.create({
      type: OUTGOING_TRANSACTION,
      amount,
      reason,
    });
    return res.status(201).json({
      success: true,
    });
  }
});
