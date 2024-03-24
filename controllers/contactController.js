const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// Get all contacts
module.exports.getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// Creata contact
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

// Get single contact
module.exports.getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    res.status(200).json(contact);
});

// Update contact
module.exports.updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedContact);
});

// Delete contact
module.exports.deleteContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    await contact.deleteOne();
    res.status(200).json({ message: 'Contact deleted successfully' });
}