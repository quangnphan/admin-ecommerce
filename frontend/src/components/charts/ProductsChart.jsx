import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/orders/ordersSlice";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsChart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders before rendering the chart
  }, [dispatch]);

  // Calculate product frequencies
  const productFrequencies = {};
  const productNames = {}; // Store product names

  orders.forEach((order) => {
    order.products.forEach((product) => {
      const productId = product.product._id;
      const productName = product.product.name;
      productFrequencies[productName] =
        (productFrequencies[productName] || 0) + 1;
      productNames[productId] = productName;
    });
  });

  const chartData = {
    labels: Object.keys(productFrequencies),
    datasets: [
      {
        data: Object.values(productFrequencies),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8E44AD",
          "#3498DB",
          "#E74C3C",
          "#1ABC9C",
          "#F39C12",
          "#D35400",
          // Add more colors as needed
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Display legend
        position: "right"
      },
    },
  };

  return (
    <div>
      <h2>Orders Distribution by Product</h2>
      {orders.length > 0 ? (
        <div style={{ width: "450px" }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductsChart;
