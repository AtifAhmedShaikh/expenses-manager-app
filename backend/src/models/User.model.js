import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/envManager.js";
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
    password: {
      type: String,
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

// encrypt the user password before saving the document in database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// method to compare provided plain text password with the hashed password by using bcrypt
userSchema.methods.isCorrectPassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

// Generate access Token using JWT for user authentication
userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
  };
  return Jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "6d",
  });
};

export const UserModel = mongoose.model("User", userSchema);
