const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
module.exports.getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
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
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access private
module.exports.getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
module.exports.updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You don't have the permission to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
module.exports.deleteContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You don't have the permission to update this contact");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json({ message: 'Contact deleted successfully' });
}