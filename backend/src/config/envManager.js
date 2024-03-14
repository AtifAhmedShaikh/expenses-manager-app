import dotenv from "dotenv";
import process from "node:process";

dotenv.config({
  path: "src/config/config.env",
});

const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL;
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME;

export {
  PORT,
  DATABASE_URI,
  NODE_ENV,
  FRONTEND_ORIGIN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL,
  SMTP_PASSWORD,
};
