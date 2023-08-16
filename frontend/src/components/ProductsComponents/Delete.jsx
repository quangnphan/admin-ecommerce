import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/products/productsSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteProductPopup = ({ id, deletePopup, setDeletePopup }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setDeletePopup(false);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(id));
    setDeletePopup(false);
  };

  return (
    <Dialog
      open={deletePopup}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductPopup;
