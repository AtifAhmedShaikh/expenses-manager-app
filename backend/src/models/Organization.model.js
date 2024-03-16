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
  },
  {
    timestamps: true,
  },
);

export const OrganizationModel = mongoose.model("Organization", organizationSchema);
