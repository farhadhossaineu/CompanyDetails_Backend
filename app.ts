import express, { Request, NextFunction, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import companyRouter from "./routes/company.route";

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.get("/get", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "IT's working",
  });
});

app.use(companyRouter);
