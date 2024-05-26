import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ errorsVal, setErrorsVal, setChangeUser }) => {
  const navigate = useNavigate();
  
  // State to store user registration details
  const [user, setUser] = useState({});

  // Function to handle input changes and update the user state
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // Function to handle user registration
  const registerUser = () => {
    axios
      .post("http://localhost:5000/user/register", user)
      .then((result) => {
        // Store the user token in local storage
        localStorage.setItem("auth", result.data.userToken);
        // Clear any previous validation errors
        setErrorsVal([]);
        // Trigger user status change to update the app state
        setChangeUser(true);
        // Redirect to the home page after successful registration
        navigate("/email");
      })
      .catch((err) => {
        // Set validation errors if registration fails
        setErrorsVal(
          err.response.data.msg
            ? [err.response.data.msg]
            : err.response.data.errors
        );
      });
  };

  return (
    <div>
      <h1>Register Page</h1>
      <div>
        {/* Input fields for username, email, and password */}
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Email"
          name="email"
        />
        <input
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="Password"
          name="password"
        />
        {/* Button to trigger registration */}
        <button onClick={() => registerUser()}> Register </button>
      </div>
      
      {/* Display validation errors, if any */}
      {errorsVal &&
        errorsVal.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}

      <p>
        If you have an account, you can{" "}
        <span>
          <Link to="/login">login here</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;