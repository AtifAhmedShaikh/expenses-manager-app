// custom wrapper function to avoid the repetition try-catch block
const asyncHandler = requestHandler => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(err => next(err));
  };
};

export { asyncHandler };
