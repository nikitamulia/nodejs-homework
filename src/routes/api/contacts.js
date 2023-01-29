import {
  getAllCont, getContById, removeCont, addCont, updateCont,} from "../../controllers/contacts.js";
import express from 'express';
import { addContactValidation, changeContactValidation } from "./middlewares/validation.js";


const router = express.Router()


router.get("/", getAllCont);
router.get("/:contactId", getContById);
router.post("/", addContactValidation, addCont);
router.delete("/:contactId", removeCont);
router.put("/:contactId",changeContactValidation, updateCont);

export { router as contactsRouter };
