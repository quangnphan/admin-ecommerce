import React, { useEffect } from "react";
import ProductsChart from "../../components/charts/ProductsChart";
import OrdersByMonthChart from "../../components/charts/OrdersByMonthChart";
import RevenueLineChart from "../../components/charts/RevenueLineChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../orders/ordersSlice";
import { CircularProgress } from "@mui/material";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state)=>state.orders.status);
  const error = useSelector((state)=>state.orders.error);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  if(status === "failed"){
    return <>{error}</>
  }
  return (
    <div className="dashboard-container">
      {orders.length > 0 ? (
        <>
          <div className="chart-container">
            <ProductsChart orders={orders} />
          </div>
          <div className="chart-container">
            <OrdersByMonthChart orders={orders} />
          </div>
          <div className="chart-container">
            <RevenueLineChart orders={orders} />
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Dashboard;
