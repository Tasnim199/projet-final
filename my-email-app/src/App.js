import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Login from './components/Login';
import Register from './components/Register';
import EmailForm from './components/EmailForm';
import SentEmails from './components/SentEmails';
import axios from 'axios';
import './App.css';

function App() {
  // State to store the current user information
  const [user, setUser] = useState(null);
  // State to store validation errors
  const [errorsVal, setErrorsVal] = useState([]);
  // State to trigger user status change
  const [changeUser, setChangeUser] = useState(false);
 
  // This function checks if the user is authenticated or not
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get('http://localhost:5000/user/current', {
          headers: { auth: localStorage.getItem('auth') },
        });
        setUser(result.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrentUser();
  }, [changeUser]);

  return (
    <Router>
      <div>
        {/* Navbar component with props to handle user state and admin status */}
        <Navbar user={user} setUser={setUser} setChangeUser={setChangeUser} />
        {/* Define the routes for the application */}
        <Routes>
          {/* Login Page */}
          <Route
            path="/login"
            element={
              <Login
                errorsVal={errorsVal}
                setErrorsVal={setErrorsVal}
                setChangeUser={setChangeUser}
              />
            }
          />
          {/* Register Page */}
          <Route
            path="/register"
            element={
              <Register
                errorsVal={errorsVal}
                setErrorsVal={setErrorsVal}
                setChangeUser={setChangeUser}
              />
            }
          />
          
          {/* Email Form */}
          {user &&   <>     
          <Route path="/email" element={<EmailForm />} />
          {/* Sent Emails */}
          <Route path="/sent" element={<SentEmails />} />
          
           </> }
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<h1>No founded</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

