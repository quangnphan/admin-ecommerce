import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductsChart = ({ orders }) => {
  // Calculate product frequencies
  const productFrequencies = {};

  orders.forEach((order) => {
    order.products.forEach((product) => {
      const productName = product.product.name;
      productFrequencies[productName] =
        (productFrequencies[productName] || 0) + 1;
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
        display: true,
      },
    },
  };

  return (
    <div>
      <h2>Orders Distribution by Product</h2>
      <div style={{maxHeight: '400px'}}>
      <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProductsChart;
