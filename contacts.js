const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
	const readFileContacts = await fs.readFile(contactsPath, "utf-8");
	return JSON.parse(readFileContacts);
};

const getContactById = async contactId => {
	const readFileContacts = await listContacts();
	const result = readFileContacts.find(contact => contact.id === contactId);
	return result || null;
};

const addContact = async data => {
	const readFileContacts = await listContacts();
	const addNewContact = {
		id: nanoid(),
		...data,
	};
	readFileContacts.push(addNewContact);
	await fs.writeFile(contactsPath, JSON.stringify(readFileContacts, null, 2));
	return addNewContact;
};

const removeContact = async contactId => {
	const readFileContacts = await listContacts();
	const indexContacts = readFileContacts.findIndex(contact => contact.id === contactId);
	if (indexContacts === -1) {
		return null;
	}
	const [result] = readFileContacts.splice(indexContacts, 1);
	await fs.writeFile(contactsPath, JSON.stringify(readFileContacts, null, 2));
	return result;
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
};
