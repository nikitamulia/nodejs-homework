import { ValidationError, WrongParamsError } from "../helpers/error.js";

export const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof WrongParamsError) {
    res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};