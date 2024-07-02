import express from "express";
import {
  EmployeeMoreThan10,
  createCompany,
  deleteCompany,
  editCompanyNames,
  getCompany,
  getCompanyNames,
} from "../controllers/company.controllers";
import { createUser } from "../controllers/user.controllers";

const companyRouter = express.Router();

companyRouter.post("/user", createUser);
companyRouter.post("/register", createCompany);
companyRouter.get("/getsComp", getCompany);
companyRouter.get("/getCompanyNames", getCompanyNames);
companyRouter.put("/editCompanyNames", editCompanyNames);
companyRouter.delete("/deleteCompany", deleteCompany);
companyRouter.get("/Employee", EmployeeMoreThan10);

export default companyRouter;
