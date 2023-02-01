import express from "express";
import {
  addNewContactController,
  changeContactsController,
  deleteContactController,
  getContactByIdNewController,
  getContactsController,
  addFavoriteContactController,
} from "../../controllers/contacts.js";
import { contactValidation } from "./midlewares/validation.js";
import { asyncWrapper } from "../../helpers/apiHelp.js";

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdNewController));

router.post("/", contactValidation, asyncWrapper(addNewContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  contactValidation,
  asyncWrapper(changeContactsController)
);

router.patch(
  "/:contactId/favorite",
  asyncWrapper(addFavoriteContactController)
);

export { router as contactsRouter };
