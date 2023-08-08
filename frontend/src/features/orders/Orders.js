import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./ordersSlice";

const Order = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.orders.status);
  const orders = useSelector((state) => state.orders.users);
  const errorMsg = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const ordersWithId = orders
    ? orders.map((order, index) => ({
        ...order,
        id: index + 1, // generate an index-based id
        order_date: new Date(order.order_date).toLocaleDateString("en-US"),
      }))
    : [];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      valueGetter: (params) =>
        `${params.row.customer.first_name} ${params.row.customer.last_name}`,
    },
    {
      field: "products",
      headerName: "Products",
      width: 400,
      renderCell: (params) => {
        const productsInfo = Array.isArray(params.row.products)
          ? params.row.products
              .map(
                (product) =>
                  `${product.product.name} ${product.size.size} ${product.size.storages[0].capacity} ${product.color.des} (${product.quantity})`
              )
              .join("\n")
          : `${params.row.products.product.name} (${params.row.products.quantity})`;
    
        return <div style={{ whiteSpace: "pre-line" }}>{productsInfo}</div>;
      },
    },
    {
      field: "order_date",
      headerName: "Order Date",
      width: 130,
    },
    {
      field: "shipping_address",
      headerName: "Shipping Address",
      width: 300,
    },
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
        rows={ordersWithId}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Order;
