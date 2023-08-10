import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "./customersSlice"; // Adjust the import path

const Customer = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.customers.status);
  const customers = useSelector((state) => state.customers.customers);
  const errorMsg = useSelector((state) => state.customers.error);

  const customersWithId = customers
    ? customers.map((customer, index) => ({
        ...customer,
        id: index + 1, // generate an index-based id
      })).reverse()
    : [];

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First Name", width: 100 },
    { field: "last_name", headerName: "Last Name", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "zipcode", headerName: "Zip Code", width: 100 },
  ];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{errorMsg}</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={customersWithId}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Customer;
