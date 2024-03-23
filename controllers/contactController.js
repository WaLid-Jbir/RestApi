const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

module.exports.getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

module.exports.createContact = asyncHandler( async (req, res) => {
    console.log("The request body: ", req.body);
    const {name, email, phone} = req.body;
    if (!name ||!email ||!phone) {
        res.status(400);
        throw new Error('Please provide all the required fields');
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

module.exports.getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    res.status(200).json(contact);
});

module.exports.updateContact = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Update Contact' });
});

module.exports.deleteContact = async (req, res) => {
    res.status(200).json({ message: 'Delete Contact' });
}