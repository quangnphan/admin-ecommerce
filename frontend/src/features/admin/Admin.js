import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers, addUser, deleteUser } from "./usersSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import AddUserForm from "../../components/addUserForm/addUserForm";

const Admin = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const users = useSelector((state) => state.users.users);
  const errorMsg = useSelector((state) => state.users.error);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddUser = async (userData) => {
    try {
      await dispatch(addUser(userData));
      // Fetch users again to update the store
      dispatch(fetchUsers());
      setDialogOpen(false); // Close the add user dialog after successful addition
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleDeleteUser = () => {
    setConfirmDialog(false);
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId));
      setSelectedUserId(null);
    }
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setConfirmDialog(true);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteClick(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const usersWithId = users
    ? users.map((user, index) => ({
        ...user,
        id: index + 1, // generate an index-based id
      }))
    : [];

  if (status === "loading") {
    return <CircularProgress />
  }

  if (status === "failed") {
    return <div>{errorMsg}</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Button
        variant="contained"
        className="add-button"
        onClick={handleDialogOpen}
      >
        Add User
      </Button>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <AddUserForm onAddUser={handleAddUser} onClose={handleDialogClose} />
      </Dialog>
      <Dialog
        open={confirmDialog}
        onClose={()=>setConfirmDialog(false)}
      >
        <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={usersWithId}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick // Disable row selection on click (optional)
      />
    </div>
  );
};

export default Admin;
