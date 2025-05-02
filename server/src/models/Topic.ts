import mongoose, { Document, Schema } from "mongoose";

export interface ITopic extends Document {
  title: string;
  category?: string; // optional if grouping by domain
}

const TopicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String }, // e.g., Algorithms, Data Structures
  },
  { timestamps: true }
);

export const Topic = mongoose.model<ITopic>("Topic", TopicSchema);
