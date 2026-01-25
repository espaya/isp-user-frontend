import { useState } from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardHome() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  // Chart data
  const chartData = {
    daily: {
      labels: ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "12 AM"],
      datasets: [
        {
          label: "Data Usage (MB)",
          data: [50, 120, 200, 180, 220, 160, 100],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.4,
        },
      ],
    },
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Data Usage (GB)",
          data: [5, 6, 4, 7, 8, 6, 5],
          fill: true,
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          tension: 0.4,
        },
      ],
    },
    monthly: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          label: "Data Usage (GB)",
          data: [10, 15, 12, 18, 20, 25, 30, 28, 22, 18, 15, 20],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          tension: 0.4,
        },
      ],
    },
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text:
          selectedPeriod === "daily"
            ? "Daily Internet Usage"
            : selectedPeriod === "weekly"
            ? "Weekly Internet Usage"
            : "Monthly Internet Usage",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: selectedPeriod === "daily" ? "MB Used" : "GB Used" },
      },
      x: { title: { display: true, text: selectedPeriod === "daily" ? "Time of Day" : selectedPeriod === "weekly" ? "Day" : "Month" } },
    },
  };

  return (
    <>
      {/* TOP STAT CARDS */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="price-block_one-inner text-center p-3 border rounded shadow-sm">
            <i className="fas fa-wifi fa-3x text-success mb-2" />
            <h5>Status</h5>
            <p className="text-success">Connected</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="price-block_one-inner text-center p-3 border rounded shadow-sm">
            <i className="fas fa-clock fa-3x text-warning mb-2" />
            <h5>Time Left</h5>
            <p>6 Hours</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="price-block_one-inner text-center p-3 border rounded shadow-sm">
            <i className="fas fa-tachometer-alt fa-3x text-primary mb-2" />
            <h5>Speed</h5>
            <p>10 Mbps</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="price-block_one-inner text-center p-3 border rounded shadow-sm">
            <i className="fas fa-box fa-3x text-info mb-2" />
            <h5>Package</h5>
            <p>Daily – ¢10</p>
          </div>
        </div>
      </div>

      {/* CHART WITH PERIOD SELECT */}
      <div className="row mt-4">
        <div className="col-12 mb-3 d-flex justify-content-end">
          <select
            className="form-select w-auto"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="col-12">
          <div className="order-box p-4 border rounded shadow-sm">
            <Line data={chartData[selectedPeriod]} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
}
