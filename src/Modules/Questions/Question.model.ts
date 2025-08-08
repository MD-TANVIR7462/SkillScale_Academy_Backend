import { model, Schema } from "mongoose";
import { TOptions, TQuestion } from "./Question.interface";


// Option schema
const OptionSchema = new Schema<TOptions>(
  {
    serial: { type: String, required: true },
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  }
);

// Question schema
const QuestionSchema = new Schema<TQuestion>(
  {
    question: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    correctAnswer: { type: String, required: true },
    level: { type: String, required: true },
    timeAllowed: { type: Number },
  },
  { timestamps: true }
);

// Export model
export const QuestionModel = model<TQuestion>("question", QuestionSchema);
