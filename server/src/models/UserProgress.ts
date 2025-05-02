import { Schema, model, Document, Types } from "mongoose";

export interface IUserProgress extends Document {
  user: Types.ObjectId;
  topic: Types.ObjectId;
  problem: Types.ObjectId;
  completed: boolean;
  updatedAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
    problem: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
    completed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserProgress = model<IUserProgress>(
  "UserProgress",
  UserProgressSchema
);
