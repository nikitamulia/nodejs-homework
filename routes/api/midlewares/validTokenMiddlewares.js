import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NotAuthorizeError } from "../../../helpers/error.js";
import { User } from "../../../models/userModel.js";

dotenv.config();

export async function validTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new NotAuthorizeError("Please provide a token"));
  }

  const [, token] = authorization.split(" ");

  try {
    const { _id } = jwt.decode(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id }, { __v: 0, password: 0 });

    if (!user || user.token !== token) {
      return next(new NotAuthorizeError("Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new NotAuthorizeError("Not authorized"));
  }
}