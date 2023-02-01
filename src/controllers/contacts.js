import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts, status: "success" });
};

export const getContactByIdNewController = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ contact, status: "success" });
};

export const addNewContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await addContact(name, email, phone);
  res.status(201).json({ contact, status: "success" });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await removeContact(contactId);
  if (!response) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ status: "success" });
};

export const changeContactsController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contact = await updateContact(contactId, { name, email, phone });
  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ contact, status: "success" });
};

export const addFavoriteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  const contact = await updateStatusContact(contactId, favorite);
  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ contact, status: "success" });
};
