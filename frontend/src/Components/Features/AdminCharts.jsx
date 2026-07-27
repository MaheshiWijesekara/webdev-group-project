import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

// --- LINE CHART: Monthly Sales Trend ---
export const SalesChart = ({ data }) => {
  const chartData = {
    labels: data?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Sales (Rs.)',
      data: data?.values || [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#2D402E',
      backgroundColor: 'rgba(45, 64, 46, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2D402E',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '600' }, color: '#666' } },
      title: { display: true, text: 'Revenue Trend', font: { size: 16, weight: '700', family: 'Playfair Display' }, color: '#2D402E', padding: { bottom: 20 } },
      tooltip: { callbacks: { label: function(context) { return `Rs. ${context.parsed.y.toLocaleString()}`; } } }
    },
    scales: {
      y: { beginAtZero: true, ticks: { callback: function(value) { return 'Rs. ' + value.toLocaleString(); } }, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  return <div style={{ height: '280px' }}><Line data={chartData} options={options} /></div>;
};

// --- BAR CHART: Revenue by Category ---
export const CategoryChart = ({ data }) => {
  const chartData = {
    labels: data?.labels || ['Skin Care', 'Lip Care', 'Body Care', 'Hair Care'],
    datasets: [{
      label: 'Revenue by Category',
      data: data?.values || [40000, 15000, 20000, 10000],
      backgroundColor: ['#2D402E', '#B4975A', '#5C4033', '#8B7355'],
      borderColor: ['#1a2b1c', '#7a6b3a', '#3a2a1a', '#5a4a3a'],
      borderWidth: 1,
      borderRadius: 6,
      barPercentage: 0.7,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Revenue by Category', font: { size: 16, weight: '700', family: 'Playfair Display' }, color: '#2D402E', padding: { bottom: 20 } },
      tooltip: { callbacks: { label: function(context) { return `Rs. ${context.parsed.y.toLocaleString()}`; } } }
    },
    scales: {
      y: { beginAtZero: true, ticks: { callback: function(value) { return 'Rs. ' + value.toLocaleString(); } }, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  return <div style={{ height: '280px' }}><Bar data={chartData} options={options} /></div>;
};

// --- DOUGHNUT CHART: Order Status Distribution ---
export const OrderStatusChart = ({ data }) => {
  const chartData = {
    labels: data?.labels || ['Processing', 'Shipped', 'Delivered'],
    datasets: [{
      data: data?.values || [5, 8, 12],
      backgroundColor: ['#B4975A', '#2D402E', '#28a745'],
      borderColor: ['#8a7a4a', '#1a2b1c', '#1a7a2a'],
      borderWidth: 2,
      hoverOffset: 10,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '500' }, color: '#666' } },
      title: { display: true, text: 'Order Status Distribution', font: { size: 16, weight: '700', family: 'Playfair Display' }, color: '#2D402E', padding: { bottom: 20 } }
    },
    cutout: '65%',
  };

  return <div style={{ height: '280px' }}><Doughnut data={chartData} options={options} /></div>;
};

// --- SUMMARY CARDS: Stats Overview ---
export const SummaryCards = ({ stats }) => {
  const cards = [
    { label: 'Total Revenue', value: `Rs. ${stats?.totalSales?.toLocaleString() || '0'}`, color: '#B4975A' },
    { label: 'Total Orders', value: stats?.totalOrders || '0', color: '#2D402E' },
    { label: 'Total Users', value: stats?.totalUsers || '0', color: '#5C4033' },
    { label: 'Total Products', value: stats?.totalProducts || '0', color: '#8B7355' }
  ];

  return (
    <div className="row g-4">
      {cards.map((card, index) => (
        <div key={index} className="col-md-3 col-6">
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid rgba(45,64,46,0.06)', borderLeft: `4px solid ${card.color}` }}>
            <p className="text-muted small fw-bold text-uppercase m-0" style={{ letterSpacing: '1px', fontSize: '0.65rem' }}>{card.label}</p>
            <h3 className="fw-bold m-0" style={{ color: '#2D402E' }}>{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};