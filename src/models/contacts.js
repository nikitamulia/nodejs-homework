import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("./src/models/contacts.json");

const listContacts = async () => {
   try {
     const contacts = await fs.readFile(contactsPath, "utf8");
     const parsedContacts = JSON.parse(contacts);
     return parsedContacts;
   } catch (error) {
     console.log(error);
   }
};

const getContactById = async (contactId) => {
   try {
     const strContactId = String(contactId);
     const contacts = await listContacts();

     const contact = contacts.filter((el) => el.id === strContactId);

     if (!contact) return null;

     return contact;
   } catch (error) {
     console.log(error);
   }
};

const removeContact = async (contactId) => {
   try {
     const strContactId = String(contactId);
     const contacts = await listContacts();
     const indexRemovedCont = contacts.findIndex((el) => el.id === strContactId);

     if (indexRemovedCont < 0) return null;

     const [removedContact] = contacts.splice(indexRemovedCont, 1);
     await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
     return removedContact;
   } catch (error) {
     console.log(error);
   }
};

const addContact = async ({ name, email, phone }) => {
   try {
     const contacts = await listContacts();
     const newContact = { id: `${Date.now()}`, name, email, phone };

     contacts.push(newContact);

     await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

     return newContact;
   } catch (error) {
     console.log(error);
   }
};

const updateContact = async (contactId, body) => {
   const strContactId = String(contactId);
   const contacts = await listContacts();

   const index = contacts.findIndex((contact) => contact.id === strContactId);
   if (index < 0) {
     return null;
   }

   contacts[index] = {
     ...contacts[index],
     ...body,
   };
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return contacts[index];
};

export {
   listContacts,
   getContactById,
   removeContact,
   addContact,
   updateContact,
};

