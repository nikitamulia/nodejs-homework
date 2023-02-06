import express from "express";
import {
  loginController,
  registrationController,
  logoutController,
  currentUserController,
  subscriptionController,
} from "../../controllers/authControllers.js";
import { asyncWrapper } from "../../helpers/apiHelp.js";
import { validTokenMiddleware } from "./midlewares/validTokenMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/register", asyncWrapper(registrationController));
authRouter.post("/login", asyncWrapper(loginController));

authRouter.post("/logout",validTokenMiddleware,asyncWrapper(logoutController));

authRouter.get("/current",validTokenMiddleware,asyncWrapper(currentUserController));

authRouter.patch("/",validTokenMiddleware,asyncWrapper(subscriptionController));

export { authRouter };