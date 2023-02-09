import express from "express";
import {
  addNewContactController,
  changeContactsController,
  deleteContactController,
  getContactByIdNewController,
  getContactsController,
  addFavoriteContactController,
} from "../../controllers/contactControllers.js";
import { contactValidation } from "../../middlewares/validationMiddlewares.js";
import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { authMiddleware } from "../../middlewares/authMiddlewares.js";

const contactRouter = express.Router();
contactRouter.use(authMiddleware);
contactRouter.get("/", asyncWrapper(getContactsController));

contactRouter.get("/:contactId", asyncWrapper(getContactByIdNewController));

contactRouter.post(
  "/",
  contactValidation,
  asyncWrapper(addNewContactController)
);

contactRouter.delete("/:contactId", asyncWrapper(deleteContactController));

contactRouter.put(
  "/:contactId",
  contactValidation,
  asyncWrapper(changeContactsController)
);

contactRouter.patch(
  "/:contactId/favorite",
  asyncWrapper(addFavoriteContactController)
);
export { contactRouter };
