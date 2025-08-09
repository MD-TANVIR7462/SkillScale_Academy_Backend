import { TQuestion } from "./Question.interface";
import { QuestionModel } from "./Question.model";

const createquestion = async (data: TQuestion) => {
  return await QuestionModel.insertMany(data);
};

const getquestions = async (query: any) => {
  const queryData: Record<string, any> = {
    isDeleted: false,
  };
  return await QuestionModel.find(queryData).select("--v").sort({ createdAt: -1 });
};

// Get a single question by ID
const getquestionById = async (id: string) => {
  return await QuestionModel.findOne({ _id: id, isDeleted: false }).select("-__v");
};

// Update a question
const updatequestion = async (id: string, data: Partial<TQuestion>) => {
  return await QuestionModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// delete a question
const deletequestion = async (id: string) => {
  return await QuestionModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const questionServices = {
  createquestion,
  getquestions,
  getquestionById,
  updatequestion,
  deletequestion,
};
