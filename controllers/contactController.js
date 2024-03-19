const asyncHandler = require('express-async-handler');

module.exports.getContacts = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get All Contacts' });
});

module.exports.createContact = asyncHandler( async (req, res) => {
    console.log("The request body: ", req.body);
    const {name, email, phone} = req.body;
    if (!name ||!email ||!phone) {
        res.status(400);
        throw new Error('Please provide all the required fields');
    }
    res.status(200).json({ message: 'Create Contact' });
});

module.exports.getContact = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get Contact' });
});

module.exports.updateContact = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Update Contact' });
});

module.exports.deleteContact = async (req, res) => {
    res.status(200).json({ message: 'Delete Contact' });
}