import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

// Define the error type based on the provided signature
type globalError = (error: any, req: Request, res: Response, next: NextFunction) => void;

const globalError: globalError = (error, req, res, next) => {
  // Default error properties
  const statusCode = error.status || 500;
  let message = error.message || "Internal Server Error";

  // Handle Mongoose CastError (invalid ObjectId)
  if (error.name === "CastError") {
    message = `Invalid value for ${error.path}: ${error.value}`;
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      errorType: error.name,
    });
  }

  // Handle Mongoose Duplicate Key Error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue || {}).join(", ");
    message = `Duplicate value for field(s): ${field}`;
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message,
      errorType: error?.name || "Duplicate Error",
    });
  }

  // Handle Mongoose ValidationError
  if (error.name === "ValidationError") {
    const validationErrors = Object.values(error.errors || {}).map((err: any) => err.message);
    message = `${validationErrors.join(", ")}`;
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      errorType: error?.name,
    });
  }

  // Handle Zod Validation Errors
  if (error instanceof ZodError) {
    const validationErrors = error.issues.map(
      (err: { path: any[]; message: any }) => `${err.path.join(".")}: ${err.message}`
    );
    message = `${validationErrors.join(", ")}`;
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      details: validationErrors, // Optional: include detailed errors for debugging
      errorType: error?.name || "Validation Error",
    });
  }

  // Handle any other generic errors
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: process.env.NODE_ENV === "development" ? error : undefined, // Include error details in development
    errorType: error?.name || "Undefined",
  });
};

export default globalError;
