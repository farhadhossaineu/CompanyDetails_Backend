import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

export interface IReg {
  name: string;
  email: string;
  age: number;
}

export const createUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, age } = req.body as IReg;
      const user: IReg = {
        name,
        email,
        age,
      };
      await userModel.create(user);
      res
        .status(200)
        .json({ success: true, message: "user create successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);
