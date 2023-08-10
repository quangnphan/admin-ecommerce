import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "./transactionsSlice"; // Replace with your action creator

const Transaction = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.transactions.status);
  const payments = useSelector((state) => state.transactions.payments);
  const errorMsg = useSelector((state) => state.transactions.error);

  useEffect(() => {
    dispatch(fetchPayments()); // Replace with your action creator to fetch payments
  }, [dispatch]);

  const listPayments = payments
    ? payments.map((payment, index) => ({
        ...payment,
        id_index: payments.length - index, // generate an index-based id
      }))
    : [];

  const columns = [
    { field: "id_index", headerName: "ID", width: 100 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      valueGetter: (params) => {
        // Divide the amount by 100 and format with two decimal places
        const formattedAmount = (params.row.amount / 100).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formattedAmount;
      },
    },
    { field: "status", headerName: "Status", width: 200 },
    { field: "id", headerName: "Description ID", width: 300 },
    {
      field: "created",
      headerName: "Created",
      width: 200,
      valueGetter: (params) => {
        const timestamp = params.row.created;
        const formattedDate = new Date(timestamp * 1000).toLocaleString();
        return formattedDate;
      },
    },
    // Add more columns as needed
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
        rows={listPayments}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Transaction;
