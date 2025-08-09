import { RequestHandler } from "express";
import { emptyResponse, notUpdated, success } from "../../Utils/response";
import { questionSchema } from "./Question.validation";
import { questionServices } from "./Question.service";

// Create a new question
const createQuestion: RequestHandler = async (req, res, next) => {
  try {
    // const validatedData = questionSchema.parse(req.body);
    const result = await questionServices.createquestion(req.body);
    success(res, result, "question created");
  } catch (err: any) {
    next(err);
  }
};

// Get all questions (with optional isActive filter)
const getQuestion: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query;
    const questions = await questionServices.getquestions(query);
    if (questions.length === 0) {
      emptyResponse(res, questions);
      return;
    }
    success(res, questions, "questions retrieved", questions.length);
  } catch (err) {
    next(err);
  }
};

// Get a single question by ID
const getSingleQuestion: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const question = await questionServices.getquestionById(id);
    if (!question) {
      notUpdated(res, id, null);
      return;
    }
    success(res, question, "question retrieved");
  } catch (err) {
    next(err);
  }
};

// Update a question
const updateQuestion: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validatedData = questionSchema.partial().parse(req.body); // allow partial updates
    const updatedquestion = await questionServices.updatequestion(id, validatedData);
    if (!updatedquestion) {
      emptyResponse(res, null);
      return;
    }
    success(res, updatedquestion, "question updated");
  } catch (err) {
    next(err);
  }
};

// Soft delete a question
const deleteQuestion: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedquestion = await questionServices.deletequestion(id);
    if (!deletedquestion) {
      notUpdated(res, id, null);
      return;
    }
    success(res, deletedquestion, "question deleted");
  } catch (err) {
    next(err);
  }
};

export const questionController = {
  createQuestion,
  getQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
