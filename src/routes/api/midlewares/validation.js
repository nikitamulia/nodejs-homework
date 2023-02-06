import Joi from "joi";

import { ValidationError } from "../../../helpers/error.js";

export const contactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details));
  }
  next();
};

export const userValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(JSON.stringify(error.details)));
  }
  next();
};