import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import { FRONTEND_ORIGIN } from "./config/envManager.js";
import authRouter from "./routes/auth.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import invitationRouter from "./routes/invitation.routes.js";

const app = express();

// cors configuration
const corsOptions = {
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// configure express app middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// declare index route of server
app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to Expenses manager Application 🚀" });
});

// declare route
app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/invitations", invitationRouter);

// handle 404 not found routes
app.use((_, res) => {
  res.status(404).json({ message: "route not found ! " });
});

// Apply Global error handling middleware
app.use(errorHandler);

export { app };
