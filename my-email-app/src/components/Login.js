import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ errorsVal, setErrorsVal, setChangeUser }) => {
  const navigate = useNavigate();

  // State to store user credentials
  const [user, setUser] = useState({});

  // Function to handle input changes and update the user state
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // Function to handle user login
  const loginUser = () => {
    axios
      .post("http://localhost:5000/user/login", user)
      .then((result) => {
        // Store the user token in local storage
        localStorage.setItem("auth", result.data.userToken);
        // Clear any previous validation errors
        setErrorsVal([]);
        // Trigger user status change to update the app state
        setChangeUser(true);
        // Redirect to the home page after successful login
        navigate("/");
      })
      .catch((err) => {
        // Set validation errors if login fails
        setErrorsVal(
          err.response.data.msg
            ? [err.response.data.msg]
            : err.response.data.errors
        );
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        {/* Input fields for email and password */}
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
        {/* Button to trigger login */}
        <button onClick={() => loginUser()}> Login </button>
      </div>
      {/* Display validation errors, if any */}
      {errorsVal &&
        errorsVal.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
      <p>
        If you don't have an account you can{" "}
        <span>
          <Link to={"/register"}>register here</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;