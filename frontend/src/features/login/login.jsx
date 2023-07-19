import React, { useState } from "react";
import "./login.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "./loginSlice";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform login logic here
      await dispatch(loginUser({ email, password }));
      const token = localStorage.getItem("token");
      if (token) {
        onLogin(token);
      }

      // Reset form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="contained" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
