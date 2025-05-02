import { Schema, model, Document, Types } from "mongoose";

export interface IProblem extends Document {
  title: string;
  topic: Types.ObjectId;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const ProblemSchema = new Schema<IProblem>({
  title: { type: String, required: true },
  topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  youtubeLink: { type: String, required: true },
  leetcodeLink: { type: String, required: true },
  articleLink: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
});

export default model<IProblem>("Problem", ProblemSchema);
