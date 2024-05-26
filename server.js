console.clear();

// Importation
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/userRoutes'); // User routes for authentication
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const DB_URL = process.env.MONGODB_URI 

// Middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Adding this to ensure JSON body parsing

app.use((req, res, next) => {
    console.log("Project");
    next();
});

// MongoDB connection 
mongoose.connect(DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes 
app.use("/", emailRoutes);
app.use("/user", userRoutes); // Adding user routes for authentication

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
});
