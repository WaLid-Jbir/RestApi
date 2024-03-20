const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');

connectDB();

const app = express();
const port = process.env.PORT || 5000;
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const { connect } = require('mongoose');

app.use(express.json());
app.use('/api/contacts', contactRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
