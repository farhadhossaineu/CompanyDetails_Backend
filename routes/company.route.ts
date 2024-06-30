import express from "express";
import {
  createCompany,
  getCompany,
  getCompanyNames,
} from "../controllers/company.controllers";

const companyRouter = express.Router();

companyRouter.post("/register", createCompany);
companyRouter.get("/getsComp", getCompany);
companyRouter.get("/getCompanyNames", getCompanyNames);

export default companyRouter;
