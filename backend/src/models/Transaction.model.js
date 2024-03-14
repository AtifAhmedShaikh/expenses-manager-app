import mongoose from "mongoose";
import { INCOMING_TRANSACTION, OUTGOING_TRANSACTION } from "../constants/index.js";

const transactionSchema = new mongoose.Schema(
  {
    // type of transaction "outgoing" or "incoming"
    type: {
      type: String,
      enum: [OUTGOING_TRANSACTION, INCOMING_TRANSACTION],
      required: true,
    },
    // reason for when transaction has outgoing
    reason: {
      type: String,
    },
    // source for when transaction has incoming
    source: {
      type: String,
    },

    // amount of transaction
    amount: { type: Number, required: true },

    // current date of transaction
    currentDate: Date.now,

    // total amount of organization before transaction
    totalAmountBeforeTransaction: { type: Number, required: true },

    // total amount of organization before transaction
    totalAmountAfterTransaction: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const TransactionModel = mongoose.model("Transaction", transactionSchema);
