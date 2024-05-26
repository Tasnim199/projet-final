const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email,password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const dataUser = new User({ username,email, password: hashedPassword });
        // code
          // Save the new user to the database
    const newUser = await dataUser.save();

    // Generate an access token for the new user
    const payload = { id: newUser._id };
    const secret = process.env.privateKey;
    const options = { expiresIn: 3600 };
    const userToken = jwt.sign(payload, secret, options);

    res.status(200).send({ msg: "New user added", userToken });
        //

     
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Current User
router.get('/current', async (req, res) => {
    try {
        const token = req.headers.auth;
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.privateKey);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

