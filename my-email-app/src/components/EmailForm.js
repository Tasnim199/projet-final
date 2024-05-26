
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmailForm.css';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if any form fields are empty before submitting
      if (!formData.to || !formData.subject || !formData.body) {
       
        return;
      }

      const res = await axios.post('http://localhost:5000/send', formData);
      console.log(res.data); // Assuming the backend sends a response upon successful email sending
      // Clear form fields after successful submission
      alert("email sent successfully")
     
      setFormData({ to: '', subject: '', body: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert("failed to send the email")
   
    }
  };
  const handleSendEmails = () => {
    navigate('/');
  };
  const handleShowEmails = () => {
    navigate('/sent');
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="email" name="to" value={formData.to} onChange={handleChange} placeholder="To" required />
      <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
      <textarea name="body" value={formData.body} onChange={handleChange} placeholder="Text" required />
      <button type="submit">Send Email</button>
    </form>
    <button className='btn' onClick={handleSendEmails}>Send Emails</button>
    <button className='btn' onClick={handleShowEmails}>Show Emails</button>
    </div>
  );
};

export default EmailForm;
