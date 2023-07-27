import React, { useState } from "react";
import "./login.css";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser,clearErrorMessage, loginFailure } from "./loginSlice";
import ErrorModal from "../../components/modal/modal";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.loginStatus);
  const errorMessage = useSelector((state) => state.login.errorMessage);

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
      if (loginStatus !== "loading") {
        await dispatch(loginUser({ email, password }));
      }
      
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
      dispatch(loginFailure(error));
    }
  };

  const handleCloseErrorModal = () => {
    dispatch(clearErrorMessage());
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="email"
            value={email}
            autoComplete="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="contained" type="submit">
          Login {loginStatus === "loading" && <CircularProgress style={{ color: "white" }} />}
        </Button>
      </form>
      <ErrorModal open={loginStatus === "failed"} onClose={handleCloseErrorModal} errorMessage={errorMessage} />
    </div>
  );
};

export default Login;
