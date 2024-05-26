const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Email = require('../models/email.js');

// handle send email
router.post('/send', async (req, res) => {
  const { to, subject, body } = req.body;

  // Save the email to the database
  const newEmail = new Email({ to, subject, body });
  await newEmail.save();

  // Send the email using nodemailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.Password
    }
  });

  let mailOptions = {
    from: process.env.Email,
    to: to ,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    console.log('Email sent successfully ' );
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Get all sent emails
router.get('/sent', async (req, res) => {
  const sentEmails = await Email.find({});
  res.status(200).json(sentEmails);
});

// Delete a specific email
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmail = await Email.findByIdAndDelete(id);
    if (!deletedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }
    res.status(200).json({ message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Error deleting email:', error);
    res.status(500).json({ message: 'Failed to delete email' });
  }
});

module.exports = router;
