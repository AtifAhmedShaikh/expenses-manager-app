import mongoose from "mongoose";
import { INCOMING_TRANSACTION, OUTGOING_TRANSACTION } from "../constants/index.js";

const organizationSchema = new mongoose.Schema(
  {
    // name of organization
    name: {
      type: String,
      index: true,
      required: true,
    },
    // finance manager of this organization
    financeManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    totalOutgoingAmount: { type: Number, default: 0 },

    totalIncomingAmount: { type: Number, default: 0 },

    currentBalance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const OrganizationModel = mongoose.model("Organization", organizationSchema);
