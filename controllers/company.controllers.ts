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
      const companyDocs: IRegister[] = await companyModel.find({});
      const companies: string[] = companyDocs.map((comp) => comp.name);
      res.status(200).json({ success: true, companies });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);
