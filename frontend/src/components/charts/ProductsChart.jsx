import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders,selectOrders  } from "../../features/orders/ordersSlice";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsChart = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders before rendering the chart
  }, [dispatch]);

  // Calculate product frequencies
  const productFrequencies = {};
  const productNames = {}; // Store product names

  orders.forEach((order) => {
    order.products.forEach((product) => {
      const productId = product.product._id;
      const productName = product.product.name; // Get the product name
      productFrequencies[productId] = (productFrequencies[productId] || 0) + 1;
      productNames[productName] = productName; // Store the product name
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
      },
    },
  };

  return (
    <div>
      <h2>Orders Distribution by Product</h2>
      <div style={{ width: "600px" }}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProductsChart;
