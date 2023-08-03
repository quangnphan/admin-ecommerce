import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

const Admin = () => {
  // const dispatch = useDispatch();
  // const status = useSelector((state) => state.users.status);
  // const users = useSelector((state) => state.users.users);
  // const errorMsg = useSelector((state) => state.users.error);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  const users = [
   {
    "id": 1,
    "name": 'Quang',
    "email": 'qp@gmail.com',
   },
   {
    "id": 2,
    "name": 'Quang2',
    "email": 'qp2@gmail.com',
   }
  ]

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
  ];

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "error") {
  //   return <div>Error: {errorMsg}</div>;
  // }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick // Disable row selection on click (optional)
      />
    </div>
  );
};

export default Admin;
