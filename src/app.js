import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "../src/routes/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;
