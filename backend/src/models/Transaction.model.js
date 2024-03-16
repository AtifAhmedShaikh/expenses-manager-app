import mongoose from "mongoose";
import { OrganizationModel } from "../models/Organization.model.js";
import { INCOMING_TRANSACTION, OUTGOING_TRANSACTION } from "../constants/index.js";
import { ApiError } from "../utils/ApiError.js";

const transactionSchema = new mongoose.Schema(
  {
    // transaction has associated this organization
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
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
    currentDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

// middleware to set currentDate before saving the transaction
transactionSchema.pre("save", function (next) {
  if (!this.isNew) return next();
  this.currentDate = new Date();
  next();
});

export const TransactionModel = mongoose.model("Transaction", transactionSchema);
