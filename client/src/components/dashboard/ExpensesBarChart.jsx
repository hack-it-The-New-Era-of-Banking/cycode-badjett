import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { subDays, format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "Expenses Last 7 Days",
    },
  },
};

export const data = {
  labels: Array.from({ length: 7 }, (_, i) =>
    format(subDays(new Date(), 6 - i), "MMM d")
  ),
  datasets: [
    {
      label: "Expenses",
      data: [120, 150, 100, 200, 180, 220, 170],
      backgroundColor: "#6147aa",
    },
  ],
};

const ExpensesBarChart = () => {
  return <Bar options={options} data={data} />;
};

export default ExpensesBarChart;
