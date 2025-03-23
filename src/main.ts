/* eslint-disable no-console */

import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./router/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRouter);
app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status;
    const message = err.message;
    res.status(status).json({ message, status });
  },
);
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});

const dbConnection = async () => {
  let dbConnect = false;
  try {
    while (!dbConnect) {
      console.log("Database Connecting...");
      await mongoose.connect(config.MONGO_URI);
      dbConnect = true;
      console.log("Database Connected...");
    }
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
};

const start = async () => {
  try {
    await dbConnection();
    app.listen(config.PORT, () => {
      console.log(`server has started on port ${config.PORT}`);
    });
  } catch (e) {
    console.log("Error", e.message);
  }
};

start();
