import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import companyModel from "../models/company.model";
import ErrorHandler from "../utils/ErrorHandler";

export interface IRegister {
  name: string;
  address: string;
  numberOfEmp: number;
}

export const createCompany = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, address, numberOfEmp } = req.body as IRegister;
      const company: IRegister = {
        name,
        address,
        numberOfEmp,
      };
      await companyModel.create(company);
      res
        .status(200)
        .json({ success: true, message: "Company create successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);

export const getCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const companies = await companyModel.find({});

  res.status(200).json(companies);
};
