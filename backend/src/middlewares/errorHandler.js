import { NODE_ENV } from "../config/envManager.js";

const errorHandler = (err, req, res, next) => {
  // set default status code and message if not provided
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong Please try again ";

  // Respond with detailed error information in development mode
  if (NODE_ENV !== "PRODUCTION") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack,
      error: err,
    });
  } else {
    // Respond with minimal error information in production mode
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
};

export { errorHandler };
