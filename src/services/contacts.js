import { Contact } from "../models/contacts.js";
import { WrongParamsError } from "../helpers/error.js";

export async function listContacts() {
  const list = await Contact.find({});
  return list;
}
export async function getContactById(contactId) {
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw new WrongParamsError("contact by id not found");
  }
  return contactById;
}
export async function removeContact(contactId) {
  return await Contact.findByIdAndDelete(contactId);
}

export async function addContact(name, email, phone) {
  const newContact = await Contact.create({ name, email, phone });
  return newContact;
}

export async function updateContact(contactId, { name, email, phone }) {
  const changeContacts = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  return changeContacts;
}

export async function updateStatusContact(contactId, { favorite }) {
  const updateContact = await Contact.findByIdAndUpdate(contactId, {
    $set: {
      favorite: true,
    },
  });
  return updateContact;
}