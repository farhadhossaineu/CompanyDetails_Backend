import express from "express";
import { createCompany, getCompany } from "../controllers/company.controllers";

const companyRouter = express.Router();

companyRouter.post("/register", createCompany);
companyRouter.get("/getsComp", getCompany);

export default companyRouter;
