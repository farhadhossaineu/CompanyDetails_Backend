import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import companyModel from "../models/company.model";
import ErrorHandler from "../utils/ErrorHandler";
const mongoose = require("mongoose");

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

export interface ICompanyData {
  _id: string;
  name: string;
  address: string;
  numberOfEmp: number;
}

export const editCompanyNames = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyData = req.body as ICompanyData;
      const companyDoc = await companyModel.findOne({ _id: companyData._id });
      if (companyDoc === null) {
        return res
          .status(404)
          .json({ success: false, message: "company not found" });
      } else {
        companyDoc.name = companyData.name;
        companyDoc.address = companyData.address;
        companyDoc.numberOfEmp = companyData.numberOfEmp;

        await companyDoc.save();
      }
      return res
        .status(200)
        .json({ success: true, message: "Updated successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 404));
    }
  }
);

export interface ICompanyDelete {
  _id: string;
}

export const deleteCompany = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body as ICompanyDelete;

      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid company ID" });
      }

      const companyDoc = await companyModel.findOneAndDelete({ _id });

      if (!companyDoc) {
        return res
          .status(404)
          .json({ success: false, message: "Company not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

export const EmployeeMoreThan10 = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allCompanies = await companyModel.find({});

      const filteredCompanies = allCompanies.filter(
        (company) => company.numberOfEmp > 10
      );

      return res
        .status(200)
        .json({ success: true, companies: filteredCompanies });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);
