import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICompany extends Document {
  name: string;
  address: string;
  numberOfEmp: number;
}

const companySchema: Schema<ICompany> = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter your company name"],
  },
  address: {
    type: String,
    require: [true, "Please enter your company address"],
  },
  numberOfEmp: {
    type: Number,
    required: [true, "Please enter your employee number"],
  },
});

const companyModel: Model<ICompany> = mongoose.model<ICompany>(
  "company",
  companySchema
);
export default companyModel;
