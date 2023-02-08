import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { page, limit, favorite } = req.query;
  const contacts = await listContacts(userId, page, limit, favorite);
  res.status(200).json({ contacts, status: "success" });
};

export const getContactByIdNewController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const contact = await getContactById(req.params.contactId, userId);

  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ contact, status: "success" });
};

export const addNewContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id: userId } = req.user;
  const contact = await addContact({ name, email, phone }, userId);
  res.status(201).json({ contact, status: "success" });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const response = await removeContact(contactId, userId);
  if (!response) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ status: "success" });
};

export const changeContactsController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { _id: userId } = req.user;
  const contact = await updateContact(
    contactId,
    { name, email, phone },
    userId
  );
  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ contact, status: "success" });
};

export const addFavoriteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: userId } = req.user;
  if (!favorite) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  const contact = await updateStatusContact(contactId, favorite, userId);
  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json({ contact, status: "success" });
};
