import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import process from "node:process";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config({
  path: "src/config/config.env",
});

const app = express();

// cors configuration
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// configure express app middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// declare index route of server
app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to Expenses manager Application 🚀" });
});

// Apply Global error handling middleware
app.use(errorHandler);

export { app };
