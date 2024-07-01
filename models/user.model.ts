import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  age: {
    type: Number,
    required: [true, "Please enter your age"],
  },
});

const userModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);
export default userModel;
