import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import { CircularProgress } from "@mui/material";
ChartJS.register(LineElement, PointElement, LinearScale, Title);

const RevenueLineChart = ({ orders }) => {
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);

  useEffect(() => {
    if (orders.length === 0) {
      return; // Don't proceed with calculations if orders are not available yet
    }
    // Calculate monthly revenue
    const monthlyRevenue = {};
    orders.forEach((order) => {
      const orderDate = new Date(order.order_date);

      const monthYear = `${
        orderDate.getMonth() + 1
      }-${orderDate.getFullYear()}`;

      if (monthlyRevenue[monthYear]) {
        monthlyRevenue[monthYear] += order.total_amount;
      } else {
        monthlyRevenue[monthYear] = order.total_amount;
      }
    });

    // Prepare data for Line Chart
    const chartLabels = Object.keys(monthlyRevenue);
    const chartData = Object.values(monthlyRevenue);

    setMonthlyRevenueData({
      labels: chartLabels,
      datasets: [
        {
          label: "Monthly Revenue",
          data: chartData,
          fill: false,
          borderColor: "#007bff",
        },
      ],
    });
  }, [orders]); // Run this effect whenever 'orders' changes

  return (
    <div>
      <h2>Monthly Revenue</h2>
      {monthlyRevenueData.labels && monthlyRevenueData.labels.length > 0 ? (
        <div style={{ maxHeight: "400px" }}>
          <Line
            data={monthlyRevenueData}
            options={{
              responsive: true,
              scales: {
                x: {
                  type: "category",
                  title: {
                    display: true,
                    text: "Month",
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Revenue",
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default RevenueLineChart;
