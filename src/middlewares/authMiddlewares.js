import jwt from "jsonwebtoken";
import { NotAuthorizeError } from "../helpers/errors.js";
import { User } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization?.split(" ") ?? [];

  if (!token) {
    next(new NotAuthorizeError("Not authorized"));
  }
  try {
    const { _id } = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id }, { __v: 0, password: 0 });

    if (user.token !== token) {
      return next(new NotAuthorizeError("Invalid token"));
    }
    req.user = user;
    next();
  } catch (err) {
    next(new NotAuthorizeError("Not authorized"));
  }
};
