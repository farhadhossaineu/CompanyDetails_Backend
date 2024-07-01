import express from "express";
import {
  createCompany,
  getCompany,
  getCompanyNames,
} from "../controllers/company.controllers";
import { createUser } from "../controllers/user.controllers";

const companyRouter = express.Router();

companyRouter.post("/user", createUser);
companyRouter.post("/register", createCompany);
companyRouter.get("/getsComp", getCompany);
companyRouter.get("/getCompanyNames", getCompanyNames);

export default companyRouter;
