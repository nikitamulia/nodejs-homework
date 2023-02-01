import Joi from "joi";

export const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(6).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult) {
    return res.status(400).json({
      status: validationResult.error.details,
    });
  }
  next();
};
export const changeContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(6).max(30).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.string().optional(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult) {
    return res.status(400).json({
      status: validationResult.error.details,
    });
  }
  next();
};