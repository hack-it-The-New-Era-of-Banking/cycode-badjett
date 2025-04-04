import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Balance for this month",
    },
  },
};

const labels = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return date.toLocaleDateString("en-PH", { month: "short", day: "numeric" });
});

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.floor(Math.random() * 2001) - 1000),
      borderColor: "#6147aa30",
      backgroundColor: "#6147aa",
    },
  ],
};

const IncomeLineChart = (props) => {
  return <Line options={options} data={data} />;
};

export default IncomeLineChart;
