// src/models/User.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  fullName?: string;
  dob?: Date;
  completedProblems: string[];
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    dob: { type: Date },
    completedProblems: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
