import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const OrdersByMonthChart = () => {
  const orders = useSelector((state) => state.orders.orders);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize ordersByMonth with all months set to 0
  const ordersByMonth = {};

  months.forEach((month) => {
    ordersByMonth[month] = 0;
  });

  orders.forEach((order) => {
    const orderDate = new Date(order.order_date);
    const month = orderDate.toLocaleString("en-US", { month: "short" });

    if (!ordersByMonth[month]) {
      ordersByMonth[month] = 0;
    }

    ordersByMonth[month] += 1;
  });

  const chartData = {
    labels: Object.keys(ordersByMonth),
    datasets: [
      {
        label: "Total Orders",
        data: Object.values(ordersByMonth),
        backgroundColor: "#3498DB",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2>Total Orders by Month</h2>
      {orders.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrdersByMonthChart;
