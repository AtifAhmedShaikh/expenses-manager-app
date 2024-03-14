import mongoose from "mongoose";
import { FINANCE_MANAGER, OWNER } from "../constants/index.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      tolowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: [OWNER, FINANCE_MANAGER],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", userSchema);
