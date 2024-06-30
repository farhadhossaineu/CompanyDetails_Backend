import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import companyModel from "../models/company.model";
import ErrorHandler from "../utils/ErrorHandler";

export interface IRegister {
  name: string;
  address: string;
  numberOfEmp: number;
}

const companyNames: string[] = [];

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

      companyNames.push(name);

      res
        .status(200)
        .json({ success: true, message: "Company create successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);

export const getCompany = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companies = await companyModel.find({});

      res.status(200).json(companies);
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);

export const getCompanyNames = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(companyNames);
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);
