import dotenv from "dotenv";
import { connectDB } from "./database/connection.js";
import { app } from "./app.js";
import { PORT } from "./config/envManager.js";
import process from "node:process";

dotenv.config({
  path: "src/config/config.env",
});

connectDB();

app.listen(PORT, () => {
  console.log("Server running at port :", PORT);
});

process.on("unhandledRejection", error => {
  console.log("Promise rejected ", error);
});

process.on("uncaughtException", (error, source) => {
  console.log(error, source);
});
