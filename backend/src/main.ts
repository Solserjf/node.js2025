import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { ApiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", ApiRouter);

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({ status, message });
    },
);
process.on("uncaughtException", (err: ApiError) => {
    //для непередбачених помилок
    console.log("uncaughtException", err);
    process.exit(1);
});

const dbConnection = async () => {
    try {
        let dbConnect = false;
        while (!dbConnect) {
            console.log("Database Connecting...");
            await mongoose.connect(config.MONGO_URI);
            dbConnect = true;
            console.log("Database Connected...");
        }
    } catch (e) {
        console.log("Database unavailable, wait 3 sec.", e.message);
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }
};

const start = async () => {
    try {
        await dbConnection();
        console.log("Database available");
        app.listen(config.PORT, () => {
            console.log(`Server started on port ${config.PORT}`);
        });
    } catch (e) {
        console.log("Something went wrong", e.message);
    }
};

start();
