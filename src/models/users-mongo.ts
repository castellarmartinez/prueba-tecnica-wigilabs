import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: number;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

export const Users = model<IUser>("User", userSchema);
