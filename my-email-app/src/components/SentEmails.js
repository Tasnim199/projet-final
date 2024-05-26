import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SentEmails.css'; // Assuming you have a separate CSS file for this component

const SentEmails = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const res = await axios.get('http://localhost:5000/sent');
        setEmails(res.data);
      } catch (error) {
        console.error('Error fetching sent emails:', error);
      }
    };
    fetchSentEmails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setEmails(emails.filter((email) => email._id !== id));
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  return (
    <div>
      {emails.map((email) => (
        <div key={email._id} className="email-item">
          <p>{email.to}</p>
          <p>{email.subject}</p>
          <p>{email.body}</p>
          <button onClick={() => handleDelete(email._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SentEmails;

  