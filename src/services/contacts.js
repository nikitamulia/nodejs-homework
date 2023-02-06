import { Contact } from "../models/contacts.js";
import { WrongParamsError } from "../helpers/error.js";


export async function listContacts(owner, page, limit, favorite) {
  let query = { owner };
  if (favorite) {
    query = { ...query, favorite };
  }
  const list = await Contact.find(query, { __v: 0 })
    .skip(parseInt((page - 1) * limit))
    .limit(parseInt(limit));
  return list;
}
export async function getContactById(contactId, owner) {
  const contactById = await Contact.findById({ contactId, owner }, { __v: 0 });

  if (!contactById) {
    throw new WrongParamsError("contact by id not found");
  }
  return contactById;
}

export async function removeContact(contactId, owner) {
  return await Contact.findByIdAndDelete(contactId, owner);
}

export async function addContact({ name, email, phone }, owner) {
  const newContact = await Contact.create({ name, email, phone, owner });
  return newContact;
}

export async function updateContact(contactId, { name, email, phone }, owner) {
  const changeContacts = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { name, email, phone },
      owner,
    },
    { new: true }
  );
  return changeContacts;
}

export async function updateStatusContact(contactId, { favorite }, owner) {
  const updateContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: {
        favorite: true,
        owner,
      },
    },
    { new: true }
  );

  return updateContact;
}