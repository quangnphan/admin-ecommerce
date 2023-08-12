import React, { useEffect } from 'react'
import ProductsChart from '../../components/charts/ProductsChart'
import OrdersByMonthChart from '../../components/charts/OrdersByMonthChart';
import RevenueLineChart from '../../components/charts/RevenueLineChart';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../orders/ordersSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchOrders());
  },[dispatch])
  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <ProductsChart />
      </div>
      <div className="chart-container">
        <OrdersByMonthChart />
      </div>
      <div className="chart-container">
        <RevenueLineChart />
      </div>
    </div>
  );
}

export default Dashboard