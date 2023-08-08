import React, { useState } from "react";
import "./AddUserForm.css";
import { Button } from "@mui/material";

const AddUserForm = ({ onClose, onAddUser }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onAddUser(userData);
    setUserData({
      name: "",
      email: "",
      password: "",
    });
    onClose();
  };

  return (
    <div className="add-user-form">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
          />
        </div>
        <Button variant="contained" type="submit">Create</Button>
      </form>
    </div>
  );
};

export default AddUserForm;
