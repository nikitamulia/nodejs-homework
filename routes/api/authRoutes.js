import express from "express";
import {
  loginController,
  registrationController,
  logoutController,
  currentUserController,
  subscriptionController,
  avatarController,
} from "../../controllers/authControllers.js";
import { asyncWrapper } from "../../helpers/apiHelp.js";
import { uploadingAvatarMiddleware } from "./midlewares/avatarMidlewares.js";
import { validTokenMiddleware } from "./midlewares/validTokenMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/register", asyncWrapper(registrationController));
authRouter.post("/login", asyncWrapper(loginController));

authRouter.post("/logout",validTokenMiddleware,asyncWrapper(logoutController));

authRouter.get("/current",validTokenMiddleware,asyncWrapper(currentUserController));

authRouter.patch("/",validTokenMiddleware,asyncWrapper(subscriptionController));

authRouter.patch("/avatars",validTokenMiddleware,uploadingAvatarMiddleware.single("avatar"),asyncWrapper(avatarController));

export { authRouter };