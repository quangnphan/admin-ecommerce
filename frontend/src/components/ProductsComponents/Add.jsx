import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// Import other necessary actions and components

const AddProductForm = ({ addDialog,setAddDialog }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.user); // Assuming you have user data in Redux state

  const [formData, setFormData] = useState({
    // ... your initial state here
  });

  const handleFormChange = (e) => {
    // ... your change handling logic
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch an action to send the formData to the server
    // dispatch(addProduct(formData));
    setAddDialog(false);
  };

  return (
    <Dialog open={addDialog} onClose={()=>setAddDialog(false)}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleFormChange}
            >
              {/* Render categories as menu items */}
              {/* {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
          {/* Other fields */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setAddDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductForm;
